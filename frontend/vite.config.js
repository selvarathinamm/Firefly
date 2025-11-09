import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // When frontend calls /api, forward it to backend on port 8080
      '/api': 'http://localhost:8080',
    },
  },
})
