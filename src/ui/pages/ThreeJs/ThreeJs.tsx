import React from 'react'
import Gradient from 'src/ui/pages/ThreeJs/parts/Gradient'
import Gradient2 from 'src/ui/pages/ThreeJs/parts/Gradient2/Gradient2'
import Gradient3Varyings from 'src/ui/pages/ThreeJs/parts/Gradient3Attributes/Gradient3Varyings'
import MovingPlane from 'src/ui/pages/ThreeJs/parts/MovingPlane/MovingPlane'
import MovingPlaneGradient from 'src/ui/pages/ThreeJs/parts/MovingPlaneGradient/MovingPlaneGradient'
import Planet from 'src/ui/pages/ThreeJs/parts/Planet/Planet'
import Pseudo3DBg from 'src/ui/pages/ThreeJs/parts/Pseudo3dBg/Pseudo3DBg'
import RandomMovingGradientPlane
  from 'src/ui/pages/ThreeJs/parts/RandomMovingGradientPlane/RandomMovingGradientPlane'
import SwayingGrass from 'src/ui/pages/ThreeJs/parts/SwayingGrass/SwayingGrass'
import WhiteCube from 'src/ui/pages/ThreeJs/parts/WhiteCube.tsx'
import WobblingSphere from 'src/ui/pages/ThreeJs/parts/WobblingSphere/WobblingSphere'



const ThreeJs = React.memo(
  () => {
    
    return (
      <div className='rowW justify-center gap-[20px] w-[100dvw] h-fit min-h-[100dvh]'>
        <WhiteCube />
        <Gradient />
        <Gradient2 />
        <MovingPlane />
        <Gradient3Varyings />
        <MovingPlaneGradient />
        <WobblingSphere />
        <RandomMovingGradientPlane />
        <Planet />
        <Pseudo3DBg />
        <SwayingGrass />
      </div>
    )
  }
)
export default ThreeJs

