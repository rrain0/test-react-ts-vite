import styled from '@emotion/styled'
import React from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon'
import InfiniteAnimation from 'src/ui/pages/ReactSpring/InfiniteAnimation'
import col = EmotionCommon.col


const ReactSpring = React.memo(() => {
  
  return (
    <Page>
      <div>React Spring</div>
      <InfiniteAnimation />
    </Page>
  )
})
export default ReactSpring


const Page = styled.div`
  ${col};
  padding: 10px;
  gap: 10px;
`

