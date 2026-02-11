import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { HeroCarousel } from "@/components/home/HeroCarousel";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
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

function VideoIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  );
}

function ArrowUpRightIcon({ className }: { className?: string }) {
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
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default async function HomePage() {
  const t = await getTranslations("home");
  const locale = await getLocale();

  const aboutParagraph =
    "Cartenz adalah Perusahaan Teknologi Nasionalis yang membantu para pemimpin daerah dalam membangun pemerintahan yang mampu mencapai tujuan melayani masyarakat secara optimal melalui semua instrumen pemerintahan, termasuk anggaran daerah (yang harus substansial), sumber daya manusia (yang harus berkualitas tinggi), dan sistem pendukung (yang harus unggul). Tujuannya adalah untuk mencapai tujuan ini secara efisien dalam hal biaya, waktu, dan sumber daya.";

  const stats = [
    { value: "500+", label: "Proyek Pemerintah Daerah" },
    { value: "50+", label: "Produk" },
    { value: "50+", label: "IT Partner di Indonesia" },
    { value: "300.000+", label: "Pengguna Public" },
    { value: "2.500.000+", label: "Layanan Tersubmit" },
    { value: "175+", label: "Klien" },
  ] as const;

  return (
    <div className="min-h-screen bg-white text-[#1E1E1E]">
      {/* Hero section: mobile full screen, konten tidak tertutup navbar */}
      <section className="relative min-h-[100dvh] min-h-[100vh] bg-[#1E1E1E] pt-[72px] md:min-h-[50vh] md:pt-0">
        <Image
          src="/assets/bgHalfHero.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-white/40" />
        <HeroCarousel locale={locale} />
      </section>

      {/* Tentang Kami section (bawah) - dua kolom seperti gambar */}
      <section className="bg-white px-6 py-12 lg:px-12 lg:py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Kolom kiri: judul, tombol, avatars */}
          <div className="flex flex-col justify-between">
            <div>
              <p
                className="text-[16px] font-normal leading-[100%] tracking-[0%] text-[#6B7280]"
                style={{
                  fontFamily:
                    "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
                }}
              >
                Tentang Kami
              </p>
              <h2
                className="mt-2 text-[32px] font-normal uppercase leading-[100%] tracking-[0%] md:text-[40px]"
                style={{
                  fontFamily:
                    "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
                }}
              >
                <span className="text-[#1E1E1E]">WE ARE </span>
                <span className="text-[#408FB4]">CARTENZ</span>
              </h2>
              <Link
                href={`/${locale}/tentang-kami`}
                className="mt-4 inline-flex w-max items-center gap-2 rounded-full border border-[#408FB4] bg-white px-4 py-2.5 text-[#408FB4] transition hover:bg-[#408FB4]/5"
                style={{
                  fontFamily:
                    "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
                  fontSize: "16px",
                }}
              >
                Tentang Kami
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="size-10 rounded-full border-2 border-white bg-[#408FB4]/20 shadow-sm"
                  />
                ))}
              </div>
              <span
                className="text-[16px] font-normal text-[#6B7280]"
                style={{
                  fontFamily:
                    "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
                }}
              >
                150+ karyawan
              </span>
            </div>
          </div>

          {/* Kolom kanan: paragraf + grid statistik 3 kolom */}
          <div className="flex flex-col">
            <p
              className="text-[16px] font-normal leading-[24px] tracking-[0%] text-[#374151]"
              style={{
                fontFamily:
                  "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
              }}
            >
              {aboutParagraph}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <p
                    className="text-[24px] font-black leading-[100%] tracking-[0%] text-[#1E1E1E]"
                    style={{
                      fontFamily:
                        "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
                    }}
                  >
                    {value}
                  </p>
                  <p
                    className="mt-1 text-[14px] font-normal leading-snug text-[#6B7280]"
                    style={{
                      fontFamily:
                        "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
                    }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Produk Section */}
      <section
        id="produk"
        className="scroll-mt-20 bg-white px-4 py-16 md:px-16 lg:px-24 xl:px-32"
      >
        <div className="mx-auto max-w-6xl">
          <p
            className="text-[16px] font-normal text-[#6B7280]"
            style={{
              fontFamily:
                "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
            }}
          >
            {t("produkSection.badge")}
          </p>
          <h2
            className="mt-2 text-2xl font-normal uppercase leading-tight text-[#1E1E1E] md:text-3xl"
            style={{
              fontFamily:
                "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
            }}
          >
            {t("produkSection.title")}
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {([1, 2, 3, 4, 5, 6] as const).map((i) => (
              <Link
                key={i}
                href={`/${locale}/produk`}
                className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] w-full bg-[#408FB4]/10">
                  <Image
                    src="/assets/produk1.png"
                    alt=""
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="flex items-start justify-between gap-3 p-4">
                  <div className="min-w-0 flex-1">
                    <p
                      className="font-semibold text-[#1E1E1E]"
                      style={{
                        fontFamily:
                          "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
                        fontSize: "15px",
                      }}
                    >
                      {t(`produkSection.product${i}Title`)}
                    </p>
                    <p
                      className="mt-1 text-[14px] font-normal text-[#6B7280]"
                      style={{
                        fontFamily:
                          "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
                      }}
                    >
                      {t(`produkSection.product${i}Category`)}
                    </p>
                  </div>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-[#408FB4] text-[#408FB4] transition group-hover:bg-[#408FB4] group-hover:text-white">
                    <ArrowUpRightIcon className="size-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href={`/${locale}/produk`}
              className="inline-flex items-center gap-2 rounded-full border border-[#408FB4] bg-white px-6 py-3 text-[#408FB4] transition hover:bg-[#408FB4]/5"
              style={{
                fontFamily:
                  "Avenir, Avenir Next, Segoe UI, system-ui, sans-serif",
                fontSize: "16px",
              }}
            >
              {t("produkSection.viewMore")}
              <ChevronRightIcon className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {/* <section
        id="pricing"
        className="scroll-mt-20 px-4 md:px-16 lg:px-24 xl:px-32"
      >
        <p className="mx-auto mt-28 w-max rounded-full border border-pink-800 bg-pink-950/70 px-10 py-2 text-center font-medium text-pink-500">
          {t("pricing.badge")}
        </p>
        <h2 className="mx-auto mt-4 text-center text-3xl font-semibold text-white">
          {t("pricing.title")}
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-slate-300">
          {t("pricing.subtext")}
        </p>

        <div className="mt-20 flex flex-wrap items-stretch justify-center gap-8">
          <div className="w-72 rounded-xl border border-pink-950 bg-pink-950/30 p-6 pb-16 text-center">
            <p className="font-semibold text-white">{t("pricing.basic")}</p>
            <h3 className="mt-2 text-3xl font-semibold text-white">
              $29
              <span className="text-sm font-normal text-gray-500">
                {t("pricing.perMonth")}
              </span>
            </h3>
            <ul className="mt-6 list-none space-y-2 text-left text-slate-300">
              {[1, 2, 3, 4, 5].map((i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckIcon className="size-4.5 shrink-0 text-pink-600" />
                  <span>{t(`pricing.basicFeature${i}`)}</span>
                </li>
              ))}
            </ul>
            <Link
              href={`/${locale}/hubungi-kami`}
              className="mt-7 block w-full rounded-md bg-pink-500 py-2.5 font-medium transition hover:bg-pink-600"
            >
              {t("pricing.getStarted")}
            </Link>
          </div>

          <div className="relative w-72 rounded-xl border border-pink-950 bg-pink-950 p-6 pb-16 text-center">
            <p className="absolute -top-3.5 left-3.5 rounded-full bg-pink-400 px-3 py-1 text-sm text-white">
              {t("pricing.popular")}
            </p>
            <p className="font-semibold text-white">{t("pricing.pro")}</p>
            <h3 className="mt-2 text-3xl font-semibold text-white">
              $79
              <span className="text-sm font-normal text-gray-500">
                {t("pricing.perMonth")}
              </span>
            </h3>
            <ul className="mt-6 list-none space-y-2 text-left text-slate-300">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckIcon className="size-4.5 shrink-0 text-pink-600" />
                  <span>{t(`pricing.proFeature${i}`)}</span>
                </li>
              ))}
            </ul>
            <Link
              href={`/${locale}/hubungi-kami`}
              className="mt-7 block w-full rounded-md bg-white py-2.5 font-medium text-pink-600 transition hover:bg-slate-200"
            >
              {t("pricing.getStarted")}
            </Link>
          </div>

          <div className="w-72 rounded-xl border border-pink-950 bg-pink-950/30 p-6 pb-16 text-center">
            <p className="font-semibold text-white">
              {t("pricing.enterprise")}
            </p>
            <h3 className="mt-2 text-3xl font-semibold text-white">
              $199
              <span className="text-sm font-normal text-gray-500">
                {t("pricing.perMonth")}
              </span>
            </h3>
            <ul className="mt-6 list-none space-y-2 text-left text-slate-300">
              {[1, 2, 3, 4, 5].map((i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckIcon className="size-4.5 shrink-0 text-pink-600" />
                  <span>{t(`pricing.enterpriseFeature${i}`)}</span>
                </li>
              ))}
            </ul>
            <Link
              href={`/${locale}/hubungi-kami`}
              className="mt-7 block w-full rounded-md bg-pink-500 py-2.5 font-medium transition hover:bg-pink-600"
            >
              {t("pricing.getStarted")}
            </Link>
          </div>
        </div>
      </section> */}

      {/* Contact Section */}
      {/* <section className="px-4 md:px-16 lg:px-24 xl:px-32">
        <p className="mx-auto mt-28 w-max rounded-full border border-pink-800 bg-pink-950/70 px-10 py-2 text-center font-medium text-pink-500">
          {t("contact.badge")}
        </p>
        <h2 className="mx-auto mt-4 text-center text-3xl font-semibold text-white">
          {t("contact.title")}
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-slate-300">
          {t("contact.subtext")}
        </p>

        <form
          action="#"
          className="mx-auto mt-16 grid w-full max-w-2xl gap-5 text-slate-300 sm:grid-cols-2"
        >
          <div>
            <label htmlFor="contact-name" className="mb-2 block font-medium">
              {t("contact.nameLabel")}
            </label>
            <div className="flex items-center rounded-lg border border-slate-700 pl-3 focus-within:border-pink-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="size-5 shrink-0 text-slate-500"
                aria-hidden
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder={t("contact.namePlaceholder")}
                className="w-full border-0 bg-transparent p-3 outline-none"
              />
            </div>
          </div>
          <div>
            <label htmlFor="contact-email" className="mb-2 block font-medium">
              {t("contact.emailLabel")}
            </label>
            <div className="flex items-center rounded-lg border border-slate-700 pl-3 focus-within:border-pink-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="size-5 shrink-0 text-slate-500"
                aria-hidden
              >
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                <rect x="2" y="4" width="20" height="16" rx="2" />
              </svg>
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder={t("contact.emailPlaceholder")}
                className="w-full border-0 bg-transparent p-3 outline-none"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="contact-message" className="mb-2 block font-medium">
              {t("contact.messageLabel")}
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={8}
              placeholder={t("contact.messagePlaceholder")}
              className="w-full resize-none rounded-lg border border-slate-700 bg-transparent p-3 outline-none focus:border-pink-500"
            />
          </div>
          <button
            type="submit"
            className="flex w-max items-center gap-2 rounded-full bg-pink-600 px-10 py-3 text-white transition hover:bg-pink-700"
          >
            {t("contact.submit")}
            <ArrowRightIcon className="size-5" />
          </button>
        </form>
      </section> */}

      {/* CTA Section */}
      {/* <div className="mx-4 mt-40 flex max-w-5xl flex-col items-center justify-between gap-6 rounded-2xl bg-linear-to-b from-pink-900 to-pink-950 p-6 py-16 text-white md:mx-auto md:flex-row md:pl-20">
        <div>
          <h2 className="bg-linear-to-r from-white to-pink-400 bg-clip-text text-3xl font-semibold text-transparent md:text-4xl md:leading-tight">
            {t("cta.title")}
          </h2>
          <p className="mt-2 bg-linear-to-r from-white to-pink-400 bg-clip-text text-lg text-transparent">
            {t("cta.subtext")}
          </p>
        </div>
        <Link
          href={`/${locale}/hubungi-kami`}
          className="mt-4 rounded-full bg-white px-12 py-3 text-sm text-slate-800 transition hover:bg-slate-200"
        >
          {t("cta.button")}
        </Link>
      </div> */}
    </div>
  );
}
