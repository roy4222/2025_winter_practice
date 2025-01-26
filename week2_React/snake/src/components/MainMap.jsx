// 導入必要的 styled-components 函數和常數
import { css } from 'styled-components';
import styled from 'styled-components';
import { MAX_WIDTH, PAGE_PADDING, GRID_SIZE } from "./constants";

// 定義地圖大小的 CSS
const mapSize = css`
    // 計算地圖的寬度和高度
    // 使用 min 函數來選擇較小的值，確保地圖不會超出螢幕
    // calc(100vw - ${PAGE_PADDING*2}px) 計算螢幕寬度減去兩側內邊距
    // ${MAX_WIDTH-(PAGE_PADDING*2)}px 是預設的最大寬度，考慮內邊距
    width: min(calc(100vw - ${PAGE_PADDING*2}px), ${MAX_WIDTH-(PAGE_PADDING*2)}px);
    height: min(calc(100vw - ${PAGE_PADDING*2}px), ${MAX_WIDTH-(PAGE_PADDING*2)}px);
`;

// 定義地圖容器的樣式
const MapContainer = styled.div`
    ${mapSize} // 應用上面定義的 mapSize
    border: 2px solid ${({ theme }) => theme.colors.border}; // 設置邊框
    background-color: ${({ theme }) => theme.colors.background}; // 設置背景色
    position: relative; // 設置相對定位
    margin: ${({ theme }) => theme.spacing.medium} auto; // 設置外邊距，使其水平居中
    display: grid; // 使用網格布局
    grid-template-columns: repeat(${GRID_SIZE}, 1fr); // 設置列數為 GRID_SIZE，每列寬度相等
    grid-template-rows: repeat(${GRID_SIZE}, 1fr); // 設置行數為 GRID_SIZE，每行高度相等
`;

// 定義網格單元格的樣式
const GridCell = styled.div`
    border: 1px solid ${({ theme }) => theme.colors.border}40; // 設置邊框，40 表示透明度
    width: 100%; // 寬度填滿父容器
    height: 100%; // 高度填滿父容器
`;

// 定義蛇頭的樣式
const SnakeHead = styled.div`
    position: absolute;
    width: calc(100% / ${GRID_SIZE});
    height: calc(100% / ${GRID_SIZE});
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    left: ${({ x }) => (x * 100 / GRID_SIZE)}%;
    top: ${({ y }) => (y * 100 / GRID_SIZE)}%;
    z-index: 1;
    transition: all 0.2s linear;
    animation: mouthMove 0.3s infinite linear;
    transform: ${({ direction }) => {
        if (direction.x === 1) return 'rotate(0deg)';
        if (direction.x === -1) return 'rotate(180deg)';
        if (direction.y === 1) return 'rotate(90deg)';
        if (direction.y === -1) return 'rotate(-90deg)';
        return 'rotate(0deg)';
    }};

    @keyframes mouthMove {
        0% { clip-path: polygon(100% 0, 50% 50%, 100% 100%, 0 100%, 0 0); }
        50% { clip-path: polygon(100% 35%, 50% 50%, 100% 65%, 0 100%, 0 0); }
        100% { clip-path: polygon(100% 0, 50% 50%, 100% 100%, 0 100%, 0 0); }
    }

    // 眼睛
    &:after {
        content: '';
        position: absolute;
        width: 20%;
        height: 20%;
        background-color: ${({ theme }) => theme.colors.background};
        border-radius: 50%;
        top: 20%;
        left: 20%;
    }
`;

// 定義蛇身體的樣式
const SnakeBody = styled.div`
    // 設置絕對定位，使身體部分可以自由定位
    position: absolute;
    // 計算每個身體部分的寬度，基於網格大小
    width: calc(100% / ${GRID_SIZE});
    // 計算每個身體部分的高度，基於網格大小
    height: calc(100% / ${GRID_SIZE});
    // 動態設置背景顏色，根據身體部分的索引變化
    background-color: ${({ theme, index }) => {
        const hue = 330; // 粉紅色的色相值
        const saturation = 100; // 飽和度設為100%
        const lightness = Math.max(50, 70 - index * 2); // 計算亮度，越後面的身體部分越淺
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`; // 返回 HSL 顏色值
    }};
    // 設置圓角，使身體部分呈現橢圓形
    border-radius: 40%;
    // 計算左側位置，基於 x 坐標和網格大小
    left: ${({ x }) => (x * 100 / GRID_SIZE)}%;
    // 計算頂部位置，基於 y 坐標和網格大小
    top: ${({ y }) => (y * 100 / GRID_SIZE)}%;
    // 添加過渡效果，使移動更加平滑
    transition: all 0.2s linear;
    // 添加陰影效果，增強立體感
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    // 設置 z-index，確保前面的身體部分顯示在上層
    z-index: ${({ index }) => 10 - index};
    
    // 使用偽元素創建身體部分的內部圓形
    &:after {
        content: '';
        position: absolute;
        width: 60%;
        height: 60%;
        // 設置內部圓形的背景顏色，比外部稍亮
        background-color: ${({ theme, index }) => {
            const hue = 330;
            const saturation = 100;
            const lightness = Math.max(60, 80 - index * 2);
            return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        }};
        border-radius: 40%;
        top: 20%;
        left: 20%;
        // 增加亮度，使內部圓形更加突出
        filter: brightness(1.1);
    }
`;

// 主地圖組件
const MainMap = ({ snake }) => {
    // 創建 GRID_SIZE * GRID_SIZE 的網格，填充 null 值
    const grid = Array(GRID_SIZE * GRID_SIZE).fill(null);

    return (
        <MapContainer>
            {/* 遍歷 grid 數組，為每個元素創建一個 GridCell 組件 */}
            {grid.map((_, index) => (
                <GridCell key={index} />
            ))}
            {/* 渲染蛇的身體 */}
            {snake && snake.bodyList.map((segment, index) => (
                <SnakeBody 
                    key={`body-${index}`}
                    x={segment.x}
                    y={segment.y}
                    index={index}
                />
            ))}
            {/* 渲染蛇頭 */}
            {snake && <SnakeHead x={snake.head.x} y={snake.head.y} direction={snake.direction} />}
        </MapContainer>
    );
};

// 導出 MainMap 組件，使其可以在其他文件中引入使用
export default MainMap;
