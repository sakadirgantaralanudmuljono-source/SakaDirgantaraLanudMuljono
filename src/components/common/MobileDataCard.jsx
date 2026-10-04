export default function MobileDataCard({rows=[],columns=[]}){
 return <div className="mobile-data-card-list">{rows.map((row,i)=><div className="mobile-data-card" key={row.ID || i}>
 {columns.filter(c=>c.key!=="_").map(c=><div className="mobile-data-field" key={c.key}><span>{c.label}</span><b>{row[c.key] || "-"}</b></div>)}
 {columns.find(c=>c.key==="_")?.render?.(null,row)}
 </div>)}</div>
}
