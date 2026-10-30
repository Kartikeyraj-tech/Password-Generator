import { useState , useCallback , useEffect, useRef} from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);  // number allowed h ya ni usme uski default value false mtlb number pr tick ni lga hua rha toh wo number ni dega
  const [charAllowed, setCharAllowed] = useState(false); // same for character
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  // password generator using callback hook means jo purana memory rha number chahe char wo pass hoga length vi and setpassword vi
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(charAllowed) str+= "!@~#$%^&*(){}[]-`";

    for(let i = 1; i<=length ; i++){
    let char = Math.floor(Math.random() * str.length + 1) // +1 iseliye agr 0 aaye multiply hoke toh 1 add ho jaye
      pass += str.charAt(char) // pass mei str aur upr wala char daal do
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword]) // sb as a array pass hoga callback function mei

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator]) // useEffect hook use iseliye kiye kyuki agr generated password mei kch vi cher chaar ho toh dubara se run kr do jaise tick hoga number ya char mei dubara se run hoga password genrate hoga dubara


  return (
  <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-600">
    <h1 className='text-white text-center'>Password Generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
    <input 
      type="text"
      value={password}
      className="outline-none w-full py-1 px-3 bg-white" // padding y axis se 1 aur x axis se 3 ka
      placeholder="Password"
      readOnly
      ref={passwordRef}
    />
    <button
    onClick={copyPasswordToClipboard}
    className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 transition-transform active:scale-95'>copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input
        type="range"
        min ={6}
        max = {100}
        value={length}
        className='cursor-pointer'
        onChange={(e) => setLength(Number(e.target.value))}
        />
        <label>Length : {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input 
          type="checkbox"
          checked = {numberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev); // prev ka reverse le lena agr checkbox pr tick hua toh number dal jayega password mei
          }}
        />
        <label>Numbers {numberAllowed}</label>

      </div>
      <div className="flex items-center gap-x-1">
        <input 
          type="checkbox"
          defaultChecked={charAllowed}
          id="characterInput"
          onChange={() => {
              setCharAllowed((prev) => !prev);
          }}
        />
        <label>Characters {charAllowed}</label>
      </div>
    </div>
  </div>
  )
}

export default App
