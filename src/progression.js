// ============================================================================
//  PROGRESSION DES PHASES — PILOTÉE PAR LA DOULEUR
// ============================================================================
//
//  Répond à LA question que l'app d'origine laissait sans réponse :
//  « Quand est-ce que je passe à la phase suivante ? »
//
//  Ici, ce n'est NI le calendrier NI le nombre de séances qui décident, mais
//  la DOULEUR — au réveil et pendant l'exercice. La durée n'est qu'un plancher
//  de sécurité minimal. Aucun passage forcé : on évalue les critères `gate`
//  de la phase courante et on renvoie un état lisible ; toi tu valides.
//
//  Critères possibles (voir protocol.js) :
//    minDays          : plancher de jours dans la phase
//    maxWakePain7d    : douleur au réveil (moy. 7 j) ≤ cette valeur
//    maxExercisePain  : douleur pendant l'exercice (moy. récente) ≤ cette valeur
//    painMustNotRise  : la tendance douleur réveil ne doit pas monter
// ============================================================================

export function evaluateGate({
  phases,
  phaseIndex,
  phaseStart,
  today,
  days,
  wakeAvg7, // douleur réveil moyenne sur 7 j (ou null)
  exerciseAvgRecent, // douleur exercice moyenne récente (ou null)
  wakeLast7, // échantillons douleur réveil, 7 derniers jours
  wakePrev7, // échantillons douleur réveil, 7 jours précédents
  daysBetween,
}) {
  const phase = phases[phaseIndex];
  const isLast = phaseIndex >= phases.length - 1;
  const gate = phase.gate;

  // Dernière phase, ou phase sans critères : rien à débloquer.
  if (isLast || !gate) {
    return {
      hasNext: false,
      isLast,
      ready: false,
      daysInPhase: daysBetween(phaseStart, today) + 1,
      criteria: [],
      summary: isLast
        ? 'Dernière phase : reprise progressive, à ton rythme.'
        : 'Progression libre pour cette phase.',
    };
  }

  const nextPhase = phases[phaseIndex + 1];
  const daysInPhase = daysBetween(phaseStart, today) + 1;

  // Tendance douleur réveil : moyenne 7 j récents vs 7 j précédents.
  let painRising = false;
  if (wakeLast7 && wakeLast7.length >= 2 && wakePrev7 && wakePrev7.length >= 2) {
    const a = wakeLast7.reduce((s, x) => s + x, 0) / wakeLast7.length;
    const b = wakePrev7.reduce((s, x) => s + x, 0) / wakePrev7.length;
    painRising = a > b + 0.5; // marge pour ignorer le bruit
  }

  const criteria = [];

  // Plancher de sécurité (garde-fou, volontairement court).
  if (typeof gate.minDays === 'number') {
    const ok = daysInPhase >= gate.minDays;
    criteria.push({
      key: 'days',
      label: 'Délai de sécurité',
      ok,
      current: daysInPhase + ' j',
      target: '≥ ' + gate.minDays + ' j',
      remaining: ok ? '' : 'encore ' + (gate.minDays - daysInPhase) + ' j',
    });
  }

  // Douleur au réveil (le juge principal du lendemain).
  if (typeof gate.maxWakePain7d === 'number') {
    const has = wakeAvg7 !== null && wakeAvg7 !== undefined;
    const ok = has && wakeAvg7 <= gate.maxWakePain7d;
    criteria.push({
      key: 'wake',
      label: 'Douleur réveil (moy. 7 j)',
      ok,
      current: has ? wakeAvg7.toFixed(1) : '—',
      target: '≤ ' + gate.maxWakePain7d,
      remaining: has ? (ok ? '' : 'à faire baisser') : 'note ta douleur réveil',
    });
  }

  // Douleur pendant l'exercice.
  if (typeof gate.maxExercisePain === 'number') {
    const has = exerciseAvgRecent !== null && exerciseAvgRecent !== undefined;
    const ok = has && exerciseAvgRecent <= gate.maxExercisePain;
    criteria.push({
      key: 'exercise',
      label: 'Douleur à l\'exercice',
      ok,
      current: has ? exerciseAvgRecent.toFixed(1) : '—',
      target: '≤ ' + gate.maxExercisePain,
      remaining: has ? (ok ? '' : 'à faire baisser') : 'note-la en fin de séance',
    });
  }

  // La douleur réveil ne doit pas être en hausse.
  if (gate.painMustNotRise) {
    const ok = !painRising;
    criteria.push({
      key: 'trend',
      label: 'Tendance douleur',
      ok,
      current: painRising ? 'en hausse' : 'stable / en baisse',
      target: 'pas en hausse',
      remaining: ok ? '' : 'stabilise avant de progresser',
    });
  }

  const ready = criteria.length > 0 && criteria.every((c) => c.ok);
  const remainingCriteria = criteria.filter((c) => !c.ok);

  let summary;
  if (ready) {
    summary = 'Tu remplis tous les critères — tu peux passer à « ' + nextPhase.label + ' ».';
  } else if (remainingCriteria.length === 1) {
    summary = 'Presque : il reste 1 critère avant « ' + nextPhase.label + ' ».';
  } else {
    summary =
      'Il reste ' + remainingCriteria.length + ' critères avant « ' + nextPhase.label + ' ».';
  }

  return {
    hasNext: true,
    isLast: false,
    ready,
    daysInPhase,
    nextLabel: nextPhase.label,
    criteria,
    summary,
  };
}
