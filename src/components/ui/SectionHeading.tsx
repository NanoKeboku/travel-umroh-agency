/**
 * SectionHeading — judul section konsisten (eyebrow + title + deskripsi)
 * Props:
 *  - eyebrow, title, description : teks
 *  - variant="light" | "dark"    : untuk latar terang / gelap
 */
interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  variant?: 'light' | 'dark'
}

function SectionHeading({
  eyebrow,
  title,
  description,
  variant = 'light',
}: SectionHeadingProps) {
  const dark = variant === 'dark'
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-2 font-display text-3xl ${
          dark ? 'text-white' : 'text-brand-900'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-3 ${dark ? 'text-white/70' : 'text-gray-500'}`}>
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionHeading
