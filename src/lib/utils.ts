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