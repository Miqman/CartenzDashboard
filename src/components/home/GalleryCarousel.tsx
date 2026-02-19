"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const GALLERY_IMAGES = [
  { src: "/assets/galeri1.jpg", alt: "Galeri 1", caption: "Carteamz", subtitle: "2026" },
  { src: "/assets/galeri2.png", alt: "Galeri 2", caption: "Carteamz", subtitle: "2026" },
  { src: "/assets/galeri3.jpg", alt: "Galeri 3", caption: "Carteamz", subtitle: "2026" },
  { src: "/assets/galeri4.jpg", alt: "Galeri 4", caption: "Carteamz", subtitle: "2026" },
  { src: "/assets/galeri5.jpg", alt: "Galeri 5", caption: "Carteamz", subtitle: "2026" },
];

const avenirStyle = {
  fontFamily: "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
};

export interface GalleryItemData {
  imageUrl: string;
  alt: string;
  caption?: string;
  subtitle?: string;
}

interface GalleryCarouselProps {
  /** Dari Strapi; jika kosong pakai fallback lokal */
  items?: GalleryItemData[] | null;
  sectionBadge?: string;
  sectionTitle?: string;
}

export function GalleryCarousel({
  items,
  sectionBadge = "Galeri",
  sectionTitle = "MEMORI PERJALANAN",
}: GalleryCarouselProps) {
  const slideItems =
    items && items.length > 0
      ? items
      : GALLERY_IMAGES.map((g) => ({ imageUrl: g.src, alt: g.alt, caption: g.caption, subtitle: g.subtitle }));
  const gallerySlides = [...slideItems, ...slideItems];

  return (
    <div className="galeri-swiper relative w-full overflow-hidden">
      <div className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-normal text-[#6B7280]" style={avenirStyle}>
            {sectionBadge}
          </p>
          <h2
            className="mt-1 text-2xl font-normal uppercase leading-tight text-[#1E1E1E] md:text-3xl"
            style={avenirStyle}
          >
            {sectionTitle}
          </h2>
        </div>
        <div className="mt-4 flex items-center gap-2 sm:mt-0">
          <button
            type="button"
            className="galeri-swiper-prev flex size-10 cursor-pointer items-center justify-center rounded-full text-[#1E1E1E] transition hover:bg-black/5"
            aria-label="Slide sebelumnya"
          >
            <ChevronLeft className="size-10" />
          </button>
          <button
            type="button"
            className="galeri-swiper-next flex size-10 cursor-pointer items-center justify-center rounded-full text-[#1E1E1E] transition hover:bg-black/5"
            aria-label="Slide berikutnya"
          >
            <ChevronRight className="size-10" />
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
        {gallerySlides.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="galeri-slide-inner relative">
              <ImageWithFallback
                src={item.imageUrl}
                alt={item.alt}
                fill
                className="object-cover object-center"
                sizes="278px"
                fallbackSrc="/assets/galeri5.jpg"
              />
            </div>
            <div className="galeri-caption text-[#1E1E1E]">
              <p className="text-base font-medium" style={avenirStyle}>
                {item.caption ?? "Carteamz"}
              </p>
              <p className="text-sm text-[#6B7280]" style={avenirStyle}>
                {item.subtitle ?? "2026"}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
