import type { Seo } from "./page.ts";

export interface Aricle {
  data: ArticleData[];
  meta: Meta;
}

export interface ArticleData {
  id: number;
  attributes: DatumAttributes;
}

export interface DatumAttributes {
  title: string;
  categories: {
    data: CategoryData[];
  };
  content: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  slug: null;
  image: Image;
  seo: Seo;
}

export interface Image {
  data: Data;
}

export interface Data {
  id: number;
  attributes: DataAttributes;
}

export interface DataAttributes {
  name: string;
  alternativeText: string;
  caption: null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Formats {
  thumbnail: Small;
  small: Small;
}

export interface Small {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface CategoryData {
  id: number;
  attributes: CategoryAttributes;
}

export interface CategoryAttributes {
  name: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}
