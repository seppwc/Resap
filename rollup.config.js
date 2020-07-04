import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve'

export default {
  input: 'src/index.ts', // our source file
  output: {
    file: './lib/bundle.min.js',
    format: 'iife',
    name: 'bundle',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      gsap: 'gsap',
    },
  },
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
    resolve(),
  ],
}
