import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    host: true, // allow all hosts or can be specific IP
    port: 5173,
    strictPort: false,
    allowedHosts: [
      'untressed-malika-glaucescent.ngrok-free.dev'
    ],
  },
})
