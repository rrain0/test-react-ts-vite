import React, { useRef } from 'react'
import { Canvas, extend, Object3DNode, useFrame, useThree } from '@react-three/fiber'
import { Plane, shaderMaterial, useTexture } from '@react-three/drei'
import { Material } from 'three'

import boardGrass from './board-grass.webp'

import vertexShader from './vertexShader.glsl'
import fragmentShader from './fragmentShader.glsl'



const SwayingGrass = React.memo(
  () => {
    
    return (
      <div className='colC gap-[4px]'>
        <div>Swaying Grass</div>
        <Scene/>
      </div>
    )
  }
)
export default SwayingGrass



function Model() {
  const materialRef = useRef<Material>()
  const texture = useTexture(boardGrass)
  const { viewport } = useThree()
  
  useFrame(state => {
    const { clock } = state
    materialRef.current.uniforms.u_time.value = clock.getElapsedTime()
  })
  
  return (
    <Plane
      args={[1, 1]}
      scale={[viewport.width, viewport.height, 1]}
    >
      {/* @ts-expect-error */}
      <swayingGrassMaterial
        ref={materialRef}
        u_texture={texture}
        u_strength={0.015}
        u_horizonHeight={0.33}
        u_phaseDifference={3}
        u_phase={0}
        u_speed={1}
      />
    </Plane>
  )
}


const SwayingGrassMaterial = shaderMaterial(
  {
    u_texture: null,
    u_time: 0,
    u_strength: 0,
    u_horizonHeight: 0,
    u_phaseDifference: 0,
    u_phase: 0,
    u_speed: 0,
  },
  vertexShader,
  fragmentShader,
)

extend({ SwayingGrassMaterial })

// Add types to ThreeElements elements so primitives pick up on it
declare module '@react-three/fiber' {
  interface ThreeElements {
    swayingGrassMaterial: Object3DNode<SwayingGrassMaterial, typeof SwayingGrassMaterial>
  }
}


const Scene = () => {
  return (
    <Canvas
      style={{
        width: 1000,
        height: 200,
      }}
      camera={{ position: [0.0, 0.0, 1.0] }}
    >
      <Model />
    </Canvas>
  )
}

