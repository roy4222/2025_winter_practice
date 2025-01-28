import React from 'react';
import styled, { keyframes } from 'styled-components';

// 流光動畫
const shine = keyframes`
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
`;

// 邊框閃光動畫
const borderShine = keyframes`
    0% {
        border-color: ${({ theme }) => theme.colors.border};
    }
    50% {
        border-color: ${({ theme }) => theme.colors.primary};
    }
    100% {
        border-color: ${({ theme }) => theme.colors.border};
    }
`;

// 波紋動畫
const ripple = keyframes`
    0% {
        transform: scale(0);
        opacity: 1;
    }
    100% {
        transform: scale(4);
        opacity: 0;
    }
`;

// 容器樣式
const Container = styled.div`
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: ${({ theme }) => theme.spacing.medium};
`;

// 網格容器樣式
const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.$sideNum}, 1fr);
    gap: ${({ theme }) => theme.spacing.small};
    aspect-ratio: 1;
    perspective: 1000px;
`;

// 方塊樣式
const Block = styled.div`
    // 基本定位和尺寸
    position: relative;
    width: 100%;

    // 背景顏色設置，根據活動狀態變化
    background: ${({ theme, $isActive }) => 
        $isActive 
            ? `linear-gradient(120deg, 
                ${theme.colors.primary}, 
                ${theme.colors.secondary}, 
                ${theme.colors.primary})`
            : theme.colors.background};
    background-size: 200% 200%;

    // 邊框和圓角設置
    border: 2px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;

    // 游標樣式和過渡效果
    cursor: pointer;
    transition: all 0.3s ease;

    // 3D 變換樣式
    transform-style: preserve-3d;

    // 活動狀態時的動畫效果
    animation: ${({ $isActive }) => $isActive ? shine : 'none'} 3s linear infinite;

    // 保持正方形比例
    &::before {
        content: '';
        display: block;
        padding-top: 100%;
    }

    // 點擊效果的內部元素
    &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 5px;
        height: 5px;
        background: ${({ theme }) => theme.colors.primary}40;
        border-radius: 50%;
        opacity: 0;
        pointer-events: none;
    }

    // 活動狀態的額外樣式
    ${({ $isActive }) => $isActive && `
        animation: ${borderShine} 2s ease-in-out infinite;
        box-shadow: 0 5px 15px ${({ theme }) => theme.colors.primary}40;
    `}

    // 懸停效果
    &:hover {
        transform: scale(0.95) rotateX(10deg) rotateY(10deg);
        background-color: ${({ theme, $isActive }) => 
            $isActive ? theme.colors.primary : theme.colors.secondary}20;
    }

    // 點擊效果
    &:active {
        transform: scale(0.9);
        
        &::after {
            animation: ${ripple} 0.8s ease-out;
        }
    }
`;

// 方塊內容樣式
const BlockContent = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({ theme }) => theme.typography.fontSize.medium};
    color: ${({ theme }) => theme.colors.text};
    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

const Blocks = ({ 
    blockNum,
    questions = [], 
    answer = [],
    isGameStart = false,
    onBlockClick 
}) => {
    // 生成方塊陣列
    const blocks = new Array(blockNum).fill(0).map((_, index) => index);
    
    // 計算邊長
    const sideNum = Math.sqrt(blockNum);

    // 檢查方塊是否處於激活狀態
    const isBlockActive = (index) => {
        if (!isGameStart) return false;
        return questions.includes(index) || answer.includes(index);
    };

    // 處理方塊點擊
    const handleBlockClick = (index) => {
        if (onBlockClick && isGameStart) {
            onBlockClick(index);
        }
    };

    return (
        <Container>
            <GridContainer $sideNum={sideNum}>
                {blocks.map((index) => (
                    <Block 
                        key={index}
                        $isActive={isBlockActive(index)}
                        onClick={() => handleBlockClick(index)}
                    >
                        <BlockContent>
                            {isBlockActive(index) ? index : ''}
                        </BlockContent>
                    </Block>
                ))}
            </GridContainer>
        </Container>
    );
};

export default Blocks;