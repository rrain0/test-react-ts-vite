import React, { createContext, useState } from 'react'
import ContextConsumer from 'src/ui/components/ContextTest/ContextConsumer'



export const TestContext = createContext({
  value: 'default-value',
  cnt: 0,
})



const ContextProvider =
React.memo(
()=>{
  const [context, setContext] = useState({ value: 'initial-value', cnt: 1 })

  return <TestContext.Provider value={context}>
    <button onClick={()=>setContext({ ...context, cnt: context.cnt+1 })}>++</button>
    <ContextConsumer/>
  </TestContext.Provider>
})
export default ContextProvider