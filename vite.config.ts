import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Dev: /api diteruskan ke wrangler pages dev (API + D1 lokal).
      // 127.0.0.1 (bukan localhost) agar tidak jatuh ke IPv6 ::1.
      // Jalankan: npx wrangler pages dev --port 8788
      '/api': 'http://127.0.0.1:8788',
    },
  },
})
