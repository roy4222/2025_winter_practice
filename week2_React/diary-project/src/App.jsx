import { useState, useEffect } from 'react'
import { Container, Button, Row, Col } from 'react-bootstrap'
import Counter from './components/Counter'
import DailyForm from './components/DailyForm'
import { getStoredData, saveData, calculateTotalDays, formatDate } from './services/StorageService'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  const [data, setData] = useState(null)
  const [totalDays, setTotalDays] = useState(0)

  useEffect(() => {
    const storedData = getStoredData()
    if (storedData) {
      setData(storedData)
      setTotalDays(calculateTotalDays(storedData.startDate))
    }
  }, [])

  const handleStartLearning = () => {
    const startDate = '2025-01-06' // 設定固定的開始日期
    const newData = {
      startDate: startDate,
      days: {}
    }
    setData(newData)
    saveData(newData)
    setTotalDays(calculateTotalDays(startDate))
  }

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
  }

  const handleReset = () => {
    localStorage.removeItem('learning_diary')
    setData(null)
    setTotalDays(0)
  }

  if (!data) {
    return (
      <Container className="py-5 text-center">
        <h1 className="mb-4">歡迎使用React學習記錄</h1>
        <Button onClick={handleStartLearning} className="btn-lg">開始記錄學習歷程</Button>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">React學習記錄</h1>
      <Counter startDate={data.startDate} totalDays={totalDays} />
      <DailyForm onSubmit={handleDailySubmit} />
      <Row className="mt-4">
        <Col className="text-center">
          <Button variant="outline-danger" onClick={handleReset}>
            重置記錄
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default App
