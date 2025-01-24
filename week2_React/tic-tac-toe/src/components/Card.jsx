import styled, { css } from 'styled-components'

// 創建媒體查詢工具函數
const media = {
  xs: (...args) => css`
    @media (max-width: ${props => props.theme.breakpoints.xs}) {
      ${css(...args)}
    }
  `,
  sm: (...args) => css`
    @media (min-width: ${props => props.theme.breakpoints.sm}) {
      ${css(...args)}
    }
  `,
  md: (...args) => css`
    @media (min-width: ${props => props.theme.breakpoints.md}) {
      ${css(...args)}
    }
  `,
  lg: (...args) => css`
    @media (min-width: ${props => props.theme.breakpoints.lg}) {
      ${css(...args)}
    }
  `
}

// 基礎卡片組件
const Card = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.medium};
  box-shadow: ${props => props.theme.shadows.small};
  transition: ${props => props.theme.transition.normal};
  animation: ${props => props.theme.animations.fadeIn};
  
  // 響應式樣式
  ${media.xs`
    padding: ${props => props.theme.spacing.small};
    margin: ${props => props.theme.spacing.small};
  `}
  
  ${media.sm`
    padding: ${props => props.theme.spacing.medium};
    margin: ${props => props.theme.spacing.medium};
  `}
  
  ${media.md`
    padding: ${props => props.theme.spacing.large};
    margin: ${props => props.theme.spacing.large};
  `}

  // 條件式樣式
  ${props => props.variant === 'elevated' && css`
    box-shadow: ${props => props.theme.shadows.large};
    transform: translateY(-2px);
  `}

  ${props => props.variant === 'outlined' && css`
    border: 1px solid ${props => props.theme.colors.border};
    box-shadow: none;
  `}

  // 懸停效果
  &:hover {
    box-shadow: ${props => props.theme.shadows.medium};
    transform: translateY(-1px);
  }

  // 動畫效果
  ${props => props.animated && css`
    animation: ${props => props.theme.animations.slideIn};
  `}
`

// 卡片標題
const CardTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.large};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin-bottom: ${props => props.theme.spacing.small};
`

// 卡片內容
const CardContent = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.medium};
  line-height: 1.5;
`

// 卡片動作區
const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing.small};
  margin-top: ${props => props.theme.spacing.medium};
`

export { Card, CardTitle, CardContent, CardActions }
