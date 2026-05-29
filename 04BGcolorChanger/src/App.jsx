import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [color, setColor] = useState("black")

  return (
    <>
      <div className="w-full h-screen duration-200" style={{ backgroundColor: color }}>
        <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
          <button style={{ backgroundColor: "red", color: "black" }} className="bg-white text-black px-4 py-2 rounded-lg m-2" onClick={() => setColor("red")}>Red</button>
          <button style={{ backgroundColor: "blue", color: "black" }} className="bg-white text-black px-4 py-2 rounded-lg m-2" onClick={() => setColor("blue")}>Blue</button>
          <button style={{ backgroundColor: "green", color: "black" }} className="bg-white text-black px-4 py-2 rounded-lg m-2" onClick={() => setColor("green")}>Green</button>
          <button style={{ backgroundColor: "yellow", color: "black" }} className="bg-white text-black px-4 py-2 rounded-lg m-2" onClick={() => setColor("yellow")}>Yellow</button>
          <button style={{ backgroundColor: "purple", color: "black" }} className="bg-white text-black px-4 py-2 rounded-lg m-2" onClick={() => setColor("purple")}>Purple</button>
          <button style={{ backgroundColor: "pink", color: "black" }} className="bg-white text-black px-4 py-2 rounded-lg m-2" onClick={() => setColor("pink")}>Pink</button>
          <button style={{ backgroundColor: "orange", color: "black" }} className="bg-white text-black px-4 py-2 rounded-lg m-2" onClick={() => setColor("orange")}>Orange</button>
          <button style={{ backgroundColor: "indigo", color: "black" }} className="bg-white text-black px-4 py-2 rounded-lg m-2" onClick={() => setColor("indigo")}>Indigo</button>
          <button style={{ backgroundColor: "teal", color: "black" }} className="bg-white text-black px-4 py-2 rounded-lg m-2" o nClick={() => setColor("teal")}>Teal</button>
          <button style={{ backgroundColor: "cyan", color: "black" }} className ="bg-white text-black px-4 py-2 rounded-lg m-2" onClick={() => setColor("cyan")}>Cyan</button>



        </div>
      </div>


    </>
  )
}

export default App
