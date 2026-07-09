import React from 'react';
import { PHASES, DEFAULT_APPOINTMENTS } from './data/protocol.js';
import { CATALOGUE, FAMILY_LABELS } from './data/strength.js';
import { render } from './render.jsx';
import { evaluateGate } from './progression.js';

// Config (anciennement des "props" du composant embarqué).
const CONFIG = {
  restSeconds: null, // null => on utilise le repos propre à chaque exercice
  chartDays: 14,
};

const KEY = 'achille_night_v1';

// Injectés au build par Vite (voir vite.config.js). Fallback pour le dev.
const APP_VERSION = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : 'dev';
const BUILD_DATE = typeof __BUILD_DATE__ !== 'undefined' ? __BUILD_DATE__ : 'local';

export default class App extends React.Component {
  importRef = React.createRef();
  PH = PHASES;
  props = CONFIG;

  state = {
    tab: 'today',
    data: null,
    openEx: -1,
    openStr: -1,
    openAppt: -1,
    apptTitle: '',
    ses: null,
    toast: '',
  };

  STR = CATALOGUE;

  freshData() {
    return {
      start: this.todayStr(),
      phase: 0,
      phaseStart: this.todayStr(), // date d'entrée dans la phase courante
      strengthOn: true, // renfo activé par défaut
      strengthLevel: 0, // niveau renfo (0 => "Niveau 1")
      days: {},
      appts: DEFAULT_APPOINTMENTS.map((a) => ({ ...a })),
    };
  }

  componentDidMount() {
    let d = null;
    try {
      d = JSON.parse(localStorage.getItem(KEY));
    } catch (e) {}
    if (!d || !d.start) d = this.freshData();
    if (!d.appts) d.appts = [];
    if (!d.days) d.days = {};
    if (!d.phaseStart) d.phaseStart = d.start; // migration douce des anciennes données
    if (typeof d.strengthOn !== 'boolean') d.strengthOn = true;
    if (typeof d.strengthLevel !== 'number') d.strengthLevel = 0;
    this.setState({ data: d });
    this.timer = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  todayStr() {
    const d = new Date();
    return (
      d.getFullYear() +
      '-' +
      String(d.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(d.getDate()).padStart(2, '0')
    );
  }
  daysBetween(a, b) {
    return Math.round((new Date(b) - new Date(a)) / 86400000);
  }
  lastNDates(n) {
    const out = [];
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      out.push(
        d.getFullYear() +
          '-' +
          String(d.getMonth() + 1).padStart(2, '0') +
          '-' +
          String(d.getDate()).padStart(2, '0'),
      );
    }
    return out;
  }
  fmtShort(iso) {
    if (!iso) return '';
    try {
      return new Date(iso + 'T12:00:00').toLocaleDateString('fr-FR', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      });
    } catch (e) {
      return iso;
    }
  }

