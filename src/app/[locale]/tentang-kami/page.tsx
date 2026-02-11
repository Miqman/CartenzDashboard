import { getTranslations } from "next-intl/server";

export default async function AboutPage() {
  const t = await getTranslations("about");
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        {t("title")}
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400">{t("content")}</p>
    </div>
  );
}
