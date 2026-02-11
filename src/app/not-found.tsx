import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        404 - Halaman tidak ditemukan
      </h1>
      <Link
        href="/id"
        className="mt-4 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
