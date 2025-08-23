//onChange, readonly, useCallback=>memoization, useEffect, useRef
import { useState,useCallback, useEffect, useRef } from 'react'

function App() {
  const [numbers,setnumbersallowed]=useState(false)
  const [Characters,setcharactersallowed]=useState(false)
  const [length,setlength]=useState(7)
  const [Password,setpassword]=useState("")
  const [bg,setbg]=useState("#3579e6")

  const passgenerator=useCallback(()=>{
    let pass=""
    const alph="ABCHEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let str=alph
    const nums="1234567890"
    const chars="!@#$%^&*{}-+`~?/[]"
    if(Characters){
      str+=chars
      pass+=chars[Math.floor(Math.random()*chars.length)]
    }
    if(numbers){
      str+=nums
      pass+=nums[Math.floor(Math.random()*nums.length)]
    }
    while(pass.length!=length){
      let ind= Math.floor(Math.random()*str.length);
      pass+=str[ind]
    }
    setpassword(pass);
  },[numbers,Characters,length])

  const passref= useRef(null)

  const copytoclipboard= useCallback(()=>{
    passref.current?.select()
    window.navigator.clipboard.writeText(Password)
  },[Password])

  useEffect(()=>{
    passgenerator()
  },[numbers,Characters,length,setpassword])

  const resetcopy=()=>{
    setbg("#3579e6")
  }

  return (
      <div className='rounded-lg h-[250px] w-[750px] absolute top-[150px] left-[400px]' style={{backgroundColor:'#2a3342'}}>
        <p className='text-white text-3xl absolute left-[250px] mt-6'>Password Generator</p>
        <div className='flex absolute top-[100px] left-[25px]'>
          <div 
            className='pl-3 pr-3 h-[50px] pt-1 rounded-l-lg text-[25px] cursor-pointer text-white'
            style={{backgroundColor:"#3579e6"}}
            onClick={()=>{
              passgenerator()
              resetcopy()
            }}
            >
            Reload
          </div>
          <input 
            type='text' 
            placeholder=' Password' 
            readOnly 
            className=' w-[520px] h-[50px] bg-white text-[23px] cursor-pointer outline-none text-orange-600 pl-3' 
            ref={passref} 
            value={Password}>
          </input>
          <div 
            className='pl-3 pr-3 h-[50px] pt-1 rounded-r-lg text-[25px] cursor-pointer text-white' 
            style={{backgroundColor:`${bg}`}} 
            onClick={()=>{
              setbg("red")
              copytoclipboard()
            }}>
          Copy</div>
        </div>
        <div className='flex items-center absolute top-[185px] left-[130px] gap-x-1'>
          <input id="rangeInput" type='range' min="7" max="40" value={length} onChange={(e)=>{
            setlength(e.target.value)
            setbg("#3579e6")
          }}/>
          <label htmlFor="rangeInput" className='text-orange-500 text-[18px] mr-13'>Length: {length}</label>
          <input type='checkbox' onChange={()=>{
            setnumbersallowed((prev)=>!prev)
            setbg("#3579e6")
          }}/> <p className='text-orange-500 mr-13'>Numbers </p>
          <input type='checkbox' onChange={()=>{
            setcharactersallowed((prev)=>!prev)
            setbg("#3579e6")
          }}/><p className='text-orange-500'>Characters </p>
        </div>
      </div>
  )
}

export default App
