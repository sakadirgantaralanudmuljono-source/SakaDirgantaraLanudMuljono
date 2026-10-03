const API_PATH = import.meta.env.VITE_API_PATH || '/api/gas';

export class ApiError extends Error {
  constructor(message, status = 500, details = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

export async function apiRequest(action, payload = {}, options = {}) {
  const token = localStorage.getItem('saka_session_token') || '';
  const response = await fetch(API_PATH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, token, payload }),
    signal: options.signal
  });

  let data;
  try { data = await response.json(); }
  catch { throw new ApiError('Respons server tidak valid.', response.status); }

  if (!response.ok || data?.ok === false || data?.success === false) {
    const expired=response.status===401||data?.error?.code==='SESSION_EXPIRED';
    if(expired){localStorage.removeItem('saka_session_token');localStorage.removeItem('saka_session');window.dispatchEvent(new Event('saka:session-expired'));}
    throw new ApiError(data?.message || 'Permintaan gagal.', response.status, data);
  }
  return data?.data ?? data;
}
