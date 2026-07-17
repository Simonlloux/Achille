import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Estampille de build : date du jour au moment du build. Affichée en bas de
// l'app pour vérifier d'un coup d'œil qu'on regarde bien la dernière version.
const BUILD_DATE = new Date().toLocaleDateString('fr-FR', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

// PWA : permet l'installation sur l'écran d'accueil + notifications de rappel.
export default defineConfig({
  define: {
    __BUILD_DATE__: JSON.stringify(BUILD_DATE),
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.4.1'),
  },
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
