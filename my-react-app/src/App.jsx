import './App.css'

function MyComponent() {
  return (
    <div>
      <h1>羅傑說你是2486</h1>
    </div>
  )
}

function App() {
 const name = 'roger'

 const handleClick = () => {
   alert('館長:RRRRR')
 }
  return (
    <>
      <input type="text" placeholder={name} />
      <button onClick={handleClick}>送出</button>
    </>
  )
}

export default App
