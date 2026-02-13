"use client";

import dynamic from "next/dynamic";
import type { GalleryItemData } from "./GalleryCarousel";
import type { HeroSlideData } from "./HeroCarousel";

const HeroCarousel = dynamic(
  () => import("./HeroCarousel").then((m) => ({ default: m.HeroCarousel })),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[calc(100dvh-72px)] min-h-[calc(100vh-72px)] md:min-h-[50vh]" />
    ),
  }
);

const GalleryCarousel = dynamic(
  () => import("./GalleryCarousel").then((m) => ({ default: m.GalleryCarousel })),
  { ssr: false, loading: () => <div className="min-h-[320px]" /> }
);

export interface HeroCarouselWrapperProps {
  locale: string;
  slides?: HeroSlideData[] | null;
  ctaLabel?: string;
}

export interface GalleryCarouselWrapperProps {
  items?: GalleryItemData[] | null;
  sectionBadge?: string;
  sectionTitle?: string;
}

export function HeroCarouselWrapper({
  locale,
  slides,
  ctaLabel,
}: HeroCarouselWrapperProps) {
  return (
    <HeroCarousel locale={locale} slides={slides} ctaLabel={ctaLabel} />
  );
}

export function GalleryCarouselWrapper({
  items,
  sectionBadge,
  sectionTitle,
}: GalleryCarouselWrapperProps) {
  return (
    <GalleryCarousel
      items={items}
      sectionBadge={sectionBadge}
      sectionTitle={sectionTitle}
    />
  );
}
