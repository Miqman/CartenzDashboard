/**
 * Re-export thin wrapper. Swiper React mendukung SSR sejak v8+, jadi tidak perlu
 * `dynamic({ ssr: false })` lagi — slide pertama akan ikut ter-render di HTML awal
 * sehingga LCP & SEO lebih baik.
 */
export { HeroCarousel as HeroCarouselWrapper } from "./HeroCarousel";
export { GalleryCarousel as GalleryCarouselWrapper } from "./GalleryCarousel";
export type { HeroSlideData } from "./HeroCarousel";
export type { GalleryItemData } from "./GalleryCarousel";
