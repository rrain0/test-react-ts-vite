import React, { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Mesh } from 'three'



const WhiteCube = React.memo(
  () => {
    
    return <div className='colC gap-[4px]'>
      <div>White Cube</div>
      <Scene />
    </div>
  }
)
export default WhiteCube



const Cube = () => {
  const mesh = useRef<Mesh>()
  
  return (
    <mesh ref={mesh}>
      {/* this is 3D cube */}
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={0xffffff} />
    </mesh>
  )
}



const Scene = () => {
  return (
    <Canvas
      style={{
        width: 400,
        height: 400,
      }}
    >
      <Cube />
    </Canvas>
  )
}

