# Achille — Rééducation du tendon d'Achille & renfo trail

Application web (PWA) personnelle de suivi de rééducation d'une tendinopathie
du tendon d'Achille, avec renforcement orienté trail en montagne.

## Fonctionnalités

- **Séance du jour guidée** avec minuteur (séries, maintiens, repos après chaque série)
- **Semaine type** par phase (tendon / renfo / cardio / repos)
- **Progression pilotée par la douleur** (feu tricolore 🟢 0–3 · 🟠 4–5 · 🔴 >5) — pas par calendrier
- **Renforcement trail** intégré (force jambes, chaîne postérieure, gainage, équilibre, haut du corps)
- **Suivi** : douleur réveil + exercice, courbe, historique, export/import JSON
- **RDV médicaux**
- Installable sur l'écran d'accueil (mobile)

Toutes les données restent **sur l'appareil** (localStorage). Rien n'est envoyé sur un serveur.

## Développement

```bash
npm install
npm run dev      # serveur local
npm run build    # build de production (dossier dist/)
```

## Déploiement

Poussé sur `main` → GitHub Actions build et publie automatiquement sur GitHub Pages
(voir `.github/workflows/deploy.yml`). Le `base` dans `vite.config.js` doit
correspondre au nom du dépôt (`/Achille/`).

## Structure

- `src/data/protocol.js` — le protocole tendon (phases, exercices, semaine type, critères)
- `src/data/strength.js` — le catalogue de renforcement trail
- `src/progression.js` — logique de progression entre phases
- `src/App.jsx` — état et logique de l'application
- `src/render.jsx` — rendu de l'interface

> ⚠️ Repères basés sur les protocoles de mise en charge progressive (Alfredson,
> Heavy Slow Resistance). Ne remplace pas un avis médical.
