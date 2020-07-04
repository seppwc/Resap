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
      name: 'resap', // the global which can be used in a browser
    },
  ],
  external: [
    // makes dependancies and peer dependancies available to bundles
    'react',
    'react-dom',
    'gsap',
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
