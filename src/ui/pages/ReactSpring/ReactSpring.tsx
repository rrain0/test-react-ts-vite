import styled from '@emotion/styled'
import React from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon'
import RippleReactSpring from 'src/ui/components/RippleReactSpring/RippleReactSpring.tsx'
import UseRipple from 'src/ui/components/RippleReactSpring/UseRipple.tsx'
import InfiniteAnimation from 'src/ui/pages/ReactSpring/InfiniteAnimation'
import col = EmotionCommon.col


const ReactSpring = React.memo(() => {
  
  return (
    <Page>
      <div>React Spring</div>
      <InfiniteAnimation />
        <UseRipple>
          {({ target, ripple }) => (
            <RippleBox {...target}>
              <RippleReactSpring {...ripple}/>
            </RippleBox>
          )}
        </UseRipple>
    </Page>
  )
})
export default ReactSpring


const Page = styled.div`
  ${col};
  padding: 10px;
  gap: 10px;
`

const RippleBox = styled.div({
  position: 'relative',
  width: 400,
  height: 200,
  borderRadius: 16,
  backgroundColor: '#00ff0077',
})

