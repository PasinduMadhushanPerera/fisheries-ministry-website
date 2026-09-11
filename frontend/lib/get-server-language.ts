import { cookies } from "next/headers"

export async function getServerLanguage(
  searchParams?: Promise<{ lang?: string }> | { lang?: string } | null
): Promise<string> {
  // 1. Check URL searchParams first if explicitly provided
  if (searchParams) {
    try {
      const resolved = await searchParams
      if (resolved?.lang && ["en", "si", "ta"].includes(resolved.lang.toLowerCase())) {
        return resolved.lang.toLowerCase()
      }
    } catch {
      // Ignored
    }
  }

  // 2. Check cookies (persists across all page navigations, browser back/forward, and direct link clicks)
  try {
    const cookieStore = await cookies()
    const cookieLang = cookieStore.get("fisheries-language")?.value?.toLowerCase()
    if (cookieLang && ["en", "si", "ta"].includes(cookieLang)) {
      return cookieLang
    }
  } catch {
    // In static rendering or where headers aren't available
  }

  // 3. Fallback default
  return "en"
}
