/**
 * Data artikel / blog
 * Status: KERANGKA — GANTI isi array dengan artikel asli
 */
export interface Artikel {
  id: string
  judul: string
  slug: string
  ringkasan: string
  kategori: string // contoh: "Tips Umrah", "Berita"
  tanggal: string // ISO: "2026-08-01"
  cover?: string // path gambar di /images/
  isi?: string // konten lengkap (untuk halaman detail)
}

export const ARTIKEL: Artikel[] = [
  // {
  //   id: 'a1',
  //   judul: 'Tips Mempersiapkan Ibadah Umrah Pertama',
  //   slug: 'tips-mempersiapkan-umrah-pertama',
  //   ringkasan: 'Panduan lengkap bagi calon jamaah yang baru pertama kali...',
  //   kategori: 'Tips Umrah',
  //   tanggal: '2026-08-01',
  // },
]
