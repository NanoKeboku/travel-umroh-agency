/**
 * Footer — multi-kolom + bottom bar
 * Status: KERANGKA — siap diisi (profil, link, kontak, sosmed, copyright)
 */
function Footer() {
  return (
    <footer className="bg-brand-800 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        {/* Kolom 1: Profil */}
        <div>
          <h3 className="text-lg font-semibold">Ebitour</h3>
          <p className="mt-2 text-sm text-brand-200">
            Travel Umrah Purworejo — kerangka kolom profil.
          </p>
        </div>

        {/* Kolom 2: Tautan */}
        <div>
          <h3 className="text-lg font-semibold">Tautan</h3>
          <p className="mt-2 text-sm text-brand-200">
            Kerangka kolom tautan (halaman & link penting).
          </p>
        </div>

        {/* Kolom 3: Kontak */}
        <div>
          <h3 className="text-lg font-semibold">Kontak</h3>
          <p className="mt-2 text-sm text-brand-200">
            Kerangka kolom kontak (WhatsApp, telepon, alamat, sosmed).
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-4 text-center text-xs text-brand-200">
        © {new Date().getFullYear()} Travel Umrah Ebitour Purworejo
      </div>
    </footer>
  )
}

export default Footer
