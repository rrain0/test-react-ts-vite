import React from 'react';
import UseEffectTest from 'src/ui/components/UseEffectTest/UseEffectTest';
import { useBool } from 'src/util/react-state-and-ref/useBool';



const UseEffectTestContainer =
React.memo(
()=>{
  const [isShowing, , , toggleShowing] = useBool(true)
  
  return <>
    <button onClick={toggleShowing}>Show UseEffectTest</button>
    { isShowing && <UseEffectTest/> }
  </>
})
export default UseEffectTestContainer