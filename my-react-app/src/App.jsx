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
  return (
    <>
      <input type="text" placeholder={name} />
      <h1 style={{ backgroundColor: 'red' }} className="h1-tag">hello {name.toUpperCase()}</h1>
      <MyComponent />
      <MyComponent />
      <MyComponent />
    </>
  )
}

export default App
