/**
 * Data paket umrah & haji
 * Status: KERANGKA — GANTI isi array dengan data paket asli Ebitour
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
  // {
  //   id: 'umrah-1',
  //   jenis: 'umrah',
  //   nama: 'Paket Umrah Hemat',
  //   harga: 35000000,
  //   durasi: '9 Hari',
  //   jadwal: 'Desember 2026',
  //   maskapai: 'Garuda Indonesia',
  //   hotel: 'Makkah: Hilton • Madinah: Anwar',
  //   fasilitas: ['Visa', 'Tiket pesawat', 'Hotel bintang 4', 'Konsumsi 3x sehari'],
  //   persyaratan: ['Paspor aktif min. 8 bulan', 'Pas foto 4x6 (12 lembar)'],
  // },
]

export const PAKET_HAJI: Paket[] = [
  // contoh struktur sama seperti PAKET_UMRAH
]
