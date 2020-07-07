import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json'

const input = 'src/index.ts'
const extensions = ['.js', '.jsx', '.ts', '.tsx']
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

const plugins = [
  typescript({
    // eslint-disable-next-line global-require
    typescript: require('typescript'),
  }),
  terser(), // minifies generated bundles
  commonjs(),
  resolve({
    mainFields: ['module', 'main'],
    extensions,
    dedupe: ['react', 'react-dom'],
  }),
]

const createConfig = (inpt, outpt, format) => {
  return {
    input: inpt,
    output: {
      file: outpt,
      format,
      sourcemap: true,
    },
    plugins,
    external,
  }
}

export default [
  createConfig(input, pkg.main, 'cjs'),
  createConfig(input, pkg.module, 'esm'),
]
