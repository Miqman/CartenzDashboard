import { getLocale } from "next-intl/server";
import { KarirListClient } from "@/components/karir/KarirList.client";
import { karirData, getKlasifikasiList } from "@/data/karirData";
import { Briefcase } from "lucide-react";

export default async function KarirPage() {
  const locale = await getLocale();
  const hasKarir = karirData.length > 0;
  const klasifikasiList = getKlasifikasiList();

  return (
    <div className="bg-background text-foreground">
      <section className="px-4 mt-[72px] pb-16 md:px-16 lg:px-24 xl:px-32">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-normal text-[#6B7280]">Karir</p>
          <h1 className="mt-2 text-2xl font-bold uppercase tracking-tight text-[#1E1E1E] md:text-4xl">
            Berkarya untuk Indonesia
          </h1>

          <div className="mt-8">
            {hasKarir ? (
              <KarirListClient
                jobs={karirData}
                klasifikasiList={klasifikasiList}
                locale={locale}
              />
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] py-16 px-6 text-center">
                <Briefcase className="h-14 w-14 text-[#9CA3AF]" aria-hidden />
                <h2 className="mt-4 text-lg font-semibold text-[#1E1E1E]">
                  Belum ada lowongan
                </h2>
                <p className="mt-2 max-w-sm text-sm text-[#6B7280]">
                  Saat ini tidak ada posisi yang terbuka. Nantikan lowongan terbaru atau hubungi kami untuk informasi lebih lanjut.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
