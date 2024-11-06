import { css } from '@emotion/react'
import { animated, useSpring } from '@react-spring/web'
import React from 'react'
import { useBool } from 'src/util/react-state/useBool'


const InfiniteAnimation = React.memo(() => {
  const [isAnimating, , , toggleIsAnimating] = useBool(true)
  
  const scale = useSpring(isAnimating
    ? {
      to: { scale: 1 },
      immediate: true,
    }
    : {
      from: { scale: 0.5 },
      to: async next => {
        while (true) {
          await next({ scale: 0.9 });
          await next({ scale: 0.5 });
        }
      },
      config: {
        mass: 6,
        tension: 100,
        friction: 6,
      },
    }
  
  );
  
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

