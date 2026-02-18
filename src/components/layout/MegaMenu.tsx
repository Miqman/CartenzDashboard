"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { X, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { megaMenuData, type MegaMenuDetail } from "@/data/megaMenuData";
import { getProductDetailSelectionFromMegaMenu } from "@/data/productDetailData";
import { getProductPageUrl } from "@/lib/productNavigation";

const ACCENT_BLUE = "#3b82f6";

type Props = {
  open: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement | null>;
};

export function MegaMenu({ open, onClose, anchorRef }: Props) {
  const locale = useLocale();
  const [level1Id, setLevel1Id] = useState<string | null>(null);
  const [level2Id, setLevel2Id] = useState<string | null>(null);
  const [expandedDetailIndex, setExpandedDetailIndex] = useState<number>(-1);
  const panelRef = useRef<HTMLDivElement>(null);

  const activeCategory = level1Id
    ? megaMenuData.find((c) => c.id === level1Id)
    : null;
  const activeChild =
    activeCategory?.children.find((c) => c.id === level2Id) ?? null;
  const details = activeChild?.details ?? [];

  // Saat pertama dibuka: hanya Level 1 terlihat (tidak ada yang dipilih)
  useEffect(() => {
    if (open) {
      setLevel1Id(null);
      setLevel2Id(null);
      setExpandedDetailIndex(-1);
    }
  }, [open]);

  // Click outside to close
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current?.contains(target) ||
        anchorRef.current?.contains(target)
      )
        return;
      onClose();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose, anchorRef]);

  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-x-0 bottom-0 z-40"
      style={{ top: "var(--navbar-height, 72px)" }}
    >
      {/* Backdrop: full width */}
      <div
        className="absolute inset-0 bg-[#F1F5F9]"
        aria-hidden
      />
      {/* Wrapper full width, isi mega menu (kartu) di tengah */}
      <div className="relative z-50 flex justify-center">
        <div
          ref={panelRef}
          className="relative w-full rounded-b-xl bg-[#F1F5F9] py-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.07),0_2px_4px_-2px_rgba(0,0,0,0.05)]"
          role="dialog"
          aria-label="Menu Produk"
        >
          <div className="max-w-7xl mx-auto">
            {/* Header: PRODUK + Close — di dalam kartu, sejajar dengan konten */}
            <div className="flex items-center justify-between px-5">
              <div className="text-sm font-bold uppercase tracking-wide text-[#1E1E1E]">
                Produk
              </div>

              <div className="">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                  aria-label="Tutup menu"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            <div className="flex">
              {/* 3 columns */}
              <div className="flex w-full justify-center flex-1 overflow-hidden px-5 pb-5 pt-1">
                {/* Level 1: Kategori Utama */}
                <nav
                  className="min-w-56 shrink-0 pr-3"
                  aria-label="Kategori utama"
                >
                  <ul className="space-y-0.5">
                    {megaMenuData.map((item) => {
                      const isActive = item.id === level1Id;
                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            onClick={() => {
                              setLevel1Id(item.id);
                              setLevel2Id(null);
                              setExpandedDetailIndex(-1);
                            }}
                            className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                              isActive
                                ? "bg-white font-medium text-gray-900"
                                : "text-gray-600 hover:bg-white hover:text-gray-800"
                            }`}
                          >
                            <span>{item.label}</span>
                            {item.children?.length ? (
                              <ChevronRight className="size-4 shrink-0 opacity-70" />
                            ) : null}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Level 2 (Tengah): hanya muncul jika menu Level 1 sudah dipilih (diklik) */}
                {activeCategory && activeCategory.children?.length > 0 ? (
                  <div className="flex min-w-0 flex-1 flex-col bg-white p-3 rounded-lg shrink-0 w-[max(18rem,280px)]">
                    {/* Header (SMARTGOV + subtitle) */}
                    {activeChild?.contentTitle != null && (
                      <div className="mb-4 flex items-center gap-3 pb-4">
                        <div
                          className="flex size-9 shrink-0 items-center justify-center rounded-md"
                          style={{
                            background:
                              "linear-gradient(135deg, #3b82f6 50%, #f97316 50%)",
                          }}
                          aria-hidden
                        />
                        <div>
                          <p className="text-sm font-bold uppercase tracking-wide text-gray-900">
                            {activeChild.contentTitle}
                          </p>
                          {activeChild.contentSubtitle && (
                            <p className="text-xs text-[#62748E]">
                              {activeChild.contentSubtitle}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    <nav
                      className="flex-1 overflow-auto"
                      aria-label="Sub kategori"
                    >
                      <ul className="space-y-0.5">
                        {activeCategory.children.map((child) => {
                          const isActive = child.id === level2Id;
                          return (
                            <li key={child.id}>
                              <button
                                type="button"
                                onClick={() => {
                                  setLevel2Id(child.id);
                                  setExpandedDetailIndex(-1);
                                }}
                                className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                                  isActive
                                    ? "bg-[#F1F5F9] font-medium text-gray-900"
                                    : "text-gray-600 hover:bg-[#F1F5F9] hover:text-gray-800"
                                }`}
                              >
                                <span className="line-clamp-2">
                                  {child.label}
                                </span>
                                {child.details?.length ? (
                                  <ChevronRight className="size-4 shrink-0 text-gray-400" />
                                ) : null}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </nav>
                  </div>
                ) : null}

                {/* Level 3 (Kanan): link ke halaman produk dengan tab sesuai detail yang diklik */}
                {activeChild && details.length > 0 && activeCategory ? (
                  <div
                    className="min-w-0 flex-1 pl-4 shrink-0 w-[min(22rem,100%)]"
                    aria-label="Detail fitur"
                  >
                    <div className="rounded-lg bg-white p-4">
                      <ul>
                        {(() => {
                          const selection = getProductDetailSelectionFromMegaMenu(
                            activeCategory.id,
                            activeChild.id
                          );
                          const baseUrl = selection
                            ? getProductPageUrl(locale, activeCategory.id, selection.subMenuId)
                            : getProductPageUrl(locale, activeCategory.id);
                          return details.map((detail, idx) => (
                            <DetailSection
                              key={idx}
                              detail={detail}
                              detailIndex={idx}
                              isExpanded={expandedDetailIndex === idx}
                              onToggle={() =>
                                setExpandedDetailIndex((i) =>
                                  i === idx ? -1 : idx,
                                )
                              }
                              productPageUrl={idx > 0 ? `${baseUrl}?tab=${idx}` : baseUrl}
                              onClose={onClose}
                              accentBlue={ACCENT_BLUE}
                            />
                          ));
                        })()}
                      </ul>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DetailSection({
  detail,
  isExpanded,
  onToggle,
  productPageUrl,
  onClose,
  accentBlue,
}: {
  detail: MegaMenuDetail;
  detailIndex?: number;
  isExpanded: boolean;
  onToggle: () => void;
  productPageUrl: string;
  onClose: () => void;
  accentBlue: string;
}) {
  const hasItems = detail.items.length > 0;
  return (
    <li className="py-1 first:pt-0 last:pb-0">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggle}
          className="flex flex-1 items-center justify-between gap-3 rounded-lg px-2 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          aria-expanded={isExpanded}
        >
          <span className="line-clamp-2">{detail.title}</span>
          {hasItems ? (
            isExpanded ? (
              <ChevronUp className="size-4 shrink-0 text-gray-400" />
            ) : (
              <ChevronDown className="size-4 shrink-0 text-gray-400" />
            )
          ) : null}
        </button>
        <Link
          href={productPageUrl}
          onClick={onClose}
          className="shrink-0 rounded px-2 py-2 text-xs font-medium transition hover:bg-gray-100"
          style={{ color: accentBlue }}
        >
          Lihat →
        </Link>
      </div>
      {hasItems && isExpanded && (
        <ul className="px-2 pb-3 pt-1">
          {detail.items.map((item, i) => (
            <li key={i}>
              <Link
                href={productPageUrl}
                onClick={onClose}
                className="flex cursor-pointer items-start gap-2 py-1.5 text-sm transition hover:opacity-80"
                style={{ color: accentBlue }}
              >
                <span
                  className="mt-1.5 size-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: accentBlue }}
                />
                <span>{item}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
