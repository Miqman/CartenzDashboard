import { fetchApi, getStrapiMediaUrl } from "@/lib/strapi";

const POPULATE_TENTANG_KAMI =
  "populate[0]=logo&populate[1]=tim_kami_members&populate[2]=tim_kami_members.photo&populate[3]=bento_images";

const DEFAULT_MEMBER_PHOTO = "/assets/timKamiFrame.png";

type StrapiTimKamiMemberRaw = {
  name?: string;
  jabatan?: string;
  photo?: { url?: string } | null;
};

type StrapiNilaiIntiItemRaw = {
  letter?: string;
  title?: string;
  description?: string;
  icon?: string;
};

type StrapiTentangKamiRaw = {
  sejarah?: string;
  visi?: string;
  nilai_inti_title?: string;
  nilai_inti_items?: StrapiNilaiIntiItemRaw[];
  tim_kami_subtitle?: string;
  tim_kami_members?: StrapiTimKamiMemberRaw[];
  bento_images?: Array<{ url?: string }>;
  logo?: { url?: string } | null;
};

export type TimKamiMember = {
  name: string;
  jabatan: string;
  photo: string;
};

export type NilaiIntiItem = {
  letter: string;
  title: string;
  description: string;
  icon: string;
};

export type TentangKamiPageCmsData = {
  sejarah: string;
  visi: string;
  nilaiIntiTitle: string;
  nilaiIntiItems: NilaiIntiItem[];
  timKamiSubtitle: string;
  timKamiMembers: TimKamiMember[];
  bentoImages: string[];
  logo: string;
};

function normalizeDoc<T extends object>(raw: unknown): T | null {
  if (raw === null || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;
  if (obj.attributes && typeof obj.attributes === "object") {
    return { ...(obj as object), ...(obj.attributes as object) } as T;
  }
  return obj as T;
}

export async function getTentangKamiPageData(options?: {
  revalidate?: number;
  timeoutMs?: number;
  retries?: number;
}): Promise<TentangKamiPageCmsData | null> {
  try {
    const requestOptions = {
      revalidate: options?.revalidate ?? 60,
      timeoutMs: options?.timeoutMs ?? 30000,
      retries: options?.retries ?? 4,
    };

    const res = await fetchApi<{ data: unknown }>(
      `tentang-kami?${POPULATE_TENTANG_KAMI}`,
      requestOptions,
    );
    const doc = normalizeDoc<StrapiTentangKamiRaw>(res?.data);
    if (!doc) return null;

    const members: TimKamiMember[] = Array.isArray(doc.tim_kami_members)
      ? doc.tim_kami_members.map((member) => {
          const photoUrl = getStrapiMediaUrl(member.photo ?? undefined);
          return {
            name: member.name?.trim() ?? "",
            jabatan: member.jabatan?.trim() ?? "",
            photo: photoUrl || DEFAULT_MEMBER_PHOTO,
          };
        })
      : [];

    const nilaiIntiItems: NilaiIntiItem[] = Array.isArray(doc.nilai_inti_items)
      ? doc.nilai_inti_items.map((item) => ({
          letter: item.letter?.trim() ?? "",
          title: item.title?.trim() ?? "",
          description: item.description?.trim() ?? "",
          icon: item.icon?.trim() ?? "",
        }))
      : [];

    const bentoImages: string[] = Array.isArray(doc.bento_images)
      ? doc.bento_images
          .map((image) => getStrapiMediaUrl(image))
          .filter((url) => Boolean(url))
      : [];

    return {
      sejarah: doc.sejarah?.trim() ?? "",
      visi: doc.visi?.trim() ?? "",
      nilaiIntiTitle: doc.nilai_inti_title?.trim() ?? "",
      nilaiIntiItems,
      timKamiSubtitle: doc.tim_kami_subtitle?.trim() ?? "",
      timKamiMembers: members,
      bentoImages,
      logo: getStrapiMediaUrl(doc.logo ?? undefined),
    };
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[getTentangKamiPageData] Gagal fetch:",
        err instanceof Error ? err.message : err,
      );
    }
    return null;
  }
}
