// 定義淺色主題
export const lightTheme = {
  // 顏色配置
  colors: {
    primary: '#1976d2',    // 主要強調色（藍色）
    secondary: '#9c27b0',  // 次要強調色（紫色）
    background: '#ffffff', // 背景顏色（白色）
    text: '#333333',       // 文字顏色（深灰色）
  },
  // 排版設置
  typography: {
    fontSize: {
      small: '0.875rem',   // 小字體大小
      medium: '1rem',      // 中等字體大小
      large: '1.25rem',    // 大字體大小
    },
    // 字體家族，提供多種備選字體以確保跨平台一致性
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
  },
  // 間距設置
  spacing: {
    small: '0.5rem',       // 小間距
    medium: '1rem',        // 中等間距
    large: '1.5rem',       // 大間距
  }
}

// 定義深色主題
export const darkTheme = {
  // 顏色配置（深色模式）
  colors: {
    primary: '#90caf9',    // 主要強調色（淺藍色）
    secondary: '#ce93d8',  // 次要強調色（淺紫色）
    background: '#121212', // 背景顏色（深灰色）
    text: '#ffffff',       // 文字顏色（白色）
  },
  // 複用淺色主題的排版設置
  typography: lightTheme.typography,
  // 複用淺色主題的間距設置
  spacing: lightTheme.spacing
}

