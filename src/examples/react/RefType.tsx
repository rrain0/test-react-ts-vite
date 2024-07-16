import React, { useRef } from 'react'


const RefType = () => {
  
  // type directly HTMLButtonElement
  const btnRef1 = useRef<HTMLButtonElement>(null)
  btnRef1.current?.click()
  
  // type via React, but it becomes direct type HTMLButtonElement
  const btnRef2 = useRef<React.ElementRef<'button'>>(null)
  btnRef2.current?.click()
  
  return <>
    <button ref={btnRef1}>Button 1</button>
    <button ref={btnRef2}>Button 2</button>
  </>
}



export { }
