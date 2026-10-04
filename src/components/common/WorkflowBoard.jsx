export default function WorkflowBoard({items=[]}){
 return <div className="workflow-board">{items.map((x,i)=><div className="workflow-card" key={i}><small>{x.label}</small><b>{x.value}</b><span>{x.note}</span></div>)}</div>
}
