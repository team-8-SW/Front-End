import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    // This enables fast refresh
    fastRefresh: true,
  })],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  server: {
    open: true, 
    port: 8000,
    watch: {
      usePolling: true, // Helpful for some environments like WSL or network drives
    },
    hmr: true,
    host: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  css: {
    postcss: './postcss.config.cjs',
  },
})
