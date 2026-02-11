export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiArticleAttributes {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiArticle {
  id: number;
  documentId: string;
  attributes: StrapiArticleAttributes;
}

export type StrapiArticleList = StrapiArticle[];
export type StrapiArticleSingle = StrapiArticle;
