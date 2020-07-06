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
      file: pkg.main,
      format: 'cjs',
      globals: [{ react: 'React', gsap: 'gsap' }],
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
    commonjs(),
    resolve({
      mainFields: ['module', 'main'],
      extensions: ['.js', '.ts', '.map'],
      dedupe: ['react', 'react-dom'],
    }),
    globals(),
    peerDepsExternal(),
    externalGlobals({
      react: 'React',
    }),
  ],
}
