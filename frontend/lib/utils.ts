import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines conditional class names and resolves conflicting
 * Tailwind CSS utility classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Strips HTML tags and decodes common entities to return plain clean text.
 */
export function stripHtml(html?: string | null): string {
  if (!html) return ""
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim()
}

/**
 * Robustly extracts the clean 11-character YouTube video ID from any YouTube URL or string.
 */
export function extractYouTubeId(urlOrId?: string | null): string {
  if (!urlOrId) return ""
  const val = String(urlOrId).trim()

  // Direct 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(val)) {
    return val
  }

  // Common URL patterns
  const patterns = [
    /(?:v=|\/embed\/|youtu\.be\/|\/v\/|\/shorts\/|\/live\/)([a-zA-Z0-9_-]{11})/,
    /[?&]v=([a-zA-Z0-9_-]{11})/,
  ]

  for (const regex of patterns) {
    const match = val.match(regex)
    if (match && match[1]) {
      return match[1]
    }
  }

  return ""
}