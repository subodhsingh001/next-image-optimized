import resolve from '@rollup/plugin-node-resolve'; // Resolves node_modules
import commonjs from '@rollup/plugin-commonjs'; // Converts CommonJS to ES modules
import babel from '@rollup/plugin-babel'; // Transpiles JSX
import typescript from 'rollup-plugin-typescript2'; // Handles TypeScript
import postcss from 'rollup-plugin-postcss'; // Handles CSS
import { terser } from 'rollup-plugin-terser'; // Minifies the output

export default {
  input: 'src/index.tsx', // Entry point of your library
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs', // CommonJS format
      sourcemap: true, // Include sourcemaps
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm', // ES Module format
      sourcemap: true, // Include sourcemaps
    },
  ],
  plugins: [
    resolve(), // Resolves dependencies in node_modules
    commonjs(), // Converts CommonJS modules to ES modules
    typescript({
      tsconfig: './tsconfig.json',
      useTsconfigDeclarationDir: true, // Output type declarations
    }),
    babel({
      presets: [
        '@babel/preset-react', // Transpile JSX
        '@babel/preset-typescript', // Handle TypeScript
      ],
      babelHelpers: 'bundled', // Use bundled Babel helpers
      extensions: ['.js', '.jsx', '.ts', '.tsx'], // File types to process
    }),
    postcss({
      extract: true, // Extracts CSS into a separate file
      minimize: true, // Minifies the CSS
    }),
    terser(), // Minifies the JavaScript
  ],
  external: ['react', 'react-dom', 'next'], // Mark peer dependencies as external
};
