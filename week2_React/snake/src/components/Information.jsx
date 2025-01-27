import styled, { keyframes } from 'styled-components';
import { MAX_WIDTH, PAGE_PADDING } from './constants';

// 分數變化時的動畫效果
const scoreChange = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
`;

// 容器樣式
const InfoContainer = styled.div`
    width: 100%;
    max-width: ${MAX_WIDTH}px;
    padding: ${PAGE_PADDING}px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

// 分數顯示區塊樣式
const ScoreBlock = styled.div`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    padding: 10px 20px;
    border-radius: 10px;
    font-size: 1.5rem;
    font-weight: bold;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 120px;

    .score-label {
        font-size: 0.8rem;
        opacity: 0.8;
        margin-bottom: 5px;
    }

    .score-value {
        font-size: 2rem;
        animation: ${({ $changed }) => $changed ? scoreChange : 'none'} 0.3s ease-in-out;
    }
`;

// Information 組件
const Information = ({ score }) => {
    return (
        <InfoContainer>
            <ScoreBlock $changed={score > 0}>
                <span className="score-label">分數</span>
                <span className="score-value">{score}</span>
            </ScoreBlock>
        </InfoContainer>
    );
};

export default Information;