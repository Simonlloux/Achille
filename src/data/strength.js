// ============================================================================
//  CATALOGUE DE RENFORCEMENT — SPÉCIAL TRAIL EN MONTAGNE
//  Source : guide-reeducation-achille-trail.html (fiches techniques)
// ============================================================================
//
//  Ce catalogue reprend les exercices du guide. Chaque exercice est référencé
//  par son `id` dans la SEMAINE TYPE des phases (voir protocol.js, champ
//  `schedule`) : c'est le planning qui décide QUAND un exercice apparaît dans
//  la séance du jour (renfo bas lundi/vendredi, tronc-haut mercredi, renfo
//  trail complet mardi/jeudi en phase 2+, etc.).
//
//  ── Progression ──────────────────────────────────────────────────────────
//  3 NIVEAUX par exercice (volume/charge qui montent). Tu montes de niveau
//  dans l'onglet Programme quand le niveau courant devient facile.
//
//  ── Sécurité Achille ─────────────────────────────────────────────────────
//  `minAchillePhase` = index de phase Achille (0-based) minimum pour que
//  l'exercice soit autorisé. Ex. fente bulgare et step-up chargent le mollet
//  → à partir de la phase 2 (index 1). En dessous : masqué et listé comme
//  « débloqué plus tard ».
//
//  ── Familles ─────────────────────────────────────────────────────────────
//  'montee'    force jambes pour grimper
//  'descente'  chaîne postérieure (encaisser la descente)
//  'gainage'   tronc / core
//  'hanche'    stabilité du bassin (moyen fessier)
//  'equilibre' proprioception / cheville / tibial
//  'haut'      haut du corps (bâtons, portage)
//  'soins'     auto-massage / mobilité
//
//  ── Champs ───────────────────────────────────────────────────────────────
//  levels : [{ meta, sets, reps? | hold?, rest }] — reps = dynamique,
//           hold = maintien en secondes. Pour les exos « par côté », les
//           séries comptent les DEUX côtés (cue précise l'alternance).
//  setup, cue, what, how, video, videoLabel : mêmes rôles que protocol.js.
// ============================================================================

