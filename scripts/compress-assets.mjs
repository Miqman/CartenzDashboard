#!/usr/bin/env node
// Kompresi batch gambar di public/assets/.
// - JPG/PNG > 200KB di-resize maks 2400px (sisi terpanjang) dan dikompres.
// - PNG foto besar dikonversi ke WebP (file PNG asli dipertahankan agar referensi <img src="..."> tidak rusak,
//   tetapi PNG di-overwrite dengan versi yang sudah dikompresi).
// Aman dijalankan ulang (idempotent secara visual).

import { readdir, stat, readFile, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const ASSETS_DIR = new URL("../public/assets/", import.meta.url);
const MIN_BYTES = 150 * 1024;
const MAX_SIDE = 2400;

const JPEG_QUALITY = 72;
const PNG_QUALITY = 80;
const WEBP_QUALITY = 72;

const SKIP = new Set(["logo.svg"]);

function fmtKB(bytes) {
  return `${(bytes / 1024).toFixed(0)}KB`;
}

async function processFile(absPath, name) {
  const ext = extname(name).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return null;

  const buf = await readFile(absPath);
  if (buf.byteLength < MIN_BYTES) return null;

  const before = buf.byteLength;
  const img = sharp(buf, { failOn: "none" });
  const meta = await img.metadata();

  let pipeline = sharp(buf, { failOn: "none" });
  if ((meta.width ?? 0) > MAX_SIDE || (meta.height ?? 0) > MAX_SIDE) {
    pipeline = pipeline.resize({
      width: MAX_SIDE,
      height: MAX_SIDE,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  let outBuf;
  if (ext === ".png") {
    outBuf = await pipeline
      .png({ quality: PNG_QUALITY, compressionLevel: 9, palette: true })
      .toBuffer();
  } else {
    outBuf = await pipeline
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toBuffer();
  }

  if (outBuf.byteLength < before) {
    await writeFile(absPath, outBuf);
  }

  const webpBuf = await sharp(buf, { failOn: "none" })
    .resize({
      width: MAX_SIDE,
      height: MAX_SIDE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: WEBP_QUALITY })
    .toBuffer();
  const webpPath = absPath.replace(/\.(png|jpe?g)$/i, ".webp");
  await writeFile(webpPath, webpBuf);

  return {
    name,
    before,
    after: Math.min(outBuf.byteLength, before),
    webp: webpBuf.byteLength,
  };
}

async function main() {
  const dir = await readdir(ASSETS_DIR);
  const results = [];
  for (const name of dir) {
    if (SKIP.has(name)) continue;
    const abs = join(ASSETS_DIR.pathname.replace(/^\//, ""), name);
    try {
      const s = await stat(abs);
      if (!s.isFile()) continue;
      const r = await processFile(abs, name);
      if (r) results.push(r);
    } catch (e) {
      console.error(`[skip] ${name}: ${e.message}`);
    }
  }
  results.sort((a, b) => b.before - a.before);
  let totalBefore = 0;
  let totalAfter = 0;
  for (const r of results) {
    totalBefore += r.before;
    totalAfter += r.after;
    console.log(
      `${r.name.padEnd(36)} ${fmtKB(r.before).padStart(7)} -> ${fmtKB(r.after).padStart(7)}  webp ${fmtKB(r.webp).padStart(7)}`,
    );
  }
  console.log("---");
  console.log(
    `Total original: ${fmtKB(totalBefore)}  ->  compressed: ${fmtKB(totalAfter)}  (${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}% smaller)`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
