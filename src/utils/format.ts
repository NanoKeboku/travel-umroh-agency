/**
 * Utilitas format — angka, mata uang, link WhatsApp
 * Status: KERANGKA — sudah berfungsi dasar, siap ditambah
 */

/** Format angka Rupiah: 25000000 -> Rp25.000.000 */
export function formatRupiah(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Buat link WhatsApp (wa.me) dengan pesan awal.
 * Nomor diambil dari konstanta — GANTI sesuai nomor admin.
 */
export function waLink(message: string): string {
  // TODO: pindahkan nomor ke src/data/kontak.ts lalu gunakan dari sana
  const PHONE = '6280000000000' // GANTI: nomor WhatsApp admin
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`
}
