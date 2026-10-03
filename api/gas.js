export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  const endpoint = process.env.GAS_API_URL;
  const secret = process.env.GAS_PROXY_SECRET;
  if (!endpoint || !secret) {
    return res.status(500).json({ ok: false, message: 'Konfigurasi backend belum lengkap.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body || '{}'); }
    catch { return res.status(400).json({ ok: false, message: 'Body permintaan tidak valid.' }); }
  }
  if (!body || typeof body !== 'object') body = {};

  try {
    const upstream = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ ...body, proxySecret: secret })
    });

    const text = await upstream.text();
    let data;
    try { data = JSON.parse(text); }
    catch { return res.status(502).json({ ok: false, message: 'Respons backend tidak valid.' }); }

    return res.status(upstream.ok ? 200 : upstream.status).json(data);
  } catch {
    return res.status(502).json({ ok: false, message: 'Backend tidak dapat dihubungi.' });
  }
}
