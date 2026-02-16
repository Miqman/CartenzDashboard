"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Share2 } from "lucide-react";
import type { KarirItem } from "@/data/karirData";

function formatPosted(daysAgo: number): string {
  if (daysAgo === 0) return "Diposting hari ini";
  if (daysAgo === 1) return "Diposting 1 hari lalu";
  return `Diposting ${daysAgo} hari lalu`;
}

export function KarirListClient({
  jobs,
  klasifikasiList,
  locale,
}: {
  jobs: KarirItem[];
  klasifikasiList: string[];
  locale: string;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKlasifikasi, setSelectedKlasifikasi] = useState("Semua Klasifikasi");

  const filtered = useMemo(() => {
    let list = jobs;
    if (selectedKlasifikasi !== "Semua Klasifikasi") {
      list = list.filter((j) => j.klasifikasi === selectedKlasifikasi);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (j) =>
          j.judul.toLowerCase().includes(q) ||
          j.lokasi.toLowerCase().includes(q) ||
          j.pengalaman.toLowerCase().includes(q)
      );
    }
    return list;
  }, [jobs, selectedKlasifikasi, searchQuery]);

  const handleShare = (job: KarirItem) => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: job.judul,
        url: window.location.origin + `/${locale}/karir/${job.slug}`,
        text: job.judul,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.origin + `/${locale}/karir/${job.slug}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" aria-hidden />
          <input
            type="search"
            placeholder="Pencarian"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-[#E5E7EB] bg-white py-2.5 pl-10 pr-4 placeholder:text-[#9CA3AF] focus:border-[#408FB4] focus:outline-none focus:ring-1 focus:ring-[#408FB4]"
            aria-label="Pencarian lowongan"
          />
        </div>
        <select
          value={selectedKlasifikasi}
          onChange={(e) => setSelectedKlasifikasi(e.target.value)}
          className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-2.5 focus:border-[#408FB4] focus:outline-none focus:ring-1 focus:ring-[#408FB4]"
          aria-label="Klasifikasi"
        >
          {klasifikasiList.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="rounded-lg bg-[#408FB4] px-5 py-2.5 font-medium text-white transition hover:bg-[#357a9a]"
        >
          Cari
        </button>
      </div>

      <p className="text-sm">
        Semua lowongan ({filtered.length})
      </p>

      <ul className="space-y-4">
        {filtered.map((job) => (
          <li
            key={job.slug}
            className="rounded-xl border border-[#E5E7EB] bg-white p-5 transition hover:border-[#E5E7EB]"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-[#1E1E1E]">
                    {job.judul}
                  </h2>
                  <p className="text-sm text-[#6B7280]">
                    {formatPosted(job.daysAgo)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleShare(job)}
                  className="flex shrink-0 items-center gap-1.5 text-sm text-[#6B7280] transition hover:text-[#408FB4]"
                >
                  <Share2 className="h-4 w-4" />
                  Bagikan
                </button>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="min-w-0 text-sm text-[#6B7280]">
                  <p>{job.tipePekerjaan} - {job.lokasiKerja}, {job.lokasi}</p>
                  <p className="mt-0.5">{job.pengalaman}</p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <Link
                    href={`/${locale}/karir/${job.slug}`}
                    className="rounded-lg border border-[#408FB4] bg-white px-4 py-2 text-sm text-[#408FB4] transition hover:bg-[#408FB4]/5"
                  >
                    Lihat Detail
                  </Link>
                  <a
                    href={`mailto:support@cartenz.co.id?subject=Lamar: ${encodeURIComponent(job.judul)}`}
                    className="rounded-lg bg-[#408FB4] px-4 py-2 text-sm text-white transition hover:bg-[#357a9a]"
                  >
                    Lamar Sekarang
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
