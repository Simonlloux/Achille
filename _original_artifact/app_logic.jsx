
class Component extends DCLogic {
  KEY = 'achille_night_v1';
  importRef = React.createRef();

  PH = [
    { short:'Phase 1 · Isométrique', label:'Isométrique', weeks:'S1–2',
      goal:'Calmer la douleur et réhabituer le tendon à la charge, sans mouvement.',
      ex:[
        { name:'Maintien isométrique — 2 jambes', meta:'5 × 45 s · 2×/jour', sets:5, hold:45, rest:60,
          setup:'Debout face à un mur, pieds à plat, une main en appui léger pour l\'équilibre.',
          cue:'Monte sur la pointe des 2 pieds en 2 s, puis tiens la position en haut, totalement immobile.',
          tempo:['Montée 2 s','Maintien 45 s','Repos 60 s'],
          what:'« Isométrique » = tu contractes le mollet SANS bouger. Tu montes sur la pointe des pieds et tu tiens la position, immobile. Pas de descente contrôlée : juste tenir.',
          how:['Debout, pieds à plat, une main sur un mur pour l\'équilibre','Monte sur la pointe des deux pieds (2 s)','Tiens la position en haut, immobile, 45 secondes','Redescends, repose 1 min, recommence — 5 fois'],
          video:'https://www.youtube.com/watch?v=arLsa_isSOw', videoLabel:'Vidéo : isometric calf raise' },
        { name:'Maintien isométrique — 1 jambe', meta:'3 × 30 s · quand 2 jambes est facile', sets:3, hold:30, rest:60,
          setup:'Transfère ton poids sur une jambe, l\'autre décollée du sol. Main en appui léger.',
          cue:'Monte sur la pointe et tiens, immobile. Si 30 s est trop dur, repose-toi et note-le.',
          tempo:['Maintien 20–45 s'],
          what:'Même principe, mais sur une seule jambe pour augmenter la charge. À introduire seulement quand la version 2 jambes est indolore.',
          how:['Transfère ton poids sur une jambe, l\'autre décollée','Monte sur la pointe et tiens 20 s au début','Progresse vers 45 s','Garde une main en appui léger'],
          video:'https://www.youtube.com/watch?v=x1LhV2nj01Q', videoLabel:'Vidéo : single leg isometric hold' }
      ]},
    { short:'Phase 2 · Charge lente', label:'Charge lente', weeks:'S3–6',
      goal:'Charge dynamique lente sur toute l\'amplitude. Le moteur de la guérison.',
      ex:[
        { name:'Montées lentes 2 jambes au bord de marche', meta:'3 × 15 · 1×/jour', sets:3, reps:15, rest:60,
          setup:'Avant-pieds au bord de la marche, talons dans le vide. Une main en appui.',
          cue:'Monte sur la pointe en 3 s, redescends les talons SOUS le niveau de la marche en 3 s. 15 répétitions lentes.',
          tempo:['Montée 3 s','Descente 3 s'],
          what:'Debout sur le bord d\'une marche, talons dans le vide. Descendre le talon SOUS le niveau de la marche étire davantage le tendon et le charge mieux. Mouvement lent : c\'est la lenteur qui soigne, pas le nombre.',
          how:['Avant-pieds sur le bord de la marche, talons dans le vide','Monte sur la pointe en 3 secondes','Redescends les talons SOUS le niveau de la marche en 3 secondes','3 séries de 15, une main en appui'],
          video:'https://www.youtube.com/watch?v=isVPZTr5iXk', videoLabel:'Vidéo : Achilles heel raise on step' },
        { name:'Descente excentrique 1 jambe', meta:'3 × 15 · quand prêt', sets:3, reps:15, rest:60,
          setup:'Au bord de la marche. Le mouvement : monter à 2 jambes, descendre sur 1 seule.',
          cue:'Monte à 2 pieds, décolle la jambe saine, descends le talon en 3 s sous la marche. Repose l\'autre pied pour remonter. 15 fois.',
          tempo:['Monte à 2 jambes','Descends à 1 jambe 3 s'],
          what:'« Excentrique » = la phase de descente, où le muscle s\'allonge en résistant. Tu montes avec les deux jambes (facile) puis tu descends lentement sur UNE jambe. C\'est l\'exercice clé du protocole Alfredson.',
          how:['Sur le bord de la marche, monte sur la pointe des 2 pieds','Décolle la jambe saine, garde seulement la jambe douloureuse','Descends le talon lentement (3 s) sous le niveau de la marche','Repose l\'autre pied pour remonter. 3 × 15'],
          video:'https://www.youtube.com/watch?v=isVPZTr5iXk', videoLabel:'Vidéo : eccentric heel drop' }
      ]},
    { short:'Phase 3 · Charge lourde', label:'Charge lourde', weeks:'S7–12',
      goal:'Charge lourde 1 jambe. Reconstruction du tendon en salle.',
      ex:[
        { name:'Montées lestées 1 jambe (barre / Smith / presse)', meta:'4 × 8 · 3×/sem', sets:4, reps:8, rest:120,
          setup:'Charge sur les épaules (barre / Smith) ou presse. Une jambe, avant-pied sur un support surélevé.',
          cue:'Monte en 3 s, descends en 3 s sous le niveau du support. 8 répétitions — la dernière doit être difficile.',
          tempo:['Montée 3 s','Descente 3 s'],
          what:'Même mouvement qu\'en phase 2, mais chargé lourd : la 8e répétition doit être difficile. À terme, on vise à approcher 1,5× ton poids de corps. La charge se monte par petits paliers de 2–3 kg.',
          how:['Charge sur les épaules (barre/Smith) ou machine à mollets','Sur une jambe, avant-pied sur un support surélevé','Monte 3 s, descends 3 s sous le niveau','4 séries de 8, jamais 2 jours lourds de suite'],
          video:'https://www.youtube.com/watch?v=QckEvvWuVUY', videoLabel:'Vidéo : heavy calf loading' },
        { name:'Mollet assis (soléaire)', meta:'3 × 12 · complément', sets:3, reps:12, rest:90,
          setup:'Assis, avant-pieds sur un support, poids posé sur les genoux. Genou à ~90°.',
          cue:'Monte les talons en 3 s, redescends en 3 s. 12 répétitions, genou toujours plié.',
          tempo:['Montée 3 s','Descente 3 s'],
          what:'Genou plié = on cible le soléaire, le muscle profond qui encaisse le plus lors de la course. Souvent négligé, il est essentiel pour un coureur.',
          how:['Assis, avant-pieds sur un support, poids sur les genoux','Genou à ~90°','Monte les talons 3 s, descends 3 s','3 séries de 12'],
          video:'https://e3rehab.com/achilles-tendinopathy/', videoLabel:'Guide : seated calf raise (E3 Rehab)' }
      ]},
    { short:'Phase 4 · Rebond & course', label:'Rebond & course', weeks:'S13+',
      goal:'Réintroduire le rebond (course) progressivement. La descente en dernier.',
      ex:[
        { name:'Sauts sur place 2 jambes', meta:'3 × 20 · démarrage pliométrie', sets:3, reps:20, rest:60,
          setup:'Debout, mains sur les hanches, les 2 pieds au sol.',
          cue:'20 petits sauts sur place, temps de contact au sol le plus court possible. Rebondis, ne t\'écrase pas.',
          tempo:['Contact sol minimal'],
          what:'La pliométrie réhabitue le tendon à stocker et restituer l\'énergie, comme à la course. On commence doux : petits sauts, temps de contact au sol le plus court possible.',
          how:['Debout, mains sur les hanches','Petits sauts sur place, 2 pieds','Passe le moins de temps possible au sol','3 × 20, progresse vers 1 jambe quand indolore'],
          video:'https://www.youtube.com/watch?v=QckEvvWuVUY', videoLabel:'Vidéo : plyometric progression' },
        { name:'Reprise course progressive', meta:'+10 %/sem max · hors séance guidée',
          tempo:['Plat → vallonné → dénivelé'],
          what:'Reprise par paliers : footing à plat, puis vallonné, puis dénivelé montant. La DESCENTE est réintroduite en tout dernier — c\'est la sollicitation la plus dure pour l\'Achille.',
          how:['Commence par alternance marche/course à plat','Augmente le volume de 10 % par semaine maximum','Ajoute le dénivelé montant avant le descendant','Règle des 24 h : douleur matinale en hausse = tu stabilises'],
          video:'https://e3rehab.com/achilles-tendinopathy/', videoLabel:'Guide : return to running (E3 Rehab)' }
      ]}
  ];

