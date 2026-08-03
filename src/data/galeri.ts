/**
 * Data dokumentasi & galeri foto
 * CATATAN: URL gambar sementara dari Wikimedia Commons — ganti dengan foto asli Ebitour.
 * Foto-foto ini dipakai di Beranda (GaleriPreview) dan halaman Dokumentasi.
 */
export interface GaleriItem {
  id: string
  tipe: 'foto' | 'video'
  judul: string
  url: string // path gambar / URL; untuk video bisa link YouTube
  kategori: string // contoh: "Keberangkatan", "Manasik", "Makkah", "Madinah"
  tanggal?: string
  deskripsi?: string
}

export const GALERI: GaleriItem[] = [
  {
    id: 'g1',
    tipe: 'foto',
    judul: 'Jamaah Mengelilingi Ka’bah',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/The_Kaaba_during_Hajj_-_edited.jpg/960px-The_Kaaba_during_Hajj_-_edited.jpg',
    kategori: 'Keberangkatan',
    tanggal: '2025-11-10',
    deskripsi:
      'Momen thawaf jamaah Ebitour mengelilingi Ka’bah di Masjidil Haram — puncak rangkaian ibadah umrah yang dinanti.',
  },
  {
    id: 'g2',
    tipe: 'foto',
    judul: 'Maqam Ibrahim, Makkah',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Maqam_Ibrahim%2C_Makkah.jpg/960px-Maqam_Ibrahim%2C_Makkah.jpg',
    kategori: 'Manasik',
    tanggal: '2025-10-20',
    deskripsi:
      'Saat manasik, jamaah dikenalkan pada tempat-tempat bersejarah di sekitar Masjidil Haram, termasuk Maqam Ibrahim.',
  },
  {
    id: 'g3',
    tipe: 'foto',
    judul: 'Suasana Masjidil Haram',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Kaaba%2C_Makkah3.jpg/960px-Kaaba%2C_Makkah3.jpg',
    kategori: 'Makkah',
    tanggal: '2025-11-14',
    deskripsi:
      'Suasana Masjidil Haram yang khusyuk. Jamaah bebas beribadah dan memperbanyak doa selama di Makkah.',
  },
  {
    id: 'g4',
    tipe: 'foto',
    judul: 'Masjid Nabawi, Madinah',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Masjid_Nabawi_The_Prophet%27s_Mosque%2C_Madina.jpg/960px-Masjid_Nabawi_The_Prophet%27s_Mosque%2C_Madina.jpg',
    kategori: 'Madinah',
    tanggal: '2025-11-18',
    deskripsi:
      'Ibadah di Masjid Nabawi dan ziarah ke Raudhah — rangkaian wajib bagi jamaah saat berada di Madinah.',
  },
  {
    id: 'g5',
    tipe: 'foto',
    judul: 'Pilgrim Berdoa di Masjidil Haram',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Supplicating_Pilgrim_at_Masjid_Al_Haram._Mecca%2C_Saudi_Arabia.jpg/960px-Supplicating_Pilgrim_at_Masjid_Al_Haram._Mecca%2C_Saudi_Arabia.jpg',
    kategori: 'Makkah',
    tanggal: '2025-11-15',
    deskripsi:
      'Seorang jamaah berdoa khusyuk di pelataran Masjidil Haram — momen haru yang banyak dirasakan para tamu Allah.',
  },
  {
    id: 'g6',
    tipe: 'foto',
    judul: 'Kubah Hijau Masjid Nabawi',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Al-Masjid_an_Nabawi.jpg/960px-Al-Masjid_an_Nabawi.jpg',
    kategori: 'Madinah',
    tanggal: '2025-11-19',
    deskripsi:
      'Pemandangan Masjid Nabawi dengan kubah hijau yang ikonik — tempat berziarah ke makam Rasulullah ﷺ.',
  },
  {
    id: 'g7',
    tipe: 'foto',
    judul: 'Ka’bah di Malam Hari',
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Kaaba_at_night.jpg',
    kategori: 'Keberangkatan',
    tanggal: '2025-11-16',
    deskripsi:
      'Keindahan Ka’bah di malam hari — momen yang selalu menjadi kenangan terindah para jamaah Ebitour.',
  },
]
