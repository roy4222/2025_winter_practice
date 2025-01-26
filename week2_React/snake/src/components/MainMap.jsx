// 導入必要的 styled-components 函數和常數
import { css } from 'styled-components';
import styled from 'styled-components';
import { MAX_WIDTH,  PAGE_PADDING } from "./constants";

// 定義地圖大小的 CSS
const mapSize = css`
    // 螢幕可用寬度，減去兩側內邊距 , 預設的最大寬度，考慮內邊距
    width: min(calc(100vw - ${PAGE_PADDING*2}px), ${MAX_WIDTH-(PAGE_PADDING*2)}px);
    height: min(calc(100vw - ${PAGE_PADDING*2}px), ${MAX_WIDTH-(PAGE_PADDING*2)}px);
`;

// 定義地圖容器的樣式
const MapContainer = styled.div`
    ${mapSize}
    border: 2px solid ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.background};
    position: relative;
    margin: ${({ theme }) => theme.spacing.medium} auto;
    display: grid;
    grid-template-columns: repeat(30, 1fr);
    grid-template-rows: repeat(30, 1fr);
`;

// 定義網格單元格的樣式
const GridCell = styled.div`
    border: 1px solid ${({ theme }) => theme.colors.border}40;
    width: 100%;
    height: 100%;
`;

// 主地圖組件
const MainMap = () => {
    // 創建35x35的網格
    const grid = Array(30 * 30).fill(null);

    return (
        <MapContainer>
            {grid.map((_, index) => (
                <GridCell key={index} />
            ))}
        </MapContainer>
    );
};

// 導出 MainMap 組件
export default MainMap;
