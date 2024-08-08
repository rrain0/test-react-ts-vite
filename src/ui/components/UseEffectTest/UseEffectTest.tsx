import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useBool } from 'src/util/react-state-and-ref/useBool';


const UseEffectTest =
React.memo(()=>{
  const [showDiv, , , toggleDiv] = useBool(true)
  const [cnt, setCnt] = useState(0)
  
  const cntDivRef = useRef<HTMLDivElement>(null)
  
  /* useEffect(
    ()=>{
      console.log(`Effect applied, cnt: ${cnt}, cntDivRef.tagName: ${cntDivRef.current?.tagName}, cntDivRef.textContent: ${cntDivRef.current?.textContent}`)
      //some logic
      return () => {
        console.log(`Effect cleaning up, cnt: ${cnt}, cntDivRef.tagName: ${cntDivRef.current?.tagName}, cntDivRef.textContent: ${cntDivRef.current?.textContent}`)
        //cleanup logic
      }
    },
    [cnt, showDiv]
  ) */
  /* useLayoutEffect(
    ()=>{
      console.log(`Layout Effect applied, cnt: ${cnt}, cntDivRef.tagName: ${cntDivRef.current?.tagName}, cntDivRef.textContent: ${cntDivRef.current?.textContent}`)
      //some logic
      if (cnt<5) setCnt(cnt+1)
      return () => {
        console.log(`Layout Effect cleaning up, cnt: ${cnt}, cntDivRef.tagName: ${cntDivRef.current?.tagName}, cntDivRef.textContent: ${cntDivRef.current?.textContent}`)
        //cleanup logic
      }
    },
    [cnt, showDiv]
  ) */
  
  /* useEffect(
    ()=>{
      for (let i = 0; i < 5e8; i++) {
      
      }
      console.log(`Layout applied, cnt: ${cnt}, cntDivRef.tagName: ${cntDivRef.current?.tagName}, cntDivRef.textContent: ${cntDivRef.current?.textContent}`)
      //some logic
      if (cnt<5) setCnt(cnt+1)
      return () => {
        console.log(`Layout cleaning up, cnt: ${cnt}, cntDivRef.tagName: ${cntDivRef.current?.tagName}, cntDivRef.textContent: ${cntDivRef.current?.textContent}`)
        //cleanup logic
      }
    },
    [cnt, showDiv]
  ) */
  /* useLayoutEffect(
    ()=>{
      for (let i = 0; i < 5e8; i++) {
        
      }
      console.log(`Layout Effect applied, cnt: ${cnt}, cntDivRef.tagName: ${cntDivRef.current?.tagName}, cntDivRef.textContent: ${cntDivRef.current?.textContent}`)
      //some logic
      if (cnt<5) setCnt(cnt+1)
      return () => {
        console.log(`Layout Effect cleaning up, cnt: ${cnt}, cntDivRef.tagName: ${cntDivRef.current?.tagName}, cntDivRef.textContent: ${cntDivRef.current?.textContent}`)
        //cleanup logic
      }
    },
    [cnt, showDiv]
  ) */
  
  
  useEffect(
    ()=>{
      console.log(`Layout applied, cnt: ${cnt}, cntDivRef.tagName: ${cntDivRef.current?.tagName}, cntDivRef.textContent: ${cntDivRef.current?.textContent}`)
      //some logic
      if (cnt<5) setCnt(cnt+1)
      for (let i = 0; i < 5e8; i++) {
      
      }
      return () => {
        console.log(`Layout cleaning up, cnt: ${cnt}, cntDivRef.tagName: ${cntDivRef.current?.tagName}, cntDivRef.textContent: ${cntDivRef.current?.textContent}`)
        //cleanup logic
      }
    },
    [cnt, showDiv]
  )
  
  
  return <div style={{
    display: 'flex',
    flexFlow: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <div>Use Effect Test</div>
    
    {showDiv && <div ref={cntDivRef}>Count: {cnt}</div>}
    <button onClick={toggleDiv}>Toggle Count Div</button>
    <button onClick={() => setCnt(cnt + 1)}>++</button>
    
    <>{console.log('rendering...')}</>
  </div>
})
export default UseEffectTest