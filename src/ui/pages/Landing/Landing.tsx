import { useState } from 'react'
import viteLogo from '/vite.svg'
import { Link } from 'react-router-dom'
import reactLogo from 'src/res/img/react.svg'
import tsLogo from 'src/res/img/Typescript-logo.png'
import 'src/ui/pages/Landing/Landing.css'
import SetStateTest1 from 'src/ui/components/SetStateTest/SetStateTest1'
import SetStateTest2 from 'src/ui/components/SetStateTest/SetStateTest2'
import SetStateTest3 from 'src/ui/components/SetStateTest/SetStateTest3'
import UseEffectTestContainer from 'src/ui/components/UseEffectTest/UseEffectTestContainer'




function Landing() {
  const [count, setCount] = useState(0)
  console.log('reactLogo', reactLogo)
  return (
    <div className='colC gap-[10px] w-full p-[2rem] text-center'>
      <div className='row'>
        <a
          href='https://vitejs.dev'
          target='_blank'>
          <img
            src={viteLogo}
            className='logo vite'
            alt='Vite logo'
          />
        </a>
        <a
          href='https://react.dev'
          target='_blank'>
          <img
            src={reactLogo}
            className='logo react'
            alt='React logo'
          />
        </a>
        <a
          href='https://www.typescriptlang.org'
          target='_blank'>
          <img
            src={tsLogo}
            className='logo typescript'
            alt='Typescript logo'
          />
        </a>
      </div>
      
      <h1>Vite + React + TS</h1>
      <div className='card'>
        <form>
          <button
            type='button'
            onClick={() => setCount(count => count + 1)}>
            count is {count}
          </button>
        </form>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
      
      <div className='h-[60px]'/>
      
      
      <div className='rowW gap-[30px]'>
        
        <Link to='/three-js'>
          <button>Three JS</button>
        </Link>
        
        <Link to='/react-context'>
          <button>React Context</button>
        </Link>
        
        <Link to='/react-spring'>
          <button>React Spring</button>
        </Link>
        
        {/* <Link to='/yandex-translate'>
          <button>Yandex Translate</button>
        </Link> */}
      </div>
      
      
      {/* <UseEffectTestContainer/> */}
      
      
      {/*
      <SetStateTest1/>
      <SetStateTest2/>
      <SetStateTest3/>
      */}
      
      
      
      {/*
        When ParentComponent was re-rendered by her state change,
        ChildComponent did not render because the App did not render.
        This technique is called 'Lifting the state up'.
        ChildComponent as a prop from App component did not change so did not render.
      */}
      {/*
      <ParentComponent>
        <ChildComponent />
      </ParentComponent>
      */}
      
    </div>
  )
}

export default Landing




function ParentComponent({ children }) {
  const [name, setName] = useState('')
  
  return <div>
    <input value={name} onChange={e => setName(e.target.value)} />
    <button>Submit</button>
    {children}
  </div>
}

function ChildComponent() {
  return <div>Children Div</div>
}
