import Image from "next/image";
import Link from "next/link";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { getLocale } from "next-intl/server";
import {
  getHomepage,
  getProducts,
  getClients,
  getGallery,
  getArticles,
  getStrapiMediaUrl,
} from "@/lib/strapi";
import {
  GalleryCarouselWrapper,
  HeroCarouselWrapper,
} from "@/components/home/HomeCarousels.client";
import { KlienSectionClient } from "@/components/home/KlienSection.client";
import { toArticleSlug } from "@/data/articleData";

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

function SectionPlaceholder({
  className = "",
  lines = 3,
}: {
  className?: string;
  lines?: number;
}) {
  return (
    <div className={`animate-pulse rounded-xl bg-[#EEF2F7] p-4 ${className}`}>
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`h-3 rounded bg-[#DCE5EE] ${i === lines - 1 ? "w-2/3" : "w-full"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default async function HomePage() {
  const locale = await getLocale();

  const [homepageRes, productsRes, clientsRes, galleryRes, articlesResResult] =
    await Promise.allSettled([
      getHomepage({ throwOnError: true }),
      getProducts({ throwOnError: true }),
      getClients({ throwOnError: true }),
      getGallery({ throwOnError: true }),
      getArticles({ throwOnError: true }),
    ]);

  const homepage =
    homepageRes.status === "fulfilled" ? homepageRes.value : null;
  const products = productsRes.status === "fulfilled" ? productsRes.value : [];
  const clients = clientsRes.status === "fulfilled" ? clientsRes.value : [];
  const gallery = galleryRes.status === "fulfilled" ? galleryRes.value : [];
  const articlesRes =
    articlesResResult.status === "fulfilled"
      ? articlesResResult.value
      : { data: [] };

  const about = homepage?.about;
  const aboutStats = homepage?.aboutStats ?? [];
  const aboutBadge = about?.badge ?? "";
  const aboutTitle = about?.title ?? "";
  const aboutParagraph = about?.paragraph ?? "";
  const aboutCtaLabel = about?.ctaLabel ?? "";
  const aboutEmployeeCount = about?.employeeCount ?? "";

  const produkSection = homepage?.produkSection;
  const produkBadge = produkSection?.badge ?? "";
  const produkTitle = produkSection?.title ?? "";
  const produkViewMore = produkSection?.viewMoreLabel ?? "";

  const klienSection = homepage?.klienSection;
  const klienBadge = klienSection?.badge ?? "";
  const klienTitle = klienSection?.title ?? "";
  const klienStats = homepage?.klienStats ?? [];

  const galeriSection = homepage?.galeriSection;
  // console.log(galeriSection, "galeriSection");
  const galeriBadge = galeriSection?.badge ?? "";
  const galeriTitle = galeriSection?.title ?? "";

  const artikelSection = homepage?.artikelSection;
  const artikelBadge = artikelSection?.badge ?? "";
  const artikelTitle = artikelSection?.title ?? "";
  const artikelViewMore = artikelSection?.viewMoreLabel ?? "";

  const heroSlides = (homepage?.heroSlides ?? []).map((s) => ({
    title: s.title ?? "",
    solutions: Array.isArray(s.solutions) ? s.solutions : [],
    logoUrl: getStrapiMediaUrl(s.logo) || undefined,
    linkProdukHero: s.linkProdukHero ?? "",
  }));

  const productList = products.slice(0, 6).map((p) => ({
    title: p.title ?? "",
    category: p.category ?? "",
    imageUrl: getStrapiMediaUrl(p.image),
    urlProduk: p.urlProduk ?? "",
  }));

  const clientList =
    clients.length >= 1
      ? clients.map((c) => ({
          name: c.name ?? "",
          logoUrl: getStrapiMediaUrl(c.logo),
        }))
      : [];

  const testimoniList = homepage?.testimoniSection?.length
    ? homepage.testimoniSection.map((item) => ({
        text: item.text ?? "",
        name: item.name ?? "",
        status: item.posisi ?? "",
        imageUrl: getStrapiMediaUrl(item.foto),
      }))
    : [];
  // const testimoniList = [
  //   {
  //     text: "Hadirnya aplikasi Palapa adalah tonggak penting dalam transformasi digital di daerah kami. Melalui platform ini, kita meruntuhkan sekat-sekat birokrasi yang kaku dan menggantinya dengan sistem yang transparan, cepat, dan akuntabel.",
  //     name: "drs. H. Haerul Warisin, M.SI.",
  //     status: "Bupati Lombok Timur",
  //     imageUrl: "/assets/ulasanBupatiLombokTimur.png",
  //   },
  //   {
  //     text: "Hadirnya aplikasi Palapa adalah tonggak penting dalam transformasi digital di daerah kami. Melalui platform ini, kita meruntuhkan sekat-sekat birokrasi yang kaku dan menggantinya dengan sistem yang transparan, cepat, dan akuntabel.",
  //     name: "drs. H. Haerul Warisin, M.SI.",
  //     status: "Bupati Lombok Timur asdsa",
  //     imageUrl: "/assets/ulasanBupatiLombokTimur.png",
  //   },
  // ];

  // console.log(testimoniList, 'testimoniList')

  const galleryItems = gallery.map((g) => ({
    imageUrl: getStrapiMediaUrl(g.image),
    alt: g.caption ?? "",
    caption: g.caption,
    subtitle: g.subtitle,
  }));

  const articlesData = articlesRes?.data;
  const artikelList = Array.isArray(articlesData)
    ? articlesData.slice(0, 4).map((a) => {
        const raw = (a ?? {}) as Record<string, unknown>;
        const attrs = (raw?.attributes ?? raw) as Record<string, unknown>;
        const cover = (attrs?.cover ?? raw?.cover) as
          | { url?: string }
          | undefined;
        const url = cover?.url ?? "";
        const baseUrl =
          process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
        const imageUrl = url
          ? url.startsWith("http")
            ? url
            : `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`
          : "";
        const category = (attrs?.category ?? raw?.category) as
          | { name?: string }
          | undefined;
        return {
          imageUrl,
          category: category?.name ?? "",
          title: String(attrs?.title ?? raw?.title ?? ""),
          slug: String(attrs?.slug ?? raw?.slug ?? ""),
        };
      })
    : [];

  const avenirStyle = {
    fontFamily: "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
  };
  const showHeroPlaceholder = heroSlides.length === 0;
  const showAboutPlaceholder =
    !aboutBadge && !aboutTitle && !aboutParagraph && aboutStats.length === 0;
  const showProdukPlaceholder = productList.length === 0;
  const showKlienPlaceholder =
    !klienBadge &&
    !klienTitle &&
    clientList.length === 0 &&
    klienStats.length === 0 &&
    testimoniList.length === 0;
  const showGaleriPlaceholder = galleryItems.length === 0;
  const showArtikelPlaceholder = artikelList.length === 0;

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Hero section: mobile full screen, background full dari atas (di belakang navbar) sampai indikator swiper */}
      <section className="relative min-h-[100dvh] min-h-[100vh] overflow-x-hidden pt-8 pb-8 md:min-h-[50vh]">
        <Image
          src="/assets/bgHalfHero.jpg"
          alt=""
          fill
          className="object-cover object-center md:object-none min-w-full min-h-full"
          priority
          loading="eager"
          sizes="220vw"
        />
        {showHeroPlaceholder ? (
          <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-72px)] w-full max-w-6xl items-center px-6">
            <SectionPlaceholder className="h-[280px] w-full md:h-[340px]" lines={5} />
          </div>
        ) : (
          <HeroCarouselWrapper
            locale={locale}
            slides={heroSlides}
            ctaLabel={aboutCtaLabel}
          />
        )}
      </section>

      {/* Tentang Kami section (bawah) - dua kolom seperti gambar */}
      <section className="bg-background px-6 py-12 lg:px-12 lg:py-16">
        {showAboutPlaceholder ? (
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2">
            <SectionPlaceholder className="h-[220px]" lines={5} />
            <SectionPlaceholder className="h-[220px]" lines={6} />
          </div>
        ) : (
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Kolom kiri: judul, tombol, avatars */}
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-[16px] font-normal leading-[100%] tracking-[0%] text-[#6B7280]">
                  {aboutBadge}
                </p>
                <h2 className="mt-2 text-[32px] font-normal uppercase leading-[100%] tracking-[0%] md:text-[40px]">
                  <span className="text-[#1E1E1E]">
                    {aboutTitle.includes("CARTENZ")
                      ? aboutTitle.replace("CARTENZ", "").trimEnd() + " "
                      : ""}
                  </span>
                  <span className="text-[#408FB4]">
                    {aboutTitle.includes("CARTENZ") ? "CARTENZ" : aboutTitle}
                  </span>
                </h2>
                <Link
                  href={`/${locale}/tentang-kami`}
                  className="mt-4 inline-flex w-max items-center gap-2 rounded-full border border-[#408FB4] bg-white px-4 py-2.5 text-[#408FB4] transition hover:bg-[#408FB4]/5"
                  style={{ ...avenirStyle, fontSize: "16px" }}
                >
                  {aboutCtaLabel}
                  <ArrowRightIcon className="size-4" />
                </Link>
              </div>
              {aboutEmployeeCount ? (
                <span
                  className="mt-6 text-[16px] font-normal text-[#6B7280]"
                  style={avenirStyle}
                >
                  {aboutEmployeeCount}
                </span>
              ) : null}
            </div>

            {/* Kolom kanan: paragraf + grid statistik 3 kolom */}
            <div className="flex flex-col">
              <p className="text-[16px] font-normal leading-[24px] tracking-[0%] text-[#374151]">
                {aboutParagraph}
              </p>
              <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
                {aboutStats.map((stat, idx) => (
                  <div key={stat.label ? `${stat.label}-${idx}` : `stat-${idx}`}>
                    <p className="text-[24px] font-black leading-[100%] tracking-[0%] text-[#1E1E1E]">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[14px] font-normal leading-snug text-[#6B7280]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Produk Section */}
      <section
        id="produk"
        className="scroll-mt-20 bg-background px-4 py-16 md:px-16 lg:px-24 xl:px-32"
      >
        <div className="mx-auto max-w-6xl">
          <p
            className="text-[16px] font-normal text-[#6B7280]"
            style={avenirStyle}
          >
            {produkBadge}
          </p>
          <h2
            className="mt-2 text-2xl font-normal uppercase leading-tight text-[#1E1E1E] md:text-3xl"
            style={avenirStyle}
          >
            {produkTitle}
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {showProdukPlaceholder
              ? Array.from({ length: 6 }).map((_, i) => (
                  <SectionPlaceholder key={i} className="h-[280px]" lines={4} />
                ))
              : productList.map((item, i) => (
                  <Link
                    key={i}
                    href={`/${locale}${item.urlProduk || "/produk"}`}
                    className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-zinc-800 dark:shadow-none"
                  >
                    <div className="relative aspect-[4/3] w-full bg-[#408FB4]/10">
                      <ImageWithFallback
                        src={item.imageUrl || "/assets/produk1.png"}
                        alt=""
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        fallbackSrc="/assets/produk1.png"
                      />
                    </div>
                    <div className="flex items-start justify-between gap-3 p-4">
                      <div className="min-w-0 flex-1">
                        <p
                          className="font-semibold text-[#1E1E1E]"
                          style={{ ...avenirStyle, fontSize: "15px" }}
                        >
                          {item.title}
                        </p>
                        <p
                          className="mt-1 text-[14px] font-normal text-[#6B7280]"
                          style={avenirStyle}
                        >
                          {item.category}
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
              style={{ ...avenirStyle, fontSize: "16px" }}
            >
              {produkViewMore}
              <ChevronRightIcon className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Klien Section: height 816 area, padding-bottom 64px, bg image 10% opacity + gradient overlay */}
      <section className="relative min-h-[816px] px-4 pb-16 pt-16 md:px-16 lg:px-24 xl:px-32">
        {/* Background: jangan pakai -z-10 agar tidak tertutup parent; layer di z-0, konten di atas */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <Image
            src="/assets/bgKlien.jpg"
            alt=""
            fill
            loading="eager"
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

        {showKlienPlaceholder ? (
          <div className="relative z-10 mx-auto max-w-6xl space-y-6">
            <SectionPlaceholder className="h-[80px]" lines={2} />
            <SectionPlaceholder className="h-[200px]" lines={4} />
            <SectionPlaceholder className="h-[160px]" lines={3} />
          </div>
        ) : (
          <KlienSectionClient
            klienBadge={klienBadge}
            klienTitle={klienTitle}
            clientList={clientList}
            klienStats={klienStats.map((s) => ({
              value: s.value ?? "",
              label: s.label ?? "",
            }))}
            testimoniList={testimoniList}
            avenirStyle={avenirStyle}
          />
        )}
      </section>

      {/* Galeri Section: bgHalfHero 20%, height 620px, padding 64px */}
      <section className="relative min-h-[620px] px-4 py-16 md:px-16 lg:px-24 xl:px-32">
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <Image
            src="/assets/bgHalfHero.jpg"
            alt=""
            fill
            className="object-cover object-center opacity-20"
            loading="eager"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl">
          {showGaleriPlaceholder ? (
            <SectionPlaceholder className="h-[320px]" lines={5} />
          ) : (
            <GalleryCarouselWrapper
              items={galleryItems}
              sectionBadge={galeriBadge}
              sectionTitle={galeriTitle}
            />
          )}
        </div>
      </section>

      {/* Artikel Section */}
      <section className="bg-background px-4 py-16 md:px-16 lg:px-24 xl:px-32">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-normal text-[#6B7280]">{artikelBadge}</p>
          <h2 className="mt-1 text-2xl font-normal uppercase leading-tight text-[#1E1E1E] md:text-3xl">
            {artikelTitle}
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {showArtikelPlaceholder
              ? Array.from({ length: 4 }).map((_, i) => (
                  <SectionPlaceholder key={i} className="h-[260px]" lines={4} />
                ))
              : artikelList.map((artikel, i) => (
                  <Link
                    key={i}
                    href={
                      artikel.slug
                        ? `/${locale}/artikel/${artikel.slug}`
                        : `/${locale}/artikel/${toArticleSlug(artikel.title)}`
                    }
                    className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-zinc-800 dark:shadow-none"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-xl">
                      <ImageWithFallback
                        src={artikel.imageUrl || "/assets/artikel1.png"}
                        alt=""
                        fill
                        className="object-cover object-center transition group-hover:opacity-95"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        fallbackSrc="/assets/artikel1.png"
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
              {artikelViewMore}
              <ChevronRightIcon className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sertifikat Section */}
      <section className="bg-background px-4 pb-16 md:px-16 lg:px-24 xl:px-32">
        <div className="mx-auto max-w-6xl space-y-6">
          {/* Baris atas: 2 logo + teks */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
            <div className="flex shrink-0 flex-wrap items-center gap-4 md:gap-6">
              <div className="relative h-20 w-20 md:h-24 md:w-24">
                <Image
                  src="/assets/sertifikat1.png"
                  alt="ISO 27001 Certified"
                  fill
                  className="object-contain"
                  sizes="96px"
                />
              </div>
              <div className="relative h-20 w-20 md:h-24 md:w-24">
                <Image
                  src="/assets/sertifikat2.png"
                  alt="BSSN Republik Indonesia"
                  fill
                  className="object-contain"
                  sizes="96px"
                />
              </div>
            </div>
            <p className="text-[20px] leading-relaxed md:min-w-0">
              PT. Cartenz Technology telah tersertifikasi ISO 27001:2022 untuk
              standar internasional manajemen keamanan informasi dalam lingkup
              Layanan Perangkat Lunak di Seluruh Dunia.
            </p>
          </div>

          {/* Baris bawah: 1 logo + teks */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
            <div className="relative h-20 w-32 shrink-0 md:h-[91px] md:w-[231px]">
              <Image
                src="/assets/sertifikat3.png"
                alt="Balai Sertifikasi Elektronik"
                fill
                className="object-contain object-left"
                sizes="231px"
              />
            </div>
            <p className="text-[20px] leading-relaxed md:min-w-0">
              Solusi Palapa lulus uji keamanan BSSN pada tahun 2024, dan
              beberapa wilayah afiliasinya telah terintegrasi dengan BSrE.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
