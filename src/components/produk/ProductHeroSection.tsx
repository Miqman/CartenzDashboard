"use client";

import Image from "next/image";
import { PRODUCT_PAGE_ASSETS } from "@/data/productsPageData";
import { ChevronRight } from "lucide-react";

type Props = {
  title: string;
  paragraphs: string[];
  demoUrl?: string;
  logoUrl?: string;
  heroImageUrl?: string;
};

export function ProductHeroSection({
  title,
  paragraphs,
  demoUrl,
  logoUrl = PRODUCT_PAGE_ASSETS.logo,
  heroImageUrl = PRODUCT_PAGE_ASSETS.heroImage,
}: Props) {
  return (
    <section className="bg-white px-4 py-10 md:px-8 md:py-14 lg:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[7fr_3fr] lg:gap-12">
        {/* Kiri ~70%: logo, tombol demo, judul, paragraf */}
        <div className="flex flex-col">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="relative h-12 w-32 shrink-0 md:h-[69px] md:w-72">
              <Image
                src={logoUrl}
                alt=""
                fill
                className="object-contain object-left"
                sizes="144px"
                unoptimized={logoUrl.startsWith("http")}
              />
            </div>
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-x-2 rounded-full bg-cartenz-blue px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Demo Aplikasi
                <ChevronRight className="size-4" aria-hidden />
              </a>
            )}
          </div>
          <h1 className="mb-4 text-xl font-bold text-[#1E1E1E] md:text-2xl">
            {title}
          </h1>
          <div className="space-y-3">
            {paragraphs.map((text, i) => (
              <p
                key={i}
                className="text-sm leading-relaxed text-[#1E1E1E] md:text-base"
              >
                {text}
              </p>
            ))}
          </div>
        </div>
        {/* Kanan ~30%: gambar */}
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-[#F1F5F9] lg:aspect-auto lg:min-h-[280px]">
          <Image
            src={heroImageUrl}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 30vw"
            unoptimized={heroImageUrl.startsWith("http")}
          />
        </div>
      </div>
    </section>
  );
}
