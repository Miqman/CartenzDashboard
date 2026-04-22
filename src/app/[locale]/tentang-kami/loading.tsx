export default function TentangKamiLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="px-4 mt-[72px] py-12 md:px-16 md:pt-[80px] lg:px-24 xl:px-32">
        <div className="mx-auto max-w-6xl">
          <div className="h-8 w-56 animate-pulse rounded bg-slate-200" />
          <div className="mt-4 h-4 w-full animate-pulse rounded bg-slate-200" />
          <div className="mt-2 h-4 w-11/12 animate-pulse rounded bg-slate-200" />
        </div>
      </section>

      <section className="px-4 py-16 md:px-16 lg:px-24 xl:px-32">
        <div className="mx-auto max-w-6xl">
          <div className="h-5 w-24 animate-pulse rounded bg-slate-200" />
          <div className="mt-3 h-10 w-80 animate-pulse rounded bg-slate-200" />

          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col overflow-hidden rounded-lg">
                <div className="aspect-4/3 w-full animate-pulse rounded bg-slate-200" />
                <div className="mt-3">
                  <div className="h-5 w-32 animate-pulse rounded bg-slate-200" />
                  <div className="mt-2 h-4 w-24 animate-pulse rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
