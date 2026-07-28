export type LanguageCode = "en" | "si" | "ta";

export interface NoticeCategory {
  id: number;
  name: string;
  slug: string;
}

export interface NoticeAttachment {
  id: number;
  title: string;
  file: string;
  file_url: string;
}

export interface Notice {
  id: number;
  category: NoticeCategory;
  status: string;
  priority: string;
  published_at: string;
  expires_at: string | null;
  title: string;
  slug: string;
  summary: string;
  content: string;
  seo_title: string;
  seo_description: string;
  attachments: NoticeAttachment[];
  created_at: string;
  updated_at: string;
}

export interface NoticeApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Notice[];
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api/v1";

export async function getNotices(
  language: LanguageCode = "en",
): Promise<NoticeApiResponse> {
  const response = await fetch(
    `${API_BASE_URL}/notices/?lang=${language}`,
    {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Unable to load notices. Server returned ${response.status}.`,
    );
  }

  return response.json() as Promise<NoticeApiResponse>;
}

export async function getNoticeById(
  id: number | string,
  language: LanguageCode = "en",
): Promise<Notice> {
  const response = await fetch(
    `${API_BASE_URL}/notices/${id}/?lang=${language}`,
    {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Notice not found.");
    }

    throw new Error(
      `Unable to load the notice. Server returned ${response.status}.`,
    );
  }

  return response.json() as Promise<Notice>;
}