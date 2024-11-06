import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import glsl from 'vite-plugin-glsl'
import svgr from 'vite-plugin-svgr'
import checker from 'vite-plugin-checker'



const projectRoot: string = process.cwd() // current working directory
{
  const nm = path.join(projectRoot, 'node_modules')
  const loggerFile = path.join(nm, 'vite-plugin-checker', 'dist', 'esm', 'logger.js')
  
  try {
    fs.accessSync(loggerFile)
    let source = fs.readFileSync(loggerFile, 'utf-8')
    
    if (!source.includes('pathToFileURL')) {
      source = `import { pathToFileURL } from "url";\n${source}`
    }
    source = source.replace(
      /(fileLabel ?\+ ?)(d\.id)/,
      (_m, p1, p2) => `${p1} pathToFileURL(${p2})`
    )
    
    fs.writeFileSync(loggerFile, source)
  }
  catch (err) { /* empty */ }
}




// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  
  return {
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
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
      tsconfigPaths(),
      // https://www.npmjs.com/package/vite-plugin-glsl
      glsl(),
      svgr(),
      /* svgr({
       svgrOptions: { exportType: 'named', ref: true, svgo: false, titleProp: true, typescript: true },
       include: '**!/!*.svg',
       }), */
      checker({
        typescript: true, // use TypeScript check
      }),
    ],
  }
})
