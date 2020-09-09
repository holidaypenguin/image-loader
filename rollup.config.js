import json from '@rollup/plugin-json';
// import babel from 'rollup-plugin-babel';
import babel from '@rollup/plugin-babel';

export default {
  input: 'index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs'
  },
  plugins: [
    json(),
    babel({
      babelHelpers: 'external', // 'bundled' | 'runtime' | 'inline' | 'external'
      exclude: 'node_modules/**' // 只编译我们的源代码
    }),
  ]
}