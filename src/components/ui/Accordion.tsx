/**
 * AccordionSection — section yang bisa dibuka/tutup
 * Dipakai di halaman detail paket (Fasilitas, Persyaratan, Itinerary,
 * Penerbangan, Syarat & Ketentuan) — lihat FITUR-PENCARIAN-TIKET.md 3c.
 */
import { useState } from 'react'
import type { ReactNode } from 'react'
import Icon from './Icon'

interface AccordionSectionProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

function AccordionSection({ title, children, defaultOpen = false }: AccordionSectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section className="overflow-hidden rounded-2xl bg-white shadow-soft">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-gray-50"
      >
        <h2 className="text-lg font-bold text-brand-900">{title}</h2>
        <Icon
          name="chevronDown"
          className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      {open && <div className="border-t border-gray-100 px-6 py-5">{children}</div>}
    </section>
  )
}

export default AccordionSection
