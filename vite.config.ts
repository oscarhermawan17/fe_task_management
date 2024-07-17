import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

console.log('VITE_PORT:', process.env.VITE_PORT)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
    assetsDir: "pages-assets",
  },
  server: {
    port: parseInt(process.env.VITE_PORT) || 3017,
  },
})