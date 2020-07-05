import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import globals from 'rollup-plugin-node-globals'
import commonjs from '@rollup/plugin-commonjs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
// eslint-disable-next-line import/no-extraneous-dependencies
import externalGlobals from 'rollup-plugin-external-globals'
import pkg from './package.json'

export default {
  input: 'src/index.ts', // our source file
  output: [
    {
      file: `./lib/${pkg.main}`,
      format: 'cjs',
      globals: [{ react: 'React', gsap: 'gsap' }],
    },
    {
      file: `./lib/${pkg.module}`,
      format: 'es', // the preferred format
      globals: [{ react: 'React', gsap: 'gsap' }],
    },
    {
      file: `./lib/${pkg.browser}`,
      format: 'iife',
      name: 'resap', // the global which can be used in a browser
      globals: [{ react: 'React', gsap: 'gsap' }],
    },
  ],
  external: [
    // makes dependancies and peer dependancies available to bundles
    'react',
  ],
  plugins: [
    typescript({
      // eslint-disable-next-line global-require
      typescript: require('typescript'),
    }),
    terser(), // minifies generated bundles
    commonjs(),
    resolve(),
    globals(),
    peerDepsExternal(),
    externalGlobals({
      react: 'React',
    }),
  ],
}
