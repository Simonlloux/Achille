// ============================================================================
//  SONS DE LA SÉANCE GUIDÉE
// ============================================================================
//
//  Bips synthétisés via la Web Audio API — aucun fichier audio, fonctionne
//  hors-ligne. Objectif : suivre la séance sans regarder le téléphone.
//
//  iOS / Safari PWA sont très stricts sur l'audio :
//   - Le contexte doit être créé et débloqué DANS un gestionnaire tactile.
//   - Le contexte peut être re-suspendu ; on le relance (resume) à chaque son.
//   - Un buffer silencieux joué au déblocage aide à « armer » la sortie.
//  On appelle `unlockSound()` à chaque interaction (démarrer, bouton son,
//  bouton test) pour maximiser les chances que l'audio soit autorisé.
//
//  Réglage on/off mémorisé dans localStorage.
// ============================================================================

const SOUND_KEY = 'achille_sound_on';

let ctx = null;

function getCtx() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
}

export function isSoundOn() {
  try {
    return localStorage.getItem(SOUND_KEY) !== '0'; // activé par défaut
  } catch (e) {
    return true;
  }
}

export function setSoundOn(on) {
  try {
    localStorage.setItem(SOUND_KEY, on ? '1' : '0');
  } catch (e) {}
}

// À appeler sur CHAQUE geste utilisateur (clic démarrer, bouton son, test).
// Crée le contexte, le relance, et joue un buffer silencieux pour armer iOS.
export function unlockSound() {
  const c = getCtx();
  if (!c) return;
  try {
    if (c.state === 'suspended') c.resume();
    // Buffer silencieux (1 frame) : débloque la sortie audio sur iOS.
    const buf = c.createBuffer(1, 1, 22050);
    const src = c.createBufferSource();
    src.buffer = buf;
    src.connect(c.destination);
    src.start(0);
  } catch (e) {}
}

// Joue un bip. Relance le contexte à chaque fois (iOS peut l'avoir suspendu).
function beep(freq, dur, vol = 0.3, type = 'sine', when = 0) {
  if (!isSoundOn()) return;
  const c = getCtx();
  if (!c) return;
  try {
    if (c.state === 'suspended') c.resume();
    const t0 = c.currentTime + when;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g);
    g.connect(c.destination);
    o.start(t0);
    o.stop(t0 + dur + 0.03);
  } catch (e) {}
}

// ---- Sons nommés (appelés depuis la machine à états de la séance) ----

// Tic du décompte (3-2-1).
export function soundTick() {
  beep(880, 0.1, 0.25, 'sine');
}

// Changement de côté (Droite → Gauche) : deux notes montantes distinctes.
export function soundSwitchSide() {
  beep(660, 0.13, 0.35, 'triangle', 0);
  beep(990, 0.16, 0.35, 'triangle', 0.14);
}

// Début du repos : note descendante « relâche ».
export function soundRestStart() {
  beep(520, 0.2, 0.32, 'sine', 0);
  beep(390, 0.24, 0.32, 'sine', 0.18);
}

// Reprise de l'effort après le repos : note montante « on repart ».
export function soundGo() {
  beep(523, 0.13, 0.38, 'square', 0);
  beep(784, 0.18, 0.38, 'square', 0.13);
}

// Fin de séance : petite mélodie de victoire.
export function soundFinish() {
  beep(523, 0.15, 0.35, 'triangle', 0); // do
  beep(659, 0.15, 0.35, 'triangle', 0.16); // mi
  beep(784, 0.15, 0.35, 'triangle', 0.32); // sol
  beep(1047, 0.32, 0.38, 'triangle', 0.48); // do aigu
}

// Son de test (bouton « Tester le son »).
export function soundTest() {
  unlockSound();
  beep(659, 0.15, 0.35, 'triangle', 0.02);
  beep(988, 0.2, 0.35, 'triangle', 0.18);
}
