/**
 * SectionHeading — judul section konsisten (title + deskripsi)
 * Props:
 *  - title, description          : teks
 *  - variant="light" | "dark"    : untuk latar terang / gelap
 *  - align="center" | "left"     : perataan (default center)
 */
interface SectionHeadingProps {
  title: string
  description?: string
  variant?: 'light' | 'dark'
  align?: 'center' | 'left'
}

function SectionHeading({
  title,
  description,
  variant = 'light',
  align = 'center',
}: SectionHeadingProps) {
  const dark = variant === 'dark'
  const centered = align === 'center'
  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl text-left'}>
      <h2
        className={`text-3xl ${
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
