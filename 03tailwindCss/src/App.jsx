import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Cards from "../components/cards.jsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="bg-blue-500 text-3xl font-bold underline">
      tailwind test
      <Cards username="pooja" innerText="available tomorrow"/>

    </div>
        
    </>
  )
}

export default App
