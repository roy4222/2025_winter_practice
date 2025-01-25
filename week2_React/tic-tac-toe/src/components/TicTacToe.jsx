import styled from "styled-components";
import { useState } from "react";
import { lightTheme, darkTheme } from '../styles/theme';

const TicTacToeGame = styled.div`
   * {
    border: 1px solid black;
    padding: 4px;
   }

   display: flex;
   justify-content: center;
   align-items: center;
   background: ${props => props.$isDarkMode ? darkTheme.colors.background : lightTheme.colors.background};
   padding: 20px;
   min-height: 100vh;

   .container {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 300px;
   }

   .theme-toggle {
    margin-bottom: 10px;
    background: ${props => props.$isDarkMode ? darkTheme.colors.primary : lightTheme.colors.primary};
    color: ${props => props.$isDarkMode ? darkTheme.colors.text : '#FFFFFF'};
    border: none;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      opacity: 0.9;
    }
   }

   .information, .squares, .actions button {
    background: ${props => props.$isDarkMode ? darkTheme.colors.background : '#FFFFFF'};
    color: ${props => props.$isDarkMode ? darkTheme.colors.text : lightTheme.colors.text};
    text-align: center;
    padding: 10px;
   }

   .squares {
    aspect-ratio: 1;
   }

   .actions {
    display: flex;
    flex-direction: column;
    gap: 5px;

    button {
      background: ${props => props.$isDarkMode ? darkTheme.colors.primary : lightTheme.colors.primary};
      color: ${props => props.$isDarkMode ? darkTheme.colors.text : '#FFFFFF'};
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        opacity: 0.9;
      }
    }
   }
`;

function TicTacToe() {
    const Player = ["1", "-1"];
    const defaultUserSteps = {
        "1": [],
        "-1": []
    };
    const [currentPlayer, setCurrentPlayer] = useState(Player[0]);
    const [playerStepsMap, setPlayerStepsMap] = useState(defaultUserSteps);
    const [isSinglePlay, setIsSinglePlay] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [judgmentInfo, setJudgmentInfo] = useState({
        winnerId: 0,
        winnerSteps: [],
        lastStepToWin: {}
    });
    const {
        winnerId,
        winnerSteps,
        lastStepToWin
    } = judgmentInfo;
    const isGameEndedInTie = Player.flatMap(player => playerStepsMap[player]).length === 9;

    return (
        <TicTacToeGame $isDarkMode={isDarkMode}>
            <div className="container">
                <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
                    切換{isDarkMode ? '淺色' : '深色'}主題
                </button>
                <div className="information">資訊看板</div>
                <div className="squares">棋盤九宮格</div>
                <div className="actions">
                    <button>重新開始按鈕</button>
                    <button>切換按鈕</button>
                </div>
            </div>
        </TicTacToeGame>
    )
}

export default TicTacToe;