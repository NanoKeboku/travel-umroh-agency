/**
 * Utilitas format — angka, mata uang, link WhatsApp
 */
import { KONTAK } from '../data/kontak'

/** Format angka Rupiah: 25000000 -> Rp25.000.000 */
export function formatRupiah(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

/** Buat link WhatsApp (wa.me) dengan pesan awal — nomor dari src/data/kontak.ts */
export function waLink(message: string): string {
  return `https://wa.me/${KONTAK.whatsapp}?text=${encodeURIComponent(message)}`
}
