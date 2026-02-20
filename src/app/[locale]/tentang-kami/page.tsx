import Image from "next/image";
import {
  Award,
  Zap,
  Target,
  Users,
} from "lucide-react";
import { BentoGridClient } from "@/components/tentang-kami/BentoGrid.client";

const SEJARAH_TEXT =
  "Didirikan pada tahun 2014, Cartenz merupakan pionir dalam bidang e-Government, menyediakan solusi untuk lembaga-lembaga di semua tingkatan dalam memanfaatkan sistem informasi yang dapat diandalkan dan terintegrasi menggunakan model Penyediaan SaaS, yang bertujuan untuk mempromosikan pembangunan berkelanjutan dalam pemerintahan.";

const VISI_TEXT =
  "Menjadi perusahaan layanan teknologi paling berfokus pada pelanggan di Asia Tenggara";

const NILAI_INTI = [
  {
    letter: "P",
    title: "Profesional",
    description:
      "Kami memastikan setiap hasil kerja telah melalui proses kendali mutu yang ketat, menjaga kerahasiaan data klien, dan berkomunikasi dengan santun serta jujur dalam setiap situasi.",
    Icon: Award,
  },
  {
    letter: "E",
    title: "Efisien",
    description:
      "Kami terus mengevaluasi proses kerja untuk menghilangkan langkah-langkah birokrasi yang menghambat. Dengan menggunakan teknologi dan metode kerja yang cerdas, kami memastikan bahwa setiap tenaga, biaya, dan waktu yang dikeluarkan memberikan dampak maksimal.",
    Icon: Zap,
  },
  {
    letter: "S",
    title: "Sigap",
    description:
      "Ketika masalah muncul atau kebutuhan klien berubah, tim kami dengan cepat beradaptasi dan menghadirkan solusi tanpa menunda-nunda. Kami selalu selangkah lebih maju dalam mengantisipasi tantangan, memastikan bahwa setiap hambatan segera teratasi.",
    Icon: Target,
  },
  {
    letter: "I",
    title: "Sinergis",
    description:
      "Tidak ada sekat antar departemen di perusahaan kami. Kami aktif berbagi ide, saling mendukung satu sama lain, dan menghargai masukan dari setiap anggota tim.",
    Icon: Users,
  },
];

const TIM_KAMI = [
  { name: "Gito Wahyudi", jabatan: "Founder, Chairman" },
  // { name: "Daniel Winarto Alam", jabatan: "Board Member" },
  { name: "Andrew Ryan P", jabatan: "Managing Director" },
  { name: "Dewlady Pratama", jabatan: "Director" },
  // { name: "Enggar Baskoro", jabatan: "Director" },
  { name: "Muhammad Fajar", jabatan: "Consulting Head" },
];

export default function TentangKamiPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Section 1 - Info Sejarah Cartenz (pt agar konten tidak tertutup navbar transparan) */}
      <section className="px-4 mt-[72px] py-12 md:px-16 md:pt-[80px] lg:px-24 xl:px-32">
        <div className="mx-auto max-w-6xl text-center">
          <div className="relative mx-auto mb-8 inline-block h-24 w-[389px]">
            <Image
              src="/assets/logoCartenz2.png"
              alt="Cartenz Technology"
              fill
              className="object-contain object-center"
              sizes="389px"
              priority
            />
          </div>
          <p className="text-center text-base text-[#1E1E1E]">
            {SEJARAH_TEXT}
          </p>
        </div>
      </section>

      {/* Section 2 - Visi (bgHalfHero, height hug 269px, gap 10px) */}
      <section className="relative min-h-[269px] px-4 py-12 md:px-16 lg:px-24 xl:px-32">
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <Image
            src="/assets/bgHalfHero.jpg"
            alt=""
            fill
            className="object-cover object-center opacity-20"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-center gap-2.5 text-center">
          <p className="text-xl font-bold text-cartenz-black">Visi</p>
          <h2 className="text-3xl font-normal leading-tight text-cartenz-black md:text-[40px] md:leading-tight">
            {VISI_TEXT}
          </h2>
        </div>
      </section>

      {/* Section 3 - Nilai-nilai Inti Kami (PRESISI) */}
      <section className="bg-[#FAFAFA] px-4 py-16 md:px-16 lg:px-24 xl:px-32">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-4 md:gap-16">
          <div>
            <p className="text-base font-normal text-[#62748E]">
              Nilai-nilai Inti Kami
            </p>
            <h2 className="mt-1 text-4xl font-normal uppercase tracking-tight text-cartenz-black md:text-5xl">
              Presisi
            </h2>
          </div>
          <div className="flex flex-col gap-8 col-span-3">
            {NILAI_INTI.map((item, i) => (
              <div key={i} className="gap-4">
                <div className="flex h-8 w-8 shrink-0 mb-2 items-center justify-center rounded-lg border border-cartenz-blue text-cartenz-blue">
                  <item.Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-[20px] font-bold uppercase text-cartenz-black">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-base font-normal leading-6 text-cartenz-black">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 - Tim Kami */}
      <section className="px-4 py-16 md:px-16 lg:px-24 xl:px-32">
        <div className="mx-auto max-w-6xl">
          <p className="text-base font-normal text-[#62748E]">Tim Kami</p>
          <h2 className="mt-1 text-4xl font-normal leading-tight uppercase tracking-tight text-cartenz-black md:text-3xl">
            Berdedikasi untuk negeri
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TIM_KAMI.map((member, i) => (
              <div
                key={i}
                className="flex flex-col overflow-hidden rounded-lg"
              >
                <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-[#408FB4] to-emerald-600">
                  <Image
                    src="/assets/timKamiFrame.png"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="mt-3">
                  <p className="font-semibold text-[#1E1E1E]">{member.name}</p>
                  <p className="text-sm text-[#6B7280]">{member.jabatan}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 - Bento Grid Gambar */}
      <section className="px-4 py-16 md:px-16 lg:px-24 xl:px-32">
        <div className="mx-auto max-w-6xl">
          <BentoGridClient />
        </div>
      </section>
    </div>
  );
}
