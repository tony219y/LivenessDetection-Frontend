import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({

  plugins: [
    react(),
    tailwindcss(),
  ],
  preview: {
    allowedHosts: ['liveness.tony219y.com'], // เพิ่มโฮสต์ที่ต้องการ
  },
})
