const ALLOWED_METHODS = new Set([
  "checkSystemStructure",
  "closeIzinKegiatan",
  "deleteAbsensi",
  "deleteAnggota",
  "deleteInventaris",
  "deleteKas",
  "deleteKegiatan",
  "deleteKegiatanDokumentasi",
  "deleteKegiatanInventaris",
  "deleteKomponenPenilaian",
  "deletePengurus",
  "deletePenilaianAnggota",
  "deleteSurat",
  "deleteUser",
  "finishExcelDatabaseImport",
  "generateKegiatanReportPdf",
  "generatePenilaianBulananPdf",
  "getActionNotifications",
  "getActionPermissionDetail",
  "getAttendanceLink",
  "getBatchIzinVerifikasi",
  "getDashboardData",
  "getInventoryQuickOptions",
  "getIzinBuktiPreview",
  "getIzinLink",
  "getKegiatanDokumentasiPreview",
  "getKegiatanReportData",
  "getMemberAccessCard",
  "getModulesData",
  "getPenilaianBulanan",
  "getPenilaianPdfPayload",
  "getPublicCheckinData",
  "getPublicIzinData",
  "getRolePermissions",
  "getSkkChecklist",
  "getSystemAuditLog",
  "importExcelDatabaseBatch",
  "login",
  "logout",
  "markActionNotificationsRead",
  "publicCheckin",
  "publicSubmitIzin",
  "safeResetSystem",
  "saveAbsensi",
  "saveAbsensiBatch",
  "saveAnggota",
  "saveInventaris",
  "saveKas",
  "saveKegiatan",
  "saveKegiatanInventaris",
  "saveKomponenPenilaian",
  "saveLaporanKegiatan",
  "savePengurus",
  "savePenilaianAnggota",
  "saveRolePermissions",
  "saveSkkChecklist",
  "saveSurat",
  "saveUser",
  "transitionKegiatanStatus",
  "updateKegiatanDokumentasiMetadata",
  "updateSpreadsheetStructure",
  "uploadKegiatanDokumentasi",
  "uploadKegiatanInventarisPhoto",
  "verifyActionPermission",
  "verifyIzinKegiatan"
]);

const PUBLIC_METHODS = new Set([
  'login',
  'getPublicCheckinData',
  'publicCheckin',
  'getPublicIzinData',
  'publicSubmitIzin'
]);

const SESSION_COOKIE = 'saka_session';
const SESSION_MARKER = 'cookie-session';
const SESSION_MAX_AGE = 21600;
const UPSTREAM_TIMEOUT_MS = 45000;

// Best-effort per-instance limiter. Apps Script juga menerapkan limiter berbasis
// akun/NTA sehingga proteksi tidak hanya bergantung pada instance Vercel.
const rateBuckets = globalThis.__sakaRateBuckets || new Map();
globalThis.__sakaRateBuckets = rateBuckets;

function normalizeBody(body) {
  if (body && typeof body === 'object') return body;
  if (typeof body === 'string' && body.trim()) {
    try { return JSON.parse(body); } catch (_) { return {}; }
  }
  return {};
}

function parseCookies(header) {
  const out = {};
  String(header || '').split(';').forEach(part => {
    const index = part.indexOf('=');
    if (index <= 0) return;
    const key = part.slice(0, index).trim();
    const value = part.slice(index + 1).trim();
    if (!key) return;
    try { out[key] = decodeURIComponent(value); } catch (_) { out[key] = value; }
  });
  return out;
}

