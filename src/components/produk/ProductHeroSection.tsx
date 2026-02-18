"use client";

import Image from "next/image";
import { PRODUCT_PAGE_ASSETS } from "@/data/productsPageData";

type Props = {
  description: string;
  logoUrl?: string;
  heroImageUrl?: string;
};

export function ProductHeroSection({
  description,
  logoUrl = PRODUCT_PAGE_ASSETS.logo,
  heroImageUrl = PRODUCT_PAGE_ASSETS.heroImage,
}: Props) {
  return (
    <section className="bg-white px-4 py-10 md:px-8 md:py-14 lg:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
        <div className="flex flex-col">
          <div className="relative mb-6 h-12 w-32 shrink-0 md:h-14 md:w-36">
            <Image
              src={logoUrl}
              alt=""
              fill
              className="object-contain object-left"
              sizes="144px"
              unoptimized={logoUrl.startsWith("http")}
            />
          </div>
          <p className="text-[#1E1E1E] text-sm leading-relaxed md:text-base">
            {description}
          </p>
        </div>
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-[#F1F5F9] lg:aspect-auto lg:min-h-[280px]">
          <Image
            src={heroImageUrl}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            unoptimized={heroImageUrl.startsWith("http")}
          />
        </div>
      </div>
    </section>
  );
}
