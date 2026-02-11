import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { getArticles } from "@/lib/strapi";

export default async function ArticlesPage() {
  const t = await getTranslations("articles");
  const locale = await getLocale();
  const { data: articles } = await getArticles();
  const list = Array.isArray(articles) ? articles : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        {t("listTitle")}
      </h1>
      {list.length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-400">
          Belum ada artikel. Sambungkan ke Strapi dan buat content type &quot;article&quot; dengan field title, slug, excerpt.
        </p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((item: { id: number; documentId?: string; attributes?: { title?: string; slug?: string; excerpt?: string } }) => {
            const attrs = item.attributes ?? {};
            const slug = attrs.slug ?? String(item.id);
            return (
              <li key={item.id}>
                <Link
                  href={`/${locale}/artikel/${slug}`}
                  className="block rounded-lg border border-zinc-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800"
                >
                  <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {attrs.title ?? "Untitled"}
                  </h2>
                  <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {attrs.excerpt ?? ""}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
