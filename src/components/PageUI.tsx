import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { Link } from 'react-router-dom';
export function PageHeading({title,description,action}:{title:string;description?:string;action?:ReactNode}) {
  return <header className="ui-page-heading"><div className="min-w-0"><h1>{title}</h1>{description&&<p>{description}</p>}</div>{action}</header>;
}
export function Summary({items}:{items:{label:string;value:ReactNode}[]}) {
  return <dl className="ui-summary">{items.map(item=><div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>;
}
export function TaskFolder({label,title,description,meta,action}:{label:string;title:string;description:string;meta?:ReactNode;action:ReactNode}) {
  return <section className="task-folder" aria-label={label}><div className="folder-tab">{label}</div><div className="folder-body"><div className="folder-copy"><h2>{title}</h2><p>{description}</p></div>{meta&&<div className="folder-meta">{meta}</div>}<div className="folder-action">{action}</div></div></section>;
}
export function QuickLinks({title,items}:{title:string;items:{title:string;description:string;path:string;icon:IconType}[]}) {
  return <section className="school-links"><h2>{title}</h2><div className="school-link-grid">{items.map(item=>{const Icon=item.icon;return <Link key={item.path} to={item.path} className="school-link"><Icon aria-hidden="true"/><div><h3>{item.title}</h3><p>{item.description}</p></div></Link>;})}</div></section>;
}
