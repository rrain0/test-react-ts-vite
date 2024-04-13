import { useState } from 'react'
import viteLogo from '/vite.svg'
import reactLogo from 'src/res/img/react.svg'
import tsLogo from 'src/res/img/Typescript-logo.png'
import 'src/ui/pages/App/App.css'
import ContextProvider from 'src/ui/components/ContextTest/ContextProvider'
import SetStateTest1 from 'src/ui/components/SetStateTest/SetStateTest1';
import SetStateTest2 from 'src/ui/components/SetStateTest/SetStateTest2';
import SetStateTest3 from 'src/ui/components/SetStateTest/SetStateTest3';
import UseEffectTestContainer from 'src/ui/components/UseEffectTest/UseEffectTestContainer';



function App(){
  const [count, setCount] = useState(0)
  console.log('reactLogo', reactLogo)
  return (
    <>
      <div>
        <a
          href="https://vitejs.dev"
          target="_blank">
          <img
            src={viteLogo}
            className="logo vite"
            alt="Vite logo"
          />
        </a>
        <a
          href="https://react.dev"
          target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt="React logo"
          />
        </a>
        <a
          href="https://www.typescriptlang.org"
          target="_blank">
          <img
            src={tsLogo}
            className="logo typescript"
            alt="Typescript logo"
          />
        </a>
      </div>
      
      <h1>Vite + React + TS</h1>
      <div className="card">
        <form>
          <button
            type="button"
            onClick={() => setCount(count => count + 1)}>
            count is {count}
          </button>
        </form>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
      
      {/* <UseEffectTestContainer/> */}
      
      <ContextProvider/>
      
      {/*
      <SetStateTest1/>
      <SetStateTest2/>
      <SetStateTest3/>
      */}
      
    </>
  )
}

export default App
