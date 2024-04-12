import { useEffect, useState } from 'react';


const SetStateTest1 = ()=>{
  const [count, setCount] = useState(0)
  const [needToIncrement, setNeedToIncrement] = useState(false)
  
  // в общем прибавляет 1
  useEffect(()=>{
    if (needToIncrement){
      setCount(count+1)
      setNeedToIncrement(false)
    }
  }, [needToIncrement, count])
  
  useEffect(() => {
    if (needToIncrement){
      setCount(count+1)
      setNeedToIncrement(false)
    }
  }, [needToIncrement, count]);
  
  return <div>
    <div>count is: {count}</div>
    <button onClick={()=>setNeedToIncrement(true)}>+2</button>
  </div>
}
export default SetStateTest1
