"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const GALLERY_IMAGES = [
  { src: "/assets/galeri1.jpg", alt: "Galeri 1" },
  { src: "/assets/galeri2.png", alt: "Galeri 2" },
  { src: "/assets/galeri3.jpg", alt: "Galeri 3" },
  { src: "/assets/galeri4.jpg", alt: "Galeri 4" },
  { src: "/assets/galeri5.jpg", alt: "Galeri 5" },
];

/** Double assets agar carousel terasa penuh dan loop natural (5 gambar × 2 = 10 slide) */
const GALLERY_SLIDES = [...GALLERY_IMAGES, ...GALLERY_IMAGES];

const avenirStyle = {
  fontFamily: "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
};

export function GalleryCarousel() {
  return (
    <div className="galeri-swiper relative w-full overflow-hidden">
      <div className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p
            className="text-sm font-normal text-[#6B7280]"
            style={avenirStyle}
          >
            Galeri
          </p>
          <h2
            className="mt-1 text-2xl font-normal uppercase leading-tight text-[#1E1E1E] md:text-3xl"
            style={avenirStyle}
          >
            MEMORI PERJALANAN
          </h2>
        </div>
        <div className="mt-4 flex items-center gap-2 sm:mt-0">
          <button
            type="button"
            className="galeri-swiper-prev flex size-10 cursor-pointer items-center justify-center rounded-full text-[#1E1E1E] transition hover:bg-black/5"
            aria-label="Slide sebelumnya"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            className="galeri-swiper-next flex size-10 cursor-pointer items-center justify-center rounded-full text-[#1E1E1E] transition hover:bg-black/5"
            aria-label="Slide berikutnya"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView="auto"
        centeredSlides
        loop
        navigation={{
          prevEl: ".galeri-swiper-prev",
          nextEl: ".galeri-swiper-next",
        }}
        className="!overflow-hidden"
      >
        {GALLERY_SLIDES.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="galeri-slide-inner relative">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover object-center"
                sizes="278px"
              />
            </div>
            <div className="galeri-caption text-[#1E1E1E]">
              <p className="text-base font-medium" style={avenirStyle}>
                Carteamz
              </p>
              <p className="text-sm text-[#6B7280]" style={avenirStyle}>
                2026
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
