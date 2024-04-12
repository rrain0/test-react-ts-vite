import React from 'react';
import UseEffectTest from 'src/ui/components/UseEffectTest/UseEffectTest';
import { useBoolState } from 'src/util/useBoolState';



const UseEffectTestContainer =
React.memo(
()=>{
  const [isShowing, , , toggleShowing] = useBoolState(true)
  
  return <>
    <button onClick={toggleShowing}>Show UseEffectTest</button>
    { isShowing && <UseEffectTest/> }
  </>
})
export default UseEffectTestContainer