  save(data) {
    this.setState({ data });
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) {}
  }
  patchDay(patch) {
    const d = this.state.data,
      t = this.todayStr();
    const days = { ...d.days, [t]: { ...(d.days[t] || {}), ...patch } };
    this.save({ ...d, days });
  }
  showToast(m) {
    this.setState({ toast: m });
    clearTimeout(this.toastT);
    this.toastT = setTimeout(() => this.setState({ toast: '' }), 1800);
  }

  // ---- progression de phase ----
  // Change de phase et enregistre la date d'entrée (pour le compteur de jours).
  setPhase(i) {
    const d = this.state.data;
    this.save({ ...d, phase: i, phaseStart: this.todayStr() });
    this.setState({ openEx: -1 });
  }

  // ---- semaine type ----
  // Plan du jour selon le jour de la semaine (JS getDay : 0=Dim … 6=Sam)
  // et la phase Achille courante. Fallback : tout le tendon, pas de renfo.
  todayPlan(d = this.state.data) {
    const plan = (this.PH[d.phase].schedule || {})[new Date().getDay()];
    return plan || { title: 'Séance', tendon: true };
  }

  // Normalise un exercice du catalogue renfo à la forme « séance »
  // (sets/hold/reps/rest…), au niveau renfo courant.
  strengthItem(id, lvl) {
    const e = CATALOGUE[id];
    if (!e) return null;
    const L = e.levels[Math.min(lvl, e.levels.length - 1)];
    return {
      key: 's_' + id,
      name: e.name,
      meta: L.meta,
      family: e.family,
      sets: L.sets,
      hold: L.hold,
      reps: L.reps,
      rest: L.rest,
      setup: e.setup,
      cue: e.cue,
      what: e.what,
      how: e.how,
      tempo: L.hold ? ['Maintien ' + L.hold + ' s'] : [],
      isStrength: true,
    };
  }

  // ---- session ----
  // La séance du jour = exos tendon du jour PUIS exos renfo du jour,
  // selon la semaine type de la phase. Jour de repos → liste vide.
  guidedEx() {
    const d = this.state.data;
    const phase = this.PH[d.phase];
    const plan = this.todayPlan(d);
    if (plan.rest) return [];
    let tendon = [];
    if (plan.tendon) {
      const idxs = Array.isArray(plan.tendon) ? plan.tendon : phase.ex.map((_, i) => i);
      tendon = idxs
        .map((i) => (phase.ex[i] ? { ...phase.ex[i], idx: i, key: String(i) } : null))
        .filter((e) => e && e.sets);
    }
    const lvl = Math.min(d.strengthLevel || 0, 2);
    const renfo = d.strengthOn
      ? (plan.renfo || [])
          .filter((id) => CATALOGUE[id] && d.phase >= (CATALOGUE[id].minAchillePhase || 0))
          .map((id) => this.strengthItem(id, lvl))
      : [];
    return [...tendon, ...renfo];
  }
  restFor(ex) {
    return Number(this.props.restSeconds ?? ex.rest ?? 60);
  }
  startSession = () => {
    const list = this.guidedEx();
    if (!list.length) return;
    this.setState({ ses: { li: 0, set: 1, mode: 'ready', t: 5, paused: false } });
  };
  sesEx() {
    const s = this.state.ses;
    return s ? this.guidedEx()[s.li] : null;
  }
  tick() {
    const s = this.state.ses;
    if (!s || s.paused || s.mode === 'reps' || s.mode === 'done') return;
    if (s.t > 1) {
      this.setState({ ses: { ...s, t: s.t - 1 } });
      return;
    }
    this.advance();
  }
  advance() {
    const s = this.state.ses;
    if (!s) return;
    const list = this.guidedEx();
    const ex = list[s.li];
    if (s.mode === 'ready') {
      this.setState({ ses: { ...s, mode: ex.hold ? 'hold' : 'reps', t: ex.hold || 0 } });
      return;
    }
    if (s.mode === 'hold' || s.mode === 'reps') {
      // Après CHAQUE série, y compris la dernière : repos. `last` marque le
      // repos de fin d'exercice (récup avant l'exercice suivant).
      const isLast = s.set >= ex.sets;
      if (isLast) this.markDone(ex.key, true);
      this.setState({ ses: { ...s, mode: 'rest', t: this.restFor(ex), last: isLast } });
      return;
    }
    if (s.mode === 'rest') {
      // Fin du repos : soit série suivante du même exercice, soit exercice
      // suivant, soit fin de séance.
      if (!s.last) {
        this.setState({
          ses: { ...s, set: s.set + 1, mode: ex.hold ? 'hold' : 'reps', t: ex.hold || 0, last: false },
        });
        return;
      }
      if (s.li < list.length - 1) {
        this.setState({ ses: { li: s.li + 1, set: 1, mode: 'ready', t: 5, paused: false } });
        return;
      }
      this.setState({ ses: { ...s, mode: 'done' } });
    }
  }
  markDone(key, val) {
    const d = this.state.data,
      t = this.todayStr();
    const day = d.days[t] || {};
    const done = { ...(day.done || {}), [key]: val };
    const days = { ...d.days, [t]: { ...day, done, phase: d.phase } };
    this.save({ ...d, days });
  }

  // ---- import/export ----
  exportData = () => {
    const blob = new Blob([JSON.stringify(this.state.data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sauvegarde-tendons-' + this.todayStr() + '.json';
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('Sauvegarde exportée');
  };
  importClick = () => {
    if (this.importRef.current) this.importRef.current.click();
  };
  importData = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const d = JSON.parse(r.result);
        if (!d.start) throw new Error('bad');
        if (!d.appts) d.appts = [];
        if (!d.days) d.days = {};
        if (!d.phaseStart) d.phaseStart = d.start;
        this.save(d);
        this.showToast('Données importées ✓');
      } catch (err) {
        this.showToast('Fichier invalide');
      }
    };
    r.readAsText(f);
  };

  renderVals() {
    const S = this.state;
    const d = S.data || this.freshData();
    const t = this.todayStr();
    const phase = this.PH[d.phase];
    const day = d.days[t] || {};
    const doneMap = day.done || {};
    // Plan du jour (semaine type) + séance complète du jour (tendon + renfo).
    const plan = this.todayPlan(d);
    const isRestDay = !!plan.rest;
    const guided = this.guidedEx();

    // stats
    const dayNum = this.daysBetween(d.start, t) + 1;
    const dates14 = this.lastNDates(14);
    const anyDone = (dt) => {
      const dd = d.days[dt];
      return !!(dd && dd.done && Object.values(dd.done).some(Boolean));
    };
    // Régularité : on exclut les jours de repos de la semaine type du calcul.
    const phaseSched = phase.schedule || {};
    const isRestDate = (dt) => {
      const p = phaseSched[new Date(dt + 'T12:00:00').getDay()];
      return !!(p && p.rest);
    };
    const windowDates = dates14.slice(14 - Math.min(14, dayNum));
    const activeDates = windowDates.filter((dt) => !isRestDate(dt));
    const regularity = activeDates.length
      ? Math.round((activeDates.filter(anyDone).length / activeDates.length) * 100)
      : 0;
    const sessionsTotal = Object.keys(d.days).filter(anyDone).length;
    const pmToday = typeof day.pm === 'number' ? day.pm : null;

    const last7 = this.lastNDates(7)
      .map((dt) => d.days[dt])
      .filter((x) => x && typeof x.pm === 'number');
    const avg7 = last7.length
      ? (last7.reduce((s, x) => s + x.pm, 0) / last7.length).toFixed(1)
      : '–';
    const prev7 = this.lastNDates(14)
      .slice(0, 7)
      .map((dt) => d.days[dt])
      .filter((x) => x && typeof x.pm === 'number');
    let trendLabel = '';
    if (last7.length >= 2 && prev7.length >= 2) {
      const a = last7.reduce((s, x) => s + x.pm, 0) / last7.length;
      const b = prev7.reduce((s, x) => s + x.pm, 0) / prev7.length;
      if (b > 0) {
        const pct = Math.round(((a - b) / b) * 100);
        trendLabel = (pct <= 0 ? '↘ ' : '↗ +') + pct + '%';
      }
    }

    // sparkline (14d)
    const sparkPts = [];
    dates14.forEach((dt, i) => {
      const dd = d.days[dt];
      if (dd && typeof dd.pm === 'number')
        sparkPts.push([(i / 13) * 120, 24 - (dd.pm / 10) * 20]);
    });
    const hasSpark = sparkPts.length >= 2;

    // week bars
    const weekBars = this.lastNDates(7).map((dt) => ({
      bg: anyDone(dt) ? '#43e08a' : '#2a2f2b',
    }));

    // today's exercises
    const exToday = guided.map((ex, i) => {
      const isDone = !!doneMap[ex.key];
      return {
        name: ex.name,
        meta: ex.meta,
        isStrength: !!ex.isStrength,
        familyLabel: ex.isStrength ? FAMILY_LABELS[ex.family] || 'Renfo' : '',
        iconTxt: isDone ? '✓' : String(i + 1),
        iconBg: isDone
          ? 'rgba(67,224,138,.12)'
          : ex.isStrength
            ? 'rgba(120,160,255,.12)'
            : '#232823',
        iconColor: isDone ? '#43e08a' : ex.isStrength ? '#8ab0ff' : 'rgba(238,240,234,.5)',
        nameColor: isDone ? 'rgba(238,240,234,.5)' : '#eef0ea',
        nameDeco: isDone ? 'line-through' : 'none',
        toggle: () => this.markDone(ex.key, !isDone),
      };
    });
    const allDone = guided.length > 0 && guided.every((ex) => doneMap[ex.key]);
    const hasGuided = guided.length > 0;
    const totalSec = guided.reduce(
      (s, ex) => s + ex.sets * (ex.hold || ex.reps * 6) + (ex.sets - 1) * this.restFor(ex),
      0,
    );
    const sesMeta = hasGuided
      ? guided.length +
        ' exercice' +
        (guided.length > 1 ? 's' : '') +
        ' · ~' +
        Math.max(1, Math.round(totalSec / 60)) +
        ' min'
      : plan.cardio
        ? 'cardio du jour'
        : '';

    // next appt
    const upcoming = (d.appts || [])
      .filter((a) => !a.done && a.date && a.date >= t)
      .sort((a, b) => a.date.localeCompare(b.date));
    const nx = upcoming[0];
    let nxMon = '',
      nxDay = '',
      nxTitle = '',
      nxSub = '';
    if (nx) {
      const dd = new Date(nx.date + 'T12:00:00');
      nxMon = dd.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '');
      nxDay = String(dd.getDate());
      nxTitle = nx.title;
      const inD = this.daysBetween(t, nx.date);
      nxSub =
        this.fmtShort(nx.date) +
        (inD === 0
          ? " · aujourd'hui"
          : inD === 1
            ? ' · demain'
            : ' · dans ' + inD + ' jours');
    }

    // hero line
    const heroes = [
      ['Régularité,', 'tendon solide.'],
      ['Charge lente,', 'tendon solide.'],
      ['Du lourd,', 'en contrôle.'],
      ['Du rebond,', 'en douceur.'],
    ];
    const hero =
      d.phase === 0 ? heroes[0] : d.phase === 1 ? heroes[1] : d.phase === 2 ? heroes[2] : heroes[3];

    // programme — pastilles en CONSULTATION seule : elles ouvrent l'aperçu
    // d'une phase (ses exercices) sans changer la phase réelle. Le changement
    // de phase se fait uniquement par la progression (avancer) ou le recul.
    const viewedPhase = S.viewPhase != null ? S.viewPhase : d.phase;
    const phasePills = this.PH.map((p, i) => {
      const active = i === d.phase; // phase RÉELLE (là où tu en es)
      const viewing = i === viewedPhase; // phase affichée en aperçu
      return {
        num: String(i + 1),
        label: p.label + ' · ' + p.weeks,
        bg: active ? 'rgba(67,224,138,.12)' : viewing ? '#20261f' : '#181c19',
        border: active
          ? 'rgba(67,224,138,.5)'
          : viewing
            ? 'rgba(238,240,234,.35)'
            : '#232823',
        color: active || viewing ? '#eef0ea' : 'rgba(238,240,234,.6)',
        numColor: active ? '#43e08a' : viewing ? 'rgba(238,240,234,.7)' : 'rgba(238,240,234,.4)',
        isActive: active,
        pick: () => this.setState({ viewPhase: i, openEx: -1 }),
      };
    });
    // Bandeau d'aperçu quand on consulte une autre phase que la sienne.
    const viewingOther = viewedPhase !== d.phase;
    const viewPhaseObj = this.PH[viewedPhase];
    // Cartes d'exercices de la phase AFFICHÉE (aperçu), pas forcément la sienne.
    const exCards = viewPhaseObj.ex.map((ex, i) => ({
      num: String(i + 1),
      name: ex.name,
      meta: ex.meta,
      tempo: ex.tempo,
      what: ex.what,
      how: ex.how,
      video: ex.video,
      videoLabel: ex.videoLabel,
      isOpen: S.openEx === i,
      chev: S.openEx === i ? 'rotate(180deg)' : 'rotate(0deg)',
      toggleOpen: () => this.setState({ openEx: S.openEx === i ? -1 : i }),
    }));

    // ---- progression de phase — pilotée par la douleur (NOUVEAU) ----
    // Douleur réveil (pm) : moyennes et échantillons pour tendance.
    const wakeAvg7 = last7.length ? last7.reduce((s, x) => s + x.pm, 0) / last7.length : null;
    const wakeLast7 = last7.map((x) => x.pm);
    const wakePrev7 = prev7.map((x) => x.pm);
    // Douleur pendant l'exercice (pe) : moyenne des jours récents où elle est notée.
    const pe7 = this.lastNDates(7)
      .map((dt) => d.days[dt])
      .filter((x) => x && typeof x.pe === 'number')
      .map((x) => x.pe);
    const exerciseAvgRecent = pe7.length
      ? pe7.reduce((s, x) => s + x, 0) / pe7.length
      : null;

    const prog = evaluateGate({
      phases: this.PH,
      phaseIndex: d.phase,
      phaseStart: d.phaseStart || d.start,
      today: t,
      days: d.days,
      wakeAvg7,
      exerciseAvgRecent,
      wakeLast7,
      wakePrev7,
      daysBetween: (a, b) => this.daysBetween(a, b),
    });
    const advancePhase = () => {
      if (d.phase < this.PH.length - 1) {
        this.setPhase(d.phase + 1);
        this.setState({ viewPhase: null });
        this.showToast('Bravo — phase ' + (d.phase + 2) + ' débloquée ✓');
      }
    };
    const goBackPhase = () => {
      if (d.phase > 0) {
        this.setPhase(d.phase - 1);
        this.setState({ viewPhase: null });
        this.showToast('Retour en phase ' + d.phase + ' — on stabilise.');
      }
    };

    // ---- recul automatique proposé (règle 🔴 du feu tricolore) ----
    // « douleur > 5 pendant l'effort, OU raideur matinale en forte hausse
    //   → recule d'un cran ». On PROPOSE (pas de recul forcé), et seulement
    //   si on n'est pas déjà en phase 1.
    const wakeRising =
      wakeLast7.length >= 2 &&
      wakePrev7.length >= 2 &&
      wakeLast7.reduce((s, x) => s + x, 0) / wakeLast7.length >
        wakePrev7.reduce((s, x) => s + x, 0) / wakePrev7.length + 1.5;
    const painTooHigh =
      (exerciseAvgRecent !== null && exerciseAvgRecent > 5) ||
      (pmToday !== null && pmToday > 5);
    const suggestBack = d.phase > 0 && (painTooHigh || wakeRising);
    let backReason = '';
    if (suggestBack) {
      if (painTooHigh) backReason = 'Ta douleur a dépassé 5/10 — le tendon dit stop.';
      else backReason = 'Ta raideur matinale grimpe nettement sur la semaine.';
    }

    // ---- renfo : niveau + progression + exos verrouillés ----
    const strengthLevel = d.strengthLevel || 0;
    const strengthActive = guided.some((ex) => ex.isStrength); // au moins 1 exo renfo autorisé
    const catalogArr = Object.values(CATALOGUE);
    // Exos renfo verrouillés par la phase Achille (pour info dans l'onglet).
    const strengthLocked = catalogArr
      .filter((e) => d.phase < (e.minAchillePhase || 0))
      .map((e) => ({
        name: e.name,
        familyLabel: FAMILY_LABELS[e.family] || 'Renfo',
        unlockAt: this.PH[e.minAchillePhase] ? this.PH[e.minAchillePhase].label : 'plus tard',
      }));
    // Cartes renfo dépliables (mêmes infos que les exos Achille : quoi / comment
    // / vidéo), pour les exos autorisés à la phase courante, au niveau courant.
    const strengthCards = catalogArr
      .filter((e) => d.phase >= (e.minAchillePhase || 0))
      .map((e, i) => {
        const L = e.levels[Math.min(strengthLevel, e.levels.length - 1)];
        return {
          name: e.name,
          meta: L.meta,
          familyLabel: FAMILY_LABELS[e.family] || 'Renfo',
          what: e.what,
          how: e.how,
          video: e.video,
          videoLabel: e.videoLabel,
          isOpen: S.openStr === i,
          chev: S.openStr === i ? 'rotate(180deg)' : 'rotate(0deg)',
          toggleOpen: () => this.setState({ openStr: S.openStr === i ? -1 : i }),
        };
      });

    // ---- semaine type (affichage Programme, phase consultée) ----
    const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const todayIdx = new Date().getDay();
    const viewSched = viewPhaseObj.schedule || {};
    const weekPlan = [1, 2, 3, 4, 5, 6, 0].map((i) => {
      const p = viewSched[i] || { title: 'Séance', tendon: true };
      return {
        d: dayNames[i],
        title: p.title || 'Séance',
        // « aujourd'hui » n'est surligné que si on consulte sa propre phase.
        isToday: i === todayIdx && !viewingOther,
        isRest: !!p.rest,
      };
    });
    const strengthVals = {
      strengthOn: !!d.strengthOn,
      strengthActive,
      strengthLevel,
      strengthLevelLabel: 'Niveau ' + (strengthLevel + 1) + ' / 3',
      canLevelUp: strengthLevel < 2,
      strengthLocked,
      hasStrengthLocked: strengthLocked.length > 0,
      strengthCards,
      toggleStrength: () => this.save({ ...d, strengthOn: !d.strengthOn }),
      levelUp: () => {
        if ((d.strengthLevel || 0) < 2) {
          this.save({ ...d, strengthLevel: (d.strengthLevel || 0) + 1 });
          this.showToast('Renfo — Niveau ' + ((d.strengthLevel || 0) + 2) + ' ✓');
        }
      },
      levelDown: () => {
        if ((d.strengthLevel || 0) > 0) {
          this.save({ ...d, strengthLevel: (d.strengthLevel || 0) - 1 });
          this.showToast('Renfo — Niveau ' + (d.strengthLevel || 0) + '');
        }
      },
    };

    // suivi chart
    const N = Number(this.props.chartDays ?? 14);
    const datesN = this.lastNDates(N);
    const chartPts = [];
    datesN.forEach((dt, i) => {
      const dd = d.days[dt];
      if (dd && typeof dd.pm === 'number')
        chartPts.push([(i / (N - 1)) * 300, 106 - (dd.pm / 10) * 98]);
    });
    const hasChart = chartPts.length >= 2;
    const chartBars = datesN.map((dt) => ({ bg: anyDone(dt) ? '#43e08a' : '#232823' }));

    const history = Object.keys(d.days)
      .sort()
      .reverse()
      .slice(0, 14)
      .map((dt) => {
        const dd = d.days[dt];
        const ses = anyDone(dt);
        return {
          dateLabel: this.fmtShort(dt),
          pm: typeof dd.pm === 'number' ? String(dd.pm) : '–',
          pe: typeof dd.pe === 'number' ? String(dd.pe) : '–',
          note: dd.note || '',
          hasNote: !!dd.note,
          sesTxt: ses ? 'séance ✓' : '—',
          sesColor: ses ? '#43e08a' : 'rgba(238,240,234,.3)',
        };
      });

    // médical
    const sorted = [...(d.appts || [])].sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1;
      if (!!a.date !== !!b.date) return a.date ? -1 : 1;
      return (a.date || '').localeCompare(b.date || '');
    });
    const appts = sorted.map((ap) => {
      const open = S.openAppt === ap.id;
      let mon = '—',
        dayN = '';
      if (ap.date) {
        const dd = new Date(ap.date + 'T12:00:00');
        mon = dd.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '');
        dayN = String(dd.getDate());
      }
      const upd = (patch) => {
        const appts2 = d.appts.map((x) => (x.id === ap.id ? { ...x, ...patch } : x));
        this.save({ ...d, appts: appts2 });
      };
      return {
        title: ap.title,
        date: ap.date,
        note: ap.note,
        mon,
        day: dayN || '·',
        monColor: ap.date ? '#43e08a' : 'rgba(238,240,234,.3)',
        sub: ap.done ? 'fait ✓' : ap.date ? this.fmtShort(ap.date) : 'pas encore planifié',
        subColor: ap.done
          ? '#43e08a'
          : ap.date
            ? 'rgba(238,240,234,.55)'
            : 'rgba(238,240,234,.35)',
        deco: ap.done ? 'line-through' : 'none',
        opacity: ap.done ? '0.55' : '1',
        isOpen: open,
        chev: open ? 'rotate(180deg)' : 'rotate(0deg)',
        toggleOpen: () => this.setState({ openAppt: open ? -1 : ap.id }),
        setDate: (e) => upd({ date: e.target.value }),
        setNote: (e) => upd({ note: e.target.value }),
        toggleDone: () => upd({ done: !ap.done }),
        doneTxt: ap.done ? 'Marquer à refaire' : 'Marquer comme fait ✓',
        doneBg: ap.done ? '#232823' : 'rgba(67,224,138,.12)',
        doneColor: ap.done ? 'rgba(238,240,234,.6)' : '#43e08a',
        del: () => {
          this.save({ ...d, appts: d.appts.filter((x) => x.id !== ap.id) });
        },
      };
    });

    // nav
    const nav = [
      { key: 'today', label: "Aujourd'hui", d: 'M12 3l8 6v11H4V9z' },
      { key: 'prog', label: 'Programme', d: 'M3 9v6M7 9v6M17 9v6M21 9v6M7 12h10' },
      { key: 'suivi', label: 'Suivi', d: 'M3 17l6-6 4 4 8-8' },
      { key: 'med', label: 'Médical', d: 'M12 5v14M5 12h14' },
    ].map((n) => ({
      ...n,
      color: S.tab === n.key ? '#43e08a' : 'rgba(238,240,234,.4)',
      weight: S.tab === n.key ? '700' : '500',
      go: () => this.setState({ tab: n.key }),
    }));

    // session vals
    const ses = S.ses;
    const sexo = ses ? guided[ses.li] : null;
    let sesVals = {
      sesActive: !!ses,
      sesRunning: !!ses && ses.mode !== 'done',
      sesFinished: !!ses && ses.mode === 'done',
      sesHeader: '',
      sesExName: '',
      sesSetLabel: '',
      sesModeLabel: '',
      sesBig: '',
      sesUnit: '',
      sesDash: '540 540',
      sesRingColor: '#43e08a',
      sesHint: '',
      sesCue: '',
      sesShowDone: false,
      sesShowSkip: false,
      sesShowPause: false,
      sesPauseTxt: 'Pause',
    };
    if (ses && sexo) {
      const circ = 540;
      sesVals.sesHeader = 'Exercice ' + (ses.li + 1) + ' / ' + guided.length;
      sesVals.sesExName = sexo.name;
      sesVals.sesSetLabel = 'Série ' + ses.set + ' / ' + sexo.sets;
      const fmt = (s) =>
        s >= 60 ? Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0') : String(s);
      if (ses.mode === 'ready') {
        sesVals.sesModeLabel = 'Prépare-toi';
        sesVals.sesBig = String(ses.t);
        sesVals.sesUnit = 'mise en place';
        sesVals.sesRingColor = 'rgba(238,240,234,.5)';
        sesVals.sesDash = (ses.t / 5) * circ + ' ' + circ;
        sesVals.sesCue = sexo.setup || '';
        sesVals.sesHint = (sexo.tempo || []).join(' · ');
      } else if (ses.mode === 'hold') {
        sesVals.sesModeLabel = 'Tiens !';
        sesVals.sesBig = fmt(ses.t);
        sesVals.sesUnit = 'secondes';
        sesVals.sesDash = (ses.t / sexo.hold) * circ + ' ' + circ;
        sesVals.sesCue = sexo.cue || '';
        sesVals.sesHint = 'Zone verte ≤ 3/10 · orange 4–5 ponctuel · > 5 = stop.';
        sesVals.sesShowPause = true;
        sesVals.sesPauseTxt = ses.paused ? 'Reprendre ▶' : 'Pause';
      } else if (ses.mode === 'reps') {
        sesVals.sesModeLabel = 'À toi';
        sesVals.sesBig = String(sexo.reps);
        sesVals.sesUnit = 'répétitions';
        sesVals.sesDash = circ + ' ' + circ;
        sesVals.sesCue = sexo.cue || '';
        sesVals.sesHint = 'Prends ton temps, c\'est la lenteur qui soigne.';
        sesVals.sesShowDone = true;
      } else if (ses.mode === 'rest') {
        sesVals.sesBig = fmt(ses.t);
        sesVals.sesUnit = 'récupération';
        sesVals.sesRingColor = '#f5b942';
        sesVals.sesDash = (ses.t / this.restFor(sexo)) * circ + ' ' + circ;
        if (ses.last) {
          // Repos de fin d'exercice : on annonce l'exercice suivant, ou la fin.
          const next = guided[ses.li + 1];
          sesVals.sesModeLabel = 'Repos';
          sesVals.sesCue = next
            ? 'Récupère bien. Prochain exercice : ' + next.name + '.'
            : 'Récupère — c\'est la dernière ligne droite.';
        } else {
          sesVals.sesModeLabel = 'Repos';
          sesVals.sesCue =
            'Respire, relâche le mollet. Prochaine : série ' + (ses.set + 1) + ' / ' + sexo.sets + '.';
        }
        sesVals.sesHint = '';
        sesVals.sesShowSkip = true;
      }
    }

    return {
      // nav / tabs
      nav,
      isToday: S.tab === 'today' && !ses,
      isProg: S.tab === 'prog' && !ses,
      isSuivi: S.tab === 'suivi' && !ses,
      isMed: S.tab === 'med' && !ses,

      // today
      dayNum: String(dayNum),
      phaseShort: phase.short,
      regularity: String(regularity),
      heroLine1: hero[0],
      heroLine2: hero[1],
      pmBig: pmToday === null ? '–' : String(pmToday),
      trendLabel,
      hasSpark,
      noSpark: !hasSpark,
      sparkPoints: sparkPts.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' '),
      sessionsTotal: String(sessionsTotal),
      weekBars,
      pmVal: pmToday === null ? 0 : pmToday,
      peVal: typeof day.pe === 'number' ? day.pe : 0,
      noteVal: day.note || '',
      setPm: (e) => this.patchDay({ pm: +e.target.value }),
      setPe: (e) => this.patchDay({ pe: +e.target.value }),
      setNote: (e) => this.patchDay({ note: e.target.value }),
      // feu tricolore : 🟢 0–3 · 🟠 4–5 · 🔴 >5
      pmAmber: pmToday !== null && pmToday >= 4 && pmToday <= 5,
      pmRed: pmToday !== null && pmToday > 5,
      peAmber: typeof day.pe === 'number' && day.pe >= 4 && day.pe <= 5,
      peRed: typeof day.pe === 'number' && day.pe > 5,
      exToday,
      allDone,
      notAllDone: !allDone,
      hasGuided,
      sesMeta,
      startSession: this.startSession,
      // semaine type / plan du jour
      dayPlanTitle: plan.title || '',
      isRestDay,
      notRestDay: !isRestDay,
      restNote: plan.note || 'Repos complet — la récupération fait partie du programme.',
      hasCardio: !isRestDay && !!plan.cardio,
      cardioLabel: plan.cardio || '',
      cardioDone: !!doneMap['cardio'],
      toggleCardio: () => this.markDone('cardio', !doneMap['cardio']),
      weekPlan,
      hasNextAppt: !!nx,
      noNextAppt: !nx,
      nxMon,
      nxDay,
      nxTitle,
      nxSub,
      goMedFromAppt: () => this.setState({ tab: 'med' }),

      // programme
      phasePills,
      phaseGoal: viewPhaseObj.goal,
      exCards,
      // aperçu d'une autre phase que la sienne
      viewingOther,
      viewPhaseLabel: viewPhaseObj.label,
      backToMyPhase: () => this.setState({ viewPhase: null, openEx: -1 }),

      // progression de phase (NOUVEAU)
      prog,
      advancePhase,
      // recul de phase
      canGoBack: d.phase > 0,
      goBackPhase,
      suggestBack,
      backReason,
      currentPhaseLabel: phase.label,
      prevPhaseLabel: d.phase > 0 ? this.PH[d.phase - 1].label : '',

      // renfo trail (NOUVEAU)
      ...strengthVals,

      // suivi
      avg7,
      chartRangeLabel: N + ' derniers jours',
      hasChart,
      noChart: !hasChart,
      chartPoints: chartPts.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' '),
      chartBars,
      history,
      hasHistory: history.length > 0,
      noHistory: history.length === 0,
      exportData: this.exportData,
      importClick: this.importClick,
      importData: this.importData,
      importRef: this.importRef,

      // médical
      appts,
      apptTitle: S.apptTitle,
      setApptTitle: (e) => this.setState({ apptTitle: e.target.value }),
      addAppt: () => {
        const title = (S.apptTitle || '').trim();
        if (!title) return;
        const id = Date.now();
        this.save({ ...d, appts: [...d.appts, { id, title, date: '', note: '', done: false }] });
        this.setState({ apptTitle: '', openAppt: id });
      },

      // session
      ...sesVals,
      sesClose: () => this.setState({ ses: null }),
      sesSkipEx: () => {
        const s = S.ses;
        if (!s) return;
        if (s.li < guided.length - 1)
          this.setState({ ses: { li: s.li + 1, set: 1, mode: 'ready', t: 5, paused: false } });
        else this.setState({ ses: { ...s, mode: 'done' } });
      },
      sesSetDone: () => this.advance(),
      sesSkip: () => this.advance(),
      sesPauseToggle: () => this.setState({ ses: { ...S.ses, paused: !S.ses.paused } }),

      // toast
      hasToast: !!S.toast,
      toast: S.toast,

      // version
      appVersion: APP_VERSION,
      buildDate: BUILD_DATE,
    };
  }

  render() {
    if (!this.state.data) return null;
    return render(this.renderVals());
  }
}
