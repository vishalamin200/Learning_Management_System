import react from '@vitejs/plugin-react'
import fs from 'fs'
import { defineConfig } from 'vite'

const privateKey = fs.readFileSync('C:/Users/Vishal/OneDrive/Learning_Management_System/Server/server.key', 'utf-8')
const certificate = fs.readFileSync('C:/Users/Vishal/OneDrive/Learning_Management_System/Server/server.cert', 'utf-8')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    https: {
      key: privateKey,
      cert: certificate
    },
    host: 'localhost',
    port: 3000,
  }
})
