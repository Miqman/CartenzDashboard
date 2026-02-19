"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

type ImageWithFallbackProps = ImageProps & {
  /** Gambar fallback saat URL Strapi gagal (404/dll), mis. setelah self-host */
  fallbackSrc?: string;
};

/**
 * Wrapper next/image untuk gambar dari Strapi.
 * - URL eksternal pakai unoptimized agar Next tidak fetch (hindari "upstream image response failed").
 * - Jika gambar gagal dimuat (file tidak ada di server), tampilkan fallback.
 */
export function ImageWithFallback({
  src,
  fallbackSrc = "/assets/galeri5.jpg",
  alt,
  ...rest
}: ImageWithFallbackProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const isExternal = typeof currentSrc === "string" && currentSrc.startsWith("http");

  return (
    <Image
      src={currentSrc}
      alt={alt}
      unoptimized={isExternal}
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
      }}
      {...rest}
    />
  );
}
