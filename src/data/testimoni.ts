/**
 * Data testimoni jamaah
 * CATATAN: data di bawah ini PLACEHOLDER (contoh) — ganti dengan testimoni asli Ebitour.
 */
export interface Testimoni {
  id: string
  nama: string
  asal: string // contoh: "Purworejo"
  paket?: string // contoh: "Umrah Reguler 2025"
  rating: number // 1-5
  isi: string
}

export const TESTIMONI: Testimoni[] = [
  {
    id: 't1',
    nama: 'H. Ahmad Fauzi',
    asal: 'Purworejo',
    paket: 'Umrah Reguler 2025',
    rating: 5,
    isi: 'Alhamdulillah, pelayanan Ebitour sangat memuaskan. Pembimbingnya sabar dan fasilitasnya sesuai janji. Insya Allah tahun depan mau berangkat lagi.',
  },
  {
    id: 't2',
    nama: 'Hj. Siti Maryam',
    asal: 'Kutoarjo',
    paket: 'Umrah Hemat 2025',
    rating: 5,
    isi: 'Semua urusan visa dan tiket diurus dengan rapi. Kami tinggal fokus ibadah. Terima kasih Ebitour, perjalanan ibadah kami lancar.',
  },
  {
    id: 't3',
    nama: 'Bpk. Joko Santoso',
    asal: 'Purworejo',
    paket: 'Umrah Premium 2024',
    rating: 5,
    isi: 'Hotel dekat Masjidil Haram, jadi bisa shalat berjamaah di Haram setiap waktu. Manasik sebelum berangkat juga sangat membantu.',
  },
  {
    id: 't4',
    nama: 'Ibu Nur Kholifah',
    asal: 'Banyuurip',
    paket: 'Umrah Reguler 2025',
    rating: 4,
    isi: 'Komunikasi adminnya cepat dan ramah. Semua pertanyaan saya dijawab dengan jelas. Semoga Ebitour semakin sukses.',
  },
  {
    id: 't5',
    nama: 'H. Abdul Rochim',
    asal: 'Purworejo',
    paket: 'Umrah Hemat 2024',
    rating: 5,
    isi: 'Harga sesuai kualitas. Pembimbing haji/umrahnya sangat berpengalaman dan selalu mendampingi kami di setiap rukun umrah.',
  },
]
