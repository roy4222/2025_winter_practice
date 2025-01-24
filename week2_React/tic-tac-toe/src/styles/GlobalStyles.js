import { createGlobalStyle } from 'styled-components'

// 創建全局樣式組件
// 這個組件將應用於整個應用程序，設置基礎樣式
const GlobalStyles = createGlobalStyle`
  // 設置全局 body 樣式
  // 使用主題中定義的顏色、字體和過渡效果
  body {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font-family: ${props => props.theme.typography.fontFamily};
    margin: 0;
    padding: 0;
    transition: ${props => props.theme.transition};
  }

  // 設置標題元素樣式
  // 包括所有標題級別（h1 到 h6），統一設置顏色和下邊距
  h1, h2, h3, h4, h5, h6 {
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.medium};
  }

  // 設置按鈕樣式
  // 定義全局按鈕的外觀，包括背景色、文字顏色、內邊距、邊框和圓角
  button {
    background-color: ${props => props.theme.colors.primary};
    color: white;
    padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.medium};
    border: none;
    border-radius: ${props => props.theme.borderRadius};
    cursor: pointer;
    transition: ${props => props.theme.transition};

    // 設置按鈕懸停效果
    // 當鼠標懸停在按鈕上時，稍微降低不透明度以提供視覺反饋
    &:hover {
      opacity: 0.9;
    }
  }
`

// 導出 GlobalStyles 組件以便在應用程序中使用
export default GlobalStyles
