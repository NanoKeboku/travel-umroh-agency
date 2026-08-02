/**
 * Data galeri foto & video
 * CATATAN: URL gambar sementara dari Wikimedia Commons — ganti dengan foto asli Ebitour.
 */
export interface GaleriItem {
  id: string
  tipe: 'foto' | 'video'
  judul: string
  url: string // path gambar / URL; untuk video bisa link YouTube
  kategori: string // contoh: "Keberangkatan", "Manasik", "Makkah", "Madinah"
  tanggal?: string
}

export const GALERI: GaleriItem[] = [
  {
    id: 'g1',
    tipe: 'foto',
    judul: 'Jamaah Mengelilingi Ka\u2019bah',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/The_Kaaba_during_Hajj_-_edited.jpg/960px-The_Kaaba_during_Hajj_-_edited.jpg',
    kategori: 'Keberangkatan',
    tanggal: '2025-11-10',
  },
  {
    id: 'g2',
    tipe: 'foto',
    judul: 'Maqam Ibrahim, Makkah',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Maqam_Ibrahim%2C_Makkah.jpg/960px-Maqam_Ibrahim%2C_Makkah.jpg',
    kategori: 'Manasik',
    tanggal: '2025-10-20',
  },
  {
    id: 'g3',
    tipe: 'foto',
    judul: 'Suasana Masjidil Haram',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Kaaba%2C_Makkah3.jpg/960px-Kaaba%2C_Makkah3.jpg',
    kategori: 'Makkah',
    tanggal: '2025-11-14',
  },
  {
    id: 'g4',
    tipe: 'foto',
    judul: 'Masjid Nabawi, Madinah',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Masjid_Nabawi_The_Prophet%27s_Mosque%2C_Madina.jpg/960px-Masjid_Nabawi_The_Prophet%27s_Mosque%2C_Madina.jpg',
    kategori: 'Madinah',
    tanggal: '2025-11-18',
  },
  {
    id: 'g5',
    tipe: 'foto',
    judul: 'Pilgrim Berdoa di Masjidil Haram',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Supplicating_Pilgrim_at_Masjid_Al_Haram._Mecca%2C_Saudi_Arabia.jpg/960px-Supplicating_Pilgrim_at_Masjid_Al_Haram._Mecca%2C_Saudi_Arabia.jpg',
    kategori: 'Makkah',
    tanggal: '2025-11-15',
  },
  {
    id: 'g6',
    tipe: 'video',
    judul: 'Dokumentasi Keberangkatan 2025',
    url: 'https://www.youtube.com/watch?v=contoh',
    kategori: 'Keberangkatan',
    tanggal: '2025-11-10',
  },
]
