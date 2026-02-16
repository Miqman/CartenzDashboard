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

export interface ClientItem {
  name: string;
  logoUrl: string;
}

export interface TestimoniItem {
  text: string;
  name: string;
  status: string;
  imageUrl: string;
}

export interface KlienSectionProps {
  klienBadge: string;
  klienTitle: string;
  clientList: ClientItem[];
  klienStats: { value: string; label: string }[];
  testimoniList: TestimoniItem[];
  avenirStyle: React.CSSProperties;
}

const plusJakartaStyle = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

export function KlienSectionClient({
  klienBadge,
  klienTitle,
  clientList,
  klienStats,
  testimoniList,
  avenirStyle,
}: KlienSectionProps) {
  const [clientPage, setClientPage] = useState(0);
  const [testimoniIndex, setTestimoniIndex] = useState(0);
  const [testimoniOpacity, setTestimoniOpacity] = useState(1);

  const clients = clientList.length >= 1 ? clientList : [
    { name: "DKI Jakarta", logoUrl: "/assets/dkiJakarta.png" },
    { name: "Kab. Klungkung", logoUrl: "/assets/kabKlungkung.png" },
    { name: "Kab. Badung", logoUrl: "/assets/kabBadung.png" },
    { name: "Kab. Bantul", logoUrl: "/assets/kabBantul.png" },
    { name: "Kota Denpasar", logoUrl: "/assets/kotaDenpasar.png" },
    { name: "Kota Bogor", logoUrl: "/assets/kotaBogor.png" },
    { name: "Kab. Bandung", logoUrl: "/assets/kabBandung.png" },
    { name: "Kab. Aceh Tamiang", logoUrl: "/assets/kabAcehTamiang.png" },
    { name: "Kab. Bogor", logoUrl: "/assets/kabBogor.png" },
    { name: "Kota Banjarmasin", logoUrl: "/assets/kotaBanjarmasin.png" },
  ];

  const totalClientPages = Math.max(1, Math.ceil(clients.length / LOGOS_PER_PAGE));
  const canPrevClient = clientPage > 0;
  const canNextClient = clientPage < totalClientPages - 1;
  const sliceStart = clientPage * LOGOS_PER_PAGE;
  const clientsToShow = clients.slice(sliceStart, sliceStart + LOGOS_PER_PAGE);

  const testimonials = testimoniList.length >= 2 ? testimoniList : [
    {
      text: "Hadirnya aplikasi Palapa adalah tonggak penting dalam transformasi digital di daerah kami. Melalui platform ini, kita meruntuhkan sekat-sekat birokrasi yang kaku dan menggantinya dengan sistem yang transparan, cepat, dan akuntabel.",
      name: "drs. H. Haerul Warisin, M.SI.",
      status: "Bupati Lombok Timur",
      imageUrl: "/assets/ulasanBupatiLombokTimur.png",
    },
    {
      text: "Kolaborasi dengan Cartenz membawa efisiensi dan transparansi dalam layanan publik. Kami berharap kerja sama ini terus berkembang untuk kemajuan daerah.",
      name: "Dr. Jane Doe, M.Si.",
      status: "Kepala Dinas Komunikasi dan Informatika",
      imageUrl: "/assets/ulasanBupatiLombokTimur.png",
    },
  ];

  const canPrevTestimoni = testimoniIndex > 0;
  const canNextTestimoni = testimoniIndex < testimonials.length - 1;
  const currentTestimoni = testimonials[testimoniIndex];

  const goToTestimoni = (direction: "prev" | "next") => {
    setTestimoniOpacity(0);
    setTimeout(() => {
      setTestimoniIndex((i) =>
        direction === "prev" ? Math.max(0, i - 1) : Math.min(testimonials.length - 1, i + 1)
      );
      setTestimoniOpacity(1);
    }, 200);
  };

  return (
    <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8">
      {/* Header: badge, title, dan arrow navigasi logo klien (di samping ujung kanan title) */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-normal text-[#6B7280]" style={avenirStyle}>
            {klienBadge}
          </p>
          <h2
            className="mt-1 text-2xl font-normal uppercase leading-tight text-[#1E1E1E] md:text-3xl"
            style={avenirStyle}
          >
            {klienTitle}
          </h2>
        </div>
        {clients.length > LOGOS_PER_PAGE && (
          <div className="mt-4 flex items-center gap-2 sm:mt-0" role="group" aria-label="Navigasi logo klien">
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
              onClick={() => setClientPage((p) => Math.min(totalClientPages - 1, p + 1))}
              disabled={!canNextClient}
              className="flex size-10 cursor-pointer items-center justify-center rounded-full text-[#1E1E1E] transition hover:bg-black/5 disabled:pointer-events-none disabled:opacity-40"
              aria-label="Logo klien berikutnya"
            >
              <ChevronRightIcon className="size-10" />
            </button>
          </div>
        )}
      </div>

      {/* Logo grid - 10 per halaman */}
      <div className="grid grid-cols-2 gap-8 gap-x-10 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
        {clientsToShow.map((client, i) => (
          <div
            key={`${client.name}-${sliceStart + i}`}
            className="flex flex-col items-center gap-2 text-center"
          >
            <div className="relative h-16 w-16 md:h-20 md:w-20">
              <Image
                src={client.logoUrl || "/assets/default-image.png"}
                alt={client.name}
                fill
                className="object-contain"
                sizes="80px"
              />
            </div>
            <p className="text-sm font-normal text-[#1E1E1E]" style={avenirStyle}>
              {client.name}
            </p>
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {klienStats.map((stat, i) => (
          <div key={`klien-stat-${i}`} className="flex items-center gap-8 md:gap-12">
            {i > 0 && <span className="hidden h-8 w-px bg-[#E5E7EB] md:inline-block" />}
            <div className="text-center">
              <p className="text-[40px] font-extrabold text-[#408FB4]">{stat.value}</p>
              <p className="mt-1 text-base font-normal text-[#6B7280]">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Testimoni / Ulasan - arrow vertikal di tengah, teks wrap alami */}
      <div className="flex items-center gap-4 md:gap-6">
        <button
          type="button"
          onClick={() => canPrevTestimoni && goToTestimoni("prev")}
          disabled={!canPrevTestimoni}
          className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#1E1E1E] transition hover:bg-black/5 disabled:pointer-events-none disabled:opacity-40"
          aria-label="Testimoni sebelumnya"
        >
          <ChevronLeftIcon className="size-10" />
        </button>

        <div className="min-w-0 flex-1 py-4 text-center">
          <div
            className="transition-opacity duration-300 ease-in-out"
            style={{ opacity: testimoniOpacity }}
          >
            <div className="min-h-[130px]">
              <p
                className="text-center text-2xl font-extralight! leading-[34px] tracking-normal text-[#1E1E1E]"
                style={plusJakartaStyle}
              >
                {currentTestimoni.text}
              </p>
            </div>
            <div className="mt-2 flex min-h-[76px] flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <div className="relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-full bg-gray-100">
                <Image
                  src={currentTestimoni.imageUrl || "/assets/ulasanBupatiLombokTimur.png"}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="60px"
                />
              </div>
              <div className="text-center sm:text-left">
                <p
                  className="text-base font-semibold leading-6 text-[#1E1E1E]"
                  style={plusJakartaStyle}
                >
                  {currentTestimoni.name}
                </p>
                <p
                  className="mt-0.5 text-sm font-normal leading-none text-[#6B7280]"
                  style={plusJakartaStyle}
                >
                  {currentTestimoni.status}
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => canNextTestimoni && goToTestimoni("next")}
          disabled={!canNextTestimoni}
          className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#1E1E1E] transition hover:bg-black/5 disabled:pointer-events-none disabled:opacity-40"
          aria-label="Testimoni berikutnya"
        >
          <ChevronRightIcon className="size-10" />
        </button>
      </div>
    </div>
  );
}
