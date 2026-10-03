export const NAV_ADMIN = [
  { section: 'Operasional', items: [
    ['dashboard', 'Beranda'],
    ['kegiatan', 'Kegiatan'],
    ['activity-details', 'Detail Kegiatan'],
    ['absensi', 'Absensi'],
    ['notifications', 'Notifikasi & Pengajuan']
  ]},
  { section: 'Data Organisasi', items: [
    ['anggota', 'Anggota'],
    ['penilaian', 'Penilaian'],
    ['kas', 'Kas Organisasi'],
    ['inventaris', 'Inventaris'],
    ['surat', 'Surat'],
    ['pengurus', 'Struktur Pengurus']
  ]},
  { section: 'Pengaturan', items: [
    ['users', 'Pengguna'],
    ['permissions', 'Hak Akses'],
    ['maintenance', 'Pengaturan Data']
  ]}
];

export const NAV_MEMBER = [
  { section: 'Menu Anggota', items: [
    ['dashboard', 'Beranda'],
    ['absensi', 'Absensi Saya'],
    ['penilaian', 'Penilaian Saya'],
    ['profil', 'Profil Saya']
  ]}
];

export const ADMIN_ONLY = ['users', 'permissions', 'maintenance'];
export const CORE_STAFF = ['dashboard', 'kegiatan', 'activity-details', 'absensi', 'notifications'];

export const MODULE_BY_PATH = {
  anggota: 'anggota',
  kegiatan: 'kegiatan',
  'activity-details': 'kegiatan',
  absensi: 'absensi',
  penilaian: 'penilaian',
  kas: 'kas',
  inventaris: 'inventaris',
  surat: 'surat',
  pengurus: 'pengurus',
  notifications: 'absensi'
};
