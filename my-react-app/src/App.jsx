import './App.css'

function MyComponent() {
  return (
    <div>
      <h1>羅傑說你是2486</h1>
    </div>
  )
}

function App() {
 const listItems =[
   {content:'羅傑', id:'1'},
   {content:'統神', id:'2'},
   {content:'館長', id:'3'},
 ];
 
 const filterItems = listItems.filter((item)=>{
  if (item.content !== '統神'){
    return true;
  }
 })
  ;
 
  return (
    <>
      {filterItems.map((item)=> <div key={item.id}>{item.content}</div>)}
    </>
  )
}

export default App
