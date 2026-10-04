import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  worker: {
    format: 'es'
  },
  server: {
    port: 5173,
    host: true,
    headers: {
      // Cross-origin isolation for SharedArrayBuffer / WASM if required
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  },
  build: {
    outDir: 'dist',
    target: 'esnext'
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.js']
  }
});
