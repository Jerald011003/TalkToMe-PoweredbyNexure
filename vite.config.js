import { defineConfig } from 'vite';
import angular from '@vitejs/plugin-angular';

export default defineConfig({
  plugins: [angular()],
  ssr: {
    timeout: 30000, // Adjust the SSR timeout to handle longer server-side renders
  },
});
