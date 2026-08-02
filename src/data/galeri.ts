/**
 * Data galeri foto & video
 * CATATAN: path gambar di bawah ini PLACEHOLDER — ganti dengan file asli
 * di public/images/galeri/ dan public/images/dokumentasi/.
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
  {
    id: 'g1',
    tipe: 'foto',
    judul: 'Keberangkatan Jamaah Gelombang 1',
    url: '/images/galeri/keberangkatan-1.jpg',
    kategori: 'Keberangkatan',
    tanggal: '2025-11-10',
  },
  {
    id: 'g2',
    tipe: 'foto',
    judul: 'Kegiatan Manasik di Purworejo',
    url: '/images/galeri/manasik-1.jpg',
    kategori: 'Manasik',
    tanggal: '2025-10-20',
  },
  {
    id: 'g3',
    tipe: 'foto',
    judul: 'Jamaah di Masjidil Haram',
    url: '/images/galeri/makkah-1.jpg',
    kategori: 'Makkah',
    tanggal: '2025-11-14',
  },
  {
    id: 'g4',
    tipe: 'foto',
    judul: 'Ziarah di Masjid Nabawi',
    url: '/images/galeri/madinah-1.jpg',
    kategori: 'Madinah',
    tanggal: '2025-11-18',
  },
  {
    id: 'g5',
    tipe: 'video',
    judul: 'Dokumentasi Keberangkatan 2025',
    url: 'https://www.youtube.com/watch?v=contoh',
    kategori: 'Keberangkatan',
    tanggal: '2025-11-10',
  },
]
