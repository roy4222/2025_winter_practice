import React from 'react';
import styled from 'styled-components';

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
`;

// 方塊樣式
const Block = styled.div`
    position: relative;
    width: 100%;
    background-color: ${({ theme, $isActive }) => 
        $isActive ? theme.colors.primary : theme.colors.background};
    border: 2px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;

    &::before {
        content: '';
        display: block;
        padding-top: 100%;
    }

    &:hover {
        transform: scale(0.95);
        background-color: ${({ theme, $isActive }) => 
            $isActive ? theme.colors.primary : theme.colors.secondary}20;
    }

    &:active {
        transform: scale(0.9);
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