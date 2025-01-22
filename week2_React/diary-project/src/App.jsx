// 導入必要的 React hooks 和組件
import { useState, useEffect } from 'react'
import { Container, Button, Row, Col } from 'react-bootstrap'

// 導入自定義組件
import Counter from './components/Counter'
import DailyForm from './components/DailyForm'
import GoalSetting from './components/GoalSetting'
import LearningCalendar from './components/Calendar'
import Badges from './components/Badges'
import DataExport from './components/DataExport'

// 導入自定義的工具函數
import { 
  getStoredData, 
  saveData, 
  calculateTotalDays, 
  calculateStreak,
  formatDate,
  exportData 
} from './services/StorageService'

// 導入樣式文件
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  // 定義狀態變量
  const [data, setData] = useState(null)           // 存儲學習記錄數據
  const [totalDays, setTotalDays] = useState(0)    // 總學習天數
  const [currentStreak, setCurrentStreak] = useState(0)  // 當前連續學習天數
  const [darkMode, setDarkMode] = useState(false)

  // 組件加載時執行
  useEffect(() => {
    const storedData = getStoredData()
    if (storedData) {
      setData(storedData)
      setTotalDays(calculateTotalDays(storedData.startDate))
      setCurrentStreak(calculateStreak(storedData.days))
    }
    // 從 localStorage 讀取暗黑模式設定
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(savedDarkMode)
    if (savedDarkMode) {
      document.body.classList.add('dark-mode')
    }
  }, [])

  // 處理開始學習的函數
  const handleStartLearning = () => {
    const startDate = '2025-01-06'
    const today = '2025-01-22'
    
    // 生成從開始日期到今天的每日記錄
    const days = {}
    const start = new Date(startDate)
    const end = new Date(today)
    const current = new Date(start)
    
    // 設定每天的學習記錄
    while (current <= end) {
      const dateStr = formatDate(current)
      days[dateStr] = {
        learned: true,
        content: '學習React',
        reason: ''
      }
      current.setDate(current.getDate() + 1)
    }

    // 創建新的數據對象
    const newData = {
      startDate: startDate,
      targetDays: 100,
      days: days
    }
    setData(newData)
    saveData(newData)
    setTotalDays(calculateTotalDays(startDate))
    setCurrentStreak(calculateStreak(days))
  }

  // 處理每日提交的函數
  const handleDailySubmit = (dailyData) => {
    const today = formatDate(new Date())
    const newData = {
      ...data,
      days: {
        ...data.days,
        [today]: dailyData
      }
    }
    setData(newData)
    saveData(newData)
    setTotalDays(calculateTotalDays(data.startDate))
    setCurrentStreak(calculateStreak(newData.days))
  }

  // 處理設置目標的函數
  const handleSetTarget = (targetDays) => {
    const newData = {
      ...data,
      targetDays
    }
    setData(newData)
    saveData(newData)
  }

  // 處理導出數據的函數
  const handleExport = () => {
    exportData()
  }

  // 處理導入數據的函數
  const handleImport = (importedData) => {
    setData(importedData)
    saveData(importedData)
    setTotalDays(calculateTotalDays(importedData.startDate))
    setCurrentStreak(calculateStreak(importedData.days))
  }

  // 處理重置數據的函數
  const handleReset = () => {
    if (window.confirm('確定要重置所有學習記錄嗎？此操作無法復原。')) {
      localStorage.removeItem('learning_diary')
      setData(null)
      setTotalDays(0)
      setCurrentStreak(0)
    }
  }

  // 切換暗黑模式
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode)
    if (newDarkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }

  // 取得今天的學習記錄
  const getTodayRecord = (days) => {
    const today = formatDate(new Date())
    return days[today]
  }

  // 如果沒有數據，顯示開始學習的界面
  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <Container className="py-5">
        <div className="d-flex justify-content-end mb-3">
          <Button 
            variant={darkMode ? "light" : "dark"}
            onClick={toggleDarkMode}
            className="mb-3"
            aria-label="切換暗黑模式"
          >
            {darkMode ? '🌞 切換淺色模式' : '🌙 切換暗黑模式'}
          </Button>
        </div>
        
        {!data ? (
          <div className="text-center">
            <h1 className="mb-4">歡迎使用React學習記錄</h1>
            <Button onClick={handleStartLearning} className="btn-lg">
              開始記錄學習歷程
            </Button>
          </div>
        ) : (
          <>
            <Row className="mb-4">
              <Col>
                <Counter startDate={data.startDate} totalDays={totalDays} />
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <DailyForm 
                  onSubmit={handleDailySubmit} 
                  todayRecord={getTodayRecord(data.days)}
                />
              </Col>
              <Col md={6}>
                <Badges currentStreak={currentStreak} />
              </Col>
            </Row>

            <Row className="mb-4">
              <Col>
                <GoalSetting 
                  currentDays={totalDays} 
                  targetDays={data.targetDays}
                  onSetTarget={handleSetTarget}
                />
              </Col>
            </Row>

            <Row className="mb-4">
              <Col>
                <LearningCalendar learningData={data.days} />
              </Col>
            </Row>

            <Row className="mb-4">
              <Col>
                <DataExport onExport={handleExport} onImport={handleImport} />
              </Col>
            </Row>

            <Row>
              <Col className="text-center">
                <Button variant="danger" onClick={handleReset}>
                  重置所有數據
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  )
}

export default App
