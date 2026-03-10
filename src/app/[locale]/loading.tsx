export default function LocaleLoading() {
  return (
    <div className="min-h-screen bg-background px-4 py-8 md:px-8 lg:px-12">
      {/* Skeleton hero */}
      <section className="mb-10 rounded-2xl bg-[#F1F5F9] px-6 py-10 text-white md:py-14">
        <div className="mb-6 h-4 w-28 animate-pulse rounded-full bg-white/20" />
        <div className="mb-4 h-10 w-64 animate-pulse rounded bg-white/25 md:w-96" />
        <div className="mb-2 h-3 w-72 animate-pulse rounded bg-white/15 md:w-[28rem]" />
        <div className="mb-6 h-3 w-52 animate-pulse rounded bg-white/10 md:w-80" />
        <div className="h-10 w-40 animate-pulse rounded-full bg-white/20" />
      </section>

      {/* Skeleton produk cards */}
      <section className="mx-auto mb-10 max-w-6xl">
        <div className="mb-4 h-4 w-24 animate-pulse rounded bg-slate-200" />
        <div className="mb-6 h-6 w-64 animate-pulse rounded bg-slate-200" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className="overflow-hidden rounded-xl bg-white shadow-sm"
            >
              <div className="h-36 w-full animate-pulse bg-slate-200" />
              <div className="space-y-2 p-4">
                <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skeleton klien / galeri */}
      <section className="mx-auto max-w-6xl">
        <div className="mb-4 h-4 w-20 animate-pulse rounded bg-slate-200" />
        <div className="mb-6 h-6 w-64 animate-pulse rounded bg-slate-200" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className="flex h-16 items-center justify-center rounded-lg bg-white shadow-sm"
            >
              <div className="h-6 w-20 animate-pulse rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
