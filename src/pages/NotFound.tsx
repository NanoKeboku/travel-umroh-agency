/**
 * Halaman: 404 — Tidak Ditemukan
 * Route: * (fallback)
 * Status: KERANGKA — siap diisi konten
 */
function NotFound() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <h1 className="text-5xl text-brand-900">404</h1>
      <p className="mt-2 text-gray-500">
        Halaman yang Anda cari tidak ditemukan.
      </p>
    </section>
  )
}

export default NotFound
