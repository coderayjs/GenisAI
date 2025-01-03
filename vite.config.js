import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://genis-five.vercel.app',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      buffer: 'buffer'
    }
  },
  define: {
    'process.env': {},
    global: {}
  }
}); 