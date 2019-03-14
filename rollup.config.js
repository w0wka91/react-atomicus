import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import svg from 'rollup-plugin-svg'

import pkg from './package.json'

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  external: ['react', 'react-dom', 'prop-types'],
  plugins: [
    typescript(),
    svg(),
    // resolve(),
    // commonjs(),
    // babel({
    //   exclude: 'node_modules/**',
    // }),
  ],
}
