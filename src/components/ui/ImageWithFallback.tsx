"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

type ImageWithFallbackProps = ImageProps & {
  /** Gambar fallback saat URL gagal (404/dll). */
  fallbackSrc?: string;
};

/**
 * Wrapper next/image:
 * - Sumber Strapi/eksternal dioptimasi oleh Next.js (resize, AVIF/WebP) selama host masuk daftar
 *   `images.remotePatterns` di next.config.ts.
 * - Bila image gagal load, jatuh ke fallbackSrc.
 */
export function ImageWithFallback({
  src,
  fallbackSrc = "/assets/galeri5.jpg",
  alt,
  ...rest
}: ImageWithFallbackProps) {
  const effectiveSrc = (typeof src === "string" && src.trim()) || fallbackSrc;
  const [currentSrc, setCurrentSrc] = useState(effectiveSrc);

  useEffect(() => {
    setCurrentSrc(effectiveSrc);
  }, [effectiveSrc]);

  return (
    <Image
      src={currentSrc}
      alt={alt}
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
      }}
      {...rest}
    />
  );
}
