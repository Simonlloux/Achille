// ============================================================================
//  PROTOCOLE DE RÉÉDUCATION DU TENDON D'ACHILLE — ALIGNÉ SUR LE GUIDE
//  Source : guide-reeducation-achille-trail.html (à la racine du projet)
// ============================================================================
//
//  C'EST LE FICHIER À MODIFIER pour ajuster ton programme tendon.
//  Tendinopathie du CORPS du tendon (portion moyenne). Principes : mise en
//  charge progressive (isométries → HSR lourd et lent → pliométrie → course),
//  soléaire (genou fléchi) travaillé dès le premier jour, progression par
//  critères de douleur — pas par calendrier.
//
//  ── FEU TRICOLORE DE LA DOULEUR (pendant l'exercice et le lendemain) ─────
//  🟢 0–3/10  zone de travail idéale — continue, monte progressivement
//  🟠 4–5/10  tolérable ponctuellement si retour à la normale sous 24 h ;
//             ne monte pas la charge, réduis-la légèrement à la prochaine
//  🔴 > 5/10  ou réaction > 24 h (raideur matinale accrue) : recule d'un cran
//
//  ── STRUCTURE D'UNE PHASE ────────────────────────────────────────────────
//  short/label/weeks/goal : affichage (les semaines sont INDICATIVES)
//  gate     : critères pour PROPOSER le passage à la phase suivante
//             (minDays plancher de sécurité, maxWakePain7d douleur réveil
//              moy. 7 j, maxExercisePain douleur à l'effort, painMustNotRise)
//  ex       : exercices TENDON de la phase (la séance guidée les minute)
//  schedule : SEMAINE TYPE — clé = jour JS getDay() (0=Dim, 1=Lun … 6=Sam).
//             Chaque jour : {
//               title  : nom de la journée (affiché dans « Séance du jour »)
//               tendon : true = tous les exos tendon · [indices] = sous-liste
//               renfo  : [ids] du catalogue strength.js pour ce jour
//               cardio : texte du cardio du jour (cochable, sans minuteur)
//               rest   : true = jour de repos (note affichée)
//             }
//
//  ⚠️ Repères issus du guide. Si tu es suivi par un kiné / médecin du sport,
//  leur avis prime. Douleur chronique et résistante → consultation (écho)
//  fortement recommandée. Consulte SANS ATTENDRE si : claquement soudain,
//  douleur nocturne qui s'installe, aucune amélioration après 4 semaines.
// ============================================================================

