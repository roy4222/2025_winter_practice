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
const SnakeHead = styled.div.attrs(props => ({
    style: {
        left: `${(props.x * 100 / GRID_SIZE)}%`,
        top: `${(props.y * 100 / GRID_SIZE)}%`,
        transform: (() => {
            if (props.direction.x === 1) return 'rotate(0deg)';
            if (props.direction.x === -1) return 'rotate(180deg)';
            if (props.direction.y === 1) return 'rotate(90deg)';
            if (props.direction.y === -1) return 'rotate(-90deg)';
            return 'rotate(0deg)';
        })(),
        transition: props.$isCrossing ? 'none' : `all ${props.speed * 0.25}ms linear`
    }
}))`
    position: absolute;
    width: calc(100% / ${GRID_SIZE});
    height: calc(100% / ${GRID_SIZE});
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    z-index: 1;
    animation: mouthMove 0.3s infinite linear;

    @keyframes mouthMove {
        0% { clip-path: polygon(100% 0, 50% 50%, 100% 100%, 0 100%, 0 0); }
        50% { clip-path: polygon(100% 35%, 50% 50%, 100% 65%, 0 100%, 0 0); }
        100% { clip-path: polygon(100% 0, 50% 50%, 100% 100%, 0 100%, 0 0); }
    }

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
const SnakeBody = styled.div.attrs(props => ({
    style: {
        left: `${(props.x * 100 / GRID_SIZE)}%`,
        top: `${(props.y * 100 / GRID_SIZE)}%`,
        zIndex: 10 - props.$index,
        // 設定固定的較短動畫時間,最多30ms
        transition: props.$isCrossing ? 'none' : `all ${Math.min(30, props.speed * 0.15)}ms linear`,
        transform: props.$isCrossing ? 'none' : undefined
    }
}))`
    position: absolute;
    width: calc(100% / ${GRID_SIZE});
    height: calc(100% / ${GRID_SIZE});
    background-color: ${({ theme, $index }) => {
        const hue = 330;
        const saturation = 100;
        const lightness = Math.max(50, 70 - $index * 2);
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }};
    border-radius: 40%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    &:after {
        content: '';
        position: absolute;
        width: 60%;
        height: 60%;
        background-color: ${({ theme, $index }) => {
            const hue = 330;
            const saturation = 100;
            const lightness = Math.max(60, 80 - $index * 2);
            return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        }};
        border-radius: 40%;
        top: 20%;
        left: 20%;
        filter: brightness(1.1);
    }
`;

// 定義食物的樣式
const Food = styled.div.attrs(props => ({
    style: {
        left: `${(props.x * 100 / GRID_SIZE)}%`,
        top: `${(props.y * 100 / GRID_SIZE)}%`,
    }
}))`
    position: absolute;
    width: calc(100% / ${GRID_SIZE});
    height: calc(100% / ${GRID_SIZE});
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 50%;
    transform: scale(0.8);
    animation: pulse 1s infinite;

    @keyframes pulse {
        0% { transform: scale(0.8); }
        50% { transform: scale(0.9); }
        100% { transform: scale(0.8); }
    }

    &:before {
        content: '';
        position: absolute;
        width: 30%;
        height: 30%;
        background-color: ${({ theme }) => theme.colors.background};
        border-radius: 50%;
        top: 15%;
        right: 15%;
        opacity: 0.7;
    }
`;

// 主地圖組件
// 接收 snake 和 food 作為 props，用於渲染蛇和食物
const MainMap = ({ snake, food }) => {
    // 檢查是否是邊界穿越
    // 此函數用於判斷蛇是否正在穿越地圖邊界
    const isCrossingBoundary = (pos1, pos2) => {
        // 計算兩點在 x 軸和 y 軸上的絕對距離
        const dx = Math.abs(pos1.x - pos2.x);
        const dy = Math.abs(pos1.y - pos2.y);
        // 如果 x 或 y 的距離大於 1，則認為是在穿越邊界
        return dx > 1 || dy > 1;
    };

    return (
        // MapContainer 是一個自定義的 styled-component，用於創建遊戲地圖的容器
        <MapContainer>
            {/* 生成網格 */}
            {/* 使用 Array.from 創建一個長度為 GRID_SIZE * GRID_SIZE 的數組，並遍歷它 */}
            {/* 每個元素都渲染為一個 GridCell 組件，形成遊戲的背景網格 */}
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => (
                <GridCell key={index} />
            ))}
            
            {/* 渲染蛇頭 */}
            {/* SnakeHead 是一個自定義的 styled-component，用於渲染蛇頭 */}
            <SnakeHead 
                x={snake.head.x}  // 蛇頭的 x 坐標
                y={snake.head.y}  // 蛇頭的 y 坐標
                direction={snake.direction}  // 蛇的移動方向
                speed={snake.speed}  // 蛇的移動速度
                // 判斷蛇頭是否正在穿越邊界
                $isCrossing={snake.bodyList.length > 0 && isCrossingBoundary(snake.head, snake.bodyList[0])}
            />

            {/* 渲染蛇身 */}
            {/* 遍歷 snake.bodyList 數組，渲染每一節蛇身 */}
            {snake.bodyList.map((body, index) => {
                // 使用前一個位置作為參考點，用於判斷是否穿越邊界
                // 如果是第一節身體，則使用蛇頭作為參考點
                const prevPos = index === 0 ? snake.head : snake.bodyList[index - 1];
                return (
                    // SnakeBody 是一個自定義的 styled-component，用於渲染蛇身
                    <SnakeBody 
                        key={index}  // React 列表渲染需要的唯一 key
                        x={body.x}  // 身體節點的 x 坐標
                        y={body.y}  // 身體節點的 y 坐標
                        $index={index}  // 用於計算身體顏色漸變
                        speed={snake.speed}  // 蛇的移動速度
                        // 判斷該節身體是否正在穿越邊界
                        $isCrossing={isCrossingBoundary(body, prevPos)}
                    />
                );
            })}

            {/* 渲染食物 */}
            {/* 只有當 food 存在時才渲染 Food 組件 */}
            {food && <Food x={food.x} y={food.y} />}
        </MapContainer>
    );
};

// 導出 MainMap 組件，使其可以在其他文件中引入使用
export default MainMap;
