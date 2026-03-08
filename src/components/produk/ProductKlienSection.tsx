"use client";

import Image from "next/image";
import { useState } from "react";

const LOGOS_PER_PAGE = 10;

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export interface ProductKlienSectionProps {
  badge: string;
  title: string;
  clientList: { name: string; logoUrl: string }[];
  stats?: { value: string; label: string }[];
}

export function ProductKlienSection({
  badge,
  title,
  clientList,
  stats,
}: ProductKlienSectionProps) {
  const [clientPage, setClientPage] = useState(0);

  const totalClientPages = Math.max(
    1,
    Math.ceil(clientList.length / LOGOS_PER_PAGE),
  );
  const canPrevClient = clientPage > 0;
  const canNextClient = clientPage < totalClientPages - 1;
  const sliceStart = clientPage * LOGOS_PER_PAGE;
  const clientsToShow = clientList.slice(
    sliceStart,
    sliceStart + LOGOS_PER_PAGE,
  );

  return (
    <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-normal text-[#6B7280]">{badge}</p>
          <h2 className="mt-1 text-2xl font-normal uppercase leading-tight text-[#1E1E1E] md:text-3xl">
            {title}
          </h2>
        </div>
        {clientList.length > LOGOS_PER_PAGE && (
          <div
            className="mt-4 flex items-center gap-2 sm:mt-0"
            role="group"
            aria-label="Navigasi logo klien"
          >
            <button
              type="button"
              onClick={() => setClientPage((p) => Math.max(0, p - 1))}
              disabled={!canPrevClient}
              className="flex size-10 cursor-pointer items-center justify-center rounded-full text-[#1E1E1E] transition hover:bg-black/5 disabled:pointer-events-none disabled:opacity-40"
              aria-label="Logo klien sebelumnya"
            >
              <ChevronLeftIcon className="size-10" />
            </button>
            <button
              type="button"
              onClick={() =>
                setClientPage((p) => Math.min(totalClientPages - 1, p + 1))
              }
              disabled={!canNextClient}
              className="flex size-10 cursor-pointer items-center justify-center rounded-full text-[#1E1E1E] transition hover:bg-black/5 disabled:pointer-events-none disabled:opacity-40"
              aria-label="Logo klien berikutnya"
            >
              <ChevronRightIcon className="size-10" />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-8 gap-x-10 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
        {clientsToShow.map((client, i) => (
          <div
            key={`${client.name}-${sliceStart + i}`}
            className="flex flex-col items-center gap-2 text-center"
          >
            <div className="relative h-16 w-16 md:h-20 md:w-20">
              <Image
                src={client.logoUrl || "/assets/galeri5.jpg"}
                alt={client.name}
                fill
                className="object-contain"
                sizes="80px"
              />
            </div>
            <p className="text-sm font-normal text-[#1E1E1E]">{client.name}</p>
          </div>
        ))}
      </div>

      {stats && stats.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div
              key={`klien-stat-${i}`}
              className="flex items-center gap-8 md:gap-12"
            >
              {i > 0 && (
                <span className="hidden h-8 w-px bg-[#E5E7EB] md:inline-block" />
              )}
              <div className="text-center">
                <p className="text-[40px] font-extrabold text-[#408FB4]">
                  {stat.value}
                </p>
                <p className="mt-1 text-base font-normal text-[#6B7280]">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