  state = {
    tab: 'today',
    data: null,
    openEx: -1,
    openAppt: -1,
    apptTitle: '',
    ses: null,
    toast: ''
  };

  freshData() {
    return {
      start: this.todayStr(), phase: 0, days: {},
      appts: [
        { id: 1, title: 'Médecin du sport — bilan initial', date: '', note: '', done: false },
        { id: 2, title: 'Échographie des tendons', date: '', note: '', done: false },
        { id: 3, title: 'Podologue — semelles', date: '', note: '', done: false },
        { id: 4, title: 'Contrôle médecin à 6 semaines', date: '', note: '', done: false },
        { id: 5, title: 'Kiné — accompagnement', date: '', note: '', done: false }
      ]
    };
  }

  componentDidMount() {
    let d = null;
    try { d = JSON.parse(localStorage.getItem(this.KEY)); } catch (e) {}
    if (!d || !d.start) d = this.freshData();
    if (!d.appts) d.appts = [];
    if (!d.days) d.days = {};
    this.setState({ data: d });
    this.timer = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() { clearInterval(this.timer); }

  todayStr() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  daysBetween(a, b) { return Math.round((new Date(b) - new Date(a)) / 86400000); }
  lastNDates(n) {
    const out = [];
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      out.push(d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'));
    }
    return out;
  }
  fmtShort(iso) {
    if (!iso) return '';
    try { return new Date(iso + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' }); } catch (e) { return iso; }
  }

  save(data) { this.setState({ data }); try { localStorage.setItem(this.KEY, JSON.stringify(data)); } catch (e) {} }
  patchDay(patch) {
    const d = this.state.data, t = this.todayStr();
    const days = { ...d.days, [t]: { ...(d.days[t] || {}), ...patch } };
    this.save({ ...d, days });
  }
  showToast(m) {
    this.setState({ toast: m });
    clearTimeout(this.toastT);
    this.toastT = setTimeout(() => this.setState({ toast: '' }), 1800);
  }

  // ---- session ----
  guidedEx() { return this.PH[this.state.data.phase].ex.map((e, i) => ({ ...e, idx: i })).filter(e => e.sets); }
  restFor(ex) { return Number(this.props.restSeconds ?? ex.rest ?? 60); }
  startSession = () => {
    const list = this.guidedEx();
    if (!list.length) return;
    this.setState({ ses: { li: 0, set: 1, mode: 'ready', t: 5, paused: false } });
  };
  sesEx() { const s = this.state.ses; return s ? this.guidedEx()[s.li] : null; }
  tick() {
    const s = this.state.ses;
    if (!s || s.paused || s.mode === 'reps' || s.mode === 'done') return;
    if (s.t > 1) { this.setState({ ses: { ...s, t: s.t - 1 } }); return; }
    this.advance();
  }
  advance() {
    const s = this.state.ses; if (!s) return;
    const list = this.guidedEx(); const ex = list[s.li];
    if (s.mode === 'ready') {
      this.setState({ ses: { ...s, mode: ex.hold ? 'hold' : 'reps', t: ex.hold || 0 } });
      return;
    }
    if (s.mode === 'hold' || s.mode === 'reps') {
      if (s.set < ex.sets) { this.setState({ ses: { ...s, mode: 'rest', t: this.restFor(ex) } }); return; }
      this.markDone(ex.idx, true);
      if (s.li < list.length - 1) { this.setState({ ses: { li: s.li + 1, set: 1, mode: 'ready', t: 5, paused: false } }); return; }
      this.setState({ ses: { ...s, mode: 'done' } });
      return;
    }
    if (s.mode === 'rest') {
      this.setState({ ses: { ...s, set: s.set + 1, mode: ex.hold ? 'hold' : 'reps', t: ex.hold || 0 } });
    }
  }
  markDone(idx, val) {
    const d = this.state.data, t = this.todayStr();
    const day = d.days[t] || {};
    const done = { ...(day.done || {}), [idx]: val };
    const days = { ...d.days, [t]: { ...day, done, phase: d.phase } };
    this.save({ ...d, days });
  }

  // ---- import/export ----
  exportData = () => {
    const blob = new Blob([JSON.stringify(this.state.data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'sauvegarde-tendons-' + this.todayStr() + '.json'; a.click();
    URL.revokeObjectURL(url);
    this.showToast('Sauvegarde exportée');
  };
  importClick = () => { if (this.importRef.current) this.importRef.current.click(); };
  importData = (e) => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const d = JSON.parse(r.result);
        if (!d.start) throw new Error('bad');
        if (!d.appts) d.appts = [];
        if (!d.days) d.days = {};
        this.save(d);
        this.showToast('Données importées ✓');
      } catch (err) { this.showToast('Fichier invalide'); }
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
    const guided = phase.ex.map((e, i) => ({ ...e, idx: i })).filter(e => e.sets);

    // stats
    const dayNum = this.daysBetween(d.start, t) + 1;
    const dates14 = this.lastNDates(14);
    const anyDone = (dt) => { const dd = d.days[dt]; return !!(dd && dd.done && Object.values(dd.done).some(Boolean)); };
    const doneCount14 = dates14.filter(anyDone).length;
    const regularity = Math.round(doneCount14 / Math.min(14, dayNum) * 100) || 0;
    const sessionsTotal = Object.keys(d.days).filter(anyDone).length;
    const pmToday = typeof day.pm === 'number' ? day.pm : null;

    const last7 = this.lastNDates(7).map(dt => d.days[dt]).filter(x => x && typeof x.pm === 'number');
    const avg7 = last7.length ? (last7.reduce((s, x) => s + x.pm, 0) / last7.length).toFixed(1) : '–';
    const prev7 = this.lastNDates(14).slice(0, 7).map(dt => d.days[dt]).filter(x => x && typeof x.pm === 'number');
    let trendLabel = '';
    if (last7.length >= 2 && prev7.length >= 2) {
      const a = last7.reduce((s, x) => s + x.pm, 0) / last7.length;
      const b = prev7.reduce((s, x) => s + x.pm, 0) / prev7.length;
      if (b > 0) { const pct = Math.round((a - b) / b * 100); trendLabel = (pct <= 0 ? '↘ ' : '↗ +') + pct + '%'; }
    }

    // sparkline (14d)
    const sparkPts = [];
    dates14.forEach((dt, i) => {
      const dd = d.days[dt];
      if (dd && typeof dd.pm === 'number') sparkPts.push([(i / 13) * 120, 24 - (dd.pm / 10) * 20]);
    });
    const hasSpark = sparkPts.length >= 2;

    // week bars
    const weekBars = this.lastNDates(7).map(dt => ({ bg: anyDone(dt) ? '#43e08a' : '#2a2f2b' }));

    // today's exercises
    const exToday = guided.map(ex => {
      const isDone = !!doneMap[ex.idx];
      return {
        name: ex.name, meta: ex.meta,
        iconTxt: isDone ? '✓' : String(ex.idx + 1),
        iconBg: isDone ? 'rgba(67,224,138,.12)' : '#232823',
        iconColor: isDone ? '#43e08a' : 'rgba(238,240,234,.5)',
        nameColor: isDone ? 'rgba(238,240,234,.5)' : '#eef0ea',
        nameDeco: isDone ? 'line-through' : 'none',
        toggle: () => this.markDone(ex.idx, !isDone)
      };
    });
    const allDone = guided.length > 0 && guided.every(ex => doneMap[ex.idx]);
    const totalSec = guided.reduce((s, ex) => s + ex.sets * (ex.hold || (ex.reps * 6)) + (ex.sets - 1) * this.restFor(ex), 0);
    const sesMeta = guided.length + ' exercice' + (guided.length > 1 ? 's' : '') + ' · ~' + Math.max(1, Math.round(totalSec / 60)) + ' min';

    // next appt
    const upcoming = (d.appts || []).filter(a => !a.done && a.date && a.date >= t).sort((a, b) => a.date.localeCompare(b.date));
    const nx = upcoming[0];
    let nxMon = '', nxDay = '', nxTitle = '', nxSub = '';
    if (nx) {
      const dd = new Date(nx.date + 'T12:00:00');
      nxMon = dd.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '');
      nxDay = String(dd.getDate());
      nxTitle = nx.title;
      const inD = this.daysBetween(t, nx.date);
      nxSub = this.fmtShort(nx.date) + (inD === 0 ? " · aujourd'hui" : inD === 1 ? ' · demain' : ' · dans ' + inD + ' jours');
    }

    // hero line
    const heroes = [['Régularité,', 'tendon solide.'], ['Charge lente,', 'tendon solide.'], ['Du lourd,', 'en contrôle.'], ['Du rebond,', 'en douceur.']];
    const hero = d.phase === 0 ? heroes[0] : d.phase === 1 ? heroes[1] : d.phase === 2 ? heroes[2] : heroes[3];

    // programme
    const phasePills = this.PH.map((p, i) => {
      const active = i === d.phase;
      return {
        num: String(i + 1), label: p.label + ' · ' + p.weeks,
        bg: active ? 'rgba(67,224,138,.12)' : '#181c19',
        border: active ? 'rgba(67,224,138,.4)' : '#232823',
        color: active ? '#eef0ea' : 'rgba(238,240,234,.6)',
        numColor: active ? '#43e08a' : 'rgba(238,240,234,.4)',
        pick: () => { this.save({ ...d, phase: i }); this.setState({ openEx: -1 }); }
      };
    });
    const exCards = phase.ex.map((ex, i) => ({
      num: String(i + 1), name: ex.name, meta: ex.meta, tempo: ex.tempo, what: ex.what, how: ex.how,
      video: ex.video, videoLabel: ex.videoLabel,
      isOpen: S.openEx === i, chev: S.openEx === i ? 'rotate(180deg)' : 'rotate(0deg)',
      toggleOpen: () => this.setState({ openEx: S.openEx === i ? -1 : i })
    }));

    // suivi chart
    const N = Number(this.props.chartDays ?? 14);
    const datesN = this.lastNDates(N);
    const chartPts = [];
    datesN.forEach((dt, i) => {
      const dd = d.days[dt];
      if (dd && typeof dd.pm === 'number') chartPts.push([(i / (N - 1)) * 300, 106 - (dd.pm / 10) * 98]);
    });
    const hasChart = chartPts.length >= 2;
    const chartBars = datesN.map(dt => ({ bg: anyDone(dt) ? '#43e08a' : '#232823' }));

    const history = Object.keys(d.days).sort().reverse().slice(0, 14).map(dt => {
      const dd = d.days[dt];
      const ses = anyDone(dt);
      return {
        dateLabel: this.fmtShort(dt), pm: typeof dd.pm === 'number' ? String(dd.pm) : '–',
        pe: typeof dd.pe === 'number' ? String(dd.pe) : '–',
        note: dd.note || '', hasNote: !!dd.note,
        sesTxt: ses ? 'séance ✓' : '—', sesColor: ses ? '#43e08a' : 'rgba(238,240,234,.3)'
      };
    });

    // médical
    const sorted = [...(d.appts || [])].sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1;
      if (!!a.date !== !!b.date) return a.date ? -1 : 1;
      return (a.date || '').localeCompare(b.date || '');
    });
    const appts = sorted.map(ap => {
      const open = S.openAppt === ap.id;
      let mon = '—', dayN = '';
      if (ap.date) { const dd = new Date(ap.date + 'T12:00:00'); mon = dd.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', ''); dayN = String(dd.getDate()); }
      const upd = (patch) => {
        const appts2 = d.appts.map(x => x.id === ap.id ? { ...x, ...patch } : x);
        this.save({ ...d, appts: appts2 });
      };
      return {
        title: ap.title, date: ap.date, note: ap.note,
        mon, day: dayN || '·', monColor: ap.date ? '#43e08a' : 'rgba(238,240,234,.3)',
        sub: ap.done ? 'fait ✓' : (ap.date ? this.fmtShort(ap.date) : 'pas encore planifié'),
        subColor: ap.done ? '#43e08a' : (ap.date ? 'rgba(238,240,234,.55)' : 'rgba(238,240,234,.35)'),
        deco: ap.done ? 'line-through' : 'none',
        opacity: ap.done ? '0.55' : '1',
        isOpen: open, chev: open ? 'rotate(180deg)' : 'rotate(0deg)',
        toggleOpen: () => this.setState({ openAppt: open ? -1 : ap.id }),
        setDate: (e) => upd({ date: e.target.value }),
        setNote: (e) => upd({ note: e.target.value }),
        toggleDone: () => upd({ done: !ap.done }),
        doneTxt: ap.done ? 'Marquer à refaire' : 'Marquer comme fait ✓',
        doneBg: ap.done ? '#232823' : 'rgba(67,224,138,.12)',
        doneColor: ap.done ? 'rgba(238,240,234,.6)' : '#43e08a',
        del: () => { this.save({ ...d, appts: d.appts.filter(x => x.id !== ap.id) }); }
      };
    });

    // nav
    const nav = [
      { key: 'today', label: "Aujourd'hui", d: 'M12 3l8 6v11H4V9z' },
      { key: 'prog', label: 'Programme', d: 'M3 9v6M7 9v6M17 9v6M21 9v6M7 12h10' },
      { key: 'suivi', label: 'Suivi', d: 'M3 17l6-6 4 4 8-8' },
      { key: 'med', label: 'Médical', d: 'M12 5v14M5 12h14' }
    ].map(n => ({
      ...n,
      color: S.tab === n.key ? '#43e08a' : 'rgba(238,240,234,.4)',
      weight: S.tab === n.key ? '700' : '500',
      go: () => this.setState({ tab: n.key })
    }));

    // session vals
    const ses = S.ses;
    const sexo = ses ? guided[ses.li] : null;
    let sesVals = {
      sesActive: !!ses, sesRunning: !!ses && ses.mode !== 'done', sesFinished: !!ses && ses.mode === 'done',
      sesHeader: '', sesExName: '', sesSetLabel: '', sesModeLabel: '', sesBig: '', sesUnit: '',
      sesDash: '540 540', sesRingColor: '#43e08a', sesHint: '', sesCue: '',
      sesShowDone: false, sesShowSkip: false, sesShowPause: false, sesPauseTxt: 'Pause'
    };
    if (ses && sexo) {
      const circ = 540;
      sesVals.sesHeader = 'Exercice ' + (ses.li + 1) + ' / ' + guided.length;
      sesVals.sesExName = sexo.name;
      sesVals.sesSetLabel = 'Série ' + ses.set + ' / ' + sexo.sets;
      const fmt = (s) => s >= 60 ? Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0') : String(s);
      if (ses.mode === 'ready') {
        sesVals.sesModeLabel = 'Prépare-toi'; sesVals.sesBig = String(ses.t); sesVals.sesUnit = 'mise en place';
        sesVals.sesRingColor = 'rgba(238,240,234,.5)';
        sesVals.sesDash = (ses.t / 5 * circ) + ' ' + circ;
        sesVals.sesCue = sexo.setup || '';
        sesVals.sesHint = (sexo.tempo || []).join(' · ');
      } else if (ses.mode === 'hold') {
        sesVals.sesModeLabel = 'Tiens !'; sesVals.sesBig = fmt(ses.t); sesVals.sesUnit = 'secondes';
        sesVals.sesDash = (ses.t / sexo.hold * circ) + ' ' + circ;
        sesVals.sesCue = sexo.cue || '';
        sesVals.sesHint = 'Douleur ≤ 5/10 tolérée pendant l\'effort.';
        sesVals.sesShowPause = true; sesVals.sesPauseTxt = ses.paused ? 'Reprendre ▶' : 'Pause';
      } else if (ses.mode === 'reps') {
        sesVals.sesModeLabel = 'À toi'; sesVals.sesBig = String(sexo.reps); sesVals.sesUnit = 'répétitions';
        sesVals.sesDash = circ + ' ' + circ;
        sesVals.sesCue = sexo.cue || '';
        sesVals.sesHint = 'Prends ton temps, c\'est la lenteur qui soigne.';
        sesVals.sesShowDone = true;
      } else if (ses.mode === 'rest') {
        sesVals.sesModeLabel = 'Repos'; sesVals.sesBig = fmt(ses.t); sesVals.sesUnit = 'récupération';
        sesVals.sesRingColor = '#f5b942';
        sesVals.sesDash = (ses.t / this.restFor(sexo) * circ) + ' ' + circ;
        sesVals.sesCue = 'Respire, relâche le mollet. Prochaine : série ' + (ses.set + 1) + ' / ' + sexo.sets + '.';
        sesVals.sesHint = '';
        sesVals.sesShowSkip = true;
      }
    }

    return {
      // nav / tabs
      nav,
      isToday: S.tab === 'today' && !ses, isProg: S.tab === 'prog' && !ses,
      isSuivi: S.tab === 'suivi' && !ses, isMed: S.tab === 'med' && !ses,

      // today
      dayNum: String(dayNum), phaseShort: phase.short, regularity: String(regularity),
      heroLine1: hero[0], heroLine2: hero[1],
      pmBig: pmToday === null ? '–' : String(pmToday), trendLabel,
      hasSpark, noSpark: !hasSpark,
      sparkPoints: sparkPts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' '),
      sessionsTotal: String(sessionsTotal), weekBars,
      pmVal: pmToday === null ? 0 : pmToday, peVal: typeof day.pe === 'number' ? day.pe : 0,
      noteVal: day.note || '',
      setPm: (e) => this.patchDay({ pm: +e.target.value }),
      setPe: (e) => this.patchDay({ pe: +e.target.value }),
      setNote: (e) => this.patchDay({ note: e.target.value }),
      painWarn: pmToday !== null && pmToday > 5,
      exToday, allDone, notAllDone: !allDone, sesMeta,
      startSession: this.startSession,
      hasNextAppt: !!nx, noNextAppt: !nx, nxMon, nxDay, nxTitle, nxSub,
      goMedFromAppt: () => this.setState({ tab: 'med' }),

      // programme
      phasePills, phaseGoal: phase.goal, exCards,

      // suivi
      avg7, chartRangeLabel: N + ' derniers jours', hasChart, noChart: !hasChart,
      chartPoints: chartPts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' '),
      chartBars, history, hasHistory: history.length > 0, noHistory: history.length === 0,
      exportData: this.exportData, importClick: this.importClick, importData: this.importData,
      importRef: this.importRef,

      // médical
      appts, apptTitle: S.apptTitle,
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
        const s = S.ses; if (!s) return;
        if (s.li < guided.length - 1) this.setState({ ses: { li: s.li + 1, set: 1, mode: 'ready', t: 5, paused: false } });
        else this.setState({ ses: { ...s, mode: 'done' } });
      },
      sesSetDone: () => this.advance(),
      sesSkip: () => this.advance(),
      sesPauseToggle: () => this.setState({ ses: { ...S.ses, paused: !S.ses.paused } }),

      // toast
      hasToast: !!S.toast, toast: S.toast
    };
  }
}
