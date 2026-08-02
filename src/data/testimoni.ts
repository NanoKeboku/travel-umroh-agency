/**
 * Data testimoni jamaah
 * Status: KERANGKA — GANTI isi array dengan testimoni asli
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
  // {
  //   id: 't1',
  //   nama: 'H. Ahmad',
  //   asal: 'Purworejo',
  //   paket: 'Umrah Reguler 2025',
  //   rating: 5,
  //   isi: 'Pelayanan sangat memuaskan, pembimbing sabar...',
  // },
]
