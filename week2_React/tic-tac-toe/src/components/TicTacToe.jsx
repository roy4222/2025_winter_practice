import styled from "styled-components";
import Information from "./Information";
import { useState } from "react";

// 背景容器
const Background = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: ${props => props.theme.colors.background};
`;

// 主要容器
const Container = styled.div`
    background-color: ${props => props.theme.colors.primary}22;
    padding: ${props => props.theme.spacing.large};
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
`;



// 棋盤容器
const Squares = styled.div`
    background-color: ${props => props.theme.colors.primary}11;
    padding: ${props => props.theme.spacing.medium};
    border-radius: 8px;
    margin-bottom: ${props => props.theme.spacing.medium};
    min-height: 300px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${props => props.theme.spacing.small};
`;

// 操作按鈕容器
const Actions = styled.div`
    display: flex;
    justify-content: space-between;
    gap: ${props => props.theme.spacing.medium};
`;

// 重新開始按鈕
const RestartButton = styled.button`
    flex: 1;
    padding: ${props => props.theme.spacing.small};
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text};
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        opacity: 0.9;
    }
`;

// 切換按鈕
const QuitButton = styled.button`
    flex: 1;
    padding: ${props => props.theme.spacing.small};
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.text};
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        opacity: 0.9;
    }
`;

function TicTacToe() {
    const Player=["1","-1"];
    const defaultUserSteps={
        "1":[],
        "-1":[]
    };
    const [currentPlayer,setCurrentPlayer]=useState(Player[0]);
    const [playerStepsMap,setPlayerStepsMap]=useState(defaultUserSteps);
    const [isSinglePlay,setIsSinglePlay]=useState(false);
    const [judgmentInfo,setJudgmentInfo]=useState({
        winnerId:0,
        winnerSteps:[],
        lastStepToWin:{}
    });
    const {
        winnerId,
        winnerSteps,
        lastStepToWin
    }=judgmentInfo;
    const isGameEndedInTie = Player.flatMap(player => playerStepsMap[player]).length === 9;

    return (
        <Background>
            <Container>
                <Information 
                    currentPlayer={currentPlayer} 
                    winnerId={winnerId}
                    isGameEndedInTie={isGameEndedInTie}
                    >
                    資料看板
                </Information>
                <Squares
                    playerStepsMap={playerStepsMap}
                    winnerStepsList={winnerSteps}
                    handleClickSquare={handleClickSquare}
                    >
                    {/* 這裡之後會加入九個格子 */}
                </Squares>
                <Actions>
                    <RestartButton onClick={handleRestart}>重新開始</RestartButton>
                    <SwitchButton isActive={isSinglePlay} onClick={handleSwitchPlayMode}>切換模式</SwitchButton>
                </Actions>
            </Container>
        </Background>
    )
}

export default TicTacToe;