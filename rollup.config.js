import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import gzipPlugin from 'rollup-plugin-gzip'

const plugins = [
  nodeResolve({
    extensions: ['.js', '.ts']
  }),
  typescript({
    declarationDir: '.',
    sourceMap: false
  }),
  //gzipPlugin(),
  terser({
    compress: {
      defaults: false,
      drop_console: true
    },
    mangle: {
      eval: true,
      module: true,
      toplevel: true,
      properties: false
    },
    output: {
      comments: false,
      ecma: '2020'
    }
  }),
  gzipPlugin(),
];

export default [{
  input: 'src/index.ts',
  output: [{
    format: 'es',
    file: 'esm/index.js',
    compress: true,
    minify: true,
    map: false,
    plugins
  }],
}];
