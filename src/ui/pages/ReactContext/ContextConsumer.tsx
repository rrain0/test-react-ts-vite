import React, { useContext } from 'react'
import { TestContext } from 'src/ui/pages/ReactContext/ContextProvider.tsx'


const ContextConsumer =
React.memo(
(props, context)=>{
  const testContext = useContext(TestContext)
  
  console.log('context', context)
  
  return <div>testContext.value: {testContext.value}, testContext.cnt: {testContext.cnt}</div>
})
export default ContextConsumer

