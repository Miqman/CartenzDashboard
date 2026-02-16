import Link from "next/link";
import { getLocale } from "next-intl/server";
import { Clock, Briefcase, MapPin } from "lucide-react";
import { getKarirBySlug } from "@/data/karirData";
import { notFound } from "next/navigation";
import { ShareButtonClient } from "@/components/karir/ShareButton.client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function KarirDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const job = getKarirBySlug(slug);

  if (!job) notFound();

  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/${locale}/karir/${slug}` : "";
  const lokasiDisplay = `${job.lokasi} (${job.lokasiKerja})`;
  const roleDisplay = job.role ?? job.klasifikasi;

  const defaultTanggungJawab = ["Informasi tanggung jawab dapat ditanyakan saat proses lamaran."];
  const defaultKualifikasi = [job.pengalaman, "Kualifikasi lengkap dapat ditanyakan saat proses lamaran."];
  const defaultKeuntungan = ["Gaji kompetitif", "Benefit sesuai kebijakan perusahaan."];

  const tanggungJawab = job.tanggungJawab?.length ? job.tanggungJawab : defaultTanggungJawab;
  const kualifikasi = job.kualifikasi?.length ? job.kualifikasi : defaultKualifikasi;
  const keuntungan = job.keuntungan?.length ? job.keuntungan : defaultKeuntungan;

  return (
    <div className="bg-background text-foreground">
      <div className="px-4 mt-[72px] pb-12 md:px-16 lg:px-24 xl:px-32">

        <div className="mx-auto max-w-7xl">
            <div className="mb-4">
                <Link
                    href={`/${locale}/karir`}
                    className="text-sm font-medium text-[#6B7280] hover:text-[#408FB4]"
                >
                    ← Kembali ke Daftar Lowongan
                </Link>
            </div>


            <p className="text-sm text-[#6B7280]">
                <Link href={`/${locale}/karir`} className="hover:underline">Karir</Link>
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <h1 className="text-2xl font-normal uppercase tracking-tight md:text-4xl">
                {job.judul}
            </h1>
                <ShareButtonClient path={`/${locale}/karir/${slug}`} title={job.judul} />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#9CA3AF]" aria-hidden />
                {job.tipePekerjaan}
            </span>
            <span className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-[#9CA3AF]" aria-hidden />
                {roleDisplay}
            </span>
            <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#9CA3AF]" aria-hidden />
                {lokasiDisplay}
            </span>
            </div>

            <div className="mt-10 space-y-8">
            <section>
                <h2 className="text-lg font-bold">Tanggung Jawab</h2>
                <ul className="mt-2 list-inside list-disc space-y-1">
                {tanggungJawab.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
                </ul>
            </section>

            <section>
                <h2 className="text-lg font-bold">Kualifikasi</h2>
                <ul className="mt-2 list-inside list-disc space-y-1">
                {kualifikasi.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
                </ul>
            </section>

            <section>
                <h2 className="text-lg font-bold">Keuntungan</h2>
                <ul className="mt-2 list-inside list-disc space-y-1">
                {keuntungan.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
                </ul>
            </section>
            </div>

            <div className="mt-10 flex justify-end">
            <a
                href={`mailto:support@cartenz.co.id?subject=Lamar: ${encodeURIComponent(job.judul)}`}
                className="rounded-lg bg-[#408FB4] px-6 py-3 font-semibold text-white transition hover:bg-[#357a9a]"
            >
                Lamar Sekarang
            </a>
            </div>
        </div>
        
      </div>
    </div>
  );
}
