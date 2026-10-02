const API_URL=import.meta.env.VITE_API_URL || '';
export async function api(action,payload={}){
  if(!API_URL) throw new Error('VITE_API_URL belum dikonfigurasi.');
  const res=await fetch(API_URL,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({action,...payload})});
  const data=await res.json();
  if(!res.ok || data?.ok===false) throw new Error(data?.message || 'Permintaan gagal.');
  return data?.data ?? data;
}
