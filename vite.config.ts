import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  server: {
    port: 3000,
    open: '/example.html',
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
