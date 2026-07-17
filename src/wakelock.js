// ============================================================================
//  WAKE LOCK — garder l'écran allumé pendant la séance
// ============================================================================
//
//  Empêche le téléphone de se mettre en veille pendant une séance guidée.
//  API Screen Wake Lock (Safari iOS 16.4+, Chrome Android). Sans support,
//  échoue silencieusement — pas de plantage.
//
//  Le verrou est relâché automatiquement par le système quand l'onglet passe
//  en arrière-plan ; on le ré-acquiert au retour via `reacquireOnVisible()`.
// ============================================================================

let sentinel = null;
let wanted = false; // true tant qu'une séance est en cours

export async function acquireWakeLock() {
  wanted = true;
  if (!('wakeLock' in navigator)) return;
  try {
    if (sentinel) return; // déjà actif
    sentinel = await navigator.wakeLock.request('screen');
    // Si le système relâche le verrou (ex. app en arrière-plan), on le note.
    sentinel.addEventListener('release', () => {
      sentinel = null;
    });
  } catch (e) {
    // Refusé (batterie faible, onglet caché…) — on réessaiera au retour.
    sentinel = null;
  }
}

export async function releaseWakeLock() {
  wanted = false;
  if (sentinel) {
    try {
      await sentinel.release();
    } catch (e) {}
    sentinel = null;
  }
}

// Ré-acquiert le verrou quand l'app redevient visible (si une séance est active).
// À brancher une seule fois (au montage de l'app).
export function initWakeLockAutoReacquire() {
  if (typeof document === 'undefined') return;
  document.addEventListener('visibilitychange', () => {
    if (wanted && document.visibilityState === 'visible' && !sentinel) {
      acquireWakeLock();
    }
  });
}
