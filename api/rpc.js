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
  "getModulesData",
  "getPenilaianBulanan",
  "getPenilaianPdfPayload",
  "getPublicCheckinData",
  "getPublicIzinData",
  "getRolePermissions",
  "getSkkChecklist",
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

function normalizeBody(body) {
  if (body && typeof body === 'object') return body;
  if (typeof body === 'string' && body.trim()) {
    try { return JSON.parse(body); } catch (_) { return {}; }
  }
  return {};
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  const gasUrl = String(process.env.GAS_API_URL || '').trim();
  const secret = String(process.env.GAS_API_SECRET || '').trim();

  if (!gasUrl || !secret) {
    return res.status(500).json({
      success: false,
      message: 'Konfigurasi gateway belum lengkap. Set GAS_API_URL dan GAS_API_SECRET di Vercel.'
    });
  }

  const body = normalizeBody(req.body);
  const method = String(body.method || '').trim();
  const args = Array.isArray(body.args) ? body.args : [];

  if (!ALLOWED_METHODS.has(method)) {
    return res.status(400).json({ success: false, message: `Metode API tidak diizinkan: ${method || '-'}` });
  }

  try {
    const upstream = await fetch(gasUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      },
      redirect: 'follow',
      cache: 'no-store',
      body: JSON.stringify({ secret, method, args })
    });

    const raw = await upstream.text();
    let payload;
    try {
      payload = raw ? JSON.parse(raw) : null;
    } catch (_) {
      return res.status(502).json({
        success: false,
        message: 'Backend Apps Script mengembalikan respons non-JSON.',
        upstreamStatus: upstream.status
      });
    }

    if (!upstream.ok) {
      return res.status(502).json({
        success: false,
        message: payload?.message || `Backend Apps Script gagal (${upstream.status}).`
      });
    }

    if (!payload || payload.success !== true) {
      return res.status(400).json({
        success: false,
        message: payload?.message || 'Backend menolak permintaan.'
      });
    }

    return res.status(200).json(payload);
  } catch (error) {
    return res.status(502).json({
      success: false,
      message: error instanceof Error ? error.message : 'Gagal menghubungi backend Apps Script.'
    });
  }
}
