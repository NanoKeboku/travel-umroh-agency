/**
 * Data FAQ — pertanyaan yang sering diajukan
 * Status: KERANGKA — GANTI isi array dengan FAQ asli
 */
export interface FaqItem {
  id: string
  pertanyaan: string
  jawaban: string
  kategori?: string // contoh: "Pendaftaran", "Visa", "Pembayaran"
}

export const FAQ: FaqItem[] = [
  // {
  //   id: 'f1',
  //   pertanyaan: 'Bagaimana cara mendaftar paket umrah?',
  //   jawaban: 'Silakan hubungi admin via WhatsApp atau isi form pendaftaran...',
  //   kategori: 'Pendaftaran',
  // },
]
