export type LanguageCode = "en" | "si" | "ta";

export interface NewsCategory {
  id: number;
  name: string;
  slug: string;
}

export interface NewsAttachment {
  id: number;
  title: string;
  file: string;
  file_url: string | null;
  file_type: string | null;
}

export interface NewsArticle {
  id: number | string;
  category: NewsCategory | null;
  status: string;
  priority: string;
  is_featured: boolean;
  hero_image: string | null;
  hero_image_url: string | null;
  published_at: string | null;
  expires_at: string | null;
  title: string | null;
  slug: string | null;
  summary: string | null;
  content: string | null;
  image_alt_text: string | null;
  seo_title: string | null;
  seo_description: string | null;
  attachments: NewsAttachment[];
  created_at: string;
  updated_at: string;
}

export interface NewsApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NewsArticle[];
}

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "https://pasiperera.pythonanywhere.com/api/v1"
).replace(/\/$/, "");

function buildApiUrl(
  path: string,
  parameters: Record<string, string | undefined>,
): string {
  const url = new URL(`${API_BASE_URL}${path}`);

  Object.entries(parameters).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
}

function normalizeArticle(item: any): NewsArticle {
  const attachments: NewsAttachment[] = [];
  if (Array.isArray(item.attachments)) {
    item.attachments.forEach((att: any, idx: number) => {
      attachments.push({
        id: att.id || idx + 1,
        title: att.title || att.attachment_title || "Official document",
        file: att.file || att.download_url || "",
        file_url: att.file_url || att.download_url || null,
        file_type: att.file_type || "PDF",
      });
    });
  } else if (item.attachment_title || item.download_url) {
    attachments.push({
      id: 1,
      title: item.attachment_title || "Official press release / attachment",
      file: item.download_url || "",
      file_url: item.download_url || null,
      file_type: item.file_type || "PDF",
    });
  }

  return {
    id: item.id || 0,
    category: item.category
      ? (typeof item.category === "object"
          ? item.category
          : { id: 1, name: item.category_label || item.category, slug: item.category })
      : null,
    status: item.status || "published",
    priority: item.priority || "normal",
    is_featured: Boolean(item.is_featured),
    hero_image: item.image_url || item.hero_image || null,
    hero_image_url: item.image_url || item.hero_image_url || null,
    published_at: item.published_date || item.published_at || item.created_at || new Date().toISOString(),
    expires_at: item.expires_at || null,
    title: item.title || "",
    slug: item.slug || `news-${item.id}`,
    summary: item.summary || "",
    content: item.content || item.summary || "",
    image_alt_text: item.image_alt || item.image_alt_text || item.title || "",
    seo_title: item.seo_title || item.title || "",
    seo_description: item.seo_description || item.summary || "",
    attachments,
    created_at: item.created_at || new Date().toISOString(),
    updated_at: item.updated_at || new Date().toISOString(),
  };
}

async function parseNewsResponse(response: Response): Promise<NewsApiResponse> {
  if (!response.ok) {
    throw new Error(`Unable to load news. Server returned ${response.status}.`);
  }

  const data: any = await response.json();

  if (Array.isArray(data)) {
    const results = data.map(normalizeArticle);
    return {
      count: results.length,
      next: null,
      previous: null,
      results,
    };
  }

  if (data && Array.isArray(data.articles)) {
    const results = data.articles.map(normalizeArticle);
    return {
      count: results.length,
      next: null,
      previous: null,
      results,
    };
  }

  if (data && Array.isArray(data.results)) {
    const results = data.results.map(normalizeArticle);
    return {
      count: data.count || results.length,
      next: data.next || null,
      previous: data.previous || null,
      results,
    };
  }

  return { count: 0, next: null, previous: null, results: [] };
}

function isValidNewsArticle(article: NewsArticle): boolean {
  return Boolean(
    article.title && article.slug && (article.summary || article.content),
  );
}

export async function getNews(
  language: LanguageCode = "en",
): Promise<NewsApiResponse> {
  const response = await fetch(
    buildApiUrl("/news/", {
      lang: language,
    }),
    {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    },
  );

  return parseNewsResponse(response);
}

export async function getLatestNews(
  language: LanguageCode = "en",
  limit = 5,
): Promise<NewsArticle[]> {
  const response = await getNews(language);

  return response.results.filter(isValidNewsArticle).slice(0, limit);
}

export async function getFeaturedNews(
  language: LanguageCode = "en",
): Promise<NewsArticle[]> {
  const response = await fetch(
    buildApiUrl("/news/", {
      lang: language,
      featured: "true",
    }),
    {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    },
  );

  const data = await parseNewsResponse(response);

  return data.results.filter(
    (article) => article.title && article.summary && article.content,
  );
}

export async function getNewsById(
  id: number | string,
  language: LanguageCode = "en",
): Promise<NewsArticle> {
  const response = await fetch(
    buildApiUrl(`/news/${id}/`, {
      lang: language,
    }),
    {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("News article not found.");
    }

    throw new Error(
      `Unable to load the news article. Server returned ${response.status}.`,
    );
  }

  const raw = await response.json();
  return normalizeArticle(raw);
}

export async function getNewsBySlug(
  slug: string,
  language: LanguageCode = "en",
): Promise<NewsArticle | null> {
  const response = await getNews(language);

  return response.results.find((article) => article.slug === slug) ?? null;
}

export async function getRelatedNews(
  currentArticle: NewsArticle,
  language: LanguageCode = "en",
  limit = 3,
): Promise<NewsArticle[]> {
  const response = await getNews(language);

  return response.results
    .filter(isValidNewsArticle)
    .filter((article) => article.id !== currentArticle.id)
    .slice(0, limit);
}

export function formatNewsDate(
  value: string | null,
  locale = "en-GB",
): string | null {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value; // return raw string like "2026-03-12" if not parseable
  }

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function getNewsImageUrl(article: NewsArticle): string | null {
  return article.hero_image_url ?? article.hero_image;
}

export function getNewsImageAlt(article: NewsArticle): string {
  return article.image_alt_text ?? article.title ?? "Ministry news image";
}

export function getAbsoluteNewsUrl(url: string | null): string | null {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return url;
}
