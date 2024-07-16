import React, { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Mesh } from 'three'

import vertexShader from './vertexShader.glsl'
import fragmentShader from './fragmentShader.glsl'




const MovingPlane = React.memo(
  () => {
    
    return (
      <div className='colC gap-[4px]'>
        <div>Moving Plane - Uniforms</div>
        <Scene/>
      </div>
    )
  }
)
export default MovingPlane


const MovingPlaneBox = () => {
  const mesh = useRef<Mesh>()
  
  // Uniforms are read-only variables passed to shader
  const uniforms = useMemo(() => {
    return {
      u_time: {
        value: 0.0,
      },
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
      <planeGeometry args={[1, 1, 32, 32]}/>
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        /* display wireframe of plane instead of fill color */
        wireframe
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
      camera={{ position: [1.0, 1.5, 1.0] }}
    >
      
      <MovingPlaneBox/>
      
      {/* Enable dragging to rotate camera */}
      <OrbitControls/>
      
      {/* Show axis */}
      <axesHelper/>
      
    </Canvas>
  )
}

