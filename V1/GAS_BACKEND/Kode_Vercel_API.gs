const APP = {
  NAME: 'SAKA DIRGANTARA',
  VERSION: '3.6.0',
  DB_PROPERTY: 'SAKA_DIRGANTARA_V2_DB_ID',
  DOCS_FOLDER_PROPERTY: 'SAKA_DIRGANTARA_DOCS_FOLDER_ID',
  REPORTS_FOLDER_PROPERTY: 'SAKA_DIRGANTARA_REPORTS_FOLDER_ID',
  SESSION_EPOCH_PROPERTY: 'SAKA_V2_SESSION_EPOCH',
  USER_EPOCH_PREFIX: 'SAKA_V2_USER_EPOCH_',
  SESSION_SECONDS: 21600,
  DASHBOARD_CACHE_SECONDS: 60,
  DASHBOARD_REVISION_PROPERTY: 'SAKA_DASHBOARD_REVISION',
  IZIN_TIME_ZONE: 'Asia/Jakarta',
  IZIN_AUTO_CLOSE_HHMM: '07:00',
  IZIN_VERIFY_DEADLINE_HHMM: '16:00',
  ATTENDANCE_AUTOMATION_INTERVAL_MINUTES: 5,
  API_GATEWAY_SECRET_PROPERTY: 'SAKA_VERCEL_GATEWAY_SECRET',
  PUBLIC_APP_URL_PROPERTY: 'SAKA_PUBLIC_APP_URL',
  MEMBER_PIN_SECRET_PROPERTY: 'SAKA_MEMBER_PIN_SECRET',

  SHEETS: {
    Users: [
      'ID','Username','PasswordHash','Nama','Role','Status',
      'DibuatPada','DiubahPada'
    ],

    RolePermissions: ['ID','Role','Module','CanView','CanCreate','CanEdit','CanDelete','DibuatPada','DiubahPada'],

    Anggota: [
      'ID','NTA','NTAUrut','Nama','JenisKelamin','TempatLahir','TanggalLahir',
      'Alamat','Telepon','SekolahInstansi','Krida','Jabatan','Status',
      'TanggalGabung','TanggalPelantikan','DibuatPada','DiubahPada'
    ],

    Kegiatan: [
      'ID','NamaKegiatan','Tanggal','Jenis','Lokasi','PenanggungJawab',
      'Status','Keterangan','IzinDitutupPada','IzinDitutupOleh',
      'DibuatPada','DiubahPada'
    ],

    IzinKegiatan: [
      'ID','KegiatanID','KegiatanNama','Tanggal','AnggotaID','NTA','NamaAnggota',
      'JenisPengajuan','Alasan','JenisBukti','BuktiNamaFile','BuktiMimeType',
      'BuktiDriveFileID','BuktiUkuran','Status','DikirimPada',
      'DiverifikasiPada','DiverifikasiOleh','CatatanVerifikasi',
      'DibuatPada','DiubahPada'
    ],

    KomponenPenilaian: [
      'ID','Kode','NamaKomponen','TipeSumber','Bobot','PoinMaksimum',
      'AturanJSON','Status','Urutan','Keterangan','DibuatPada','DiubahPada'
    ],

    MasterSKK: [
      'ID','Kode','Krida','KelompokSKK','Butir','Urutan','Status','Sumber',
      'DibuatPada','DiubahPada'
    ],

    PenilaianAnggota: [
      'ID','Tanggal','Periode','AnggotaID','NTA','NamaAnggota',
      'KomponenID','KomponenKode','KomponenNama','ReferensiID',
      'Poin','PoinMaksimum','Catatan','Petugas','DibuatPada','DiubahPada'
    ],

    LaporanPenilaian: [
      'ID','Periode','PDFFileID','PDFUrl','DibuatOleh','DibuatPada','DiubahPada'
    ],

    Absensi: [
      'ID','KegiatanID','KegiatanNama','Tanggal','AnggotaID',
      'NamaAnggota','StatusKehadiran','Catatan','Metode',
      'DibuatPada','DiubahPada'
    ],

    Kas: [
      'ID','Tanggal','Jenis','Kategori','Keterangan','Nominal',
      'Petugas','NoBukti','KegiatanID','ImportKey','DibuatPada','DiubahPada'
    ],

    Inventaris: [
      'ID','KodeBarang','NamaBarang','Kategori','Jumlah','Kondisi',
      'Lokasi','PenanggungJawab','Keterangan','DibuatPada','DiubahPada','JumlahRusak'
    ],

    KegiatanInventaris: [
      'ID','KegiatanID','InventarisID','KodeBarang','NamaBarang',
      'JumlahAwal','JumlahDipakai','JumlahSetelah','KondisiAwal',
      'KondisiSetelah','FotoAwalID','FotoSetelahID','Keterangan',
      'DibuatPada','DiubahPada','StatusPemakaian','JumlahRusakKembali','Versi'
    ],

    Surat: [
      'ID','NomorSurat','Tanggal','Jenis','Perihal','AsalTujuan',
      'Status','LinkFile','Keterangan','DibuatPada','DiubahPada'
    ],

    Pengurus: [
      'ID','AnggotaID','Nama','Jabatan','Bidang','Periode',
      'Urutan','Status','DibuatPada','DiubahPada'
    ],

    Dokumentasi: [
      'ID','KegiatanID','NamaFile','MimeType','DriveFileID','Ukuran',
      'Keterangan','Urutan','Uploader','JenisDokumentasi','KegiatanInventarisID',
      'DibuatPada','DiubahPada'
    ],

    LaporanKegiatan: [
      'ID','KegiatanID','JamMulai','JamSelesai','Cuaca','JumlahPamongInstruktur',
      'FokusKrida','TopikMateri','Instruktur','SusunanKegiatanJSON',
      'Pencapaian','Kendala','TindakLanjut','TempatLaporan','TanggalLaporan',
      'Penandatangan1Nama','Penandatangan1Jabatan',
      'Penandatangan2Nama','Penandatangan2Jabatan',
      'PDFFileID','PDFUrl','DibuatPada','DiubahPada'
    ]
  }
};

// Format NTA otomatis anggota.
// Contoh calon: MULCA00142026  -> MUL + CA + 001 + April + 2026
// Contoh resmi: MUL00192026    -> MUL + 001 + September + 2026
const MEMBER_NTA = {
  PREFIX: 'MUL',
  CANDIDATE_MARKER: 'CA',
  SEQUENCE_DIGITS: 3,
  MAX_SEQUENCE: 999
};


// Mesin penilaian dibuat generik agar sumber nilai baru (mis. SKK) dapat
// ditambahkan tanpa mengubah struktur Absensi. Komponen ABSENSI dibuat otomatis.
const ASSESSMENT = {
  DEFAULT_ATTENDANCE_CODE: 'ABSENSI',
  DEFAULT_ATTENDANCE_NAME: 'Kehadiran',
  DEFAULT_ATTENDANCE_WEIGHT: 100,
  DEFAULT_ATTENDANCE_MAX: 10,
  DEFAULT_ATTENDANCE_RULES: {
    Hadir: 10,
    Izin: 5,
    Sakit: 5,
    Alpa: 0
  },
  SKK_CODE: 'SKK',
  SKK_NAME: 'SKK / Kecakapan Khusus',
  SKK_POINT_PER_ITEM: 5,
  SKK_MONTHLY_MAX: 25,
  SKK_MAX_INDEX_BONUS: 10,
  PREDICATES: [
    { min: 85, label: 'Sangat Aktif' },
    { min: 70, label: 'Aktif' },
    { min: 55, label: 'Cukup Aktif' },
    { min: 0, label: 'Perlu Penguatan' }
  ]
};

// Master SKK ditranskripsikan dari file SKK PRAMUKA.pdf yang diberikan pengguna.
// Kode dibuat stabil agar satu butir hanya dapat dihitung sekali per anggota.
const SKK_MASTER_DEFAULTS = [
  {
    "Kode": "OK-PB-01",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Pesawat Bermotor",
    "Butir": "Memahami Navigasi Udara",
    "Urutan": 1
  },
  {
    "Kode": "OK-PB-02",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Pesawat Bermotor",
    "Butir": "Memahami Komunikasi Penerbangan",
    "Urutan": 2
  },
  {
    "Kode": "OK-PB-03",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Pesawat Bermotor",
    "Butir": "Memahami Tentang Aerodinamika",
    "Urutan": 3
  },
  {
    "Kode": "OK-PB-04",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Pesawat Bermotor",
    "Butir": "Memahami Meteorology",
    "Urutan": 4
  },
  {
    "Kode": "OK-PB-05",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Pesawat Bermotor",
    "Butir": "Memahami Aircraft Structure",
    "Urutan": 5
  },
  {
    "Kode": "OK-PB-06",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Pesawat Bermotor",
    "Butir": "Memahami Lalu Lintas Udara (PLLU)",
    "Urutan": 6
  },
  {
    "Kode": "OK-PB-07",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Pesawat Bermotor",
    "Butir": "Memahami Theory Of Flight",
    "Urutan": 7
  },
  {
    "Kode": "OK-PTB-01",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Pesawat Tak Bermotor",
    "Butir": "Memahami Aircraft Structure",
    "Urutan": 8
  },
  {
    "Kode": "OK-PTB-02",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Pesawat Tak Bermotor",
    "Butir": "Memahami Aerodinamika",
    "Urutan": 9
  },
  {
    "Kode": "OK-PTB-03",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Pesawat Tak Bermotor",
    "Butir": "Memahami Dasar - Dasar Navigasi Udara",
    "Urutan": 10
  },
  {
    "Kode": "OK-PTB-04",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Pesawat Tak Bermotor",
    "Butir": "Mampu Membaca Peta Dan Tahu Artinya",
    "Urutan": 11
  },
  {
    "Kode": "OK-PTB-05",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Pesawat Tak Bermotor",
    "Butir": "Mengetahui Meteorologi, Mengenal PLLU",
    "Urutan": 12
  },
  {
    "Kode": "OK-PTB-06",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Pesawat Tak Bermotor",
    "Butir": "Mengenal Karateristik Pesawat Tak Bermotor",
    "Urutan": 13
  },
  {
    "Kode": "OK-PTB-07",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Pesawat Tak Bermotor",
    "Butir": "Memahami Teori Penerbangan (Theory Of Flight)",
    "Urutan": 14
  },
  {
    "Kode": "OK-AM-01",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Aeromodelling",
    "Butir": "Bisa Merancang, Membuat, Dan Menerbangkan Pesawat Model Chuck Glider",
    "Urutan": 15
  },
  {
    "Kode": "OK-AM-02",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Aeromodelling",
    "Butir": "Bisa Membuat, Merakit Pesawat Model Kerangka",
    "Urutan": 16
  },
  {
    "Kode": "OK-AM-03",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Aeromodelling",
    "Butir": "Bisa Menerbangkan Salah Satu Pesawat Model Klase: Free Flight (V), Control Line, Radio Control (Bila Memungkinkan)",
    "Urutan": 17
  },
  {
    "Kode": "OK-AM-04",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Aeromodelling",
    "Butir": "Bisa Membuat, Mencampur Bahan Bakar Pesawat Model",
    "Urutan": 18
  },
  {
    "Kode": "OK-AM-05",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Aeromodelling",
    "Butir": "Mengetahui Pengetahuan Dasar Aeordinamika",
    "Urutan": 19
  },
  {
    "Kode": "OK-AM-06",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Aeromodelling",
    "Butir": "Mengetahui Pengetahuan Dasar Meteorologi",
    "Urutan": 20
  },
  {
    "Kode": "OK-AM-07",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Aeromodelling",
    "Butir": "Mengetahui Pengetahuan Dasar PLLU",
    "Urutan": 21
  },
  {
    "Kode": "OK-AM-08",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Aeromodelling",
    "Butir": "Mengetahui Pengetahuan Dasar Elektronika",
    "Urutan": 22
  },
  {
    "Kode": "OK-AM-09",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Aeromodelling",
    "Butir": "Mengetahui Bagian Mesin Pesawat Model Serta Fuungsi - Fungsinya (Piston Cylinder, Carburator, Busi Dll)",
    "Urutan": 23
  },
  {
    "Kode": "OK-AM-10",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Aeromodelling",
    "Butir": "Mengetahui Teori Membuat Baling - Baling",
    "Urutan": 24
  },
  {
    "Kode": "OK-AM-11",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Aeromodelling",
    "Butir": "Mengetahui Kelompok Dan Klasifikasi Pesawat Model",
    "Urutan": 25
  },
  {
    "Kode": "OK-AM-12",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Aeromodelling",
    "Butir": "Siap Dan Mampu Mengikuti Perlombaan",
    "Urutan": 26
  },
  {
    "Kode": "OK-TP-01",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Terjun Payung",
    "Butir": "Lulus Seleksi/Tes Kesehhatan, Kesamaptaan Jasmani Yang Berlaku Dan Psikologi",
    "Urutan": 27
  },
  {
    "Kode": "OK-TP-02",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Terjun Payung",
    "Butir": "Lulus Mengikuti Ground Trainning",
    "Urutan": 28
  },
  {
    "Kode": "OK-TP-03",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Terjun Payung",
    "Butir": "Mengikuti Dan Lulus Terjun Statik Maupun Terjun Bebas",
    "Urutan": 29
  },
  {
    "Kode": "OK-LG-01",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Layang Gantung",
    "Butir": "Memahami Struktur Pesawat Layang Gantung",
    "Urutan": 30
  },
  {
    "Kode": "OK-LG-02",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Layang Gantung",
    "Butir": "Memahami Teori Aerodinamika",
    "Urutan": 31
  },
  {
    "Kode": "OK-LG-03",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Layang Gantung",
    "Butir": "Memahami Dasar Dasar Navigasi Dan Mampu Membaca Peta",
    "Urutan": 32
  },
  {
    "Kode": "OK-LG-04",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Layang Gantung",
    "Butir": "Memahami Dasar Meteorologi Dan PLLU",
    "Urutan": 33
  },
  {
    "Kode": "OK-LG-05",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Layang Gantung",
    "Butir": "Mengenal Karateristik Dan Spesifikasi Pesawat Layang Gantung",
    "Urutan": 34
  },
  {
    "Kode": "OK-LG-06",
    "Krida": "Krida Olahraga Dirgantara",
    "KelompokSKK": "SKK Layang Gantung",
    "Butir": "Memahami Teori Penerbangn (Teory Of Flight)",
    "Urutan": 35
  },
  {
    "Kode": "PK-NU-01",
    "Krida": "Krida Pengetahuan Dirgantara",
    "KelompokSKK": "SKK Navigasi Udara",
    "Butir": "Mengetahui Tentang Arah Sebenarnya (True North, Magnetic North)",
    "Urutan": 36
  },
  {
    "Kode": "PK-NU-02",
    "Krida": "Krida Pengetahuan Dirgantara",
    "KelompokSKK": "SKK Navigasi Udara",
    "Butir": "Mampu Membaca Rute Chart",
    "Urutan": 37
  },
  {
    "Kode": "PK-NU-03",
    "Krida": "Krida Pengetahuan Dirgantara",
    "KelompokSKK": "SKK Navigasi Udara",
    "Butir": "Mampu Menghitung Perbandingan Antara Satuan Kecepatan, Jarak Dan Ketinggian",
    "Urutan": 38
  },
  {
    "Kode": "PK-NU-04",
    "Krida": "Krida Pengetahuan Dirgantara",
    "KelompokSKK": "SKK Navigasi Udara",
    "Butir": "Mengetahui Jenis – Jenis Navigasi",
    "Urutan": 39
  },
  {
    "Kode": "PK-NU-05",
    "Krida": "Krida Pengetahuan Dirgantara",
    "KelompokSKK": "SKK Navigasi Udara",
    "Butir": "Mengetahui Dan Bisa Menghitung Navigasi Dasar (Death Recoaching)",
    "Urutan": 40
  },
  {
    "Kode": "PK-NU-06",
    "Krida": "Krida Pengetahuan Dirgantara",
    "KelompokSKK": "SKK Navigasi Udara",
    "Butir": "Bisa Menghitung ETA (Estimate Time Arrival)",
    "Urutan": 41
  },
  {
    "Kode": "PK-NU-07",
    "Krida": "Krida Pengetahuan Dirgantara",
    "KelompokSKK": "SKK Navigasi Udara",
    "Butir": "Bisa Menghitung Waktu / Perbedaan Waktu Suatu Tempat",
    "Urutan": 42
  },
  {
    "Kode": "PK-PLLU-01",
    "Krida": "Krida Pengetahuan Dirgantara",
    "KelompokSKK": "SKK PLLU (Pengaturan Lalu Lintas Udara)",
    "Butir": "Mengetahui Tentang Batas – Batas Kewenangan Pengontrolan Suatu Bandara (AMC, ADT)",
    "Urutan": 43
  },
  {
    "Kode": "PK-PLLU-02",
    "Krida": "Krida Pengetahuan Dirgantara",
    "KelompokSKK": "SKK PLLU (Pengaturan Lalu Lintas Udara)",
    "Butir": "Mengetahui Tentang Ketentuan – Ketentuan Penerbangan Visual Flight Rules",
    "Urutan": 44
  },
  {
    "Kode": "PK-PLLU-03",
    "Krida": "Krida Pengetahuan Dirgantara",
    "KelompokSKK": "SKK PLLU (Pengaturan Lalu Lintas Udara)",
    "Butir": "Mampu Memandu Pergerakan Pesawat Di Area",
    "Urutan": 45
  },
  {
    "Kode": "PK-PLLU-04",
    "Krida": "Krida Pengetahuan Dirgantara",
    "KelompokSKK": "SKK PLLU (Pengaturan Lalu Lintas Udara)",
    "Butir": "Memahami Cara – Cara Menggunakan Alat – Alat Bantu Pengawasan Lalu Lintas Udara",
    "Urutan": 46
  },
  {
    "Kode": "PK-PLLU-05",
    "Krida": "Krida Pengetahuan Dirgantara",
    "KelompokSKK": "SKK PLLU (Pengaturan Lalu Lintas Udara)",
    "Butir": "Mengetahui Cara Pengisian Rencana Penerbangan (Flight Plan) Dan Notam",
    "Urutan": 47
  },
  {
    "Kode": "PK-PLLU-06",
    "Krida": "Krida Pengetahuan Dirgantara",
    "KelompokSKK": "SKK PLLU (Pengaturan Lalu Lintas Udara)",
    "Butir": "Mengetahui Pola Penerbangan Disuatu Bandara",
    "Urutan": 48
  },
  {
    "Kode": "PK-PLLU-07",
    "Krida": "Krida Pengetahuan Dirgantara",
    "KelompokSKK": "SKK PLLU (Pengaturan Lalu Lintas Udara)",
    "Butir": "Mengetahui Ketentuan Atau Syarat Pembuatan Helipad",
    "Urutan": 49
  },
  {
    "Kode": "PK-PLLU-08",
    "Krida": "Krida Pengetahuan Dirgantara",
    "KelompokSKK": "SKK PLLU (Pengaturan Lalu Lintas Udara)",
    "Butir": "Mampu Membaca Data Cuaca (QAM)",
    "Urutan": 50
  },
  {
    "Kode": "PK-MET-01",
    "Krida": "Krida Pengetahuan Dirgantara",
    "KelompokSKK": "SKK Meteorologi",
    "Butir": "Tahu tentang pegerakan angin / terjadinya angin",
    "Urutan": 51
  },
  {
    "Kode": "PK-MET-02",
    "Krida": "Krida Pengetahuan Dirgantara",
    "KelompokSKK": "SKK Meteorologi",
    "Butir": "Mengenal alat – alat pengukur kecepatan angin. Tahu tentang susunan atmosfer",
    "Urutan": 52
  },
  {
    "Kode": "PK-MET-03",
    "Krida": "Krida Pengetahuan Dirgantara",
    "KelompokSKK": "SKK Meteorologi",
    "Butir": "Dapat menggambarkan tentang arah dan kecepatan angin",
    "Urutan": 53
  },
  {
    "Kode": "PK-MET-04",
    "Krida": "Krida Pengetahuan Dirgantara",
    "KelompokSKK": "SKK Meteorologi",
    "Butir": "Mengetahui pengaruh angin terhadap penerbangan",
    "Urutan": 54
  },
  {
    "Kode": "PK-FB-01",
    "Krida": "Krida Pengetahuan Dirgantara",
    "KelompokSKK": "SKK Fasilitas Bandara",
    "Butir": "Memahami Fungsi Pemadam Kebakaran Di Bandara",
    "Urutan": 55
  },
  {
    "Kode": "PK-FB-02",
    "Krida": "Krida Pengetahuan Dirgantara",
    "KelompokSKK": "SKK Fasilitas Bandara",
    "Butir": "Mengetahui Jenis – Jenis Bahan Kimia Untuk Memadamkan Kebakaran Pesawat",
    "Urutan": 56
  },
  {
    "Kode": "PK-FB-03",
    "Krida": "Krida Pengetahuan Dirgantara",
    "KelompokSKK": "SKK Fasilitas Bandara",
    "Butir": "Mengetahui Fasilitas Untuk Karantina",
    "Urutan": 57
  },
  {
    "Kode": "PK-FB-04",
    "Krida": "Krida Pengetahuan Dirgantara",
    "KelompokSKK": "SKK Fasilitas Bandara",
    "Butir": "Mengetahui Persyaratan Suatu Bandara",
    "Urutan": 58
  },
  {
    "Kode": "PK-FB-05",
    "Krida": "Krida Pengetahuan Dirgantara",
    "KelompokSKK": "SKK Fasilitas Bandara",
    "Butir": "Mengetahui Fungsi Alat – Alat Deteksi Barang",
    "Urutan": 59
  },
  {
    "Kode": "PK-AERO-01",
    "Krida": "Krida Pengetahuan Dirgantara",
    "KelompokSKK": "SKK Aerodinamika",
    "Butir": "Dapat menjelaskan gaya – gaya yang bekerja di pesawat",
    "Urutan": 60
  },
  {
    "Kode": "PK-AERO-02",
    "Krida": "Krida Pengetahuan Dirgantara",
    "KelompokSKK": "SKK Aerodinamika",
    "Butir": "Dapat membedakan drug, lift, gravitasi, dan trust",
    "Urutan": 61
  },
  {
    "Kode": "PK-AERO-03",
    "Krida": "Krida Pengetahuan Dirgantara",
    "KelompokSKK": "SKK Aerodinamika",
    "Butir": "Dapat menjelaskan tentang pengaruh bentuk aerodinamis yang baik terhadap pesawat",
    "Urutan": 62
  },
  {
    "Kode": "PK-AERO-04",
    "Krida": "Krida Pengetahuan Dirgantara",
    "KelompokSKK": "SKK Aerodinamika",
    "Butir": "Dapat menjelaskan tentang gaya centrifugal",
    "Urutan": 63
  },
  {
    "Kode": "JK-TM-01",
    "Krida": "Krida Jasa Kedirgantaraan",
    "KelompokSKK": "SKK Teknik Mesin Pesawat Udara",
    "Butir": "Mengetahui Tentang Cara Kerja Piston / Jet Engine",
    "Urutan": 64
  },
  {
    "Kode": "JK-TM-02",
    "Krida": "Krida Jasa Kedirgantaraan",
    "KelompokSKK": "SKK Teknik Mesin Pesawat Udara",
    "Butir": "Mengetahui Cara Perawatan Mesin Pesawat Udara",
    "Urutan": 65
  },
  {
    "Kode": "JK-TM-03",
    "Krida": "Krida Jasa Kedirgantaraan",
    "KelompokSKK": "SKK Teknik Mesin Pesawat Udara",
    "Butir": "Mengerti Kegunaan Mesin Untuk Pesawat Terbang",
    "Urutan": 66
  },
  {
    "Kode": "JK-TM-04",
    "Krida": "Krida Jasa Kedirgantaraan",
    "KelompokSKK": "SKK Teknik Mesin Pesawat Udara",
    "Butir": "Mengerti “Instrumen Engine” Pesawat Terbang",
    "Urutan": 67
  },
  {
    "Kode": "JK-TM-05",
    "Krida": "Krida Jasa Kedirgantaraan",
    "KelompokSKK": "SKK Teknik Mesin Pesawat Udara",
    "Butir": "Mengetahui Tentaang Akibat Jika Salah Satu Penerbangan Salah Satu Mesin Mati",
    "Urutan": 68
  },
  {
    "Kode": "JK-TM-06",
    "Krida": "Krida Jasa Kedirgantaraan",
    "KelompokSKK": "SKK Teknik Mesin Pesawat Udara",
    "Butir": "Mengerti Fungsi Propeller / Baling – Baling Pesawat Udara",
    "Urutan": 69
  },
  {
    "Kode": "JK-TM-07",
    "Krida": "Krida Jasa Kedirgantaraan",
    "KelompokSKK": "SKK Teknik Mesin Pesawat Udara",
    "Butir": "Dapat Menjelaskan Tentang “Air Colling”",
    "Urutan": 70
  },
  {
    "Kode": "JK-KOM-01",
    "Krida": "Krida Jasa Kedirgantaraan",
    "KelompokSKK": "SKK Komunikasi",
    "Butir": "Mengetahui Tentang Medan Magnet",
    "Urutan": 71
  },
  {
    "Kode": "JK-KOM-02",
    "Krida": "Krida Jasa Kedirgantaraan",
    "KelompokSKK": "SKK Komunikasi",
    "Butir": "Mengetahui Tentang Dasar – Dasar Radio",
    "Urutan": 72
  },
  {
    "Kode": "JK-KOM-03",
    "Krida": "Krida Jasa Kedirgantaraan",
    "KelompokSKK": "SKK Komunikasi",
    "Butir": "Mengetahui Abjad Morse Code Dan Penciptanya",
    "Urutan": 73
  },
  {
    "Kode": "JK-KOM-04",
    "Krida": "Krida Jasa Kedirgantaraan",
    "KelompokSKK": "SKK Komunikasi",
    "Butir": "Mampu Menggunakan Morse Code Peluit Untuk Memanggil Teman",
    "Urutan": 74
  },
  {
    "Kode": "JK-KOM-05",
    "Krida": "Krida Jasa Kedirgantaraan",
    "KelompokSKK": "SKK Komunikasi",
    "Butir": "Dapat Merakit Pesawat Bagian Dari Alat Radio (Speaker, Amplifier, Dll)",
    "Urutan": 75
  },
  {
    "Kode": "JK-KOM-06",
    "Krida": "Krida Jasa Kedirgantaraan",
    "KelompokSKK": "SKK Komunikasi",
    "Butir": "Mengenal Tugas – Tugas Radio Station Di Darat",
    "Urutan": 76
  },
  {
    "Kode": "JK-SP-01",
    "Krida": "Krida Jasa Kedirgantaraan",
    "KelompokSKK": "SKK Struktur Pesawat",
    "Butir": "Mampu Menjelaskan Tentang Bentuk – Bentuk Aerodinamis",
    "Urutan": 77
  },
  {
    "Kode": "JK-SP-02",
    "Krida": "Krida Jasa Kedirgantaraan",
    "KelompokSKK": "SKK Struktur Pesawat",
    "Butir": "Mampu Menjelaskan Tentang Kerangka Pesawat",
    "Urutan": 78
  },
  {
    "Kode": "JK-SP-03",
    "Krida": "Krida Jasa Kedirgantaraan",
    "KelompokSKK": "SKK Struktur Pesawat",
    "Butir": "Mampu Membuat Miniatur Kerangka Pesawat",
    "Urutan": 79
  },
  {
    "Kode": "JK-SP-04",
    "Krida": "Krida Jasa Kedirgantaraan",
    "KelompokSKK": "SKK Struktur Pesawat",
    "Butir": "Mampu Menjelaskan Sumber – Sumber Gaya Pada Pesawat",
    "Urutan": 80
  },
  {
    "Kode": "JK-SP-05",
    "Krida": "Krida Jasa Kedirgantaraan",
    "KelompokSKK": "SKK Struktur Pesawat",
    "Butir": "Mampu Menjelaskan Tentang “Central Of Gravity”",
    "Urutan": 81
  },
  {
    "Kode": "JK-SP-06",
    "Krida": "Krida Jasa Kedirgantaraan",
    "KelompokSKK": "SKK Struktur Pesawat",
    "Butir": "Dapat Menjelaskan Tentang Fungsi Dari Bagian – Bagian Kemudi Pesawat Udara (Aeleron. Flaps, Rudder)",
    "Urutan": 82
  },
  {
    "Kode": "JK-SAR-01",
    "Krida": "Krida Jasa Kedirgantaraan",
    "KelompokSKK": "SKK SAR (Search and Rescue)",
    "Butir": "Mengenal Jenis – Jenis Peralatan SAR",
    "Urutan": 83
  },
  {
    "Kode": "JK-SAR-02",
    "Krida": "Krida Jasa Kedirgantaraan",
    "KelompokSKK": "SKK SAR (Search and Rescue)",
    "Butir": "Mengenal Obat – Obatan Emergency Kit Dan PPPK",
    "Urutan": 84
  },
  {
    "Kode": "JK-SAR-03",
    "Krida": "Krida Jasa Kedirgantaraan",
    "KelompokSKK": "SKK SAR (Search and Rescue)",
    "Butir": "Mampu Memberikan Pertolongan Awal",
    "Urutan": 85
  },
  {
    "Kode": "JK-SAR-04",
    "Krida": "Krida Jasa Kedirgantaraan",
    "KelompokSKK": "SKK SAR (Search and Rescue)",
    "Butir": "Mampu Memberikan Laporan Kecelakaan Kejadian / Kecelakaan",
    "Urutan": 86
  },
  {
    "Kode": "JK-SAR-05",
    "Krida": "Krida Jasa Kedirgantaraan",
    "KelompokSKK": "SKK SAR (Search and Rescue)",
    "Butir": "Mampu Membuat Tanda – Tanda Permintaan Bantuan",
    "Urutan": 87
  },
  {
    "Kode": "JK-SAR-06",
    "Krida": "Krida Jasa Kedirgantaraan",
    "KelompokSKK": "SKK SAR (Search and Rescue)",
    "Butir": "Mampu Membaca Peta Dan Tanda - Tandanya",
    "Urutan": 88
  },
  {
    "Kode": "JK-SAR-07",
    "Krida": "Krida Jasa Kedirgantaraan",
    "KelompokSKK": "SKK SAR (Search and Rescue)",
    "Butir": "Mengenal Tanda – Tanda Pesawat Dalam Keadaan Bahaya",
    "Urutan": 89
  },
  {
    "Kode": "JK-SAR-08",
    "Krida": "Krida Jasa Kedirgantaraan",
    "KelompokSKK": "SKK SAR (Search and Rescue)",
    "Butir": "Mampu Menyampaikan Berita Musibah",
    "Urutan": 90
  },
  {
    "Kode": "JK-SAR-09",
    "Krida": "Krida Jasa Kedirgantaraan",
    "KelompokSKK": "SKK SAR (Search and Rescue)",
    "Butir": "Mengetahui Tentang Pengetahuan SAR Dan Survival",
    "Urutan": 91
  },
  {
    "Kode": "JK-SAR-10",
    "Krida": "Krida Jasa Kedirgantaraan",
    "KelompokSKK": "SKK SAR (Search and Rescue)",
    "Butir": "Mengenal Dan Dapat Menggunakan Alpeka Portable (Terbatas)",
    "Urutan": 92
  }
];

// Logo SAKA Dirgantara diambil dari template laporan kegiatan yang diberikan pengguna.
const REPORT_LOGO_BASE64 =
  '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' +
  'TSOt3aPIVRc4QuBwCHSsUb5HPRTbGNtqdO2atZTLZTzPI9Y2Y9fBwcHhZCKOIjzPY8mSh+nvH2iguqDasM21Oj7FqJ7Dm46pbdNNJpfD6PoWlIgQRTGXLL6Y' +
  'pqYm4ih2T9TBweGkwxhDIkjw2msb2b9/f0OEwBjYs3e727EcIXA4HGecPt/oBisDSqWylUJ2T9PBweENJAXJZLIBqWJAhCiM2H9gl9u1TiG4kMEpgjAMG1tY' +
  'QCaTdgPo4ODwppCCRvYsJUKhOOQG0BECh2MRgkagneaAg4PDWwhxFNPX1+28A6cYXAbaKYKOzv1ucTg4OLztISJUXHWBIwQO7qTv4ODgUKkU3SA4QuBwLBRL' +
  'eVSdLZEdHBwc3kowBnp7XbjAEQKHY6Krq6OhlsgODg4ObwEqgFKKYinvhsIRAofxsWcXNnBwcHg7QjDGNnVzY+EIgcM4UCwWbAtjBwcHh7cZ4jh2g+AIgcN4' +
  '0dnVLo4QODg4vO38A67VsSMEDvUjDEPnJXBwcHjbEYKOjn1uY3OEwKEexLGr0XVwcHh7kYFyuewGwhECh3pxsN2JFDk4OLzdDjqRGwRHCBwaQSP64A4ODg6n' +
  '4G6GMdDRecAddBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBzeIvj/ATd6tYjGrPCsAAAA' +
  'AElFTkSuQmCC';

const REPORT_THEME = {
  NAVY: '#123A5A',
  BLUE: '#1E5F8C',
  BLUE_LIGHT: '#EAF2F8',
  SURFACE: '#F7F9FB',
  BORDER: '#D7E0E8',
  TEXT: '#243447',
  MUTED: '#6B7B8C',
  WHITE: '#FFFFFF',
  GOLD: '#D99A2B',
  FONT: 'Arial'
};
// Runtime cache khusus selama satu batch import Excel.
// Cache ini hanya aktif di satu eksekusi server dan dibuang setelah batch selesai.
let IMPORT_RUNTIME_ = null;


/* =========================================================
   WEB APP
========================================================= */

function doGet(e) {
  const template = HtmlService.createTemplateFromFile('Index');
  template.initialCheckinCode = (e && e.parameter && e.parameter.checkin)
    ? String(e.parameter.checkin)
    : '';
  template.initialIzinCode = (e && e.parameter && e.parameter.izin)
    ? String(e.parameter.izin)
    : '';

  return template.evaluate()
    .setTitle(APP.NAME + ' Management System')
    // Penting untuk Google Apps Script Web App: viewport harus ditambahkan
    // pada HtmlOutput agar browser HP tidak memakai kanvas desktop ~980px
    // lalu mengecilkan seluruh UI. Meta viewport di Index tetap dipertahankan
    // sebagai fallback, tetapi addMetaTag() ini yang menjadi otoritatif.
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, viewport-fit=cover')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT);
}

function include_(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}


/**
 * JSON RPC endpoint untuk frontend Vercel.
 * Jalankan setupVercelGateway_() satu kali lalu salin secret yang muncul di log
 * ke Environment Variable GAS_API_SECRET pada Vercel.
 */
function doPost(e) {
  try {
    const raw = e && e.postData ? String(e.postData.contents || '') : '';
    if (!raw) throw new Error('Body permintaan kosong.');

    let request;
    try {
      request = JSON.parse(raw);
    } catch (_) {
      throw new Error('Body permintaan bukan JSON yang valid.');
    }

    const props = PropertiesService.getScriptProperties();
    const expectedSecret = String(props.getProperty(APP.API_GATEWAY_SECRET_PROPERTY) || '');
    const suppliedSecret = String(request.secret || '');

    if (!expectedSecret) {
      throw new Error('Gateway Vercel belum dikonfigurasi. Jalankan setupVercelGateway_() terlebih dahulu.');
    }
    if (!suppliedSecret || suppliedSecret !== expectedSecret) {
      throw new Error('Unauthorized gateway request.');
    }

    const method = String(request.method || '').trim();
    const args = Array.isArray(request.args) ? request.args : [];
    const handlers = getVercelApiHandlers_();

    if (!Object.prototype.hasOwnProperty.call(handlers, method)) {
      throw new Error('Metode API tidak diizinkan: ' + (method || '-'));
    }

    const result = handlers[method].apply(null, args);
    return apiJsonResponse_({
      success: true,
      data: apiNormalizeForJson_(result)
    });
  } catch (error) {
    console.error('Vercel API error', error);
    return apiJsonResponse_({
      success: false,
      message: error && error.message ? error.message : String(error || 'Permintaan gagal.')
    });
  }
}

function getVercelApiHandlers_() {
  return {
    checkSystemStructure: checkSystemStructure,
    closeIzinKegiatan: closeIzinKegiatan,
    deleteAbsensi: deleteAbsensi,
    deleteAnggota: deleteAnggota,
    deleteInventaris: deleteInventaris,
    deleteKas: deleteKas,
    deleteKegiatan: deleteKegiatan,
    deleteKegiatanDokumentasi: deleteKegiatanDokumentasi,
    deleteKegiatanInventaris: deleteKegiatanInventaris,
    deleteKomponenPenilaian: deleteKomponenPenilaian,
    deletePengurus: deletePengurus,
    deletePenilaianAnggota: deletePenilaianAnggota,
    deleteSurat: deleteSurat,
    deleteUser: deleteUser,
    finishExcelDatabaseImport: finishExcelDatabaseImport,
    generateKegiatanReportPdf: generateKegiatanReportPdf,
    generatePenilaianBulananPdf: generatePenilaianBulananPdf,
    getActionNotifications: getActionNotifications,
    getActionPermissionDetail: getActionPermissionDetail,
    getAttendanceLink: getAttendanceLink,
    getBatchIzinVerifikasi: getBatchIzinVerifikasi,
    getDashboardData: getDashboardData,
    getInventoryQuickOptions: getInventoryQuickOptions,
    getIzinBuktiPreview: getIzinBuktiPreview,
    getIzinLink: getIzinLink,
    getKegiatanDokumentasiPreview: getKegiatanDokumentasiPreview,
    getKegiatanReportData: getKegiatanReportData,
    getMemberAccessCard: getMemberAccessCard,
    getModulesData: getModulesData,
    getPenilaianBulanan: getPenilaianBulanan,
    getPenilaianPdfPayload: getPenilaianPdfPayload,
    getPublicCheckinData: getPublicCheckinData,
    getPublicIzinData: getPublicIzinData,
    getRolePermissions: getRolePermissions,
    getSkkChecklist: getSkkChecklist,
    getSystemAuditLog: getSystemAuditLog,
    importExcelDatabaseBatch: importExcelDatabaseBatch,
    login: login,
    logout: logout,
    markActionNotificationsRead: markActionNotificationsRead,
    publicCheckin: publicCheckin,
    publicSubmitIzin: publicSubmitIzin,
    safeResetSystem: safeResetSystem,
    saveAbsensi: saveAbsensi,
    saveAbsensiBatch: saveAbsensiBatch,
    saveAnggota: saveAnggota,
    saveInventaris: saveInventaris,
    saveKas: saveKas,
    saveKegiatan: saveKegiatan,
    saveKegiatanInventaris: saveKegiatanInventaris,
    saveKomponenPenilaian: saveKomponenPenilaian,
    saveLaporanKegiatan: saveLaporanKegiatan,
    savePengurus: savePengurus,
    savePenilaianAnggota: savePenilaianAnggota,
    saveRolePermissions: saveRolePermissions,
    saveSkkChecklist: saveSkkChecklist,
    saveSurat: saveSurat,
    saveUser: saveUser,
    transitionKegiatanStatus: transitionKegiatanStatus,
    updateKegiatanDokumentasiMetadata: updateKegiatanDokumentasiMetadata,
    updateSpreadsheetStructure: updateSpreadsheetStructure,
    uploadKegiatanDokumentasi: uploadKegiatanDokumentasi,
    uploadKegiatanInventarisPhoto: uploadKegiatanInventarisPhoto,
    verifyActionPermission: verifyActionPermission,
    verifyIzinKegiatan: verifyIzinKegiatan
  };
}

function apiJsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function apiNormalizeForJson_(value) {
  if (value === undefined) return null;
  if (value === null) return null;

  if (Object.prototype.toString.call(value) === '[object Date]') {
    return serializeValue_(value);
  }

  if (Array.isArray(value)) {
    return value.map(apiNormalizeForJson_);
  }

  if (typeof value === 'object') {
    const out = {};
    Object.keys(value).forEach(function(key) {
      out[key] = apiNormalizeForJson_(value[key]);
    });
    return out;
  }

  return value;
}

/**
 * Jalankan satu kali dari Apps Script Editor. Secret tidak ditanam di source code.
 * Buka Execution log untuk menyalin nilai GAS_API_SECRET ke Vercel.
 */
function setupVercelGateway_() {
  const props = PropertiesService.getScriptProperties();
  let secret = String(props.getProperty(APP.API_GATEWAY_SECRET_PROPERTY) || '');

  if (!secret) {
    secret = (Utilities.getUuid() + Utilities.getUuid()).replace(/-/g, '');
    props.setProperty(APP.API_GATEWAY_SECRET_PROPERTY, secret);
  }

  console.log('GAS_API_SECRET=' + secret);
  console.log('PUBLIC_APP_URL_PROPERTY=' + APP.PUBLIC_APP_URL_PROPERTY);
  console.log('Set Script Property ' + APP.PUBLIC_APP_URL_PROPERTY + ' ke URL production Vercel setelah deploy.');

  return {
    secret: secret,
    publicAppUrl: String(props.getProperty(APP.PUBLIC_APP_URL_PROPERTY) || ''),
    publicUrlProperty: APP.PUBLIC_APP_URL_PROPERTY
  };
}

function getPublicAppBaseUrl_() {
  const configured = String(
    PropertiesService.getScriptProperties().getProperty(APP.PUBLIC_APP_URL_PROPERTY) || ''
  ).trim().replace(/\/+$/, '');

  if (configured) {
    if (!/^https:\/\//i.test(configured)) {
      throw new Error('Script Property ' + APP.PUBLIC_APP_URL_PROPERTY + ' harus menggunakan URL https://');
    }
    return configured;
  }

  // Fallback menjaga deployment Apps Script lama tetap dapat dipakai selama migrasi.
  return String(ScriptApp.getService().getUrl() || '').replace(/\/+$/, '');
}


/* =========================================================
   SETUP
========================================================= */

function setupSystem_() {
  return withLock_(setupSystemCore_, false);
}

function setupSystemCore_() {
  const props = PropertiesService.getScriptProperties();
  let id = props.getProperty(APP.DB_PROPERTY);
  let ss = null;

  if (id) {
    try {
      ss = SpreadsheetApp.openById(id);
    } catch (err) {
      throw new Error('Database terkonfigurasi tidak dapat diakses. Periksa ID dan izin spreadsheet; database baru tidak dibuat otomatis.');
    }
  }

  if (!id) {
    ss = SpreadsheetApp.create('DATABASE - SAKA DIRGANTARA');
    id = ss.getId();
    props.setProperty(APP.DB_PROPERTY, id);
  }

  if (!props.getProperty(APP.SESSION_EPOCH_PROPERTY)) {
    props.setProperty(APP.SESSION_EPOCH_PROPERTY, '1');
  }

  Object.keys(APP.SHEETS).forEach((name, index) => {
    let sheet = ss.getSheetByName(name);

    if (!sheet) {
      const sheets = ss.getSheets();

      if (
        index === 0 &&
        sheets.length === 1 &&
        sheets[0].getLastRow() === 0
      ) {
        sheet = sheets[0];
        sheet.setName(name);
      } else {
        sheet = ss.insertSheet(name);
      }
    }

    ensureSheetHeaders_(sheet, APP.SHEETS[name]);
    formatSheet_(sheet, sheet.getLastColumn());
  });

  seedDefaultPenilaianComponent_();
  seedDefaultSkkComponent_();
  seedSkkMaster_();
  ensureRolePermissions_();
  const defaultAdmin = seedAdmin_();
  let automationTrigger = null;
  try {
    automationTrigger = ensureAttendanceAutomationTrigger_();
  } catch (triggerError) {
    automationTrigger = {
      active: false,
      error: String(triggerError && triggerError.message || triggerError || 'Gagal membuat trigger otomatis.')
    };
  }
  invalidateDashboardCache_();

  return {
    success: true,
    app: APP.NAME,
    version: APP.VERSION,
    databaseId: id,
    databaseUrl: 'https://docs.google.com/spreadsheets/d/' + id + '/edit',
    defaultAdmin: defaultAdmin,
    automationTrigger: automationTrigger
  };
}

function formatSheet_(sheet, columnCount) {
  const count = Math.max(Number(columnCount) || 0, 1);
  const header = sheet.getRange(1, 1, 1, count);

  header
    .setBackground('#0A1B2C')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  sheet.setFrozenRows(1);

  for (let i = 1; i <= count; i++) {
    sheet.setColumnWidth(i, 150);
  }
}

function seedAdmin_() {
  const users = getRows_('Users');

  if (users.some(u => String(u.Username).toLowerCase() === 'admin')) {
    return null;
  }

  // Password awal dibuat acak dan hanya dikembalikan oleh setupSystem_().
  // Simpan password ini dengan aman lalu ubah melalui menu Pengguna.
  const password = generateStrongPassword_();

  upsert_('Users', 'USR', {
    Username: 'admin',
    PasswordHash: hashPassword_(password),
    Nama: 'Administrator',
    Role: 'ADMIN',
    Status: 'Aktif'
  });

  return {
    username: 'admin',
    password: password
  };
}

/**
 * RECOVERY ADMIN - jalankan MANUAL dari Apps Script Editor.
 * Fungsi privat: tidak dapat dipanggil dari browser. Jalankan hanya dari editor.
 * Fungsi ini mereset/membuat akun admin dan menginvalidasi seluruh sesi lama.
 */
function resetAdministratorPassword_() {
  const username = 'admin';
  const password = generateStrongPassword_();

  return withLock_(function() {
    const users = getRows_('Users');
    const existing = users.find(function(user) {
      return String(user.Username || '').trim().toLowerCase() === username;
    });

    const saved = upsert_('Users', 'USR', {
      ID: existing ? existing.ID : '',
      Username: username,
      PasswordHash: hashPassword_(password),
      Nama: existing && existing.Nama ? existing.Nama : 'Administrator',
      Role: 'ADMIN',
      Status: 'Aktif'
    });

    const epoch = bumpSessionEpoch_();
    saveSystemLog_('SYSTEM', 'Reset Password Administrator');

    return {
      success: true,
      username: username,
      password: password,
      userId: saved.ID,
      sessionEpoch: epoch,
      message: 'Password administrator berhasil direset. Login ulang dengan kredensial yang ditampilkan.'
    };
  }, false);
}


/* =========================================================
   ROLE PERMISSIONS
========================================================= */
const ROLE_PERMISSION_MODULES_ = ['anggota','kegiatan','absensi','kas','inventaris','surat','pengurus','penilaian'];
function defaultRolePermissions_() {
  return ROLE_PERMISSION_MODULES_.map(function(module) {
    return {Role:'PENGURUS', Module:module, CanView:'TRUE', CanCreate:module !== 'pengurus' ? 'TRUE' : 'FALSE', CanEdit:module !== 'pengurus' ? 'TRUE' : 'FALSE', CanDelete:'FALSE'};
  });
}
function ensureRolePermissions_() {
  const sheet = getDatabase_().getSheetByName('RolePermissions');
  if (sheet && sheet.getLastRow() > 1) return;
  return withLock_(function() {
    const db = getDatabase_();
    let target = db.getSheetByName('RolePermissions');
    if (!target) target = db.insertSheet('RolePermissions');
    ensureSheetHeaders_(target, APP.SHEETS.RolePermissions);
    if (target.getLastRow() <= 1) {
      defaultRolePermissions_().forEach(function(row) { upsert_('RolePermissions', 'RPE', row); });
    }
  }, false);
}
function getRolePermissions(token) {
  // ADMIN mengatur permission, PENGURUS perlu membaca permission miliknya
  // agar frontend dapat membangun menu sesuai hak akses.
  requireSession_(token, ['ADMIN','PENGURUS']);
  ensureRolePermissions_();
  return { modules: ROLE_PERMISSION_MODULES_, rows: getRows_('RolePermissions') };
}
function permissionBoolean_(value) {
  return value === true || value === 1 || String(value).trim().toUpperCase() === 'TRUE';
}

function saveRolePermissions(token, rows) {
  requireSession_(token, ['ADMIN']);
  if (!Array.isArray(rows)) throw new Error('Daftar hak akses tidak valid.');
  return withLock_(function() {
    ensureRolePermissions_();
    const existing = getRows_('RolePermissions');
    const seen = new Set();
    const normalized = rows.map(function(item) {
      if (!item || String(item.Role || '').toUpperCase() !== 'PENGURUS' ||
          ROLE_PERMISSION_MODULES_.indexOf(String(item.Module || '')) < 0) {
        throw new Error('Role atau modul hak akses tidak valid.');
      }
      const module = String(item.Module);
      if (seen.has(module)) throw new Error('Modul hak akses dikirim berulang: ' + module);
      seen.add(module);
      const current = existing.find(function(row) {
        return String(row.Role).toUpperCase() === 'PENGURUS' && String(row.Module) === module;
      });
      // ID diambil dari server; ID kiriman tidak boleh menimpa modul lain.
      const record = { ID: current ? current.ID : '', Role: 'PENGURUS', Module: module };
      ['CanView','CanCreate','CanEdit','CanDelete'].forEach(function(field) {
        record[field] = permissionBoolean_(item[field]) ? 'TRUE' : 'FALSE';
      });
      if (record.CanView === 'FALSE') {
        record.CanCreate = record.CanEdit = record.CanDelete = 'FALSE';
      }
      return record;
    });
    normalized.forEach(function(record) { upsert_('RolePermissions', 'RPE', record); });
    return getRows_('RolePermissions');
  }, false);
}
function hasRolePermission_(session, module, action) {
  if (['view','create','edit','delete'].indexOf(action) < 0) return false;
  if (String(session.Role || '').toUpperCase() === 'ADMIN') return true;
  if (String(session.Role || '').toUpperCase() !== 'PENGURUS') return false;
  ensureRolePermissions_();
  const row = getRows_('RolePermissions').find(function(item){ return String(item.Role).toUpperCase()==='PENGURUS' && String(item.Module)===String(module); });
  return !!(row && permissionBoolean_(row.CanView) && String(row[action === 'view' ? 'CanView' : action === 'create' ? 'CanCreate' : action === 'edit' ? 'CanEdit' : 'CanDelete']).toUpperCase()==='TRUE');
}
function requirePermission_(token, module, action) { const session=requireSession_(token, ['ADMIN','PENGURUS']); if (!hasRolePermission_(session,module,action)) throw new Error('Pengurus tidak memiliki izin untuk '+action+' pada modul '+module+'.'); return session; }

function rateLimitHash_(value) {
  const bytes = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    String(value || ''),
    Utilities.Charset.UTF_8
  );
  return Utilities.base64EncodeWebSafe(bytes).replace(/=+$/g, '').slice(0, 28);
}

function enforceRateLimit_(scope, identity, limit, windowSeconds) {
  const cache = CacheService.getScriptCache();
  const nowSeconds = Math.floor(Date.now() / 1000);
  const bucket = Math.floor(nowSeconds / windowSeconds);
  const key = 'RL_' + scope + '_' + rateLimitHash_(identity) + '_' + bucket;
  const current = Number(cache.get(key) || 0) + 1;
  cache.put(key, String(current), Math.min(windowSeconds + 60, 21600));
  if (current > limit) {
    const retry = windowSeconds - (nowSeconds % windowSeconds);
    throw new Error('Terlalu banyak percobaan. Coba lagi sekitar ' + retry + ' detik.');
  }
}

function getMemberPinSecret_() {
  const props = PropertiesService.getScriptProperties();
  let secret = String(props.getProperty(APP.MEMBER_PIN_SECRET_PROPERTY) || '');
  if (!secret) {
    secret = Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '');
    props.setProperty(APP.MEMBER_PIN_SECRET_PROPERTY, secret);
  }
  return secret;
}

function getMemberCheckinPin_(anggota) {
  if (!anggota || !anggota.ID) throw new Error('Data anggota tidak valid untuk PIN.');
  const source = getMemberPinSecret_() + '\u0000' + String(anggota.ID) + '\u0000' + String(anggota.NTA || '');
  const bytes = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    source,
    Utilities.Charset.UTF_8
  );
  let number = 0;
  for (let i = 0; i < 4; i++) number = (number * 256 + (bytes[i] & 255)) >>> 0;
  return String(number % 1000000).padStart(6, '0');
}

function safeStringEqual_(a, b) {
  a = String(a || '');
  b = String(b || '');
  const max = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < max; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

/* =========================================================
   AUTHENTICATION
========================================================= */

function login(payload) {
  payload = payload || {};

  const username = String(payload.username || '').trim().toLowerCase();
  const password = String(payload.password || '');

  if (!username || !password) {
    throw new Error('Username dan password wajib diisi.');
  }

  enforceRateLimit_('LOGIN', username, 8, 15 * 60);

  const user = getRows_('Users').find(item =>
    String(item.Username || '').trim().toLowerCase() === username
  );

  if (!user) {
    throw new Error('Username atau password salah.');
  }

  if (String(user.Status).toLowerCase() !== 'aktif') {
    throw new Error('Akun tidak aktif.');
  }

  if (['ADMIN','PENGURUS'].indexOf(String(user.Role || '').toUpperCase()) === -1) {
    throw new Error('Role akun tidak valid. Hubungi administrator.');
  }

  if (!verifyPassword_(password, user.PasswordHash)) {
    throw new Error('Username atau password salah.');
  }

  // Hash lama (v1 SHA-256 tanpa salt) tetap dapat login, lalu dinaikkan
  // otomatis ke format salted v2 setelah verifikasi berhasil.
  if (!String(user.PasswordHash || '').startsWith('v2$')) {
    try {
      withLock_(function() {
        upsert_('Users', 'USR', {
          ID: user.ID,
          PasswordHash: hashPassword_(password)
        });
      }, false);
    } catch (_) {
      // Kegagalan upgrade hash tidak boleh menggagalkan login yang valid.
    }
  }

  const token = Utilities.getUuid().replace(/-/g, '');
  const session = {
    ID: user.ID,
    Username: user.Username,
    Nama: user.Nama,
    Role: String(user.Role || '').toUpperCase(),
    SessionEpoch: getSessionEpoch_(),
    UserEpoch: getUserSessionEpoch_(user.ID)
  };

  CacheService.getScriptCache().put(
    sessionKey_(token),
    JSON.stringify(session),
    APP.SESSION_SECONDS
  );

  saveSystemLog_(session.Nama, 'Login berhasil (' + session.Role + ')');

  return {
    token: token,
    user: publicSession_(session)
  };
}

function logout(token) {
  let actor = '';
  if (token) {
    try { actor = requireSession_(token).Nama; } catch (_) {}
    CacheService.getScriptCache().remove(sessionKey_(token));
  }
  if (actor) saveSystemLog_(actor, 'Logout');
  return { success: true };
}

function requireSession_(token, allowedRoles) {
  const raw = CacheService.getScriptCache().get(sessionKey_(token));

  if (!raw) {
    throw new Error('Sesi login berakhir. Silakan login kembali.');
  }

  const session = JSON.parse(raw);

  if (String(session.SessionEpoch || '') !== String(getSessionEpoch_())) {
    CacheService.getScriptCache().remove(sessionKey_(token));
    throw new Error('Sesi login berakhir. Silakan login kembali.');
  }

  if (String(session.UserEpoch || '') !== String(getUserSessionEpoch_(session.ID))) {
    CacheService.getScriptCache().remove(sessionKey_(token));
    throw new Error('Sesi login berakhir karena akun diperbarui. Silakan login kembali.');
  }

  CacheService.getScriptCache().put(
    sessionKey_(token),
    raw,
    APP.SESSION_SECONDS
  );

  if (
    allowedRoles &&
    allowedRoles.length &&
    allowedRoles.indexOf(String(session.Role).toUpperCase()) === -1
  ) {
    throw new Error('Anda tidak memiliki izin untuk tindakan ini.');
  }

  return session;
}

function sessionKey_(token) {
  return 'SAKA_V2_SESSION_' + String(token || '');
}

function publicSession_(session) {
  return {
    ID: session.ID,
    Username: session.Username,
    Nama: session.Nama,
    Role: session.Role
  };
}

function getSessionEpoch_() {
  const props = PropertiesService.getScriptProperties();
  let epoch = props.getProperty(APP.SESSION_EPOCH_PROPERTY);

  if (!epoch) {
    epoch = '1';
    props.setProperty(APP.SESSION_EPOCH_PROPERTY, epoch);
  }

  return epoch;
}

function bumpSessionEpoch_() {
  const props = PropertiesService.getScriptProperties();
  const current = Number(getSessionEpoch_()) || 1;
  const next = String(current + 1);
  props.setProperty(APP.SESSION_EPOCH_PROPERTY, next);
  return next;
}

function hashPassword_(password) {
  const salt = Utilities.getUuid().replace(/-/g, '') +
    Utilities.getUuid().replace(/-/g, '');
  const bytes = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    salt + '\u0000' + String(password),
    Utilities.Charset.UTF_8
  );

  return 'v2$' + salt + '$' + Utilities.base64Encode(bytes);
}

function verifyPassword_(password, storedHash) {
  const stored = String(storedHash || '');

  if (stored.startsWith('v2$')) {
    const parts = stored.split('$');
    if (parts.length !== 3 || !parts[1] || !parts[2]) return false;

    const bytes = Utilities.computeDigest(
      Utilities.DigestAlgorithm.SHA_256,
      parts[1] + '\u0000' + String(password),
      Utilities.Charset.UTF_8
    );

    return Utilities.base64Encode(bytes) === parts[2];
  }

  // Kompatibilitas hash lama agar akun existing tidak terkunci setelah update.
  const legacyBytes = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    String(password),
    Utilities.Charset.UTF_8
  );

  return Utilities.base64Encode(legacyBytes) === stored;
}

function generateStrongPassword_() {
  const random = (
    Utilities.getUuid().replace(/-/g, '') +
    Utilities.getUuid().replace(/-/g, '')
  );

  return 'Sa!' + random.substring(0, 8) + 'K#' +
    random.substring(8, 18) + '9a';
}

function userEpochKey_(userId) {
  return APP.USER_EPOCH_PREFIX + String(userId || '');
}

function getUserSessionEpoch_(userId) {
  if (!userId) return '0';

  const props = PropertiesService.getScriptProperties();
  const key = userEpochKey_(userId);
  let epoch = props.getProperty(key);

  if (!epoch) {
    epoch = '1';
    props.setProperty(key, epoch);
  }

  return epoch;
}

function bumpUserSessionEpoch_(userId) {
  if (!userId) return '0';

  const props = PropertiesService.getScriptProperties();
  const key = userEpochKey_(userId);
  const current = Number(props.getProperty(key) || '1') || 1;
  const next = String(current + 1);
  props.setProperty(key, next);
  return next;
}


/* =========================================================
   USERS
========================================================= */

function saveUser(token, data) {
  const session = requireSession_(token, ['ADMIN']);
  data = data || {};
  validateRequired_(data, ['Username','Nama','Role']);
  validateEnum_(data.Role, ['ADMIN','PENGURUS'], 'Role');
  validateEnum_(data.Status || 'Aktif', ['Aktif','Nonaktif'], 'Status');

  return withLock_(function() {
    const users = getRows_('Users');
    const existingById = data.ID
      ? users.find(item => String(item.ID) === String(data.ID))
      : null;

    if (data.ID && !existingById) {
      throw new Error('Pengguna tidak ditemukan.');
    }

    const duplicate = users.find(item =>
      String(item.Username || '').trim().toLowerCase() ===
      String(data.Username || '').trim().toLowerCase() &&
      String(item.ID) !== String(data.ID || '')
    );

    if (duplicate) {
      throw new Error('Username sudah digunakan.');
    }

    const payload = {
      ID: data.ID || '',
      Username: String(data.Username).trim(),
      Nama: String(data.Nama).trim(),
      Role: String(data.Role).toUpperCase(),
      Status: data.Status || 'Aktif'
    };

    if (String(session.ID) === String(payload.ID)) {
      if (payload.Role !== 'ADMIN' || payload.Status !== 'Aktif') {
        throw new Error('Akun yang sedang digunakan harus tetap ADMIN dan Aktif.');
      }
    }

    if (existingById && isActiveAdmin_(existingById)) {
      const willRemainActiveAdmin =
        payload.Role === 'ADMIN' && payload.Status === 'Aktif';

      if (!willRemainActiveAdmin && countActiveAdmins_(users) <= 1) {
        throw new Error('Minimal harus ada satu administrator aktif.');
      }
    }

    if (data.Password) {
      if (String(data.Password).length < 8) {
        throw new Error('Password minimal 8 karakter.');
      }
      payload.PasswordHash = hashPassword_(data.Password);
    } else if (!data.ID) {
      throw new Error('Password wajib diisi untuk pengguna baru.');
    }

    const saved = upsert_('Users', 'USR', payload);

    if (existingById) {
      const authChanged =
        String(existingById.Role || '').toUpperCase() !== payload.Role ||
        String(existingById.Status || '') !== String(payload.Status || '') ||
        Boolean(data.Password);

      if (authChanged) bumpUserSessionEpoch_(saved.ID);
    }

    return sanitizeUser_(saved);
  }, false);
}

function deleteUser(token, id) {
  const session = requireSession_(token, ['ADMIN']);

  if (String(session.ID) === String(id)) {
    throw new Error('Akun yang sedang digunakan tidak dapat dihapus.');
  }

  return withLock_(function() {
    const users = getRows_('Users');
    const target = users.find(item => String(item.ID) === String(id));

    if (!target) {
      throw new Error('Pengguna tidak ditemukan.');
    }

    if (isActiveAdmin_(target) && countActiveAdmins_(users) <= 1) {
      throw new Error('Administrator aktif terakhir tidak dapat dihapus.');
    }

    bumpUserSessionEpoch_(id);
    return deleteRow_('Users', id);
  }, false);
}

function isActiveAdmin_(user) {
  return (
    String(user.Role || '').toUpperCase() === 'ADMIN' &&
    String(user.Status || '').toLowerCase() === 'aktif'
  );
}

function countActiveAdmins_(users) {
  return (users || []).filter(isActiveAdmin_).length;
}


/* =========================================================
   APP DATA
========================================================= */

// Dashboard hanya mengirim ringkasan; data tabel dimuat per modul melalui getModulesData().
function getDashboardData(token, forceRefresh) {
  const session = requireSession_(token);
  const visible = {};
  ROLE_PERMISSION_MODULES_.forEach(function(module) {
    visible[module] = hasRolePermission_(session, module, 'view');
  });
  const scope = ROLE_PERMISSION_MODULES_.map(function(module) { return visible[module] ? '1' : '0'; }).join('');
  const props = PropertiesService.getScriptProperties();
  const databaseId = props.getProperty(APP.DB_PROPERTY);
  if (!databaseId) throw new Error('Database belum dibuat.');

  // Revisi diambil sebelum membaca Sheets: pembacaan yang berbarengan dengan
  // penulisan tidak dapat mengisi cache untuk revisi yang lebih baru.
  const revision = props.getProperty(APP.DASHBOARD_REVISION_PROPERTY) || '0';
  const key = 'SAKA_DASHBOARD_' + APP.VERSION + '_' + databaseId + '_' +
    revision + '_' + getTodayYmd_() + '_' + scope;
  let dashboard = null;
  let cache = null;
  try {
    cache = CacheService.getScriptCache();
    if (forceRefresh !== true) {
      const raw = cache.get(key);
      if (raw) dashboard = JSON.parse(raw);
    }
  } catch (_) {
    // Cache hanya optimasi; data tetap dapat dibaca ketika cache tidak tersedia.
  }

  if (!dashboard) {
    const db = SpreadsheetApp.openById(databaseId);
    dashboard = buildDashboard_(
      visible.anggota ? getRows_('Anggota', db) : [],
      visible.kegiatan ? getRows_('Kegiatan', db) : [],
      visible.absensi ? getRows_('Absensi', db) : [],
      visible.kas ? getRows_('Kas', db).map(sanitizeKas_) : [],
      visible.inventaris ? getRows_('Inventaris', db) : [],
      visible.surat ? getRows_('Surat', db) : [],
      visible.inventaris ? getRows_('KegiatanInventaris', db) : []
    );
    try {
      const value = JSON.stringify(dashboard);
      // Batas konservatif UTF-8 untuk limit CacheService 100 KB per item.
      if (cache && value.length * 3 < 100000) {
        cache.put(key, value, APP.DASHBOARD_CACHE_SECONDS);
      }
    } catch (_) {}
  }

  // Identitas dan hak akses selalu berasal dari sesi yang baru diverifikasi,
  // tidak pernah disimpan dalam cache ringkasan yang dipakai bersama.
  return {
    app: APP.NAME,
    version: APP.VERSION,
    user: publicSession_(session),
    databaseUrl: String(session.Role).toUpperCase() === 'ADMIN'
      ? 'https://docs.google.com/spreadsheets/d/' + databaseId + '/edit'
      : '',
    dashboard: dashboard,
    visibleModules: visible
  };
}

function invalidateDashboardCache_() {
  // Pastikan tulisan Sheets terlihat sebelum pembaca memakai revisi berikutnya.
  SpreadsheetApp.flush();
  PropertiesService.getScriptProperties().setProperty(
    APP.DASHBOARD_REVISION_PROPERTY, Utilities.getUuid()
  );
}


/**
 * Mengambil hanya dataset yang diminta oleh tampilan aktif.
 * Browser dapat meminta beberapa dependency dalam satu request sehingga
 * perpindahan menu hanya membaca sheet yang benar-benar dibutuhkan.
 */
function currentMemberIdentity_(rows, nameField, database) {
  const members = {};
  getRows_('Anggota', database).forEach(function(member) { members[String(member.ID)] = member; });
  return rows.map(function(row) {
    const member = members[String(row.AnggotaID || '')];
    if (!member) return row;
    const display = Object.assign({}, row);
    display[nameField] = member.Nama;
    if (Object.prototype.hasOwnProperty.call(row, 'NTA')) display.NTA = member.NTA;
    return display;
  });
}

function getModulesData(token, moduleNames) {
  const session = requireSession_(token);
  const role = String(session.Role || '').toUpperCase();
  const requested = Array.isArray(moduleNames) ? moduleNames : [moduleNames];
  const unique = [];

  requested.forEach(function(name) {
    name = String(name || '').trim();
    if (name && unique.indexOf(name) === -1) unique.push(name);
  });

  const allowed = [
    'anggota','kegiatan','absensi','kas','inventaris',
    'kegiatanInventaris','surat','pengurus','users'
  ];

  if (!unique.length) {
    return { version: APP.VERSION, user: publicSession_(session), modules: {} };
  }

  if (unique.length > 5) {
    throw new Error('Terlalu banyak modul diminta dalam satu pemuatan.');
  }

  unique.forEach(function(name) {
    if (allowed.indexOf(name) === -1) {
      throw new Error('Modul data tidak dikenali: ' + name);
    }
    if (name !== 'users' && !hasRolePermission_(session, name === 'kegiatanInventaris' ? 'inventaris' : name, 'view')) {
      throw new Error('Anda tidak memiliki izin melihat modul ' + name + '.');
    }
    if (name === 'users' && role !== 'ADMIN') {
      throw new Error('Akses data pengguna hanya tersedia untuk administrator.');
    }
  });

  const db = getDatabase_();
  const modules = {};

  unique.forEach(function(name) {
    switch (name) {
      case 'anggota':
        modules.anggota = getRows_('Anggota', db);
        break;
      case 'kegiatan':
        modules.kegiatan = getRows_('Kegiatan', db);
        break;
      case 'absensi':
        modules.absensi = currentMemberIdentity_(getRows_('Absensi', db), 'NamaAnggota', db);
        break;
      case 'kas':
        modules.kas = getRows_('Kas', db).map(sanitizeKas_);
        break;
      case 'inventaris':
        modules.inventaris = inventoryCatalog_(db);
        break;
      case 'kegiatanInventaris':
        modules.kegiatanInventaris = getRows_('KegiatanInventaris', db);
        break;
      case 'surat':
        modules.surat = getRows_('Surat', db);
        break;
      case 'pengurus':
        modules.pengurus = currentMemberIdentity_(getRows_('Pengurus', db), 'Nama', db);
        break;
      case 'users':
        modules.users = getRows_('Users', db).map(sanitizeUser_);
        break;
    }
  });

  return {
    version: APP.VERSION,
    user: publicSession_(session),
    modules: modules
  };
}

function sanitizeUser_(item) {
  return {
    ID: item.ID,
    Username: item.Username,
    Nama: item.Nama,
    Role: item.Role,
    Status: item.Status,
    DibuatPada: item.DibuatPada,
    DiubahPada: item.DiubahPada
  };
}

function sanitizeKas_(item) {
  return {
    ID: item.ID,
    Tanggal: item.Tanggal,
    Jenis: item.Jenis,
    Kategori: item.Kategori,
    Keterangan: item.Keterangan,
    Nominal: item.Nominal,
    Petugas: item.Petugas,
    NoBukti: item.NoBukti,
    KegiatanID: item.KegiatanID,
    DibuatPada: item.DibuatPada,
    DiubahPada: item.DiubahPada
  };
}

function buildDashboard_(anggota, kegiatan, absensi, kas, inventaris, surat, kegiatanInventaris) {
  kegiatanInventaris = Array.isArray(kegiatanInventaris) ? kegiatanInventaris : [];
  const tz = Session.getScriptTimeZone() || 'Asia/Jakarta';
  const now = new Date();
  const today = Utilities.formatDate(now, tz, 'yyyy-MM-dd');
  const month = Utilities.formatDate(now, tz, 'yyyy-MM');
  const previousMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const previousMonth = Utilities.formatDate(previousMonthDate, tz, 'yyyy-MM');

  function text(value) {
    return String(value || '').trim();
  }

  function lower(value) {
    return text(value).toLowerCase();
  }

  function datePrefix(value) {
    return text(value).substring(0, 10);
  }

  function isInMonth(value, targetMonth) {
    return datePrefix(value).startsWith(targetMonth);
  }

  function compareLatest(a, b) {
    const byDate = datePrefix(b.Tanggal).localeCompare(datePrefix(a.Tanggal));
    if (byDate !== 0) return byDate;
    const byCreated = text(b.DibuatPada).localeCompare(text(a.DibuatPada));
    if (byCreated !== 0) return byCreated;
    return text(b.ID).localeCompare(text(a.ID));
  }

  const activeMemberRows = anggota.filter(item => lower(item.Status) === 'aktif');
  const activeMembers = activeMemberRows.length;
  const candidateMembers = anggota.filter(item => lower(item.Status) === 'calon anggota').length;
  const nonactiveMembers = anggota.filter(item => lower(item.Status) === 'nonaktif').length;
  const alumniMembers = anggota.filter(item => lower(item.Status) === 'alumni').length;
  const newMembersThisMonth = anggota.filter(item => {
    const joined = item.TanggalGabung || item.DibuatPada;
    return isInMonth(joined, month);
  }).length;

  const kridaMap = {};
  activeMemberRows.forEach(item => {
    const key = text(item.Krida) || 'Belum ditentukan';
    kridaMap[key] = (kridaMap[key] || 0) + 1;
  });
  const kridaComposition = Object.keys(kridaMap)
    .map(name => ({ name: name, count: kridaMap[name] }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  const monthActivityRows = kegiatan.filter(item => isInMonth(item.Tanggal, month));
  const activityStatus = {
    Rencana: 0,
    Berjalan: 0,
    Selesai: 0,
    Dibatalkan: 0
  };
  monthActivityRows.forEach(item => {
    const status = text(item.Status) || 'Rencana';
    if (Object.prototype.hasOwnProperty.call(activityStatus, status)) {
      activityStatus[status]++;
    }
  });

  const liburMeetingKeys = {};
  absensi.forEach(item => {
    if (lower(item.StatusKehadiran) !== 'libur' || !isInMonth(item.Tanggal, month)) return;
    const key = text(item.KegiatanID) || (text(item.KegiatanNama) + '|' + datePrefix(item.Tanggal));
    liburMeetingKeys[key] = true;
  });
  const monthHolidayMeetings = Object.keys(liburMeetingKeys).length;

  let income = 0;
  let expense = 0;
  let monthIncome = 0;
  let monthExpense = 0;

  kas.forEach(item => {
    const amount = Number(item.Nominal || 0);
    const type = lower(item.Jenis);
    const inCurrentMonth = isInMonth(item.Tanggal, month);

    if (type === 'pemasukan') {
      income += amount;
      if (inCurrentMonth) monthIncome += amount;
    } else if (type === 'pengeluaran') {
      expense += amount;
      if (inCurrentMonth) monthExpense += amount;
    }
  });

  const recentTransactions = [...kas]
    .sort(compareLatest)
    .slice(0, 3)
    .map(item => ({
      ID: item.ID,
      Tanggal: item.Tanggal,
      Jenis: item.Jenis,
      Kategori: item.Kategori,
      Keterangan: item.Keterangan,
      Nominal: Number(item.Nominal || 0)
    }));

  function attendanceForMonth(targetMonth) {
    const rows = absensi.filter(item =>
      isInMonth(item.Tanggal, targetMonth) && lower(item.StatusKehadiran) !== 'libur'
    );
    const presentCount = rows.filter(item => lower(item.StatusKehadiran) === 'hadir').length;
    return {
      eligible: rows.length,
      present: presentCount,
      rate: rows.length ? Math.round((presentCount / rows.length) * 100) : null
    };
  }

  const currentAttendance = attendanceForMonth(month);
  const previousAttendance = attendanceForMonth(previousMonth);
  const attendanceRate = currentAttendance.rate === null ? 0 : currentAttendance.rate;
  const attendanceDelta = currentAttendance.rate !== null && previousAttendance.rate !== null
    ? currentAttendance.rate - previousAttendance.rate
    : null;

  const activityById = {};
  kegiatan.forEach(item => {
    if (item.ID) activityById[String(item.ID)] = item;
  });

  const meetingMap = {};
  absensi.forEach(item => {
    const activityId = text(item.KegiatanID);
    const fallbackName = text(item.KegiatanNama) || 'Pertemuan';
    const fallbackDate = datePrefix(item.Tanggal);
    const key = activityId || ('legacy|' + fallbackName.toLowerCase() + '|' + fallbackDate);
    const activity = activityId ? activityById[activityId] : null;

    if (!meetingMap[key]) {
      meetingMap[key] = {
        key: key,
        kegiatanId: activityId,
        nama: activity ? text(activity.NamaKegiatan) : fallbackName,
        tanggal: activity ? datePrefix(activity.Tanggal) : fallbackDate,
        lokasi: activity ? text(activity.Lokasi) : '',
        hadir: 0,
        izin: 0,
        sakit: 0,
        alpa: 0,
        libur: 0,
        inputTerbaru: ''
      };
    }

    const group = meetingMap[key];
    const status = lower(item.StatusKehadiran);
    if (status === 'hadir') group.hadir++;
    else if (status === 'izin') group.izin++;
    else if (status === 'sakit') group.sakit++;
    else if (status === 'alpa') group.alpa++;
    else if (status === 'libur') group.libur++;

    const stamp = text(item.DibuatPada) || text(item.DiubahPada);
    if (stamp > group.inputTerbaru) group.inputTerbaru = stamp;
  });

  const meetingGroups = Object.keys(meetingMap)
    .map(key => {
      const group = meetingMap[key];
      const eligible = group.hadir + group.izin + group.sakit + group.alpa;
      group.total = eligible;
      group.isLibur = group.libur > 0 && eligible === 0;
      group.rate = eligible ? Math.round((group.hadir / eligible) * 100) : null;
      return group;
    })
    .filter(group => group.tanggal)
    .sort((a, b) => {
      const byDate = String(b.tanggal).localeCompare(String(a.tanggal));
      if (byDate !== 0) return byDate;
      return String(b.inputTerbaru).localeCompare(String(a.inputTerbaru));
    });

  const pastMeetings = meetingGroups.filter(group => group.tanggal <= today);
  const lastMeeting = pastMeetings.length ? pastMeetings[0] : (meetingGroups[0] || null);
  const attendanceTrend = pastMeetings.slice(0, 5).map(group => ({
    kegiatanId: group.kegiatanId,
    nama: group.nama,
    tanggal: group.tanggal,
    rate: group.rate,
    isLibur: group.isLibur,
    hadir: group.hadir,
    total: group.total
  }));

  const inventoryCondition = {
    baik: 0,
    rusakRingan: 0,
    rusakBerat: 0,
    hilang: 0,
    lainnya: 0
  };
  let inventoryQty = 0;

  inventaris.forEach(item => {
    const qty = Number(item.Jumlah || 0);
    const damaged = Math.min(qty, inventoryDamaged_(item));
    const condition = lower(item.Kondisi);
    inventoryQty += qty;
    inventoryCondition.baik += qty - damaged;
    if (condition === 'rusak ringan') inventoryCondition.rusakRingan += damaged;
    else if (condition === 'rusak berat') inventoryCondition.rusakBerat += damaged;
    else if (condition === 'hilang') inventoryCondition.hilang += damaged;
    else inventoryCondition.lainnya += damaged;
  });

  const inventoryAttention = inventoryCondition.rusakBerat + inventoryCondition.hilang;
  const activityIdsThisMonth = {};
  kegiatan.forEach(activity => {
    if (isInMonth(activity.Tanggal, month)) activityIdsThisMonth[String(activity.ID || '')] = true;
  });
  const inventoryUsageThisMonth = kegiatanInventaris.filter(item =>
    activityIdsThisMonth[String(item.KegiatanID || '')]
  );
  const inventoryUnitsUsedThisMonth = inventoryUsageThisMonth.reduce((sum, item) =>
    sum + Math.max(0, Number(item.JumlahDipakai || 0)), 0
  );

  const monthLetters = surat.filter(item => isInMonth(item.Tanggal, month));
  const incomingLetters = monthLetters.filter(item => lower(item.Jenis) === 'surat masuk').length;
  const outgoingLetters = monthLetters.filter(item => lower(item.Jenis) === 'surat keluar').length;

  const upcoming = kegiatan
    .filter(item => {
      const date = datePrefix(item.Tanggal);
      const status = lower(item.Status);
      return date >= today && status !== 'dibatalkan' && status !== 'selesai';
    })
    .sort((a, b) => {
      const byDate = datePrefix(a.Tanggal).localeCompare(datePrefix(b.Tanggal));
      if (byDate !== 0) return byDate;
      return text(b.DibuatPada).localeCompare(text(a.DibuatPada));
    })
    .slice(0, 5);

  const missingNta = activeMemberRows.filter(item => !text(item.NTA)).length;
  const incompleteUpcoming = kegiatan.filter(item => {
    const date = datePrefix(item.Tanggal);
    const status = lower(item.Status);
    if (date < today || status === 'dibatalkan' || status === 'selesai') return false;
    return !text(item.Lokasi) || !text(item.PenanggungJawab);
  }).length;

  return {
    totalAnggota: anggota.length,
    anggotaAktif: activeMembers,
    anggotaCalon: candidateMembers,
    anggotaNonaktif: nonactiveMembers,
    anggotaAlumni: alumniMembers,
    anggotaBaruBulanIni: newMembersThisMonth,
    komposisiKrida: kridaComposition,

    kegiatanBulanIni: monthActivityRows.length,
    kegiatanRencanaBulanIni: activityStatus.Rencana,
    kegiatanBerjalanBulanIni: activityStatus.Berjalan,
    kegiatanSelesaiBulanIni: activityStatus.Selesai,
    kegiatanDibatalkanBulanIni: activityStatus.Dibatalkan,
    kegiatanLiburBulanIni: monthHolidayMeetings,

    saldo: income - expense,
    pemasukan: income,
    pengeluaran: expense,
    pemasukanBulanIni: monthIncome,
    pengeluaranBulanIni: monthExpense,
    netBulanIni: monthIncome - monthExpense,
    transaksiTerakhir: recentTransactions,

    tingkatKehadiran: attendanceRate,
    tingkatKehadiranBulanIni: attendanceRate,
    tingkatKehadiranBulanLalu: previousAttendance.rate,
    perubahanKehadiran: attendanceDelta,
    jumlahAbsensiBulanIni: currentAttendance.eligible,
    pertemuanTerakhir: lastMeeting,
    trenKehadiran: attendanceTrend,

    totalInventaris: inventoryQty,
    inventarisKondisi: inventoryCondition,
    inventarisPerluTindakLanjut: inventoryAttention,
    inventarisKegiatanBulanIni: inventoryUsageThisMonth.length,
    inventarisUnitDipakaiBulanIni: inventoryUnitsUsedThisMonth,

    totalSurat: surat.length,
    suratBulanIni: monthLetters.length,
    suratMasukBulanIni: incomingLetters,
    suratKeluarBulanIni: outgoingLetters,

    kegiatanTerbaru: upcoming,
    perhatian: {
      anggotaCalon: candidateMembers,
      anggotaNonaktif: nonactiveMembers,
      anggotaTanpaNta: missingNta,
      inventarisBermasalah: inventoryAttention,
      kegiatanBelumLengkap: incompleteUpcoming
    }
  };
}


/* =========================================================
   ANGGOTA
========================================================= */

function getTodayYmd_() {
  const tz = Session.getScriptTimeZone() || 'Asia/Jakarta';
  return Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd');
}

function datePartFromTimestamp_(value) {
  const text = String(value || '').trim();
  const match = text.match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : '';
}

function parseMemberNta_(value) {
  const nta = String(value || '').trim().toUpperCase();
  if (!nta) return null;

  // Nomor urut sengaja tetap 3 digit agar format bulan 1 digit / 2 digit
  // dapat dibaca tanpa ambigu: MULCA00142026 atau MUL00192026.
  const pattern = new RegExp(
    '^' + MEMBER_NTA.PREFIX + '(' + MEMBER_NTA.CANDIDATE_MARKER + ')?' +
    '(\\d{' + MEMBER_NTA.SEQUENCE_DIGITS + '})(1[0-2]|[1-9])(\\d{4})$'
  );
  const match = nta.match(pattern);
  if (!match) return null;

  return {
    nta: nta,
    candidate: Boolean(match[1]),
    sequence: Number(match[2]),
    month: Number(match[3]),
    year: Number(match[4])
  };
}

function formatMemberNta_(sequence, isCandidate, dateValue) {
  const seq = Number(sequence || 0);
  if (!Number.isInteger(seq) || seq < 1 || seq > MEMBER_NTA.MAX_SEQUENCE) {
    throw new Error('Nomor urut NTA tidak valid atau sudah melebihi 999 anggota.');
  }

  const dateText = String(dateValue || '').trim();
  validateDateString_(dateText, isCandidate ? 'Tanggal pendaftaran' : 'Tanggal pelantikan');
  const parts = dateText.split('-').map(Number);
  const month = String(parts[1]); // sesuai format yang diminta: April = 4, September = 9
  const year = String(parts[0]);
  const serial = String(seq).padStart(MEMBER_NTA.SEQUENCE_DIGITS, '0');

  return MEMBER_NTA.PREFIX +
    (isCandidate ? MEMBER_NTA.CANDIDATE_MARKER : '') +
    serial + month + year;
}

function nextMemberNtaSequence_(rows) {
  let maxSequence = 0;

  (rows || []).forEach(function(item) {
    const stored = Number(item.NTAUrut || 0);
    if (Number.isInteger(stored) && stored > maxSequence) {
      maxSequence = stored;
    }

    const parsed = parseMemberNta_(item.NTA);
    if (parsed && parsed.sequence > maxSequence) {
      maxSequence = parsed.sequence;
    }
  });

  const next = maxSequence + 1;
  if (next > MEMBER_NTA.MAX_SEQUENCE) {
    throw new Error('Nomor urut NTA otomatis sudah mencapai batas 999 anggota.');
  }
  return next;
}

function saveAnggota(token, data) {
  data = data || {};
  requirePermission_(token, 'anggota', data.ID ? 'edit' : 'create');
  validateRequired_(data, ['Nama']);

  const isImport = Boolean(IMPORT_RUNTIME_);
  const defaultStatus = isImport ? 'Aktif' : 'Calon Anggota';
  data.Status = String(data.Status || defaultStatus).trim();
  validateEnum_(
    data.Status,
    ['Calon Anggota','Aktif','Nonaktif','Alumni'],
    'Status'
  );

  if (data.JenisKelamin) {
    validateEnum_(data.JenisKelamin, ['Laki-laki','Perempuan'], 'Jenis kelamin');
  }

  if (data.Krida) {
    data.Krida = normalizeKridaValue_(data.Krida);
    if (String(data.Krida).length > 120) {
      throw new Error('Krida terlalu panjang.');
    }
  }

  if (data.TanggalLahir) validateDateString_(data.TanggalLahir, 'Tanggal lahir');
  if (data.TanggalGabung) validateDateString_(data.TanggalGabung, 'Tanggal bergabung');
  if (data.TanggalPelantikan) validateDateString_(data.TanggalPelantikan, 'Tanggal pelantikan');

  data.Nama = String(data.Nama).trim();

  return withLock_(function() {
    const rows = getRows_('Anggota');
    const existing = data.ID
      ? rows.find(function(item) { return String(item.ID) === String(data.ID); })
      : null;

    if (data.ID && !existing) {
      throw new Error('Data anggota yang akan diperbarui tidak ditemukan.');
    }

    const today = getTodayYmd_();
    const existingNta = String(existing && existing.NTA || '').trim();
    const incomingNta = String(data.NTA || '').trim();
    const existingParsed = parseMemberNta_(existingNta);

    // TanggalGabung sekarang menjadi tanggal anggota pertama kali dimasukkan.
    // UI tidak perlu mengisinya lagi. Import lama tetap boleh membawa nilainya.
    data.TanggalGabung = String(
      data.TanggalGabung ||
      (existing && existing.TanggalGabung) ||
      (existing && datePartFromTimestamp_(existing.DibuatPada)) ||
      today
    ).trim();
    validateDateString_(data.TanggalGabung, 'Tanggal bergabung');

    // Jalur import dibuat kompatibel dengan database lama. Bila file Excel
    // membawa NTA sendiri, NTA tersebut dipertahankan dan tidak ditulis ulang.
    if (isImport && incomingNta) {
      const importedParsed = parseMemberNta_(incomingNta);
      data.NTA = incomingNta;
      data.NTAUrut = importedParsed
        ? importedParsed.sequence
        : Number(existing && existing.NTAUrut || 0) || '';

      if (!Object.prototype.hasOwnProperty.call(data, 'TanggalPelantikan')) {
        data.TanggalPelantikan = existing && existing.TanggalPelantikan || '';
      }

      const duplicateImport = rows.find(function(item) {
        return String(item.NTA || '').trim().toLowerCase() === incomingNta.toLowerCase() &&
          String(item.ID) !== String(data.ID || '');
      });
      if (duplicateImport) throw new Error('NTA sudah digunakan oleh anggota lain.');

      return upsert_('Anggota', 'AGT', data);
    }

    // Data lama dengan format NTA yang tidak mengikuti pola MUL... dipertahankan.
    // Dengan demikian update nama/alamat anggota lama tidak mengubah NTA historis.
    const isLegacyNta = Boolean(existingNta && !existingParsed);

    let sequence = Number(existing && existing.NTAUrut || 0);
    if (!sequence && existingParsed) sequence = existingParsed.sequence;
    if (!sequence && !isLegacyNta) sequence = nextMemberNtaSequence_(rows);

    if (sequence) data.NTAUrut = sequence;

    const existingPelantikan = String(existing && existing.TanggalPelantikan || '').trim();
    const requestedPelantikan = String(data.TanggalPelantikan || '').trim();
    const hasOfficialHistory = Boolean(existingPelantikan);

    if (!existing && ['Nonaktif','Alumni'].indexOf(data.Status) !== -1) {
      throw new Error('Anggota baru hanya dapat berstatus Calon Anggota atau Aktif.');
    }

    if (data.Status === 'Calon Anggota' && hasOfficialHistory) {
      throw new Error(
        'Anggota yang sudah pernah terlantik tidak dapat dikembalikan menjadi Calon Anggota. ' +
        'Gunakan status Aktif, Nonaktif, atau Alumni.'
      );
    }

    if (data.Status === 'Alumni' && !hasOfficialHistory && !requestedPelantikan) {
      throw new Error('Status Alumni hanya dapat digunakan untuk anggota yang sudah terlantik.');
    }

    if (data.Status === 'Aktif') {
      const inaugurationDate = requestedPelantikan || existingPelantikan;
      if (!inaugurationDate) {
        throw new Error('Tanggal Pelantikan wajib diisi saat status anggota menjadi Aktif.');
      }
      validateDateString_(inaugurationDate, 'Tanggal pelantikan');
      data.TanggalPelantikan = inaugurationDate;

      if (isLegacyNta) {
        data.NTA = existingNta;
      } else {
        data.NTA = formatMemberNta_(sequence, false, inaugurationDate);
      }
    } else if (hasOfficialHistory || requestedPelantikan) {
      // Nonaktif/Alumni yang sebelumnya sudah terlantik tetap membawa NTA resmi.
      const inaugurationDate = requestedPelantikan || existingPelantikan;
      validateDateString_(inaugurationDate, 'Tanggal pelantikan');
      data.TanggalPelantikan = inaugurationDate;

      if (isLegacyNta) {
        data.NTA = existingNta;
      } else {
        data.NTA = formatMemberNta_(sequence, false, inaugurationDate);
      }
    } else {
      // Belum pernah terlantik. NTA tetap berstatus CA, termasuk jika calon
      // kemudian dinonaktifkan sebelum pelantikan.
      data.TanggalPelantikan = '';
      if (isLegacyNta) {
        data.NTA = existingNta;
      } else {
        data.NTA = formatMemberNta_(sequence, true, data.TanggalGabung);
      }
    }

    const duplicate = rows.find(function(item) {
      return String(item.NTA || '').trim().toLowerCase() === String(data.NTA || '').toLowerCase() &&
        String(item.ID) !== String(data.ID || '');
    });
    if (duplicate) throw new Error('NTA otomatis bertabrakan dengan anggota lain.');

    return upsert_('Anggota', 'AGT', data);
  });
}

function deleteAnggota(token, id) {
  requirePermission_(token, 'anggota', 'delete');

  return withLock_(function() {
    const attendanceRef = getRows_('Absensi').some(item =>
      String(item.AnggotaID) === String(id)
    );
    const officerRef = getRows_('Pengurus').some(item =>
      String(item.AnggotaID) === String(id)
    );

    const otherRef = ['IzinKegiatan','PenilaianAnggota'].some(function(name) {
      return getRows_(name).some(function(row) { return String(row.AnggotaID || '') === String(id); });
    });

    if (attendanceRef || officerRef || otherRef) {
      throw new Error(
        'Anggota masih dipakai pada absensi, pengurus, izin, atau penilaian. ' +
        'Nonaktifkan anggota agar riwayat tetap terjaga.'
      );
    }

    return deleteRow_('Anggota', id);
  });
}


/* =========================================================
   KEGIATAN
========================================================= */

function normalizeKegiatanStatus_(value) {
  const status = String(value || 'Rencana').trim();
  const allowed = ['Rencana','Berjalan','Selesai','Dibatalkan'];
  if (allowed.indexOf(status) === -1) {
    throw new Error('Status kegiatan tidak valid.');
  }
  return status;
}

function allowedKegiatanTransitions_(status) {
  const map = {
    Rencana: ['Berjalan','Dibatalkan'],
    Berjalan: ['Selesai','Dibatalkan'],
    Selesai: [],
    Dibatalkan: []
  };
  return map[normalizeKegiatanStatus_(status)] || [];
}

function saveKegiatan(token, data) {
  data = data || {};
  requirePermission_(token, 'kegiatan', data.ID ? 'edit' : 'create');
  validateRequired_(data, ['NamaKegiatan','Tanggal']);
  validateDateString_(data.Tanggal, 'Tanggal kegiatan');

  if (data.Jenis) {
    validateEnum_(
      data.Jenis,
      ['Latihan','Rapat','Pendidikan','Bakti Sosial','Kunjungan','Upacara','Lainnya'],
      'Jenis kegiatan'
    );
  }

  data.NamaKegiatan = String(data.NamaKegiatan).trim();
  data.PenanggungJawab = String(data.PenanggungJawab || '').trim();
  if (data.PenanggungJawab.length > 180) {
    throw new Error('Penanggung jawab terlalu panjang. Maksimum 180 karakter.');
  }

  return withLock_(function() {
    // Status kegiatan adalah state machine. Pada transaksi UI biasa, status
    // tidak boleh diubah melalui form saveKegiatan(). Import database tetap
    // boleh mempertahankan status sumber untuk kompatibilitas pemulihan data.
    if (!IMPORT_RUNTIME_) {
      if (data.ID) {
        const current = findById_('Kegiatan', data.ID);
        if (!current) throw new Error('Kegiatan tidak ditemukan.');
        const currentStatus = normalizeKegiatanStatus_(current.Status);
        if (['Selesai','Dibatalkan'].indexOf(currentStatus) !== -1) {
          throw new Error('Kegiatan berstatus ' + currentStatus + ' bersifat final dan metadata utamanya tidak dapat diedit.');
        }
        const requestedStatus = String(data.Status || '').trim();
        if (requestedStatus && requestedStatus !== currentStatus) {
          throw new Error('Status kegiatan hanya dapat diubah melalui aksi alur kegiatan.');
        }
        data.Status = currentStatus;
      } else {
        const requestedStatus = String(data.Status || '').trim();
        if (requestedStatus && requestedStatus !== 'Rencana') {
          throw new Error('Kegiatan baru harus dimulai dari status Rencana.');
        }
        data.Status = 'Rencana';
      }
    } else {
      data.Status = normalizeKegiatanStatus_(data.Status || 'Rencana');
    }

    const saved = upsert_('Kegiatan', 'KGT', data);

    // Saat edit metadata, Kegiatan adalah sumber utama (single source of truth).
    // Snapshot nama/tanggal pada Absensi ikut disinkronkan secara bulk.
    if (!IMPORT_RUNTIME_) {
      saved.SyncAbsensi = syncAbsensiForKegiatanBatch_([saved]);
    }

    return saved;
  });
}

function transitionKegiatanStatus(token, kegiatanId, targetStatus, alasan) {
  const session = requirePermission_(token, 'kegiatan', 'edit');
  const id = String(kegiatanId || '').trim();
  if (!id) throw new Error('Kegiatan tidak valid.');

  targetStatus = normalizeKegiatanStatus_(targetStatus);
  alasan = String(alasan || '').trim();

  return withLock_(function() {
    const db = getDatabase_();
    const current = getRows_('Kegiatan', db).find(function(item) {
      return String(item.ID || '') === id;
    }) || null;
    if (!current) throw new Error('Kegiatan tidak ditemukan.');

    const fromStatus = normalizeKegiatanStatus_(current.Status);
    if (fromStatus === targetStatus) return current;

    const allowed = allowedKegiatanTransitions_(fromStatus);
    if (allowed.indexOf(targetStatus) === -1) {
      throw new Error(
        'Transisi kegiatan tidak diizinkan: ' + fromStatus + ' → ' + targetStatus + '.'
      );
    }

    const patch = {
      ID: current.ID,
      Status: targetStatus
    };

    if (targetStatus === 'Dibatalkan') {
      if (!alasan) throw new Error('Alasan pembatalan wajib diisi.');
      if (alasan.length > 500) throw new Error('Alasan pembatalan maksimum 500 karakter.');
      const previousNote = String(current.Keterangan || '').trim();
      patch.Keterangan = [previousNote, 'Alasan pembatalan: ' + alasan]
        .filter(Boolean)
        .join('\n');
    }

    const saved = upsert_('Kegiatan', 'KGT', patch);
    let autoIzin = null;
    let autoAbsensi = null;

    // Jalankan rekonsiliasi deadline izin ketika kegiatan mulai/selesai.
    // Ini membuat aturan tetap berlaku walau trigger periodik terlambat beberapa menit.
    if (targetStatus === 'Berjalan' || targetStatus === 'Selesai') {
      autoIzin = expirePendingIzinAtDeadlineCore_(db, new Date(), id);
    }

    // Saat kegiatan selesai, seluruh anggota Aktif/Calon Anggota yang belum
    // memiliki catatan absensi langsung difinalkan. Status yang sudah ada tidak
    // pernah ditimpa. Izin yang sudah disetujui menjadi Izin/Sakit, sisanya Alpa.
    if (targetStatus === 'Selesai') {
      const refreshed = Object.assign({}, current, saved, { Status: 'Selesai' });
      autoAbsensi = finalizeAttendanceForCompletedKegiatanCore_(db, refreshed, new Date());
      saved.AutoAbsensi = autoAbsensi;
      saved.AutoIzin = autoIzin;
    }

    saveSystemLog_(
      session.Nama,
      'Transisi kegiatan ' + String(current.NamaKegiatan || current.ID) +
      ': ' + fromStatus + ' -> ' + targetStatus +
      (autoAbsensi && autoAbsensi.created ? ' | auto absensi ' + autoAbsensi.created + ' anggota' : '')
    );
    return saved;
  });
}


/* =========================================================
   IZIN ANGGOTA PER KEGIATAN
   - Link dapat dibagikan sejak kegiatan dibuat.
   - Pengajuan otomatis dibuka H-3 pukul 00.00 waktu script.
   - Pengajuan otomatis ditutup Hari H pukul 07.00.
   - ADMIN/PENGURUS dapat menutup lebih awal secara manual.
   - Pengajuan disimpan terpisah dari Absensi; verifikasi/finalisasi menyinkronkan status kehadiran.
========================================================= */

function ensureIzinKegiatanSheet_() {
  const ss = getDatabase_();
  let sheet = ss.getSheetByName('IzinKegiatan');
  if (!sheet) {
    sheet = ss.insertSheet('IzinKegiatan');
    ensureSheetHeaders_(sheet, APP.SHEETS.IzinKegiatan);
    formatSheet_(sheet, sheet.getLastColumn());
  } else {
    ensureSheetHeaders_(sheet, APP.SHEETS.IzinKegiatan);
  }
  return sheet;
}

function parseYmdAtTime_(ymd, hhmm) {
  const tz = APP.IZIN_TIME_ZONE;
  const dateText = String(ymd || '').substring(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateText)) {
    throw new Error('Tanggal kegiatan tidak valid.');
  }
  return Utilities.parseDate(dateText + ' ' + String(hhmm || '00:00'), tz, 'yyyy-MM-dd HH:mm');
}

function formatIzinDateTime_(date) {
  return Utilities.formatDate(
    date,
    APP.IZIN_TIME_ZONE,
    'dd/MM/yyyy HH:mm'
  );
}

function isPendingIzinStatus_(value) {
  return ['Menunggu Verifikasi','Terkirim'].indexOf(String(value || '').trim()) !== -1;
}

function getIzinVerificationDeadline_(kegiatan) {
  if (!kegiatan) throw new Error('Kegiatan tidak ditemukan.');
  const activityDate = String(kegiatan.Tanggal || '').substring(0, 10);
  return parseYmdAtTime_(activityDate, APP.IZIN_VERIFY_DEADLINE_HHMM);
}

function attendanceKey_(kegiatanId, anggotaId) {
  return String(kegiatanId || '') + '|' + String(anggotaId || '');
}

function isAutomaticAlpaAttendance_(attendance) {
  if (!attendance) return false;
  return String(attendance.StatusKehadiran || '') === 'Alpa' &&
    String(attendance.Metode || '').trim().toLowerCase() === 'otomatis';
}

function approvedIzinAttendanceStatus_(izin) {
  return String(izin && izin.JenisPengajuan || 'Izin') === 'Sakit' ? 'Sakit' : 'Izin';
}

function isEligibleAttendanceMember_(member) {
  const status = String(member && member.Status || '').trim().toLowerCase();
  return status === 'aktif' || status === 'calon anggota';
}

/**
 * Menambahkan catatan Absensi otomatis tanpa menimpa catatan yang sudah ada.
 * requests: [{kegiatan, AnggotaID, NamaAnggota, StatusKehadiran, Catatan}]
 */
function appendAutomaticAttendanceRows_(db, requests, nowText) {
  requests = Array.isArray(requests) ? requests : [];
  if (!requests.length) return { created: 0, skippedExisting: 0, rows: [] };

  const sheet = db.getSheetByName('Absensi');
  if (!sheet) throw new Error('Sheet Absensi tidak ditemukan.');
  const expectedHeaders = APP.SHEETS.Absensi;
  const headers = ensureSheetHeaders_(sheet, expectedHeaders);
  nowText = nowText || Utilities.formatDate(new Date(), APP.IZIN_TIME_ZONE, 'yyyy-MM-dd HH:mm:ss');

  const existingKeys = {};
  const liburByKegiatan = {};
  getRows_('Absensi', db).forEach(function(item) {
    const kegiatanId = String(item.KegiatanID || '');
    if (String(item.StatusKehadiran || '') === 'Libur') {
      liburByKegiatan[kegiatanId] = true;
      return;
    }
    const anggotaId = String(item.AnggotaID || '');
    if (kegiatanId && anggotaId) existingKeys[attendanceKey_(kegiatanId, anggotaId)] = true;
  });

  const appendValues = [];
  const createdRows = [];
  let skippedExisting = 0;

  requests.forEach(function(input) {
    input = input || {};
    const kegiatan = input.kegiatan || {};
    const kegiatanId = String(kegiatan.ID || input.KegiatanID || '').trim();
    const anggotaId = String(input.AnggotaID || '').trim();
    if (!kegiatanId || !anggotaId) return;
    if (liburByKegiatan[kegiatanId]) return;

    const key = attendanceKey_(kegiatanId, anggotaId);
    if (existingKeys[key]) {
      skippedExisting++;
      return;
    }

    const status = String(input.StatusKehadiran || 'Alpa').trim();
    validateEnum_(status, ['Hadir','Izin','Sakit','Alpa'], 'Status kehadiran otomatis');

    const record = {
      ID: createId_('ABS'),
      KegiatanID: kegiatanId,
      KegiatanNama: String(kegiatan.NamaKegiatan || input.KegiatanNama || ''),
      Tanggal: String(kegiatan.Tanggal || input.Tanggal || '').substring(0, 10),
      AnggotaID: anggotaId,
      NamaAnggota: String(input.NamaAnggota || ''),
      StatusKehadiran: status,
      Catatan: String(input.Catatan || '').trim(),
      Metode: 'Otomatis',
      DibuatPada: nowText,
      DiubahPada: nowText
    };

    const values = headers.map(function(header) {
      if (!header || expectedHeaders.indexOf(header) === -1) return '';
      return Object.prototype.hasOwnProperty.call(record, header) ? record[header] : '';
    });

    appendValues.push(values);
    createdRows.push(serializeObject_(record));
    existingKeys[key] = true;
  });

  if (appendValues.length) {
    sheet.getRange(sheet.getLastRow() + 1, 1, appendValues.length, headers.length)
      .setValues(sheetLiteralRows_(appendValues));
  }

  return {
    created: createdRows.length,
    skippedExisting: skippedExisting,
    rows: createdRows
  };
}

/**
 * Menutup otomatis pengajuan yang belum diverifikasi sampai pukul 16.00 Hari H.
 * Pengajuan berubah menjadi Ditolak oleh Sistem Otomatis. Jika kegiatan sudah
 * Berjalan/Selesai dan belum ada absensi, anggota dicatat Alpa.
 */
function expirePendingIzinAtDeadlineCore_(db, now, onlyKegiatanId) {
  now = now || new Date();
  onlyKegiatanId = String(onlyKegiatanId || '').trim();

  const sheet = db.getSheetByName('IzinKegiatan');
  if (!sheet || sheet.getLastRow() <= 1) {
    return { expired: 0, attendanceCreated: 0, rows: [] };
  }

  const headers = ensureSheetHeaders_(sheet, APP.SHEETS.IzinKegiatan);
  const raw = sheet.getRange(2, 1, sheet.getLastRow() - 1, headers.length).getValues();
  const idx = {};
  headers.forEach(function(header, index) { idx[header] = index; });

  const kegiatanById = {};
  getRows_('Kegiatan', db).forEach(function(item) {
    kegiatanById[String(item.ID || '')] = item;
  });

  const nowText = Utilities.formatDate(now, APP.IZIN_TIME_ZONE, 'yyyy-MM-dd HH:mm:ss');
  const autoNote = 'Otomatis ditolak karena belum diverifikasi sampai batas pukul 16.00 Hari H.';
  const expiredRows = [];
  const attendanceRequests = [];
  let changed = false;

  raw.forEach(function(row) {
    const item = rowToObject_(headers, row);
    const kegiatanId = String(item.KegiatanID || '').trim();
    if (onlyKegiatanId && kegiatanId !== onlyKegiatanId) return;

    const kegiatan = kegiatanById[kegiatanId];
    if (!kegiatan) return;
    const activityStatus = normalizeKegiatanStatus_(kegiatan.Status || 'Rencana');
    if (activityStatus === 'Dibatalkan') return;

    const deadline = getIzinVerificationDeadline_(kegiatan);
    if (now.getTime() < deadline.getTime()) return;

    if (isPendingIzinStatus_(item.Status)) {
      row[idx.Status] = 'Ditolak';
      row[idx.DiverifikasiPada] = nowText;
      row[idx.DiverifikasiOleh] = 'Sistem Otomatis';
      row[idx.CatatanVerifikasi] = autoNote;
      if (idx.DiubahPada !== undefined) row[idx.DiubahPada] = nowText;
      changed = true;

      const expired = Object.assign({}, item, {
        Status: 'Ditolak',
        DiverifikasiPada: nowText,
        DiverifikasiOleh: 'Sistem Otomatis',
        CatatanVerifikasi: autoNote
      });
      expiredRows.push(serializeObject_(expired));
    }

    // Recovery idempotent: baris yang sudah pernah ditolak otomatis tetap
    // diperiksa pada eksekusi berikutnya. Jika pembuatan Absensi sempat gagal
    // atau kegiatan baru dimulai setelah pukul 16.00, Alpa tetap akan dibuat.
    const effectiveStatus = String(row[idx.Status] || item.Status || '');
    const effectiveVerifier = String(row[idx.DiverifikasiOleh] || item.DiverifikasiOleh || '');
    if (
      effectiveStatus === 'Ditolak' &&
      effectiveVerifier === 'Sistem Otomatis' &&
      (activityStatus === 'Berjalan' || activityStatus === 'Selesai')
    ) {
      attendanceRequests.push({
        kegiatan: kegiatan,
        AnggotaID: item.AnggotaID,
        NamaAnggota: item.NamaAnggota,
        StatusKehadiran: 'Alpa',
        Catatan: 'Otomatis Alpa: pengajuan izin belum diverifikasi sampai pukul 16.00 Hari H.'
      });
    }
  });

  if (changed) {
    sheet.getRange(2, 1, raw.length, headers.length).setValues(sheetLiteralRows_(raw));
  }

  const attendance = appendAutomaticAttendanceRows_(db, attendanceRequests, nowText);
  return {
    expired: expiredRows.length,
    attendanceCreated: attendance.created,
    rows: expiredRows,
    attendanceRows: attendance.rows
  };
}

/**
 * Finalisasi absensi ketika status kegiatan berubah menjadi Selesai.
 * Seluruh anggota Aktif/Calon Anggota yang belum memiliki absensi akan dibuatkan
 * catatan otomatis. Izin/Sakit yang sudah disetujui dipertahankan, selain itu Alpa.
 * Pengajuan yang masih menunggu dapat mengubah Alpa otomatis menjadi Izin/Sakit
 * jika disetujui sebelum batas 16.00 Hari H.
 */
function finalizeAttendanceForCompletedKegiatanCore_(db, kegiatan, now) {
  if (!kegiatan || !kegiatan.ID) throw new Error('Kegiatan tidak valid untuk finalisasi absensi.');
  now = now || new Date();
  const kegiatanId = String(kegiatan.ID || '');
  const nowText = Utilities.formatDate(now, APP.IZIN_TIME_ZONE, 'yyyy-MM-dd HH:mm:ss');

  const attendanceRows = getRows_('Absensi', db).filter(function(item) {
    return String(item.KegiatanID || '') === kegiatanId;
  });
  if (attendanceRows.some(function(item) { return String(item.StatusKehadiran || '') === 'Libur'; })) {
    return { created: 0, eligible: 0, preserved: 0, skippedLibur: true, rows: [] };
  }

  const existingByMember = {};
  attendanceRows.forEach(function(item) {
    if (String(item.StatusKehadiran || '') === 'Libur') return;
    const anggotaId = String(item.AnggotaID || '');
    if (anggotaId) existingByMember[anggotaId] = item;
  });

  const izinByMember = {};
  getRows_('IzinKegiatan', db)
    .filter(function(item) { return String(item.KegiatanID || '') === kegiatanId; })
    .forEach(function(item) {
      const anggotaId = String(item.AnggotaID || '');
      if (!anggotaId) return;
      const previous = izinByMember[anggotaId];
      if (!previous || String(item.DiubahPada || item.DikirimPada || '') >= String(previous.DiubahPada || previous.DikirimPada || '')) {
        izinByMember[anggotaId] = item;
      }
    });

  const eligible = getRows_('Anggota', db).filter(isEligibleAttendanceMember_);
  const requests = [];
  let preserved = 0;
  let pendingProvisional = 0;

  eligible.forEach(function(member) {
    const anggotaId = String(member.ID || '');
    if (!anggotaId) return;
    if (existingByMember[anggotaId]) {
      preserved++;
      return;
    }

    const izin = izinByMember[anggotaId] || null;
    let status = 'Alpa';
    let note = 'Otomatis Alpa saat kegiatan diselesaikan karena belum ada catatan kehadiran.';

    if (izin && String(izin.Status || '') === 'Disetujui') {
      status = approvedIzinAttendanceStatus_(izin);
      note = 'Otomatis dari pengajuan ' + status + ' yang telah disetujui.';
    } else if (izin && isPendingIzinStatus_(izin.Status)) {
      pendingProvisional++;
      note = 'Otomatis Alpa saat kegiatan selesai. Pengajuan ' +
        String(izin.JenisPengajuan || 'izin') +
        ' masih menunggu verifikasi dan dapat diperbarui sampai pukul 16.00 Hari H.';
    } else if (izin && String(izin.Status || '') === 'Ditolak') {
      note = 'Otomatis Alpa karena pengajuan ' + String(izin.JenisPengajuan || 'izin') + ' ditolak.';
    }

    requests.push({
      kegiatan: kegiatan,
      AnggotaID: anggotaId,
      NamaAnggota: member.Nama,
      StatusKehadiran: status,
      Catatan: note
    });
  });

  const appended = appendAutomaticAttendanceRows_(db, requests, nowText);
  const createdStatus = { Hadir: 0, Izin: 0, Sakit: 0, Alpa: 0 };
  appended.rows.forEach(function(item) {
    const status = String(item.StatusKehadiran || '');
    if (Object.prototype.hasOwnProperty.call(createdStatus, status)) createdStatus[status]++;
  });

  return {
    created: appended.created,
    eligible: eligible.length,
    preserved: preserved,
    pendingProvisional: pendingProvisional,
    izin: createdStatus.Izin,
    sakit: createdStatus.Sakit,
    alpa: createdStatus.Alpa,
    rows: appended.rows
  };
}

/**
 * Sinkronisasi absensi setelah Pengurus memverifikasi pengajuan pada kegiatan
 * yang sudah selesai. Hanya Alpa otomatis yang boleh ditimpa menjadi Izin/Sakit.
 */
function syncVerifiedIzinAttendanceCore_(db, kegiatan, izin, target, now) {
  now = now || new Date();
  const kegiatanId = String(kegiatan && kegiatan.ID || '');
  const anggotaId = String(izin && izin.AnggotaID || '');
  if (!kegiatanId || !anggotaId) return { changed: false };

  const attendance = getRows_('Absensi', db).find(function(row) {
    return String(row.KegiatanID || '') === kegiatanId &&
      String(row.AnggotaID || '') === anggotaId &&
      String(row.StatusKehadiran || '') !== 'Libur';
  }) || null;
  const isFinished = normalizeKegiatanStatus_(kegiatan.Status || 'Rencana') === 'Selesai';
  const nowText = Utilities.formatDate(now, APP.IZIN_TIME_ZONE, 'yyyy-MM-dd HH:mm:ss');

  if (target === 'Disetujui') {
    const expected = approvedIzinAttendanceStatus_(izin);
    if (attendance) {
      if (String(attendance.StatusKehadiran || '') === expected) return { changed: false, attendance: attendance };
      if (!isAutomaticAlpaAttendance_(attendance)) {
        throw new Error('Absensi anggota sudah tercatat sebagai ' + String(attendance.StatusKehadiran || '-') + ' dan tidak dapat ditimpa otomatis.');
      }
      const updated = upsert_('Absensi', 'ABS', {
        ID: attendance.ID,
        StatusKehadiran: expected,
        Catatan: 'Otomatis diperbarui menjadi ' + expected + ' setelah pengajuan disetujui sebelum batas pukul 16.00.',
        Metode: 'Otomatis'
      });
      return { changed: true, updated: true, attendance: updated };
    }

    if (isFinished) {
      const appended = appendAutomaticAttendanceRows_(db, [{
        kegiatan: kegiatan,
        AnggotaID: anggotaId,
        NamaAnggota: izin.NamaAnggota,
        StatusKehadiran: expected,
        Catatan: 'Otomatis dari pengajuan ' + expected + ' yang disetujui.'
      }], nowText);
      return { changed: appended.created > 0, created: appended.created > 0, attendance: appended.rows[0] || null };
    }
  }

  if (target === 'Ditolak' && isFinished) {
    if (attendance && isAutomaticAlpaAttendance_(attendance)) {
      const updatedAlpa = upsert_('Absensi', 'ABS', {
        ID: attendance.ID,
        StatusKehadiran: 'Alpa',
        Catatan: 'Otomatis Alpa karena pengajuan ' + String(izin.JenisPengajuan || 'izin') + ' ditolak.',
        Metode: 'Otomatis'
      });
      return { changed: true, updated: true, attendance: updatedAlpa };
    }
    if (!attendance) {
      const appendedAlpa = appendAutomaticAttendanceRows_(db, [{
        kegiatan: kegiatan,
        AnggotaID: anggotaId,
        NamaAnggota: izin.NamaAnggota,
        StatusKehadiran: 'Alpa',
        Catatan: 'Otomatis Alpa karena pengajuan ' + String(izin.JenisPengajuan || 'izin') + ' ditolak.'
      }], nowText);
      return { changed: appendedAlpa.created > 0, created: appendedAlpa.created > 0, attendance: appendedAlpa.rows[0] || null };
    }
  }

  return { changed: false, attendance: attendance };
}

function ensureAttendanceAutomationTrigger_() {
  const handler = 'runAttendanceAutomation';
  const triggers = ScriptApp.getProjectTriggers().filter(function(trigger) {
    return trigger.getHandlerFunction() === handler;
  });

  let created = false;
  if (!triggers.length) {
    ScriptApp.newTrigger(handler)
      .timeBased()
      .everyMinutes(APP.ATTENDANCE_AUTOMATION_INTERVAL_MINUTES)
      .create();
    created = true;
  }

  // Cegah trigger ganda jika setup/update struktur pernah dijalankan berulang.
  if (triggers.length > 1) {
    triggers.slice(1).forEach(function(trigger) {
      try { ScriptApp.deleteTrigger(trigger); } catch (_) {}
    });
  }

  return {
    handler: handler,
    created: created,
    intervalMinutes: APP.ATTENDANCE_AUTOMATION_INTERVAL_MINUTES,
    active: true
  };
}

/** Dipanggil oleh time-driven trigger setiap beberapa menit. */
function runAttendanceAutomation() {
  return withLock_(function() {
    const db = getDatabase_();
    const result = expirePendingIzinAtDeadlineCore_(db, new Date(), '');
    if (result.expired || result.attendanceCreated) {
      saveSystemLog_(
        'Sistem Otomatis',
        'Deadline verifikasi izin 16.00: ' + result.expired +
        ' pengajuan ditutup, ' + result.attendanceCreated + ' absensi Alpa dibuat'
      );
    }
    return result;
  });
}

function getIzinWindow_(kegiatan, now) {
  if (!kegiatan) throw new Error('Kegiatan tidak ditemukan.');
  now = now || new Date();

  const activityDate = String(kegiatan.Tanggal || '').substring(0, 10);
  const activityStart = parseYmdAtTime_(activityDate, '00:00');
  const openAt = new Date(activityStart.getTime() - (3 * 24 * 60 * 60 * 1000));
  const autoCloseAt = parseYmdAtTime_(activityDate, APP.IZIN_AUTO_CLOSE_HHMM);
  const manualClosedAtText = String(kegiatan.IzinDitutupPada || '').trim();
  const status = normalizeKegiatanStatus_(kegiatan.Status || 'Rencana');

  let state = 'Aktif';
  let message = 'Pengajuan izin sedang dibuka.';
  let canSubmit = true;

  if (status === 'Dibatalkan') {
    state = 'Dibatalkan';
    message = 'Pengajuan izin tidak tersedia karena kegiatan dibatalkan.';
    canSubmit = false;
  } else if (status === 'Selesai') {
    state = 'Selesai';
    message = 'Pengajuan izin tidak tersedia karena kegiatan sudah selesai.';
    canSubmit = false;
  } else if (manualClosedAtText) {
    state = 'Ditutup Pengurus';
    message = 'Pengajuan izin telah ditutup oleh pengurus.';
    canSubmit = false;
  } else if (now.getTime() < openAt.getTime()) {
    state = 'Belum Aktif';
    message = 'Pengajuan izin baru aktif mulai H-3.';
    canSubmit = false;
  } else if (now.getTime() >= autoCloseAt.getTime()) {
    state = 'Berakhir';
    message = 'Batas pengajuan izin telah berakhir pada Hari H pukul 07.00.';
    canSubmit = false;
  }

  return {
    state: state,
    message: message,
    canSubmit: canSubmit,
    openAt: formatIzinDateTime_(openAt),
    autoCloseAt: formatIzinDateTime_(autoCloseAt),
    manualClosedAt: manualClosedAtText,
    manualClosedBy: String(kegiatan.IzinDitutupOleh || '').trim()
  };
}

function assertIzinWindowOpen_(kegiatan) {
  const windowInfo = getIzinWindow_(kegiatan, new Date());
  if (!windowInfo.canSubmit) {
    throw new Error(windowInfo.message);
  }
  return windowInfo;
}

function getIzinLink(token, kegiatanId) {
  requirePermission_(token, 'kegiatan', 'view');
  const kegiatan = findById_('Kegiatan', kegiatanId);
  if (!kegiatan) throw new Error('Kegiatan tidak ditemukan.');

  const baseUrl = getPublicAppBaseUrl_();
  if (!baseUrl) throw new Error('Web app belum dideploy. Deploy sebagai Web App terlebih dahulu.');

  const info = getIzinWindow_(kegiatan, new Date());
  return {
    kegiatan: String(kegiatan.NamaKegiatan || ''),
    tanggal: serializeValue_(kegiatan.Tanggal),
    url: baseUrl + '?izin=' + encodeURIComponent(String(kegiatan.ID || '')),
    state: info.state,
    message: info.message,
    canSubmit: info.canSubmit,
    openAt: info.openAt,
    autoCloseAt: info.autoCloseAt,
    manualClosedAt: info.manualClosedAt,
    manualClosedBy: info.manualClosedBy
  };
}

function closeIzinKegiatan(token, kegiatanId) {
  const session = requirePermission_(token, 'kegiatan', 'edit');
  const id = String(kegiatanId || '').trim();
  if (!id) throw new Error('Kegiatan tidak valid.');

  return withLock_(function() {
    const kegiatan = findById_('Kegiatan', id);
    if (!kegiatan) throw new Error('Kegiatan tidak ditemukan.');
    if (String(kegiatan.IzinDitutupPada || '').trim()) return serializeObject_(kegiatan);

    const now = Utilities.formatDate(
      new Date(),
      APP.IZIN_TIME_ZONE,
      'yyyy-MM-dd HH:mm:ss'
    );
    const saved = upsert_('Kegiatan', 'KGT', {
      ID: kegiatan.ID,
      IzinDitutupPada: now,
      IzinDitutupOleh: session.Nama || session.Username || '-'
    });
    saveSystemLog_(session.Nama, 'Menutup pengajuan izin kegiatan ' + String(kegiatan.NamaKegiatan || kegiatan.ID));
    return saved;
  }, false);
}

function getPublicIzinData(kegiatanId) {
  const kegiatan = findById_('Kegiatan', kegiatanId);
  if (!kegiatan) throw new Error('Link izin tidak valid.');
  const info = getIzinWindow_(kegiatan, new Date());
  return {
    ID: kegiatan.ID,
    NamaKegiatan: kegiatan.NamaKegiatan,
    Tanggal: serializeValue_(kegiatan.Tanggal),
    Lokasi: kegiatan.Lokasi,
    Status: kegiatan.Status,
    state: info.state,
    message: info.message,
    canSubmit: info.canSubmit,
    openAt: info.openAt,
    autoCloseAt: info.autoCloseAt,
    manualClosedAt: info.manualClosedAt,
    manualClosedBy: info.manualClosedBy
  };
}

function getKegiatanIzinFolder_(kegiatan) {
  const activityFolder = getKegiatanDocumentationFolder_(kegiatan);
  const existing = activityFolder.getFoldersByName('Izin Anggota');
  if (existing.hasNext()) return existing.next();
  return activityFolder.createFolder('Izin Anggota');
}

function getKegiatanIzinRows_(kegiatanId) {
  ensureIzinKegiatanSheet_();
  return getRows_('IzinKegiatan')
    .filter(function(item) {
      return String(item.KegiatanID || '') === String(kegiatanId || '');
    })
    .sort(function(a, b) {
      const order = { 'Menunggu Verifikasi': 0, 'Terkirim': 0, 'Ditolak': 1, 'Disetujui': 2 };
      const sa = Object.prototype.hasOwnProperty.call(order, String(a.Status || '')) ? order[String(a.Status || '')] : 0;
      const sb = Object.prototype.hasOwnProperty.call(order, String(b.Status || '')) ? order[String(b.Status || '')] : 0;
      if (sa !== sb) return sa - sb;
      return String(a.NamaAnggota || '').localeCompare(String(b.NamaAnggota || ''), 'id');
    });
}

function publicSubmitIzin(kegiatanId, payload) {
  payload = payload || {};
  const id = String(kegiatanId || '').trim();
  const nta = String(payload.nta || '').trim();
  const jenisPengajuan = String(payload.jenisPengajuan || '').trim();
  const alasan = String(payload.alasan || '').trim();
  const jenisBukti = String(payload.jenisBukti || '').trim();
  const mimeType = String(payload.mimeType || '').trim().toLowerCase();
  const base64 = String(payload.base64 || '').replace(/\s+/g, '');
  const allowedMime = ['application/pdf','image/jpeg','image/png','image/webp'];

  if (!id) throw new Error('Kegiatan tidak valid.');
  if (!nta) throw new Error('NTA wajib diisi.');
  validateEnum_(jenisPengajuan, ['Izin','Sakit'], 'Jenis pengajuan');
  if (!alasan) throw new Error('Alasan pengajuan wajib diisi.');
  if (alasan.length > 500) throw new Error('Alasan pengajuan maksimum 500 karakter.');
  if (jenisPengajuan === 'Izin') {
    validateEnum_(jenisBukti, ['Surat Izin'], 'Jenis bukti');
  } else {
    validateEnum_(jenisBukti, ['Surat Dokter','Bukti Obat'], 'Jenis bukti sakit');
  }
  if (allowedMime.indexOf(mimeType) === -1) {
    throw new Error('Bukti harus berupa PDF, JPG, PNG, atau WEBP.');
  }
  if (!base64) throw new Error('Bukti pendukung wajib dilampirkan.');
  if (base64.length > 6 * 1024 * 1024) {
    throw new Error('Bukti pendukung terlalu besar. Maksimum sekitar 3 MB setelah diproses.');
  }

  let bytes;
  try { bytes = Utilities.base64Decode(base64); }
  catch (_) { throw new Error('Bukti pendukung tidak dapat dibaca.'); }
  if (!bytes || !bytes.length || bytes.length > 3 * 1024 * 1024) {
    throw new Error('Ukuran bukti pendukung maksimum 3 MB.');
  }

  return withLock_(function() {
    const db = getDatabase_();
    const kegiatan = getRows_('Kegiatan', db).find(function(item) {
      return String(item.ID || '') === id;
    }) || null;
    if (!kegiatan) throw new Error('Kegiatan tidak ditemukan.');
    assertIzinWindowOpen_(kegiatan);

    const anggota = getRows_('Anggota', db).find(function(item) {
      return String(item.NTA || '').trim().toLowerCase() === nta.toLowerCase();
    }) || null;
    if (!anggota) throw new Error('NTA tidak ditemukan.');
    const memberStatus = String(anggota.Status || '').trim().toLowerCase();
    if (['aktif','calon anggota'].indexOf(memberStatus) === -1) {
      throw new Error('Keanggotaan tidak aktif sehingga izin tidak dapat diajukan.');
    }

    const attendance = getRows_('Absensi', db).find(function(item) {
      return String(item.KegiatanID || '') === id &&
        String(item.AnggotaID || '') === String(anggota.ID || '') &&
        String(item.StatusKehadiran || '') !== 'Libur';
    }) || null;
    if (attendance && String(attendance.StatusKehadiran || '') !== jenisPengajuan) {
      throw new Error('Status kehadiran anggota sudah tercatat sebagai ' + String(attendance.StatusKehadiran || '-') + ' dan tidak sesuai dengan jenis pengajuan ' + jenisPengajuan + '.');
    }

    ensureIzinKegiatanSheet_();
    const existing = getRows_('IzinKegiatan', db).find(function(item) {
      return String(item.KegiatanID || '') === id &&
        String(item.AnggotaID || '') === String(anggota.ID || '');
    }) || null;

    const cleanName = String(payload.name || (mimeType === 'application/pdf' ? 'surat-izin.pdf' : 'surat-izin.jpg'))
      .replace(/[^a-zA-Z0-9 _.-]+/g, '')
      .trim()
      .slice(0, 90) || 'surat-izin';
    const stamp = Utilities.formatDate(new Date(), APP.IZIN_TIME_ZONE, 'yyyyMMdd-HHmmss');
    const finalName = stamp + '-' + Utilities.getUuid().substring(0, 6) + '-' + cleanName;
    const file = getKegiatanIzinFolder_(kegiatan).createFile(
      Utilities.newBlob(bytes, mimeType, finalName)
    );

    try {
      const now = Utilities.formatDate(new Date(), APP.IZIN_TIME_ZONE, 'yyyy-MM-dd HH:mm:ss');
      const saved = upsert_('IzinKegiatan', 'IZN', {
        ID: existing ? existing.ID : '',
        KegiatanID: kegiatan.ID,
        KegiatanNama: kegiatan.NamaKegiatan,
        Tanggal: kegiatan.Tanggal,
        AnggotaID: anggota.ID,
        NTA: anggota.NTA,
        NamaAnggota: anggota.Nama,
        JenisPengajuan: jenisPengajuan,
        Alasan: alasan,
        JenisBukti: jenisBukti,
        BuktiNamaFile: cleanName,
        BuktiMimeType: mimeType,
        BuktiDriveFileID: file.getId(),
        BuktiUkuran: bytes.length,
        Status: 'Menunggu Verifikasi',
        DikirimPada: existing ? (existing.DikirimPada || now) : now,
        DiverifikasiPada: '',
        DiverifikasiOleh: '',
        CatatanVerifikasi: ''
      });

      if (existing && existing.BuktiDriveFileID && String(existing.BuktiDriveFileID) !== String(file.getId())) {
        try { DriveApp.getFileById(String(existing.BuktiDriveFileID)).setTrashed(true); } catch (_) {}
      }

      return {
        success: true,
        updated: Boolean(existing),
        nama: anggota.Nama,
        kegiatan: kegiatan.NamaKegiatan,
        tanggal: serializeValue_(kegiatan.Tanggal),
        izin: serializeObject_(saved)
      };
    } catch (error) {
      try { file.setTrashed(true); } catch (_) {}
      throw error;
    }
  }, false);
}

function getKegiatanIzinRingkas(token, kegiatanId) {
  requirePermission_(token, 'absensi', 'view');
  // Batch Absensi menggunakan keputusan verifikasi:
  // - Disetujui => prefill Izin/Sakit.
  // - Ditolak   => prefill Alpa.
  // - Menunggu  => tidak mempengaruhi Absensi.
  return getKegiatanIzinRows_(kegiatanId)
    .filter(function(item) {
      const status = String(item.Status || '');
      return status === 'Disetujui' || status === 'Ditolak';
    })
    .map(function(item) {
      return {
        ID: item.ID,
        AnggotaID: item.AnggotaID,
        NTA: item.NTA,
        NamaAnggota: item.NamaAnggota,
        JenisPengajuan: item.JenisPengajuan || 'Izin',
        Alasan: item.Alasan,
        JenisBukti: item.JenisBukti || '',
        Status: item.Status,
        DikirimPada: item.DikirimPada,
        DiverifikasiPada: item.DiverifikasiPada || '',
        DiverifikasiOleh: item.DiverifikasiOleh || '',
        CatatanVerifikasi: item.CatatanVerifikasi || '',
        BuktiNamaFile: item.BuktiNamaFile,
        BuktiMimeType: item.BuktiMimeType
      };
    });
}

// Semua status untuk panel verifikasi di Absensi Massal.
function getBatchIzinVerifikasi(token, kegiatanId) {
  requirePermission_(token, 'absensi', 'view');
  if (!findById_('Kegiatan', kegiatanId)) throw new Error('Kegiatan tidak ditemukan.');
  return getKegiatanIzinRingkasInternal_(kegiatanId);
}

function verifyIzinKegiatan(token, izinId, decision, catatan) {
  const session = requirePermission_(token, 'absensi', 'edit');
  const id = String(izinId || '').trim();
  const target = String(decision || '').trim();
  const note = String(catatan || '').trim();
  if (!id) throw new Error('Pengajuan izin tidak valid.');
  validateEnum_(target, ['Disetujui','Ditolak'], 'Keputusan verifikasi');
  if (note.length > 500) throw new Error('Catatan verifikasi maksimum 500 karakter.');
  if (target === 'Ditolak' && !note) throw new Error('Alasan penolakan wajib diisi.');

  return withLock_(function() {
    const db = getDatabase_();
    ensureIzinKegiatanSheet_();
    const item = getRows_('IzinKegiatan', db).find(function(row) {
      return String(row.ID || '') === id;
    }) || null;
    if (!item) throw new Error('Pengajuan izin tidak ditemukan.');
    if (!isPendingIzinStatus_(item.Status)) {
      throw new Error('Pengajuan sudah diproses dengan status ' + String(item.Status || '-') + '.');
    }

    const kegiatan = getRows_('Kegiatan', db).find(function(row) {
      return String(row.ID || '') === String(item.KegiatanID || '');
    }) || null;
    if (!kegiatan) throw new Error('Kegiatan terkait tidak ditemukan.');

    const nowDate = new Date();
    const deadline = getIzinVerificationDeadline_(kegiatan);
    if (nowDate.getTime() >= deadline.getTime()) {
      expirePendingIzinAtDeadlineCore_(db, nowDate, kegiatan.ID);
      throw new Error('Batas verifikasi sudah berakhir pada Hari H pukul 16.00. Pengajuan otomatis menjadi Ditolak. Jika kegiatan sudah berjalan/selesai dan tidak ada kehadiran yang sah, absensi menjadi Alpa.');
    }

    const attendance = getRows_('Absensi', db).find(function(row) {
      return String(row.KegiatanID || '') === String(item.KegiatanID || '') &&
        String(row.AnggotaID || '') === String(item.AnggotaID || '') &&
        String(row.StatusKehadiran || '') !== 'Libur';
    }) || null;

    if (target === 'Disetujui') {
      const expectedStatus = approvedIzinAttendanceStatus_(item);
      if (
        attendance &&
        String(attendance.StatusKehadiran || '') !== expectedStatus &&
        !isAutomaticAlpaAttendance_(attendance)
      ) {
        throw new Error(
          'Absensi anggota sudah tercatat sebagai ' + String(attendance.StatusKehadiran || '-') +
          ', sedangkan pengajuan ini adalah ' + expectedStatus + '. Verifikasi tidak dapat disetujui.'
        );
      }
    }

    const nowText = Utilities.formatDate(nowDate, APP.IZIN_TIME_ZONE, 'yyyy-MM-dd HH:mm:ss');
    const saved = upsert_('IzinKegiatan', 'IZN', {
      ID: item.ID,
      Status: target,
      DiverifikasiPada: nowText,
      DiverifikasiOleh: session.Nama || session.Username || '-',
      CatatanVerifikasi: note
    });

    const synced = syncVerifiedIzinAttendanceCore_(
      db,
      kegiatan,
      Object.assign({}, item, saved, { Status: target }),
      target,
      nowDate
    );
    saved.AbsensiOtomatis = synced;

    saveSystemLog_(
      session.Nama,
      target + ' pengajuan ' + String(item.JenisPengajuan || 'Izin') + ' ' +
      String(item.NamaAnggota || item.NTA || item.ID) +
      (synced && synced.changed ? ' | absensi disinkronkan otomatis' : '')
    );
    return serializeObject_(saved);
  });
}


function getIzinBuktiPreview(token, izinId) {
  requirePermission_(token, 'absensi', 'view');
  ensureIzinKegiatanSheet_();
  const item = findById_('IzinKegiatan', izinId);
  if (!item) throw new Error('Data izin tidak ditemukan.');
  if (!item.BuktiDriveFileID) throw new Error('Bukti pendukung tidak tersedia.');

  let file;
  try { file = DriveApp.getFileById(String(item.BuktiDriveFileID)); }
  catch (_) { throw new Error('File bukti pendukung tidak ditemukan di Google Drive.'); }

  const blob = file.getBlob();
  const bytes = blob.getBytes();
  if (bytes.length > 3 * 1024 * 1024) throw new Error('Bukti terlalu besar untuk ditampilkan di portal.');
  return {
    name: item.BuktiNamaFile || file.getName(),
    mimeType: item.BuktiMimeType || blob.getContentType(),
    dataUrl: 'data:' + String(item.BuktiMimeType || blob.getContentType()) + ';base64,' + Utilities.base64Encode(bytes)
  };
}

/**
 * Alias kompatibilitas untuk tombol lama: Rencana -> Berjalan.
 */
function syncAbsensiForKegiatanBatch_(kegiatanList) {
  const list = Array.isArray(kegiatanList) ? kegiatanList : [];
  const byId = {};

  list.forEach(function(item) {
    const id = String(item && item.ID || '').trim();
    if (!id) return;
    byId[id] = {
      NamaKegiatan: String(item.NamaKegiatan || ''),
      Tanggal: String(item.Tanggal || '')
    };
  });

  const ids = Object.keys(byId);
  if (!ids.length) return 0;

  const ss = getDatabase_();
  const sheet = ss.getSheetByName('Absensi');
  if (!sheet || sheet.getLastRow() <= 1) return 0;

  const headers = ensureSheetHeaders_(sheet, APP.SHEETS.Absensi);
  const kegiatanIdIndex = headers.indexOf('KegiatanID');
  const kegiatanNamaIndex = headers.indexOf('KegiatanNama');
  const tanggalIndex = headers.indexOf('Tanggal');
  const diubahPadaIndex = headers.indexOf('DiubahPada');

  if (kegiatanIdIndex < 0 || kegiatanNamaIndex < 0 || tanggalIndex < 0) {
    throw new Error('Struktur sheet Absensi tidak lengkap untuk sinkronisasi kegiatan.');
  }

  const rowCount = sheet.getLastRow() - 1;
  const range = sheet.getRange(2, 1, rowCount, headers.length);
  const values = range.getValues();
  const tz = Session.getScriptTimeZone() || 'Asia/Jakarta';
  const now = Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd HH:mm:ss');
  let changed = 0;

  values.forEach(function(row) {
    const kegiatanId = String(row[kegiatanIdIndex] || '').trim();
    const source = byId[kegiatanId];
    if (!source) return;

    let dirty = false;
    if (String(serializeValue_(row[kegiatanNamaIndex]) || '') !== source.NamaKegiatan) {
      row[kegiatanNamaIndex] = source.NamaKegiatan;
      dirty = true;
    }

    if (String(serializeValue_(row[tanggalIndex]) || '') !== source.Tanggal) {
      row[tanggalIndex] = source.Tanggal;
      dirty = true;
    }

    if (dirty) {
      if (diubahPadaIndex >= 0) row[diubahPadaIndex] = now;
      changed++;
    }
  });

  if (changed) {
    range.setValues(sheetLiteralRows_(values));
  }

  return changed;
}

function deleteKegiatan(token, id) {
  requirePermission_(token, 'kegiatan', 'delete');

  return withLock_(function() {
    const current = findById_('Kegiatan', id);
    if (!current) throw new Error('Kegiatan tidak ditemukan.');
    if (normalizeKegiatanStatus_(current.Status) !== 'Rencana') {
      throw new Error('Hanya kegiatan berstatus Rencana yang dapat dihapus. Gunakan state Dibatalkan/Selesai untuk menjaga riwayat.');
    }

    const hasAttendance = getRows_('Absensi').some(item =>
      String(item.KegiatanID) === String(id)
    );

    if (hasAttendance) {
      throw new Error(
        'Kegiatan memiliki riwayat absensi dan tidak dapat dihapus. ' +
        'Ubah status menjadi Dibatalkan atau Selesai.'
      );
    }

    const hasDocumentation = getRows_('Dokumentasi').some(item =>
      String(item.KegiatanID || '') === String(id || '')
    );

    ensureIzinKegiatanSheet_();
    const hasIzin = getRows_('IzinKegiatan').some(item =>
      String(item.KegiatanID || '') === String(id || '')
    );

    const hasInventoryUsage = getRows_('KegiatanInventaris').some(item =>
      String(item.KegiatanID || '') === String(id || '')
    );

    if (hasDocumentation || hasInventoryUsage || hasIzin) {
      throw new Error(
        'Kegiatan memiliki dokumentasi, pengajuan izin, atau riwayat inventaris dan tidak dapat dihapus. ' +
        'Hapus data terkait terlebih dahulu atau ubah status kegiatan.'
      );
    }

    const hasReport = getRows_('LaporanKegiatan').some(item =>
      String(item.KegiatanID || '') === String(id || '')
    );
    const hasCash = getRows_('Kas').some(item =>
      String(item.KegiatanID || '') === String(id || '')
    );

    if (hasReport || hasCash) {
      throw new Error(
        'Kegiatan sudah terhubung ke laporan atau transaksi kas dan tidak dapat dihapus. ' +
        'Ubah status menjadi Dibatalkan/Selesai agar riwayat tetap terjaga.'
      );
    }

    return deleteRow_('Kegiatan', id);
  });
}


/* =========================================================
   ABSENSI
========================================================= */

function saveAbsensi(token, data) {
  data = data || {};
  requirePermission_(token, 'absensi', data.ID ? 'edit' : 'create');
  return saveAbsensiCore_(data, 'Manual');
}

function saveAbsensiCore_(data, metode) {
  data = data || {};
  validateRequired_(data, ['KegiatanID','StatusKehadiran']);
  validateEnum_(
    data.StatusKehadiran,
    ['Hadir','Izin','Sakit','Alpa','Libur'],
    'Status kehadiran'
  );

  const isLibur = String(data.StatusKehadiran) === 'Libur';

  if (!isLibur) {
    validateRequired_(data, ['AnggotaID']);
  }

  if (isLibur && !String(data.Catatan || '').trim()) {
    data.Catatan = 'Tidak ada latihan';
  }

  return withLock_(function() {
    const kegiatan = findById_('Kegiatan', data.KegiatanID);
    const anggota = isLibur ? null : findById_('Anggota', data.AnggotaID);

    if (!kegiatan) {
      throw new Error('Kegiatan tidak ditemukan.');
    }

    // Libur adalah status kegiatan/tidak ada latihan, sehingga boleh dicatat
    // meskipun kegiatan berstatus dibatalkan/selesai dan tanpa anggota tertentu.
    if (!isLibur) {
      assertCheckinOpen_(kegiatan, 'Absensi');
    }

    if (!isLibur && !anggota) {
      throw new Error('Anggota tidak ditemukan.');
    }

    data.KegiatanNama = kegiatan.NamaKegiatan;
    data.Tanggal = kegiatan.Tanggal;
    data.AnggotaID = isLibur ? '' : data.AnggotaID;
    data.NamaAnggota = isLibur ? 'Semua Anggota' : anggota.Nama;
    data.Metode = metode || data.Metode || 'Manual';

    assertAttendanceConsistency_(data, isLibur, false);
    return upsert_('Absensi', 'ABS', data);
  });
}

/**
 * Menyimpan banyak absensi dalam satu request, satu ScriptLock, dan satu siklus
 * invalidasi dashboard. Record lama di-update berdasarkan KegiatanID+AnggotaID;
 * record baru ditambahkan secara bulk.
 */
function saveAbsensiBatch(token, payload) {
  payload = payload || {};
  const session = requirePermission_(token, 'absensi', 'edit');

  const kegiatanId = String(payload.KegiatanID || '').trim();
  const rows = Array.isArray(payload.rows) ? payload.rows : [];
  if (!kegiatanId) throw new Error('Kegiatan wajib dipilih.');
  if (!rows.length) throw new Error('Tidak ada data absensi untuk disimpan.');
  if (rows.length > 500) throw new Error('Maksimum 500 anggota per proses absensi massal.');

  return withLock_(function() {
    const db = getDatabase_();
    const kegiatan = getRows_('Kegiatan', db).find(function(item) {
      return String(item.ID || '') === kegiatanId;
    }) || null;
    if (!kegiatan) throw new Error('Kegiatan tidak ditemukan.');
    assertCheckinOpen_(kegiatan, 'Absensi massal');

    const members = getRows_('Anggota', db);
    const memberById = {};
    members.forEach(function(item) {
      memberById[String(item.ID || '')] = item;
    });

    const sheet = db.getSheetByName('Absensi');
    if (!sheet) throw new Error('Sheet Absensi tidak ditemukan.');
    const expectedHeaders = APP.SHEETS.Absensi;
    const headers = ensureSheetHeaders_(sheet, expectedHeaders);
    const lastRow = sheet.getLastRow();
    const rawRows = lastRow > 1
      ? sheet.getRange(2, 1, lastRow - 1, headers.length).getValues()
      : [];

    const existingByMember = {};
    let hasLibur = false;
    rawRows.forEach(function(raw, index) {
      const item = rowToObject_(headers, raw);
      if (String(item.KegiatanID || '') !== kegiatanId) return;
      if (String(item.StatusKehadiran || '') === 'Libur') {
        hasLibur = true;
        return;
      }
      const memberId = String(item.AnggotaID || '');
      if (!memberId) return;
      if (existingByMember[memberId]) {
        throw new Error('Ditemukan data absensi ganda untuk satu anggota. Rapikan data terlebih dahulu.');
      }
      existingByMember[memberId] = {
        sheetRow: index + 2,
        raw: raw.slice(),
        item: item
      };
    });

    if (hasLibur) {
      throw new Error('Kegiatan sudah ditandai Libur. Hapus catatan Libur sebelum menggunakan absensi massal.');
    }

    const seen = {};
    const allowedStatuses = ['Hadir','Izin','Sakit','Alpa'];
    const normalizedRows = rows.map(function(input) {
      input = input || {};
      const anggotaId = String(input.AnggotaID || '').trim();
      const status = String(input.StatusKehadiran || '').trim();
      const catatan = String(input.Catatan || '').trim();

      if (!anggotaId) throw new Error('Anggota pada salah satu baris tidak valid.');
      if (seen[anggotaId]) throw new Error('Anggota yang sama dikirim lebih dari satu kali.');
      seen[anggotaId] = true;
      validateEnum_(status, allowedStatuses, 'Status kehadiran');
      if (catatan.length > 500) throw new Error('Catatan absensi maksimum 500 karakter.');

      const anggota = memberById[anggotaId];
      if (!anggota) throw new Error('Anggota tidak ditemukan: ' + anggotaId);
      const memberStatus = String(anggota.Status || '').trim().toLowerCase();
      if (['aktif','calon anggota'].indexOf(memberStatus) === -1) {
        throw new Error('Anggota ' + String(anggota.Nama || anggotaId) + ' tidak aktif dan tidak dapat diabsen.');
      }

      return {
        AnggotaID: anggotaId,
        StatusKehadiran: status,
        Catatan: catatan,
        anggota: anggota
      };
    });

    const tz = Session.getScriptTimeZone() || 'Asia/Jakarta';
    const now = Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd HH:mm:ss');
    const updateWrites = [];
    const appendWrites = [];
    const changedRows = [];
    let created = 0;
    let updated = 0;
    let unchanged = 0;

    normalizedRows.forEach(function(input) {
      const existing = existingByMember[input.AnggotaID] || null;
      const previous = existing ? existing.item : {};
      const unchangedRecord = existing &&
        String(previous.StatusKehadiran || '') === input.StatusKehadiran &&
        String(previous.Catatan || '') === input.Catatan &&
        String(previous.KegiatanNama || '') === String(kegiatan.NamaKegiatan || '') &&
        String(previous.Tanggal || '').substring(0, 10) === String(kegiatan.Tanggal || '').substring(0, 10) &&
        String(previous.NamaAnggota || '') === String(input.anggota.Nama || '');

      if (unchangedRecord) {
        unchanged++;
        return;
      }

      const record = {};
      expectedHeaders.forEach(function(header) {
        if (header === 'ID') record[header] = existing ? previous.ID : createId_('ABS');
        else if (header === 'KegiatanID') record[header] = kegiatan.ID;
        else if (header === 'KegiatanNama') record[header] = kegiatan.NamaKegiatan;
        else if (header === 'Tanggal') record[header] = kegiatan.Tanggal;
        else if (header === 'AnggotaID') record[header] = input.AnggotaID;
        else if (header === 'NamaAnggota') record[header] = input.anggota.Nama;
        else if (header === 'StatusKehadiran') record[header] = input.StatusKehadiran;
        else if (header === 'Catatan') record[header] = input.Catatan;
        else if (header === 'Metode') record[header] = existing ? (previous.Metode || 'Manual') : 'Manual';
        else if (header === 'DibuatPada') record[header] = existing ? (previous.DibuatPada || now) : now;
        else if (header === 'DiubahPada') record[header] = now;
        else record[header] = existing ? (previous[header] || '') : '';
      });

      const values = headers.map(function(header, colIndex) {
        if (!header || expectedHeaders.indexOf(header) === -1) {
          return existing ? existing.raw[colIndex] : '';
        }
        return record[header];
      });

      if (existing) {
        updateWrites.push({ row: existing.sheetRow, values: values });
        updated++;
      } else {
        appendWrites.push(values);
        created++;
      }
      changedRows.push(serializeObject_(record));
    });

    // Gabungkan update yang bersebelahan agar panggilan Spreadsheet service sedikit.
    updateWrites.sort(function(a, b) { return a.row - b.row; });
    let group = null;
    function flushGroup() {
      if (!group) return;
      sheet.getRange(group.start, 1, group.values.length, headers.length).setValues(sheetLiteralRows_(group.values));
      group = null;
    }
    updateWrites.forEach(function(write) {
      if (!group) {
        group = { start: write.row, last: write.row, values: [write.values] };
      } else if (write.row === group.last + 1) {
        group.last = write.row;
        group.values.push(write.values);
      } else {
        flushGroup();
        group = { start: write.row, last: write.row, values: [write.values] };
      }
    });
    flushGroup();

    if (appendWrites.length) {
      sheet.getRange(sheet.getLastRow() + 1, 1, appendWrites.length, headers.length)
        .setValues(sheetLiteralRows_(appendWrites));
    }

    if (created || updated) {
      saveSystemLog_(
        session.Nama,
        'Absensi massal ' + String(kegiatan.NamaKegiatan || kegiatan.ID) +
        ': ' + created + ' baru, ' + updated + ' diperbarui'
      );
    }

    return {
      success: true,
      KegiatanID: kegiatan.ID,
      rows: changedRows,
      created: created,
      updated: updated,
      unchanged: unchanged,
      processed: normalizedRows.length
    };
  });
}

function assertAttendanceConsistency_(data, isLibur, allowDuplicateUpdate) {
  const rows = getRows_('Absensi').filter(function(item) {
    return String(item.ID) !== String(data.ID || '') &&
      String(item.KegiatanID) === String(data.KegiatanID || '');
  });

  const liburRow = rows.find(function(item) {
    return String(item.StatusKehadiran || '') === 'Libur';
  }) || null;

  const attendanceRows = rows.filter(function(item) {
    return String(item.StatusKehadiran || '') !== 'Libur';
  });

  if (isLibur && attendanceRows.length) {
    throw new Error(
      'Kegiatan ini sudah memiliki absensi anggota. Hapus data kehadiran terlebih dahulu sebelum menandai Libur.'
    );
  }

  if (!isLibur && liburRow) {
    throw new Error(
      'Kegiatan ini sudah ditandai Libur. Hapus status Libur terlebih dahulu sebelum mencatat kehadiran anggota.'
    );
  }

  const duplicate = isLibur
    ? liburRow
    : rows.find(function(item) {
        return String(item.AnggotaID || '') === String(data.AnggotaID || '');
      }) || null;

  if (duplicate && !allowDuplicateUpdate) {
    throw new Error(
      isLibur
        ? 'Status Libur untuk kegiatan ini sudah tercatat.'
        : 'Absensi anggota pada kegiatan ini sudah tercatat.'
    );
  }

  return duplicate;
}

function deleteAbsensi(token, id) {
  requirePermission_(token, 'absensi', 'delete');

  return withLock_(function() {
    return deleteRow_('Absensi', id);
  });
}


/* =========================================================
   QR / PUBLIC CHECK-IN
========================================================= */

function getAttendanceLink(token, kegiatanId) {
  requirePermission_(token, 'absensi', 'view');

  const kegiatan = findById_('Kegiatan', kegiatanId);

  if (!kegiatan) {
    throw new Error('Kegiatan tidak ditemukan.');
  }

  assertCheckinOpen_(kegiatan, 'QR absensi');

  const baseUrl = getPublicAppBaseUrl_();

  if (!baseUrl) {
    throw new Error('Web app belum dideploy. Deploy sebagai Web App terlebih dahulu.');
  }

  const url = baseUrl + '?checkin=' + encodeURIComponent(kegiatanId);

  return {
    kegiatan: kegiatan.NamaKegiatan,
    tanggal: kegiatan.Tanggal,
    url: url,
    qrUrl: 'https://quickchart.io/qr?size=320&text=' + encodeURIComponent(url)
  };
}

function getMemberAccessCard(token, anggotaId) {
  requirePermission_(token, 'anggota', 'view');
  const anggota = findById_('Anggota', anggotaId);
  if (!anggota) throw new Error('Anggota tidak ditemukan.');
  const nta = String(anggota.NTA || '').trim();
  if (!nta) throw new Error('Anggota belum memiliki NTA.');
  return {
    ID: anggota.ID,
    NTA: nta,
    Nama: anggota.Nama,
    pin: getMemberCheckinPin_(anggota),
    qrUrl: 'https://quickchart.io/qr?size=240&text=' + encodeURIComponent('SAKA-NTA:' + nta)
  };
}

function getPublicCheckinData(kegiatanId) {
  const kegiatan = findById_('Kegiatan', kegiatanId);

  if (!kegiatan) {
    throw new Error('Kode kegiatan tidak valid.');
  }

  assertCheckinOpen_(kegiatan, 'Check-in');

  return {
    ID: kegiatan.ID,
    NamaKegiatan: kegiatan.NamaKegiatan,
    Tanggal: kegiatan.Tanggal,
    Lokasi: kegiatan.Lokasi,
    Status: kegiatan.Status,
    requiresPin: true,
    apiVersion: APP.VERSION
  };
}

function publicCheckin(kegiatanId, nta, pin) {
  const kegiatan = findById_('Kegiatan', kegiatanId);

  if (!kegiatan) {
    throw new Error('Kegiatan tidak ditemukan.');
  }

  assertCheckinOpen_(kegiatan, 'Check-in');

  nta = String(nta || '').trim();
  pin = String(pin || '').trim();

  if (!nta) throw new Error('NTA wajib diisi.');
  if (!/^\d{6}$/.test(pin)) throw new Error('PIN check-in harus terdiri dari 6 digit.');

  enforceRateLimit_('CHECKIN', String(kegiatanId) + '|' + nta.toLowerCase(), 6, 10 * 60);

  const anggota = getRows_('Anggota').find(item =>
    String(item.NTA || '').trim().toLowerCase() === nta.toLowerCase()
  );

  if (!anggota) {
    throw new Error('NTA tidak ditemukan.');
  }

  const memberStatus = String(anggota.Status || '').toLowerCase();
  if (['aktif','calon anggota'].indexOf(memberStatus) === -1) {
    throw new Error('Keanggotaan tidak aktif sehingga check-in tidak dapat dilakukan.');
  }

  if (!safeStringEqual_(pin, getMemberCheckinPin_(anggota))) {
    throw new Error('NTA atau PIN check-in tidak sesuai.');
  }

  const result = saveAbsensiCore_({
    KegiatanID: kegiatanId,
    AnggotaID: anggota.ID,
    StatusKehadiran: 'Hadir',
    Catatan: 'Check-in QR'
  }, 'QR');

  saveSystemLog_(anggota.Nama, 'Check-in QR: ' + String(kegiatan.NamaKegiatan || kegiatan.ID));

  return {
    success: true,
    nama: anggota.Nama,
    kegiatan: kegiatan.NamaKegiatan,
    tanggal: kegiatan.Tanggal,
    attendance: result
  };
}


/* =========================================================
   PENILAIAN KEAKTIFAN BULANAN (V3.4.0)
   - Absensi dihitung otomatis.
   - Komponen MANUAL menampung SKK/indikator lain tanpa mengubah Absensi.
   - PDF bulanan dapat dibagikan sebagai file dari browser yang mendukung Web Share.
========================================================= */

function seedDefaultPenilaianComponent_() {
  const ss = getDatabase_();
  const sheet = ss.getSheetByName('KomponenPenilaian');
  if (!sheet) return null;

  const rows = getRows_('KomponenPenilaian', ss);
  const existing = rows.find(function(item) {
    return String(item.Kode || '').trim().toUpperCase() === ASSESSMENT.DEFAULT_ATTENDANCE_CODE;
  });
  if (existing) return existing;

  return upsert_('KomponenPenilaian', 'KPN', {
    Kode: ASSESSMENT.DEFAULT_ATTENDANCE_CODE,
    NamaKomponen: ASSESSMENT.DEFAULT_ATTENDANCE_NAME,
    TipeSumber: 'ABSENSI',
    Bobot: ASSESSMENT.DEFAULT_ATTENDANCE_WEIGHT,
    PoinMaksimum: ASSESSMENT.DEFAULT_ATTENDANCE_MAX,
    AturanJSON: JSON.stringify(ASSESSMENT.DEFAULT_ATTENDANCE_RULES),
    Status: 'Aktif',
    Urutan: 1,
    Keterangan: 'Nilai otomatis dari Absensi. Poin Hadir/Izin/Sakit/Alpa dapat diubah oleh Admin.'
  });
}


function parseAssessmentRules_(component) {
  try {
    const parsed = JSON.parse(String(component && component.AturanJSON || '{}'));
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (_) {
    return {};
  }
}

function isSkkComponent_(component) {
  if (!component) return false;
  if (String(component.Kode || '').trim().toUpperCase() === ASSESSMENT.SKK_CODE) return true;
  const rules = parseAssessmentRules_(component);
  return String(rules.Kind || '').toUpperCase() === 'SKK_CHECKLIST';
}

function skkPointPerItem_(component) {
  const rules = parseAssessmentRules_(component);
  const value = Number(rules.PoinPerButir);
  return Number.isFinite(value) && value > 0 ? value : ASSESSMENT.SKK_POINT_PER_ITEM;
}

function seedDefaultSkkComponent_() {
  const ss = getDatabase_();
  const sheet = ss.getSheetByName('KomponenPenilaian');
  if (!sheet) return null;
  const rows = getRows_('KomponenPenilaian', ss);
  const existing = rows.find(function(item) {
    return String(item.Kode || '').trim().toUpperCase() === ASSESSMENT.SKK_CODE;
  });
  const rules = existing ? parseAssessmentRules_(existing) : {};
  const needsRules = String(rules.Kind || '').toUpperCase() !== 'SKK_CHECKLIST' || !(Number(rules.PoinPerButir) > 0);
  if (existing && !needsRules) return existing;

  return upsert_('KomponenPenilaian', 'KPN', {
    ID: existing ? existing.ID : '',
    Kode: ASSESSMENT.SKK_CODE,
    NamaKomponen: existing ? existing.NamaKomponen : ASSESSMENT.SKK_NAME,
    TipeSumber: 'MANUAL',
    Bobot: existing ? existing.Bobot : ASSESSMENT.SKK_MAX_INDEX_BONUS,
    PoinMaksimum: existing ? existing.PoinMaksimum : ASSESSMENT.SKK_MONTHLY_MAX,
    AturanJSON: JSON.stringify({
      Mode: 'BONUS',
      Kind: 'SKK_CHECKLIST',
      PoinPerButir: Number(rules.PoinPerButir || ASSESSMENT.SKK_POINT_PER_ITEM)
    }),
    Status: existing ? existing.Status : 'Aktif',
    Urutan: existing ? existing.Urutan : 2,
    Keterangan: existing && existing.Keterangan
      ? existing.Keterangan
      : 'Poin bonus dari butir SKK yang sudah disetor dan diparaf. Satu butir hanya dihitung sekali per anggota.'
  });
}

function seedSkkMaster_() {
  const ss = getDatabase_();
  const sheet = ss.getSheetByName('MasterSKK');
  if (!sheet) return { added: 0, total: 0 };
  const headers = ensureSheetHeaders_(sheet, APP.SHEETS.MasterSKK);
  const existing = getRows_('MasterSKK', ss);
  const codes = new Set(existing.map(function(item) { return String(item.Kode || '').trim().toUpperCase(); }));
  const tz = Session.getScriptTimeZone() || 'Asia/Jakarta';
  const now = Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd HH:mm:ss');
  const missing = SKK_MASTER_DEFAULTS.filter(function(item) {
    return !codes.has(String(item.Kode || '').toUpperCase());
  });
  if (!missing.length) return { added: 0, total: existing.length };

  const rows = missing.map(function(item) {
    const record = {
      ID: 'MSK-' + String(item.Kode || ''),
      Kode: item.Kode,
      Krida: item.Krida,
      KelompokSKK: item.KelompokSKK,
      Butir: item.Butir,
      Urutan: item.Urutan,
      Status: 'Aktif',
      Sumber: 'SKK PRAMUKA.pdf',
      DibuatPada: now,
      DiubahPada: now
    };
    return headers.map(function(header) { return Object.prototype.hasOwnProperty.call(record, header) ? record[header] : ''; });
  });
  sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, headers.length).setValues(sheetLiteralRows_(rows));
  return { added: rows.length, total: existing.length + rows.length };
}

function assertPenilaianStructure_() {
  const ss = getDatabase_();
  ['KomponenPenilaian','MasterSKK','PenilaianAnggota','LaporanPenilaian'].forEach(function(name) {
    if (!ss.getSheetByName(name)) {
      throw new Error('Struktur Penilaian belum tersedia. Jalankan System Maintenance → Update Struktur satu kali.');
    }
  });
  return ss;
}

function normalizePenilaianPeriod_(value) {
  const period = String(value || '').trim();
  if (!/^\d{4}-\d{2}$/.test(period)) {
    throw new Error('Periode penilaian tidak valid. Gunakan format YYYY-MM.');
  }
  const month = Number(period.substring(5, 7));
  if (month < 1 || month > 12) throw new Error('Bulan penilaian tidak valid.');
  return period;
}

function penilaianPeriodLabel_(period) {
  period = normalizePenilaianPeriod_(period);
  const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  return months[Number(period.substring(5, 7)) - 1] + ' ' + period.substring(0, 4);
}

function normalizePenilaianStatus_(value) {
  const raw = String(value || '').trim().toLowerCase();
  if (raw === 'aktif') return 'Aktif';
  if (raw === 'nonaktif') return 'Nonaktif';
  return String(value || '').trim();
}

function normalizeAssessmentCode_(value) {
  const code = String(value || '')
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 30);
  if (!code) throw new Error('Kode komponen penilaian wajib diisi.');
  return code;
}

function parseAttendanceRules_(component) {
  let parsed = {};
  try { parsed = JSON.parse(String(component && component.AturanJSON || '{}')); }
  catch (_) { parsed = {}; }

  const fallback = ASSESSMENT.DEFAULT_ATTENDANCE_RULES;
  const out = {};
  ['Hadir','Izin','Sakit','Alpa'].forEach(function(status) {
    const value = Number(parsed[status]);
    out[status] = Number.isFinite(value) && value >= 0 ? value : fallback[status];
  });
  return out;
}

function assessmentPredicate_(score, hasData) {
  if (!hasData) return 'Belum Dinilai';
  const numeric = Math.max(0, Math.min(100, Number(score || 0)));
  const found = ASSESSMENT.PREDICATES.find(function(item) { return numeric >= item.min; });
  return found ? found.label : 'Perlu Penguatan';
}

function assessmentMemberReview_(score, hasData, missingAttendance) {
  if (!hasData) return 'Belum ada data penilaian pada periode ini.';
  const numeric = Number(score || 0);
  let text = numeric >= 85
    ? 'Keaktifan sangat baik; pertahankan konsistensi partisipasi.'
    : numeric >= 70
      ? 'Keaktifan baik; pertahankan dan tingkatkan konsistensi.'
      : numeric >= 55
        ? 'Keaktifan cukup; partisipasi masih dapat ditingkatkan.'
        : 'Perlu penguatan dan pendampingan untuk meningkatkan keterlibatan.';
  if (Number(missingAttendance || 0) > 0) {
    text += ' Terdapat ' + Number(missingAttendance) + ' pertemuan tanpa catatan kehadiran.';
  }
  return text;
}

function assessmentOverallReview_(average, assessed, total, meetingCount) {
  if (!total) return 'Belum ada anggota Aktif/Calon Anggota untuk direkap.';
  if (!assessed) return 'Belum ada data penilaian pada periode ini.';
  const avg = Number(average || 0);
  const level = avg >= 85
    ? 'sangat baik'
    : avg >= 70
      ? 'baik'
      : avg >= 55
        ? 'cukup'
        : 'masih perlu penguatan';
  return 'Secara keseluruhan tingkat keaktifan anggota pada periode ini ' + level +
    ' dengan rata-rata Indeks Keaktifan ' + avg.toFixed(1) + '/100. ' +
    'Rekap mencakup ' + assessed + ' dari ' + total + ' anggota dan ' + meetingCount + ' pertemuan absensi.';
}

function assessmentMeetingKey_(row) {
  const id = String(row && row.KegiatanID || '').trim();
  if (id) return id;
  return String(row && row.Tanggal || '').substring(0, 10) + '|' + String(row && row.KegiatanNama || '').trim();
}

function buildPenilaianBulananData_(period) {
  period = normalizePenilaianPeriod_(period);
  const db = assertPenilaianStructure_();

  const allMembers = getRows_('Anggota', db);

  let componentRowsSource = getRows_('KomponenPenilaian', db);
  if (!componentRowsSource.some(function(item) {
    return String(item.TipeSumber || '').toUpperCase() === 'ABSENSI';
  })) {
    seedDefaultPenilaianComponent_();
    componentRowsSource = getRows_('KomponenPenilaian', db);
  }
  if (!componentRowsSource.some(function(item) { return isSkkComponent_(item); })) {
    seedDefaultSkkComponent_();
    componentRowsSource = getRows_('KomponenPenilaian', db);
  }

  const componentsAll = componentRowsSource.map(function(item) {
    return serializeObject_(item);
  }).sort(function(a, b) {
    const order = Number(a.Urutan || 999) - Number(b.Urutan || 999);
    return order || String(a.NamaKomponen || '').localeCompare(String(b.NamaKomponen || ''), 'id');
  });

  // Histori komponen manual tetap ikut dihitung pada bulan yang sudah memiliki
  // catatan, walaupun komponen tersebut kemudian dinonaktifkan untuk bulan berikutnya.
  const manualEntries = getRows_('PenilaianAnggota', db).filter(function(item) {
    return String(item.Periode || String(item.Tanggal || '').substring(0, 7)) === period;
  }).map(function(item) { return serializeObject_(item); });
  const historicalManualComponentIds = new Set(manualEntries.map(function(entry) {
    return String(entry.KomponenID || '');
  }).filter(Boolean));

  const activeComponents = componentsAll.filter(function(item) {
    const isActive = normalizePenilaianStatus_(item.Status) === 'Aktif';
    const isHistoricalManual = String(item.TipeSumber || '').toUpperCase() === 'MANUAL' &&
      historicalManualComponentIds.has(String(item.ID || ''));
    return isActive || isHistoricalManual;
  });

  const attendanceComponent = activeComponents.find(function(item) {
    return String(item.TipeSumber || '').toUpperCase() === 'ABSENSI';
  }) || null;
  const attendanceRules = parseAttendanceRules_(attendanceComponent || {});
  const attendanceMaxPerMeeting = attendanceComponent
    ? Math.max(1, Number(attendanceComponent.PoinMaksimum || attendanceRules.Hadir || 10))
    : 0;

  const allAttendance = getRows_('Absensi', db).filter(function(item) {
    return String(item.Tanggal || '').substring(0, 7) === period;
  });

  const periodMemberIds = new Set();
  allAttendance.forEach(function(item) {
    if (item.AnggotaID) periodMemberIds.add(String(item.AnggotaID));
  });
  manualEntries.forEach(function(item) {
    if (item.AnggotaID) periodMemberIds.add(String(item.AnggotaID));
  });

  const members = allMembers.filter(function(item) {
    const status = String(item.Status || '').trim().toLowerCase();
    const joinDate = String(item.TanggalGabung || '').substring(0, 10);
    const joinedByPeriod = !/^\d{4}-\d{2}-\d{2}$/.test(joinDate) || joinDate.substring(0, 7) <= period;
    const currentlyEligible = (status === 'aktif' || status === 'calon anggota') && joinedByPeriod;
    return currentlyEligible || periodMemberIds.has(String(item.ID || ''));
  }).sort(function(a, b) {
    return String(a.Nama || '').localeCompare(String(b.Nama || ''), 'id');
  });

  const liburKeys = new Set(allAttendance.filter(function(item) {
    return String(item.StatusKehadiran || '').trim().toLowerCase() === 'libur';
  }).map(assessmentMeetingKey_));

  const meetingsMap = {};
  allAttendance.forEach(function(item) {
    const key = assessmentMeetingKey_(item);
    if (!key || liburKeys.has(key)) return;
    if (String(item.StatusKehadiran || '').trim().toLowerCase() === 'libur') return;
    if (!meetingsMap[key]) {
      meetingsMap[key] = {
        key: key,
        id: String(item.KegiatanID || ''),
        name: String(item.KegiatanNama || 'Kegiatan'),
        date: String(item.Tanggal || '').substring(0, 10)
      };
    }
  });
  const meetings = Object.keys(meetingsMap).map(function(key) { return meetingsMap[key]; })
    .sort(function(a, b) { return String(a.date).localeCompare(String(b.date)); });

  const manualComponents = activeComponents.filter(function(item) {
    return String(item.TipeSumber || '').toUpperCase() === 'MANUAL';
  });
  const manualComponentHasMonthData = {};
  manualEntries.forEach(function(entry) {
    manualComponentHasMonthData[String(entry.KomponenID || '')] = true;
  });

  const totalActiveWeight = activeComponents.reduce(function(total, item) {
    const rules = parseAssessmentRules_(item);
    if (String(rules.Mode || '').toUpperCase() === 'BONUS') return total;
    const w = Number(item.Bobot || 0);
    return total + (Number.isFinite(w) && w > 0 ? w : 0);
  }, 0);
  const totalBonusMax = activeComponents.reduce(function(total, item) {
    const rules = parseAssessmentRules_(item);
    if (String(rules.Mode || '').toUpperCase() !== 'BONUS') return total;
    const value = Number(item.Bobot || 0);
    return total + (Number.isFinite(value) && value > 0 ? value : 0);
  }, 0);

  const rows = members.map(function(member) {
    const memberId = String(member.ID || '');
    const joinDate = String(member.TanggalGabung || '').substring(0, 10);
    const eligibleMeetings = meetings.filter(function(meeting) {
      return !joinDate || !/^\d{4}-\d{2}-\d{2}$/.test(joinDate) || String(meeting.date || '') >= joinDate;
    });
    const eligibleKeys = new Set(eligibleMeetings.map(function(meeting) { return meeting.key; }));

    const attendanceByMeeting = {};
    allAttendance.forEach(function(item) {
      if (String(item.AnggotaID || '') !== memberId) return;
      const key = assessmentMeetingKey_(item);
      if (!eligibleKeys.has(key) || liburKeys.has(key)) return;
      attendanceByMeeting[key] = item;
    });

    const counts = { Hadir: 0, Izin: 0, Sakit: 0, Alpa: 0 };
    let attendancePoints = 0;
    Object.keys(attendanceByMeeting).forEach(function(key) {
      const row = attendanceByMeeting[key];
      const status = String(row.StatusKehadiran || '').trim();
      if (Object.prototype.hasOwnProperty.call(counts, status)) counts[status] += 1;
      attendancePoints += Number(attendanceRules[status] || 0);
    });
    const attendanceMax = attendanceComponent ? eligibleMeetings.length * attendanceMaxPerMeeting : 0;
    attendancePoints = Math.min(attendancePoints, attendanceMax || attendancePoints);
    const attendanceIndex = attendanceMax > 0 ? Math.min(100, attendancePoints / attendanceMax * 100) : null;
    const missingAttendance = Math.max(0, eligibleMeetings.length - Object.keys(attendanceByMeeting).length);

    const componentRows = [];
    let weightedSum = 0;
    let usedWeight = 0;
    let bonusScore = 0;
    let rawPoints = 0;
    let rawMax = 0;

    if (attendanceComponent) {
      const weight = Math.max(0, Number(attendanceComponent.Bobot || 0));
      componentRows.push({
        id: attendanceComponent.ID,
        code: attendanceComponent.Kode,
        name: attendanceComponent.NamaKomponen,
        source: 'ABSENSI',
        weight: weight,
        points: Number(attendancePoints.toFixed(2)),
        maxPoints: Number(attendanceMax.toFixed(2)),
        index: attendanceIndex === null ? null : Number(attendanceIndex.toFixed(2))
      });
      rawPoints += attendancePoints;
      rawMax += attendanceMax;
      if (attendanceIndex !== null && weight > 0) {
        weightedSum += attendanceIndex * weight;
        usedWeight += weight;
      }
    }

    manualComponents.forEach(function(component) {
      const entries = manualEntries.filter(function(entry) {
        return String(entry.AnggotaID || '') === memberId && String(entry.KomponenID || '') === String(component.ID || '');
      });
      const configuredMax = Math.max(0, Number(component.PoinMaksimum || 0));
      const rules = parseAssessmentRules_(component);
      const mode = String(rules.Mode || '').toUpperCase() === 'BONUS' ? 'BONUS' : 'WEIGHTED';
      const hasMonthData = !!manualComponentHasMonthData[String(component.ID || '')];
      const hasMemberData = entries.length > 0;
      const maxPoints = hasMonthData ? configuredMax : 0;
      const points = Math.min(configuredMax, entries.reduce(function(total, entry) {
        return total + Math.max(0, Number(entry.Poin || 0));
      }, 0));
      const index = hasMonthData && configuredMax > 0 ? Math.min(100, points / configuredMax * 100) : null;
      const weight = Math.max(0, Number(component.Bobot || 0));
      const bonusContribution = mode === 'BONUS' && hasMemberData && index !== null
        ? Math.min(weight, Math.max(0, index / 100 * weight))
        : 0;

      componentRows.push({
        id: component.ID,
        code: component.Kode,
        name: component.NamaKomponen,
        source: isSkkComponent_(component) ? 'SKK' : 'MANUAL',
        mode: mode,
        weight: weight,
        points: Number(points.toFixed(2)),
        maxPoints: Number(maxPoints.toFixed(2)),
        index: index === null ? null : Number(index.toFixed(2)),
        bonusContribution: Number(bonusContribution.toFixed(2))
      });
      rawPoints += points;
      rawMax += maxPoints;
      if (mode === 'BONUS') {
        bonusScore += bonusContribution;
      } else if (index !== null && weight > 0) {
        weightedSum += index * weight;
        usedWeight += weight;
      }
    });

    const baseScore = usedWeight > 0 ? Math.max(0, Math.min(100, weightedSum / usedWeight)) : null;
    const score = baseScore === null
      ? (bonusScore > 0 ? Math.min(100, bonusScore) : null)
      : Math.max(0, Math.min(100, baseScore + bonusScore));
    const hasData = score !== null;
    const manualPoints = componentRows.filter(function(item) { return item.source === 'MANUAL' || item.source === 'SKK'; })
      .reduce(function(total, item) { return total + Number(item.points || 0); }, 0);
    const skkPoints = componentRows.filter(function(item) { return item.source === 'SKK'; })
      .reduce(function(total, item) { return total + Number(item.points || 0); }, 0);
    const otherManualPoints = Math.max(0, manualPoints - skkPoints);

    return {
      ID: member.ID,
      NTA: member.NTA,
      Nama: member.Nama,
      Krida: member.Krida,
      Status: member.Status,
      attendance: {
        Hadir: counts.Hadir,
        Izin: counts.Izin,
        Sakit: counts.Sakit,
        Alpa: counts.Alpa,
        missing: missingAttendance,
        meetings: eligibleMeetings.length,
        points: Number(attendancePoints.toFixed(2)),
        maxPoints: Number(attendanceMax.toFixed(2)),
        index: attendanceIndex === null ? null : Number(attendanceIndex.toFixed(2))
      },
      manualPoints: Number(manualPoints.toFixed(2)),
      skkPoints: Number(skkPoints.toFixed(2)),
      otherManualPoints: Number(otherManualPoints.toFixed(2)),
      bonusScore: Number(bonusScore.toFixed(2)),
      totalPoints: Number(rawPoints.toFixed(2)),
      totalMaxPoints: Number(rawMax.toFixed(2)),
      score: score === null ? null : Number(score.toFixed(2)),
      predicate: assessmentPredicate_(score, hasData),
      review: assessmentMemberReview_(score, hasData, missingAttendance),
      components: componentRows
    };
  });

  const scored = rows.filter(function(item) { return item.score !== null; });
  const average = scored.length
    ? scored.reduce(function(total, item) { return total + Number(item.score || 0); }, 0) / scored.length
    : 0;
  const predicateCounts = {};
  rows.forEach(function(item) {
    predicateCounts[item.predicate] = (predicateCounts[item.predicate] || 0) + 1;
  });

  const componentSummary = activeComponents.map(function(component) {
    const values = rows.map(function(row) {
      const item = row.components.find(function(comp) { return String(comp.id) === String(component.ID); });
      return item && item.index !== null ? Number(item.index) : null;
    }).filter(function(value) { return value !== null; });
    return {
      ID: component.ID,
      Kode: component.Kode,
      NamaKomponen: component.NamaKomponen,
      TipeSumber: isSkkComponent_(component) ? 'SKK' : component.TipeSumber,
      Mode: String(parseAssessmentRules_(component).Mode || '').toUpperCase() === 'BONUS' ? 'BONUS' : 'WEIGHTED',
      Bobot: Number(component.Bobot || 0),
      PoinMaksimum: Number(component.PoinMaksimum || 0),
      averageIndex: values.length ? Number((values.reduce(function(a,b){ return a+b; },0) / values.length).toFixed(2)) : null
    };
  });

  const reports = getRows_('LaporanPenilaian', db).filter(function(item) {
    return String(item.Periode || '') === period;
  }).sort(function(a, b) {
    return String(b.DiubahPada || b.DibuatPada || '').localeCompare(String(a.DiubahPada || a.DibuatPada || ''));
  });

  return {
    period: period,
    periodLabel: penilaianPeriodLabel_(period),
    meetingCount: meetings.length,
    components: componentsAll,
    activeComponents: componentSummary,
    attendanceRules: attendanceRules,
    entries: manualEntries,
    rows: rows,
    summary: {
      totalMembers: rows.length,
      assessedMembers: scored.length,
      averageScore: Number(average.toFixed(2)),
      totalPoints: Number(rows.reduce(function(total, item) { return total + Number(item.totalPoints || 0); }, 0).toFixed(2)),
      predicateCounts: predicateCounts,
      activeWeightTotal: Number(totalActiveWeight.toFixed(2)),
      bonusMaxTotal: Number(totalBonusMax.toFixed(2)),
      skkCompleted: manualEntries.filter(function(item) { return String(item.KomponenKode || '').toUpperCase() === ASSESSMENT.SKK_CODE; }).length,
      review: assessmentOverallReview_(average, scored.length, rows.length, meetings.length)
    },
    report: reports.length ? {
      ID: reports[0].ID,
      PDFFileID: reports[0].PDFFileID,
      PDFUrl: reports[0].PDFUrl,
      DibuatOleh: reports[0].DibuatOleh,
      DibuatPada: reports[0].DibuatPada,
      DiubahPada: reports[0].DiubahPada
    } : null
  };
}

function getPenilaianBulanan(token, period) {
  requirePermission_(token, 'penilaian', 'view');
  return buildPenilaianBulananData_(period);
}

function saveKomponenPenilaian(token, data) {
  const session = requireSession_(token, ['ADMIN']);
  data = data || {};
  const db = assertPenilaianStructure_();

  validateRequired_(data, ['NamaKomponen','TipeSumber','Bobot','PoinMaksimum','Status']);
  const id = String(data.ID || '').trim();
  const type = String(data.TipeSumber || '').trim().toUpperCase();
  validateEnum_(type, ['ABSENSI','MANUAL'], 'Tipe sumber');
  const status = normalizePenilaianStatus_(data.Status);
  validateEnum_(status, ['Aktif','Nonaktif'], 'Status komponen');
  if (type === 'ABSENSI' && status !== 'Aktif') {
    throw new Error('Komponen Absensi merupakan komponen dasar dan harus tetap Aktif.');
  }

  const components = getRows_('KomponenPenilaian', db);
  const existing = id ? components.find(function(item) { return String(item.ID || '') === id; }) : null;
  if (id && !existing) throw new Error('Komponen penilaian tidak ditemukan.');
  if (existing && String(existing.TipeSumber || '').toUpperCase() === 'ABSENSI' && type !== 'ABSENSI') {
    throw new Error('Komponen Absensi tidak dapat diubah menjadi komponen manual.');
  }

  let code = normalizeAssessmentCode_(data.Kode || (existing && existing.Kode) || data.NamaKomponen);
  if (existing && String(existing.TipeSumber || '').toUpperCase() === 'ABSENSI') code = ASSESSMENT.DEFAULT_ATTENDANCE_CODE;
  const existingIsSkk = !!(existing && isSkkComponent_(existing));
  if (existingIsSkk) code = ASSESSMENT.SKK_CODE;
  const isSkk = code === ASSESSMENT.SKK_CODE || existingIsSkk;
  if (isSkk && type !== 'MANUAL') throw new Error('Komponen SKK harus menggunakan sumber checklist SKK.');

  if (components.some(function(item) {
    return String(item.ID || '') !== id && String(item.Kode || '').trim().toUpperCase() === code;
  })) throw new Error('Kode komponen sudah digunakan.');

  if (type === 'ABSENSI' && components.some(function(item) {
    return String(item.ID || '') !== id && String(item.TipeSumber || '').toUpperCase() === 'ABSENSI';
  })) throw new Error('Komponen sumber Absensi hanya boleh satu.');

  const weight = Number(data.Bobot);
  const maxPoints = Number(data.PoinMaksimum);
  const order = Math.max(1, Math.min(999, Number(data.Urutan || 1)));
  if (!Number.isFinite(weight) || weight <= 0 || weight > 100) throw new Error('Bobot harus lebih dari 0 dan maksimum 100.');
  if (!Number.isFinite(maxPoints) || maxPoints <= 0 || maxPoints > 10000) throw new Error('Poin maksimum harus lebih dari 0.');

  if (existing && type === 'MANUAL' && !isSkk) {
    const historicalTotals = {};
    getRows_('PenilaianAnggota', db).forEach(function(row) {
      if (String(row.KomponenID || '') !== id) return;
      const key = String(row.Periode || String(row.Tanggal || '').substring(0, 7)) + '|' + String(row.AnggotaID || '');
      historicalTotals[key] = (historicalTotals[key] || 0) + Math.max(0, Number(row.Poin || 0));
    });
    const historicalMax = Object.keys(historicalTotals).reduce(function(max, key) {
      return Math.max(max, Number(historicalTotals[key] || 0));
    }, 0);
    if (maxPoints + 1e-9 < historicalMax) {
      throw new Error('Poin maksimum tidak boleh lebih kecil dari riwayat poin bulanan tertinggi (' + historicalMax + ').');
    }
  }

  let rulesJson = '';
  if (isSkk) {
    const oldRules = parseAssessmentRules_(existing || {});
    const pointPerItem = Number(data.PoinPerButir || oldRules.PoinPerButir || ASSESSMENT.SKK_POINT_PER_ITEM);
    if (!Number.isFinite(pointPerItem) || pointPerItem <= 0 || pointPerItem > 10000) {
      throw new Error('Poin per butir SKK harus lebih dari 0.');
    }
    rulesJson = JSON.stringify({ Mode: 'BONUS', Kind: 'SKK_CHECKLIST', PoinPerButir: pointPerItem });
  } else if (type === 'ABSENSI') {
    const rules = {};
    ['Hadir','Izin','Sakit','Alpa'].forEach(function(key) {
      const value = Number(data['Poin' + key]);
      if (!Number.isFinite(value) || value < 0 || value > maxPoints) {
        throw new Error('Poin ' + key + ' harus berada antara 0 dan Poin Maksimum.');
      }
      rules[key] = value;
    });
    if (rules.Hadir <= 0) throw new Error('Poin Hadir harus lebih dari 0.');
    rulesJson = JSON.stringify(rules);
  }

  return withLock_(function() {
    const saved = upsert_('KomponenPenilaian', 'KPN', {
      ID: id,
      Kode: code,
      NamaKomponen: String(data.NamaKomponen || '').trim().slice(0, 80),
      TipeSumber: type,
      Bobot: weight,
      PoinMaksimum: maxPoints,
      AturanJSON: rulesJson,
      Status: status,
      Urutan: order,
      Keterangan: String(data.Keterangan || '').trim().slice(0, 500)
    });
    saveSystemLog_(session.Nama, (id ? 'Ubah' : 'Tambah') + ' komponen penilaian ' + saved.NamaKomponen);
    return saved;
  }, false);
}

function deleteKomponenPenilaian(token, id) {
  const session = requireSession_(token, ['ADMIN']);
  assertPenilaianStructure_();
  const item = findById_('KomponenPenilaian', id);
  if (!item) throw new Error('Komponen penilaian tidak ditemukan.');
  if (String(item.TipeSumber || '').toUpperCase() === 'ABSENSI') {
    throw new Error('Komponen Absensi merupakan komponen inti dan tidak dapat dihapus. Ubah bobot/aturan bila diperlukan.');
  }
  if (isSkkComponent_(item)) {
    throw new Error('Komponen SKK terhubung ke checklist master dan tidak dapat dihapus. Ubah Status menjadi Nonaktif bila tidak digunakan.');
  }
  const used = getRows_('PenilaianAnggota').some(function(row) {
    return String(row.KomponenID || '') === String(id || '');
  });
  if (used) throw new Error('Komponen sudah memiliki riwayat penilaian. Ubah Status menjadi Nonaktif agar histori tetap aman.');

  return withLock_(function() {
    const result = deleteRow_('KomponenPenilaian', id);
    saveSystemLog_(session.Nama, 'Hapus komponen penilaian ' + String(item.NamaKomponen || id));
    return result;
  }, false);
}

function savePenilaianAnggota(token, data) {
  data = data || {};
  const session = requirePermission_(token, 'penilaian', data.ID ? 'edit' : 'create');
  const db = assertPenilaianStructure_();
  validateRequired_(data, ['Tanggal','AnggotaID','KomponenID','Poin']);
  validateDateString_(data.Tanggal, 'Tanggal penilaian');

  const member = getRows_('Anggota', db).find(function(item) {
    return String(item.ID || '') === String(data.AnggotaID || '');
  });
  if (!member) throw new Error('Anggota tidak ditemukan.');

  const component = getRows_('KomponenPenilaian', db).find(function(item) {
    return String(item.ID || '') === String(data.KomponenID || '');
  });
  if (!component) throw new Error('Komponen penilaian tidak ditemukan.');
  if (String(component.TipeSumber || '').toUpperCase() !== 'MANUAL') {
    throw new Error('Komponen Absensi dihitung otomatis dan tidak dapat diinput manual.');
  }
  if (isSkkComponent_(component)) {
    throw new Error('Poin SKK hanya dapat diberikan melalui Checklist SKK agar satu butir tidak dihitung ganda.');
  }

  const period = String(data.Tanggal).substring(0, 7);
  const id = String(data.ID || '').trim();
  const assessmentRows = getRows_('PenilaianAnggota', db);
  const existingEntry = id ? assessmentRows.find(function(item) { return String(item.ID || '') === id; }) : null;
  if (id && !existingEntry) throw new Error('Catatan penilaian yang akan diperbarui tidak ditemukan.');
  if (normalizePenilaianStatus_(component.Status) !== 'Aktif') {
    if (!existingEntry) {
      throw new Error('Komponen penilaian sedang Nonaktif dan tidak dapat dipakai untuk poin baru.');
    }
    const oldPeriod = String(existingEntry.Periode || String(existingEntry.Tanggal || '').substring(0, 7));
    if (String(existingEntry.KomponenID || '') !== String(component.ID || '') || oldPeriod !== period) {
      throw new Error('Komponen Nonaktif hanya dapat dipakai untuk mengoreksi catatan historis pada komponen dan bulan yang sama.');
    }
  }

  const points = Number(data.Poin);
  const maxPoints = Number(component.PoinMaksimum || 0);
  if (!Number.isFinite(points) || points < 0) throw new Error('Poin tidak valid.');
  if (!Number.isFinite(maxPoints) || maxPoints <= 0) throw new Error('Poin maksimum komponen tidak valid.');

  const existingMonthPoints = assessmentRows.filter(function(item) {
    return String(item.ID || '') !== id &&
      String(item.Periode || String(item.Tanggal || '').substring(0, 7)) === period &&
      String(item.AnggotaID || '') === String(member.ID || '') &&
      String(item.KomponenID || '') === String(component.ID || '');
  }).reduce(function(total, item) { return total + Math.max(0, Number(item.Poin || 0)); }, 0);

  if (existingMonthPoints + points > maxPoints + 1e-9) {
    throw new Error(
      'Total poin ' + component.NamaKomponen + ' untuk ' + member.Nama +
      ' pada bulan ini melebihi maksimum ' + maxPoints + '. Sisa poin yang dapat diberikan: ' +
      Math.max(0, maxPoints - existingMonthPoints) + '.'
    );
  }

  return withLock_(function() {
    const saved = upsert_('PenilaianAnggota', 'PNA', {
      ID: id,
      Tanggal: data.Tanggal,
      Periode: period,
      AnggotaID: member.ID,
      NTA: member.NTA,
      NamaAnggota: member.Nama,
      KomponenID: component.ID,
      KomponenKode: component.Kode,
      KomponenNama: component.NamaKomponen,
      ReferensiID: String(data.ReferensiID || '').trim().slice(0, 100),
      Poin: points,
      PoinMaksimum: maxPoints,
      Catatan: String(data.Catatan || '').trim().slice(0, 1000),
      Petugas: String(session.Nama || '')
    });
    saveSystemLog_(session.Nama, (id ? 'Ubah' : 'Tambah') + ' poin ' + component.NamaKomponen + ' untuk ' + member.Nama);
    return saved;
  }, false);
}

function deletePenilaianAnggota(token, id) {
  const session = requirePermission_(token, 'penilaian', 'delete');
  assertPenilaianStructure_();
  const item = findById_('PenilaianAnggota', id);
  if (!item) throw new Error('Catatan penilaian tidak ditemukan.');
  if (String(item.KomponenKode || '').trim().toUpperCase() === ASSESSMENT.SKK_CODE) {
    throw new Error('Catatan SKK dikelola melalui Checklist SKK. Buka checklist anggota untuk membatalkan tanda centang.');
  }
  return withLock_(function() {
    const result = deleteRow_('PenilaianAnggota', id);
    saveSystemLog_(session.Nama, 'Hapus poin ' + String(item.KomponenNama || '') + ' untuk ' + String(item.NamaAnggota || ''));
    return result;
  }, false);
}


function getSkkChecklist(token, anggotaId) {
  requirePermission_(token, 'penilaian', 'view');
  const db = assertPenilaianStructure_();
  const member = getRows_('Anggota', db).find(function(item) {
    return String(item.ID || '') === String(anggotaId || '');
  });
  if (!member) throw new Error('Anggota tidak ditemukan.');

  let component = getRows_('KomponenPenilaian', db).find(function(item) { return isSkkComponent_(item); });
  if (!component) component = seedDefaultSkkComponent_();
  if (!component) throw new Error('Komponen SKK belum tersedia. Jalankan Update Struktur.');

  // Self-heal master setiap checklist dibuka. seedSkkMaster_() hanya menambah kode
  // yang belum ada, sehingga aman dipanggil berulang dan mencegah master parsial.
  seedSkkMaster_();
  const catalogSource = getRows_('MasterSKK', db);
  const catalog = catalogSource.filter(function(item) {
    return String(item.Status || 'Aktif').trim().toLowerCase() === 'aktif' &&
      String(item.ID || '').trim() &&
      String(item.Krida || '').trim() &&
      String(item.KelompokSKK || '').trim() &&
      String(item.Butir || '').trim();
  }).sort(function(a, b) {
    return Number(a.Urutan || 9999) - Number(b.Urutan || 9999);
  });
  if (!catalog.length) {
    throw new Error('MasterSKK belum memiliki butir yang valid. Jalankan System Maintenance → Update Struktur lalu buka kembali Checklist SKK.');
  }
  const completion = getRows_('PenilaianAnggota', db).filter(function(item) {
    return String(item.AnggotaID || '') === String(member.ID || '') &&
      String(item.KomponenKode || '').trim().toUpperCase() === ASSESSMENT.SKK_CODE &&
      String(item.ReferensiID || '').trim();
  }).map(function(item) { return serializeObject_(item); });
  const pointPerItem = skkPointPerItem_(component);

  return {
    member: {
      ID: member.ID, NTA: member.NTA, Nama: member.Nama, Krida: member.Krida, Status: member.Status
    },
    component: {
      ID: component.ID,
      NamaKomponen: component.NamaKomponen,
      Status: component.Status,
      PoinPerButir: pointPerItem,
      PoinMaksimum: Number(component.PoinMaksimum || 0),
      BonusMaksimum: Number(component.Bobot || 0)
    },
    catalog: catalog.map(function(item) { return serializeObject_(item); }),
    completion: completion,
    stats: {
      totalItems: catalog.length,
      expectedItems: SKK_MASTER_DEFAULTS.length,
      completedItems: completion.length,
      totalEarnedPoints: Number(completion.reduce(function(total, item) { return total + Math.max(0, Number(item.Poin || 0)); }, 0).toFixed(2))
    }
  };
}

function saveSkkChecklist(token, anggotaId, tanggal, changes) {
  const session = requirePermission_(token, 'penilaian', 'view');
  assertPenilaianStructure_();
  validateDateString_(tanggal, 'Tanggal checklist SKK');
  changes = Array.isArray(changes) ? changes : [];
  if (!changes.length) return { success: true, created: 0, removed: 0, unchanged: 0 };
  if (changes.length > 100) throw new Error('Maksimum 100 perubahan checklist dalam satu penyimpanan.');

  const seen = new Set();
  changes.forEach(function(change) {
    const id = String(change && change.MasterSKKID || '').trim();
    if (!id) throw new Error('ID butir SKK tidak valid.');
    if (seen.has(id)) throw new Error('Butir SKK yang sama dikirim lebih dari satu kali.');
    seen.add(id);
  });

  return withLock_(function() {
    const db = getDatabase_();
    const member = getRows_('Anggota', db).find(function(item) {
      return String(item.ID || '') === String(anggotaId || '');
    });
    if (!member) throw new Error('Anggota tidak ditemukan.');
    const component = getRows_('KomponenPenilaian', db).find(function(item) { return isSkkComponent_(item); });
    if (!component) throw new Error('Komponen SKK belum tersedia. Jalankan Update Struktur.');
    if (normalizePenilaianStatus_(component.Status) !== 'Aktif') throw new Error('Komponen SKK sedang Nonaktif.');

    const catalogRows = getRows_('MasterSKK', db);
    const catalogMap = {};
    catalogRows.forEach(function(item) { catalogMap[String(item.ID || '')] = item; });
    changes.forEach(function(change) {
      const master = catalogMap[String(change.MasterSKKID || '')];
      if (!master || String(master.Status || 'Aktif').toLowerCase() !== 'aktif') {
        throw new Error('Salah satu butir SKK tidak ditemukan atau sudah Nonaktif.');
      }
    });

    const sheet = db.getSheetByName('PenilaianAnggota');
    const headers = ensureSheetHeaders_(sheet, APP.SHEETS.PenilaianAnggota);
    const allRows = getRows_('PenilaianAnggota', db);
    const existingByRef = {};
    allRows.forEach(function(item) {
      if (String(item.AnggotaID || '') !== String(member.ID || '')) return;
      if (String(item.KomponenKode || '').trim().toUpperCase() !== ASSESSMENT.SKK_CODE) return;
      if (!String(item.ReferensiID || '').trim()) return;
      existingByRef[String(item.ReferensiID)] = item;
    });

    const toCreate = [];
    const removeIds = new Set();
    let unchanged = 0;
    changes.forEach(function(change) {
      const ref = String(change.MasterSKKID || '');
      const checked = permissionBoolean_(change.Checked);
      const existing = existingByRef[ref];
      if (checked && existing) { unchanged += 1; return; }
      if (!checked && !existing) { unchanged += 1; return; }
      if (!checked && existing) { removeIds.add(String(existing.ID || '')); return; }
      if (checked) toCreate.push(catalogMap[ref]);
    });

    if (toCreate.length) requirePermission_(token, 'penilaian', 'create');
    if (removeIds.size) requirePermission_(token, 'penilaian', 'delete');

    // Hapus koreksi checklist dari baris paling bawah agar indeks baris tidak bergeser.
    let removed = 0;
    if (removeIds.size && sheet.getLastRow() > 1) {
      const idIndex = headers.indexOf('ID');
      const values = sheet.getRange(2, 1, sheet.getLastRow() - 1, headers.length).getValues();
      const rowNumbers = [];
      values.forEach(function(row, offset) {
        if (removeIds.has(String(row[idIndex] || ''))) rowNumbers.push(offset + 2);
      });
      rowNumbers.sort(function(a,b){ return b-a; }).forEach(function(rowNumber) {
        sheet.deleteRow(rowNumber);
        removed += 1;
      });
    }

    let created = 0;
    if (toCreate.length) {
      const tz = Session.getScriptTimeZone() || 'Asia/Jakarta';
      const now = Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd HH:mm:ss');
      const period = String(tanggal).substring(0, 7);
      const pointPerItem = skkPointPerItem_(component);
      const records = toCreate.map(function(master) {
        const record = {
          ID: createId_('PNA'),
          Tanggal: tanggal,
          Periode: period,
          AnggotaID: member.ID,
          NTA: member.NTA,
          NamaAnggota: member.Nama,
          KomponenID: component.ID,
          KomponenKode: ASSESSMENT.SKK_CODE,
          KomponenNama: component.NamaKomponen,
          ReferensiID: master.ID,
          Poin: pointPerItem,
          PoinMaksimum: Number(component.PoinMaksimum || 0),
          Catatan: String(master.KelompokSKK || 'SKK') + ': ' + String(master.Butir || ''),
          Petugas: String(session.Nama || ''),
          DibuatPada: now,
          DiubahPada: now
        };
        return headers.map(function(header) { return Object.prototype.hasOwnProperty.call(record, header) ? record[header] : ''; });
      });
      sheet.getRange(sheet.getLastRow() + 1, 1, records.length, headers.length).setValues(sheetLiteralRows_(records));
      created = records.length;
    }

    saveSystemLog_(session.Nama,
      'Checklist SKK ' + member.Nama + ': +' + created + ' butir, -' + removed + ' butir');
    return { success: true, created: created, removed: removed, unchanged: unchanged };
  }, false);
}

function getPenilaianReportFolder_(period) {
  const root = getActivityReportRootFolder_();
  let monthlyRoot;
  const roots = root.getFoldersByName('Penilaian Bulanan');
  monthlyRoot = roots.hasNext() ? roots.next() : root.createFolder('Penilaian Bulanan');
  const periodName = normalizePenilaianPeriod_(period);
  const periods = monthlyRoot.getFoldersByName(periodName);
  return periods.hasNext() ? periods.next() : monthlyRoot.createFolder(periodName);
}

function appendPenilaianCover_(body, data) {
  appendReportSpacer_(body, 18);
  try {
    const image = body.appendImage(reportLogoBlob_());
    image.setWidth(92).setHeight(85);
    image.getParent().asParagraph().setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  } catch (_) {}
  appendReportParagraph_(body, 'SAKA DIRGANTARA', { size: 15, bold: true, color: REPORT_THEME.NAVY, align: 'center', spacingAfter: 3 });
  appendReportParagraph_(body, 'REKAP PENILAIAN KEAKTIFAN ANGGOTA', { size: 18, bold: true, color: REPORT_THEME.BLUE, align: 'center', spacingAfter: 4 });
  appendReportParagraph_(body, String(data.periodLabel || ''), { size: 13, bold: true, color: REPORT_THEME.TEXT, align: 'center', spacingAfter: 16 });
  appendReportKeyValueTable_(body, [
    ['Jumlah Anggota', String(data.summary.totalMembers || 0)],
    ['Anggota Dinilai', String(data.summary.assessedMembers || 0)],
    ['Pertemuan Absensi', String(data.meetingCount || 0)],
    ['Checklist SKK Bulan Ini', String(data.summary.skkCompleted || 0)],
    ['Rata-rata Indeks', Number(data.summary.averageScore || 0).toFixed(1) + ' / 100']
  ]);
  appendReportSpacer_(body, 12);
  appendReportNote_(body, String(data.summary.review || ''));
}

function appendPenilaianComponents_(body, data) {
  appendReportSection_(body, 'A', 'Komponen dan Aturan Penilaian');
  const active = data.activeComponents || [];
  const table = body.appendTable([['Komponen','Sumber','Bobot / Bonus','Poin Maks.','Rata-rata']]);
  styleReportTable_(table, { borderWidth: 0.5, widths: [170,70,60,85,90] });
  for (let c = 0; c < 5; c++) setReportCellText_(table.getRow(0).getCell(c), table.getRow(0).getCell(c).getText(), {
    background: REPORT_THEME.NAVY, color: REPORT_THEME.WHITE, bold: true, size: 8.5, align: c >= 2 ? 'center' : 'left'
  });
  active.forEach(function(item) {
    const row = table.appendTableRow();
    const values = [
      String(item.NamaKomponen || '-'),
      String(item.TipeSumber || '-'),
      item.Mode === 'BONUS' ? ('+' + Number(item.Bobot || 0).toFixed(0) + ' indeks') : (Number(item.Bobot || 0).toFixed(0) + '%'),
      Number(item.PoinMaksimum || 0).toFixed(0),
      item.averageIndex === null ? '-' : Number(item.averageIndex).toFixed(1)
    ];
    values.forEach(function(value, i) { setReportCellText_(row.appendTableCell(), value, { size: 8.2, align: i >= 2 ? 'center' : 'left' }); });
  });
  const rules = data.attendanceRules || {};
  appendReportNote_(body,
    'Aturan Absensi: Hadir ' + Number(rules.Hadir || 0) + ' poin, Izin ' + Number(rules.Izin || 0) +
    ' poin, Sakit ' + Number(rules.Sakit || 0) + ' poin, Alpa ' + Number(rules.Alpa || 0) + ' poin. ' +
    'Bobot komponen reguler dinormalisasi pada Indeks 0–100. Komponen bertipe BONUS seperti SKK menambah indeks tanpa mengurangi nilai dasar, sampai batas bonus yang ditetapkan.'
  );
}

function appendPenilaianMemberTable_(body, data) {
  appendReportSection_(body, 'B', 'Rekap Skor Anggota');
  const headers = ['No','Nama / NTA','H/I/S/A','Poin Abs.','SKK','Lain','Total','Indeks','Predikat'];
  const table = body.appendTable([headers]);
  styleReportTable_(table, { borderWidth: 0.5, widths: [22,128,52,48,40,40,44,44,70] });
  headers.forEach(function(value, c) {
    setReportCellText_(table.getRow(0).getCell(c), value, {
      background: REPORT_THEME.NAVY, color: REPORT_THEME.WHITE, bold: true, size: 7.5, align: c === 1 ? 'left' : 'center', padding: 4
    });
  });
  (data.rows || []).forEach(function(item, index) {
    const a = item.attendance || {};
    const values = [
      String(index + 1),
      String(item.Nama || '-') + '\n' + String(item.NTA || '-'),
      [a.Hadir || 0, a.Izin || 0, a.Sakit || 0, a.Alpa || 0].join('/'),
      Number(a.points || 0).toFixed(1),
      Number(item.skkPoints || 0).toFixed(1),
      Number(item.otherManualPoints || 0).toFixed(1),
      Number(item.totalPoints || 0).toFixed(1),
      item.score === null ? '-' : Number(item.score).toFixed(1),
      String(item.predicate || '-')
    ];
    const row = table.appendTableRow();
    values.forEach(function(value, c) {
      setReportCellText_(row.appendTableCell(), value, { size: 7.4, align: c === 1 || c === 7 ? 'left' : 'center', padding: 3.5 });
    });
  });
  appendReportNote_(body, 'H/I/S/A = Hadir / Izin / Sakit / Alpa. Urutan nama dibuat alfabetis, bukan peringkat.');
}

function appendPenilaianReview_(body, data) {
  appendReportSection_(body, 'C', 'Review Keseluruhan');
  appendReportParagraph_(body, String(data.summary.review || '-'), { size: 10.5, lineSpacing: 1.2, spacingAfter: 8 });
  const counts = data.summary.predicateCounts || {};
  appendReportKeyValueTable_(body, [
    ['Sangat Aktif', String(counts['Sangat Aktif'] || 0)],
    ['Aktif', String(counts['Aktif'] || 0)],
    ['Cukup Aktif', String(counts['Cukup Aktif'] || 0)],
    ['Perlu Penguatan', String(counts['Perlu Penguatan'] || 0)],
    ['Belum Dinilai', String(counts['Belum Dinilai'] || 0)]
  ]);
}

function generatePenilaianBulananPdf(token, period) {
  const session = requirePermission_(token, 'penilaian', 'create');
  period = normalizePenilaianPeriod_(period);
  const data = buildPenilaianBulananData_(period);
  const folder = getPenilaianReportFolder_(period);
  const fileBase = 'Skor Keaktifan SAKA Dirgantara - ' + period;
  const doc = DocumentApp.create(fileBase + ' (temp)');
  const docFile = DriveApp.getFileById(doc.getId());
  try { docFile.moveTo(folder); } catch (_) {}
  const body = doc.getBody();
  try {
    body.setPageWidth(595.28).setPageHeight(841.89);
    body.setMarginTop(42).setMarginBottom(42).setMarginLeft(40).setMarginRight(40);
  } catch (_) {}
  appendReportFooter_(doc);

  appendPenilaianCover_(body, data);
  body.appendPageBreak();
  appendPenilaianComponents_(body, data);
  appendPenilaianMemberTable_(body, data);
  body.appendPageBreak();
  appendPenilaianReview_(body, data);
  appendReportSpacer_(body, 16);
  appendReportParagraph_(body, 'Dibuat oleh: ' + String(session.Nama || '-') + ' • ' + formatDateIdLong_(todayYmd_()), {
    size: 8.5, color: REPORT_THEME.MUTED, align: 'right'
  });

  doc.saveAndClose();
  const pdfBlob = docFile.getAs(MimeType.PDF).setName(fileBase + '.pdf');
  const pdfFile = folder.createFile(pdfBlob);
  try { docFile.setTrashed(true); } catch (_) {}

  assertPenilaianStructure_();
  let previousPdfId = '';

  const saved = withLock_(function() {
    const current = getRows_('LaporanPenilaian').find(function(item) {
      return String(item.Periode || '') === period;
    }) || {};
    previousPdfId = current.PDFFileID || '';
    return upsert_('LaporanPenilaian', 'LPN', {
      ID: current.ID || '',
      Periode: period,
      PDFFileID: pdfFile.getId(),
      PDFUrl: pdfFile.getUrl(),
      DibuatOleh: String(session.Nama || '')
    });
  }, false);

  trashReplacedPdf_(previousPdfId, pdfFile.getId());

  saveSystemLog_(session.Nama, 'Generate PDF penilaian keaktifan ' + period);
  return {
    success: true,
    period: period,
    periodLabel: data.periodLabel,
    fileId: pdfFile.getId(),
    name: pdfFile.getName(),
    url: pdfFile.getUrl(),
    report: saved,
    message: 'PDF skor keaktifan bulanan berhasil dibuat.'
  };
}

function getPenilaianPdfPayload(token, fileId) {
  requirePermission_(token, 'penilaian', 'view');
  const db = assertPenilaianStructure_();
  const allowed = getRows_('LaporanPenilaian', db).some(function(item) {
    return String(item.PDFFileID || '') === String(fileId || '');
  });
  if (!allowed) throw new Error('File PDF penilaian tidak dikenali oleh sistem.');
  let file;
  try { file = DriveApp.getFileById(String(fileId || '')); }
  catch (_) { throw new Error('File PDF penilaian tidak ditemukan di Google Drive.'); }
  const blob = file.getBlob();
  const bytes = blob.getBytes();
  if (bytes.length > 5 * 1024 * 1024) {
    throw new Error('PDF lebih dari 5 MB. Gunakan tombol Buka PDF lalu bagikan file secara manual.');
  }
  return {
    name: file.getName(),
    mimeType: 'application/pdf',
    base64: Utilities.base64Encode(bytes),
    size: bytes.length
  };
}

/* =========================================================
   KAS
========================================================= */

function saveKas(token, data) {
  data = data || {};
  requirePermission_(token, 'kas', data.ID ? 'edit' : 'create');

  validateRequired_(data, [
    'Tanggal','Jenis','Nominal'
  ]);
  validateDateString_(data.Tanggal, 'Tanggal transaksi');
  validateEnum_(data.Jenis, ['Pemasukan','Pengeluaran'], 'Jenis transaksi');

  data.Nominal = Number(data.Nominal);
  data.NoBukti = String(data.NoBukti || '').trim();
  data.KegiatanID = String(data.KegiatanID || '').trim();

  if (!Number.isFinite(data.Nominal) || data.Nominal < 0) {
    throw new Error('Nominal kas tidak valid.');
  }

  if (data.NoBukti.length > 80) {
    throw new Error('Nomor bukti terlalu panjang. Maksimum 80 karakter.');
  }

  if (data.KegiatanID && !findById_('Kegiatan', data.KegiatanID)) {
    throw new Error('Kegiatan terkait transaksi kas tidak ditemukan.');
  }

  return withLock_(function() {
    return upsert_('Kas', 'KAS', data);
  });
}

function deleteKas(token, id) {
  requirePermission_(token, 'kas', 'delete');

  return withLock_(function() {
    return deleteRow_('Kas', id);
  });
}


/* =========================================================
   INVENTARIS
========================================================= */

function inventoryDamaged_(item) {
  if (item.JumlahRusak !== '' && item.JumlahRusak !== undefined && item.JumlahRusak !== null) {
    return Math.max(0, Number(item.JumlahRusak) || 0);
  }
  // Legacy master: non-good condition applies to the whole recorded quantity.
  return item.Kondisi && item.Kondisi !== 'Baik' ? Math.max(0, Number(item.Jumlah) || 0) : 0;
}

function inventoryAvailability_(inventory, usages, excludeId) {
  const reserved = (usages || []).filter(function(row) {
    return String(row.InventarisID) === String(inventory.ID) &&
      row.StatusPemakaian === 'Dipakai' && String(row.ID) !== String(excludeId || '');
  }).reduce(function(total, row) { return total + Number(row.JumlahDipakai || 0); }, 0);
  return Math.max(0, Number(inventory.Jumlah || 0) - inventoryDamaged_(inventory) - reserved);
}

function inventoryCatalog_(database) {
  const usages = getRows_('KegiatanInventaris', database);
  return getRows_('Inventaris', database).map(function(item) {
    return Object.assign({}, item, {
      JumlahRusak: inventoryDamaged_(item),
      Tersedia: inventoryAvailability_(item, usages),
      SedangDipakai: usages.filter(function(row) {
        return String(row.InventarisID) === String(item.ID) && row.StatusPemakaian === 'Dipakai';
      }).reduce(function(total, row) { return total + Number(row.JumlahDipakai || 0); }, 0)
    });
  });
}

function saveInventaris(token, data) {
  data = data || {};
  requirePermission_(token, 'inventaris', data.ID ? 'edit' : 'create');

  validateRequired_(data, [
    'NamaBarang','Jumlah'
  ]);

  if (data.Kondisi) {
    validateEnum_(
      data.Kondisi,
      ['Baik','Rusak Ringan','Rusak Berat','Hilang'],
      'Kondisi inventaris'
    );
  }

  data.Jumlah = Number(data.Jumlah);

  if (!Number.isFinite(data.Jumlah) || !Number.isInteger(data.Jumlah) || data.Jumlah < 0) {
    throw new Error('Jumlah inventaris harus berupa bilangan bulat 0 atau lebih.');
  }

  return withLock_(function() {
    const kode = String(data.KodeBarang || '').trim() || nextInventoryCode_(data.Kategori);

    if (kode) {
      const duplicate = getRows_('Inventaris').find(item =>
        String(item.KodeBarang || '').trim().toLowerCase() === kode.toLowerCase() &&
        String(item.ID) !== String(data.ID || '')
      );

      if (duplicate) {
        throw new Error('Kode barang sudah digunakan.');
      }

      data.KodeBarang = kode;
    }

    const current = data.ID ? findById_('Inventaris', data.ID) : null;
    const damaged = data.JumlahRusak === '' || data.JumlahRusak === undefined
      ? inventoryDamaged_(Object.assign({}, current || {}, data)) : Number(data.JumlahRusak);
    if (!Number.isInteger(damaged) || damaged < 0 || damaged > data.Jumlah) {
      throw new Error('Jumlah rusak/tidak layak harus bilangan bulat antara 0 dan jumlah fisik.');
    }
    const reserved = getRows_('KegiatanInventaris').filter(function(row) {
      return String(row.InventarisID) === String(data.ID || '') && row.StatusPemakaian === 'Dipakai';
    }).reduce(function(total, row) { return total + Number(row.JumlahDipakai || 0); }, 0);
    if (data.Jumlah - damaged < reserved) throw new Error('Jumlah layak tidak boleh kurang dari barang yang sedang dipakai.');
    data.JumlahRusak = damaged;
    if (damaged === 0) data.Kondisi = 'Baik';
    else if (!data.Kondisi || data.Kondisi === 'Baik') data.Kondisi = 'Rusak Ringan';
    const saved = upsert_('Inventaris', 'INV', data);
    return Object.assign({}, saved, { SedangDipakai: reserved, Tersedia: data.Jumlah - damaged - reserved });
  });
}

function deleteInventaris(token, id) {
  requirePermission_(token, 'inventaris', 'delete');

  return withLock_(function() {
    const hasUsage = getRows_('KegiatanInventaris').some(item =>
      String(item.InventarisID || '') === String(id || '')
    );
    if (hasUsage) {
      throw new Error('Inventaris memiliki riwayat pemakaian kegiatan dan tidak dapat dihapus.');
    }
    return deleteRow_('Inventaris', id);
  });
}


/* =========================================================
   PEMAKAIAN INVENTARIS PER KEGIATAN
   - Catatan baru mereservasi stok; pengembalian merekonsiliasi kehilangan dan kerusakan. Legacy tidak mengubah stok.
   - Foto kondisi disimpan di Drive melalui sheet Dokumentasi.
========================================================= */

function ensureKegiatanInventarisSheet_() {
  const ss = getDatabase_();
  let sheet = ss.getSheetByName('KegiatanInventaris');

  if (!sheet) {
    sheet = ss.insertSheet('KegiatanInventaris');
    ensureSheetHeaders_(sheet, APP.SHEETS.KegiatanInventaris);
    formatSheet_(sheet, sheet.getLastColumn());
  } else {
    ensureSheetHeaders_(sheet, APP.SHEETS.KegiatanInventaris);
  }

  return sheet;
}

function getKegiatanInventarisRows_(kegiatanId) {
  ensureKegiatanInventarisSheet_();
  return getRows_('KegiatanInventaris')
    .filter(item => String(item.KegiatanID || '') === String(kegiatanId || ''))
    .sort((a, b) => String(a.NamaBarang || '').localeCompare(String(b.NamaBarang || ''), 'id'));
}

function saveKegiatanInventaris(token, kegiatanId, data) {
  requirePermission_(token, 'inventaris', data && data.ID ? 'edit' : 'create');
  data = data || {};
  return withLock_(function() {
    const kegiatan = findById_('Kegiatan', kegiatanId);
    if (!kegiatan) throw new Error('Kegiatan tidak ditemukan.');
    ensureKegiatanInventarisSheet_();
    const existing = data.ID ? findById_('KegiatanInventaris', data.ID) : null;
    if (data.ID && (!existing || String(existing.KegiatanID) !== String(kegiatanId))) {
      throw new Error('Riwayat inventaris tidak ditemukan pada kegiatan ini.');
    }
    if (existing && existing.StatusPemakaian !== 'Dipakai') {
      throw new Error('Catatan selesai/legacy dikunci. Koreksi stok melalui master inventaris dengan catatan penyesuaian.');
    }
    if (existing && String(data.Versi || '') !== String(existing.Versi || '')) {
      throw new Error('Catatan telah diperbarui pengguna lain. Buka ulang detail kegiatan.');
    }
    if (!existing && ['Rencana','Berjalan'].indexOf(kegiatan.Status) === -1) {
      throw new Error('Pengeluaran baru hanya untuk kegiatan Rencana atau Berjalan.');
    }
    const inventoryId = existing ? existing.InventarisID : data.InventarisID;
    if (existing && data.InventarisID && String(data.InventarisID) !== String(inventoryId)) {
      throw new Error('Barang pada riwayat tidak dapat diganti.');
    }
    const inventory = findById_('Inventaris', inventoryId);
    if (!inventory) throw new Error('Barang inventaris tidak ditemukan.');
    const usages = getRows_('KegiatanInventaris');
    if (!existing && usages.some(function(row) {
      return String(row.KegiatanID) === String(kegiatanId) && String(row.InventarisID) === String(inventoryId);
    })) throw new Error('Barang sudah dicatat. Gunakan Edit / Pengembalian pada catatan tersebut.');
    const available = inventoryAvailability_(inventory, usages, existing && existing.ID);
    const used = Number(data.JumlahDipakai);
    if (!Number.isInteger(used) || used <= 0 || used > available) {
      throw new Error('Jumlah dipakai harus bilangan bulat 1 sampai ' + available + ' unit tersedia.');
    }
    const closing = data.StatusPemakaian === 'Selesai';
    if (closing && !existing) throw new Error('Simpan pengeluaran dan foto awal sebelum mencatat pengembalian.');
    if (data.StatusPemakaian && ['Dipakai','Selesai'].indexOf(data.StatusPemakaian) === -1) throw new Error('Status pemakaian tidak valid.');
    const note = String(data.Keterangan || '').trim().slice(0, 500);
    let returned = '', damaged = '', afterCondition = '';
    if (closing) {
      if (data.JumlahSetelah === '' || data.JumlahSetelah === undefined) throw new Error('Jumlah kembali wajib diisi.');
      returned = Number(data.JumlahSetelah);
      damaged = Number(data.JumlahRusakKembali || 0);
      if (!Number.isInteger(returned) || returned < 0 || returned > used) throw new Error('Jumlah kembali harus 0 sampai jumlah dipakai.');
      if (!Number.isInteger(damaged) || damaged < 0 || damaged > returned) throw new Error('Jumlah rusak harus 0 sampai jumlah kembali.');
      afterCondition = String(data.KondisiSetelah || 'Baik');
      validateEnum_(afterCondition, ['Baik','Rusak Ringan','Rusak Berat','Hilang'], 'Kondisi setelah');
      if (damaged > 0 && ['Rusak Ringan','Rusak Berat'].indexOf(afterCondition) === -1) throw new Error('Pilih tingkat kerusakan barang yang kembali rusak.');
      if (damaged === 0 && returned > 0 && afterCondition !== 'Baik') throw new Error('Isi jumlah rusak atau pilih kondisi Baik untuk barang yang kembali.');
      if ((returned < used || damaged > 0) && !note) throw new Error('Keterangan wajib untuk kehilangan atau kerusakan.');
      if (returned === 0) afterCondition = 'Hilang';
    }
    const beforeCondition = String(data.KondisiAwal || (existing && existing.KondisiAwal) || 'Baik');
    validateEnum_(beforeCondition, ['Baik','Rusak Ringan','Rusak Berat','Hilang'], 'Kondisi awal');
    const record = {
      ID: existing ? existing.ID : '', KegiatanID: kegiatan.ID, InventarisID: inventory.ID,
      KodeBarang: inventory.KodeBarang || '', NamaBarang: inventory.NamaBarang || '',
      JumlahAwal: existing ? existing.JumlahAwal : available, JumlahDipakai: used,
      JumlahSetelah: returned, JumlahRusakKembali: damaged,
      KondisiAwal: beforeCondition, KondisiSetelah: afterCondition,
      StatusPemakaian: closing ? 'Selesai' : 'Dipakai', Versi: Utilities.getUuid(),
      FotoAwalID: existing ? existing.FotoAwalID || '' : '',
      FotoSetelahID: existing ? existing.FotoSetelahID || '' : '', Keterangan: note
    };
    // Reconcile lost units once; damaged returns remain physical stock, unavailable.
    const stockPatch = closing ? {
      ID: inventory.ID, Jumlah: Number(inventory.Jumlah) - (used - returned),
      JumlahRusak: inventoryDamaged_(inventory) + damaged,
      Kondisi: inventoryDamaged_(inventory) + damaged > 0
        ? (damaged > 0 ? afterCondition : inventory.Kondisi) : 'Baik'
    } : null;
    if (stockPatch) upsert_('Inventaris', 'INV', stockPatch);
    try {
      return upsert_('KegiatanInventaris', 'KGI', record);
    } catch (error) {
      if (stockPatch) upsert_('Inventaris', 'INV', {
        ID: inventory.ID, Jumlah: inventory.Jumlah,
        JumlahRusak: inventory.JumlahRusak === undefined ? '' : inventory.JumlahRusak,
        Kondisi: inventory.Kondisi || ''
      });
      throw error;
    }
  });
}

function deleteKegiatanInventaris(token, id) {
  const session = requirePermission_(token, 'inventaris', 'delete');
  ensureKegiatanInventarisSheet_();
  return withLock_(function() {
    const item = findById_('KegiatanInventaris', id);
    if (!item) throw new Error('Riwayat inventaris tidak ditemukan.');
    if (item.StatusPemakaian === 'Selesai') throw new Error('Pengembalian selesai tidak dapat dihapus karena stok sudah direkonsiliasi.');
    [item.FotoAwalID, item.FotoSetelahID].forEach(function(documentationId) {
      if (!documentationId) return;
      try {
        const doc = findById_('Dokumentasi', documentationId);
        if (doc && doc.DriveFileID) DriveApp.getFileById(String(doc.DriveFileID)).setTrashed(true);
        deleteRow_('Dokumentasi', documentationId);
      } catch (_) {}
    });
    const deleted = deleteRow_('KegiatanInventaris', id);
    saveSystemLog_(session.Nama, 'Hapus pemakaian inventaris kegiatan ' + String(item.KegiatanID || ''));
    return deleted;
  });
}

function uploadKegiatanInventarisPhoto(token, kegiatanId, recordId, phase, payload) {
  const session = requirePermission_(token, 'inventaris', 'edit');
  return withLock_(function() {
  const kegiatan = findById_('Kegiatan', kegiatanId);
  if (!kegiatan) throw new Error('Kegiatan tidak ditemukan.');
  ensureKegiatanInventarisSheet_();
  const record = findById_('KegiatanInventaris', recordId);
  if (!record || String(record.KegiatanID || '') !== String(kegiatanId || '')) {
    throw new Error('Riwayat inventaris tidak ditemukan pada kegiatan ini.');
  }

  phase = String(phase || '').trim();
  if (['Awal','Setelah'].indexOf(phase) === -1) throw new Error('Tahap foto tidak valid.');
  payload = payload || {};
  const mimeType = String(payload.mimeType || '').trim().toLowerCase();
  const base64 = String(payload.base64 || '').replace(/\s+/g, '');
  if (['image/jpeg','image/png','image/webp'].indexOf(mimeType) === -1) {
    throw new Error('Foto hanya mendukung JPG, PNG, atau WEBP.');
  }
  if (!base64 || base64.length > 4 * 1024 * 1024) {
    throw new Error('Foto terlalu besar atau kosong. Maksimum sekitar 2,3 MB setelah kompresi.');
  }

  let bytes;
  try { bytes = Utilities.base64Decode(base64); }
  catch (_) { throw new Error('Data foto tidak valid.'); }
  if (!bytes || !bytes.length || bytes.length > 2400 * 1024) {
    throw new Error('Ukuran foto setelah kompresi masih terlalu besar. Maksimum sekitar 2,3 MB.');
  }

  ensureDocumentationSheet_();
  const field = phase === 'Awal' ? 'FotoAwalID' : 'FotoSetelahID';
  const oldDocumentationId = String(record[field] || '');
  const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || 'Asia/Jakarta', 'yyyyMMdd-HHmmss');
  const cleanName = String(payload.name || ('inventaris-' + phase + '.jpg'))
    .replace(/[^a-zA-Z0-9 _.-]+/g, '').trim().slice(0, 80) || ('inventaris-' + phase + '.jpg');
  const file = getKegiatanDocumentationFolder_(kegiatan).createFile(
    Utilities.newBlob(bytes, mimeType, stamp + '-' + Utilities.getUuid().substring(0, 6) + '-' + cleanName)
  );

  try {
    const savedDoc = upsert_('Dokumentasi', 'DOC', {
      KegiatanID: kegiatan.ID,
      NamaFile: cleanName,
      MimeType: mimeType,
      DriveFileID: file.getId(),
      Ukuran: bytes.length,
      Keterangan: 'Foto kondisi ' + (phase === 'Awal' ? 'awal' : 'setelah kegiatan') + ' — ' + String(record.NamaBarang || 'inventaris'),
      Urutan: phase === 'Awal' ? 1 : 2,
      Uploader: session.Nama || session.Username || '-',
      JenisDokumentasi: 'Inventaris ' + phase,
      KegiatanInventarisID: record.ID
    });
    const patch = { ID: record.ID };
    patch[field] = savedDoc.ID;
    const savedRecord = upsert_('KegiatanInventaris', 'KGI', patch);

    if (oldDocumentationId && oldDocumentationId !== savedDoc.ID) {
      try {
        const old = findById_('Dokumentasi', oldDocumentationId);
        if (old && old.DriveFileID) DriveApp.getFileById(String(old.DriveFileID)).setTrashed(true);
        deleteRow_('Dokumentasi', oldDocumentationId);
      } catch (_) {}
    }
    return savedRecord;
  } catch (error) {
    try { file.setTrashed(true); } catch (_) {}
    throw error;
  }
  });
}


/* =========================================================
   SURAT
========================================================= */

function saveSurat(token, data) {
  data = data || {};
  requirePermission_(token, 'surat', data.ID ? 'edit' : 'create');

  validateRequired_(data, [
    'Tanggal','Jenis','Perihal'
  ]);
  validateDateString_(data.Tanggal, 'Tanggal surat');
  validateEnum_(data.Jenis, ['Surat Masuk','Surat Keluar'], 'Jenis surat');
  if (data.Status) {
    validateEnum_(
      data.Status,
      ['Draft','Diproses','Selesai','Diarsipkan'],
      'Status surat'
    );
  }
  data.LinkFile = sanitizeHttpUrl_(data.LinkFile);

  return withLock_(function() {
    const existing = data.ID ? findById_('Surat', data.ID) : null;
    if (data.ID && !existing) throw new Error('Surat tidak ditemukan.');
    if (data.Jenis === 'Surat Keluar') {
      if (data.Penomoran === 'Otomatis' || !String(data.NomorSurat || '').trim()) {
        data.NomorSurat = nextLetterNumber_(data.Tanggal, data.FormatSurat);
      }
      const number = String(data.NomorSurat || '').trim();
      if (getRows_('Surat').some(row => row.Jenis === 'Surat Keluar' &&
          String(row.ID) !== String(data.ID || '') &&
          String(row.NomorSurat || '').trim().toUpperCase() === number.toUpperCase())) {
        throw new Error('Nomor surat keluar sudah digunakan.');
      }
      data.NomorSurat = number;
    } else {
      validateRequired_(data, ['NomorSurat']);
    }
    return upsert_('Surat', 'SRT', data);
  });
}

// Called only inside withLock_: independent, persistent counters prevent reuse after deletion.
function nextRegisterSequence_(key, values, suffix, prefix) {
  const properties = PropertiesService.getScriptProperties();
  const propertyKey = 'REGISTER:' + getDatabase_().getId() + ':' + key;
  let max = Number(properties.getProperty(propertyKey) || 0);
  values.forEach(value => {
    value = String(value || '');
    if (!value.startsWith(prefix) || !value.endsWith(suffix)) return;
    const digits = value.slice(prefix.length, suffix ? -suffix.length : undefined);
    if (/^\d+$/.test(digits)) max = Math.max(max, Number(digits));
  });
  const next = max + 1;
  properties.setProperty(propertyKey, String(next));
  return next;
}

function nextLetterNumber_(date, format) {
  const formats = ['PANPEL-SADIRGA','SADIRGA-SDA','SK/MUSAKA'];
  validateEnum_(format, formats, 'Format nomor surat');
  validateDateString_(date, 'Tanggal surat');
  const parts = date.split('-');
  const roman = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'][Number(parts[1]) - 1];
  const suffix = '/' + format + '/' + roman + '/' + parts[0];
  const number = nextRegisterSequence_('SURAT:' + suffix,
    getRows_('Surat').filter(row => row.Jenis === 'Surat Keluar').map(row => row.NomorSurat), suffix, '');
  return String(number).padStart(2, '0') + suffix;
}

function nextInventoryCode_(category) {
  const categories = {'Perkemahan':'KEM','Perlengkapan Upacara':'UPC','Penerbangan':'AVN',
    'Elektronik':'ELK','Administrasi':'ADM','Kesehatan / P3K':'P3K','Olahraga':'OLR',
    'Perkakas':'PKK','Konsumsi / Dapur':'DPR','Lainnya':'OTH'};
  const prefix = 'INV-SADIRGA/' + (categories[category] || 'OTH') + '/';
  const number = nextRegisterSequence_('INV:' + prefix,
    getRows_('Inventaris').map(row => row.KodeBarang), '', prefix);
  return prefix + String(number).padStart(4, '0');
}

// Minimal lookup data for inventory workflows; does not expose full personnel records.
function getInventoryQuickOptions(token) {
  requirePermission_(token, 'inventaris', 'view');
  return {
    pengurus: currentMemberIdentity_(getRows_('Pengurus'), 'Nama', getDatabase_())
      .filter(row => row.Status === 'Aktif').map(row => ({Nama:row.Nama, Jabatan:row.Jabatan})),
    kegiatan: getRows_('Kegiatan').map(row => ({ID:row.ID, NamaKegiatan:row.NamaKegiatan,
      Tanggal:row.Tanggal, Status:row.Status}))
  };
}

function deleteSurat(token, id) {
  requirePermission_(token, 'surat', 'delete');

  return withLock_(function() {
    return deleteRow_('Surat', id);
  });
}


/* =========================================================
   PENGURUS
========================================================= */

function savePengurus(token, data) {
  data = data || {};
  requirePermission_(token, 'pengurus', data.ID ? 'edit' : 'create');

  validateRequired_(data, [
    'AnggotaID','Jabatan'
  ]);

  data.Status = data.Status || 'Aktif';
  validateEnum_(data.Status, ['Aktif','Nonaktif'], 'Status pengurus');
  data.Urutan = (data.Urutan === '' || data.Urutan === undefined || data.Urutan === null)
    ? 999
    : Number(data.Urutan);

  if (!Number.isInteger(data.Urutan) || data.Urutan < 0) {
    throw new Error('Urutan struktur harus berupa bilangan bulat 0 atau lebih.');
  }

  return withLock_(function() {
    const anggota = findById_('Anggota', data.AnggotaID);

    if (!anggota) {
      throw new Error('Data anggota tidak ditemukan.');
    }

    data.Nama = anggota.Nama;
    return upsert_('Pengurus', 'PNG', data);
  }, false);
}

function deletePengurus(token, id) {
  requirePermission_(token, 'pengurus', 'delete');

  return withLock_(function() {
    return deleteRow_('Pengurus', id);
  }, false);
}


/* =========================================================
   EXCEL DATABASE IMPORT
========================================================= */

function importExcelDatabaseBatch(token, payload) {
  requireSession_(token, ['ADMIN']);
  return withLock_(function() { return importExcelDatabaseBatch_(token, payload); }, false);
}

function importExcelDatabaseBatch_(token, payload) {
  requireSession_(token, ['ADMIN']);
  payload = payload || {};

  const sheetName = String(payload.sheetName || '').trim();
  const allowedSheets = [
    'Anggota','Kegiatan','Kas','Inventaris','Surat','Absensi','Pengurus','Users'
  ];

  if (allowedSheets.indexOf(sheetName) === -1) {
    throw new Error('Sheet import tidak didukung: ' + sheetName);
  }

  const rows = Array.isArray(payload.rows) ? payload.rows : [];
  if (!rows.length) {
    return {
      success: true,
      sheetName: sheetName,
      imported: 0,
      failed: 0,
      report: {
        sheet: sheetName, total: 0, created: 0, updated: 0,
        skipped: 0, failed: 0, normalized: 0, errors: [], warnings: []
      },
      context: payload.context || { anggotaIdMap: {}, kegiatanIdMap: {} }
    };
  }

  if (rows.length > 40) {
    throw new Error('Satu batch maksimal 40 baris. Muat ulang aplikasi lalu coba kembali.');
  }

  const context = payload.context && typeof payload.context === 'object'
    ? payload.context
    : {};
  context.anggotaIdMap = context.anggotaIdMap || {};
  context.kegiatanIdMap = context.kegiatanIdMap || {};

  const sheetReport = {
    sheet: sheetName,
    total: rows.length,
    created: 0,
    updated: 0,
    skipped: 0,
    failed: 0,
    normalized: 0,
    errors: [],
    warnings: []
  };

  const kegiatanToSync = [];

  beginImportRuntime_();
  try {
    rows.forEach(function(rawRow, index) {
      const excelRow = Number(rawRow && rawRow.__rowNumber) || (index + 2);

      try {
        const row = cleanExcelImportRow_(sheetName, rawRow || {});
        const rowWarnings = Array.isArray(row.__warnings) ? row.__warnings.slice() : [];
        delete row.__warnings;

        if (rowWarnings.length) {
          sheetReport.normalized++;
          rowWarnings.forEach(function(message) {
            if (sheetReport.warnings.length < 80) {
              sheetReport.warnings.push({ row: excelRow, message: message });
            }
          });
        }

        if (!hasImportData_(row)) {
          sheetReport.skipped++;
          return;
        }

        const result = importExcelRow_(token, sheetName, row, context);
        if (result.action === 'updated') sheetReport.updated++;
        else sheetReport.created++;

        if (sheetName === 'Kegiatan' && result.saved && result.saved.ID) {
          kegiatanToSync.push(result.saved);
        }
      } catch (error) {
        sheetReport.failed++;
        if (sheetReport.errors.length < 50) {
          sheetReport.errors.push({
            row: excelRow,
            message: error && error.message ? error.message : String(error)
          });
        }
      }
    });

    // Satu kali bulk sync per batch Kegiatan. Ini menjaga performa import
    // sekaligus memastikan Absensi lama mengikuti perubahan nama/tanggal.
    if (sheetName === 'Kegiatan' && kegiatanToSync.length) {
      sheetReport.syncedAbsensi = syncAbsensiForKegiatanBatch_(kegiatanToSync);
    }
  } finally {
    endImportRuntime_();
  }

  return {
    success: sheetReport.failed === 0,
    sheetName: sheetName,
    imported: sheetReport.created + sheetReport.updated,
    failed: sheetReport.failed,
    report: sheetReport,
    context: context
  };
}

function finishExcelDatabaseImport(token, summary) {
  const session = requireSession_(token, ['ADMIN']);
  summary = summary || {};
  const imported = Number(summary.imported || 0);
  const failed = Number(summary.failed || 0);
  saveSystemLog_(
    session.Nama,
    'Import Excel Database Batch: ' + imported + ' berhasil, ' + failed + ' gagal'
  );
  return { success: true };
}

function importExcelRow_(token, sheetName, row, context) {
  const sourceId = String(row.ID || '').trim();

  if (sheetName === 'Anggota') {
    const existing = matchExistingImportRow_('Anggota', row);
    if (existing) row.ID = existing.ID;
    else delete row.ID;

    const saved = saveAnggota(token, row);
    if (sourceId) context.anggotaIdMap[sourceId] = saved.ID;
    return { action: existing ? 'updated' : 'created', saved: saved };
  }

  if (sheetName === 'Kegiatan') {
    const existing = matchExistingImportRow_('Kegiatan', row);
    if (existing) row.ID = existing.ID;
    else delete row.ID;

    const saved = saveKegiatan(token, row);
    if (sourceId) context.kegiatanIdMap[sourceId] = saved.ID;
    return { action: existing ? 'updated' : 'created', saved: saved };
  }

  if (sheetName === 'Kas') {
    const existing = matchExistingImportRow_('Kas', row);
    if (existing) row.ID = existing.ID;
    else delete row.ID;
    const saved = saveKas(token, row);
    return { action: existing ? 'updated' : 'created', saved: saved };
  }

  if (sheetName === 'Inventaris') {
    const existing = matchExistingImportRow_('Inventaris', row);
    if (existing) row.ID = existing.ID;
    else delete row.ID;
    const saved = saveInventaris(token, row);
    return { action: existing ? 'updated' : 'created', saved: saved };
  }

  if (sheetName === 'Surat') {
    const existing = matchExistingImportRow_('Surat', row);
    if (existing) row.ID = existing.ID;
    else delete row.ID;
    const saved = saveSurat(token, row);
    return { action: existing ? 'updated' : 'created', saved: saved };
  }

  if (sheetName === 'Absensi') {
    row.KegiatanID = resolveImportedKegiatanId_(row, context);

    if (String(row.StatusKehadiran || '') === 'Libur') {
      row.AnggotaID = '';
      row.NamaAnggota = row.NamaAnggota || 'Semua Anggota';
    } else {
      row.AnggotaID = resolveImportedAnggotaId_(row, context, true);
    }

    const existing = matchExistingImportRow_('Absensi', row);
    if (existing) row.ID = existing.ID;
    else delete row.ID;

    const saved = saveImportedAbsensi_(row);
    return { action: existing ? 'updated' : 'created', saved: saved };
  }

  if (sheetName === 'Pengurus') {
    row.AnggotaID = resolveImportedAnggotaId_(row, context, false);

    const existing = matchExistingImportRow_('Pengurus', row);
    if (existing) row.ID = existing.ID;
    else delete row.ID;

    const saved = savePengurus(token, row);
    return { action: existing ? 'updated' : 'created', saved: saved };
  }

  if (sheetName === 'Users') {
    const existing = matchExistingImportRow_('Users', row);
    if (existing) row.ID = existing.ID;
    else delete row.ID;

    const saved = saveUser(token, row);
    return { action: existing ? 'updated' : 'created', saved: saved };
  }

  throw new Error('Sheet tidak didukung untuk impor: ' + sheetName);
}

function cleanExcelImportRow_(sheetName, rawRow) {
  const allowed = {
    Users: ['ID','Username','Nama','Role','Status','Password'],
    Anggota: [
      'ID','NTA','Nama','JenisKelamin','TempatLahir','TanggalLahir','Alamat',
      'Telepon','SekolahInstansi','Krida','Jabatan','Status','TanggalGabung','TanggalPelantikan'
    ],
    Kegiatan: [
      'ID','NamaKegiatan','Tanggal','Jenis','Lokasi','PenanggungJawab','Status','Keterangan'
    ],
    Absensi: [
      'ID','KegiatanID','KegiatanNama','Tanggal','AnggotaID','NamaAnggota','NTA',
      'StatusKehadiran','Catatan','Metode'
    ],
    Kas: ['ID','Tanggal','Jenis','Kategori','Keterangan','Nominal','Petugas','ImportKey'],
    Inventaris: [
      'ID','KodeBarang','NamaBarang','Kategori','Jumlah','Kondisi','Lokasi',
      'PenanggungJawab','Keterangan'
    ],
    Surat: [
      'ID','NomorSurat','Tanggal','Jenis','Perihal','AsalTujuan','Status','LinkFile','Keterangan'
    ],
    Pengurus: [
      'ID','AnggotaID','NTA','Nama','Jabatan','Bidang','Periode','Urutan','Status'
    ]
  };

  if (!allowed[sheetName]) {
    throw new Error('Struktur sheet ' + sheetName + ' tidak dikenal.');
  }

  const row = {};
  allowed[sheetName].forEach(function(field) {
    if (!Object.prototype.hasOwnProperty.call(rawRow, field)) return;

    let value = rawRow[field];
    if (value === null || value === undefined) value = '';

    // Password tidak di-trim karena spasi dapat menjadi bagian dari password.
    if (typeof value === 'string' && field !== 'Password') {
      value = value.trim();
    }

    row[field] = value;
  });

  return normalizeExcelImportRow_(sheetName, row);
}

/**
 * Normalisasi khusus jalur Excel. Tujuannya menerima variasi format dari
 * database lama tanpa mengendurkan validasi data operasional yang wajib.
 */
function normalizeExcelImportRow_(sheetName, row) {
  row = row || {};
  const warnings = [];

  function warn(message) {
    if (warnings.length < 20) warnings.push(message);
  }

  function setLooseEnum(field, allowed, aliases) {
    if (!Object.prototype.hasOwnProperty.call(row, field)) return;
    const original = row[field];
    if (isImportBlankValue_(original)) {
      row[field] = '';
      return;
    }

    const normalized = normalizeLooseEnumValue_(original, allowed, aliases || {});
    if (String(normalized) !== String(original).trim()) {
      warn(field + ': "' + String(original) + '" → "' + String(normalized) + '"');
    }
    row[field] = normalized;
  }

  function setDate(field, label, required) {
    if (!Object.prototype.hasOwnProperty.call(row, field)) return;
    const original = row[field];

    if (isImportBlankValue_(original)) {
      row[field] = '';
      return;
    }

    const normalized = normalizeFlexibleDateValue_(original);
    if (normalized) {
      if (String(normalized) !== String(original).trim()) {
        warn(field + ': "' + String(original) + '" → "' + normalized + '"');
      }
      row[field] = normalized;
      return;
    }

    if (required) {
      throw new Error((label || field) + ' tidak dapat dikenali: "' + String(original) + '".');
    }

    // Tanggal opsional (misalnya tanggal lahir) tidak boleh menggagalkan satu baris anggota.
    row[field] = '';
    warn(field + ': nilai "' + String(original) + '" tidak dikenali dan dikosongkan.');
  }

  if (sheetName === 'Anggota') {
    if (Object.prototype.hasOwnProperty.call(row, 'Krida')) {
      const originalKrida = row.Krida;
      row.Krida = normalizeKridaValue_(row.Krida);
      if (String(row.Krida) !== String(originalKrida || '').trim()) {
        warn('Krida: "' + String(originalKrida) + '" → "' + String(row.Krida) + '"');
      }
    }

    setLooseEnum('JenisKelamin', ['Laki-laki','Perempuan'], {
      'l': 'Laki-laki', 'lk': 'Laki-laki', 'laki': 'Laki-laki',
      'laki laki': 'Laki-laki', 'pria': 'Laki-laki', 'male': 'Laki-laki',
      'p': 'Perempuan', 'pr': 'Perempuan', 'wanita': 'Perempuan',
      'female': 'Perempuan'
    });
    setLooseEnum('Status', ['Calon Anggota','Aktif','Nonaktif','Alumni'], {
      'calon': 'Calon Anggota', 'ca': 'Calon Anggota', 'calon anggota': 'Calon Anggota',
      'belum terlantik': 'Calon Anggota', 'non aktif': 'Nonaktif',
      'tidak aktif': 'Nonaktif', 'alumnus': 'Alumni'
    });
    setDate('TanggalLahir', 'Tanggal lahir', false);
    setDate('TanggalGabung', 'Tanggal bergabung', false);
    setDate('TanggalPelantikan', 'Tanggal pelantikan', false);
  }

  if (sheetName === 'Kegiatan') {
    setDate('Tanggal', 'Tanggal kegiatan', true);
    setLooseEnum('Jenis',
      ['Latihan','Rapat','Pendidikan','Bakti Sosial','Kunjungan','Upacara','Lainnya'],
      {'baksos':'Bakti Sosial','bakti sosial':'Bakti Sosial','lain lain':'Lainnya','lainnya':'Lainnya'}
    );
    setLooseEnum('Status', ['Rencana','Berjalan','Selesai','Dibatalkan'], {
      'direncanakan':'Rencana','jalan':'Berjalan','cancel':'Dibatalkan','batal':'Dibatalkan'
    });
  }

  if (sheetName === 'Absensi') {
    // Tanggal pada Absensi hanya dipakai untuk membantu pencocokan kegiatan.
    setDate('Tanggal', 'Tanggal absensi', false);
    setLooseEnum('StatusKehadiran', ['Hadir','Izin','Sakit','Alpa','Libur'], {
      'ijin':'Izin',
      'alpha':'Alpa',
      'absen':'Alpa',
      'tidak hadir':'Alpa',
      'libur':'Libur',
      'hari libur':'Libur',
      'tidak latihan':'Libur',
      'tidak ada latihan':'Libur',
      'ga ada latihan':'Libur',
      'gak ada latihan':'Libur',
      'nggak ada latihan':'Libur',
      'off':'Libur'
    });

    if (String(row.StatusKehadiran || '') === 'Libur' && !String(row.Catatan || '').trim()) {
      row.Catatan = 'Tidak ada latihan';
    }
    setLooseEnum('Metode', ['Manual','QR'], {'qrcode':'QR','qr code':'QR'});
  }

  if (sheetName === 'Kas') {
    setDate('Tanggal', 'Tanggal transaksi', true);
    setLooseEnum('Jenis', ['Pemasukan','Pengeluaran'], {
      'masuk':'Pemasukan','income':'Pemasukan','keluar':'Pengeluaran','expense':'Pengeluaran'
    });
  }

  if (sheetName === 'Inventaris') {
    setLooseEnum('Kondisi', ['Baik','Rusak Ringan','Rusak Berat','Hilang'], {
      'rusak ringan':'Rusak Ringan','rusak berat':'Rusak Berat','baik sekali':'Baik'
    });
  }

  if (sheetName === 'Surat') {
    setDate('Tanggal', 'Tanggal surat', true);
    setLooseEnum('Jenis', ['Surat Masuk','Surat Keluar'], {
      'masuk':'Surat Masuk','keluar':'Surat Keluar'
    });
    setLooseEnum('Status', ['Draft','Diproses','Selesai','Diarsipkan'], {
      'proses':'Diproses','arsip':'Diarsipkan'
    });
  }

  if (sheetName === 'Pengurus') {
    setLooseEnum('Status', ['Aktif','Nonaktif'], {
      'non aktif':'Nonaktif','tidak aktif':'Nonaktif'
    });
  }

  if (sheetName === 'Users') {
    setLooseEnum('Role', ['ADMIN','PENGURUS'], {});
    setLooseEnum('Status', ['Aktif','Nonaktif'], {
      'non aktif':'Nonaktif','tidak aktif':'Nonaktif'
    });
  }

  row.__warnings = warnings;
  return row;
}

function isImportBlankValue_(value) {
  if (value === null || value === undefined) return true;
  const text = String(value).trim().toLowerCase();
  return [
    '', '-', '--', 'n/a', 'na', 'null', 'none', 'tidak ada',
    'belum ada', 'belum diketahui', 'belum ditentukan', '0/0/0',
    '00/00/0000', '0000-00-00'
  ].indexOf(text) !== -1;
}

function normalizeImportKey_(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[._\/\-]+/g, ' ')
    .replace(/\s+/g, ' ');
}

function normalizeLooseEnumValue_(value, allowedValues, aliases) {
  const raw = String(value || '').trim().replace(/\s+/g, ' ');
  if (isImportBlankValue_(raw)) return '';

  const key = normalizeImportKey_(raw);
  const direct = (allowedValues || []).find(function(item) {
    return normalizeImportKey_(item) === key;
  });
  if (direct) return direct;

  const aliasMap = aliases || {};
  if (Object.prototype.hasOwnProperty.call(aliasMap, key)) {
    return aliasMap[key];
  }

  return raw;
}

function normalizeKridaValue_(value) {
  const raw = String(value || '').trim().replace(/\s+/g, ' ');
  if (isImportBlankValue_(raw)) return '';

  const key = normalizeImportKey_(raw);

  // Nama resmi + variasi/typo umum yang sering muncul pada database lama.
  if (
    key === 'kod' || key === 'krida olahraga' || key === 'olahraga dirgantara' ||
    key.indexOf('olahraga') !== -1 || key.indexOf('olah raga') !== -1
  ) {
    return 'Krida Olahraga Dirgantara';
  }

  if (
    key === 'kpd' || key === 'krida pengetahuan' || key === 'pengetahuan dirgantara' ||
    key.indexOf('pengetahuan') !== -1 || key.indexOf('iptek') !== -1
  ) {
    return 'Krida Pengetahuan Dirgantara';
  }

  if (
    key === 'kjk' || key === 'krida jasa' || key === 'jasa dirgantara' ||
    key.indexOf('jasa') !== -1 || key.indexOf('kedirgantaraan') !== -1
  ) {
    return 'Krida Jasa Kedirgantaraan';
  }

  // Nilai khusus/legacy tidak dibuang. Ini membuat migrasi tetap lossless.
  return raw;
}

function normalizeFlexibleDateValue_(value) {
  if (value === null || value === undefined || isImportBlankValue_(value)) return '';

  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())) {
    return formatYmdParts_(value.getFullYear(), value.getMonth() + 1, value.getDate());
  }

  // Excel serial date, termasuk bila serial tersimpan sebagai teks.
  const numeric = typeof value === 'number'
    ? value
    : (/^\d+(?:\.\d+)?$/.test(String(value).trim()) ? Number(value) : NaN);

  if (isFinite(numeric) && numeric >= 10000 && numeric <= 100000) {
    const utcMs = Date.UTC(1899, 11, 30) + Math.floor(numeric) * 86400000;
    const d = new Date(utcMs);
    if (!isNaN(d.getTime())) {
      return formatYmdParts_(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
    }
  }

  let text = String(value).trim();
  if (!text) return '';

  // ISO datetime -> ambil bagian tanggal.
  let m = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T\s].*)?$/);
  if (m) return validYmdOrBlank_(Number(m[1]), Number(m[2]), Number(m[3]));

  // yyyy/mm/dd atau yyyy.mm.dd
  m = text.match(/^(\d{4})[\/.](\d{1,2})[\/.](\d{1,2})(?:\s+.*)?$/);
  if (m) return validYmdOrBlank_(Number(m[1]), Number(m[2]), Number(m[3]));

  // dd/mm/yyyy, dd-mm-yyyy, dd.mm.yyyy + optional time.
  m = text.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})(?:\s+.*)?$/);
  if (m) {
    let year = Number(m[3]);
    if (year < 100) {
      const currentYY = new Date().getFullYear() % 100;
      year += year <= currentYY + 10 ? 2000 : 1900;
    }
    return validYmdOrBlank_(year, Number(m[2]), Number(m[1]));
  }

  const months = {
    januari:1, january:1, jan:1,
    februari:2, february:2, feb:2,
    maret:3, march:3, mar:3,
    april:4, apr:4,
    mei:5, may:5,
    juni:6, june:6, jun:6,
    juli:7, july:7, jul:7,
    agustus:8, august:8, agu:8, aug:8,
    september:9, sep:9, sept:9,
    oktober:10, october:10, okt:10, oct:10,
    november:11, nov:11,
    desember:12, december:12, des:12, dec:12
  };

  // 7 September 2008 / 7 Sep 2008
  m = text.toLowerCase().replace(/,/g, '').match(/^(\d{1,2})\s+([a-z]+)\s+(\d{4})$/);
  if (m && months[m[2]]) {
    return validYmdOrBlank_(Number(m[3]), months[m[2]], Number(m[1]));
  }

  // September 7 2008 / Sep 7 2008
  m = text.toLowerCase().replace(/,/g, '').match(/^([a-z]+)\s+(\d{1,2})\s+(\d{4})$/);
  if (m && months[m[1]]) {
    return validYmdOrBlank_(Number(m[3]), months[m[1]], Number(m[2]));
  }

  return '';
}

function validYmdOrBlank_(year, month, day) {
  if (!year || !month || !day) return '';
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) return '';
  return formatYmdParts_(year, month, day);
}

function formatYmdParts_(year, month, day) {
  return String(year).padStart(4, '0') + '-' +
    String(month).padStart(2, '0') + '-' +
    String(day).padStart(2, '0');
}

function hasImportData_(row) {
  return Object.keys(row || {}).some(function(key) {
    if (key === 'ID' || key.indexOf('__') === 0) return false;
    const value = row[key];
    return value !== '' && value !== null && value !== undefined;
  });
}

function matchExistingImportRow_(sheetName, row) {
  const rows = getRows_(sheetName);
  const sourceId = String(row.ID || '').trim();

  if (sourceId) {
    const byId = rows.find(function(item) {
      return String(item.ID || '') === sourceId;
    });
    if (byId) return byId;
  }

  function eq(a, b) {
    return String(a || '').trim().toLowerCase() ===
      String(b || '').trim().toLowerCase();
  }

  if (sheetName === 'Users' && row.Username) {
    return rows.find(function(item) { return eq(item.Username, row.Username); }) || null;
  }

  if (sheetName === 'Anggota') {
    if (row.NTA) {
      const byNta = rows.find(function(item) { return eq(item.NTA, row.NTA); });
      if (byNta) return byNta;
    }

    // Fallback aman untuk retry import bila NTA kosong: nama harus unik.
    // Jika tanggal lahir tersedia, gunakan sebagai pembeda tambahan.
    if (row.Nama) {
      let matches = rows.filter(function(item) { return eq(item.Nama, row.Nama); });
      if (row.TanggalLahir) {
        matches = matches.filter(function(item) {
          return String(item.TanggalLahir || '') === String(row.TanggalLahir || '');
        });
      }
      if (matches.length === 1) return matches[0];
    }
  }

  if (sheetName === 'Kegiatan' && row.NamaKegiatan && row.Tanggal) {
    return rows.find(function(item) {
      return eq(item.NamaKegiatan, row.NamaKegiatan) &&
        String(item.Tanggal || '') === String(row.Tanggal || '');
    }) || null;
  }

  if (sheetName === 'Inventaris' && row.KodeBarang) {
    return rows.find(function(item) { return eq(item.KodeBarang, row.KodeBarang); }) || null;
  }

  if (sheetName === 'Surat' && row.NomorSurat) {
    return rows.find(function(item) { return eq(item.NomorSurat, row.NomorSurat); }) || null;
  }

  if (sheetName === 'Absensi' && row.KegiatanID) {
    if (String(row.StatusKehadiran || '') === 'Libur') {
      return rows.find(function(item) {
        return String(item.KegiatanID || '') === String(row.KegiatanID || '') &&
          String(item.StatusKehadiran || '') === 'Libur';
      }) || null;
    }

    if (row.AnggotaID) {
      return rows.find(function(item) {
        return String(item.KegiatanID || '') === String(row.KegiatanID || '') &&
          String(item.AnggotaID || '') === String(row.AnggotaID || '');
      }) || null;
    }
  }

  if (sheetName === 'Pengurus' && row.AnggotaID && row.Jabatan) {
    return rows.find(function(item) {
      return String(item.AnggotaID || '') === String(row.AnggotaID || '') &&
        eq(item.Jabatan, row.Jabatan) &&
        eq(item.Periode, row.Periode);
    }) || null;
  }

  if (sheetName === 'Kas' && row.ImportKey) {
    return rows.find(function(item) {
      return String(item.ImportKey || '') === String(row.ImportKey || '');
    }) || null;
  }

  // Kas tanpa ID/ImportKey tetap dianggap transaksi baru agar dua transaksi
  // sah yang kebetulan identik tidak digabung secara keliru.
  return null;
}

function resolveImportedAnggotaId_(row, context, isAttendance) {
  const requestedId = String(row.AnggotaID || '').trim();
  const anggota = getRows_('Anggota');

  if (requestedId) {
    if (context.anggotaIdMap[requestedId]) {
      return context.anggotaIdMap[requestedId];
    }

    if (anggota.some(function(item) { return String(item.ID) === requestedId; })) {
      return requestedId;
    }
  }

  const nta = String(row.NTA || '').trim().toLowerCase();
  if (nta) {
    const matchesByNta = anggota.filter(function(item) {
      return String(item.NTA || '').trim().toLowerCase() === nta;
    });

    if (matchesByNta.length === 1) return matchesByNta[0].ID;
    if (matchesByNta.length > 1) throw new Error('NTA mengarah ke lebih dari satu anggota.');
  }

  const nameField = isAttendance ? 'NamaAnggota' : 'Nama';
  const name = String(row[nameField] || '').trim().toLowerCase();
  if (name) {
    const matchesByName = anggota.filter(function(item) {
      return String(item.Nama || '').trim().toLowerCase() === name;
    });

    if (matchesByName.length === 1) return matchesByName[0].ID;
    if (matchesByName.length > 1) {
      throw new Error('Nama anggota tidak unik. Isi NTA atau AnggotaID pada Excel.');
    }
  }

  throw new Error('Relasi anggota tidak ditemukan. Isi AnggotaID, NTA, atau nama anggota yang tepat.');
}

function resolveImportedKegiatanId_(row, context) {
  const requestedId = String(row.KegiatanID || '').trim();
  const kegiatan = getRows_('Kegiatan');

  if (requestedId) {
    if (context.kegiatanIdMap[requestedId]) {
      return context.kegiatanIdMap[requestedId];
    }

    if (kegiatan.some(function(item) { return String(item.ID) === requestedId; })) {
      return requestedId;
    }
  }

  const name = String(row.KegiatanNama || '').trim().toLowerCase();
  const tanggal = String(row.Tanggal || '').trim();

  if (name) {
    let matches = kegiatan.filter(function(item) {
      return String(item.NamaKegiatan || '').trim().toLowerCase() === name;
    });

    if (tanggal) {
      matches = matches.filter(function(item) {
        return String(item.Tanggal || '') === tanggal;
      });
    }

    if (matches.length === 1) return matches[0].ID;
    if (matches.length > 1) {
      throw new Error('Nama kegiatan tidak unik. Isi KegiatanID atau Tanggal pada Excel.');
    }
  }

  throw new Error('Relasi kegiatan tidak ditemukan. Isi KegiatanID atau KegiatanNama yang tepat.');
}

function saveImportedAbsensi_(data) {
  data = data || {};
  validateRequired_(data, ['KegiatanID','StatusKehadiran']);
  validateEnum_(
    data.StatusKehadiran,
    ['Hadir','Izin','Sakit','Alpa','Libur'],
    'Status kehadiran'
  );

  const isLibur = String(data.StatusKehadiran) === 'Libur';
  if (!isLibur) validateRequired_(data, ['AnggotaID']);

  if (isLibur && !String(data.Catatan || '').trim()) {
    data.Catatan = 'Tidak ada latihan';
  }

  data.Metode = data.Metode || 'Manual';
  validateEnum_(data.Metode, ['Manual','QR'], 'Metode absensi');

  return withLock_(function() {
    const kegiatan = findById_('Kegiatan', data.KegiatanID);
    const anggota = isLibur ? null : findById_('Anggota', data.AnggotaID);

    if (!kegiatan) throw new Error('Kegiatan tidak ditemukan.');
    if (!isLibur && !anggota) throw new Error('Anggota tidak ditemukan.');

    data.KegiatanNama = kegiatan.NamaKegiatan;
    data.Tanggal = kegiatan.Tanggal;
    data.AnggotaID = isLibur ? '' : data.AnggotaID;
    data.NamaAnggota = isLibur ? 'Semua Anggota' : anggota.Nama;

    const duplicate = assertAttendanceConsistency_(data, isLibur, true);
    if (duplicate) data.ID = duplicate.ID;

    return upsert_('Absensi', 'ABS', data);
  });
}


/* =========================================================
   IMPORT RUNTIME CACHE
========================================================= */

function beginImportRuntime_() {
  // Buka spreadsheet sekali saja untuk seluruh batch.
  const id = PropertiesService
    .getScriptProperties()
    .getProperty(APP.DB_PROPERTY);

  if (!id) throw new Error('Database belum dibuat.');

  IMPORT_RUNTIME_ = {
    ss: SpreadsheetApp.openById(id),
    sheets: {}
  };
}

function endImportRuntime_() {
  IMPORT_RUNTIME_ = null;
  invalidateDashboardCache_();
}

function getImportSheetState_(sheetName) {
  if (!IMPORT_RUNTIME_) return null;
  if (IMPORT_RUNTIME_.sheets[sheetName]) return IMPORT_RUNTIME_.sheets[sheetName];

  const sheet = IMPORT_RUNTIME_.ss.getSheetByName(sheetName);
  const expectedHeaders = APP.SHEETS[sheetName];

  if (!sheet || !expectedHeaders) {
    throw new Error('Sheet ' + sheetName + ' tidak ditemukan atau tidak dikenal.');
  }

  const headers = ensureSheetHeaders_(sheet, expectedHeaders);
  const lastRow = sheet.getLastRow();
  const raw = lastRow > 1
    ? sheet.getRange(2, 1, lastRow - 1, headers.length).getValues()
    : [];

  const idIndex = headers.indexOf('ID');
  const idToOffset = {};
  const idToObjectIndex = {};
  const rows = [];

  raw.forEach(function(values, offset) {
    if (!values.some(function(value) { return value !== ''; })) return;
    const object = rowToObject_(headers, values);
    const objectIndex = rows.length;
    rows.push(object);

    const id = idIndex >= 0 ? String(values[idIndex] || '') : '';
    if (id) {
      idToOffset[id] = offset;
      idToObjectIndex[id] = objectIndex;
    }
  });

  const state = {
    sheet: sheet,
    expectedHeaders: expectedHeaders,
    headers: headers,
    raw: raw,
    rows: rows,
    idIndex: idIndex,
    idToOffset: idToOffset,
    idToObjectIndex: idToObjectIndex,
    nextRow: Math.max(lastRow + 1, 2)
  };

  IMPORT_RUNTIME_.sheets[sheetName] = state;
  return state;
}

function sheetLiteral_(value) {
  // Apps Script interprets a leading '=' as a formula. Apostrophe escapes it.
  if (typeof value === 'string' && /^[=']/.test(value)) return "'" + value;
  return value === undefined || value === null ? '' : value;
}

function sheetLiteralRows_(rows) {
  return rows.map(function(row) { return row.map(sheetLiteral_); });
}

function upsertImportRuntime_(sheetName, prefix, data) {
  const state = getImportSheetState_(sheetName);
  const headers = state.headers;
  const expectedHeaders = state.expectedHeaders;

  let rowIndex = null;
  let existingRow = new Array(headers.length).fill('');
  let existing = {};
  let rawOffset = null;

  if (data.ID) {
    rawOffset = Object.prototype.hasOwnProperty.call(state.idToOffset, String(data.ID))
      ? state.idToOffset[String(data.ID)]
      : null;

    if (rawOffset === null) {
      throw new Error('Data yang akan diperbarui tidak ditemukan.');
    }

    rowIndex = rawOffset + 2;
    existingRow = state.raw[rawOffset] || existingRow;
    existing = rowToObject_(headers, existingRow);
  }

  const tz = Session.getScriptTimeZone() || 'Asia/Jakarta';
  const now = Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd HH:mm:ss');
  const id = data.ID || createId_(prefix);
  const record = {};

  expectedHeaders.forEach(function(header) {
    if (header === 'ID') record[header] = id;
    else if (header === 'DibuatPada') record[header] = existing[header] || now;
    else if (header === 'DiubahPada') record[header] = now;
    else if (Object.prototype.hasOwnProperty.call(data, header)) record[header] = data[header];
    else record[header] = existing[header] === undefined || existing[header] === null ? '' : existing[header];
  });

  const values = headers.map(function(header, index) {
    if (!header || expectedHeaders.indexOf(header) === -1) {
      return rowIndex ? existingRow[index] : '';
    }
    return record[header];
  });

  if (rowIndex) {
    state.sheet.getRange(rowIndex, 1, 1, headers.length).setValues(sheetLiteralRows_([values]));
    state.raw[rawOffset] = values;

    const objectIndex = state.idToObjectIndex[String(id)];
    if (objectIndex !== undefined) {
      state.rows[objectIndex] = serializeObject_(record);
    }
  } else {
    const targetRow = state.nextRow;
    state.sheet.getRange(targetRow, 1, 1, headers.length).setValues(sheetLiteralRows_([values]));
    state.nextRow++;
    const newOffset = state.raw.length;
    state.raw.push(values);
    state.idToOffset[String(id)] = newOffset;
    state.idToObjectIndex[String(id)] = state.rows.length;
    state.rows.push(serializeObject_(record));
  }

  return serializeObject_(record);
}

/* =========================================================
   GENERIC CRUD
========================================================= */

function upsert_(sheetName, prefix, data) {
  if (IMPORT_RUNTIME_) {
    return upsertImportRuntime_(sheetName, prefix, data);
  }

  const ss = getDatabase_();
  const sheet = ss.getSheetByName(sheetName);
  const expectedHeaders = APP.SHEETS[sheetName];

  if (!sheet || !expectedHeaders) {
    throw new Error('Sheet ' + sheetName + ' tidak ditemukan atau tidak dikenal.');
  }

  const headers = ensureSheetHeaders_(sheet, expectedHeaders);
  const idIndex = headers.indexOf('ID');

  if (idIndex < 0) {
    throw new Error('Kolom ID tidak ditemukan pada sheet ' + sheetName + '.');
  }

  const tz = Session.getScriptTimeZone() || 'Asia/Jakarta';
  const now = Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd HH:mm:ss');

  let rowIndex = null;
  let existingRow = new Array(headers.length).fill('');
  let existing = {};

  if (data.ID && sheet.getLastRow() <= 1) {
    throw new Error('Data yang akan diperbarui tidak ditemukan.');
  }

  if (data.ID && sheet.getLastRow() > 1) {
    const values = sheet.getRange(2, 1, sheet.getLastRow() - 1, headers.length)
      .getValues();

    for (let row = 0; row < values.length; row++) {
      if (String(values[row][idIndex]) === String(data.ID)) {
        rowIndex = row + 2;
        existingRow = values[row];
        existing = rowToObject_(headers, values[row]);
        break;
      }
    }

    if (!rowIndex) {
      throw new Error('Data yang akan diperbarui tidak ditemukan.');
    }
  }

  const id = data.ID || createId_(prefix);
  const record = {};

  expectedHeaders.forEach(header => {
    if (header === 'ID') {
      record[header] = id;
    } else if (header === 'DibuatPada') {
      record[header] = existing[header] || now;
    } else if (header === 'DiubahPada') {
      record[header] = now;
    } else if (Object.prototype.hasOwnProperty.call(data, header)) {
      record[header] = data[header];
    } else {
      record[header] = existing[header] === undefined || existing[header] === null ? '' : existing[header];
    }
  });

  const values = headers.map((header, index) => {
    if (!header || expectedHeaders.indexOf(header) === -1) {
      return rowIndex ? existingRow[index] : '';
    }
    return record[header];
  });

  if (rowIndex) {
    sheet.getRange(rowIndex, 1, 1, headers.length).setValues(sheetLiteralRows_([values]));
  } else {
    sheet.getRange(sheet.getLastRow() + 1, 1, 1, headers.length)
      .setValues(sheetLiteralRows_([values]));
  }

  return serializeObject_(record);
}

function deleteRow_(sheetName, id) {
  const sheet = getDatabase_().getSheetByName(sheetName);

  if (!sheet) {
    throw new Error('Sheet ' + sheetName + ' tidak ditemukan.');
  }

  const headers = getSheetHeaders_(sheet);
  const idIndex = headers.indexOf('ID');

  if (idIndex < 0) {
    throw new Error('Kolom ID tidak ditemukan pada sheet ' + sheetName + '.');
  }

  if (sheet.getLastRow() <= 1) {
    throw new Error('Data tidak ditemukan.');
  }

  const values = sheet.getRange(2, 1, sheet.getLastRow() - 1, headers.length)
    .getValues();

  for (let row = 0; row < values.length; row++) {
    if (String(values[row][idIndex]) === String(id)) {
      sheet.deleteRow(row + 2);
      return { success: true, id: id };
    }
  }

  throw new Error('Data tidak ditemukan.');
}


/* =========================================================
   DATA ACCESS
========================================================= */

function getDatabase_() {
  if (IMPORT_RUNTIME_ && IMPORT_RUNTIME_.ss) {
    return IMPORT_RUNTIME_.ss;
  }

  const id = PropertiesService
    .getScriptProperties()
    .getProperty(APP.DB_PROPERTY);

  if (!id) {
    throw new Error('Database belum dibuat.');
  }

  return SpreadsheetApp.openById(id);
}

function getRows_(sheetName, database) {
  if (IMPORT_RUNTIME_) {
    return getImportSheetState_(sheetName).rows;
  }

  const sheet = (database || getDatabase_()).getSheetByName(sheetName);

  if (!sheet || sheet.getLastRow() <= 1) {
    return [];
  }

  const values = sheet.getDataRange().getValues();
  const headers = values.shift().map(value => String(value || '').trim());

  return values
    .filter(row => row.some(value => value !== ''))
    .map(row => rowToObject_(headers, row));
}

function rowToObject_(headers, row) {
  const object = {};

  headers.forEach((header, index) => {
    if (!header) return;
    object[header] = serializeValue_(row[index]);
  });

  return object;
}

function serializeObject_(object) {
  const out = {};
  Object.keys(object).forEach(key => {
    out[key] = serializeValue_(object[key]);
  });
  return out;
}

function serializeValue_(value) {
  if (
    Object.prototype.toString.call(value) === '[object Date]'
  ) {
    return Utilities.formatDate(
      value,
      Session.getScriptTimeZone() || 'Asia/Jakarta',
      'yyyy-MM-dd'
    );
  }

  return value;
}

function findById_(sheetName, id) {
  return getRows_(sheetName).find(item =>
    String(item.ID) === String(id)
  ) || null;
}


function getSheetHeaders_(sheet) {
  const lastColumn = sheet.getLastColumn();

  if (lastColumn <= 0) {
    return [];
  }

  return sheet
    .getRange(1, 1, 1, lastColumn)
    .getDisplayValues()[0]
    .map(value => String(value || '').trim());
}

function ensureSheetHeaders_(sheet, expectedHeaders) {
  if (!sheet) {
    throw new Error('Sheet tidak tersedia.');
  }

  if (sheet.getLastRow() === 0 || sheet.getLastColumn() === 0) {
    sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
    return expectedHeaders.slice();
  }

  let headers = getSheetHeaders_(sheet);
  const seen = {};
  const duplicates = [];

  headers.forEach(header => {
    if (!header) return;
    seen[header] = (seen[header] || 0) + 1;
    if (seen[header] === 2) duplicates.push(header);
  });

  if (duplicates.length) {
    throw new Error(
      'Header duplikat pada sheet ' + sheet.getName() + ': ' + duplicates.join(', ')
    );
  }

  const missing = expectedHeaders.filter(header => headers.indexOf(header) === -1);

  missing.forEach(header => {
    const blankIndex = headers.findIndex(value => !value);

    if (blankIndex >= 0) {
      sheet.getRange(1, blankIndex + 1).setValue(header);
      headers[blankIndex] = header;
    } else {
      sheet.getRange(1, headers.length + 1).setValue(header);
      headers.push(header);
    }
  });

  return headers;
}


/* =========================================================
   HELPERS
========================================================= */

function validateRequired_(data, fields) {
  data = data || {};

  fields.forEach(field => {
    if (
      data[field] === undefined ||
      data[field] === null ||
      String(data[field]).trim() === ''
    ) {
      throw new Error('Kolom wajib belum diisi: ' + field);
    }
  });
}

function validateEnum_(value, allowedValues, label) {
  if (allowedValues.indexOf(String(value || '')) === -1) {
    throw new Error((label || 'Nilai') + ' tidak valid.');
  }
}

function validateDateString_(value, label) {
  const text = String(value || '').trim();

  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    throw new Error((label || 'Tanggal') + ' tidak valid.');
  }

  const parts = text.split('-').map(Number);
  const date = new Date(parts[0], parts[1] - 1, parts[2]);

  if (
    date.getFullYear() !== parts[0] ||
    date.getMonth() !== parts[1] - 1 ||
    date.getDate() !== parts[2]
  ) {
    throw new Error((label || 'Tanggal') + ' tidak valid.');
  }
}

function sanitizeHttpUrl_(value) {
  const url = String(value || '').trim();

  if (!url) return '';

  if (!/^https?:\/\/[^\s]+$/i.test(url)) {
    throw new Error('Link file harus menggunakan URL http:// atau https:// yang valid.');
  }

  return url;
}

function assertCheckinOpen_(kegiatan, label) {
  const status = normalizeKegiatanStatus_(kegiatan && kegiatan.Status);
  if (status !== 'Berjalan') {
    throw new Error(
      (label || 'Check-in') + ' hanya tersedia ketika kegiatan berstatus Berjalan. ' +
      'Status saat ini: ' + status + '.'
    );
  }
}

function createId_(prefix) {
  return (
    prefix +
    '-' +
    Utilities.getUuid().replace(/-/g, '').toUpperCase()
  );
}

// Hanya berlaku di eksekusi server ini; bukan status lintas pengguna.
let SCRIPT_LOCK_DEPTH_ = 0;
let SCRIPT_LOCK_INVALIDATE_ = false;

function withLock_(callback, invalidateDashboard) {
  const shouldInvalidate = invalidateDashboard !== false;
  if (SCRIPT_LOCK_DEPTH_ > 0) {
    SCRIPT_LOCK_INVALIDATE_ = SCRIPT_LOCK_INVALIDATE_ || shouldInvalidate;
    return callback();
  }
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  SCRIPT_LOCK_DEPTH_ = 1;
  SCRIPT_LOCK_INVALIDATE_ = shouldInvalidate;
  try {
    return callback();
  } finally {
    try {
      if (!IMPORT_RUNTIME_ && SCRIPT_LOCK_INVALIDATE_) invalidateDashboardCache_();
      else SpreadsheetApp.flush();
    } finally {
      SCRIPT_LOCK_DEPTH_ = 0;
      SCRIPT_LOCK_INVALIDATE_ = false;
      lock.releaseLock();
    }
  }
}


/* =====================================================
   SYSTEM MAINTENANCE - SAFE UPDATE
===================================================== */

function checkSystemStructure(token) {
  requireSession_(token, ['ADMIN']);
  const ss = getDatabase_();
  const known = Object.keys(APP.SHEETS);
  const sheets = ss.getSheets();
  const report = known.map(function(name) {
    const sheet = ss.getSheetByName(name);
    if (!sheet) return { sheet:name, exists:false, columns:0, missingHeaders:APP.SHEETS[name].slice(), duplicateHeaders:[], extraHeaders:[], ok:false };
    const headers = getSheetHeaders_(sheet), counts = {};
    headers.filter(Boolean).forEach(function(h){ counts[h]=(counts[h]||0)+1; });
    const duplicateHeaders = Object.keys(counts).filter(function(k){ return counts[k]>1; });
    const missingHeaders = APP.SHEETS[name].filter(function(h){ return headers.indexOf(h)<0; });
    const extraHeaders = headers.map(function(h,i){ return {header:h, column:i+1}; }).filter(function(x){ return x.header && APP.SHEETS[name].indexOf(x.header)<0; });
    return { sheet:name, exists:true, columns:sheet.getLastColumn(), rows:Math.max(sheet.getLastRow()-1,0), missingHeaders:missingHeaders, duplicateHeaders:duplicateHeaders, extraHeaders:extraHeaders, ok:missingHeaders.length===0 && duplicateHeaders.length===0 && extraHeaders.length===0 };
  });
  const knownSet = known.concat(['System_Log']);
  const extraSheets = sheets.map(function(sheet){ return sheet.getName(); }).filter(function(name){ return knownSet.indexOf(name)<0; });
  const extraColumns = report.reduce(function(out,item){ return out.concat(item.extraHeaders.map(function(x){ return {sheet:item.sheet, header:x.header, column:x.column}; })); }, []);
  return { sheets:report, extraSheets:extraSheets, extraColumns:extraColumns, cleanupRequired:extraSheets.length>0 || extraColumns.length>0 };
}

function updateSpreadsheetStructure(token, confirmCleanup) {
  const session = requireSession_(token, ['ADMIN']);
  const doCleanup = confirmCleanup === true;
  return withLock_(function() {
    const ss = getDatabase_();
    const before = checkSystemStructure(token);
    if (before.cleanupRequired && !doCleanup) {
      throw new Error('Struktur memiliki elemen ekstra. Jalankan Cek Struktur dan konfirmasi penghapusan terlebih dahulu.');
    }
    const result = [];
    if (doCleanup) {
      before.extraColumns.slice().sort(function(a,b){ return b.column-a.column; }).forEach(function(item){
        const sheet=ss.getSheetByName(item.sheet); if (sheet && item.column<=sheet.getMaxColumns()) { sheet.deleteColumn(item.column); result.push(item.sheet+': hapus kolom '+item.header); }
      });
      before.extraSheets.forEach(function(name){ const sheet=ss.getSheetByName(name); if(sheet){ ss.deleteSheet(sheet); result.push('Hapus sheet ekstra: '+name); } });
    }
    Object.keys(APP.SHEETS).forEach(function(name){
      let sheet=ss.getSheetByName(name);
      if(!sheet){ sheet=ss.insertSheet(name); result.push(name+': sheet dibuat'); }
      const beforeHeaders=getSheetHeaders_(sheet), missing=APP.SHEETS[name].filter(function(h){ return beforeHeaders.indexOf(h)<0; });
      ensureSheetHeaders_(sheet, APP.SHEETS[name]); formatSheet_(sheet, sheet.getLastColumn());
      if(missing.length) result.push(name+': tambah '+missing.join(', '));
      else if(!result.some(function(item){ return item.indexOf(name+':')===0; })) result.push(name+': struktur sudah sesuai');
    });
    seedDefaultPenilaianComponent_(); seedDefaultSkkComponent_();
    const skkSeed=seedSkkMaster_(); if(skkSeed.added) result.push('MasterSKK: tambah '+skkSeed.added+' butir SKK');
    try {
      const triggerInfo = ensureAttendanceAutomationTrigger_();
      result.push(
        'Otomasi absensi/izin: trigger setiap ' + triggerInfo.intervalMinutes +
        ' menit ' + (triggerInfo.created ? 'dibuat' : 'sudah aktif')
      );
    } catch (triggerError) {
      result.push('PERINGATAN: trigger otomasi belum aktif - ' + String(triggerError && triggerError.message || triggerError || 'gagal dibuat'));
    }
    saveSystemLog_(session.Nama, 'Update Struktur Spreadsheet'+(doCleanup?' dengan penghapusan elemen ekstra':''));
    return {success:true, cleanupApplied:doCleanup, result:result};
  });
}

function safeResetSystem(token) {
  const session = requireSession_(token, ['ADMIN']);

  return withLock_(function() {
    const epoch = bumpSessionEpoch_();
    saveSystemLog_(session.Nama, 'Reset seluruh sesi aplikasi');

    return {
      success: true,
      sessionEpoch: epoch,
      message: 'Seluruh sesi login telah dinonaktifkan.'
    };
  }, false);
}

function getSystemAuditLog(token, limit) {
  requireSession_(token, ['ADMIN']);
  limit = Math.max(1, Math.min(Number(limit) || 150, 500));
  const ss = getDatabase_();
  const sheet = ss.getSheetByName('System_Log');
  if (!sheet || sheet.getLastRow() <= 1) return { rows: [] };

  const values = sheet.getDataRange().getValues();
  const headers = values.shift().map(function(value) { return String(value || '').trim(); });
  const rows = values.slice(-limit).reverse().map(function(row) {
    const item = {};
    headers.forEach(function(header, index) { item[header] = apiNormalizeForJson_(row[index]); });
    return item;
  });
  return { rows: rows };
}

function saveSystemLog_(user, activity) {
  const ss = getDatabase_();
  let sheet = ss.getSheetByName('System_Log');

  if (!sheet) {
    sheet = ss.insertSheet('System_Log');
    sheet.appendRow(['Tanggal','User','Aktivitas']);
    formatSheet_(sheet, 3);
  }

  sheet.appendRow([new Date(), user, activity].map(sheetLiteral_));
}


/* =====================================================
   DOKUMENTASI KEGIATAN
   - Foto disimpan di Google Drive milik akun pemilik script.
   - Sheet Dokumentasi menyimpan metadata; gambar tidak dipublikasikan.
   - Client mengirim foto yang sudah dikompresi agar Apps Script stabil.
===================================================== */

function ensureDocumentationSheet_() {
  const ss = getDatabase_();
  let sheet = ss.getSheetByName('Dokumentasi');

  if (!sheet) {
    sheet = ss.insertSheet('Dokumentasi');
    ensureSheetHeaders_(sheet, APP.SHEETS.Dokumentasi);
    formatSheet_(sheet, sheet.getLastColumn());
  } else {
    ensureSheetHeaders_(sheet, APP.SHEETS.Dokumentasi);
  }

  return sheet;
}

function getDocumentationRootFolder_() {
  const props = PropertiesService.getScriptProperties();
  const storedId = props.getProperty(APP.DOCS_FOLDER_PROPERTY);

  if (storedId) {
    try {
      return DriveApp.getFolderById(storedId);
    } catch (_) {
      props.deleteProperty(APP.DOCS_FOLDER_PROPERTY);
    }
  }

  let parent = null;
  try {
    const databaseFile = DriveApp.getFileById(getDatabase_().getId());
    const parents = databaseFile.getParents();
    if (parents.hasNext()) parent = parents.next();
  } catch (_) {}

  const folderName = 'SAKA DIRGANTARA - Dokumentasi Kegiatan';
  const folder = parent
    ? parent.createFolder(folderName)
    : DriveApp.createFolder(folderName);

  props.setProperty(APP.DOCS_FOLDER_PROPERTY, folder.getId());
  return folder;
}

function getKegiatanDocumentationFolder_(kegiatan) {
  const root = getDocumentationRootFolder_();
  const folderName = String(kegiatan.ID || 'KEGIATAN');
  const existing = root.getFoldersByName(folderName);
  if (existing.hasNext()) return existing.next();
  return root.createFolder(folderName);
}

function uploadKegiatanDokumentasi(token, kegiatanId, payload) {
  const session = requirePermission_(token, 'kegiatan', 'create');
  const kegiatan = findById_('Kegiatan', kegiatanId);
  if (!kegiatan) throw new Error('Kegiatan tidak ditemukan.');

  payload = payload || {};
  const mimeType = String(payload.mimeType || '').trim().toLowerCase();
  const base64 = String(payload.base64 || '').replace(/\s+/g, '');
  const allowedMime = ['image/jpeg','image/png','image/webp'];

  if (allowedMime.indexOf(mimeType) === -1) {
    throw new Error('Dokumentasi hanya mendukung JPG, PNG, atau WEBP.');
  }
  if (!base64) throw new Error('Data foto dokumentasi kosong.');
  if (base64.length > 4 * 1024 * 1024) {
    throw new Error('Foto terlalu besar untuk diunggah. Sistem menerima foto hasil kompresi maksimum sekitar 2,3 MB.');
  }

  let bytes;
  try {
    bytes = Utilities.base64Decode(base64);
  } catch (_) {
    throw new Error('Data foto dokumentasi tidak valid.');
  }

  if (!bytes || !bytes.length) throw new Error('Data foto dokumentasi kosong.');
  if (bytes.length > 2400 * 1024) {
    throw new Error('Ukuran foto setelah kompresi masih terlalu besar. Maksimum sekitar 2,3 MB.');
  }

  ensureDocumentationSheet_();

  const tz = Session.getScriptTimeZone() || 'Asia/Jakarta';
  const timestamp = Utilities.formatDate(new Date(), tz, 'yyyyMMdd-HHmmss');
  const cleanName = String(payload.name || 'dokumentasi.jpg')
    .replace(/[^a-zA-Z0-9 _.-]+/g, '')
    .trim()
    .slice(0, 90) || 'dokumentasi.jpg';
  const finalName = timestamp + '-' + Utilities.getUuid().substring(0, 6) + '-' + cleanName;
  const folder = getKegiatanDocumentationFolder_(kegiatan);
  const blob = Utilities.newBlob(bytes, mimeType, finalName);
  const file = folder.createFile(blob);

  try {
    const currentCount = getRows_('Dokumentasi').filter(item =>
      String(item.KegiatanID || '') === String(kegiatan.ID || '')
    ).length;

      return upsert_('Dokumentasi', 'DOC', {
      KegiatanID: kegiatan.ID,
      NamaFile: cleanName,
      MimeType: mimeType,
      DriveFileID: file.getId(),
      Ukuran: bytes.length,
      Keterangan: String(payload.keterangan || '').trim().slice(0, 500),
      Urutan: currentCount + 1,
      Uploader: session.Nama || session.Username || '-',
      JenisDokumentasi: 'Kegiatan',
      KegiatanInventarisID: ''
    });
  } catch (error) {
    try { file.setTrashed(true); } catch (_) {}
    throw error;
  }
}

function getKegiatanDokumentasiPreview(token, documentationId) {
  requirePermission_(token, 'kegiatan', 'view');
  ensureDocumentationSheet_();

  const item = getRows_('Dokumentasi').find(row =>
    String(row.ID || '') === String(documentationId || '')
  );
  if (!item) throw new Error('Dokumentasi tidak ditemukan.');

  let file;
  try {
    file = DriveApp.getFileById(String(item.DriveFileID || ''));
  } catch (_) {
    throw new Error('File dokumentasi di Google Drive tidak ditemukan.');
  }

  const blob = file.getBlob();
  const mimeType = String(item.MimeType || blob.getContentType() || 'image/jpeg');
  return {
    ID: item.ID,
    dataUrl: 'data:' + mimeType + ';base64,' + Utilities.base64Encode(blob.getBytes())
  };
}

function deleteKegiatanDokumentasi(token, documentationId) {
  const session = requirePermission_(token, 'kegiatan', 'delete');
  ensureDocumentationSheet_();

  const item = getRows_('Dokumentasi').find(row =>
    String(row.ID || '') === String(documentationId || '')
  );
  if (!item) throw new Error('Dokumentasi tidak ditemukan.');

  if (item.KegiatanInventarisID) throw new Error('Foto inventaris harus dikelola melalui riwayat pemakaian.');

  try {
    if (item.DriveFileID) {
      DriveApp.getFileById(String(item.DriveFileID)).setTrashed(true);
    }
  } catch (_) {
    // Metadata tetap boleh dibersihkan bila file Drive sudah hilang.
  }

  const deleted = deleteRow_('Dokumentasi', documentationId);
  saveSystemLog_(session.Nama, 'Hapus dokumentasi kegiatan ' + String(item.KegiatanID || ''));
  return deleted;
}


/* =====================================================
   LAPORAN KEGIATAN PDF (V3.1.9)
   Struktur mengikuti template pengguna:
   Cover -> A-E -> F Keuangan -> G Dokumentasi -> Lampiran.
===================================================== */

function ensureActivityReportSheet_() {
  const ss = getDatabase_();
  let sheet = ss.getSheetByName('LaporanKegiatan');
  if (!sheet) {
    sheet = ss.insertSheet('LaporanKegiatan');
    ensureSheetHeaders_(sheet, APP.SHEETS.LaporanKegiatan);
    formatSheet_(sheet, sheet.getLastColumn());
  } else {
    ensureSheetHeaders_(sheet, APP.SHEETS.LaporanKegiatan);
  }
  return sheet;
}

function getActivityReportRootFolder_() {
  const props = PropertiesService.getScriptProperties();
  const storedId = props.getProperty(APP.REPORTS_FOLDER_PROPERTY);
  if (storedId) {
    try { return DriveApp.getFolderById(storedId); }
    catch (_) { props.deleteProperty(APP.REPORTS_FOLDER_PROPERTY); }
  }

  let parent = null;
  try {
    const databaseFile = DriveApp.getFileById(getDatabase_().getId());
    const parents = databaseFile.getParents();
    if (parents.hasNext()) parent = parents.next();
  } catch (_) {}

  const folder = parent
    ? parent.createFolder('SAKA DIRGANTARA - Laporan Kegiatan')
    : DriveApp.createFolder('SAKA DIRGANTARA - Laporan Kegiatan');
  props.setProperty(APP.REPORTS_FOLDER_PROPERTY, folder.getId());
  return folder;
}

function getActivityReportFolder_(kegiatan) {
  const root = getActivityReportRootFolder_();
  const name = String(kegiatan.ID || 'KEGIATAN');
  const existing = root.getFoldersByName(name);
  if (existing.hasNext()) return existing.next();
  return root.createFolder(name);
}

function parseActivitySchedule_(value) {
  if (Array.isArray(value)) return sanitizeActivitySchedule_(value);
  const raw = String(value || '').trim();
  if (!raw) return [];
  try { return sanitizeActivitySchedule_(JSON.parse(raw)); }
  catch (_) { return []; }
}

function sanitizeActivitySchedule_(items) {
  return (Array.isArray(items) ? items : []).slice(0, 30).map(function(item) {
    item = item || {};
    return {
      mulai: String(item.mulai || '').trim().slice(0, 5),
      selesai: String(item.selesai || '').trim().slice(0, 5),
      kegiatan: String(item.kegiatan || '').trim().slice(0, 500)
    };
  }).filter(function(item) {
    return item.mulai || item.selesai || item.kegiatan;
  });
}

function todayYmd_() {
  return Utilities.formatDate(new Date(), Session.getScriptTimeZone() || 'Asia/Jakarta', 'yyyy-MM-dd');
}

function defaultActivityReport_(kegiatan, officers) {
  const active = (officers || []).filter(function(item) {
    return String(item.Status || '').trim().toLowerCase() === 'aktif';
  });
  const pamong = active.find(function(item) {
    return /pamong/i.test(String(item.Jabatan || ''));
  }) || {};
  const dewan = active.find(function(item) {
    return /dewan/i.test(String(item.Jabatan || ''));
  }) || {};

  return {
    ID: '',
    KegiatanID: kegiatan.ID,
    JamMulai: '',
    JamSelesai: '',
    Cuaca: 'Cerah',
    JumlahPamongInstruktur: kegiatan.PenanggungJawab ? 1 : 0,
    FokusKrida: 'Umum / Gabungan',
    TopikMateri: '',
    Instruktur: String(kegiatan.PenanggungJawab || ''),
    SusunanKegiatan: [],
    Pencapaian: '',
    Kendala: '',
    TindakLanjut: '',
    TempatLaporan: 'Sidoarjo',
    TanggalLaporan: todayYmd_(),
    Penandatangan1Nama: String(pamong.Nama || ''),
    Penandatangan1Jabatan: String(pamong.Jabatan || 'Pamong Saka Dirgantara'),
    Penandatangan2Nama: String(dewan.Nama || ''),
    Penandatangan2Jabatan: String(dewan.Jabatan || 'Dewan Saka'),
    PDFFileID: '',
    PDFUrl: ''
  };
}

function serializeActivityReport_(row, kegiatan, officers) {
  const defaults = defaultActivityReport_(kegiatan, officers);
  row = row || {};
  const out = Object.assign({}, defaults, row);
  out.JumlahPamongInstruktur = Math.max(0, Number(row.JumlahPamongInstruktur || defaults.JumlahPamongInstruktur || 0));
  out.SusunanKegiatan = parseActivitySchedule_(row.SusunanKegiatanJSON || row.SusunanKegiatan);
  return out;
}

function buildActivityAttendance_(kegiatanId) {
  const members = getRows_('Anggota');
  const byId = {};
  members.forEach(function(item) { byId[String(item.ID || '')] = item; });

  const rows = getRows_('Absensi')
    .filter(function(item) { return String(item.KegiatanID || '') === String(kegiatanId || ''); })
    .filter(function(item) { return String(item.StatusKehadiran || '').toLowerCase() !== 'libur'; })
    .map(function(item) {
      const member = byId[String(item.AnggotaID || '')] || {};
      return {
        ID: item.ID,
        NTA: member.NTA || '-',
        Nama: item.NamaAnggota || member.Nama || '-',
        JenisKelamin: member.JenisKelamin || '-',
        Status: item.StatusKehadiran || '-',
        Catatan: item.Catatan || '',
        Waktu: item.DibuatPada || '-'
      };
    })
    .sort(function(a, b) {
      return String(a.Nama || '').localeCompare(String(b.Nama || ''), 'id');
    });

  const summary = { hadir: 0, putra: 0, putri: 0, izin: 0, sakit: 0, alpa: 0 };
  rows.forEach(function(item) {
    const status = String(item.Status || '').trim().toLowerCase();
    if (status === 'hadir') {
      summary.hadir++;
      const jk = String(item.JenisKelamin || '').trim().toLowerCase();
      if (jk.indexOf('laki') === 0) summary.putra++;
      else if (jk.indexOf('perempuan') === 0) summary.putri++;
    } else if (status === 'izin') summary.izin++;
    else if (status === 'sakit') summary.sakit++;
    else if (status === 'alpa') summary.alpa++;
  });

  return { rows: rows, summary: summary };
}

function kasSignedAmount_(item) {
  const value = Number(item.Nominal || 0);
  return String(item.Jenis || '').trim().toLowerCase() === 'pemasukan' ? value : -value;
}

function buildActivityFinance_(kegiatan) {
  // Kas khusus kegiatan sepanjang waktu; setiap transaksi terkait dihitung sekali.
  const all = getRows_('Kas').map(sanitizeKas_);
  const openingBalance = 0;

  const linked = all.filter(function(item) {
    return String(item.KegiatanID || '') === String(kegiatan.ID || '');
  }).sort(function(a, b) {
    const byDate = String(a.Tanggal || '').localeCompare(String(b.Tanggal || ''));
    if (byDate !== 0) return byDate;
    return String(a.DibuatPada || '').localeCompare(String(b.DibuatPada || ''));
  });

  let running = openingBalance;
  let debit = 0;
  let credit = 0;
  const rows = linked.map(function(item) {
    const incoming = String(item.Jenis || '').trim().toLowerCase() === 'pemasukan';
    const amount = Number(item.Nominal || 0);
    if (incoming) debit += amount; else credit += amount;
    running += incoming ? amount : -amount;
    return {
      ID: item.ID,
      Tanggal: item.Tanggal,
      NoBukti: item.NoBukti || '',
      Uraian: item.Keterangan || item.Kategori || item.Jenis || '-',
      Penerimaan: incoming ? amount : 0,
      Pengeluaran: incoming ? 0 : amount,
      Saldo: running
    };
  });

  return {
    saldoAwal: openingBalance,
    rows: rows,
    totalPenerimaan: debit,
    totalPengeluaran: credit,
    saldoAkhir: running
  };
}

function getActivityDocumentationRows_(kegiatanId) {
  ensureDocumentationSheet_();
  return getRows_('Dokumentasi')
    .filter(function(item) { return String(item.KegiatanID || '') === String(kegiatanId || ''); })
    .sort(function(a, b) {
      const ua = Number(a.Urutan || 999999);
      const ub = Number(b.Urutan || 999999);
      if (ua !== ub) return ua - ub;
      return String(a.DibuatPada || '').localeCompare(String(b.DibuatPada || ''));
    });
}

function getKegiatanIzinRingkasInternal_(kegiatanId) {
  return getKegiatanIzinRows_(kegiatanId).map(function(item) {
    return {
      ID: item.ID,
      AnggotaID: item.AnggotaID,
      NTA: item.NTA,
      NamaAnggota: item.NamaAnggota,
      JenisPengajuan: item.JenisPengajuan || 'Izin',
      Alasan: item.Alasan,
      JenisBukti: item.JenisBukti || '',
      Status: item.Status,
      DikirimPada: item.DikirimPada,
      DiverifikasiPada: item.DiverifikasiPada || '',
      DiverifikasiOleh: item.DiverifikasiOleh || '',
      CatatanVerifikasi: item.CatatanVerifikasi || '',
      BuktiNamaFile: item.BuktiNamaFile,
      BuktiMimeType: item.BuktiMimeType
    };
  });
}

function buildActivityReportData_(kegiatanId) {
  const kegiatan = findById_('Kegiatan', kegiatanId);
  if (!kegiatan) throw new Error('Kegiatan tidak ditemukan.');
  ensureActivityReportSheet_();

  const officers = currentMemberIdentity_(getRows_('Pengurus'), 'Nama');
  const saved = getRows_('LaporanKegiatan').find(function(item) {
    return String(item.KegiatanID || '') === String(kegiatanId || '');
  }) || null;

  return {
    kegiatan: kegiatan,
    laporan: serializeActivityReport_(saved, kegiatan, officers),
    kehadiran: buildActivityAttendance_(kegiatanId),
    keuangan: buildActivityFinance_(kegiatan),
    inventarisKegiatan: getKegiatanInventarisRows_(kegiatanId),
    katalogInventaris: inventoryCatalog_(),
    izin: getKegiatanIzinRingkasInternal_(kegiatanId),
    dokumentasi: getActivityDocumentationRows_(kegiatanId)
      .filter(function(item) { return !String(item.KegiatanInventarisID || ''); })
      .map(function(item) {
        return {
          ID: item.ID,
          NamaFile: item.NamaFile,
          Keterangan: item.Keterangan || '',
          Urutan: Number(item.Urutan || 0),
          DibuatPada: item.DibuatPada,
          Uploader: item.Uploader
        };
      }),
    pengurus: officers.filter(function(item) {
      return String(item.Status || '').trim().toLowerCase() === 'aktif';
    }).map(function(item) {
      return { ID: item.ID, Nama: item.Nama, Jabatan: item.Jabatan, Bidang: item.Bidang };
    })
  };
}

function getKegiatanReportData(token, kegiatanId) {
  requirePermission_(token, 'kegiatan', 'view');
  ['anggota','absensi','kas','inventaris','pengurus'].forEach(function(module) {
    requirePermission_(token, module, 'view');
  });
  return buildActivityReportData_(kegiatanId);
}

function saveLaporanKegiatan(token, kegiatanId, payload) {
  const session = requirePermission_(token, 'kegiatan', 'edit');
  const kegiatan = findById_('Kegiatan', kegiatanId);
  if (!kegiatan) throw new Error('Kegiatan tidak ditemukan.');
  ensureActivityReportSheet_();
  payload = payload || {};


  const allowedWeather = ['Cerah','Berawan','Mendung','Hujan','Hujan Lebat','Lainnya'];
  const cuaca = String(payload.Cuaca || '').trim();
  if (cuaca && allowedWeather.indexOf(cuaca) === -1) throw new Error('Pilihan cuaca tidak valid.');

  const reportDate = String(payload.TanggalLaporan || '').trim();
  if (reportDate) validateDateString_(reportDate, 'Tanggal laporan');

  const countPamong = Math.max(0, Math.min(99, Number(payload.JumlahPamongInstruktur || 0) || 0));
  const schedule = sanitizeActivitySchedule_(payload.SusunanKegiatan || []);

  const saved = withLock_(function() {
  const existing = getRows_('LaporanKegiatan').find(function(item) {
    return String(item.KegiatanID || '') === String(kegiatanId || '');
  }) || {};

    return upsert_('LaporanKegiatan', 'LPK', {
      ID: existing.ID || '',
      KegiatanID: kegiatan.ID,
      JamMulai: String(payload.JamMulai || '').trim().slice(0, 5),
      JamSelesai: String(payload.JamSelesai || '').trim().slice(0, 5),
      Cuaca: cuaca || 'Cerah',
      JumlahPamongInstruktur: countPamong,
      FokusKrida: String(payload.FokusKrida || '').trim().slice(0, 180),
      TopikMateri: String(payload.TopikMateri || '').trim().slice(0, 500),
      Instruktur: String(payload.Instruktur || '').trim().slice(0, 300),
      SusunanKegiatanJSON: JSON.stringify(schedule),
      Pencapaian: String(payload.Pencapaian || '').trim().slice(0, 3000),
      Kendala: String(payload.Kendala || '').trim().slice(0, 3000),
      TindakLanjut: String(payload.TindakLanjut || '').trim().slice(0, 3000),
      TempatLaporan: String(payload.TempatLaporan || 'Sidoarjo').trim().slice(0, 120),
      TanggalLaporan: reportDate || todayYmd_(),
      Penandatangan1Nama: String(payload.Penandatangan1Nama || '').trim().slice(0, 180),
      Penandatangan1Jabatan: String(payload.Penandatangan1Jabatan || '').trim().slice(0, 180),
      Penandatangan2Nama: String(payload.Penandatangan2Nama || '').trim().slice(0, 180),
      Penandatangan2Jabatan: String(payload.Penandatangan2Jabatan || '').trim().slice(0, 180),
      PDFFileID: existing.PDFFileID || '',
      PDFUrl: existing.PDFUrl || ''
    });
  }, false);

  saveSystemLog_(session.Nama, 'Simpan laporan kegiatan ' + String(kegiatan.NamaKegiatan || kegiatan.ID));
  return serializeActivityReport_(saved, kegiatan, currentMemberIdentity_(getRows_('Pengurus'), 'Nama'));
}

function updateKegiatanDokumentasiMetadata(token, documentationId, payload) {
  requirePermission_(token, 'kegiatan', 'edit');
  ensureDocumentationSheet_();
  const item = findById_('Dokumentasi', documentationId);
  if (!item) throw new Error('Dokumentasi tidak ditemukan.');
  payload = payload || {};
  return withLock_(function() {
    return upsert_('Dokumentasi', 'DOC', {
      ID: item.ID,
      Keterangan: String(payload.Keterangan || '').trim().slice(0, 500),
      Urutan: Math.max(1, Math.min(999, Number(payload.Urutan || item.Urutan || 1) || 1))
    });
  }, false);
}

function formatDateIdLong_(value) {
  const raw = String(value || '').substring(0, 10);
  const parts = raw.split('-').map(Number);
  if (parts.length !== 3 || parts.some(function(n) { return !Number.isFinite(n); })) return raw || '-';
  const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  const days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  return days[date.getDay()] + ', ' + parts[2] + ' ' + months[parts[1] - 1] + ' ' + parts[0];
}

function formatDateIdShort_(value) {
  const raw = String(value || '').substring(0, 10);
  const p = raw.split('-');
  return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : raw || '-';
}

function reportMonthWeek_(value) {
  const p = String(value || '').substring(0, 10).split('-').map(Number);
  const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  if (p.length !== 3 || !p[1] || !p[2]) return '-';
  return months[p[1] - 1] + ' | Minggu ke ' + Math.ceil(p[2] / 7);
}

function rupiahPlain_(value) {
  const number = Math.round(Number(value || 0));
  return 'Rp ' + String(number).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function reportLogoBlob_() {
  return Utilities.newBlob(
    Utilities.base64Decode(REPORT_LOGO_BASE64),
    'image/png',
    'saka-dirgantara-transparan.png'
  );
}

function setReportTextStyle_(text, size, bold, color, italic, underline) {
  try {
    text.setFontFamily(REPORT_THEME.FONT);
    if (size) text.setFontSize(size);
    if (bold !== undefined) text.setBold(Boolean(bold));
    if (color) text.setForegroundColor(color);
    if (italic !== undefined) text.setItalic(Boolean(italic));
    if (underline !== undefined) text.setUnderline(Boolean(underline));
  } catch (_) {}
  return text;
}

function setReportParagraphFormat_(paragraph, options) {
  options = options || {};
  try {
    paragraph.setAlignment(
      options.align === 'right'
        ? DocumentApp.HorizontalAlignment.RIGHT
        : options.align === 'center'
          ? DocumentApp.HorizontalAlignment.CENTER
          : DocumentApp.HorizontalAlignment.LEFT
    );
    if (options.spacingAfter !== undefined) paragraph.setSpacingAfter(options.spacingAfter);
    if (options.spacingBefore !== undefined) paragraph.setSpacingBefore(options.spacingBefore);
    if (options.lineSpacing !== undefined) paragraph.setLineSpacing(options.lineSpacing);
  } catch (_) {}
  return paragraph;
}

function appendReportParagraph_(container, value, options) {
  options = options || {};
  const p = container.appendParagraph(String(value || ''));
  setReportParagraphFormat_(p, options);
  setReportTextStyle_(
    p.editAsText(),
    options.size || 10.5,
    options.bold || false,
    options.color || REPORT_THEME.TEXT,
    options.italic || false,
    options.underline || false
  );
  return p;
}

function appendReportSpacer_(container, points) {
  const p = container.appendParagraph('');
  try {
    p.setSpacingBefore(0).setSpacingAfter(Math.max(0, Number(points || 0)));
  } catch (_) {}
  return p;
}

function clearReportCell_(cell) {
  try {
    while (cell.getNumChildren()) cell.removeChild(cell.getChild(0));
  } catch (_) {}
  return cell;
}

function setReportCellPadding_(cell, value) {
  try {
    cell.setPaddingTop(value)
      .setPaddingBottom(value)
      .setPaddingLeft(value)
      .setPaddingRight(value);
  } catch (_) {}
}

function setReportCellText_(cell, value, options) {
  options = options || {};
  clearReportCell_(cell);
  try {
    if (options.background) cell.setBackgroundColor(options.background);
    if (options.verticalCenter) cell.setVerticalAlignment(DocumentApp.VerticalAlignment.CENTER);
  } catch (_) {}
  setReportCellPadding_(cell, options.padding !== undefined ? options.padding : 5);
  return appendReportParagraph_(cell, value, {
    size: options.size || 9.5,
    bold: options.bold || false,
    color: options.color || REPORT_THEME.TEXT,
    align: options.align || 'left',
    lineSpacing: options.lineSpacing || 1.05,
    spacingAfter: 0,
    spacingBefore: 0,
    italic: options.italic || false,
    underline: options.underline || false
  });
}

function setReportColumnWidths_(table, widths) {
  (widths || []).forEach(function(width, index) {
    try { table.setColumnWidth(index, width); } catch (_) {}
  });
}

function styleReportTable_(table, options) {
  options = options || {};
  try {
    table.setBorderColor(options.borderColor || REPORT_THEME.BORDER);
    table.setBorderWidth(options.borderWidth !== undefined ? options.borderWidth : 0.5);
  } catch (_) {}
  if (options.widths) setReportColumnWidths_(table, options.widths);
  return table;
}

function appendReportSection_(body, letter, title) {
  appendReportSpacer_(body, 4);
  const table = body.appendTable([[String(letter || ''), String(title || '')]]);
  styleReportTable_(table, { borderWidth: 0, widths: [34, 445] });
  const row = table.getRow(0);
  setReportCellText_(row.getCell(0), String(letter || ''), {
    background: REPORT_THEME.NAVY,
    color: REPORT_THEME.WHITE,
    bold: true,
    size: 11,
    align: 'center',
    padding: 6,
    verticalCenter: true
  });
  setReportCellText_(row.getCell(1), String(title || ''), {
    background: REPORT_THEME.BLUE_LIGHT,
    color: REPORT_THEME.NAVY,
    bold: true,
    size: 11,
    padding: 6,
    verticalCenter: true
  });
  appendReportSpacer_(body, 5);
  return table;
}

function appendReportKeyValueTable_(body, items) {
  const rows = (items || []).map(function(item) {
    return [String(item[0] || ''), String(item[1] || '-')];
  });
  const table = body.appendTable(rows.length ? rows : [['-', '-']]);
  styleReportTable_(table, { borderWidth: 0.5, widths: [145, 334] });
  for (let r = 0; r < table.getNumRows(); r++) {
    const row = table.getRow(r);
    setReportCellText_(row.getCell(0), rows[r][0], {
      background: REPORT_THEME.SURFACE,
      color: REPORT_THEME.NAVY,
      bold: true,
      size: 9.3,
      padding: 5
    });
    setReportCellText_(row.getCell(1), rows[r][1], {
      background: REPORT_THEME.WHITE,
      color: REPORT_THEME.TEXT,
      size: 9.5,
      padding: 5,
      lineSpacing: 1.1
    });
  }
  return table;
}

function styleReportHeaderRow_(row, size) {
  for (let c = 0; c < row.getNumCells(); c++) {
    setReportCellText_(row.getCell(c), row.getCell(c).getText(), {
      background: REPORT_THEME.NAVY,
      color: REPORT_THEME.WHITE,
      bold: true,
      size: size || 8.5,
      align: 'center',
      padding: 5,
      verticalCenter: true
    });
  }
}

function appendReportAttendanceSummary_(body, report, summary) {
  summary = summary || {};
  const totalAnggota = Number(summary.hadir || 0) + Number(summary.izin || 0) +
    Number(summary.sakit || 0) + Number(summary.alpa || 0);
  const rows = [
    ['Kategori', 'Jumlah', 'Keterangan'],
    ['Pamong Saka / Instruktur', String(report.JumlahPamongInstruktur || 0), 'Orang'],
    ['Anggota Hadir', String(summary.hadir || 0), 'Orang'],
    ['  Putra', String(summary.putra || 0), 'Orang'],
    ['  Putri', String(summary.putri || 0), 'Orang'],
    ['Anggota Izin', String(summary.izin || 0), 'Orang'],
    ['Anggota Sakit', String(summary.sakit || 0), 'Orang'],
    ['Anggota Alpa', String(summary.alpa || 0), 'Orang'],
    ['Total Anggota Tercatat', String(totalAnggota), 'Orang']
  ];
  const table = body.appendTable(rows);
  styleReportTable_(table, { borderWidth: 0.5, widths: [300, 78, 101] });
  styleReportHeaderRow_(table.getRow(0), 8.8);

  for (let r = 1; r < table.getNumRows(); r++) {
    const row = table.getRow(r);
    const isTotal = r === table.getNumRows() - 1;
    for (let c = 0; c < row.getNumCells(); c++) {
      const current = row.getCell(c).getText();
      setReportCellText_(row.getCell(c), current, {
        background: isTotal ? REPORT_THEME.BLUE_LIGHT : REPORT_THEME.WHITE,
        color: isTotal ? REPORT_THEME.NAVY : REPORT_THEME.TEXT,
        bold: isTotal,
        size: 9,
        align: c === 0 ? 'left' : 'center',
        padding: 4.5
      });
    }
  }
  return table;
}

function appendReportScheduleTable_(body, schedule) {
  const rows = [['No', 'Waktu', 'Kegiatan']];
  (schedule || []).forEach(function(item, index) {
    rows.push([
      String(index + 1),
      String(item.mulai || '-') + ' - ' + String(item.selesai || '-'),
      String(item.kegiatan || '-')
    ]);
  });
  if (rows.length === 1) rows.push(['-', '-', 'Belum ada susunan kegiatan yang dicatat.']);

  const table = body.appendTable(rows);
  styleReportTable_(table, { borderWidth: 0.5, widths: [34, 100, 345] });
  styleReportHeaderRow_(table.getRow(0), 8.8);
  for (let r = 1; r < table.getNumRows(); r++) {
    const row = table.getRow(r);
    setReportCellText_(row.getCell(0), row.getCell(0).getText(), { size: 9, align: 'center', padding: 5 });
    setReportCellText_(row.getCell(1), row.getCell(1).getText(), { size: 9, align: 'center', padding: 5 });
    setReportCellText_(row.getCell(2), row.getCell(2).getText(), { size: 9.2, padding: 5, lineSpacing: 1.1 });
  }
  return table;
}

function appendReportEvaluationTable_(body, report) {
  const rows = [
    ['1. Pencapaian', String(report.Pencapaian || '-')],
    ['2. Kendala', String(report.Kendala || '-')],
    ['3. Tindak Lanjut / Saran', String(report.TindakLanjut || '-')]
  ];
  const table = body.appendTable(rows);
  styleReportTable_(table, { borderWidth: 0.5, widths: [145, 334] });
  for (let r = 0; r < table.getNumRows(); r++) {
    const row = table.getRow(r);
    setReportCellText_(row.getCell(0), rows[r][0], {
      background: REPORT_THEME.BLUE_LIGHT,
      color: REPORT_THEME.NAVY,
      bold: true,
      size: 9.2,
      padding: 6,
      verticalCenter: true
    });
    setReportCellText_(row.getCell(1), rows[r][1], {
      background: REPORT_THEME.WHITE,
      color: REPORT_THEME.TEXT,
      size: 9.4,
      padding: 6,
      lineSpacing: 1.15
    });
  }
  return table;
}

function appendReportNote_(body, message) {
  const table = body.appendTable([[String(message || '')]]);
  styleReportTable_(table, { borderWidth: 0, widths: [479] });
  setReportCellText_(table.getCell(0, 0), String(message || ''), {
    background: REPORT_THEME.BLUE_LIGHT,
    color: REPORT_THEME.MUTED,
    size: 8.6,
    italic: true,
    padding: 6
  });
  appendReportSpacer_(body, 4);
  return table;
}

function appendReportFinanceTable_(body, data) {
  const rows = [['No','Tanggal','No. Bukti','Uraian / Keterangan','Penerimaan','Pengeluaran','Saldo']];
  let no = 1;
  if (Number(data.saldoAwal || 0) !== 0) {
    rows.push([String(no++), '', '', 'Saldo Awal', rupiahPlain_(data.saldoAwal), 'Rp 0', rupiahPlain_(data.saldoAwal)]);
  }
  (data.rows || []).forEach(function(item) {
    rows.push([
      String(no++),
      formatDateIdShort_(item.Tanggal),
      String(item.NoBukti || '-'),
      String(item.Uraian || '-'),
      rupiahPlain_(item.Penerimaan),
      rupiahPlain_(item.Pengeluaran),
      rupiahPlain_(item.Saldo)
    ]);
  });
  if (rows.length === 1) {
    rows.push(['-', '-', '-', 'Tidak terdapat transaksi keuangan terkait kegiatan ini.', 'Rp 0', 'Rp 0', rupiahPlain_(data.saldoAkhir || 0)]);
  }
  rows.push(['', '', '', 'TOTAL', rupiahPlain_(data.totalPenerimaan || 0), rupiahPlain_(data.totalPengeluaran || 0), rupiahPlain_(data.saldoAkhir || 0)]);

  const table = body.appendTable(rows);
  styleReportTable_(table, { borderWidth: 0.45, widths: [26, 57, 50, 145, 67, 67, 67] });
  styleReportHeaderRow_(table.getRow(0), 7.3);

  for (let r = 1; r < table.getNumRows(); r++) {
    const row = table.getRow(r);
    const isTotal = r === table.getNumRows() - 1;
    for (let c = 0; c < row.getNumCells(); c++) {
      const value = row.getCell(c).getText();
      setReportCellText_(row.getCell(c), value, {
        background: isTotal ? REPORT_THEME.BLUE_LIGHT : REPORT_THEME.WHITE,
        color: isTotal ? REPORT_THEME.NAVY : REPORT_THEME.TEXT,
        bold: isTotal,
        size: c === 3 ? 7.7 : 7.4,
        align: c === 0 || c === 1 || c === 2 ? 'center' : (c >= 4 ? 'right' : 'left'),
        padding: 3.5,
        lineSpacing: 1.0
      });
    }
  }
  return table;
}

function appendReportInventoryTable_(body, items) {
  const rows = [['No','Inventaris','Awal','Dipakai','Kembali / akhir lama','Kondisi Awal','Kondisi / status']];
  (items || []).forEach(function(item, index) {
    rows.push([
      String(index + 1),
      String(item.NamaBarang || item.KodeBarang || '-'),
      String(item.JumlahAwal || 0) + ' unit',
      String(item.JumlahDipakai || 0) + ' unit',
      item.StatusPemakaian === 'Dipakai' ? 'Belum kembali' : String(item.JumlahSetelah || 0) + ' unit',
      String(item.KondisiAwal || '-'),
      String(item.KondisiSetelah || '-') + (item.StatusPemakaian ? ' / ' + item.StatusPemakaian : ' / Legacy')
    ]);
  });
  if (rows.length === 1) {
    rows.push(['-','Belum ada inventaris yang dicatat untuk kegiatan ini.','-','-','-','-','-']);
  }

  const table = body.appendTable(rows);
  styleReportTable_(table, { borderWidth: 0.45, widths: [27, 145, 55, 58, 58, 68, 68] });
  styleReportHeaderRow_(table.getRow(0), 7.3);
  for (let r = 1; r < table.getNumRows(); r++) {
    const row = table.getRow(r);
    for (let c = 0; c < row.getNumCells(); c++) {
      setReportCellText_(row.getCell(c), row.getCell(c).getText(), {
        size: c === 1 ? 7.6 : 7.2,
        align: c === 0 || c >= 2 ? 'center' : 'left',
        padding: 3.5,
        lineSpacing: 1.0
      });
    }
  }
  return table;
}

function appendReportFooter_(doc) {
  try {
    const footer = doc.addFooter();
    const table = footer.appendTable([['SAKA DIRGANTARA - LAPORAN KEGIATAN', '']]);
    table.setBorderWidth(0);
    setReportColumnWidths_(table, [380, 99]);
    setReportCellText_(table.getCell(0, 0), 'SAKA DIRGANTARA - LAPORAN KEGIATAN', {
      size: 7.5,
      color: REPORT_THEME.MUTED,
      padding: 0
    });
    const right = table.getCell(0, 1);
    clearReportCell_(right);
    setReportCellPadding_(right, 0);
    const p = right.appendParagraph('');
    setReportParagraphFormat_(p, { align: 'right', spacingAfter: 0, spacingBefore: 0 });
    const prefix = p.appendText('Halaman ');
    setReportTextStyle_(prefix, 7.5, false, REPORT_THEME.MUTED);
    const pageNumber = p.appendPageNumber();
    try { pageNumber.setAttributes({}); } catch (_) {}
  } catch (_) {}
}

function appendProfessionalCover_(body, kegiatan) {
  appendReportSpacer_(body, 6);

  const brand = body.appendTable([['', '']]);
  styleReportTable_(brand, { borderWidth: 0, widths: [58, 421] });
  const logoCell = brand.getCell(0, 0);
  clearReportCell_(logoCell);
  setReportCellPadding_(logoCell, 0);
  try {
    const p = logoCell.appendParagraph('');
    p.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    const img = p.appendInlineImage(reportLogoBlob_());
    img.setWidth(48).setHeight(45);
  } catch (_) {}
  const orgCell = brand.getCell(0, 1);
  clearReportCell_(orgCell);
  setReportCellPadding_(orgCell, 0);
  appendReportParagraph_(orgCell, 'SAKA DIRGANTARA', {
    size: 10.5,
    bold: true,
    color: REPORT_THEME.NAVY,
    spacingAfter: 1
  });
  appendReportParagraph_(orgCell, 'KWARTIR CABANG SIDOARJO', {
    size: 8.2,
    bold: true,
    color: REPORT_THEME.MUTED,
    spacingAfter: 0
  });

  appendReportSpacer_(body, 28);
  appendReportParagraph_(body, 'LAPORAN KEGIATAN', {
    align: 'center',
    size: 22,
    bold: true,
    color: REPORT_THEME.NAVY,
    spacingAfter: 8
  });
  appendReportParagraph_(body, String(kegiatan.NamaKegiatan || 'Kegiatan').toUpperCase(), {
    align: 'center',
    size: 15,
    bold: true,
    color: REPORT_THEME.TEXT,
    spacingAfter: 4
  });
  appendReportParagraph_(body, 'SAKA DIRGANTARA - KWARTIR CABANG SIDOARJO', {
    align: 'center',
    size: 9.5,
    bold: true,
    color: REPORT_THEME.MUTED,
    spacingAfter: 18
  });

  try {
    const pLogo = body.appendParagraph('');
    pLogo.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    const logo = pLogo.appendInlineImage(reportLogoBlob_());
    logo.setWidth(185).setHeight(172);
  } catch (_) {}

  appendReportSpacer_(body, 16);
  appendReportKeyValueTable_(body, [
    ['Hari, Tanggal', formatDateIdLong_(kegiatan.Tanggal)],
    ['Lokasi', String(kegiatan.Lokasi || '-')],
    ['Penanggung Jawab', String(kegiatan.PenanggungJawab || '-')],
    ['Periode', reportMonthWeek_(kegiatan.Tanggal)]
  ]);

  appendReportSpacer_(body, 22);
  appendReportParagraph_(body, 'Pangkalan TNI AU Lanud Muljono', {
    align: 'center',
    size: 10.5,
    bold: true,
    color: REPORT_THEME.NAVY,
    spacingAfter: 2
  });
  appendReportParagraph_(body, 'Kwartir Cabang Sidoarjo', {
    align: 'center',
    size: 9.5,
    color: REPORT_THEME.MUTED,
    spacingAfter: 0
  });
}

function appendSignatureBlock_(body, report) {
  appendReportSpacer_(body, 18);
  const signPlace = report.TempatLaporan || 'Sidoarjo';
  const signDate = formatDateIdLong_(report.TanggalLaporan || todayYmd_()).replace(/^[^,]+,\s*/, '');
  appendReportParagraph_(body, signPlace + ', ' + signDate, {
    align: 'right',
    size: 9.5,
    color: REPORT_THEME.TEXT,
    spacingAfter: 10
  });

  const table = body.appendTable([['', '']]);
  styleReportTable_(table, { borderWidth: 0, widths: [239, 240] });
  const left = table.getCell(0, 0);
  const right = table.getCell(0, 1);
  clearReportCell_(left);
  clearReportCell_(right);
  setReportCellPadding_(left, 4);
  setReportCellPadding_(right, 4);

  appendReportParagraph_(left, 'Mengetahui,', { align: 'center', size: 9, color: REPORT_THEME.MUTED, spacingAfter: 1 });
  appendReportParagraph_(left, String(report.Penandatangan1Jabatan || 'Pamong Saka Dirgantara'), {
    align: 'center', size: 9.2, bold: true, color: REPORT_THEME.NAVY, spacingAfter: 34
  });
  appendReportParagraph_(left, String(report.Penandatangan1Nama || '-'), {
    align: 'center', size: 9.5, bold: true, underline: true, color: REPORT_THEME.TEXT, spacingAfter: 2
  });
  appendReportParagraph_(left, 'Kwartir Cabang Sidoarjo', {
    align: 'center', size: 8.3, color: REPORT_THEME.MUTED, spacingAfter: 0
  });

  appendReportParagraph_(right, 'Disusun oleh,', { align: 'center', size: 9, color: REPORT_THEME.MUTED, spacingAfter: 1 });
  appendReportParagraph_(right, String(report.Penandatangan2Jabatan || 'Dewan Saka'), {
    align: 'center', size: 9.2, bold: true, color: REPORT_THEME.NAVY, spacingAfter: 34
  });
  appendReportParagraph_(right, String(report.Penandatangan2Nama || '-'), {
    align: 'center', size: 9.5, bold: true, underline: true, color: REPORT_THEME.TEXT, spacingAfter: 2
  });
}

function reportGenderShort_(value) {
  const v = String(value || '').toLowerCase();
  if (v.indexOf('laki') === 0) return 'L';
  if (v.indexOf('perempuan') === 0) return 'P';
  return '-';
}

function appendAttendanceAppendix_(body, attendance, kegiatan) {
  body.appendPageBreak();
  appendReportParagraph_(body, 'LAMPIRAN I', {
    align: 'center', size: 9, bold: true, color: REPORT_THEME.BLUE, spacingAfter: 2
  });
  appendReportParagraph_(body, 'DAFTAR KEHADIRAN PESERTA', {
    align: 'center', size: 14, bold: true, color: REPORT_THEME.NAVY, spacingAfter: 3
  });
  appendReportParagraph_(body, String(kegiatan.NamaKegiatan || '-') + ' | ' + formatDateIdLong_(kegiatan.Tanggal), {
    align: 'center', size: 8.8, color: REPORT_THEME.MUTED, spacingAfter: 10
  });

  const rows = [['No','NTA','Nama','JK','Status','Keterangan']];
  (attendance.rows || []).forEach(function(item, index) {
    rows.push([
      String(index + 1),
      String(item.NTA || '-'),
      String(item.Nama || '-'),
      reportGenderShort_(item.JenisKelamin),
      String(item.Status || '-'),
      String(item.Catatan || '-')
    ]);
  });
  if (rows.length === 1) rows.push(['-','-','Belum ada data absensi.','-','-','-']);

  const table = body.appendTable(rows);
  styleReportTable_(table, { borderWidth: 0.45, widths: [27, 88, 170, 38, 70, 86] });
  styleReportHeaderRow_(table.getRow(0), 7.8);
  for (let r = 1; r < table.getNumRows(); r++) {
    const row = table.getRow(r);
    for (let c = 0; c < row.getNumCells(); c++) {
      const val = row.getCell(c).getText();
      setReportCellText_(row.getCell(c), val, {
        size: c === 2 || c === 5 ? 7.8 : 7.6,
        align: c === 2 || c === 5 ? 'left' : 'center',
        padding: 3.5,
        lineSpacing: 1.0
      });
    }
  }

  const s = attendance.summary || {};
  appendReportNote_(body,
    'Ringkasan: Hadir ' + String(s.hadir || 0) +
    ' | Izin ' + String(s.izin || 0) +
    ' | Sakit ' + String(s.sakit || 0) +
    ' | Alpa ' + String(s.alpa || 0) +
    ' | Putra ' + String(s.putra || 0) +
    ' | Putri ' + String(s.putri || 0)
  );
}

function appendDocumentationGrid_(body, docs, kegiatan) {
  if (!docs.length) {
    appendReportParagraph_(body, 'Belum ada dokumentasi kegiatan.', {
      align: 'center', size: 10, color: REPORT_THEME.MUTED, italic: true
    });
    return;
  }

  for (let start = 0; start < docs.length; start += 4) {
    if (start > 0) body.appendPageBreak();

    appendReportParagraph_(body, 'LAMPIRAN II' + (start > 0 ? ' - LANJUTAN' : ''), {
      align: 'center', size: 9, bold: true, color: REPORT_THEME.BLUE, spacingAfter: 2
    });
    appendReportParagraph_(body, 'DOKUMENTASI KEGIATAN', {
      align: 'center', size: 14, bold: true, color: REPORT_THEME.NAVY, spacingAfter: 3
    });
    appendReportParagraph_(body, String(kegiatan.NamaKegiatan || '-') + ' | ' + formatDateIdLong_(kegiatan.Tanggal), {
      align: 'center', size: 8.8, color: REPORT_THEME.MUTED, spacingAfter: 10
    });

    const slice = docs.slice(start, start + 4);
    const grid = body.appendTable([['',''],['','']]);
    styleReportTable_(grid, { borderWidth: 0, widths: [239, 240] });

    for (let i = 0; i < 4; i++) {
      const cell = grid.getCell(Math.floor(i / 2), i % 2);
      clearReportCell_(cell);
      setReportCellPadding_(cell, 5);
      const item = slice[i];
      if (!item) {
        appendReportParagraph_(cell, '', { size: 8, spacingAfter: 0 });
        continue;
      }

      let file = null;
      try { file = DriveApp.getFileById(String(item.DriveFileID || '')); } catch (_) {}
      if (file) {
        try {
          const p = cell.appendParagraph('');
          p.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
          const image = p.appendInlineImage(file.getBlob());
          const maxW = 218;
          const maxH = 150;
          const w = image.getWidth();
          const h = image.getHeight();
          const scale = Math.min(maxW / Math.max(w, 1), maxH / Math.max(h, 1), 1);
          image.setWidth(Math.max(1, Math.round(w * scale))).setHeight(Math.max(1, Math.round(h * scale)));
        } catch (_) {
          appendReportParagraph_(cell, '[Foto tidak dapat dimuat]', { align: 'center', size: 8.5, color: REPORT_THEME.MUTED });
        }
      } else {
        appendReportParagraph_(cell, '[File dokumentasi tidak ditemukan]', { align: 'center', size: 8.5, color: REPORT_THEME.MUTED });
      }

      appendReportParagraph_(cell,
        'Foto ' + String(start + i + 1) + '. ' + String(item.Keterangan || item.NamaFile || 'Dokumentasi kegiatan'),
        { size: 8.5, bold: true, color: REPORT_THEME.TEXT, spacingBefore: 3, spacingAfter: 8, lineSpacing: 1.05 }
      );
    }
  }
}

function appendDocumentationAppendix_(body, docs, kegiatan) {
  body.appendPageBreak();
  appendDocumentationGrid_(body, docs, kegiatan);
}

function generateKegiatanReportPdf(token, kegiatanId) {
  const session = requirePermission_(token, 'kegiatan', 'create');
  ['anggota','absensi','kas','inventaris','pengurus'].forEach(function(module) {
    requirePermission_(token, module, 'view');
  });
  const data = buildActivityReportData_(kegiatanId);
  const kegiatan = data.kegiatan;
  const report = data.laporan;
  const folder = getActivityReportFolder_(kegiatan);
  const safeName = String(kegiatan.NamaKegiatan || 'Kegiatan')
    .replace(/[^a-zA-Z0-9 _.-]+/g, '')
    .trim()
    .slice(0, 80) || 'Kegiatan';
  const fileBase = 'Laporan Kegiatan - ' + safeName + ' - ' + String(kegiatan.Tanggal || todayYmd_());

  const doc = DocumentApp.create(fileBase + ' (temp)');
  const docFile = DriveApp.getFileById(doc.getId());
  try { docFile.moveTo(folder); } catch (_) {}
  const body = doc.getBody();

  try {
    body.setPageWidth(595.28).setPageHeight(841.89);
    body.setMarginTop(46).setMarginBottom(46).setMarginLeft(54).setMarginRight(54);
  } catch (_) {}

  appendReportFooter_(doc);

  // COVER PROFESIONAL
  appendProfessionalCover_(body, kegiatan);

  body.appendPageBreak();

  // A. WAKTU DAN TEMPAT
  appendReportSection_(body, 'A', 'Keterangan Waktu dan Tempat');
  const waktu = report.JamMulai || report.JamSelesai
    ? String(report.JamMulai || '-') + ' - ' + String(report.JamSelesai || '-') + ' WIB'
    : '-';
  appendReportKeyValueTable_(body, [
    ['Hari, Tanggal', formatDateIdLong_(kegiatan.Tanggal)],
    ['Waktu', waktu],
    ['Tempat', String(kegiatan.Lokasi || '-')],
    ['Cuaca', String(report.Cuaca || '-')]
  ]);

  // B. KEHADIRAN
  appendReportSection_(body, 'B', 'Kehadiran');
  appendReportAttendanceSummary_(body, report, data.kehadiran.summary);
  appendReportNote_(body, 'Daftar kehadiran lengkap tercantum pada Lampiran I.');

  // C. MATERI LATIHAN
  appendReportSection_(body, 'C', 'Materi Latihan');
  appendReportKeyValueTable_(body, [
    ['Fokus Krida', String(report.FokusKrida || '-')],
    ['Topik Materi', String(report.TopikMateri || '-')],
    ['Instruktur / Pemateri', String(report.Instruktur || '-')]
  ]);

  // D. SUSUNAN KEGIATAN
  appendReportSection_(body, 'D', 'Susunan Kegiatan');
  appendReportScheduleTable_(body, report.SusunanKegiatan || []);

  // E. EVALUASI - mulai halaman baru agar judul section tidak terpisah dari isi.
  body.appendPageBreak();
  appendReportSection_(body, 'E', 'Evaluasi dan Catatan');
  appendReportEvaluationTable_(body, report);

  // F. KEUANGAN
  appendReportSection_(body, 'F', 'Laporan Keuangan');
  appendReportFinanceTable_(body, data.keuangan);
  appendReportNote_(body, 'Kas khusus kegiatan: seluruh transaksi terkait dihitung sekali, termasuk sebelum tanggal kegiatan. Saldo awal Rp 0; bukan saldo kas organisasi.');

  // G. INVENTARIS KEGIATAN
  appendReportSection_(body, 'G', 'Inventaris Kegiatan');
  appendReportInventoryTable_(body, data.inventarisKegiatan || []);
  appendReportNote_(body, 'Foto kondisi yang sudah diunggah tercantum pada Lampiran II. Catatan Legacy memakai jumlah akhir lama; catatan baru memakai jumlah kembali dari barang yang dipakai.');

  // H. DOKUMENTASI
  appendReportSection_(body, 'H', 'Dokumentasi');
  appendReportKeyValueTable_(body, [
    ['Jumlah Dokumentasi', String((data.dokumentasi || []).length) + ' foto'],
    ['Keterangan', (data.dokumentasi || []).length
      ? 'Dokumentasi lengkap tercantum pada Lampiran II.'
      : 'Belum ada dokumentasi kegiatan yang diunggah.']
  ]);

  appendSignatureBlock_(body, report);

  appendAttendanceAppendix_(body, data.kehadiran, kegiatan);
  appendDocumentationAppendix_(body, getActivityDocumentationRows_(kegiatanId), kegiatan);

  doc.saveAndClose();

  const pdfBlob = docFile.getAs(MimeType.PDF).setName(fileBase + '.pdf');
  const pdfFile = folder.createFile(pdfBlob);
  try { docFile.setTrashed(true); } catch (_) {}

  ensureActivityReportSheet_();
  let previousPdfId = '';
  withLock_(function() {
  const current = getRows_('LaporanKegiatan').find(function(item) {
    return String(item.KegiatanID || '') === String(kegiatanId || '');
  }) || {};
    previousPdfId = current.PDFFileID || '';

    upsert_('LaporanKegiatan', 'LPK', {
      ID: current.ID || '',
      KegiatanID: kegiatan.ID,
      PDFFileID: pdfFile.getId(),
      PDFUrl: pdfFile.getUrl()
    });
  }, false);

  trashReplacedPdf_(previousPdfId, pdfFile.getId());

  saveSystemLog_(session.Nama, 'Generate PDF laporan kegiatan profesional ' + String(kegiatan.NamaKegiatan || kegiatan.ID));
  return {
    success: true,
    fileId: pdfFile.getId(),
    name: pdfFile.getName(),
    url: pdfFile.getUrl(),
    message: 'PDF laporan kegiatan profesional berhasil dibuat.'
  };
}

// Hanya bersihkan PDF terdahulu setelah metadata pengganti berhasil disimpan.
function trashReplacedPdf_(previousId, currentId) {
  if (!previousId || String(previousId) === String(currentId)) return;
  try { DriveApp.getFileById(String(previousId)).setTrashed(true); } catch (_) {}
}

/* Notification & Action Center: live conditions, scoped by module permissions. */
function notificationReadKey_(session) {
  return 'ACTION_READ:' + getDatabase_().getId() + ':' + session.ID;
}

function notificationFingerprint_(value) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value, Utilities.Charset.UTF_8)
    .map(byte => ('0' + ((byte + 256) % 256).toString(16)).slice(-2)).join('').slice(0,24);
}

function buildActionNotifications_(session) {
  const db = getDatabase_();
  const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || 'Asia/Jakarta', 'yyyy-MM-dd');
  const dayMs = value => Date.parse(String(value).slice(0,10) + 'T00:00:00Z');
  const canView = module => hasRolePermission_(session, module, 'view');
  const items = [];
  const push = (module, kind, row, title, detail, priority, action, label, targetId) => {
    const revision = [kind,row.ID,row.DiubahPada || '',row.Status || '',row.StatusPemakaian || '',detail].join('|');
    items.push({id:notificationFingerprint_(revision),module,kind,title,detail,priority,
      action,label,targetId:String(targetId || row.ID || ''),recordId:String(row.ID || ''),
      date:String(row.Tanggal || row.DiubahPada || '').slice(0,10)});
  };
  if (canView('kegiatan')) getRows_('Kegiatan',db).forEach(row => {
    if (!['Rencana','Berjalan'].includes(row.Status)) return;
    const days = Math.round((dayMs(row.Tanggal)-dayMs(today))/86400000);
    if (days < 0) push('kegiatan','activity-past',row,'Periksa status kegiatan',row.NamaKegiatan+' — tanggal kegiatan '+row.Tanggal+' telah lewat; status masih '+row.Status+'.','high','edit','Periksa kegiatan');
    else if (days <= 7) push('kegiatan','activity-soon',row,'Kegiatan dalam 7 hari',row.NamaKegiatan+' — '+row.Tanggal+'.','normal','edit','Buka kegiatan');
  });
  if (canView('inventaris')) {
    getRows_('KegiatanInventaris',db).filter(row => row.StatusPemakaian === 'Dipakai').forEach(row => {
      push('inventaris','inventory-return',row,'Barang belum dikembalikan',row.NamaBarang+' — '+Number(row.JumlahDipakai || 0)+' unit sedang dipakai.','normal','inventory-return','Pakai / Kembali',row.InventarisID);
    });
    getRows_('Inventaris',db).filter(row => inventoryDamaged_(row)>0 || row.Kondisi === 'Hilang').forEach(row => {
      push('inventaris','inventory-damaged',row,'Periksa kondisi inventaris',row.NamaBarang+' — '+(row.Kondisi || 'Rusak')+'; '+inventoryDamaged_(row)+' unit tidak layak.','high','edit','Periksa barang');
    });
  }
  if (canView('surat')) getRows_('Surat',db).filter(row => ['Draft','Diproses'].includes(row.Status)).forEach(row => {
    push('surat','letter-pending',row,'Surat perlu ditindaklanjuti',(row.NomorSurat || 'Tanpa nomor')+' — '+row.Perihal+' ('+row.Status+').','normal','edit','Periksa surat');
  });
  if (canView('absensi')) getRows_('IzinKegiatan',db).filter(row => ['Menunggu Verifikasi','Terkirim'].includes(row.Status)).forEach(row => {
    push('absensi','permission-pending',row,'Izin menunggu verifikasi',row.NamaAnggota+' — '+row.KegiatanNama+'.','high','attendance','Buka verifikasi',row.KegiatanID);
  });
  if (canView('kas')) {
    const rows = getRows_('Kas',db).filter(row => String(row.Tanggal || '').slice(0,10)<=today);
    const balance = rows.reduce((sum,row) => sum+(row.Jenis==='Pemasukan'?1:row.Jenis==='Pengeluaran'?-1:0)*Number(row.Nominal || 0),0);
    if (balance<0) push('kas','cash-negative',{ID:'balance'},'Saldo kas negatif','Saldo tercatat Rp '+balance.toLocaleString('id-ID')+'. Periksa transaksi kas.','high','navigate','Buka kas');
  }
  items.sort((a,b) => (a.priority==='high'?0:1)-(b.priority==='high'?0:1) || b.date.localeCompare(a.date) || a.id.localeCompare(b.id));
  return {items:items.slice(0,200),total:items.length,today};
}

function getActionNotifications(token) {
  const session = requireSession_(token,['ADMIN','PENGURUS']);
  const result = buildActionNotifications_(session);
  let ids = [];
  try { ids = JSON.parse(PropertiesService.getScriptProperties().getProperty(notificationReadKey_(session)) || '[]'); } catch (_) {}
  const read = new Set(Array.isArray(ids) ? ids : []);
  result.items = result.items.map(item => Object.assign({},item,{read:read.has(item.id)}));
  result.unread = result.items.filter(item => !item.read).length;
  return result;
}

function markActionNotificationsRead(token, ids) {
  const session = requireSession_(token,['ADMIN','PENGURUS']);
  if (!Array.isArray(ids) || ids.length>200 || ids.some(id => !/^[a-f0-9]{24}$/.test(String(id)))) throw new Error('Daftar notifikasi tidak valid.');
  return withLock_(function() {
    const active = new Set(buildActionNotifications_(session).items.map(item => item.id));
    const props = PropertiesService.getScriptProperties();
    const key = notificationReadKey_(session);
    let old = [];
    try { old = JSON.parse(props.getProperty(key) || '[]'); } catch (_) {}
    const next = [...new Set((Array.isArray(old)?old:[]).concat(ids))].filter(id => active.has(id)).slice(-200);
    props.setProperty(key,JSON.stringify(next));
    return {success:true};
  },false);
}

function getActionPermissionDetail(token, id) {
  requirePermission_(token,'absensi','view');
  const row = findById_('IzinKegiatan',id);
  if (!row) throw new Error('Pengajuan tidak ditemukan.');
  return {ID:row.ID,NamaAnggota:row.NamaAnggota,KegiatanNama:row.KegiatanNama,
    JenisPengajuan:row.JenisPengajuan,Alasan:row.Alasan,Status:row.Status,BuktiNamaFile:row.BuktiNamaFile};
}

function verifyActionPermission(token, id, decision, note) {
  requirePermission_(token,'absensi','edit');
  return withLock_(function() {
    const row = findById_('IzinKegiatan',id);
    if (!row || !['Menunggu Verifikasi','Terkirim'].includes(row.Status)) throw new Error('Pengajuan sudah diproses. Muat ulang notifikasi.');
    return verifyIzinKegiatan(token,id,decision,note);
  },false);
}
