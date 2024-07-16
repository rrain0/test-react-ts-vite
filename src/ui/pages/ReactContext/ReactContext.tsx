import React from 'react'
import ContextProvider from 'src/ui/pages/ReactContext/ContextProvider.tsx'



const ReactContext = React.memo(
  () => {
    
    return <div>
      <ContextProvider/>
    </div>
  }
)
export default ReactContext


