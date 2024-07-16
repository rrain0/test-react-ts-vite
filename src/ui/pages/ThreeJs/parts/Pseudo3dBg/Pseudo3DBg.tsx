import React, { useRef } from 'react'
import { Canvas, extend, Object3DNode, useFrame, useThree } from '@react-three/fiber'
import { Plane, shaderMaterial, useTexture } from '@react-three/drei'
import CustomLayer from 'src/ui/pages/ThreeJs/parts/Planet/CustomLayer'
import { Material } from 'three'

import colorMountains from './color-mountains.jpg'
import depthMountains from './depth-mountains.png'

import vertexShader from './vertexShader.glsl'
import fragmentShader from './fragmentShader.glsl'



const Pseudo3DBg = React.memo(
  () => {
    
    return (
      <div className='cAll'>
        <Scene/>
        <h6 className='relative text-white font-bold text-[30px]'>
          Pseudo 3D Background
        </h6>
      </div>
    )
  }
)
export default Pseudo3DBg


function Model() {
  const depthMaterial = useRef<Material>()
  const texture = useTexture(colorMountains)
  const depthMap = useTexture(depthMountains)
  const { viewport } = useThree()
  useFrame(state => {
    depthMaterial.current.uMouse = [state.pointer.x * 0.01, state.pointer.y * 0.01]
  })
  return (
    <Plane args={[1, 1]} scale={[viewport.width, viewport.height, 1]}>
      <pseudo3DBgMaterial ref={depthMaterial} uImage={texture} uDepthMap={depthMap} />
    </Plane>
  )
}


const Pseudo3DBgMaterial = shaderMaterial(
  { uMouse: [0, 0], uImage: null, uDepthMap: null },
  vertexShader,
  fragmentShader,
)
extend({ Pseudo3DBgMaterial })

// Add types to ThreeElements elements so primitives pick up on it
declare module '@react-three/fiber' {
  interface ThreeElements {
    pseudo3DBgMaterial: Object3DNode<Pseudo3DBgMaterial, typeof Pseudo3DBgMaterial>
  }
}



const Scene = () => {
  return (
    <Canvas
      style={{
        width: 600,
        height: 400,
      }}
      camera={{ position: [0.0, 0.0, 1.0] }}
    >
      <Model />
    </Canvas>
  )
}

