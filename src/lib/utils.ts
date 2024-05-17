import type { ArticleData } from "@/interfaces/article.interface";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isMobile() {
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
}

export function titleToSlug(title: string) {
  return title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().replace(/ /g, "-").replace(/[^a-z0-9-]/g, "")
}

export function getBreadcrumbs(path: string) {
    const splitPath = path.split('/'); 
    if (path.endsWith("/")) splitPath.pop();
    if (splitPath[0] === "") splitPath.shift();
    
    return splitPath;
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function filterArticlesByCategory(articles: ArticleData[], category: string) {
  if (category === "Wszystko") return articles;
  return articles.filter(article => article.attributes.category.data.attributes.name === category);
}