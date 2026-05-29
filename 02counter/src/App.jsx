import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  let [counter, setCounter] = useState(15)
  const addvalue =function() {
    if (counter < 25)
      setCounter(counter + 1);

  }
  const decvalue=  function()  {
    if (counter >= 1) {
      setCounter(counter - 1)

    }

  }
  

  return (
    <>
      <h1>hello</h1>
      <h2>the counter values :{counter}</h2>
      <button onClick={addvalue}>add value</button>
      <button onClick={decvalue}>decrease value</button>

    </>
  )
}


export default App
