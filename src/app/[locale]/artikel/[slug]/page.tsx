import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { getArticleBySlug } from "@/lib/strapi";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const t = await getTranslations("articles");
  const locale = await getLocale();
  const { data } = await getArticleBySlug(slug);

  if (!data || !data.attributes) {
    notFound();
  }

  const attrs = data.attributes as {
    title?: string;
    content?: string;
    excerpt?: string;
    publishedAt?: string;
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href={`/${locale}/artikel`}
        className="mb-6 inline-block text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        ← {t("backToList")}
      </Link>
      <article>
        <h1 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          {attrs.title ?? "Untitled"}
        </h1>
        {attrs.publishedAt && (
          <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
            {new Date(attrs.publishedAt).toLocaleDateString(locale)}
          </p>
        )}
        <div
          className="prose prose-zinc dark:prose-invert"
          dangerouslySetInnerHTML={{
            __html:
              typeof attrs.content === "string"
                ? attrs.content
                : attrs.excerpt ?? "",
          }}
        />
      </article>
    </div>
  );
}
