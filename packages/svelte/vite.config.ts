import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['tarot.svg'],
      manifest: {
        name: 'Tarot',
        short_name: 'Tarot',
        description: 'Tarot',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'tarot.svg',
            sizes: 'any',
          },
        ],
      },
    }),
  ],
  publicDir: 'public',
});