function sessionCookie(token) {
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; Max-Age=${SESSION_MAX_AGE}; HttpOnly; Secure; SameSite=Strict`;
}

function clearSessionCookie() {
  return `${SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict`;
}

function clientKey(req) {
  const forwarded = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return forwarded || String(req.socket?.remoteAddress || 'unknown');
}

function consumeRateLimit(key, limit, windowMs) {
  const now = Date.now();
  const current = rateBuckets.get(key);
  if (!current || current.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }
  current.count += 1;
  if (current.count > limit) {
    return { allowed: false, retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
  }
  return { allowed: true, retryAfter: 0 };
}

function applyGatewayRateLimit(req, method) {
  const ip = clientKey(req);
  let policy = null;
  if (method === 'login') policy = { limit: 15, windowMs: 15 * 60 * 1000, scope: 'login' };
  if (method === 'publicCheckin') policy = { limit: 40, windowMs: 10 * 60 * 1000, scope: 'checkin' };
  if (method === 'publicSubmitIzin') policy = { limit: 25, windowMs: 15 * 60 * 1000, scope: 'izin' };
  if (!policy) return { allowed: true, retryAfter: 0 };
  return consumeRateLimit(`${policy.scope}:${ip}`, policy.limit, policy.windowMs);
}

function requestId() {
  try { return crypto.randomUUID(); } catch (_) {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  const reqId = requestId();
  res.setHeader('X-Request-Id', reqId);

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method not allowed.', requestId: reqId });
  }

  const gasUrl = String(process.env.GAS_API_URL || '').trim();
  const secret = String(process.env.GAS_API_SECRET || '').trim();

  if (!gasUrl || !secret) {
    return res.status(500).json({
      success: false,
      message: 'Konfigurasi gateway belum lengkap. Set GAS_API_URL dan GAS_API_SECRET di Vercel.',
      requestId: reqId
    });
  }

  const body = normalizeBody(req.body);
  const method = String(body.method || '').trim();
  const originalArgs = Array.isArray(body.args) ? body.args : [];
  const args = originalArgs.slice();

  if (!ALLOWED_METHODS.has(method)) {
    return res.status(400).json({ success: false, message: `Metode API tidak diizinkan: ${method || '-'}`, requestId: reqId });
  }

  let bodyBytes = 0;
  try { bodyBytes = Buffer.byteLength(JSON.stringify(body), 'utf8'); } catch (_) {}
  if (bodyBytes > 4 * 1024 * 1024) {
    return res.status(413).json({ success: false, message: 'Ukuran permintaan terlalu besar.', requestId: reqId });
  }

  const limited = applyGatewayRateLimit(req, method);
  if (!limited.allowed) {
    res.setHeader('Retry-After', String(limited.retryAfter));
    return res.status(429).json({
      success: false,
      message: `Terlalu banyak percobaan. Coba lagi sekitar ${limited.retryAfter} detik.`,
      requestId: reqId
    });
  }

  const cookies = parseCookies(req.headers.cookie);
  const cookieToken = String(cookies[SESSION_COOKIE] || '').trim();
  let legacyTokenToMigrate = '';

  if (!PUBLIC_METHODS.has(method)) {
    const supplied = String(args[0] || '').trim();
    const token = cookieToken || (supplied && supplied !== SESSION_MARKER ? supplied : '');
    if (!token) {
      res.setHeader('Set-Cookie', clearSessionCookie());
      return res.status(401).json({ success: false, message: 'Sesi login berakhir. Silakan login kembali.', requestId: reqId });
    }
    args[0] = token;
    if (!cookieToken && supplied && supplied !== SESSION_MARKER) legacyTokenToMigrate = supplied;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const upstream = await fetch(gasUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'X-SAKA-Request-ID': reqId
      },
      redirect: 'follow',
      cache: 'no-store',
      signal: controller.signal,
      body: JSON.stringify({ secret, method, args, meta: { requestId: reqId } })
    });

    const raw = await upstream.text();
    let payload;
    try {
      payload = raw ? JSON.parse(raw) : null;
    } catch (_) {
      return res.status(502).json({
        success: false,
        message: 'Backend Apps Script mengembalikan respons non-JSON.',
        upstreamStatus: upstream.status,
        requestId: reqId
      });
    }

    if (!upstream.ok) {
      return res.status(502).json({
        success: false,
        message: payload?.message || `Backend Apps Script gagal (${upstream.status}).`,
        requestId: reqId
      });
    }

    if (!payload || payload.success !== true) {
      const message = payload?.message || 'Backend menolak permintaan.';
      if (/sesi login berakhir/i.test(message)) res.setHeader('Set-Cookie', clearSessionCookie());
      return res.status(400).json({ success: false, message, requestId: reqId });
    }

    if (method === 'login') {
      const token = String(payload?.data?.token || '').trim();
      if (!token) return res.status(502).json({ success: false, message: 'Backend tidak mengembalikan sesi login.', requestId: reqId });
      res.setHeader('Set-Cookie', sessionCookie(token));
      payload.data.token = SESSION_MARKER;
    } else if (method === 'logout') {
      res.setHeader('Set-Cookie', clearSessionCookie());
    } else if (legacyTokenToMigrate) {
      // Migrasi transparan dari instalasi v3.5 yang masih memiliki localStorage token.
      res.setHeader('Set-Cookie', sessionCookie(legacyTokenToMigrate));
    } else if (!PUBLIC_METHODS.has(method) && cookieToken) {
      // Selaraskan cookie dengan sliding session pada Apps Script.
      res.setHeader('Set-Cookie', sessionCookie(cookieToken));
    }

    return res.status(200).json({ ...payload, requestId: reqId });
  } catch (error) {
    const timedOut = error && (error.name === 'AbortError' || String(error.message || '').toLowerCase().includes('abort'));
    return res.status(502).json({
      success: false,
      message: timedOut ? 'Backend terlalu lama merespons. Silakan coba lagi.' : 'Gagal menghubungi backend Apps Script.',
      requestId: reqId
    });
  } finally {
    clearTimeout(timeout);
  }
}
