import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { viteSingleFile } from 'vite-plugin-singlefile';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteSingleFile(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['copa.jpg'],
      manifest: {
        name: 'laminas2026 - Álbum Mundial 2026',
        short_name: 'laminas2026',
        description: 'Gestiona tus láminas del Álbum Mundial 2026',
        theme_color: '#8a1538',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        lang: 'es',
        categories: ['utilities', 'sports'],
        icons: [
          {
            src: 'copa.jpg',
            sizes: '192x192',
            type: 'image/jpeg',
            purpose: 'any'
          },
          {
            src: 'copa.jpg',
            sizes: '512x512',
            type: 'image/jpeg',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
});

