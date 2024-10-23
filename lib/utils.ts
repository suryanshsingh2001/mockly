import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const truncateFileName = (name: string, maxLength: number = 20): string => {
  if (name.length <= maxLength) return name;
  const lastOfIndex = name.lastIndexOf(".");
  if (lastOfIndex === -1) return name.substring(0, maxLength - 3) + "...";
  const extension = name.slice(lastOfIndex + 1);
  const nameWithoutExtension = name.slice(0, lastOfIndex);

  if (nameWithoutExtension.length > maxLength - 3) {
    return `${nameWithoutExtension}...${extension}`;
  }
  const truncatedName = nameWithoutExtension.substring(
    0,
    maxLength - extension.length - 4
  );
  return `${truncatedName}...${extension}`;
};