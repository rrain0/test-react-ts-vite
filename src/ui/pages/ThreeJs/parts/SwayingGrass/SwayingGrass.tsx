import React, { useCallback, useRef } from 'react'
import { Canvas, extend, MaterialNode, Object3DNode, useFrame, useThree } from '@react-three/fiber'
import { Plane, shaderMaterial, useTexture } from '@react-three/drei'
import { TypeU } from 'src/util/common/TypeU'
import { getElemProps } from 'src/util/element/ElemProps'
import { useElemRef } from 'src/util/react-state-and-ref/useElemRef'
import { IUniform, ShaderMaterial, ShaderMaterialParameters, Texture } from 'three'
import * as THREE from 'three'
import Callback1 = TypeU.Callback1

import boardGrass from './board-grass.webp'

import vertexShader from './vertexShader.glsl'
import fragmentShader from './fragmentShader.glsl'



const SwayingGrass = React.memo(
  () => {
    const [frameRef, getFrame] = useElemRef()
    const setRatio = useCallback((aspectRatio: number) => {
      const f = getFrame()
      if (f) {
        const w = getElemProps(f).w
        f.style.height = `${w / aspectRatio}px`
      }
    }, [])
    
    
    return (
      <div className='colC gap-[4px]'>
        <div>Swaying Grass</div>
        <div
          ref={frameRef}
          className='w-[500px]'
        >
          <Scene setRatio={setRatio} />
        </div>
      </div>
    )
  }
)
export default SwayingGrass



type SetRatioProps = { setRatio: Callback1<number> }



function Model(props: SetRatioProps) {
  
  const texture = useTexture(boardGrass, texture => {
    
    // установить пространство цветов для правильного чтения текстуры
    texture.colorSpace = THREE.LinearSRGBColorSpace
    //texture.colorSpace = THREE.SRGBColorSpace
    
    // отменить инвертирование текстуры по оси Y
    texture.flipY = true
    
    // horizontal wrapping
    texture.wrapS = THREE.ClampToEdgeWrapping
    // vertical wrapping
    texture.wrapT = THREE.ClampToEdgeWrapping
    
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    
    const img = texture.image as HTMLImageElement
    props.setRatio(img.width / img.height)
  })
  
  const materialRef = useRef<typeof SwayingGrassMaterial>(null)
  const { viewport } = useThree()
  
  useFrame(state => {
    const m = materialRef.current
    if (m) {
      const { clock } = state
      
      m.blending = THREE.CustomBlending
      m.blendEquation = THREE.AddEquation
      m.blendSrc = THREE.SrcAlphaFactor
      m.blendDst = THREE.OneMinusSrcAlphaFactor
      
      m.uniforms.u_time.value = clock.getElapsedTime()
    }
  })
  
  return (
    <Plane
      args={[1, 1]}
      scale={[viewport.width, viewport.height, 1]}
    >
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



interface ISwayingGrassShaderMaterialParameters extends ShaderMaterialParameters {
  uniforms: { [U in keyof typeof uniforms]: IUniform<(typeof uniforms)[U]> }
}
interface ISwayingGrassMaterial extends ShaderMaterial {
  new(params: ISwayingGrassShaderMaterialParameters)
  uniforms: { [U in keyof typeof uniforms]: IUniform<(typeof uniforms)[U]> }
}

const uniforms = {
  u_texture: null as null | Texture,
  u_time: 0,
  u_strength: 0,
  u_horizonHeight: 0,
  u_phaseDifference: 0,
  u_phase: 0,
  u_speed: 0,
} as const
const SwayingGrassMaterial = shaderMaterial(
  uniforms,
  vertexShader,
  fragmentShader,
) as MaterialNode<ShaderMaterial, typeof uniforms>
extend({ SwayingGrassMaterial })

// Add types to ThreeElements elements so primitives pick up on it
declare module '@react-three/fiber' {
  interface ThreeElements {
    swayingGrassMaterial: typeof SwayingGrassMaterial
  }
}


extend({ SwayingGrassMaterial })
console.log('JSON.stringify(SwayingGrassMaterial)', JSON.stringify(SwayingGrassMaterial))
console.log('typeof SwayingGrassMaterial', typeof SwayingGrassMaterial)
console.log('SwayingGrassMaterial', SwayingGrassMaterial)


const Scene = (props: SetRatioProps) => {
  return (
    <Canvas
      camera={{ position: [0.0, 0.0, 1.0] }}
    >
      <Model setRatio={props.setRatio} />
    </Canvas>
  )
}


