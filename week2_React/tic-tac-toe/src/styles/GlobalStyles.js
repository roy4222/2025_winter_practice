import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font-family: ${props => props.theme.typography.fontFamily};
    margin: 0;
    padding: 0;
    transition: ${props => props.theme.transition};
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.medium};
  }

  button {
    background-color: ${props => props.theme.colors.primary};
    color: white;
    padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.medium};
    border: none;
    border-radius: ${props => props.theme.borderRadius};
    cursor: pointer;
    transition: ${props => props.theme.transition};

    &:hover {
      opacity: 0.9;
    }
  }
`

export default GlobalStyles
