import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/api': {

  //       target: 'https://geo-gusser.vercel.app',  // Your backend URL
  //       changeOrigin: true,  // This helps with cross-origin requests
  //       secure: false,  // If using HTTP (ensure you set it to `true` for HTTPS)
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // }
  

})
