import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState("")
  const passGenerator = useCallback(() => {
    let pass;
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (characters) {
      str += "!@#$%^&*()_+{}|:<>?-=[];',./`~"
    }
    if (number) {
      str += "0123456789"
    }
    for (let i = 1; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length + 1)
      pass  += str.charAt(randomIndex)

    }
    setPassword(pass)
  }, [length, number, characters, setPassword])
  useEffect(()=>{ passGenerator()}, [passGenerator, setNumber, setCharacters, length])
  const passreference  = useRef(null)
  const copyToClipboard = useCallback(()=>{
    window.navigator.clipboard.writeText(password);


  },[password])
  const showText = useCallback(()=>{
    alert("Password Copied to Clipboard")
  },[password])



  return (
    <>
      <h1 style={{ color: 'purple' }}>Password Generator</h1>
      <div className='w-full max-w-md mx-auto mt-10 p-6 border-2 px-4 text-orange-500 border-purple-500 rounded-lg'>
        <div className="flex flex-col gap-4 overflow-hidden mb-4">
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly />
          <button className='outline-none bg-blue ml-3 text-white'onClick={copyToClipboard,showText}>copy </button>

        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <input type="range" min={8} max={30} value={length} className='cursor-pointer' onChange={(e)=>{
              setLength(e.target.value)}} ref={passreference}/>
              
            <label >Length: {length}</label>
           </div>
           <div  className='flex items-center gap-3'>
            <input type="checkbox" defaultChecked={number} onChange={()=>{
              setNumber((prev)=>!prev)}} id = "input-no"></input>
              <label htmlFor='input-no'>Include Numbers</label>

           </div>
           
           <div  className='flex items-center gap-2'>
            <input type="checkbox" defaultChecked={characters} onChange={()=>{
              setCharacters((prev)=>!prev)}} id = "input-char"></input>
              <label htmlFor='input-char'>Include Characters </label>

           </div>
        </div>
      </div>



      </>
      )
}

      export default App
