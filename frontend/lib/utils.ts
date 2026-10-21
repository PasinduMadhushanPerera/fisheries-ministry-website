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

/**
 * Dynamically resolves the API base URL depending on whether code runs in browser or server.
 * On browser in production (e.g. fisheries.gov.lk or https), uses window.location.origin.
 * In local dev, adapts to localhost:8000 or LAN IP.
 */
export function getApiBaseUrl(): string {
  // 1. If running in browser:
  if (typeof window !== "undefined" && window.location) {
    const protocol = window.location.protocol || "http:"
    const host = window.location.hostname

    // In production (HTTPS, or on fisheries.gov.lk or any public domain):
    // All API calls and media requests go through Nginx on port 443 / window.location.origin
    if (
      protocol === "https:" ||
      host.includes("fisheries.gov.lk") ||
      (!host.includes("localhost") && !host.includes("127.0.0.1") && !host.startsWith("192.168."))
    ) {
      return window.location.origin
    }

    // In local dev, check if environment variable is set
    const envUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      process.env.NEXT_PUBLIC_BACKEND_URL

    if (envUrl && !envUrl.includes("fisheries.gov.lk")) {
      return envUrl.replace(/\/api\/v1\/?$/, "").replace(/\/+$/, "")
    }

    if (host === "127.0.0.1" || host === "localhost") {
      return "http://127.0.0.1:8000"
    }

    if (host) {
      return `http://${host}:8000`
    }
  }

  // 2. If running on server (SSR in Node.js):
  const envUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL

  if (envUrl) {
    return envUrl.replace(/\/api\/v1\/?$/, "").replace(/\/+$/, "")
  }

  return "http://127.0.0.1:8000"
}

/**
 * Ensures media/image/document URLs resolve to absolute full-resolution paths in backend/media/.
 */
export function getAbsoluteMediaUrl(url?: string | null): string {
  if (!url) return ""
  const backendBase = getApiBaseUrl()

  if (url.startsWith("http://") || url.startsWith("https://")) {
    // If URL targets backend port 8000 (e.g. 127.0.0.1:8000 or localhost:8000 or LAN IP), rewrite to backendBase
    if (url.includes(":8000/")) {
      return url.replace(/^https?:\/\/[^/]+:8000/, backendBase)
    }
    // If in production on HTTPS or fisheries.gov.lk, rewrite old insecure HTTP or 192.168 URLs to backendBase
    if (backendBase.startsWith("https://") && (url.includes("192.168.") || url.includes("localhost") || url.includes("127.0.0.1"))) {
      return url.replace(/^https?:\/\/[^/]+/, backendBase)
    }
    return url
  }

  // If path starts with /media/ or /static/
  if (url.startsWith("/media/") || url.startsWith("/static/")) {
    return `${backendBase}${url}`
  }

  const cleanPath = url.replace(/^\//, "")
  const mediaSubfolders = [
    "documents/",
    "downloads/",
    "rti/",
    "news/",
    "press_releases/",
    "events/",
    "gallery/",
    "videos/",
    "home/",
    "about/",
    "divisions/",
    "institutions/",
    "statistics/",
    "notices/",
    "general/",
    "media/",
  ]

  if (mediaSubfolders.some((subfolder) => cleanPath.startsWith(subfolder))) {
    if (cleanPath.startsWith("media/")) {
      return `${backendBase}/${cleanPath}`
    }
    return `${backendBase}/media/${cleanPath}`
  }

  if (url.startsWith("/")) {
    return url
  }
  return `/${url}`
}