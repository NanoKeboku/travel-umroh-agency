/**
 * Data galeri foto & video
 * Status: KERANGKA — GANTI isi array dengan galeri asli
 */
export interface GaleriItem {
  id: string
  tipe: 'foto' | 'video'
  judul: string
  url: string // path gambar di /images/galeri/ atau /images/dokumentasi/ ; untuk video bisa link YouTube
  kategori: string // contoh: "Keberangkatan", "Manasik", "Makkah", "Madinah"
  tanggal?: string
}

export const GALERI: GaleriItem[] = [
  // {
  //   id: 'g1',
  //   tipe: 'foto',
  //   judul: 'Keberangkatan Jamaah Gelombang 1',
  //   url: '/images/galeri/keberangkatan-1.jpg',
  //   kategori: 'Keberangkatan',
  // },
]
