import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )auth_token=([^;]+)'));
  return match ? match[2] : null;
}

export function setAuthToken(token: string, maxAge: number = 86400): void {
  if (typeof window === 'undefined') return;
  document.cookie = `auth_token=${token}; path=/; max-age=${maxAge}`;
}
