import styled from 'styled-components'

const StyledButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.medium};
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  font-size: ${props => props.theme.typography.fontSize.medium};
  font-family: ${props => props.theme.typography.fontFamily};
  cursor: pointer;
  transition: ${props => props.theme.transition};

  &:hover {
    background-color: ${props => props.variant === 'secondary' 
      ? props.theme.colors.secondary 
      : props.theme.colors.primary}cc;
  }
`

export default StyledButton
