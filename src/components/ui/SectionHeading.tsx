/**
 * SectionHeading — judul section konsisten (eyebrow + title + deskripsi)
 * Status: KERANGKA — siap diisi (alignment, variant, dll.)
 */
interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
}

function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-3xl font-bold text-brand-900">{title}</h2>
      {description && (
        <p className="mt-3 text-gray-500">{description}</p>
      )}
    </div>
  )
}

export default SectionHeading
