"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { StrategicConsultingProject } from "@/data/strategicConsultingProjectsData";
import "swiper/css";
import "swiper/css/navigation";

const SECTION_BADGE = "Project";
const SECTION_TITLE = "HASIL TERBAIK YANG KAMI BERIKAN";
const CARDS_PER_VIEW = 3;

type Props = {
  projects: StrategicConsultingProject[];
};

function ProjectCard({ project }: { project: StrategicConsultingProject }) {
  const hasLogo = Boolean(project.logoUrl);
  const hasImage = Boolean(project.imageUrl);

  return (
    <div className="flex h-full flex-col rounded-xl bg-white p-5 border border-[#CAD5E2]">
      <div className="mb-4 flex items-center gap-3">
        {hasLogo && (
          <div className="relative h-5 w-4 shrink-0 md:h-10 md:w-8">
            <Image
              src={project.logoUrl}
              alt=""
              fill
              className="object-contain object-left"
              sizes="56px"
              unoptimized={project.logoUrl.startsWith("http")}
            />
          </div>
        )}
        <h3 className="text-lg">{project.name}</h3>
      </div>
      <Link
        href={project.productUrl || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="relative mt-auto block aspect-video w-full overflow-hidden rounded-lg bg-[#F1F5F9]"
        aria-label={`Buka website ${project.name}`}
      >
        {hasImage ? (
          <Image
            src={project.imageUrl}
            alt={project.name}
            fill
            className="object-cover transition hover:opacity-95"
            sizes="(max-width: 768px) 100vw, 33vw"
            unoptimized={project.imageUrl.startsWith("http")}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            No preview
          </div>
        )}
      </Link>
    </div>
  );
}

export function ProductStrategicProjectsSection({ projects }: Props) {
  if (!projects.length) return null;

  return (
    <section
      className="projects-swiper px-4 py-10 md:px-8 md:py-14 lg:px-12"
      style={{ backgroundColor: "#F1F5F9" }}
      aria-label="Proyek unggulan"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-normal text-[#6B7280]">
              {SECTION_BADGE}
            </p>
            <h2 className="mt-1 text-2xl font-normal uppercase leading-tight md:text-3xl">
              {SECTION_TITLE}
            </h2>
          </div>
          <div className="mt-4 flex items-center gap-2 sm:mt-0">
            <button
              type="button"
              className="projects-swiper-prev flex size-10 cursor-pointer items-center justify-center rounded-full transition hover:bg-black/5"
              aria-label="Proyek sebelumnya"
            >
              <ChevronLeft className="size-10" />
            </button>
            <button
              type="button"
              className="projects-swiper-next flex size-10 cursor-pointer items-center justify-center rounded-full transition hover:bg-black/5"
              aria-label="Proyek berikutnya"
            >
              <ChevronRight className="size-10" />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: CARDS_PER_VIEW },
          }}
          navigation={{
            prevEl: ".projects-swiper-prev",
            nextEl: ".projects-swiper-next",
          }}
          className="overflow-hidden!"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <div className="h-full">
                <ProjectCard project={project} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
