// ============================================================================
//  SONS DE LA SÉANCE GUIDÉE
// ============================================================================
//
//  Bips synthétisés via la Web Audio API — aucun fichier audio, fonctionne
//  hors-ligne. Objectif : suivre la séance sans regarder le téléphone.
//
//  Contrainte navigateur : l'audio ne peut démarrer qu'après une interaction
//  utilisateur. On appelle donc `unlockSound()` au clic sur « démarrer la
//  séance » pour débloquer le contexte audio.
//
//  Réglage on/off mémorisé dans localStorage (clé dédiée).
// ============================================================================

const SOUND_KEY = 'achille_sound_on';

let ctx = null;

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

// À appeler sur un geste utilisateur (clic « démarrer ») pour autoriser l'audio.
export function unlockSound() {
  if (!isSoundOn()) return;
  try {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    // Petit bip muet pour « réveiller » le contexte sur iOS.
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    g.gain.value = 0;
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.01);
  } catch (e) {}
}

// Joue un bip : fréquence (Hz), durée (s), volume (0-1), forme d'onde.
function beep(freq, dur, vol = 0.25, type = 'sine', when = 0) {
  if (!isSoundOn()) return;
  try {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    const t0 = ctx.currentTime + when;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    // Enveloppe douce (attaque + extinction) pour éviter les « clics ».
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(t0);
    o.stop(t0 + dur + 0.02);
  } catch (e) {}
}

// ---- Sons nommés (appelés depuis la machine à états de la séance) ----

// Tic du décompte (3-2-1) : bip court et discret.
export function soundTick() {
  beep(880, 0.09, 0.18, 'sine');
}

// Changement de côté (Droite → Gauche) : deux notes montantes distinctes.
export function soundSwitchSide() {
  beep(660, 0.12, 0.28, 'triangle', 0);
  beep(990, 0.14, 0.28, 'triangle', 0.13);
}

// Début du repos : note descendante « relâche ».
export function soundRestStart() {
  beep(520, 0.18, 0.26, 'sine', 0);
  beep(390, 0.22, 0.26, 'sine', 0.16);
}

// Reprise de l'effort après le repos : note montante « on repart ».
export function soundGo() {
  beep(523, 0.12, 0.3, 'square', 0);
  beep(784, 0.16, 0.3, 'square', 0.12);
}

// Fin de séance : petite mélodie de victoire.
export function soundFinish() {
  beep(523, 0.14, 0.3, 'triangle', 0); // do
  beep(659, 0.14, 0.3, 'triangle', 0.15); // mi
  beep(784, 0.14, 0.3, 'triangle', 0.3); // sol
  beep(1047, 0.3, 0.32, 'triangle', 0.45); // do aigu
}
