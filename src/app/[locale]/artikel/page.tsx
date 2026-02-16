import { getLocale } from "next-intl/server";
import { ArtikelListClient } from "@/components/artikel/ArtikelList.client";
import { articleData } from "@/data/articleData";
import { FileText } from "lucide-react";

export default async function ArtikelPage() {
  const locale = await getLocale();
  const hasArticles = articleData.length > 0;

  return (
    <div className="bg-background text-foreground">
      <section className="px-4 mt-[72px] py-12 md:px-16 md:pt-[80px] lg:px-24 xl:px-32">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-normal text-[#6B7280]">Artikel</p>
          <h1 className="mt-2 text-2xl font-normal uppercase tracking-tight md:text-4xl">
            Informasi dan Inspirasi
          </h1>

          <div className="mt-8">
            {hasArticles ? (
              <ArtikelListClient articles={articleData} locale={locale} />
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] py-16 px-6 text-center">
                <FileText className="h-14 w-14 text-[#9CA3AF]" aria-hidden />
                <h2 className="mt-4 text-lg font-semibold text-[#1E1E1E]">
                  Belum ada artikel
                </h2>
                <p className="mt-2 max-w-sm text-sm text-[#6B7280]">
                  Konten artikel akan ditampilkan di sini. Silakan kembali nanti atau hubungi kami untuk informasi lebih lanjut.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
