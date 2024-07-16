import React, { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { MathUtils, Mesh } from 'three'

import vertexShader from './vertexShader.glsl'
import fragmentShader from './fragmentShader.glsl'




/*
  We apply a ShaderMaterial to this geometry with a custom shader:
  
  We use Perlin noise to "displace" vertices in the vertex shader.
  We use a u_time uniform to make the organic randomness evolve through time.
  The displacement value for each vertex is set as a varying to be sent to the fragment shader.
  In the fragment shader, we set the color based on the value of that displacement varying,
  thus creating an organic-looking colored sphere.
  We also add a bit of interactivity to this scene:
  
  We use a u_intensity uniform that sets the "amplitude" of our noise.
  We add hover listeners to increase the intensity of the noise when we hover the mesh.
  We lerp between the base value of our u_intensity uniform and its final value, when hovered,
  to ease the transition between these two values in the useFrame hook.
*/




const WobblingSphere = React.memo(
  () => {
    
    return (
      <div className='colC gap-[4px]'>
        <div>Wobbling Sphere</div>
        <Scene/>
      </div>
    )
  }
)
export default WobblingSphere




const SphereBox = () => {
  const mesh = useRef<Mesh>()
  const hover = useRef(false)
  
  // Uniforms are read-only variables passed to shader
  const uniforms = useMemo(() => {
    return {
      u_intensity: {
        value: 0.3,
      },
      u_time: {
        value: 0.0,
      },
    }
  }, [])
  
  useFrame(state => {
    const { clock } = state
    mesh.current.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime()
    
    mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
      mesh.current.material.uniforms.u_intensity.value,
      hover.current ? 0.85 : 0.15,
      0.02,
    )
  })
  
  
  
  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      scale={1.5}
      onPointerOver={() => { hover.current = true }}
      onPointerOut={() => { hover.current = false }}
    >
      {/* this is 3D sphere */}
      <icosahedronGeometry args={[2, 20]}/>
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
      camera={{ position: [0.0, 0.0, 8.0] }}
    >
      
      <SphereBox/>
      
      {/* Enable dragging to rotate camera */}
      <OrbitControls/>
      
    </Canvas>
  )
}

