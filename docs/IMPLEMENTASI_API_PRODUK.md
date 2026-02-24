# Ringkasan CMS Strapi (Produk) & Rencana Implementasi

## 1. Struktur API CMS yang dipakai (tanpa product-page)

### Single types (satu dokumen per produk)

| API | Path | Isi |
|-----|------|-----|
| **efd-page** | `GET /api/efd-page` | `Hero` (product-page.hero), `featuredClients` (relation → client) |
| **palapa-page** | `GET /api/palapa-page` | `Hero`, `Klien` (palapa-klien-section: badge, title, rating, cards[]) |
| **smartgov-page** | `GET /api/smartgov-page` | `Hero`, `featuredClients` |
| **strategic-consulting-page** | `GET /api/strategic-consulting-page` | `Hero`, `ProjectCard[]`, `clients` (relation) |

### Collection types (detail kategori per produk)

| API | Path | Isi |
|-----|------|-----|
| **efd-detail-category** | `GET /api/efd-detail-categories?sort=order&populate=...` | categoryId, label, megaMenuChildId, sidebarAsFlat, order, subMenus (product-page.sub-menu) |
| **palapa-detail-category** | `GET /api/palapa-detail-categories?sort=order&populate=...` | Sama |
| **smartgov-detail-category** | `GET /api/smartgov-detail-categories?sort=order&populate=...` | Sama |

Strategic consulting **tidak** punya detail-category (halaman hanya Hero + ProjectCard + clients).

### Komponen shared

- **product-page.hero**: title, paragraphs[], demoUrl, logo (media), heroImage (media)
- **product-page.sub-menu**: subSlug, title, tabs[] (tabLabel, content)
- **product-page.tab-content**: description, image (media), details (JSON array), blocks (dynamic zone: paragraph, heading, list)
- **strategic-project**: logo, image, name, product_url
- **palapa-klien-section**: badge, title, rating, cards[] (palapa-klien-card: image, logo, title, nama_daerah, produk_url)

---

## 2. Frontend – 4 produk besar

- **smartgov** → smartgov-page + smartgov-detail-categories
- **efd** → efd-page + efd-detail-categories
- **palapa** → palapa-page + palapa-detail-categories
- **strategic-consulting** → strategic-consulting-page (tanpa detail-categories)

Halaman: `/[locale]/produk`, `/[locale]/produk/[productSlug]`, `/[locale]/produk/[productSlug]/[subSlug]`.

---

## 3. Perubahan kode (yang bertambah & yang berubah)

### 3.1 Yang bertambah (file baru)

- `src/lib/strapi/products/types.ts` – Tipe response per API produk (hero, clients, projects, palapa klien).
- `src/lib/strapi/products/helpers.ts` – Normalisasi & mapping: normalizeDoc, map blocks/categories ke format frontend (ProductHeroData, ProductDetailData).
- `src/lib/strapi/products/efd.ts` – `getEfdPage()`, `getEfdDetailCategories()`.
- `src/lib/strapi/products/palapa.ts` – `getPalapaPage()`, `getPalapaDetailCategories()`.
- `src/lib/strapi/products/smartgov.ts` – `getSmartgovPage()`, `getSmartgovDetailCategories()`.
- `src/lib/strapi/products/strategic-consulting.ts` – `getStrategicConsultingPage()`.
- `src/lib/strapi/products/index.ts` – `getProductPageData(productSlug)` yang memanggil API per produk dan mengembalikan `{ hero, detail, clients?, strategicProjects?, palapaKlien? }`.

### 3.2 Yang berubah

- **src/lib/strapi.ts**
  - Hapus: `getProductPageBySlug`, semua import/type/fungsi yang khusus product-page (termasuk mapStrapiBlockToContentBlock, mapStrapiCategoriesToDetailData, fillDefaultDetailImages, isStrapiReachable).
  - Tetap: `getStrapiUrl`, `getStrapiMediaUrl`, `fetchApi`, `getGlobal`, `getHomepage`, `getProducts`, `getClients`, `getGallery`, `getArticles`, `getArticleBySlug`.
  - Opsional: export `FetchApiOptions` dan helper `normalizeDoc` jika dipakai dari folder products.

- **src/app/[locale]/produk/[productSlug]/page.tsx**
  - Ganti `getProductPageBySlug(productSlug)` → `getProductPageData(productSlug)` dari `@/lib/strapi/products`.
  - Data: `strapiPage` dari `getProductPageData` dengan bentuk `{ hero, detail, clients?, strategicProjects?, palapaKlien? }`.
  - Tetap fallback ke `getProductDetailData(productSlug)` dan `getProductClients(productSlug)` jika Strapi kosong/error.

- **src/app/[locale]/produk/[productSlug]/[subSlug]/page.tsx**
  - Sama: ganti ke `getProductPageData(productSlug)`, pakai `detail` + fallback lokal.

- **src/components/produk/ProductDetailPageClient.tsx**
  - Tambah props opsional: `initialStrategicProjects?`, `initialPalapaKlien?` (dari Strapi).
  - Jika ada, pakai itu; jika tidak, pakai data static (STRATEGIC_CONSULTING_PROJECTS, PALAPA_KLIEN_*).

- **src/types/strapi.ts**
  - Tetap pakai tipe product-page yang ada untuk mapping (StrapiProductPageHero, Block, SubMenu, Category). Bisa tambah tipe untuk strategic-project & palapa-klien dari CMS jika perlu.

---

## 4. Alur data setelah implementasi

1. Halaman server memanggil `getProductPageData(productSlug)`.
2. Di dalam `getProductPageData`: switch per slug, panggil getXxxPage() + getXxxDetailCategories() (kecuali strategic-consulting hanya page).
3. Mapping response Strapi → ProductHeroData, ProductDetailData, ProductClientsData, StrategicConsultingProject[], PalapaKlienSection.
4. Page meneruskan ke `ProductDetailPageClient` (hero, categories/detail, clients, projects, palapaKlien).
5. Client component render; jika dari Strapi kosong, fallback ke data static di frontend.

Dengan ini, pemanggilan API **tidak ditumpuk** di `strapi.ts` dan **dipisah per halaman produk** lewat folder `lib/strapi/products/`.
