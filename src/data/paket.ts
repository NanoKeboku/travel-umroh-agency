/**
 * Data paket umrah & haji
 * CATATAN: data di bawah ini PLACEHOLDER (contoh) — ganti dengan data asli Ebitour.
 */
export interface Paket {
  id: string
  jenis: 'umrah' | 'haji'
  nama: string
  harga: number
  durasi: string // contoh: "9 Hari"
  jadwal: string // contoh: "Desember 2026"
  maskapai: string
  hotel: string // contoh: "Makkah: Hilton • Madinah: Anwar"
  fasilitas: string[]
  persyaratan: string[]
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
  },
]
