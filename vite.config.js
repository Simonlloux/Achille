import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// PWA : permet l'installation sur l'écran d'accueil + notifications de rappel.
export default defineConfig({
  // GitHub Pages sert l'app depuis /Achille/ (nom du dépôt), pas la racine.
  // Ce base doit correspondre au nom exact du repo, sinon les assets 404.
  base: '/Achille/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'Achille — Rééducation',
        short_name: 'Achille',
        description: "Suivi et séances guidées pour la rééducation du tendon d'Achille",
        lang: 'fr',
        theme_color: '#0f1210',
        background_color: '#0f1210',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
});
