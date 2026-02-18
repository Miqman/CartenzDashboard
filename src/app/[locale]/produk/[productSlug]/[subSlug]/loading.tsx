export default function ProdukSubLoading() {
  return (
    <div className="min-h-screen bg-white pt-[72px] animate-pulse">
      <div className="h-16 w-full bg-[#F1F5F9]" />
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 lg:px-12">
        <div className="mb-8 h-8 w-48 rounded bg-[#E2E8F0]" />
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="h-[400px] w-full rounded-lg bg-[#F1F5F9] lg:w-[30%] lg:max-w-[320px]" />
          <div className="h-[500px] flex-1 rounded-xl bg-[#F1F5F9]" />
        </div>
      </div>
    </div>
  );
}
