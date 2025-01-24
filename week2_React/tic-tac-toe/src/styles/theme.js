export const lightTheme = {
  colors: {
    primary: '#1976d2',
    secondary: '#9c27b0',
    background: '#ffffff',
    surface: '#f5f5f5',
    text: '#333333',
    textSecondary: '#666666',
    border: '#e0e0e0'
  },
  typography: {
    fontSize: {
      small: '0.875rem',
      medium: '1rem',
      large: '1.25rem',
      xlarge: '1.5rem'
    },
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700
    }
  },
  spacing: {
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem',
    xlarge: '2rem'
  },
  borderRadius: '4px',
  transition: '0.3s ease-in-out',
  shadows: {
    small: '0 2px 4px rgba(0,0,0,0.1)',
    medium: '0 4px 6px rgba(0,0,0,0.1)',
    large: '0 8px 16px rgba(0,0,0,0.1)'
  }
}

export const darkTheme = {
  colors: {
    primary: '#90caf9',
    secondary: '#ce93d8',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff',
    textSecondary: '#b0b0b0',
    border: '#333333'
  },
  // 其他設定與 lightTheme 相同
  typography: lightTheme.typography,
  spacing: lightTheme.spacing,
  borderRadius: lightTheme.borderRadius,
  transition: lightTheme.transition,
  shadows: {
    small: '0 2px 4px rgba(0,0,0,0.2)',
    medium: '0 4px 6px rgba(0,0,0,0.2)',
    large: '0 8px 16px rgba(0,0,0,0.2)'
  }
}
