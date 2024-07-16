import React, { useRef } from 'react'
import { Canvas } from '@react-three/fiber'



const WhiteCube = React.memo(
  () => {
    
    return <Scene />
  }
)
export default WhiteCube



const Cube = () => {
  const mesh = useRef()
  
  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={0xffffff} />
    </mesh>
  )
}



const Scene = () => {
  return (
    <Canvas>
      <Cube />
    </Canvas>
  )
}

