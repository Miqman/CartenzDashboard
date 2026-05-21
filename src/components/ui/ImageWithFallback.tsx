"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";
import { shouldBypassNextImageOptimization } from "@/lib/utils";

type ImageWithFallbackProps = ImageProps & {
  /** Gambar fallback saat URL gagal (404/dll). */
  fallbackSrc?: string;
};

/**
 * Wrapper next/image:
 * - URL stabil (cms.cartenz.co.id, asset lokal) dioptimasi Next.js (AVIF/WebP).
 * - URL presigned COS / `*.myqcloud.com` di-bypass optimizer (unoptimized) supaya
 *   browser load langsung. Hindari error "url not allowed" / signature expired.
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
  const unoptimized = shouldBypassNextImageOptimization(currentSrc);

  useEffect(() => {
    setCurrentSrc(effectiveSrc);
  }, [effectiveSrc]);

  return (
    <Image
      src={currentSrc}
      alt={alt}
      unoptimized={unoptimized}
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
      }}
      {...rest}
    />
  );
}
