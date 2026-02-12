import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { GalleryCarousel } from "@/components/home/GalleryCarousel";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function VideoIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  );
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default async function HomePage() {
  const t = await getTranslations("home");
  const locale = await getLocale();

  const aboutParagraph =
    "Cartenz adalah Perusahaan Teknologi Nasionalis yang membantu para pemimpin daerah dalam membangun pemerintahan yang mampu mencapai tujuan melayani masyarakat secara optimal melalui semua instrumen pemerintahan, termasuk anggaran daerah (yang harus substansial), sumber daya manusia (yang harus berkualitas tinggi), dan sistem pendukung (yang harus unggul). Tujuannya adalah untuk mencapai tujuan ini secara efisien dalam hal biaya, waktu, dan sumber daya.";

  const stats = [
    { value: "500+", label: "Proyek Pemerintah Daerah" },
    { value: "50+", label: "Produk" },
    { value: "50+", label: "IT Partner di Indonesia" },
    { value: "300.000+", label: "Pengguna Public" },
    { value: "2.500.000+", label: "Layanan Tersubmit" },
    { value: "175+", label: "Klien" },
  ] as const;

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Hero section: mobile full screen, konten tidak tertutup navbar */}
      <section className="relative min-h-[100dvh] min-h-[100vh] overflow-x-hidden bg-[#1E1E1E] pt-[72px] md:min-h-[50vh] md:pt-0">
        <Image
          src="/assets/bgHalfHero.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <HeroCarousel locale={locale} />
      </section>

      {/* Tentang Kami section (bawah) - dua kolom seperti gambar */}
      <section className="bg-background px-6 py-12 lg:px-12 lg:py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Kolom kiri: judul, tombol, avatars */}
          <div className="flex flex-col justify-between">
            <div>
              <p
                className="text-[16px] font-normal leading-[100%] tracking-[0%] text-[#6B7280]"
                style={{
                  fontFamily:
                    "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
                }}
              >
                Tentang Kami
              </p>
              <h2
                className="mt-2 text-[32px] font-normal uppercase leading-[100%] tracking-[0%] md:text-[40px]"
                style={{
                  fontFamily:
                    "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
                }}
              >
                <span className="text-[#1E1E1E]">WE ARE </span>
                <span className="text-[#408FB4]">CARTENZ</span>
              </h2>
              <Link
                href={`/${locale}/tentang-kami`}
                className="mt-4 inline-flex w-max items-center gap-2 rounded-full border border-[#408FB4] bg-white px-4 py-2.5 text-[#408FB4] transition hover:bg-[#408FB4]/5"
                style={{
                  fontFamily:
                    "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
                  fontSize: "16px",
                }}
              >
                Tentang Kami
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="size-10 rounded-full border-2 border-white bg-[#408FB4]/20 shadow-sm"
                  />
                ))}
              </div>
              <span
                className="text-[16px] font-normal text-[#6B7280]"
                style={{
                  fontFamily:
                    "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
                }}
              >
                150+ karyawan
              </span>
            </div>
          </div>

          {/* Kolom kanan: paragraf + grid statistik 3 kolom */}
          <div className="flex flex-col">
            <p
              className="text-[16px] font-normal leading-[24px] tracking-[0%] text-[#374151]"
              style={{
                fontFamily:
                  "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
              }}
            >
              {aboutParagraph}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <p
                    className="text-[24px] font-black leading-[100%] tracking-[0%] text-[#1E1E1E]"
                    style={{
                      fontFamily:
                        "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
                    }}
                  >
                    {value}
                  </p>
                  <p
                    className="mt-1 text-[14px] font-normal leading-snug text-[#6B7280]"
                    style={{
                      fontFamily:
                        "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
                    }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Produk Section */}
      <section
        id="produk"
        className="scroll-mt-20 bg-background px-4 py-16 md:px-16 lg:px-24 xl:px-32"
      >
        <div className="mx-auto max-w-6xl">
          <p
            className="text-[16px] font-normal text-[#6B7280]"
            style={{
              fontFamily:
                "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
            }}
          >
            {t("produkSection.badge")}
          </p>
          <h2
            className="mt-2 text-2xl font-normal uppercase leading-tight text-[#1E1E1E] md:text-3xl"
            style={{
              fontFamily:
                "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
            }}
          >
            {t("produkSection.title")}
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {([1, 2, 3, 4, 5, 6] as const).map((i) => (
              <Link
                key={i}
                href={`/${locale}/produk`}
                className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-zinc-800 dark:shadow-none"
              >
                <div className="relative aspect-[4/3] w-full bg-[#408FB4]/10">
                  <Image
                    src="/assets/produk1.png"
                    alt=""
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="flex items-start justify-between gap-3 p-4">
                  <div className="min-w-0 flex-1">
                    <p
                      className="font-semibold text-[#1E1E1E]"
                      style={{
                        fontFamily:
                          "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
                        fontSize: "15px",
                      }}
                    >
                      {t(`produkSection.product${i}Title`)}
                    </p>
                    <p
                      className="mt-1 text-[14px] font-normal text-[#6B7280]"
                      style={{
                        fontFamily:
                          "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
                      }}
                    >
                      {t(`produkSection.product${i}Category`)}
                    </p>
                  </div>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-[#408FB4] text-[#408FB4] transition group-hover:bg-[#408FB4] group-hover:text-white">
                    <ArrowUpRightIcon className="size-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href={`/${locale}/produk`}
              className="inline-flex items-center gap-2 rounded-full border border-[#408FB4] bg-white px-6 py-3 text-[#408FB4] transition hover:bg-[#408FB4]/5"
              style={{
                fontFamily:
                  "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
                fontSize: "16px",
              }}
            >
              {t("produkSection.viewMore")}
              <ChevronRightIcon className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Klien Section: height 592px area, padding-bottom 64px, bg image 10% opacity + gradient overlay */}
      <section className="relative min-h-[592px] px-4 pb-16 pt-16 md:px-16 lg:px-24 xl:px-32">
        {/* Background: jangan pakai -z-10 agar tidak tertutup parent; layer di z-0, konten di atas */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <Image
            src="/assets/bgKlien.jpg"
            alt=""
            fill
            className="object-cover object-center opacity-[0.25]"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(25.73deg, rgba(255, 255, 255, 0) 6.04%, rgba(255, 255, 255, 0.92) 60.39%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8">
          <div>
            <p
              className="text-sm font-normal text-[#6B7280]"
              style={{
                fontFamily:
                  "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
              }}
            >
              Klien
            </p>
            <h2
              className="mt-1 text-2xl font-normal uppercase leading-tight text-[#1E1E1E] md:text-3xl"
              style={{
                fontFamily:
                  "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
              }}
            >
              PEMDA DAN KEMENTERIAN
            </h2>
          </div>

          {/* Logo grid - gap 32px */}
          <div className="grid grid-cols-2 gap-8 gap-x-10 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
            {[
              { key: "dkiJakarta", label: "DKI Jakarta" },
              { key: "kabKlungkung", label: "Kab. Klungkung" },
              { key: "kabBadung", label: "Kab. Badung" },
              { key: "kabBantul", label: "Kab. Bantul" },
              { key: "kotaDenpasar", label: "Kota Denpasar" },
              { key: "kotaBogor", label: "Kota Bogor" },
              { key: "kabBandung", label: "Kab. Bandung" },
              { key: "kabAcehTamiang", label: "Kab. Aceh Tamiang" },
              { key: "kabBogor", label: "Kab. Bogor" },
              { key: "kotaBanjarmasin", label: "Kota Banjarmasin" },
            ].map((client) => (
              <div
                key={client.key}
                className="flex flex-col items-center gap-3 text-center"
              >
                <div className="relative h-16 w-16 md:h-20 md:w-20">
                  <Image
                    src={`/assets/${client.key}.png`}
                    alt={client.label}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </div>
                <p
                  className="text-sm font-normal text-[#1E1E1E]"
                  style={{
                    fontFamily:
                      "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
                  }}
                >
                  {client.label}
                </p>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div className="text-center">
              <p className="text-2xl font-semibold text-[#408FB4]">150+</p>
              <p className="mt-1 text-xs font-normal text-[#6B7280]">
                Kota / Kabupaten
              </p>
            </div>
            <span className="hidden h-8 w-px bg-[#E5E7EB] md:inline-block" />
            <div className="text-center">
              <p className="text-2xl font-semibold text-[#408FB4]">18+</p>
              <p className="mt-1 text-xs font-normal text-[#6B7280]">
                Provinsi
              </p>
            </div>
            <span className="hidden h-8 w-px bg-[#E5E7EB] md:inline-block" />
            <div className="text-center">
              <p className="text-2xl font-semibold text-[#408FB4]">10+</p>
              <p className="mt-1 text-xs font-normal text-[#6B7280]">
                Kementerian
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Galeri Section: bgHalfHero 20%, height 620px, padding 64px */}
      <section className="relative min-h-[620px] px-4 py-16 md:px-16 lg:px-24 xl:px-32">
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <Image
            src="/assets/bgHalfHero.jpg"
            alt=""
            fill
            className="object-cover object-center opacity-20"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl">
          <GalleryCarousel />
        </div>
      </section>

      {/* Artikel Section */}
      <section className="bg-background px-4 py-16 md:px-16 lg:px-24 xl:px-32">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-normal text-[#6B7280]">Artikel</p>
          <h2 className="mt-1 text-2xl font-normal uppercase leading-tight text-[#1E1E1E] md:text-3xl">
            INFORMASI DAN INSPIRASI
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                image: "/assets/artikel1.png",
                category: "Pajak Daerah",
                title: "Mengenal Apa Itu Pajak Daerah",
              },
              {
                image: "/assets/artikel2.png",
                category: "Kisah Sukses",
                title:
                  "Kabupaten Bandung Raih 3 Penghargaan Top Digital Awards ...",
              },
              {
                image: "/assets/artikel3.png",
                category: "Teknologi",
                title: "Digitalisasi Layanan Pemerintah Daerah",
              },
              {
                image: "/assets/artikel4.png",
                category: "Kisah Sukses",
                title:
                  "Digitalisasi Permudah Akses Informasi Bagi Warga Denpasar",
              },
            ].map((artikel, i) => (
              <Link
                key={i}
                href={`/${locale}/artikel`}
                className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-zinc-800 dark:shadow-none"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-xl">
                  <Image
                    src={artikel.image}
                    alt=""
                    fill
                    className="object-cover object-center transition group-hover:opacity-95"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="flex flex-col gap-1 p-4">
                  <p className="text-xs font-normal text-[#6B7280]">
                    {artikel.category}
                  </p>
                  <h3 className="line-clamp-2 text-base font-semibold text-[#1E1E1E] dark:text-foreground">
                    {artikel.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href={`/${locale}/artikel`}
              className="inline-flex items-center gap-2 rounded-full border border-[#408FB4] bg-white px-6 py-3 text-base text-[#408FB4] transition hover:bg-[#408FB4]/5 dark:border-[#408FB4] dark:bg-transparent dark:hover:bg-[#408FB4]/10"
            >
              Artikel Lainnya
              <ChevronRightIcon className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
