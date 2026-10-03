import React from "react";
import { useState,useEffect } from 'react';
import {useSearchParams} from 'react-router-dom';

export default function DataTable({ columns = [], rows = [], empty = 'Belum ada data.', searchable = false, pageSize = 0 }) {
  const [params]=useSearchParams();
  const externalQuery=params.get('q')||'';
  const [query, setQuery] = useState(searchable?externalQuery:'');
  useEffect(()=>{if(searchable){setQuery(externalQuery);setPage(1)}},[externalQuery,searchable]);
  const [page, setPage] = useState(1);
  const needle = query.trim().toLowerCase();
  const filtered = !searchable || !needle ? rows : rows.filter(row => columns.some(col => String(row[col.key] ?? '').toLowerCase().includes(needle)));
  const size = pageSize > 0 ? pageSize : filtered.length || 1;
  const pages = Math.max(1, Math.ceil(filtered.length / size));
  const current = Math.min(page, pages);
  const view = pageSize > 0 ? filtered.slice((current - 1) * size, current * size) : filtered;

  return <div>
    {searchable && <div className="search-box table-search"><input value={query} placeholder="Cari pada tabel..." onChange={e => { setQuery(e.target.value); setPage(1); }} /></div>}
    {!view.length ? <div className="empty compact">{empty}</div> : <div className="table-wrap"><table className="data-table"><thead><tr>{columns.map(c => <th key={c.key}>{c.label}</th>)}</tr></thead><tbody>{view.map((r, i) => <tr key={r.ID || r.id || i}>{columns.map(c => <td key={c.key}>{c.render ? c.render(r[c.key], r) : r[c.key]}</td>)}</tr>)}</tbody></table></div>}
    {pageSize > 0 && filtered.length > pageSize && <div className="pager"><span>{filtered.length} data</span><button className="btn small" type="button" disabled={current <= 1} onClick={() => setPage(current - 1)}>Sebelumnya</button><span>Halaman {current} / {pages}</span><button className="btn small" type="button" disabled={current >= pages} onClick={() => setPage(current + 1)}>Berikutnya</button></div>}
  </div>;
}
