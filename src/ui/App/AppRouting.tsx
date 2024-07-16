import React from 'react'
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'
import Landing from 'src/ui/pages/Landing/Landing.tsx'
import ReactContext from 'src/ui/pages/ReactContext/ReactContext.tsx'
import ThreeJs from 'src/ui/pages/ThreeJs/ThreeJs.tsx'




const rootRoutes: RouteObject[] = [
  {
    path: '',
    Component: Landing,
  },
  {
    path: 'three-js',
    Component: ThreeJs,
  },
  {
    path: 'react-context',
    Component: ReactContext,
  },
]
const router = createBrowserRouter(rootRoutes)



const AppRouting = React.memo(
  () => {
    return <RouterProvider router={router} />
  }
)
export default AppRouting
