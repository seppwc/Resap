import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import pkg from './package.json'

export default {
  input: 'src/index.ts', // our source file
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es', // the preferred format
    },
    {
      file: pkg.browser,
      format: 'iife',
      name: 'resapBundle', // the global which can be used in a browser
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        gsap: 'gsap',
      },
    },
  ],
  external: [
    // makes dependancies and peer dependancies available to bundles
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    typescript({
      // eslint-disable-next-line global-require
      typescript: require('typescript'),
    }),
    terser(), // minifies generated bundles
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules',
      },
    }),
  ],
}
