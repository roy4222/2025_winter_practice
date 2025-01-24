// 導入 styled-components 庫
import styled from 'styled-components'

// 創建一個名為 StyledButton 的樣式化按鈕組件
const StyledButton = styled.button`
  // 設置按鈕的背景顏色，使用主題中定義的主要顏色
  background-color: ${props => props.theme.colors.primary};
  // 設置文字顏色為白色
  color: white;
  // 設置內邊距，使用主題中定義的間距
  padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.medium};
  // 移除邊框
  border: none;
  // 設置邊框圓角，使用主題中定義的值
  border-radius: ${props => props.theme.borderRadius};
  // 設置字體大小，使用主題中定義的中等大小
  font-size: ${props => props.theme.typography.fontSize.medium};
  // 設置字體家族，使用主題中定義的字體
  font-family: ${props => props.theme.typography.fontFamily};
  // 設置鼠標懸停時的指針樣式
  cursor: pointer;
  // 設置過渡效果，使用主題中定義的過渡設置
  transition: ${props => props.theme.transition};

  // 定義懸停狀態的樣式
  &:hover {
    // 根據按鈕的變體（variant）屬性來決定懸停時的背景顏色
    // 如果是 'secondary' 變體，使用次要顏色；否則使用主要顏色
    // 'cc' 是添加 80% 的不透明度（204/255 ≈ 0.8）
    background-color: ${props => props.variant === 'secondary' 
      ? props.theme.colors.secondary 
      : props.theme.colors.primary}cc;
  }
`

// 導出 StyledButton 組件以供其他檔案使用
export default StyledButton