export const PHASES = [
  // ══════════════════ PHASE 1 · CALMER (S1–2) ══════════════════
  {
    short: 'Phase 1 · Calmer',
    label: 'Calmer',
    weeks: 'S1–2',
    goal: 'Désensibiliser le tendon avec des isométries quotidiennes (effet antalgique), entretenir le corps sans impact. Aucun saut, aucune course, pas de côtes.',
    gate: { minDays: 4, maxWakePain7d: 3, maxExercisePain: 3, painMustNotRise: true },
    ex: [
      {
        name: 'Isométrie mollet — genou tendu',
        meta: '5 × 45 s · repos 90 s · tous les jours',
        sets: 5, hold: 45, rest: 90,
        setup: 'Debout, avant-pieds au sol ou sur la marche, mains au mur. Sur 1 jambe si douleur ≤ 3, sinon 2 jambes + sac à dos lesté.',
        cue: 'Monte sur pointes à mi-hauteur et tiens la position, immobile, en respirant.',
        tempo: ['Montée 2 s', 'Maintien 45 s', 'Repos 90 s'],
        what: '« Isométrique » = contracter sans bouger. Souvent un effet antalgique immédiat. Genou tendu = gastrocnémien. La charge doit rendre les 45 s exigeantes : une jambe, ou deux jambes + sac lesté.',
        how: [
          'Debout, mains au mur pour l\'équilibre',
          'Monte sur pointes à mi-hauteur (2 s)',
          'Tiens 45 s, totalement immobile, en respirant',
          'Repos 90 s, recommence — 5 fois',
        ],
        video: 'https://www.youtube.com/watch?v=arLsa_isSOw',
        videoLabel: 'Vidéo : isometric calf raise',
      },
      {
        name: 'Isométrie mollet — genou fléchi ~30°',
        meta: '3 × 30 s · cible le soléaire',
        sets: 3, hold: 30, rest: 60,
        setup: 'Même position, mais genoux fléchis à ~30° et maintenus fléchis pendant tout le maintien.',
        cue: 'Monte sur pointes genoux pliés et tiens. Ça brûle plus bas dans le mollet : c\'est le soléaire.',
        tempo: ['Genou fléchi ~30°', 'Maintien 30 s'],
        what: 'Genou fléchi = soléaire, le muscle qui encaisse l\'essentiel de la charge en montée en trail. Aussi important que le gastrocnémien — ne le saute jamais.',
        how: [
          'Debout, genoux fléchis à ~30°, mains au mur',
          'Monte sur pointes en gardant les genoux pliés',
          'Tiens 30 s, immobile',
          'Repos 60 s — 3 fois',
        ],
        video: 'https://www.youtube.com/results?search_query=bent+knee+isometric+calf+raise+soleus',
        videoLabel: 'Vidéos : isométrie soléaire',
      },
    ],
    schedule: {
      1: { title: 'Tendon + Renfo bas', tendon: true, renfo: ['pont-fessier', 'abduction-hanche', 'clamshell', 'squat-gobelet', 'tibial-anterieur'] },
      2: { title: 'Tendon + Cardio', tendon: true, renfo: ['balle-plantaire'], cardio: 'Marche rapide 30–40 min sur plat (ou vélo) — seulement si douleur ≤ 3 pendant et après' },
      3: { title: 'Tendon + Renfo tronc/haut', tendon: true, renfo: ['planche', 'planche-laterale', 'dead-bug', 'rowing-halteres', 'pompes', 'developpe-epaules'] },
      4: { title: 'Tendon + Cardio', tendon: true, renfo: ['proprio'], cardio: 'Marche rapide 30–40 min ou vélo' },
      5: { title: 'Tendon + Renfo bas', tendon: true, renfo: ['pont-fessier', 'abduction-hanche', 'clamshell', 'squat-gobelet', 'tibial-anterieur'] },
      6: { title: 'Tendon + Cardio long', tendon: true, renfo: ['balle-plantaire'], cardio: 'Marche 45–60 min terrain plat, ou vélo 45–60 min' },
      0: { title: 'Repos', rest: true, note: 'Repos complet. Les isométries restent autorisées si elles te soulagent (c\'est souvent le cas).' },
    },
  },

  // ══════════════════ PHASE 2 · CHARGER LÉGER (S3–4) ══════════════════
  {
    short: 'Phase 2 · Charger léger',
    label: 'Charger léger',
    weeks: 'S3–4',
    goal: 'Début du HSR (charge lourde et lente) : montées de mollet tempo 3-1-3, genou tendu ET genou fléchi, 3×/semaine avec 48 h de récup. Renfo trail complet 2×/semaine.',
    gate: { minDays: 5, maxWakePain7d: 3, maxExercisePain: 3, painMustNotRise: true },
    ex: [
      {
        name: 'Échauffement — isométries légères',
        meta: '2 × 30 s · après 5 min de marche',
        sets: 2, hold: 30, rest: 30,
        setup: 'Marche 5 min avant si possible, puis position isométrie habituelle.',
        cue: 'Deux maintiens légers pour préparer le tendon à la charge.',
        tempo: ['2 × 30 s légères'],
        what: 'Préparer le tendon avant le travail lourd : marche 5 min + 2 isométries faciles. Ne saute pas l\'échauffement, le tendon déteste le lourd à froid.',
        how: [
          'Marche 5 min (dehors ou sur place)',
          '2 maintiens de 30 s, charge légère (2 jambes)',
          'Enchaîne directement avec les montées HSR',
        ],
      },
      {
        name: 'Montées mollet genou tendu — tempo 3-1-3',
        meta: '3 × 12 · montée 2 pieds, descente 1 pied',
        sets: 3, reps: 12, rest: 90, perSide: true,
        setup: 'Au sol pour commencer : monte à 2 pieds, descends sur 1 pied. Quand c\'est facile et ≤ 3/10 : passe sur la marche, amplitude complète (talon sous l\'horizontale), puis + lest léger (sac 5 kg).',
        cue: 'Monte en 3 s, pause 1 s en haut, descends en 3 s. Aucun rebond, contrôle total. 12 par jambe.',
        tempo: ['Montée 3 s', 'Pause 1 s', 'Descente 3 s'],
        what: 'Le HSR (Heavy Slow Resistance) reconstruit la capacité du tendon. Progression interne : au sol → sur la marche amplitude complète → + sac lesté. C\'est la lenteur ET la charge qui soignent.',
        how: [
          'Au sol : monte sur pointes à 2 pieds',
          'Transfère le poids, descends sur 1 pied en 3 s',
          'Quand facile : sur la marche, talon sous l\'horizontale',
          'Puis ajoute un lest léger (sac à dos 5 kg)',
        ],
        video: 'https://www.youtube.com/watch?v=isVPZTr5iXk',
        videoLabel: 'Vidéo : heel raise progression',
      },
      {
        name: 'Montées mollet genou fléchi — soléaire',
        meta: '3 × 12 · même tempo 3-1-3',
        sets: 3, reps: 12, rest: 90, perSide: true,
        setup: 'Même exercice, genou plié à 30–45° et MAINTENU plié pendant tout le mouvement.',
        cue: 'Monte 3 s, pause 1 s, descends 3 s, genou toujours fléchi. 12 par jambe.',
        tempo: ['Genou fléchi 30–45°', 'Montée 3 s', 'Descente 3 s'],
        what: 'Genou plié = soléaire. Il encaisse l\'essentiel de la charge en montée en trail : aussi important que le genou tendu, ne le saute jamais.',
        how: [
          'Genou plié à 30–45°, maintenu pendant tout le mouvement',
          'Monte en 3 s, pause 1 s en haut',
          'Descends en 3 s',
          'Même progression : sol → marche → lest',
        ],
        video: 'https://www.youtube.com/results?search_query=bent+knee+calf+raise+soleus',
        videoLabel: 'Vidéos : montée genou fléchi',
      },
    ],
    schedule: {
      1: { title: 'Tendon HSR', tendon: true, renfo: ['tibial-anterieur', 'proprio'] },
      2: { title: 'Renfo trail complet', renfo: ['fente-bulgare', 'sdt-unijambiste', 'hip-thrust', 'step-up', 'abduction-hanche', 'pallof', 'planche-laterale', 'pompes', 'rowing-halteres', 'developpe-epaules'] },
      3: { title: 'Tendon HSR', tendon: true, renfo: ['tibial-anterieur', 'proprio'] },
      4: { title: 'Renfo trail complet', renfo: ['fente-bulgare', 'sdt-unijambiste', 'hip-thrust', 'step-up', 'abduction-hanche', 'pallof', 'planche-laterale', 'pompes', 'rowing-halteres', 'developpe-epaules'] },
      5: { title: 'Tendon HSR', tendon: true, renfo: ['tibial-anterieur', 'proprio'] },
      6: { title: 'Cardio long', renfo: ['balle-plantaire'], cardio: 'Marche rapide ou rando facile sur plat 45–90 min, ou vélo 45–60 min' },
      0: { title: 'Repos', rest: true, note: 'Repos complet.' },
    },
  },

  // ══════════════════ PHASE 3 · CHARGER LOURD (S5–6) ══════════════════
  {
    short: 'Phase 3 · Charger lourd',
    label: 'Charger lourd',
    weeks: 'S5–6',
    goal: 'HSR unipodal lourd : 4×8 puis 4×6 plus lourd. C\'est l\'intensité, pas le volume, qui fait s\'adapter le tendon. Toujours 3×/sem avec 48 h de récup.',
    gate: { minDays: 7, maxWakePain7d: 2, maxExercisePain: 3, painMustNotRise: true },
    ex: [
      {
        name: 'Échauffement — isométries légères',
        meta: '2 × 30 s · après 5 min de marche',
        sets: 2, hold: 30, rest: 30,
        setup: 'Marche 5 min avant si possible, puis position isométrie habituelle.',
        cue: 'Deux maintiens légers pour préparer le tendon à la charge.',
        tempo: ['2 × 30 s légères'],
        what: 'Préparer le tendon avant le travail lourd. Ne saute pas l\'échauffement, surtout en phase lourde.',
        how: [
          'Marche 5 min (dehors ou sur place)',
          '2 maintiens de 30 s, charge légère',
          'Enchaîne avec les montées unipodales',
        ],
      },
      {
        name: 'Montées unipodales lourdes — genou tendu',
        meta: '4 × 8 · haltère + sac lesté · vers 4 × 6 plus lourd',
        sets: 4, reps: 8, rest: 120,
        setup: 'Sur la marche, une jambe. Haltère dans la main du côté travaillé et/ou sac à dos lesté (bouteilles, livres). L\'autre main au mur/rampe.',
        cue: 'Monte 3 s, pause 1 s, descends 3 s sous l\'horizontale. Les 2 dernières reps doivent être difficiles (RPE 7–8).',
        tempo: ['Montée 3 s', 'Pause 1 s', 'Descente 3 s'],
        what: 'C\'est l\'intensité qui fait s\'adapter le tendon, pas le volume. Monte la charge par paliers si douleur ≤ 3 et pas de réaction à 24 h. Progression : 4×8 → 4×6 encore plus lourd.',
        how: [
          'Avant-pied sur la marche, talon dans le vide, 1 jambe',
          'Haltère côté travaillé et/ou sac à dos lesté',
          'Monte 3 s · pause 1 s · descends 3 s sous le niveau',
          'Charge qui rend les 2 dernières reps difficiles',
        ],
        video: 'https://www.youtube.com/watch?v=QckEvvWuVUY',
        videoLabel: 'Vidéo : heavy calf loading',
      },
      {
        name: 'Montées unipodales genou fléchi — soléaire',
        meta: '3 × 8 · lourd · même tempo',
        sets: 3, reps: 8, rest: 90,
        setup: 'Même exercice unipodal lourd, genou plié à 30–45° maintenu.',
        cue: 'Monte 3 s, pause 1 s, descends 3 s, genou toujours fléchi. Lourd.',
        tempo: ['Genou fléchi 30–45°', 'Montée 3 s', 'Descente 3 s'],
        what: 'Le soléaire en version lourde. Le muscle-clé du traileur en montée mérite la même intensité que le gastrocnémien.',
        how: [
          'Unipodal sur la marche, genou plié 30–45°',
          'Haltère et/ou sac lesté',
          'Tempo 3-1-3, amplitude complète',
          'Monte la charge par petits paliers',
        ],
        video: 'https://www.youtube.com/results?search_query=bent+knee+calf+raise+heavy+soleus',
        videoLabel: 'Vidéos : soléaire lourd',
      },
    ],
    schedule: {
      1: { title: 'Tendon HSR lourd', tendon: true, renfo: ['tibial-anterieur', 'proprio'] },
      2: { title: 'Renfo trail complet', renfo: ['fente-bulgare', 'sdt-unijambiste', 'hip-thrust', 'step-up', 'abduction-hanche', 'pallof', 'planche-laterale', 'pompes', 'rowing-halteres', 'developpe-epaules'] },
      3: { title: 'Tendon HSR lourd', tendon: true, renfo: ['tibial-anterieur', 'proprio'] },
      4: { title: 'Renfo trail complet', renfo: ['fente-bulgare', 'sdt-unijambiste', 'hip-thrust', 'step-up', 'abduction-hanche', 'pallof', 'planche-laterale', 'pompes', 'rowing-halteres', 'developpe-epaules'] },
      5: { title: 'Tendon HSR lourd', tendon: true, renfo: ['tibial-anterieur', 'proprio'] },
      6: { title: 'Cardio long', renfo: ['balle-plantaire'], cardio: 'Marche rapide ou rando facile 45–90 min, ou vélo 45–60 min' },
      0: { title: 'Repos', rest: true, note: 'Repos complet.' },
    },
  },

  // ══════════════════ PHASE 4 · RESTITUER & COURIR (S7+) ══════════════════
  {
    short: 'Phase 4 · Restituer & courir',
    label: 'Restituer',
    weeks: 'S7+',
    goal: 'Réhabituer le tendon à stocker/restituer l\'énergie (pliométrie progressive), puis reprendre la course en marche/course (R1→R5). Mollet lourd 2×/sem en entretien : l\'assurance anti-récidive.',
    // Dernière phase : pas de gate.
    ex: [
      {
        name: 'Mollet lourd genou tendu — entretien',
        meta: '3 × 8 · tempo 3-1-3 · 2×/sem',
        sets: 3, reps: 8, rest: 120, perSide: true,
        setup: 'Unipodal sur la marche, haltère + sac lesté, comme en phase 3.',
        cue: 'Même tempo lent 3-1-3, charge lourde. C\'est l\'entretien qui protège durablement.',
        tempo: ['Montée 3 s', 'Pause 1 s', 'Descente 3 s'],
        what: 'Garde 2 séances de mollet lourd par semaine pendant au moins 3 mois, puis 1/semaine à vie de traileur : ta meilleure assurance anti-récidive.',
        how: [
          'Unipodal sur la marche, chargé lourd',
          'Tempo 3-1-3, amplitude complète',
          '3 × 8 par jambe',
        ],
        video: 'https://www.youtube.com/watch?v=QckEvvWuVUY',
        videoLabel: 'Vidéo : heavy calf loading',
      },
      {
        name: 'Mollet lourd genou fléchi — entretien',
        meta: '3 × 8 · lourd',
        sets: 3, reps: 8, rest: 90, perSide: true,
        setup: 'Unipodal genou plié 30–45°, chargé.',
        cue: 'Tempo 3-1-3, genou toujours fléchi.',
        tempo: ['Genou fléchi 30–45°', 'Tempo 3-1-3'],
        what: 'L\'entretien du soléaire, au même titre que le gastrocnémien.',
        how: ['Unipodal, genou plié 30–45°', 'Chargé lourd, tempo 3-1-3', '3 × 8 par jambe'],
        video: 'https://www.youtube.com/results?search_query=bent+knee+calf+raise+heavy+soleus',
        videoLabel: 'Vidéos : soléaire lourd',
      },
      {
        name: 'Sautillements bipodaux / corde à sauter',
        meta: '3 × 30 s · souple et silencieux',
        sets: 3, hold: 30, rest: 60,
        setup: 'Debout, sur l\'avant-pied. Échauffement avant : marche 10 min + isométries 2 × 30 s.',
        cue: 'Sautille pendant le temps imparti : contact sol bref, souple, SILENCIEUX. Rebondis, ne t\'écrase pas.',
        tempo: ['Contact sol minimal', '3 × 30 s'],
        what: 'La pliométrie réapprend au tendon à stocker et restituer l\'énergie — son vrai métier en course. Progression : 3×30 s → 4×40 s → sautillements UNIPODAUX 3×15/jambe quand le bipodal ne provoque plus rien.',
        how: [
          'Échauffe-toi : marche 10 min + isométries légères',
          'Sautille sur place, 2 pieds, avant-pied',
          'Le moins de temps possible au sol, silencieux',
          'Progression : 4×40 s, puis unipodal 3×15/jambe',
        ],
        video: 'https://www.youtube.com/watch?v=QckEvvWuVUY',
        videoLabel: 'Vidéo : plyometric progression',
      },
      {
        name: 'Montées de mollet dynamiques',
        meta: '3 × 10 · rapide en haut, contrôlé en bas',
        sets: 3, reps: 10, rest: 60,
        setup: 'Debout au sol, 2 pieds.',
        cue: 'Monte VITE sur pointes, redescends en contrôle. Le contraire du HSR : ici on cherche la vitesse.',
        tempo: ['Montée rapide', 'Descente contrôlée'],
        what: 'Transition entre la force lente (HSR) et l\'élasticité (course) : le mollet apprend à produire vite.',
        how: [
          'Debout, 2 pieds au sol',
          'Monte sur pointes rapidement',
          'Redescends en 2 s contrôlées',
          '3 × 10',
        ],
      },
      {
        name: 'Reprise course — protocole R1 → R5',
        meta: 'Samedi · 48 h min entre 2 sorties · hors séance guidée',
        tempo: ['R1 → R5', '48 h entre sorties', 'Plat et souple'],
        what: 'À démarrer dès que les sautillements unipodaux sont indolores. Passe à la sortie suivante SEULEMENT si la précédente n\'a provoqué ni douleur > 3/10, ni raideur matinale accrue le lendemain. Sinon, répète-la.',
        how: [
          'R1 : 8 × (1 min course / 2 min marche)',
          'R2 : 6 × (2 min course / 2 min marche)',
          'R3 : 5 × (3 min course / 1 min marche)',
          'R4 : 4 × (5 min course / 1 min marche)',
          'R5 : 30 min de course continue, allure facile',
          'Après R5 : une variable à la fois (+10–15 %/sem) — côtes raides, longues descentes et fractionné en DERNIER (pas avant 2–3 sem de course confortable)',
        ],
        video: 'https://e3rehab.com/achilles-tendinopathy/',
        videoLabel: 'Guide : return to running (E3 Rehab)',
      },
    ],
    schedule: {
      1: { title: 'Tendon entretien + Renfo bas', tendon: [0, 1], renfo: ['fente-bulgare', 'sdt-unijambiste', 'hip-thrust'] },
      2: { title: 'Pliométrie légère', tendon: [2, 3], renfo: ['planche', 'dead-bug'] },
      3: { title: 'Cardio + mobilité', cardio: 'Marche rapide ou vélo 40–60 min + mobilité générale' },
      4: { title: 'Pliométrie + Renfo haut', tendon: [2, 3], renfo: ['pompes', 'rowing-halteres', 'developpe-epaules', 'pallof'] },
      5: { title: 'Tendon entretien', tendon: [0, 1], renfo: ['proprio'] },
      6: { title: 'Retour course', cardio: 'Sautillements unipodaux indolores ? → protocole R1→R5 (fiche dans Programme). Sinon : marche rapide 60 min.' },
      0: { title: 'Repos', rest: true, note: 'Repos complet. Vérifie la raideur matinale après chaque nouveauté de la semaine.' },
    },
  },
];

// RDV médicaux proposés par défaut à la première ouverture.
export const DEFAULT_APPOINTMENTS = [
  { id: 1, title: 'Médecin du sport — bilan initial', date: '', note: '', done: false },
  { id: 2, title: 'Échographie des tendons', date: '', note: '', done: false },
  { id: 3, title: 'Podologue — semelles', date: '', note: '', done: false },
  { id: 4, title: 'Contrôle médecin à 6 semaines', date: '', note: '', done: false },
  { id: 5, title: 'Kiné — accompagnement', date: '', note: '', done: false },
];
