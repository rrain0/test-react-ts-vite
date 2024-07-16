import React, { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Color, Mesh } from 'three'

import vertexShader from './vertexShader.glsl'
import fragmentShader from './fragmentShader.glsl'




const MovingPlaneGradient = React.memo(
  () => {
    
    return (
      <div className='colC gap-[4px]'>
        <div>Moving Plane Gradient</div>
        <Scene/>
      </div>
    )
  }
)
export default MovingPlaneGradient


const MovingPlaneBox = () => {
  const mesh = useRef<Mesh>()
  
  // Uniforms are read-only variables passed to shader
  const uniforms = useMemo(() => {
    return {
      u_time: { value: 0.0 },
      u_colorA: { value: new Color('#FFE486') },
      u_colorB: { value: new Color('#FEB3D9') },
    }
  }, [])
  
  useFrame(state => {
    const { clock } = state
    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime()
  })
  
  
  
  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={1.5}
    >
      {/* this is 2D plane */}
      <planeGeometry args={[1, 1, 16, 16]}/>
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
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
      camera={{ position: [1.0, 1.0, 1.0] }}
    >
      
      <MovingPlaneBox/>
      
      {/* Enable dragging to rotate camera */}
      <OrbitControls/>
      
    </Canvas>
  )
}

