This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Backend: Strapi Cloud

Dashboard ini mengambil konten dari **Strapi CMS**. Untuk sementara menggunakan **Strapi Cloud** (hosted).

### Setup Strapi Cloud

1. **Deploy CMS ke Strapi Cloud**
   - Buka [cloud.strapi.io](https://cloud.strapi.io) → login (GitHub/Google/GitLab).
   - Buat project baru, pilih plan (Free/Essential dll.).
   - Connect repo **cartenz-cms** (GitHub/GitLab). Strapi Cloud butuh **PostgreSQL**; pastikan project Strapi memakai `DATABASE_CLIENT=postgres` dan env database di-set di Strapi Cloud.
   - Setelah deploy selesai, catat **URL environment** (bentuk: `https://<project>.strapiapp.com`).

2. **Atur env di project ini (CartenzDashboard)**
   - Copy `.env.example` ke `.env.local` (atau edit `.env.local` yang sudah ada).
   - Set `NEXT_PUBLIC_STRAPI_URL` ke URL Strapi Cloud dari langkah 1, contoh:
     ```env
     NEXT_PUBLIC_STRAPI_URL=https://cartenz-cms.strapiapp.com
     ```
   - Jangan pakai trailing slash.

3. **Jalankan dashboard**
   ```bash
   npm install
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000). Konten artikel dll. diambil dari API Strapi Cloud.

### Development lokal (tanpa Strapi Cloud)

Kalau mau pakai Strapi lokal (`cartenz-cms` jalan di `http://localhost:1337`), set di `.env.local`:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
