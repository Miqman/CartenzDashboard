"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HERO_SOLUTIONS = [
  "Solusi Administrasi Pengelolaan Pajak Daerah",
  "Solusi Integrasi Pembayaran Pajak Daerah",
  "Solusi Integrasi Data Pajak Daerah",
  "Solusi Digitalisasi Pemetaan Pajak Daerah",
  "Solusi Anjungan Pajak Mandiri E-Kiosk",
  "Solusi Dashboard Command Center",
  "Solusi Perekaman Retribusi",
];

const SLIDE_TITLES = [
  "Solusi Pengelolaan Pajak Daerah",
  "Solusi Pengelolaan Pajak Daerah",
  "Solusi Pengelolaan Pajak Daerah",
  "Solusi Pengelolaan Pajak Daerah",
];

const avenirStyle = {
  fontFamily: "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
};

export interface HeroSlideData {
  title: string;
  solutions: string[];
  /** URL logo dari Strapi; jika kosong pakai fallback /assets/smartgov_logo_hero.svg */
  logoUrl?: string;
}

interface HeroCarouselProps {
  locale: string;
  /** Dari Strapi; jika kosong pakai fallback hardcoded */
  slides?: HeroSlideData[] | null;
  ctaLabel?: string;
}

const DEFAULT_HERO_LOGO = "/assets/smartgov_logo_hero.svg";

function SlideContent({
  title,
  solutions,
  locale,
  ctaLabel,
  logoUrl,
}: {
  title: string;
  solutions: string[];
  locale: string;
  ctaLabel: string;
  logoUrl?: string;
}) {
  const logoSrc = logoUrl || DEFAULT_HERO_LOGO;
  return (
    <div className="flex min-h-[calc(100dvh-72px)] min-h-[calc(100vh-72px)] flex-col items-center justify-center px-4 py-12 md:min-h-[50vh] md:px-8">
      <div className="relative z-10 w-full max-w-7xl text-center">
        <div className="relative mx-auto mb-4 h-8 w-24 md:mb-5 md:h-10 md:w-28">
          <Image
            src={logoSrc}
            alt="Logo"
            fill
            className="object-contain object-center"
            sizes="112px"
            unoptimized={logoSrc.startsWith("http")}
          />
        </div>
        <h1
          className="text-[28px] leading-[100%] tracking-[0%] text-[#1E1E1E] md:text-[48px]"
          style={{ ...avenirStyle, textAlign: "center" }}
        >
          {title}
        </h1>
        <div
          className="mx-auto mt-4 flex md:w-full flex-wrap items-center justify-center gap-[12px] md:mt-5"
          style={avenirStyle}
        >
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
          href={`/${locale}/produk`}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#408FB4] px-6 py-3 text-white transition hover:opacity-90 md:mt-8"
          style={avenirStyle}
        >
          {/* {ctaLabel} */}
          {"Lihat Selengkapnya"}
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
  const slideList =
    slides && slides.length > 0
      ? slides.map((s) => ({
          title: s.title ?? "Solusi Pengelolaan Pajak Daerah",
          solutions: Array.isArray(s.solutions) ? s.solutions : HERO_SOLUTIONS,
          logoUrl: s.logoUrl,
        }))
      : SLIDE_TITLES.map((title) => ({
          title,
          solutions: HERO_SOLUTIONS,
          logoUrl: undefined,
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
