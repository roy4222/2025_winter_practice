import { useState, useEffect } from 'react'

// 定義用於存儲主題偏好的 localStorage 鍵名
const THEME_KEY = 'app-theme-preference'

export const useTheme = () => {
  // 獲取初始主題
  const getInitialTheme = () => {
    // 嘗試從 localStorage 中讀取已保存的主題
    const savedTheme = localStorage.getItem(THEME_KEY)
    // 如果存在已保存的主題，則返回該主題
    if (savedTheme) {
      return savedTheme
    }
    // 否則，檢查系統偏好並返回相應的主題
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  // 使用 useState 鉤子來管理主題狀態
  const [theme, setTheme] = useState(getInitialTheme)

  // 使用 useEffect 鉤子來監聽系統主題變化
  useEffect(() => {
    // 創建媒體查詢以檢測系統主題
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    // 定義處理系統主題變化的函數
    const handleChange = (e) => {
      // 只有在沒有用戶設定的主題時才更新
      if (!localStorage.getItem(THEME_KEY)) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }

    // 添加事件監聽器
    mediaQuery.addEventListener('change', handleChange)
    
    // 在組件卸載時移除事件監聽器
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // 切換主題的函數
  const toggleTheme = () => {
    // 根據當前主題計算新主題
    const newTheme = theme === 'light' ? 'dark' : 'light'
    // 更新狀態
    setTheme(newTheme)
    // 將新主題保存到 localStorage
    localStorage.setItem(THEME_KEY, newTheme)
  }

  // 設置特定主題的函數
  const setThemePreference = (preference) => {
    // 更新狀態
    setTheme(preference)
    // 將偏好保存到 localStorage
    localStorage.setItem(THEME_KEY, preference)
  }

  // 重置為系統偏好的函數
  const resetToSystemPreference = () => {
    // 從 localStorage 中移除用戶設定的主題
    localStorage.removeItem(THEME_KEY)
    // 根據系統偏好設置主題
    setTheme(
      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    )
  }

  // 返回主題相關的狀態和函數
  return {
    theme,                    // 當前主題
    toggleTheme,              // 切換主題的函數
    setThemePreference,       // 設置特定主題的函數
    resetToSystemPreference,  // 重置為系統偏好的函數
    isDark: theme === 'dark'  // 是否為深色主題的布爾值
  }
}
