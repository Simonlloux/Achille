export function render(v) {
  return (
    <>
      <div style={{ maxWidth: '420px', margin: '0 auto', minHeight: '100dvh', background: '#0f1210', color: '#eef0ea', fontFamily: "'Space Grotesk',sans-serif", position: 'relative', paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'calc(env(safe-area-inset-bottom) + 96px)' }}>

        {/* ================= AUJOURD'HUI ================= */}
        {v.isToday && (
          <div data-screen-label="Aujourd'hui">
            <div style={{ padding: '16px 20px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#43e08a' }}>Jour {v.dayNum} · {v.phaseShort}</div>
                  <div style={{ fontSize: '23px', fontWeight: 700, letterSpacing: '-0.3px', marginTop: '4px', lineHeight: 1.2 }}>{v.heroLine1}<br/>{v.heroLine2}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}><div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '32px', fontWeight: 700, color: '#43e08a', lineHeight: 1 }}>{v.regularity}<span style={{ fontSize: '16px' }}>%</span></div><div style={{ fontSize: '10px', color: 'rgba(238,240,234,.45)', marginTop: '2px' }}>régularité 14 j</div></div>
              </div>
            </div>

            <div style={{ padding: '18px 16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>

              {/* metric band */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1, background: '#181c19', border: '1px solid #232823', borderRadius: '16px', padding: '14px' }}>
                  <div style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(238,240,234,.5)' }}>Douleur matin</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '4px' }}>
                    <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '44px', fontWeight: 700, lineHeight: 1 }}>{v.pmBig}</span>
                    <span style={{ fontSize: '13px', color: '#43e08a', fontWeight: 600 }}>{v.trendLabel}</span>
                  </div>
                  {v.hasSpark && (
                    <svg width="100%" height="26" viewBox="0 0 120 26" preserveAspectRatio="none" style={{ marginTop: '4px' }}><polyline points={v.sparkPoints} fill="none" stroke="#43e08a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></polyline></svg>
                  )}
                  {v.noSpark && (
                    <div style={{ fontSize: '11px', color: 'rgba(238,240,234,.35)', marginTop: '8px' }}>tendance visible après quelques jours</div>
                  )}
                </div>
                <div style={{ flex: 1, background: '#181c19', border: '1px solid #232823', borderRadius: '16px', padding: '14px' }}>
                  <div style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(238,240,234,.5)' }}>Séances</div>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '44px', fontWeight: 700, lineHeight: 1, marginTop: '4px' }}>{v.sessionsTotal}</div>
                  <div style={{ display: 'flex', gap: '3px', marginTop: '10px' }}>
                    {v.weekBars.map((b, i) => (
                      <div key={i} style={{ flex: 1, height: '14px', borderRadius: '3px', background: b.bg }}></div>
                    ))}
                  </div>
                  <div style={{ fontSize: '10px', color: 'rgba(238,240,234,.4)', marginTop: '4px' }}>7 derniers jours</div>
                </div>
              </div>

              {/* check-in */}
              <div style={{ background: '#181c19', border: '1px solid #232823', borderRadius: '16px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontSize: '15px', fontWeight: 600 }}>Check-in du jour</div>
                  <div style={{ fontSize: '11px', color: 'rgba(238,240,234,.4)' }}>sauvegarde auto</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '12px' }}>
                  <div style={{ fontSize: '13px', color: 'rgba(238,240,234,.6)' }}>Douleur au réveil</div>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '24px', fontWeight: 700, color: '#43e08a' }}>{v.pmVal}</div>
                </div>
                <input type="range" min="0" max="10" step="1" value={v.pmVal} onChange={v.setPm}/>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'rgba(238,240,234,.35)', marginTop: '4px' }}><span style={{ color: '#43e08a' }}>0–3 · vert</span><span style={{ color: '#f5b942' }}>4–5 · orange</span><span style={{ color: '#e0654a' }}>&gt;5 · rouge</span></div>
                {v.pmAmber && (
                  <div style={{ marginTop: '12px', padding: '10px 12px', background: 'rgba(245,185,66,.12)', color: '#f5b942', borderRadius: '10px', fontSize: '13px', lineHeight: 1.45 }}>🟠 Raideur matinale 4–5 : ne monte pas la charge aujourd'hui, réduis-la légèrement.</div>
                )}
                {v.pmRed && (
                  <div style={{ marginTop: '12px', padding: '10px 12px', background: 'rgba(224,101,74,.12)', color: '#e0654a', borderRadius: '10px', fontSize: '13px', lineHeight: 1.45 }}>🔴 Raideur matinale &gt; 5 : la charge d'hier était trop forte. Recule d'un cran (variante précédente) pendant quelques jours.</div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '14px' }}>
                  <div style={{ fontSize: '13px', color: 'rgba(238,240,234,.6)' }}>Douleur pendant l'exercice</div>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '24px', fontWeight: 700, color: '#43e08a' }}>{v.peVal}</div>
                </div>
                <input type="range" min="0" max="10" step="1" value={v.peVal} onChange={v.setPe}/>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'rgba(238,240,234,.35)', marginTop: '4px' }}><span style={{ color: '#43e08a' }}>0–3 · zone de travail</span><span style={{ color: '#f5b942' }}>4–5 · ponctuel</span><span style={{ color: '#e0654a' }}>&gt;5</span></div>
                {v.peAmber && (
                  <div style={{ marginTop: '12px', padding: '10px 12px', background: 'rgba(245,185,66,.12)', color: '#f5b942', borderRadius: '10px', fontSize: '13px', lineHeight: 1.45 }}>🟠 4–5 pendant l'effort : tolérable ponctuellement si retour à la normale sous 24 h. Réduis légèrement la charge à la prochaine séance.</div>
                )}
                {v.peRed && (
                  <div style={{ marginTop: '12px', padding: '10px 12px', background: 'rgba(224,101,74,.12)', color: '#e0654a', borderRadius: '10px', fontSize: '13px', lineHeight: 1.45 }}>🔴 &gt; 5 pendant l'effort : trop. Reviens à la variante précédente (moins de charge, 2 pieds, amplitude réduite) quelques jours.</div>
                )}
                <input type="text" value={v.noteVal} onChange={v.setNote} placeholder="Note — sensations, sommeil, activité…" style={{ width: '100%', boxSizing: 'border-box', height: '42px', padding: '0 12px', fontSize: '14px', border: '1px solid #232823', borderRadius: '10px', background: '#0f1210', color: '#eef0ea', fontFamily: "'Space Grotesk',sans-serif", marginTop: '14px' }}/>
              </div>

              {/* séance du jour */}
              <div style={{ background: '#181c19', border: '1px solid #232823', borderRadius: '16px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontSize: '15px', fontWeight: 600 }}>Séance du jour</div>
                  <div style={{ fontSize: '12px', color: 'rgba(238,240,234,.5)' }}>{v.sesMeta}</div>
                </div>
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: v.isRestDay ? 'rgba(238,240,234,.45)' : '#43e08a', marginTop: '3px' }}>{v.dayPlanTitle}</div>

                {v.isRestDay ? (
                  <div style={{ textAlign: 'center', padding: '20px 10px 8px' }}>
                    <div style={{ fontSize: '30px' }}>🌙</div>
                    <div style={{ fontSize: '15px', fontWeight: 700, marginTop: '6px' }}>Jour de repos</div>
                    <div style={{ fontSize: '13px', color: 'rgba(238,240,234,.55)', lineHeight: 1.5, marginTop: '6px' }}>{v.restNote}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(238,240,234,.35)', marginTop: '10px' }}>La récupération fait partie du programme : le tendon se reconstruit aujourd'hui.</div>
                  </div>
                ) : (
                  <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                      {v.exToday.map((ex, i) => (
                        <div key={i} onClick={ex.toggle} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', minHeight: '44px' }}>
                          <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: ex.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ex.iconColor, fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>{ex.iconTxt}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '14px', fontWeight: 500, color: ex.nameColor, textDecoration: ex.nameDeco }}>{ex.name}</div>
                            <div style={{ fontSize: '11px', color: 'rgba(238,240,234,.4)' }}>{ex.meta}</div>
                          </div>
                          {ex.isStrength && (
                            <span style={{ flexShrink: 0, fontSize: '10px', fontWeight: 600, color: '#8ab0ff', background: 'rgba(120,160,255,.12)', padding: '3px 8px', borderRadius: '20px' }}>Renfo</span>
                          )}
                        </div>
                      ))}
                      {v.hasCardio && (
                        <div onClick={v.toggleCardio} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', minHeight: '44px' }}>
                          <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: v.cardioDone ? 'rgba(67,224,138,.12)' : 'rgba(61,90,102,.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: v.cardioDone ? '#43e08a' : '#7fa3b0', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>{v.cardioDone ? '✓' : '🚶'}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '14px', fontWeight: 500, color: v.cardioDone ? 'rgba(238,240,234,.5)' : '#eef0ea', textDecoration: v.cardioDone ? 'line-through' : 'none' }}>Cardio</div>
                            <div style={{ fontSize: '11px', color: 'rgba(238,240,234,.4)' }}>{v.cardioLabel}</div>
                          </div>
                          <span style={{ flexShrink: 0, fontSize: '10px', fontWeight: 600, color: '#7fa3b0', background: 'rgba(61,90,102,.25)', padding: '3px 8px', borderRadius: '20px' }}>Cardio</span>
                        </div>
                      )}
                    </div>
                    {v.allDone && (
                      <>
                        <div style={{ marginTop: '14px', background: 'rgba(67,224,138,.12)', borderRadius: '12px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 700, color: '#43e08a' }}>Séance validée — bien joué</div>
                        <div style={{ marginTop: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <div style={{ fontSize: '13px', color: 'rgba(238,240,234,.6)' }}>Douleur pendant la séance</div>
                            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '24px', fontWeight: 700, color: '#43e08a' }}>{v.peVal}</div>
                          </div>
                          <input type="range" min="0" max="10" step="1" value={v.peVal} onChange={v.setPe}/>
                        </div>
                      </>
                    )}
                    {v.hasGuided && v.notAllDone && (
                      <div onClick={v.startSession} style={{ marginTop: '14px', background: '#43e08a', borderRadius: '12px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '15px', fontWeight: 700, color: '#0f1210', cursor: 'pointer' }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="#0f1210"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
                        Séance guidée avec timer
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* prochain RDV */}
              {v.hasNextAppt && (
                <div onClick={v.goMedFromAppt} style={{ background: '#181c19', border: '1px solid #232823', borderRadius: '16px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#232823', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', lineHeight: 1, flexShrink: 0 }}>
                    <span style={{ fontSize: '9px', color: '#43e08a', fontWeight: 700, textTransform: 'uppercase' }}>{v.nxMon}</span>
                    <span style={{ fontSize: '16px', fontWeight: 700, marginTop: '2px' }}>{v.nxDay}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>{v.nxTitle}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(238,240,234,.45)' }}>{v.nxSub}</div>
                  </div>
                  <span style={{ color: 'rgba(238,240,234,.35)' }}>›</span>
                </div>
              )}
              {v.noNextAppt && (
                <div onClick={v.goMedFromAppt} style={{ background: '#181c19', border: '1px dashed #2e332e', borderRadius: '16px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <div style={{ flex: 1, fontSize: '13px', color: 'rgba(238,240,234,.45)' }}>Aucun RDV planifié — ajoute une date dans l'onglet Médical</div>
                  <span style={{ color: 'rgba(238,240,234,.35)' }}>›</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= PROGRAMME ================= */}
        {v.isProg && (
          <div data-screen-label="Programme">
            <div style={{ padding: '16px 20px 0' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#43e08a' }}>Protocole</div>
              <div style={{ fontSize: '23px', fontWeight: 700, letterSpacing: '-0.3px', marginTop: '4px' }}>Programme</div>
            </div>
            <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {v.phasePills.map((p, i) => (
                  <div key={i} onClick={p.pick} style={{ minHeight: '52px', borderRadius: '12px', background: p.bg, border: '1px solid ' + p.border, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8px 12px', cursor: 'pointer', position: 'relative' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: p.numColor }}>Phase {p.num}{p.isActive ? ' ·' : ''}</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: p.color, marginTop: '2px' }}>{p.label}</div>
                    {p.isActive && (
                      <span style={{ position: 'absolute', top: '7px', right: '9px', fontSize: '8px', fontWeight: 700, letterSpacing: '.5px', textTransform: 'uppercase', color: '#43e08a' }}>Tu es ici</span>
                    )}
                  </div>
                ))}
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(238,240,234,.4)', padding: '0 4px', lineHeight: 1.4 }}>Touche une phase pour voir son contenu. Le changement de phase se fait via la progression ci-dessous.</div>
              <div style={{ fontSize: '13px', color: 'rgba(238,240,234,.55)', lineHeight: 1.5, padding: '0 4px' }}>{v.phaseGoal}</div>

              {/* Bandeau : on consulte une phase autre que la sienne */}
              {v.viewingOther && (
                <div onClick={v.backToMyPhase} style={{ background: 'rgba(238,240,234,.05)', border: '1px dashed rgba(238,240,234,.25)', borderRadius: '12px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <span style={{ fontSize: '15px' }}>👁️</span>
                  <div style={{ flex: 1, fontSize: '12.5px', color: 'rgba(238,240,234,.7)', lineHeight: 1.4 }}>Aperçu de « {v.viewPhaseLabel} ». Tu n'y es pas encore — <strong>touche ici</strong> pour revenir à ta phase.</div>
                </div>
              )}

              {/* ===== Progression vers la phase suivante (NOUVEAU) ===== */}
              {!v.viewingOther && (
              <div style={{ background: v.prog.ready ? 'rgba(67,224,138,.1)' : '#181c19', border: '1px solid ' + (v.prog.ready ? 'rgba(67,224,138,.45)' : '#232823'), borderRadius: '16px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={v.prog.ready ? '#43e08a' : 'rgba(238,240,234,.5)'} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 8-8"></path></svg>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: v.prog.ready ? '#43e08a' : 'rgba(238,240,234,.5)' }}>Progression</div>
                  {v.prog.hasNext && (
                    <div style={{ marginLeft: 'auto', fontSize: '11px', color: 'rgba(238,240,234,.4)' }}>Jour {v.prog.daysInPhase} dans cette phase</div>
                  )}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(238,240,234,.9)', lineHeight: 1.45, marginBottom: v.prog.criteria.length ? '12px' : '0' }}>{v.prog.summary}</div>

                {v.prog.criteria.map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 0', borderTop: i === 0 ? '1px solid #232823' : 'none' }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0, background: c.ok ? 'rgba(67,224,138,.15)' : 'rgba(238,240,234,.07)', color: c.ok ? '#43e08a' : 'rgba(238,240,234,.35)', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.ok ? '✓' : '·'}</div>
                    <div style={{ flex: 1, fontSize: '13px', color: c.ok ? 'rgba(238,240,234,.75)' : 'rgba(238,240,234,.6)' }}>{c.label}</div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: c.ok ? '#43e08a' : 'rgba(238,240,234,.5)' }}>{c.current}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(238,240,234,.35)', minWidth: '52px', textAlign: 'right' }}>{c.remaining || c.target}</div>
                  </div>
                ))}

                {v.prog.ready && (
                  <button onClick={v.advancePhase} style={{ width: '100%', marginTop: '12px', background: '#43e08a', color: '#0f1210', border: 'none', borderRadius: '12px', padding: '13px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Passer à « {v.prog.nextLabel} » →</button>
                )}

                {/* Recul suggéré : douleur trop haute (règle 🔴) */}
                {v.suggestBack && (
                  <div style={{ marginTop: '12px', padding: '12px 14px', background: 'rgba(224,101,74,.1)', border: '1px solid rgba(224,101,74,.35)', borderRadius: '12px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#e0654a', lineHeight: 1.45 }}>🔴 On recule d'un cran ?</div>
                    <div style={{ fontSize: '12.5px', color: 'rgba(238,240,234,.7)', lineHeight: 1.45, marginTop: '4px' }}>{v.backReason} Revenir en « {v.prevPhaseLabel} » quelques jours laisse le tendon se calmer, puis tu re-progresseras.</div>
                    <button onClick={v.goBackPhase} style={{ width: '100%', marginTop: '10px', background: '#e0654a', color: '#0f1210', border: 'none', borderRadius: '10px', padding: '11px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>← Revenir en « {v.prevPhaseLabel} »</button>
                  </div>
                )}

                {/* Recul manuel discret (toujours dispo si pas déjà en phase 1) */}
                {v.canGoBack && !v.suggestBack && (
                  <button onClick={v.goBackPhase} style={{ width: '100%', marginTop: '10px', background: 'transparent', color: 'rgba(238,240,234,.45)', border: '1px solid #232823', borderRadius: '10px', padding: '9px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>← Revenir en « {v.prevPhaseLabel} » (si trop dur)</button>
                )}
              </div>
              )}

              {/* ===== Semaine type de la phase ===== */}
              <div style={{ background: '#181c19', border: '1px solid #232823', borderRadius: '16px', padding: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#43e08a', marginBottom: '10px' }}>Semaine type{v.viewingOther ? ' (aperçu)' : ''}</div>
                {v.weekPlan.map((w, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '5px 8px', borderRadius: '8px', background: w.isToday ? 'rgba(67,224,138,.08)' : 'transparent', border: w.isToday ? '1px solid rgba(67,224,138,.25)' : '1px solid transparent' }}>
                    <div style={{ width: '32px', fontFamily: "'Barlow Condensed',sans-serif", fontSize: '13px', fontWeight: 700, color: w.isToday ? '#43e08a' : w.isRest ? 'rgba(238,240,234,.3)' : 'rgba(238,240,234,.6)', textTransform: 'uppercase' }}>{w.d}</div>
                    <div style={{ flex: 1, fontSize: '13px', color: w.isRest ? 'rgba(238,240,234,.35)' : 'rgba(238,240,234,.8)' }}>{w.title}</div>
                    {w.isToday && <span style={{ fontSize: '10px', fontWeight: 700, color: '#43e08a' }}>AUJOURD'HUI</span>}
                  </div>
                ))}
              </div>

              {v.exCards.map((ex, i) => (
                <div key={i} style={{ background: '#181c19', border: '1px solid #232823', borderRadius: '16px', overflow: 'hidden' }}>
                  <div onClick={ex.toggleOpen} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', cursor: 'pointer', minHeight: '44px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(67,224,138,.12)', color: '#43e08a', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{ex.num}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600 }}>{ex.name}</div>
                      <div style={{ fontSize: '11px', color: 'rgba(238,240,234,.4)' }}>{ex.meta}</div>
                    </div>
                    <span style={{ color: 'rgba(238,240,234,.35)', transform: ex.chev, display: 'inline-block', transition: 'transform .2s' }}>⌄</span>
                  </div>
                  {ex.isOpen && (
                    <div style={{ padding: '0 16px 16px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                        {ex.tempo.map((tp, j) => (
                          <span key={j} style={{ background: 'rgba(67,224,138,.12)', color: '#43e08a', fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '20px' }}>{tp}</span>
                        ))}
                      </div>
                      <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#43e08a', marginBottom: '4px' }}>C'est quoi ?</div>
                      <p style={{ margin: '0 0 12px', fontSize: '14px', lineHeight: 1.55, color: 'rgba(238,240,234,.85)' }}>{ex.what}</p>
                      <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#43e08a', marginBottom: '4px' }}>Comment faire</div>
                      <ol style={{ margin: '0 0 14px', paddingLeft: '18px', fontSize: '14px', lineHeight: 1.55, color: 'rgba(238,240,234,.85)' }}>
                        {ex.how.map((step, j) => (
                          <li key={j} style={{ marginBottom: '4px' }}>{step}</li>
                        ))}
                      </ol>
                      {ex.video && (
                        <a href={ex.video} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#232823', color: '#43e08a', textDecoration: 'none', padding: '12px', borderRadius: '10px', fontSize: '13px', fontWeight: 600 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="#43e08a"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
                          {ex.videoLabel}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}

              <div style={{ background: 'rgba(67,224,138,.07)', border: '1px solid rgba(67,224,138,.2)', borderRadius: '16px', padding: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#43e08a', marginBottom: '10px' }}>Les 4 règles d'or</div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', lineHeight: 1.7, color: 'rgba(238,240,234,.85)' }}>
                  <li style={{ marginBottom: '6px' }}><strong>La charge soigne, pas le repos.</strong> Le repos complet déconditionne le tendon — on charge intelligemment.</li>
                  <li style={{ marginBottom: '6px' }}><strong>La douleur se pilote.</strong> Jusqu'à 3/10 pendant et après = normal. C'est la réaction à 24 h qui compte.</li>
                  <li style={{ marginBottom: '6px' }}><strong>La raideur matinale est ton baromètre.</strong> En hausse le lendemain d'une séance = charge trop forte, recule d'un cran.</li>
                  <li><strong>On progresse par critères, pas par calendrier.</strong> Les semaines sont indicatives — les critères de sortie décident.</li>
                </ul>
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(67,224,138,.15)' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#43e08a', marginBottom: '8px' }}>Feu tricolore de la douleur</div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#43e08a', flexShrink: 0, marginTop: '4px' }}></span><span style={{ fontSize: '12.5px', lineHeight: 1.5, color: 'rgba(238,240,234,.8)' }}><strong>0–3</strong> · zone de travail idéale — continue, monte progressivement.</span></div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f5b942', flexShrink: 0, marginTop: '4px' }}></span><span style={{ fontSize: '12.5px', lineHeight: 1.5, color: 'rgba(238,240,234,.8)' }}><strong>4–5</strong> · tolérable ponctuellement si retour à la normale sous 24 h. Ne monte pas la charge.</span></div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#e0654a', flexShrink: 0, marginTop: '4px' }}></span><span style={{ fontSize: '12.5px', lineHeight: 1.5, color: 'rgba(238,240,234,.8)' }}><strong>&gt; 5 ou réaction &gt; 24 h</strong> · trop. Variante précédente pendant quelques jours, puis re-progresse.</span></div>
                </div>
              </div>

              {/* ===== RENFO TRAIL (NOUVEAU) ===== */}
              <div style={{ background: '#141821', border: '1px solid rgba(120,160,255,.25)', borderRadius: '16px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8ab0ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h16M7 8v8M17 8v8M4 10v4M20 10v4"></path></svg>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#8ab0ff' }}>Renforcement trail</div>
                  <button onClick={v.toggleStrength} style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: 600, color: v.strengthOn ? '#8ab0ff' : 'rgba(238,240,234,.4)', background: v.strengthOn ? 'rgba(120,160,255,.12)' : '#232823', border: 'none', borderRadius: '20px', padding: '4px 12px', cursor: 'pointer', fontFamily: 'inherit' }}>{v.strengthOn ? 'Activé' : 'Désactivé'}</button>
                </div>
                <div style={{ fontSize: '13px', color: 'rgba(238,240,234,.65)', lineHeight: 1.5, marginBottom: v.strengthOn ? '12px' : '0' }}>Se renforcer pour la montagne pendant que le tendon cicatrise. Réparti selon la semaine type : renfo bas / tronc-haut en phase 1, renfo trail complet 2×/sem ensuite.</div>

                {v.strengthOn && (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderTop: '1px solid rgba(120,160,255,.15)', borderBottom: '1px solid rgba(120,160,255,.15)' }}>
                      <button onClick={v.levelDown} style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#232823', color: '#eef0ea', border: 'none', fontSize: '18px', fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>−</button>
                      <div style={{ flex: 1, textAlign: 'center' }}>
                        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '22px', fontWeight: 700, color: '#8ab0ff' }}>{v.strengthLevelLabel}</div>
                        <div style={{ fontSize: '10px', color: 'rgba(238,240,234,.4)' }}>monte d'un niveau quand ça devient facile</div>
                      </div>
                      <button onClick={v.levelUp} disabled={!v.canLevelUp} style={{ width: '34px', height: '34px', borderRadius: '10px', background: v.canLevelUp ? 'rgba(120,160,255,.15)' : '#1a1e26', color: v.canLevelUp ? '#8ab0ff' : 'rgba(238,240,234,.25)', border: 'none', fontSize: '18px', fontWeight: 700, cursor: v.canLevelUp ? 'pointer' : 'default', flexShrink: 0 }}>+</button>
                    </div>

                    {/* Exercices renfo dépliables : explication + comment + vidéo */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                      {v.strengthCards.map((ex, i) => (
                        <div key={i} style={{ background: '#181c19', border: '1px solid #232823', borderRadius: '14px', overflow: 'hidden' }}>
                          <div onClick={ex.toggleOpen} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', cursor: 'pointer', minHeight: '44px' }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: '14px', fontWeight: 600 }}>{ex.name}</div>
                              <div style={{ fontSize: '11px', color: 'rgba(238,240,234,.4)' }}>{ex.familyLabel} · {ex.meta}</div>
                            </div>
                            <span style={{ color: 'rgba(238,240,234,.35)', transform: ex.chev, display: 'inline-block', transition: 'transform .2s' }}>⌄</span>
                          </div>
                          {ex.isOpen && (
                            <div style={{ padding: '0 14px 14px' }}>
                              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#8ab0ff', marginBottom: '4px' }}>C'est quoi ?</div>
                              <p style={{ margin: '0 0 12px', fontSize: '14px', lineHeight: 1.55, color: 'rgba(238,240,234,.85)' }}>{ex.what}</p>
                              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#8ab0ff', marginBottom: '4px' }}>Comment faire</div>
                              <ol style={{ margin: '0 0 14px', paddingLeft: '18px', fontSize: '14px', lineHeight: 1.55, color: 'rgba(238,240,234,.85)' }}>
                                {ex.how.map((step, j) => (
                                  <li key={j} style={{ marginBottom: '4px' }}>{step}</li>
                                ))}
                              </ol>
                              <a href={ex.video} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#232823', color: '#8ab0ff', textDecoration: 'none', padding: '12px', borderRadius: '10px', fontSize: '13px', fontWeight: 600 }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="#8ab0ff"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
                                {ex.videoLabel}
                              </a>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {v.hasStrengthLocked && (
                      <div style={{ marginTop: '12px' }}>
                        <div style={{ fontSize: '11px', color: 'rgba(238,240,234,.4)', marginBottom: '6px' }}>Débloqués plus tard (sécurité Achille) :</div>
                        {v.strengthLocked.map((s, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0', fontSize: '12px', color: 'rgba(238,240,234,.45)' }}>
                            <span style={{ color: 'rgba(238,240,234,.3)' }}>🔒</span>
                            <span style={{ flex: 1 }}>{s.name}</span>
                            <span style={{ fontSize: '10px', color: '#8ab0ff' }}>{s.unlockAt}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= SUIVI ================= */}
        {v.isSuivi && (
          <div data-screen-label="Suivi">
            <div style={{ padding: '16px 20px 0' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#43e08a' }}>Progression</div>
              <div style={{ fontSize: '23px', fontWeight: 700, letterSpacing: '-0.3px', marginTop: '4px' }}>Suivi</div>
            </div>
            <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ background: '#181c19', border: '1px solid #232823', borderRadius: '16px', padding: '14px' }}>
                  <div style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(238,240,234,.5)' }}>Jour du protocole</div>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '38px', fontWeight: 700, lineHeight: 1, marginTop: '6px' }}>{v.dayNum}</div>
                </div>
                <div style={{ background: '#181c19', border: '1px solid #232823', borderRadius: '16px', padding: '14px' }}>
                  <div style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(238,240,234,.5)' }}>Séances validées</div>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '38px', fontWeight: 700, lineHeight: 1, marginTop: '6px' }}>{v.sessionsTotal}</div>
                </div>
                <div style={{ background: '#181c19', border: '1px solid #232823', borderRadius: '16px', padding: '14px' }}>
                  <div style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(238,240,234,.5)' }}>Douleur moy. 7 j</div>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '38px', fontWeight: 700, lineHeight: 1, marginTop: '6px' }}>{v.avg7}</div>
                </div>
                <div style={{ background: '#181c19', border: '1px solid #232823', borderRadius: '16px', padding: '14px' }}>
                  <div style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(238,240,234,.5)' }}>Régularité 14 j</div>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '38px', fontWeight: 700, lineHeight: 1, marginTop: '6px', color: '#43e08a' }}>{v.regularity}<span style={{ fontSize: '20px' }}>%</span></div>
                </div>
              </div>

              {/* chart */}
              <div style={{ background: '#181c19', border: '1px solid #232823', borderRadius: '16px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontSize: '15px', fontWeight: 600 }}>Douleur matinale</div>
                  <div style={{ fontSize: '12px', color: 'rgba(238,240,234,.5)' }}>{v.chartRangeLabel}</div>
                </div>
                {v.hasChart && (
                  <>
                    <div style={{ position: 'relative', marginTop: '14px' }}>
                      <svg width="100%" height="110" viewBox="0 0 300 110" preserveAspectRatio="none" style={{ display: 'block' }}>
                        <line x1="0" y1="55" x2="300" y2="55" stroke="rgba(245,185,66,.35)" strokeWidth="1" strokeDasharray="4 4"></line>
                        <line x1="0" y1="106" x2="300" y2="106" stroke="#232823" strokeWidth="1"></line>
                        <polyline points={v.chartPoints} fill="none" stroke="#43e08a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></polyline>
                      </svg>
                      <div style={{ position: 'absolute', top: '44px', right: '2px', fontSize: '9px', color: 'rgba(245,185,66,.6)' }}>seuil 5</div>
                    </div>
                    <div style={{ display: 'flex', gap: '2px', marginTop: '8px' }}>
                      {v.chartBars.map((cb, i) => (
                        <div key={i} style={{ flex: 1, height: '8px', borderRadius: '2px', background: cb.bg }}></div>
                      ))}
                    </div>
                    <div style={{ fontSize: '10px', color: 'rgba(238,240,234,.4)', marginTop: '6px' }}>barre verte = séance faite ce jour-là</div>
                  </>
                )}
                {v.noChart && (
                  <div style={{ marginTop: '14px', padding: '20px 0', textAlign: 'center', fontSize: '13px', color: 'rgba(238,240,234,.4)', lineHeight: 1.5 }}>Le graphique apparaîtra après 2 jours<br/>de check-in. Continue !</div>
                )}
              </div>

              {/* history */}
              <div style={{ background: '#181c19', border: '1px solid #232823', borderRadius: '16px', padding: '16px' }}>
                <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>Journal</div>
                {v.hasHistory && (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {v.history.map((h, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '10px 0', borderBottom: '1px solid #1e231f' }}>
                        <div style={{ width: '64px', fontSize: '12px', color: 'rgba(238,240,234,.5)', flexShrink: 0, paddingTop: '1px' }}>{h.dateLabel}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '13px' }}><span style={{ color: '#43e08a', fontWeight: 700 }}>{h.pm}</span><span style={{ color: 'rgba(238,240,234,.4)' }}> matin · </span><span style={{ fontWeight: 600 }}>{h.pe}</span><span style={{ color: 'rgba(238,240,234,.4)' }}> exercice</span></div>
                          {h.hasNote && (
                            <div style={{ fontSize: '12px', color: 'rgba(238,240,234,.55)', marginTop: '2px', lineHeight: 1.4 }}>{h.note}</div>
                          )}
                        </div>
                        <div style={{ fontSize: '12px', flexShrink: 0, color: h.sesColor, paddingTop: '1px' }}>{h.sesTxt}</div>
                      </div>
                    ))}
                  </div>
                )}
                {v.noHistory && (
                  <div style={{ fontSize: '13px', color: 'rgba(238,240,234,.4)', padding: '8px 0' }}>Aucune entrée pour l'instant — ton premier check-in apparaîtra ici.</div>
                )}
              </div>

              {/* data */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <div onClick={v.exportData} style={{ flex: 1, minHeight: '46px', border: '1px solid #232823', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600, color: 'rgba(238,240,234,.7)', cursor: 'pointer' }}>Exporter mes données</div>
                <div onClick={v.importClick} style={{ flex: 1, minHeight: '46px', border: '1px solid #232823', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600, color: 'rgba(238,240,234,.7)', cursor: 'pointer' }}>Importer</div>
              </div>
              <input type="file" accept="application/json" ref={v.importRef} onChange={v.importData} style={{ display: 'none' }}/>

              {/* Son de la séance : test + on/off */}
              <div style={{ background: '#181c19', border: '1px solid #232823', borderRadius: '16px', padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '18px' }}>{v.soundOn ? '🔊' : '🔇'}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>Sons de la séance</div>
                    <div style={{ fontSize: '11px', color: 'rgba(238,240,234,.45)' }}>Décompte, changement de jambe, repos, fin.</div>
                  </div>
                  <div onClick={v.toggleSound} style={{ fontSize: '12px', fontWeight: 700, color: v.soundOn ? '#43e08a' : 'rgba(238,240,234,.4)', background: v.soundOn ? 'rgba(67,224,138,.12)' : '#232823', borderRadius: '20px', padding: '5px 12px', cursor: 'pointer' }}>{v.soundOn ? 'Activé' : 'Coupé'}</div>
                </div>
                <div onClick={v.testSound} style={{ marginTop: '12px', minHeight: '46px', background: 'rgba(67,224,138,.12)', border: '1px solid rgba(67,224,138,.3)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px', fontWeight: 700, color: '#43e08a', cursor: 'pointer' }}>▶ Tester le son</div>
                <div style={{ fontSize: '10px', color: 'rgba(238,240,234,.35)', textAlign: 'center', marginTop: '8px', lineHeight: 1.4 }}>Touche « Tester le son ». Sur iPhone, coupe le mode silencieux (switch sur le côté).</div>
              </div>

              <div style={{ fontSize: '11px', color: 'rgba(238,240,234,.35)', textAlign: 'center', paddingBottom: '4px' }}>Tout est stocké sur ce téléphone uniquement.</div>
              <div style={{ fontSize: '10px', color: 'rgba(238,240,234,.25)', textAlign: 'center', letterSpacing: '.5px' }}>Achille v{v.appVersion} · build {v.buildDate}</div>
            </div>
          </div>
        )}

        {/* ================= MÉDICAL ================= */}
        {v.isMed && (
          <div data-screen-label="Médical">
            <div style={{ padding: '16px 20px 0' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#43e08a' }}>Parcours</div>
              <div style={{ fontSize: '23px', fontWeight: 700, letterSpacing: '-0.3px', marginTop: '4px' }}>Médical</div>
            </div>
            <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>

              {v.appts.map((a, i) => (
                <div key={i} style={{ background: '#181c19', border: '1px solid #232823', borderRadius: '16px', overflow: 'hidden', opacity: a.opacity }}>
                  <div onClick={a.toggleOpen} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '13px 16px', cursor: 'pointer', minHeight: '44px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#232823', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', lineHeight: 1, flexShrink: 0 }}>
                      <span style={{ fontSize: '9px', color: a.monColor, fontWeight: 700, textTransform: 'uppercase' }}>{a.mon}</span>
                      <span style={{ fontSize: '15px', fontWeight: 700, marginTop: '2px' }}>{a.day}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, textDecoration: a.deco }}>{a.title}</div>
                      <div style={{ fontSize: '12px', color: a.subColor }}>{a.sub}</div>
                    </div>
                    <span style={{ color: 'rgba(238,240,234,.35)', transform: a.chev, display: 'inline-block', transition: 'transform .2s' }}>⌄</span>
                  </div>
                  {a.isOpen && (
                    <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ fontSize: '12px', color: 'rgba(238,240,234,.5)', width: '44px', flexShrink: 0 }}>Date</div>
                        <input type="date" value={a.date} onChange={a.setDate} style={{ flex: 1, height: '42px', padding: '0 12px', fontSize: '14px', border: '1px solid #232823', borderRadius: '10px', background: '#0f1210', color: '#eef0ea', fontFamily: "'Space Grotesk',sans-serif", colorScheme: 'dark' }}/>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <div style={{ fontSize: '12px', color: 'rgba(238,240,234,.5)', width: '44px', flexShrink: 0, paddingTop: '12px' }}>Notes</div>
                        <textarea value={a.note} onChange={a.setNote} placeholder="Questions à poser, compte-rendu, prescription…" rows="3" style={{ flex: 1, padding: '10px 12px', fontSize: '14px', lineHeight: 1.5, border: '1px solid #232823', borderRadius: '10px', background: '#0f1210', color: '#eef0ea', fontFamily: "'Space Grotesk',sans-serif", resize: 'vertical' }}></textarea>
                      </div>
                      <div style={{ display: 'flex', gap: '10px', marginTop: '2px' }}>
                        <div onClick={a.toggleDone} style={{ flex: 1, minHeight: '44px', borderRadius: '10px', background: a.doneBg, color: a.doneColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>{a.doneTxt}</div>
                        <div onClick={a.del} style={{ width: '44px', minHeight: '44px', borderRadius: '10px', border: '1px solid #232823', color: '#ff6b5e', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"></path></svg>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" value={v.apptTitle} onChange={v.setApptTitle} placeholder="Nouveau RDV — ex. Kiné, séance 3" style={{ flex: 1, height: '46px', padding: '0 14px', fontSize: '14px', border: '1px solid #232823', borderRadius: '12px', background: '#181c19', color: '#eef0ea', fontFamily: "'Space Grotesk',sans-serif" }}/>
                <div onClick={v.addAppt} style={{ width: '66px', height: '46px', borderRadius: '12px', background: '#43e08a', color: '#0f1210', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>Ajouter</div>
              </div>
            </div>
          </div>
        )}

        {/* ================= SÉANCE GUIDÉE ================= */}
        {v.sesActive && (
          <div data-screen-label="Séance guidée" style={{ position: 'fixed', inset: 0, zIndex: 50, background: '#0f1210', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', padding: 'calc(env(safe-area-inset-top) + 16px) 20px calc(env(safe-area-inset-bottom) + 28px)', boxSizing: 'border-box' }}>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div onClick={v.sesClose} style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#181c19', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(238,240,234,.7)', fontSize: '18px' }}>✕</div>
                <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(238,240,234,.5)' }}>{v.sesHeader}</div>
                <div onClick={v.toggleSound} title={v.soundOn ? 'Couper le son' : 'Activer le son'} style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#181c19', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: v.soundOn ? '#43e08a' : 'rgba(238,240,234,.35)', fontSize: '18px' }}>{v.soundOn ? '🔊' : '🔇'}</div>
              </div>

              {v.sesRunning && (
                <>
                  <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <div style={{ fontSize: '19px', fontWeight: 700, lineHeight: 1.3 }}>{v.sesExName}</div>
                    <div style={{ fontSize: '13px', color: 'rgba(238,240,234,.5)', marginTop: '4px' }}>{v.sesSetLabel}</div>
                    {v.sesSide && (
                      <div style={{ display: 'inline-block', marginTop: '8px', fontSize: '14px', fontWeight: 700, letterSpacing: '.5px', color: v.sesSideColor, background: 'rgba(255,255,255,.06)', border: '1px solid ' + v.sesSideColor + '55', borderRadius: '20px', padding: '4px 14px' }}>{v.sesSide}</div>
                    )}
                  </div>
                  <div style={{ marginTop: '14px', background: '#181c19', border: '1px solid #232823', borderRadius: '14px', padding: '14px 16px', fontSize: '14px', lineHeight: 1.55, color: 'rgba(238,240,234,.88)', textAlign: 'center' }}>{v.sesCue}</div>

                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ position: 'relative', width: '200px', height: '200px' }}>
                      <svg width="200" height="200" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="86" fill="none" stroke="#232823" strokeWidth="10"></circle>
                        <circle cx="100" cy="100" r="86" fill="none" stroke={v.sesRingColor} strokeWidth="10" strokeLinecap="round" strokeDasharray={v.sesDash} transform="rotate(-90 100 100)"></circle>
                      </svg>
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: v.sesRingColor }}>{v.sesModeLabel}</div>
                        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '68px', fontWeight: 700, lineHeight: 1, marginTop: '4px' }}>{v.sesBig}</div>
                        <div style={{ fontSize: '13px', color: 'rgba(238,240,234,.5)', marginTop: '2px' }}>{v.sesUnit}</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'center', fontSize: '13px', color: 'rgba(238,240,234,.55)', lineHeight: 1.5, minHeight: '40px', padding: '0 10px' }}>{v.sesHint}</div>

                  {v.sesShowDone && (
                    <div onClick={v.sesSetDone} style={{ marginTop: '14px', background: '#43e08a', borderRadius: '14px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 700, color: '#0f1210', cursor: 'pointer' }}>Série terminée ✓</div>
                  )}
                  {v.sesShowSkip && (
                    <div onClick={v.sesSkip} style={{ marginTop: '14px', border: '1px solid #232823', borderRadius: '14px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 600, color: 'rgba(238,240,234,.7)', cursor: 'pointer' }}>Passer le repos ›</div>
                  )}
                  {v.sesShowPause && (
                    <div onClick={v.sesPauseToggle} style={{ marginTop: '14px', border: '1px solid #232823', borderRadius: '14px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 600, color: 'rgba(238,240,234,.7)', cursor: 'pointer' }}>{v.sesPauseTxt}</div>
                  )}
                  <div onClick={v.sesSkipEx} style={{ marginTop: '8px', textAlign: 'center', fontSize: '13px', fontWeight: 600, color: 'rgba(238,240,234,.45)', padding: '12px', cursor: 'pointer' }}>Passer cet exercice ›</div>
                </>
              )}

              {v.sesFinished && (
                <>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
                    <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: 'rgba(67,224,138,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#43e08a" strokeWidth="2.5"><path d="M4 12l6 6L20 6"></path></svg>
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 700 }}>Séance validée</div>
                    <div style={{ fontSize: '14px', color: 'rgba(238,240,234,.55)', textAlign: 'center', lineHeight: 1.5 }}>Ton tendon vient d'encaisser sa dose<br/>de charge du jour. La régularité paie.</div>
                  </div>
                  <div style={{ background: '#181c19', border: '1px solid #232823', borderRadius: '14px', padding: '14px 16px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <div style={{ fontSize: '13px', color: 'rgba(238,240,234,.6)' }}>Douleur pendant la séance ?</div>
                      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '24px', fontWeight: 700, color: '#43e08a' }}>{v.peVal}</div>
                    </div>
                    <input type="range" min="0" max="10" step="1" value={v.peVal} onChange={v.setPe}/>
                  </div>
                  <div onClick={v.sesClose} style={{ background: '#43e08a', borderRadius: '14px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 700, color: '#0f1210', cursor: 'pointer' }}>Retour à l'accueil</div>
                </>
              )}

            </div>
          </div>
        )}

        {/* toast */}
        {v.hasToast && (
          <div style={{ position: 'fixed', bottom: '104px', left: '50%', transform: 'translateX(-50%)', background: '#eef0ea', color: '#0f1210', padding: '11px 20px', borderRadius: '24px', fontSize: '13px', fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' }}>{v.toast}</div>
        )}

        {/* ================= TAB BAR ================= */}
        <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '420px', background: '#131714', borderTop: '1px solid #232823', display: 'flex', padding: '8px 8px calc(env(safe-area-inset-bottom) + 12px)', zIndex: 40, boxSizing: 'border-box' }}>
          {v.nav.map((n, i) => (
            <div key={i} onClick={n.go} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', color: n.color, cursor: 'pointer', padding: '4px 0', minHeight: '44px' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={n.d}></path></svg>
              <span style={{ fontSize: '10px', fontWeight: n.weight }}>{n.label}</span>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
