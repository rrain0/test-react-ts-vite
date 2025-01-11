import { css } from '@emotion/react'
import { animated, useSpring } from '@react-spring/web'
import React, { useEffect } from 'react'
import { useAsRefGet } from 'src/util/react-state/useAsRefGet'
import { useBool } from 'src/util/react-state/useBool'


const InfiniteAnimation = React.memo(() => {
  const [isAnimating, , , toggleIsAnimating] = useBool(true)
  const [getIsAnimating] = useAsRefGet(isAnimating)
  
  useEffect(() => console.log('isAnimating', isAnimating), [isAnimating])
  
  const scale = useSpring(!isAnimating
    ? {
      to: { scale: 1 },
      immediate: true,
    }
    : {
      from: { scale: 0.5 },
      to: async next => {
        while (true) {
          if (!getIsAnimating()) break
          await next({ scale: 0.9 })
          if (!getIsAnimating()) break
          await next({ scale: 0.5 })
        }
      },
      config: {
        mass: 6,
        tension: 100,
        friction: 6,
      },
    }
  )
  
  return (
    <animated.div
      css={square}
      style={scale}
      onClick={toggleIsAnimating}
    />
  )
})
export default InfiniteAnimation


const square = css`
  width: 200px;
  height: 200px;
  background-color: indianred;
`

