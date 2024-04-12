import { useEffect, useState } from 'react';


const SetStateTest2 = ()=>{
  const [count, setCount] = useState(0)
  const [needToIncrement, setNeedToIncrement] = useState(false)
  
  // в общем прибавляет 2
  useEffect(()=>{
    if (needToIncrement){
      setCount(count+1)
      setNeedToIncrement(false)
    }
  }, [needToIncrement, count])
  
  useEffect(() => {
    if (needToIncrement){
      setCount(prevCount=>prevCount+1)
      setNeedToIncrement(false)
    }
  }, [needToIncrement, count]);
  
  return <div>
    <div>count is: {count}</div>
    <button onClick={()=>setNeedToIncrement(true)}>+2</button>
  </div>
}
export default SetStateTest2

