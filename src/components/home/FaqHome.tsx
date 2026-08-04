/**
 * FaqHome — section FAQ (accordion dropdown) di bagian bawah Beranda
 * Knowledge base dari src/data/faq.ts (dipakai juga oleh chatbot).
 */
import AccordionSection from '../ui/Accordion'
import SectionHeading from '../ui/SectionHeading'
import { FAQ } from '../../data/faq'

function FaqHome() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        title="Pertanyaan yang Sering Diajukan"
        description="Jawaban singkat untuk hal yang paling sering ditanyakan calon jamaah. Masih bingung? Tanya lewat tombol chat di kanan bawah."
      />
      <div className="mt-10 space-y-3">
        {FAQ.map((f) => (
          <AccordionSection key={f.id} title={f.pertanyaan}>
            <p className="text-sm leading-relaxed text-gray-600">{f.jawaban}</p>
          </AccordionSection>
        ))}
      </div>
    </section>
  )
}

export default FaqHome
