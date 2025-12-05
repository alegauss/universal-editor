import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: 'src',
  publicDir: 'public',
  server: {
    port: 3000,
    open: '/pages/editor-host.html',
  },
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/universal-editor.ts'),
      name: 'UniversalEditor',
      fileName: 'universal-editor',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        entryFileNames: 'universal-editor.min.js',
      },
    },
  },
});
