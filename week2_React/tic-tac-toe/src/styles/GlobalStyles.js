import { createGlobalStyle } from 'styled-components'

// 創建全局樣式組件
const GlobalStyles = createGlobalStyle`
  body {
    // 使用主題中定義的背景顏色
    background-color: ${props => props.theme.colors.background};
    // 使用主題中定義的文字顏色
    color: ${props => props.theme.colors.text};
    // 使用主題中定義的字體
    font-family: ${props => props.theme.typography.fontFamily};
    // 移除默認的邊距
    margin: 0;
    // 移除默認的內邊距
    padding: 0;
  }

  // 按鈕樣式
  button {
    // 使用主題中定義的主要顏色作為背景
    background-color: ${props => props.theme.colors.primary};
    // 文字顏色設為白色，確保在深色背景上可見
    color:  ${props => props.theme.colors.text};
    // 使用主題中定義的字體
    font-family: ${props => props.theme.typography.fontFamily};
    // 使用主題中定義的字體大小
    font-size: ${props => props.theme.typography.fontSize.medium};
    // 設置內邊距
    padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.medium};
    // 移除邊框
    border: none;
    // 添加圓角
    border-radius: 4px;
    // 添加指針樣式
    cursor: pointer;
    // 添加過渡效果
    transition: background-color 0.3s ease;

    // 懸停效果
    &:hover {
      // 降低透明度來表示互動狀態
      opacity: 0.9;
    }

    // 點擊效果
    &:active {
      // 稍微降低亮度
      color: ${props => props.theme.colors.text};
      filter: brightness(0.9);
    }
  }
`

// 導出 GlobalStyles 組件以便在其他地方使用
export default GlobalStyles
