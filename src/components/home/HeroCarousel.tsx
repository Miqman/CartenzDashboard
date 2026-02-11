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

interface HeroCarouselProps {
  locale: string;
}

function SlideContent({ title, locale }: { title: string; locale: string }) {
  return (
    <div className="flex min-h-[calc(100dvh-72px)] min-h-[calc(100vh-72px)] flex-col items-center justify-center px-4 py-12 md:min-h-[50vh] md:px-8">
      <div className="relative z-10 w-full max-w-7xl text-center">
        <Image
          src="/assets/smartgov_logo_hero.svg"
          alt="SmartGov"
          width={100}
          height={40}
          className="mx-auto mb-4 h-8 w-auto md:mb-5 md:h-10"
        />
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
          {HERO_SOLUTIONS.flatMap((item, i) =>
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
          Lihat Selengkapnya
          <ArrowRight className="size-5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

export function HeroCarousel({ locale }: HeroCarouselProps) {
  return (
    <div className="hero-swiper relative">
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
        className="overflow-visible!"
      >
        {SLIDE_TITLES.map((title, i) => (
          <SwiperSlide key={i}>
            <SlideContent title={title} locale={locale} />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Tombol navigasi kustom: ukuran dan posisi diatur di sini */}
      <button
        type="button"
        className="hero-swiper-prev absolute left-6 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-[#1E1E1E] transition hover:bg-black/5 md:left-8"
        aria-label="Slide sebelumnya"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        className="hero-swiper-next absolute right-6 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-[#1E1E1E] transition hover:bg-black/5 md:right-8"
        aria-label="Slide berikutnya"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}
