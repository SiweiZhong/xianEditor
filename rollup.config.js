// import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';
import replace  from 'rollup-plugin-replace';
import serve  from 'rollup-plugin-serve';

export default {
  entry: 'src/main.js',
  format: 'iife',
  moduleName: 'xianEditor',
  dest: 'dist/bundle.js', // equivalent to --output
  sourceMap: true,
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    resolve({
      // pass custom options to the resolve plugin
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    vue({
      exclude: 'node_modules/**'
    }),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    serve()
  ],
};