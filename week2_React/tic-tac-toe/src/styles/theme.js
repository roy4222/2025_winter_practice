// 定義共用的主題配置
const baseTheme = {
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
  },
  animations: {
    fadeIn: 'fade-in 0.3s ease-in',
    slideIn: 'slide-in 0.4s ease-out',
    bounce: 'bounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  keyframes: {
    fadeIn: `
      @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `,
    slideIn: `
      @keyframes slide-in {
        from { transform: translateY(-20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    `,
    bounce: `
      @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
    `
  }
}

// 定義淺色主題
export const lightTheme = {
  ...baseTheme,
  colors: {
    primary: '#1976d2',
    secondary: '#9c27b0',
    background: '#ffffff',
    surface: '#f5f5f5',
    text: '#333333',
    textSecondary: '#666666',
    border: '#e0e0e0',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
    info: '#2196f3'
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
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    circle: '50%'
  },
  transition: {
    fast: '0.2s ease-in-out',
    normal: '0.3s ease-in-out',
    slow: '0.5s ease-in-out'
  },
  shadows: {
    small: '0 2px 4px rgba(0,0,0,0.1)',
    medium: '0 4px 6px rgba(0,0,0,0.1)',
    large: '0 8px 16px rgba(0,0,0,0.1)'
  },
  zIndex: {
    modal: 1000,
    overlay: 900,
    dropdown: 800,
    header: 700,
    footer: 600
  }
}

// 定義深色主題
export const darkTheme = {
  ...baseTheme,
  colors: {
    primary: '#90caf9',
    secondary: '#ce93d8',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff',
    textSecondary: '#b0b0b0',
    border: '#333333',
    success: '#81c784',
    warning: '#ffb74d',
    error: '#e57373',
    info: '#64b5f6'
  },
  typography: lightTheme.typography,
  spacing: lightTheme.spacing,
  borderRadius: lightTheme.borderRadius,
  transition: lightTheme.transition,
  shadows: {
    small: '0 2px 4px rgba(0,0,0,0.2)',
    medium: '0 4px 6px rgba(0,0,0,0.2)',
    large: '0 8px 16px rgba(0,0,0,0.2)'
  },
  zIndex: lightTheme.zIndex
}
