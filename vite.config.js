import { readFileSync } from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const manifestFilePath = path.join(__dirname, 'package.json');
const manifest = JSON.parse(readFileSync(manifestFilePath));
const name = manifest['name'];

export default () => {
  return defineConfig({
    plugins: [dts()],
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name,
        fileName: (format) => `index.${format}.js`,
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  });
};
