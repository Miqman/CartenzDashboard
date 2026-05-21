"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { shouldBypassNextImageOptimization } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export interface HeroSlideData {
  title: string;
  solutions: string[];
  /** URL logo dari Strapi; jika kosong pakai fallback /assets/smartgov_logo_hero.svg */
  logoUrl?: string;
  /** URL tujuan tombol CTA hero per-slide */
  linkProdukHero?: string;
  show?: boolean;
}

interface HeroCarouselProps {
  locale: string;
  /** Dari Strapi; jika kosong pakai fallback hardcoded */
  slides?: HeroSlideData[] | null;
  ctaLabel?: string;
}

const DEFAULT_HERO_LOGO = "/assets/defaultImage.png";

function SlideContent({
  title,
  solutions,
  locale,
  ctaLabel,
  logoUrl,
  linkProdukHero,
}: {
  title: string;
  solutions: string[];
  locale: string;
  ctaLabel: string;
  logoUrl?: string;
  linkProdukHero?: string;
}) {
  const logoSrc = logoUrl || DEFAULT_HERO_LOGO;
  const normalizedLink = linkProdukHero?.trim();
  const ctaHref = !normalizedLink
    ? `/${locale}/produk`
    : normalizedLink.startsWith("http://") ||
        normalizedLink.startsWith("https://")
      ? normalizedLink
      : normalizedLink.startsWith(`/${locale}/`)
        ? normalizedLink
        : normalizedLink.startsWith("/")
          ? `/${locale}${normalizedLink}`
          : `/${locale}/${normalizedLink}`;

  return (
    <div className="flex min-h-[calc(100dvh-72px)] flex-col items-center justify-center px-4 md:min-h-[min(calc(100dvh-72px),500px)] md:px-8">
      <div className="relative z-10 w-full max-w-4xl md:max-w-5xl text-center">
        <div className="relative mx-auto mb-4 h-8 w-full max-w-[300px] md:mb-5 md:h-10 md:max-w-[520px]">
          <Image
            src={logoSrc}
            alt="Logo"
            fill
            className="object-contain object-center"
            sizes="(min-width: 768px) 520px, 300px"
            unoptimized={shouldBypassNextImageOptimization(logoSrc)}
          />
        </div>
        <h1
          className="text-[28px] leading-[100%] tracking-[0%] text-[#1E1E1E] md:text-[48px]"
          style={{ textAlign: "center" }}
        >
          {title}
        </h1>
        <div className="mx-auto mt-4 flex md:w-full flex-wrap items-center justify-center gap-[12px] md:mt-5">
          {solutions.flatMap((item, i) =>
            i === 0
              ? [
                  <span
                    key={i}
                    className="text-[14px] font-normal leading-normal tracking-[0%] text-[#1E1E1E]"
                  >
                    {item}
                  </span>,
                ]
              : [
                  <span
                    key={`bullet-${i}`}
                    className="size-[7px] shrink-0 rounded-full bg-[#408FB4]"
                    aria-hidden
                  />,
                  <span
                    key={i}
                    className="text-[14px] font-normal leading-normal tracking-[0%] text-[#1E1E1E]"
                  >
                    {item}
                  </span>,
                ],
          )}
        </div>
        <Link
          href={ctaHref}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#408FB4] px-6 py-3 text-white transition hover:opacity-90 md:mt-8"
        >
          {ctaLabel}
          <ArrowRight className="size-5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

export function HeroCarousel({
  locale,
  slides,
  ctaLabel = "Lihat Selengkapnya",
}: HeroCarouselProps) {
  /** Hanya slide dengan show !== false (default Strapi / data lama tetap tampil). */
  const slideList = (slides ?? [])
    .filter((s) => s.show !== false)
    .map((s) => ({
      title: s.title ?? "",
      solutions: Array.isArray(s.solutions) ? s.solutions : [],
      logoUrl: s.logoUrl,
      linkProdukHero: s.linkProdukHero,
    }));

  return (
    <div className="hero-swiper relative w-full overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop
        navigation={{
          prevEl: ".hero-swiper-prev",
          nextEl: ".hero-swiper-next",
        }}
        pagination={{ clickable: true }}
        className="overflow-hidden!"
      >
        {slideList.map((slide, i) => (
          <SwiperSlide key={i}>
            <SlideContent
              title={slide.title}
              solutions={slide.solutions}
              locale={locale}
              ctaLabel={ctaLabel}
              logoUrl={slide.logoUrl}
              linkProdukHero={slide.linkProdukHero}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Tombol navigasi kustom: ukuran dan posisi diatur di sini */}
      <button
        type="button"
        className="hero-swiper-prev absolute left-6 top-1/2 z-10 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-[#1E1E1E] transition hover:bg-black/5 md:left-8"
        aria-label="Slide sebelumnya"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        className="hero-swiper-next absolute right-6 top-1/2 z-10 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-[#1E1E1E] transition hover:bg-black/5 md:right-8"
        aria-label="Slide berikutnya"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}
