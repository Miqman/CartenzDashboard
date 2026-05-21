"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PalapaKlienCardItem } from "@/data/palapaKlienCardData";
import { shouldBypassNextImageOptimization } from "@/lib/utils";

const CARDS_PER_PAGE = 6;
const IMAGE_WIDTH = 378;
const IMAGE_HEIGHT = 184;
const LOGO_SIZE = 60;

/** Placeholder saat gambar/logo dari CMS kosong (dummyimage.com: background hitam #000, teks putih #fff) */
const PLACEHOLDER_IMAGE = `https://dummyimage.com/${IMAGE_WIDTH}x${IMAGE_HEIGHT}/000/fff`;
const PLACEHOLDER_LOGO = `https://dummyimage.com/${LOGO_SIZE}x${LOGO_SIZE}/000/fff`;

type Props = {
  badge: string;
  title: string;
  rating: string;
  items: PalapaKlienCardItem[];
};

function KlienCard({ item }: { item: PalapaKlienCardItem }) {
  const gambarSrc = item.gambar?.trim() || PLACEHOLDER_IMAGE;
  const logoSrc = item.logo?.trim() || PLACEHOLDER_LOGO;
  return (
    <article className="flex flex-col">
      <div
        className="relative w-full overflow-hidden rounded-lg"
        style={{
          width: "100%",
          maxWidth: IMAGE_WIDTH,
          aspectRatio: `${IMAGE_WIDTH} / ${IMAGE_HEIGHT}`,
        }}
      >
        <Image
          src={gambarSrc}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 378px"
          unoptimized={shouldBypassNextImageOptimization(gambarSrc)}
        />
      </div>
      <div className="mt-3 flex items-center gap-3">
        <div
          className="relative shrink-0 overflow-hidden rounded-full border border-[#E5E7EB] bg-white"
          style={{ width: LOGO_SIZE, height: LOGO_SIZE }}
        >
          <Image
            src={logoSrc}
            alt=""
            fill
            className="object-contain p-1"
            sizes="60px"
            unoptimized={shouldBypassNextImageOptimization(logoSrc)}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-(--color-cartenz-blue)">
            {item.title}
          </p>
          <p className="text-sm" style={{ color: "#62748E" }}>
            {item.nama_daerah}
          </p>
        </div>
      </div>
    </article>
  );
}

export function ProductKlienCardSection({
  badge,
  title,
  rating,
  items,
}: Props) {
  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(items.length / CARDS_PER_PAGE));
  const start = page * CARDS_PER_PAGE;
  const visibleItems = items.slice(start, start + CARDS_PER_PAGE);
  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  return (
    <section
      className="px-4 py-10 md:px-8 md:py-14 lg:px-12"
      aria-label="Klien pemerintah daerah"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-normal text-[#6B7280]">{badge}</p>
            <div className="flex items-center gap-4">
              <h2 className="mt-1 text-2xl uppercase leading-tight md:text-4xl">
                {title}
              </h2>
              <div className="">
                <span className="rounded-full bg-[#FEF3C7] px-3 py-1.5 text-sm font-medium text-[#92400E]">
                  {rating}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={!canPrev}
                className="flex size-10 cursor-pointer items-center justify-center rounded-full transition hover:bg-black/5 disabled:pointer-events-none disabled:opacity-40"
                aria-label="Klien sebelumnya"
              >
                <ChevronLeft className="size-10" />
              </button>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={!canNext}
                className="flex size-10 cursor-pointer items-center justify-center rounded-full transition hover:bg-black/5 disabled:pointer-events-none disabled:opacity-40"
                aria-label="Klien berikutnya"
              >
                <ChevronRight className="size-10" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item, i) => (
            <KlienCard key={`${item.title}-${start + i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
