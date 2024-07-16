import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Color, Mesh, Vector2 } from 'three'

import vertexShader from './vertexShader.glsl'
import fragmentShader from './fragmentShader.glsl'




/*
  We do not touch anything in the vertex shader besides sending the UV coordinates
  as a varying to the fragment shader.
  We use the UV coordinates, the u_mouse and u_time uniforms as arguments for our Simplex noise.
  Instead of a hover effect like in the previous example, we directly send
  the cursor coordinates to the fragment shader!
  We use the mix function with color uniforms and our noise and assign the result to
  a color variable several times to create a random gradient.
*/




const RandomMovingGradientPlane = React.memo(
  () => {
    
    return (
      <div className='colC gap-[4px]'>
        <div>Random Moving Gradient Plane</div>
        <Scene/>
      </div>
    )
  }
)
export default RandomMovingGradientPlane




const PlaneBox = () => {
  const mesh = useRef<Mesh>()
  const mousePosition = useRef({ x: 0, y: 0 })
  
  const updateMousePosition = useCallback(ev => {
    mousePosition.current = { x: ev.pageX, y: ev.pageY }
  }, [])
  
  // Uniforms are read-only variables passed to shader
  const uniforms = useMemo(() => {
    return {
      u_time: {
        value: 0.0,
      },
      u_mouse: { value: new Vector2(0, 0) },
      u_bg: {
        value: new Color('#A1A3F7'),
      },
      u_colorA: { value: new Color('#9FBAF9') },
      u_colorB: { value: new Color('#FEB3D9') },
    }
  }, [])
  
  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition, false)
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition, false)
    }
  }, [updateMousePosition])
  
  
  useFrame(state => {
    const { clock } = state
    mesh.current.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime()
    
    mesh.current.material.uniforms.u_mouse.value = new Vector2(
      mousePosition.current.x,
      mousePosition.current.y,
    )
  })
  
  
  
  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      scale={1.5}
    >
      <planeGeometry args={[1, 1, 32, 32]}/>
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
      camera={{ position: [0.0, 0.0, 1.5] }}
    >
      
      <PlaneBox/>
      
    </Canvas>
  )
}

