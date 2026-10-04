export default function ModuleHero({title,subtitle,stats=[],actions=[]}){
 return <section className="module-hero panel">
  <div className="module-hero-top"><div><h2>{title}</h2><p>{subtitle}</p></div><div className="quick-actions">{actions.map((a,i)=><button key={i} className={a.primary?'btn primary':'btn'} onClick={a.onClick}>{a.label}</button>)}</div></div>
  <div className="module-stat-grid">{stats.map((s,i)=><div key={i}><small>{s.label}</small><b>{s.value}</b></div>)}</div>
 </section>
}
