"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { getProductPageUrl } from "@/lib/productNavigation";
import { getFirstSubSlug } from "@/data/productDetailData";

export default function ProdukError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = useLocale();
  const fallbackHref = getProductPageUrl(
    locale,
    "solusi-pajak",
    getFirstSubSlug("solusi-pajak") ?? undefined
  );

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error("[ProdukError]", error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-white pt-[72px] flex flex-col items-center justify-center px-4 py-12">
      <h2 className="text-lg font-semibold text-[#1E1E1E]">
        Terjadi kesalahan
      </h2>
      <p className="mt-2 text-sm text-[#62748E] text-center max-w-md">
        Konten produk tidak dapat dimuat. Silakan coba lagi atau kembali ke
        halaman produk.
      </p>
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-(--color-cartenz-blue) px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          Coba lagi
        </button>
        <Link
          href={fallbackHref}
          className="rounded-lg border border-[#CAD5E2] px-4 py-2 text-sm font-medium text-[#1E1E1E] transition hover:bg-[#F1F5F9]"
        >
          Ke halaman produk
        </Link>
      </div>
    </div>
  );
}
