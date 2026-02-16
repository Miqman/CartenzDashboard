"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface ArticleItem {
  kategori: string;
  judul: string;
  image: string;
}

const PER_PAGE = 12;

export function ArtikelListClient({
  articles,
  locale,
}: {
  articles: ArticleItem[];
  locale: string;
}) {
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => {
    const set = new Set(articles.map((a) => a.kategori));
    return ["Semua Kategori", ...Array.from(set).sort()];
  }, [articles]);

  const filtered = useMemo(() => {
    if (selectedCategory === "Semua Kategori") return articles;
    return articles.filter((a) => a.kategori === selectedCategory);
  }, [articles, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const page = Math.min(Math.max(1, currentPage), totalPages);
  const start = (page - 1) * PER_PAGE;
  const pageItems = filtered.slice(start, start + PER_PAGE);

  return (
    <div className="space-y-8">
      {/* Filter kategori */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              selectedCategory === cat
                ? "bg-[#408FB4] text-white"
                : "border border-[#E5E7EB] bg-white text-[#1E1E1E] hover:bg-[#F9FAFB]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid 4 kolom */}
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pageItems.map((item, i) => (
          <li key={`${item.judul}-${start + i}`}>
            <Link
              href={`/${locale}/artikel/${encodeURIComponent(item.judul)}`}
              className="group block overflow-hidden rounded-xl bg-white transition-shadow hover:shadow-sm"
            >
              <div
                className="relative mx-auto overflow-hidden rounded-lg bg-[#F3F4F6]"
                style={{ width: 276, height: 195 }}
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover transition group-hover:opacity-95"
                  sizes="276px"
                />
              </div>
              <div className="py-2 px-1">
                <p className="text-xs font-normal text-[#6B7280]">{item.kategori}</p>
                <h2 className="mt-1 line-clamp-2 text-base font-semibold text-[#1E1E1E] group-hover:text-[#408FB4]">
                  {item.judul}
                </h2>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#1E1E1E] transition hover:bg-[#F3F4F6] disabled:opacity-40 disabled:pointer-events-none"
            aria-label="Halaman sebelumnya"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setCurrentPage(p)}
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition ${
                page === p
                  ? "bg-[#408FB4] text-white"
                  : "text-[#1E1E1E] hover:bg-[#F3F4F6]"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#1E1E1E] transition hover:bg-[#F3F4F6] disabled:opacity-40 disabled:pointer-events-none"
            aria-label="Halaman berikutnya"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
