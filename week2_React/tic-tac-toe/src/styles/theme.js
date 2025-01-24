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

// 定義粉紫色主題
export const pinkPurple = {
  // 主要文字顏色，設置為白色以確保在深色背景上的可讀性
  colors: "#FFFFFF",
  // 背景顏色，使用深紫色作為主題的基調
  background: "#390099",
  // 方塊（棋盤格子）的顏色設置
  block: {
    normal: "#FF8FA3",  // 正常狀態，使用柔和的粉紅色
    hover: "#FFB3C1",   // 滑鼠懸停狀態，顏色稍微變亮以提供視覺反饋
    active: "#fa506f",  // 點擊狀態，使用更深的粉紅色以表示激活狀態
  },
  // 棋子顏色，設置為白色以與深色背景形成對比
  chess: '#FFFFFF',
  // 重新開始按鈕的顏色設置
  restartButton: {
    normal: "FFBD00",   // 正常狀態，使用明亮的黃色以吸引注意
    hover: "#FFC933",   // 滑鼠懸停狀態，顏色稍微變亮
    active: "#FFBE0A",  // 點擊狀態，顏色稍微變暗以模擬按下效果
  },
  // 切換按鈕的顏色設置
  switchButton: {
    on: "#FF758F",      // 開啟狀態，使用粉紅色以匹配主題
    off: "#a5a5a5",     // 關閉狀態，使用灰色以表示非激活狀態
  }
}

// 定義櫻花主題
export const sakuraTheme = {
  colors: {
    primary: '#FFB7C5',    // 櫻花粉紅色
    secondary: '#E0B0FF',  // 淡紫色
    background: '#FFF0F5', // 淡粉紅色背景
    text: '#4A0E2A',       // 深紫紅色文字
  },
  typography: lightTheme.typography,
  spacing: lightTheme.spacing,
  block: {
    normal: '#FFDAB9',     // 淡橙色
    hover: '#FFE4E1',      // 淡粉紅色
    active: '#FF69B4',     // 亮粉紅色
  },
  chess: '#8B4513',        // 深棕色
  restartButton: {
    normal: '#FF1493',     // 深粉紅色
    hover: '#FF69B4',      // 亮粉紅色
    active: '#DB7093',     // 淡紫紅色
  },
  switchButton: {
    on: '#FF69B4',         // 亮粉紅色
    off: '#D3D3D3',        // 淺灰色
  }
}

// 定義中國新年主題
export const chineseNewYearTheme = {
  colors: {
    primary: '#E50000',    // 喜慶紅色
    secondary: '#FFD700',  // 金色
    background: '#FFEFEF', // 淡紅色背景
    text: '#8B0000',       // 深紅色文字
  },
  typography: lightTheme.typography,
  spacing: lightTheme.spacing,
  block: {
    normal: '#FFB6C1',     // 淺粉紅色
    hover: '#FFA07A',      // 淺鮭魚色
    active: '#FF4500',     // 橙紅色
  },
  chess: '#000000',        // 黑色
  restartButton: {
    normal: '#FFD700',     // 金色
    hover: '#FFA500',      // 橙色
    active: '#FF8C00',     // 深橙色
  },
  switchButton: {
    on: '#FF0000',         // 紅色
    off: '#A9A9A9',        // 深灰色
  }
}
