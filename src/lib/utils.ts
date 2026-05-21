export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Media Strapi production sering berupa URL Tencent COS dengan presigned signature
 * (?q-sign-algorithm=...&q-signature=...) yang valid hanya ~1 jam.
 *
 * Kalau URL seperti ini dilewatkan ke Next.js Image Optimizer (/_next/image),
 * akan muncul 2 masalah di production:
 * 1) Bila deployment lupa allow host di `remotePatterns` → 400 "url parameter is not allowed".
 * 2) Bila signature sudah expired saat optimizer fetch upstream → 502 / image rusak.
 *
 * Solusinya: bypass optimizer (set `unoptimized`) untuk URL bertanda tangan. Browser
 * akan load URL langsung selama signature masih valid (page biasanya dirender ulang
 * via ISR sebelum 1 jam).
 */
export function shouldBypassNextImageOptimization(src: unknown): boolean {
  if (typeof src !== "string") return false;
  if (!src.startsWith("http://") && !src.startsWith("https://")) return false;
  try {
    const { hostname, search } = new URL(src);
    if (search.includes("q-sign-algorithm") || search.includes("q-signature=")) {
      return true;
    }
    if (hostname.endsWith(".myqcloud.com")) return true;
    return false;
  } catch {
    return true;
  }
}
