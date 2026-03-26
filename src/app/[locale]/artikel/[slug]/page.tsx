import Link from "next/link";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import { getArticleBySlug } from "@/lib/strapi";
import {
  getArticleByLocalSlug,
  getRelatedArticles,
  toArticleSlug,
} from "@/data/articleData";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const AUTHOR = "Administrator";

function formatArticleDate(locale: string) {
  return new Date(2026, 0, 20).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ArticleBodyLocal({ judul }: { judul: string }) {
  if (judul === "Mengenal Apa Itu Pajak Daerah") {
    return (
      <>
        <p className="mb-6 leading-relaxed text-[#1E1E1E]">
          Pajak yang kita bayar tidak hanya mengisi kas negara. Dari pajak, jalan raya yang kita lewati, penerangan jalan, taman kota, hingga layanan kesehatan masyarakat turut dibiayai. Salah satu jenis pajak yang langsung mendukung pembangunan di tingkat daerah adalah pajak daerah.
        </p>
        <h2 className="mb-3 text-xl font-bold text-[#1E1E1E]">
          Mengenal Pajak Daerah: Kontribusi Nyata untuk Pembangunan Lokal
        </h2>
        <p className="mb-6 leading-relaxed text-[#1E1E1E]">
          Berbeda dengan pajak pusat yang dikelola pemerintah pusat, pajak daerah merupakan sumber pendapatan yang dikelola oleh pemerintah provinsi dan kabupaten/kota. Hasil pemungutan pajak daerah dialokasikan untuk membiayai urusan dan layanan publik di wilayah tersebut, sehingga pajak daerah menjadi &quot;bahan bakar&quot; utama pembangunan di tingkat provinsi maupun kabupaten/kota.
        </p>
        <h2 className="mb-3 text-xl font-bold text-[#1E1E1E]">
          Apa Itu Pajak Daerah?
        </h2>
        <p className="leading-relaxed text-[#1E1E1E]">
          Pajak daerah adalah kontribusi wajib kepada daerah yang terutang oleh orang pribadi atau badan yang bersifat memaksa berdasarkan peraturan perundang-undangan, dengan tidak mendapat imbalan secara langsung dan digunakan untuk keperluan daerah bagi sebesar-besarnya kemakmuran rakyat. Dengan kata lain, pajak daerah dipungut oleh pemerintah daerah dan hasilnya masuk ke Anggaran Pendapatan dan Belanja Daerah (APBD) untuk membiayai berbagai fasilitas dan layanan publik di daerah tersebut.
        </p>
      </>
    );
  }
  return (
    <p className="leading-relaxed text-[#1E1E1E]">
      Konten artikel ini dapat ditambahkan. Saat ini artikel menggunakan data lokal dari daftar artikel.
    </p>
  );
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const decodedSlug = decodeURIComponent(slug);

  const localArticle = getArticleByLocalSlug(decodedSlug);

  if (localArticle) {
    const related = getRelatedArticles(localArticle.judul, 3);
    const dateStr = formatArticleDate(locale);

    return (
      <div className="bg-background text-foreground">
        <div className="mx-auto max-w-7xl px-4 mt-[72px] pt-10 pb-12 md:px-16 md:pt-[80px] lg:px-24 xl:px-32">
          <article className="w-full">
            <Link
              href={`/${locale}/artikel`}
              className="text-sm text-[#6B7280] hover:text-[#408FB4]"
            >
              {localArticle.kategori}
            </Link>
            <h1 className="mt-1 text-2xl font-normal md:text-3xl lg:text-4xl">
              {localArticle.judul}
            </h1>

            <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-lg bg-[#F3F4F6]">
              <Image
                src={localArticle.image}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          </article>

          <div className="grid gap-10 mt-8 lg:grid-cols-[1fr_320px] lg:gap-12">
            <div>
              <p className="text-sm text-[#6B7280]">
                {AUTHOR} | {dateStr}
              </p>
              <div className="mt-6">
                <ArticleBodyLocal judul={localArticle.judul} />
              </div>
            </div>

            <aside className="lg:pt-0">
              <h2 className="text-lg font-bold uppercase tracking-tight">
                Artikel Lainnya
              </h2>
              <ul className="mt-4 space-y-4">
                {related.map((item) => (
                  <li key={item.judul}>
                    <Link
                      href={`/${locale}/artikel/${toArticleSlug(item.judul)}`}
                      className="flex gap-3 rounded-lg transition hover:opacity-90"
                    >
                      <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-[#F3F4F6]">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="112px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-medium">
                          {item.judul}
                        </p>
                        <p className="mt-1 text-xs text-[#6B7280]">
                          {AUTHOR} | {dateStr}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </div>
    );
  }

  const { data } = await getArticleBySlug(decodedSlug);

  if (!data || !data.attributes) {
    notFound();
  }

  const attrs = data.attributes as {
    title?: string;
    content?: string;
    excerpt?: string;
    publishedAt?: string;
  };
  const dateStr = attrs.publishedAt
    ? new Date(attrs.publishedAt).toLocaleDateString(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : formatArticleDate(locale);
  const related = getRelatedArticles(attrs.title ?? "", 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 pt-[72px] pb-16 md:px-16 md:pt-[80px] lg:px-24 xl:px-32">
        <article className="w-full">
          <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
            {attrs.title ?? "Untitled"}
          </h1>
        </article>

        <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-12">
          <div>
            <p className="mt-4 text-sm text-[#6B7280]">
              {AUTHOR} | {dateStr}
            </p>
            <div
              className="prose prose-zinc mt-6 dark:prose-invert"
              dangerouslySetInnerHTML={{
                __html:
                  typeof attrs.content === "string"
                    ? attrs.content
                    : attrs.excerpt ?? "",
              }}
            />
          </div>

          <aside>
            <h2 className="text-lg font-bold uppercase tracking-tight">
              Artikel Lainnya
            </h2>
            <ul className="mt-4 space-y-4">
              {related.map((item) => (
                <li key={item.judul}>
                  <Link
                    href={`/${locale}/artikel/${toArticleSlug(item.judul)}`}
                    className="flex gap-3 rounded-lg transition hover:opacity-90"
                  >
                    <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-[#F3F4F6]">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-medium">
                        {item.judul}
                      </p>
                      <p className="mt-1 text-xs text-[#6B7280]">
                        {AUTHOR} | {dateStr}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}
