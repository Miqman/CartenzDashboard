"use client";

import { useState, useRef, useEffect } from "react";
import { X, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { megaMenuData, type MegaMenuDetail } from "@/data/megaMenuData";

const ACCENT_BLUE = "#3b82f6";

type Props = {
  open: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement | null>;
};

export function MegaMenu({ open, onClose, anchorRef }: Props) {
  const [level1Id, setLevel1Id] = useState<string | null>(
    megaMenuData[0]?.id ?? null
  );
  const [level2Id, setLevel2Id] = useState<string | null>(
    megaMenuData[0]?.children?.[0]?.id ?? null
  );
  const [expandedDetailIndex, setExpandedDetailIndex] = useState<number>(0);
  const panelRef = useRef<HTMLDivElement>(null);

  const activeCategory = megaMenuData.find((c) => c.id === level1Id);
  const activeChild = activeCategory?.children.find((c) => c.id === level2Id);
  const details = activeChild?.details ?? [];

  // Set default selection when opening
  useEffect(() => {
    if (open && megaMenuData.length > 0) {
      setLevel1Id(megaMenuData[0].id);
      const firstChild = megaMenuData[0].children?.[0];
      setLevel2Id(firstChild?.id ?? null);
      setExpandedDetailIndex(0);
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
    <>
      {/* Backdrop: full width */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 bg-[#F1F5F9]"
        style={{ top: "var(--navbar-height, 72px)" }}
        aria-hidden
      />
      {/* Wrapper full width, isi mega menu (kartu) di tengah */}
      <div
        className="fixed inset-x-0 z-50 flex justify-center px-4"
        style={{ top: "var(--navbar-height, 72px)" }}
      >
        <div
          ref={panelRef}
          className="relative w-full rounded-b-xl bg-[#F1F5F9] py-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.07),0_2px_4px_-2px_rgba(0,0,0,0.05)]"
          role="dialog"
          aria-label="Menu Produk"
        >

          

          <div className="h-[min(70vh,520px)] max-w-7xl mx-auto">
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
              <div className="flex w-full flex-1 overflow-hidden px-5 pb-5 pt-1">
                {/* Level 1: Kategori Utama */}
                <nav
                  className="w-56 shrink-0 pr-3"
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
                              setLevel2Id(item.children?.[0]?.id ?? null);
                              setExpandedDetailIndex(0);
                            }}
                            className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                              isActive
                                ? "bg-white font-medium text-gray-900"
                                : "text-gray-600 hover:bg-white hover:text-gray-800"
                            }`}
                          >
                            <span>{item.label}</span>
                            <ChevronRight className="size-4 shrink-0 opacity-70" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Level 2 + 3: Header full-width, lalu dua kolom sejajar */}
                <div className="flex min-w-0 flex-1 flex-col bg-white p-3 rounded-lg">
                  {/* Header: mencakup Level 2 & 3 (SMARTGOV logo + subtitle) */}
                  {activeCategory && activeChild?.contentTitle && (
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
                          <p
                            className="text-xs text-[#62748E]"
                          >
                            {activeChild.contentSubtitle}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Dua kolom sejajar: Level 2 (sidebar) | Level 3 (detail) */}
                  <div className="flex min-h-0 min-w-0 flex-1 gap-0">
                    {/* Level 2: Sub-Kategori (left sidebar) */}
                    <nav
                      className="w-72 shrink-0 pr-4"
                      aria-label="Sub kategori"
                    >
                      {activeCategory && (
                        <ul className="space-y-0.5">
                          {activeCategory.children.map((child) => {
                            const isActive = child.id === level2Id;
                            return (
                              <li key={child.id}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setLevel2Id(child.id);
                                    setExpandedDetailIndex(0);
                                  }}
                                  className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                                    isActive
                                      ? "bg-[#F1F5F9] font-medium text-gray-900"
                                      : "text-gray-600 hover:bg-[#F1F5F9] hover:text-gray-800"
                                  }`}
                                >
                                  <span className="line-clamp-2">{child.label}</span>
                                  <ChevronRight className="size-4 shrink-0 text-gray-400" />
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </nav>

                    {/* Level 3: Detail Fitur (bordered accordion container) */}
                    <div
                      className="min-w-0 flex-1 pl-5"
                      aria-label="Detail fitur"
                    >
                      {details.length === 0 ? (
                        <p className="rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-6 text-sm text-gray-500">
                          Pilih sub-kategori untuk melihat detail.
                        </p>
                      ) : (
                        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                          <ul className="">
                            {details.map((detail, idx) => (
                              <DetailSection
                                key={idx}
                                detail={detail}
                                isExpanded={expandedDetailIndex === idx}
                                onToggle={() =>
                                  setExpandedDetailIndex((i) =>
                                    i === idx ? -1 : idx
                                  )
                                }
                                accentBlue={ACCENT_BLUE}
                              />
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            
          </div>
        </div>
      </div>
    </>
  );
}

function DetailSection({
  detail,
  isExpanded,
  onToggle,
  accentBlue,
}: {
  detail: MegaMenuDetail;
  isExpanded: boolean;
  onToggle: () => void;
  accentBlue: string;
}) {
  const hasItems = detail.items.length > 0;
  return (
    <li className="py-1 first:pt-0 last:pb-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 rounded-lg px-2 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-50"
      >
        <span className="line-clamp-2">{detail.title}</span>
        {hasItems ? (
          isExpanded ? (
            <ChevronUp className="size-4 shrink-0 text-gray-400" />
          ) : (
            <ChevronDown className="size-4 shrink-0 text-gray-400" />
          )
        ) : (
          <ChevronDown className="size-4 shrink-0 text-gray-400" />
        )}
      </button>
      {hasItems && isExpanded && (
        <ul className="px-2 pb-3 pt-1">
          {detail.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 py-1.5 text-sm"
              style={{ color: accentBlue }}
            >
              <span
                className="mt-1.5 size-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: accentBlue }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
