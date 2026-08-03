/**
 * PaketCardSkeleton — placeholder saat data API sedang dimuat
 * (skeleton loading: bentuk menyerupai kartu, animasi pulse).
 */
function PaketCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-gray-100">
      <div className="aspect-[16/10] bg-gray-200" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-2/3 rounded bg-gray-200" />
        <div className="h-3 w-1/2 rounded bg-gray-100" />
        <div className="h-3 w-3/4 rounded bg-gray-100" />
        <div className="h-7 w-1/3 rounded bg-brand-100" />
      </div>
    </div>
  )
}

export default PaketCardSkeleton
