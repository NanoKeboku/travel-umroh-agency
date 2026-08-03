/**
 * Data paket umrah & haji
 * CATATAN: data PLACEHOLDER — ganti dengan data asli Ebitour.
 * Gambar sementara pakai link Wikimedia Commons (ganti dengan foto asli nanti).
 */
export interface Paket {
  id: string
  jenis: 'umrah' | 'haji'
  nama: string
  harga: number
  hargaQuad?: number // harga per pax kamar Quad (4 orang)
  hargaTriple?: number // harga per pax kamar Triple (3 orang)
  hargaDouble?: number // harga per pax kamar Double (2 orang)
  dpPerPax?: number // uang muka per pax (mis. 15.000.000)
  durasi: string // contoh: "9 Hari"
  jadwal: string // contoh: "Desember 2026"
  maskapai: string
  hotel: string // contoh: "Makkah: Hilton • Madinah: Anwar"
  bandara?: string // bandara keberangkatan (mis. "Soekarno-Hatta")
  fasilitas: string[]
  persyaratan: string[]
  gambar: string // URL / path gambar utama kartu
}

export const PAKET_UMRAH: Paket[] = [
  {
    id: 'umrah-hemat',
    jenis: 'umrah',
    nama: 'Paket Umrah Hemat',
    harga: 32500000,
    durasi: '9 Hari',
    jadwal: 'November 2026',
    maskapai: 'Lion Air',
    hotel: 'Makkah: 500m Haram • Madinah: 400m Nabawi',
    fasilitas: [
      'Tiket pesawat PP',
      'Visa umrah',
      'Hotel bintang 4',
      'Konsumsi 3x sehari',
      'Transportasi bus AC',
      'Manasik & bimbingan ibadah',
    ],
    persyaratan: [
      'Paspor aktif min. 8 bulan',
      'Pas foto 4x6 (12 lembar)',
      'Kartu kuning vaksin meningitis',
      'Saldo bukti 3000 SAR',
    ],
    gambar:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Kaaba%2C_Makkah3.jpg/960px-Kaaba%2C_Makkah3.jpg',
  },
  {
    id: 'umrah-reguler',
    jenis: 'umrah',
    nama: 'Paket Umrah Reguler',
    harga: 38500000,
    durasi: '12 Hari',
    jadwal: 'Desember 2026',
    maskapai: 'Garuda Indonesia',
    hotel: 'Makkah: 300m Haram • Madinah: 250m Nabawi',
    fasilitas: [
      'Tiket pesawat PP',
      'Visa umrah',
      'Hotel bintang 5',
      'Konsumsi 3x sehari',
      'Transportasi bus AC',
      'Manasik & bimbingan ibadah',
      'Perlengkapan ihram',
    ],
    persyaratan: [
      'Paspor aktif min. 8 bulan',
      'Pas foto 4x6 (12 lembar)',
      'Kartu kuning vaksin meningitis',
      'Saldo bukti 3000 SAR',
    ],
    gambar:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Supplicating_Pilgrim_at_Masjid_Al_Haram._Mecca%2C_Saudi_Arabia.jpg/960px-Supplicating_Pilgrim_at_Masjid_Al_Haram._Mecca%2C_Saudi_Arabia.jpg',
  },
  {
    id: 'umrah-premium',
    jenis: 'umrah',
    nama: 'Paket Umrah Premium',
    harga: 45500000,
    durasi: '15 Hari',
    jadwal: 'Januari 2027',
    maskapai: 'Garuda Indonesia / Saudia',
    hotel: 'Makkah: 100m Haram (view Ka\u2019bah) • Madinah: 150m Nabawi',
    fasilitas: [
      'Tiket pesawat PP',
      'Visa umrah',
      'Hotel bintang 5 dekat Haram',
      'Konsumsi 3x sehari (prasmanan)',
      'Ziarah lengkap Makkah & Madinah',
      'Pembimbing berpengalaman',
      'Perlengkapan ihram premium',
    ],
    persyaratan: [
      'Paspor aktif min. 8 bulan',
      'Pas foto 4x6 (12 lembar)',
      'Kartu kuning vaksin meningitis',
      'Saldo bukti 3000 SAR',
    ],
    gambar:
      'https://upload.wikimedia.org/wikipedia/commons/1/10/Kaaba_at_night.jpg',
  },
]

export const PAKET_HAJI: Paket[] = [
  {
    id: 'haji-reguler',
    jenis: 'haji',
    nama: 'Haji Reguler',
    harga: 0, // mengikuti kuota & kebijakan Kemenag
    durasi: '40 Hari',
    jadwal: 'Menunggu Kuota',
    maskapai: 'Sesuai ketentuan Kemenag',
    hotel: 'Makkah & Madinah sesuai ketentuan',
    fasilitas: [
      'Pendaftaran & bimbingan haji',
      'Manasik haji',
      'Pembimbingan selama ibadah',
      'Konsumsi & transportasi',
    ],
    persyaratan: [
      'Warga negara Indonesia',
      'Paspor aktif min. 8 bulan',
      'Kartu kuning vaksin meningitis',
      'Kesehatan jasmani & rohani',
    ],
    gambar:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/The_Kaaba_during_Hajj_-_edited.jpg/960px-The_Kaaba_during_Hajj_-_edited.jpg',
  },
  {
    id: 'haji-plus',
    jenis: 'haji',
    nama: 'Haji Plus (Khusus)',
    harga: 0, // hubungi admin
    durasi: '30 Hari',
    jadwal: 'Menunggu Kuota',
    maskapai: 'Garuda Indonesia',
    hotel: 'Dekat Masjidil Haram & Nabawi',
    fasilitas: [
      'Pendaftaran & bimbingan haji',
      'Manasik haji',
      'Hotel dekat Haram',
      'Pembimbingan selama ibadah',
    ],
    persyaratan: [
      'Warga negara Indonesia',
      'Paspor aktif min. 8 bulan',
      'Kartu kuning vaksin meningitis',
      'Kesehatan jasmani & rohani',
    ],
    gambar:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Al-Masjid_an_Nabawi.jpg/960px-Al-Masjid_an_Nabawi.jpg',
  },
]
