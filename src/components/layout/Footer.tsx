"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#408FB4] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Kolom kiri: logo + alamat */}
          <div>
            <Link href="https://cartenz.co.id" target="_blank" rel="noreferrer">
              <div className="mb-4">
                <img
                  src="/assets/logoCartenzWhiteFooter.svg.svg"
                  alt="Cartenz Technology"
                  className="h-9 w-auto"
                />
              </div>
            </Link>
            <p className="text-sm font-semibold">
              Millennium Centennial Center, 51st Floor
            </p>
            <p className="mt-1 max-w-sm text-sm leading-relaxed text-sky-50">
              Jl. Jenderal Sudirman No. Kav. 25, Kuningan, Karet, Setiabudi
              District, South Jakarta City, Special Capital Region of Jakarta,
              12920.
            </p>
          </div>

          {/* Kolom tengah: tautan */}
          <div>
            <p className="text-sm font-semibold tracking-wide">Tautan</p>
            <div className="mt-3 flex flex-col gap-1 text-sm">
              <Link
                href="/id/tentang-kami"
                className="transition hover:text-sky-100"
              >
                Tentang Kami
              </Link>
              <Link href="/id/produk" className="transition hover:text-sky-100">
                Produk
              </Link>
              <Link
                href="/id/hubungi-kami"
                className="transition hover:text-sky-100"
              >
                Hubungi Kami
              </Link>
              <Link
                href="/id/artikel"
                className="transition hover:text-sky-100"
              >
                Artikel
              </Link>
            </div>
          </div>

          {/* Kolom kanan: produk */}
          <div>
            <p className="text-sm font-semibold tracking-wide">Produk</p>
            <div className="mt-3 flex flex-col gap-1 text-sm">
              <p className="transition hover:text-sky-100">
                Solusi Pengelolaan Perpajakan Daerah
              </p>
              <p className="transition hover:text-sky-100">
                Solusi Perekaman dan Monitoring Perpajakan Daerah
              </p>
              <p className="transition hover:text-sky-100">
                Digitalisasi Layanan Pemerintah Terintegrasi
              </p>
              <p className="transition hover:text-sky-100">
                Strategic Consulting
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/40 pt-4">
          <p className="text-center text-xs text-sky-50">
            {t("copyright", { year })}
          </p>
        </div>
      </div>
    </footer>
  );
}
