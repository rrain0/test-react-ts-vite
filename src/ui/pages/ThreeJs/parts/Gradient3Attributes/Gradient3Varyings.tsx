import React, { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Mesh } from 'three'

import vertexShader from './vertexShader.glsl'
import fragmentShader from './fragmentShader.glsl'



const Gradient3Varyings = React.memo(
  () => {
    
    return (
      <div className='colC gap-[4px]'>
        <div>Gradient 3 - Varyings</div>
        <Scene/>
      </div>
    )
  }
)
export default Gradient3Varyings


const GradientBox = () => {
  const mesh = useRef<Mesh>()
  
  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      scale={1.0}
    >
      {/* this is 2D plane */}
      <planeGeometry args={[1, 1, 32, 32]}/>
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
      />
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
      camera={{ position: [0.0, 0.0, 1.0] }}
    >
      <GradientBox/>
    </Canvas>
  )
}

