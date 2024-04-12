import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import checker from 'vite-plugin-checker'





// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true, // expose app via IP access from local network
    //port: 40000,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000', // адрес бэка
    //     changeOrigin: true,
    //     rewrite: path=>path.replace(/^\/api/,''),
    //   },
    // }
  },
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    /* svgr({
      svgrOptions: { exportType: 'named', ref: true, svgo: false, titleProp: true, typescript: true },
      include: '**!/!*.svg',
    }), */
    checker({
      typescript: true, // use TypeScript check
    }),
  ],
})
