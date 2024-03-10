import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from "@rollup/plugin-typescript";

const plugins = [
  nodeResolve({
    extensions: ['.js', '.ts']
  }),
  typescript()
];

export default [{
  input: 'src/index.ts',
  output: [{
    format: 'cjs',
    file: 'cjs/index.js'
  }, {
    format: 'es',
    file: 'esm/index.js'
  }]
}];