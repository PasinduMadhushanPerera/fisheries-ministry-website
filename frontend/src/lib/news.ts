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
  id: number;
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
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api/v1"
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

async function parseNewsResponse(response: Response): Promise<NewsApiResponse> {
  if (!response.ok) {
    throw new Error(`Unable to load news. Server returned ${response.status}.`);
  }

  const data: unknown = await response.json();

  if (Array.isArray(data)) {
    return {
      count: data.length,
      next: null,
      previous: null,
      results: data as NewsArticle[],
    };
  }

  return data as NewsApiResponse;
}

function isValidNewsArticle(article: NewsArticle): boolean {
  return Boolean(
    article.title && article.slug && article.summary && article.content,
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
  limit = 3,
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

  return response.json() as Promise<NewsArticle>;
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
    .filter(
      (article) =>
        article.id !== currentArticle.id &&
        article.category?.id === currentArticle.category?.id,
    )
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
    return null;
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
  return (
    article.image_alt_text?.trim() ||
    article.title?.trim() ||
    "Ministry news image"
  );
}

export function getAbsoluteNewsUrl(value: string | null): string | null {
  if (!value) {
    return null;
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  try {
    const backendOrigin = new URL(API_BASE_URL).origin;

    return new URL(value, backendOrigin).toString();
  } catch {
    return value;
  }
}