export const CATALOGUE = {
  // ---- MONTÉE : force jambes ----
  'squat-gobelet': {
    name: 'Squat gobelet',
    family: 'montee',
    minAchillePhase: 0,
    material: 'haltère',
    levels: [
      { meta: '3 × 10', sets: 3, reps: 10, rest: 60 },
      { meta: '3 × 12 plus lourd', sets: 3, reps: 12, rest: 60 },
      { meta: '4 × 10 lourd', sets: 4, reps: 10, rest: 75 },
    ],
    setup: 'Haltère tenu verticalement contre la poitrine, pieds largeur des épaules.',
    cue: 'Descends en amplitude confortable, dos droit, talons ancrés, puis remonte.',
    what: 'La base de la force de montée : quadriceps + fessiers, chargés devant pour garder le buste droit.',
    how: [
      'Haltère contre la poitrine, coudes sous l\'haltère',
      'Pieds largeur des épaules, pointes légèrement ouvertes',
      'Descends en poussant les hanches en arrière, amplitude confortable',
      'Remonte en poussant dans les talons',
    ],
    video: 'https://www.youtube.com/results?search_query=goblet+squat+technique',
    videoLabel: 'Vidéos : goblet squat',
  },
  'fente-bulgare': {
    name: 'Fente bulgare',
    family: 'montee',
    minAchillePhase: 1, // pied arrière surélevé, poussée mollet → à partir de Charger léger
    material: 'marche/chaise + haltères',
    levels: [
      { meta: '3 × 8 / jambe', sets: 3, reps: 8, rest: 75 },
      { meta: '3 × 10 / jambe', sets: 3, reps: 10, rest: 75 },
      { meta: '4 × 8 / jambe lourd', sets: 4, reps: 8, rest: 90 },
    ],
    setup: 'Pied arrière posé sur la marche ou une chaise, haltères en mains.',
    cue: 'Descends verticalement (le buste ne plonge pas), genou avant au-dessus du pied. Fais tes reps, puis change de jambe avant de valider la série.',
    what: 'L\'exercice roi de l\'unilatéral trail : force de montée + équilibre, une jambe à la fois — exactement le geste de la pente raide.',
    how: [
      'Pied arrière sur la marche/chaise, pied avant bien devant',
      'Descends verticalement, buste droit',
      'Genou avant aligné au-dessus du pied',
      'Remonte en poussant dans le talon avant',
    ],
    video: 'https://www.youtube.com/results?search_query=fente+bulgare+technique',
    videoLabel: 'Vidéos : fente bulgare',
  },
  'step-up': {
    name: 'Step-up sur marche',
    family: 'montee',
    minAchillePhase: 1,
    material: 'marche + haltères',
    levels: [
      { meta: '3 × 10 / jambe', sets: 3, reps: 10, rest: 60 },
      { meta: '3 × 12 / jambe lesté', sets: 3, reps: 12, rest: 75 },
      { meta: '4 × 12 / jambe lourd', sets: 4, reps: 12, rest: 90 },
    ],
    setup: 'Face à la marche, haltères en mains pour charger.',
    cue: 'Monte en poussant uniquement sur la jambe avant (pas d\'élan), redescends en 2–3 s contrôlées. Change de jambe à chaque série.',
    what: 'Le geste du trail par excellence : franchir une marche. Poussée unijambe + descente contrôlée.',
    how: [
      'Pose le pied entier sur la marche',
      'Monte en poussant dans la jambe du dessus, sans élan de la jambe arrière',
      'Redescends en 2–3 s, en contrôle',
      'Haltères en mains pour charger',
    ],
    video: 'https://www.youtube.com/watch?v=WCFCdxzFBa4',
    videoLabel: 'Vidéo : step-up',
  },

  // ---- DESCENTE : chaîne postérieure ----
  'pont-fessier': {
    name: 'Pont fessier',
    family: 'descente',
    minAchillePhase: 0,
    material: 'aucun',
    levels: [
      { meta: '3 × 12', sets: 3, reps: 12, rest: 45 },
      { meta: '3 × 15', sets: 3, reps: 15, rest: 45 },
      { meta: '3 × 12 / jambe (1 jambe)', sets: 3, reps: 12, rest: 60 },
    ],
    setup: 'Allongé sur le dos, genoux pliés, pieds à plat près des fesses.',
    cue: 'Monte le bassin en serrant les fessiers, corps aligné épaules-genoux, redescends lentement.',
    what: 'Réveil des fessiers, la base de la chaîne postérieure. Version douce du hip thrust — parfaite en phase 1.',
    how: [
      'Sur le dos, genoux pliés, pieds à plat',
      'Pousse dans les talons, monte le bassin',
      'Serre les fessiers en haut, 1 s',
      'Redescends lentement',
    ],
    video: 'https://www.youtube.com/watch?v=OUgsJ8-Vi0E',
    videoLabel: 'Vidéo : glute bridge',
  },
  'hip-thrust': {
    name: 'Hip thrust (épaules surélevées)',
    family: 'descente',
    minAchillePhase: 0,
    material: 'canapé/banc + haltère',
    levels: [
      { meta: '3 × 12', sets: 3, reps: 12, rest: 60 },
      { meta: '3 × 15 lesté', sets: 3, reps: 15, rest: 75 },
      { meta: '4 × 12 lourd', sets: 4, reps: 12, rest: 90 },
    ],
    setup: 'Haut du dos appuyé sur le canapé/banc, pieds au sol, haltère posé sur les hanches.',
    cue: 'Monte le bassin jusqu\'à l\'alignement épaules-genoux, serre 1 s en haut, redescends contrôlé.',
    what: 'Le développeur de fessiers n°1. Un bassin fort stabilise le genou et encaisse les descentes longues.',
    how: [
      'Haut du dos sur le canapé/banc, pieds au sol',
      'Haltère (ou sac lesté) posé sur les hanches',
      'Monte jusqu\'à l\'alignement épaules-genoux',
      'Serre les fessiers 1 s en haut, redescends contrôlé',
    ],
    video: 'https://www.youtube.com/results?search_query=hip+thrust+halt%C3%A8re+technique',
    videoLabel: 'Vidéos : hip thrust',
  },
  'sdt-unijambiste': {
    name: 'Soulevé de terre unijambiste',
    family: 'descente',
    minAchillePhase: 1,
    material: 'haltère',
    levels: [
      { meta: '3 × 8 / jambe', sets: 3, reps: 8, rest: 60 },
      { meta: '3 × 10 / jambe', sets: 3, reps: 10, rest: 75 },
      { meta: '4 × 8 / jambe lourd', sets: 4, reps: 8, rest: 90 },
    ],
    setup: 'Debout sur une jambe, haltère dans la main opposée.',
    cue: 'Bascule le buste vers l\'avant dos plat, jambe libre tendue derrière, jusqu\'à sentir l\'arrière de cuisse ; remonte en serrant le fessier. Change de jambe à chaque série.',
    what: 'Équilibre + chaîne postérieure = or pour le trail. Ischio, fessier et pied travaillent ensemble comme sur un single track.',
    how: [
      'Debout sur une jambe, genou souple',
      'Haltère dans la main opposée à la jambe d\'appui',
      'Bascule le buste, dos plat, jambe libre vers l\'arrière',
      'Remonte en serrant le fessier',
    ],
    video: 'https://www.youtube.com/results?search_query=souleve+de+terre+unijambiste+technique',
    videoLabel: 'Vidéos : soulevé de terre unijambiste',
  },

  // ---- GAINAGE : core ----
  'planche': {
    name: 'Planche',
    family: 'gainage',
    minAchillePhase: 0,
    material: 'aucun',
    levels: [
      { meta: '3 × 30–45 s', sets: 3, hold: 40, rest: 45 },
      { meta: '3 × 50 s', sets: 3, hold: 50, rest: 45 },
      { meta: '4 × 60 s', sets: 4, hold: 60, rest: 45 },
    ],
    setup: 'Sur les avant-bras et la pointe des pieds, corps gainé.',
    cue: 'Corps aligné de la tête aux talons, abdos et fessiers serrés. Ne creuse pas le bas du dos.',
    what: 'Un tronc solide = moins de fatigue posturale sous le sac, meilleur transfert jambes ↔ bâtons.',
    how: [
      'Appui sur avant-bras et pointes de pieds',
      'Corps parfaitement aligné, abdos serrés',
      'Bassin ni trop haut ni affaissé',
      'Respire calmement, tiens',
    ],
    video: 'https://www.youtube.com/watch?v=pSHjTRCQxIw',
    videoLabel: 'Vidéo : forearm plank',
  },
  'planche-laterale': {
    name: 'Planche latérale',
    family: 'gainage',
    minAchillePhase: 0,
    material: 'aucun',
    levels: [
      { meta: '2 × 30 s / côté', sets: 4, hold: 30, rest: 40 },
      { meta: '2 × 40 s / côté', sets: 4, hold: 40, rest: 40 },
      { meta: '2 × 50 s / côté', sets: 4, hold: 50, rest: 45 },
    ],
    setup: 'Sur un avant-bras, corps sur le côté, pieds superposés.',
    cue: 'Monte le bassin, corps en ligne. Change de côté à chaque série.',
    what: 'Obliques + moyen fessier : la stabilité latérale qui t\'empêche de vaciller sur terrain irrégulier.',
    how: [
      'Allongé sur le côté, appui sur l\'avant-bras',
      'Monte le bassin, corps en ligne droite',
      'Tiens sans laisser tomber les hanches',
      'Alterne le côté à chaque série',
    ],
    video: 'https://www.youtube.com/watch?v=K2VljzCC16g',
    videoLabel: 'Vidéo : side plank',
  },
  'dead-bug': {
    name: 'Dead bug',
    family: 'gainage',
    minAchillePhase: 0,
    material: 'aucun',
    levels: [
      { meta: '3 × 10', sets: 3, reps: 10, rest: 40 },
      { meta: '3 × 12 plus lent', sets: 3, reps: 12, rest: 40 },
      { meta: '4 × 12', sets: 4, reps: 12, rest: 45 },
    ],
    setup: 'Sur le dos, lombaires plaquées au sol, bras et genoux à 90°.',
    cue: 'Étends lentement bras et jambe opposés sans décoller le bas du dos, reviens, alterne.',
    what: 'Contrôle du tronc en mouvement — le gainage « utile » qui protège le dos quand les jambes travaillent.',
    how: [
      'Sur le dos, lombaires plaquées au sol',
      'Bras tendus vers le plafond, genoux à 90°',
      'Étends lentement bras et jambe OPPOSÉS',
      'Le bas du dos ne décolle jamais ; alterne',
    ],
    video: 'https://www.youtube.com/results?search_query=dead+bug+exercice+technique',
    videoLabel: 'Vidéos : dead bug',
  },
  'pallof': {
    name: 'Pallof press (anti-rotation)',
    family: 'gainage',
    minAchillePhase: 0,
    material: 'élastique',
    levels: [
      { meta: '3 × 10 / côté', sets: 3, reps: 10, rest: 45 },
      { meta: '3 × 12 / côté', sets: 3, reps: 12, rest: 45 },
      { meta: '4 × 10 / côté tension forte', sets: 4, reps: 10, rest: 60 },
    ],
    setup: 'Élastique fixé sur le côté (poignée de porte), tenu à deux mains contre le sternum.',
    cue: 'Tends les bras devant toi sans laisser le buste tourner, tiens 2 s, reviens. Change de côté à chaque série.',
    what: 'Anti-rotation du tronc — précieux sur terrain technique où chaque pas déséquilibre.',
    how: [
      'Élastique fixé à hauteur de poitrine, sur le côté',
      'Tenu à deux mains contre le sternum, pieds largeur épaules',
      'Tends les bras devant sans laisser le buste tourner',
      'Tiens 2 s, reviens en contrôle',
    ],
    video: 'https://www.youtube.com/results?search_query=pallof+press+%C3%A9lastique',
    videoLabel: 'Vidéos : Pallof press',
  },

  // ---- HANCHE : stabilité bassin ----
  'abduction-hanche': {
    name: 'Abduction hanche élastique',
    family: 'hanche',
    minAchillePhase: 0,
    material: 'élastique',
    levels: [
      { meta: '3 × 15 / côté', sets: 3, reps: 15, rest: 40 },
      { meta: '3 × 20 / côté', sets: 3, reps: 20, rest: 40 },
      { meta: '4 × 15 / côté tension forte', sets: 4, reps: 15, rest: 45 },
    ],
    setup: 'Élastique autour des chevilles ou au-dessus des genoux, debout ou allongé sur le côté.',
    cue: 'Écarte la jambe contre l\'élastique, lentement, sans basculer le bassin. Change de côté à chaque série.',
    what: 'Le moyen fessier verrouille le bassin à chaque appui. Faible, il laisse le genou rentrer — la source de bien des blessures du coureur.',
    how: [
      'Élastique aux chevilles (debout) ou au-dessus des genoux',
      'Écarte la jambe sur le côté, lentement',
      'Le bassin reste horizontal, le buste ne penche pas',
      'Reviens en contrôle',
    ],
    video: 'https://www.youtube.com/results?search_query=abduction+hanche+%C3%A9lastique',
    videoLabel: 'Vidéos : abduction hanche',
  },
  'clamshell': {
    name: 'Clamshell',
    family: 'hanche',
    minAchillePhase: 0,
    material: 'élastique (optionnel)',
    levels: [
      { meta: '2 × 15 / côté', sets: 4, reps: 15, rest: 30 },
      { meta: '3 × 15 / côté élastique', sets: 6, reps: 15, rest: 30 },
      { meta: '3 × 20 / côté élastique', sets: 6, reps: 20, rest: 30 },
    ],
    setup: 'Allongé sur le côté, genoux pliés à 90°, pieds joints, élastique au-dessus des genoux.',
    cue: 'Ouvre le genou du dessus comme un coquillage, sans basculer le bassin en arrière. Change de côté à chaque série.',
    what: 'Isolation du moyen fessier profond — le petit muscle qui fait la grande différence en stabilité d\'appui.',
    how: [
      'Sur le côté, genoux pliés à 90°, pieds joints',
      'Ouvre le genou du dessus, pieds toujours en contact',
      'Le bassin ne bascule pas en arrière',
      'Redescends lentement',
    ],
    video: 'https://www.youtube.com/results?search_query=clamshell+exercice+fessier',
    videoLabel: 'Vidéos : clamshell',
  },

  // ---- ÉQUILIBRE / CHEVILLE ----
  'proprio': {
    name: 'Proprioception unipodale',
    family: 'equilibre',
    minAchillePhase: 0,
    material: 'coussin/serviette (progression)',
    levels: [
      { meta: '3 × 30 s / jambe', sets: 6, hold: 30, rest: 20 },
      { meta: '3 × 45 s / jambe yeux fermés', sets: 6, hold: 45, rest: 20 },
      { meta: '3 × 45 s / jambe sur coussin', sets: 6, hold: 45, rest: 20 },
    ],
    setup: 'Debout sur une jambe, genou souple, sol dur.',
    cue: 'Tiens l\'équilibre, pied ancré. Change de jambe à chaque série.',
    what: 'La proprioception prévient les entorses sur terrain technique — sans charger le tendon. Progression : yeux fermés → coussin → mouvements de tête.',
    how: [
      'Debout sur une jambe, genou légèrement fléchi',
      'Fixe un point, puis ferme les yeux quand c\'est facile',
      'Ensuite : serviette pliée/coussin sous le pied',
      'Encore après : mouvements de tête ou lancer de balle au mur',
    ],
    video: 'https://www.youtube.com/watch?v=FMbBpcVU2Zc',
    videoLabel: 'Vidéo : single-leg balance',
  },
  'tibial-anterieur': {
    name: 'Tibial antérieur',
    family: 'equilibre',
    minAchillePhase: 0,
    material: 'élastique (ou dos au mur)',
    levels: [
      { meta: '3 × 15', sets: 3, reps: 15, rest: 40 },
      { meta: '3 × 20', sets: 3, reps: 20, rest: 40 },
      { meta: '4 × 15 tension forte', sets: 4, reps: 15, rest: 45 },
    ],
    setup: 'Assis, élastique autour de l\'avant-pied fixé devant toi. Ou debout adossé au mur, talons à 20 cm du mur.',
    cue: 'Ramène la pointe de pied vers toi lentement, redescends en contrôle.',
    what: 'Le muscle du devant du tibia protège tibias et cheville en descente — c\'est lui qui freine l\'atterrissage du pied.',
    how: [
      'Assis : élastique autour de l\'avant-pied, fixé devant',
      'Ramène la pointe vers toi lentement',
      'Ou debout dos au mur : relève les pointes de pied',
      'Redescends en contrôle',
    ],
    video: 'https://www.youtube.com/results?search_query=renforcement+tibial+ant%C3%A9rieur',
    videoLabel: 'Vidéos : tibial antérieur',
  },

  // ---- HAUT DU CORPS ----
  'pompes': {
    name: 'Pompes',
    family: 'haut',
    minAchillePhase: 0,
    material: 'aucun',
    levels: [
      { meta: '3 × 8–12', sets: 3, reps: 10, rest: 60 },
      { meta: '3 × 12–15', sets: 3, reps: 14, rest: 60 },
      { meta: '4 × max−2', sets: 4, reps: 15, rest: 75 },
    ],
    setup: 'En planche, mains un peu plus larges que les épaules.',
    cue: 'Corps gainé, descends la poitrine vers le sol, remonte. Sur les genoux si besoin.',
    what: 'Poussée du haut du corps — les bâtons en montée, se relever, franchir en terrain technique.',
    how: [
      'Mains un peu plus larges que les épaules',
      'Corps gainé, descends la poitrine vers le sol',
      'Coudes à ~45° du corps',
      'Remonte en poussant (genoux au sol si trop dur)',
    ],
    video: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
    videoLabel: 'Vidéo : push-up',
  },
  'rowing-halteres': {
    name: 'Rowing haltère unilatéral',
    family: 'haut',
    minAchillePhase: 0,
    material: 'haltère + appui (chaise)',
    levels: [
      { meta: '3 × 10 / côté', sets: 3, reps: 10, rest: 60 },
      { meta: '3 × 12 / côté', sets: 3, reps: 12, rest: 60 },
      { meta: '4 × 10 / côté lourd', sets: 4, reps: 10, rest: 75 },
    ],
    setup: 'Un genou et une main en appui sur une chaise/canapé, haltère dans l\'autre main.',
    cue: 'Tire le coude vers la hanche en serrant l\'omoplate, contrôle la descente. Change de côté à chaque série.',
    what: 'Le dos travaille à chaque poussée de bâton et sous le sac. Équilibre la poussée des pompes.',
    how: [
      'Genou et main en appui, dos plat',
      'Haltère bras tendu vers le sol',
      'Tire le coude vers la hanche, serre l\'omoplate',
      'Contrôle la descente',
    ],
    video: 'https://www.youtube.com/results?search_query=rowing+halt%C3%A8re+unilat%C3%A9ral',
    videoLabel: 'Vidéos : rowing haltère',
  },
  'developpe-epaules': {
    name: 'Développé épaules haltères',
    family: 'haut',
    minAchillePhase: 0,
    material: 'haltères',
    levels: [
      { meta: '3 × 10', sets: 3, reps: 10, rest: 60 },
      { meta: '3 × 12', sets: 3, reps: 12, rest: 60 },
      { meta: '4 × 10 lourd', sets: 4, reps: 10, rest: 75 },
    ],
    setup: 'Debout ou assis, haltères à hauteur d\'épaules.',
    cue: 'Pousse les haltères au-dessus de la tête sans cambrer, redescends en contrôle.',
    what: 'Des épaules solides pour les bâtons en montée et le portage du sac sur les longues sorties.',
    how: [
      'Haltères à hauteur d\'épaules, coudes sous les poignets',
      'Pousse vers le haut sans cambrer le bas du dos',
      'Verrouille brièvement en haut',
      'Redescends en contrôle',
    ],
    video: 'https://www.youtube.com/results?search_query=d%C3%A9velopp%C3%A9+%C3%A9paules+halt%C3%A8res',
    videoLabel: 'Vidéos : développé épaules',
  },

  // ---- SOINS ----
  'balle-plantaire': {
    name: 'Balle sous la voûte plantaire',
    family: 'soins',
    minAchillePhase: 0,
    material: 'balle de tennis',
    levels: [
      { meta: '2 min / pied', sets: 2, hold: 120, rest: 15 },
      { meta: '2 min / pied', sets: 2, hold: 120, rest: 15 },
      { meta: '2 min / pied pression forte', sets: 2, hold: 120, rest: 15 },
    ],
    setup: 'Debout ou assis, balle de tennis sous la voûte plantaire.',
    cue: 'Roule la balle sous la voûte, pression modérée. Change de pied à la série suivante.',
    what: 'Détend la chaîne postérieure par le pied, SANS étirer le tendon. Un « soin » plus qu\'un exercice.',
    how: [
      'Balle de tennis sous la voûte plantaire',
      'Roule lentement du talon aux orteils',
      'Pression modérée, jamais douloureuse',
      '2 minutes par pied',
    ],
    video: 'https://www.youtube.com/results?search_query=massage+balle+vo%C3%BBte+plantaire',
    videoLabel: 'Vidéos : balle plantaire',
  },
};

// Libellés lisibles des familles (pour l'affichage).
export const FAMILY_LABELS = {
  montee: 'Montée · force jambes',
  descente: 'Descente · chaîne postérieure',
  gainage: 'Gainage · core',
  hanche: 'Hanche · stabilité bassin',
  equilibre: 'Équilibre · cheville',
  haut: 'Haut du corps',
  soins: 'Soins · pied',
};
