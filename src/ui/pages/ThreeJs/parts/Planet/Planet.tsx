import { Depth, Fresnel, LayerMaterial } from 'lamina'
import React, { useMemo, useRef } from 'react'
import { Canvas, useFrame, extend, Object3DNode } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Material, MathUtils } from 'three'

import CustomLayer from './CustomLayer'


extend({ CustomLayer })

// Add types to ThreeElements elements so primitives pick up on it
declare module '@react-three/fiber' {
  interface ThreeElements {
    customLayer: Object3DNode<CustomLayer, typeof CustomLayer>
  }
}



const Planet = React.memo(
  () => {
    
    return (
      <div className='colC gap-[4px]'>
        <div>Planet</div>
        <Scene/>
      </div>
    )
  }
)
export default Planet




const PlanetBox = () => {
  const materialRef = useRef<Material>()
  
  useFrame(state => {
    const { clock } = state
    materialRef.current.time = clock.getElapsedTime()
  })
  
  
  
  return (
    <mesh
      position={[0, 0, 0]}
      rotation={[0, Math.PI, 0]}
      scale={1.5}
    >
      {/* this is 3D sphere */}
      <icosahedronGeometry args={[2, 11]}/>
      <LayerMaterial lighting='lambert'>
        {/* First layer is our own custom layer that's based of the FBM shader */}
        {/* 
         Notice how we can use *any* uniforms as prop here 👇
         You can tweak the colors by adding a colorA or colorB prop!
         */}
        <customLayer ref={materialRef} time={0.0} lacunarity={2.3} />
        {/* Second layer is a depth based gradient that we "add" on top of our custom layer*/}
        <Depth colorA='blue' colorB='aqua' alpha={0.9} mode='add' />
        {/* Third Layer is a Fresnel shading effect that we add on*/}
        <Fresnel color='#FEB3D9' mode='add' />
      </LayerMaterial>
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
      <ambientLight intensity={0.03}/>
      
      <directionalLight position={[0.3, 0.15, 0.0]} intensity={2}/>
      
      <PlanetBox/>
      
      {/* Enable dragging to rotate camera */}
      <OrbitControls/>
    
    </Canvas>
  )
}

