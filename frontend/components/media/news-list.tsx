"use client"

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  ArrowRight,
  CalendarDays,
  Download,
  FileText,
  LoaderCircle,
  Newspaper,
  Search,
  SearchX,
  X,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import {
  formatNewsDate,
  getAbsoluteNewsUrl,
  getNews,
  getNewsImageAlt,
  getNewsImageUrl,
  type NewsArticle,
} from "@/src/lib/news"

type NewsAttachment = {
  id: number | string
  title?: string | null
  file_type?: string | null
  file_url?: string | null
  file?: string | null
}

type NewsArticleWithDetails = NewsArticle & {
  content?: string | null
  attachments?: NewsAttachment[]
}

export function NewsList() {
  const [articles, setArticles] = useState<
    NewsArticle[]
  >([])

  const [activeCategory, setActiveCategory] =
    useState("All")

  const [searchQuery, setSearchQuery] =
    useState("")

  const [isLoading, setIsLoading] =
    useState(true)

  const [error, setError] = useState<
    string | null
  >(null)

  const [selectedArticle, setSelectedArticle] =
    useState<NewsArticle | null>(null)

  const closeButtonRef =
    useRef<HTMLButtonElement | null>(null)

  const loadNews = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await getNews("en")

      const loadedArticles =
        response.results ?? []

      setArticles(
        loadedArticles.filter(
          (article) =>
            article.title &&
            article.summary,
        ),
      )
    } catch (requestError) {
      console.error(
        "Failed to load news:",
        requestError,
      )

      setArticles([])
      setError(
        requestError instanceof Error
          ? requestError.message
          : "News could not be loaded at this time.",
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadNews()
  }, [loadNews])

  useEffect(() => {
    if (!selectedArticle) {
      return
    }

    const previousOverflow =
      document.body.style.overflow

    document.body.style.overflow = "hidden"

    window.setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 0)

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        setSelectedArticle(null)
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown,
    )

    return () => {
      document.body.style.overflow =
        previousOverflow

      document.removeEventListener(
        "keydown",
        handleKeyDown,
      )
    }
  }, [selectedArticle])

  const categories = useMemo(() => {
    const categoryNames = articles
      .map(
        (article) =>
          article.category?.name,
      )
      .filter(
        (
          category,
        ): category is string =>
          Boolean(category),
      )

    return [
      "All",
      ...Array.from(
        new Set(categoryNames),
      ).sort(),
    ]
  }, [articles])

  const filteredArticles = useMemo(() => {
    const keyword = searchQuery
      .trim()
      .toLowerCase()

    return articles.filter((article) => {
      const categoryName =
        article.category?.name ??
        "Ministry news"

      const matchesCategory =
        activeCategory === "All" ||
        categoryName === activeCategory

      const matchesSearch =
        keyword.length === 0 ||
        article.title
          ?.toLowerCase()
          .includes(keyword) ||
        article.summary
          ?.toLowerCase()
          .includes(keyword) ||
        categoryName
          .toLowerCase()
          .includes(keyword)

      return (
        matchesCategory &&
        matchesSearch
      )
    })
  }, [
    activeCategory,
    articles,
    searchQuery,
  ])

  function clearFilters() {
    setActiveCategory("All")
    setSearchQuery("")
  }

  return (
    <>
      <section
        aria-labelledby="news-filter-heading"
        className="border-y border-slate-200 bg-white py-8"
      >
        <Container>
          <h2
            id="news-filter-heading"
            className="sr-only"
          >
            Filter Ministry news
          </h2>

          <div className="flex flex-col gap-6">
            <div className="relative max-w-2xl">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
              />

              <label
                htmlFor="news-search"
                className="sr-only"
              >
                Search Ministry news
              </label>

              <input
                id="news-search"
                type="search"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(
                    event.target.value,
                  )
                }
                placeholder="Search news by title, description or category"
                className="min-h-12 w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-green-700 focus:ring-4 focus:ring-green-100"
              />
            </div>

            <div
              aria-label="News categories"
              className="flex flex-wrap gap-3"
            >
              {categories.map((category) => {
                const isActive =
                  activeCategory === category

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      setActiveCategory(
                        category,
                      )
                    }
                    aria-pressed={isActive}
                    className={
                      isActive
                        ? "inline-flex min-h-11 items-center justify-center rounded-full bg-green-700 px-5 text-sm font-bold text-white transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                        : "inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-5 text-sm font-bold text-slate-700 transition hover:border-green-700 hover:bg-green-50 hover:text-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                    }
                  >
                    {category}
                  </button>
                )
              })}
            </div>
          </div>
        </Container>
      </section>

      <section
        id="latest-news"
        aria-labelledby="latest-news-heading"
        className="scroll-mt-24 bg-slate-50 py-16 sm:py-20"
      >
        <Container>
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                Latest news
              </p>

              <h2
                id="latest-news-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
              >
                {activeCategory === "All"
                  ? "All News"
                  : activeCategory}
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                Browse the latest news,
                announcements and updates published
                by the Ministry.
              </p>
            </div>

            {!isLoading && !error ? (
              <p
                aria-live="polite"
                className="text-sm font-semibold text-slate-600"
              >
                {filteredArticles.length}{" "}
                {filteredArticles.length === 1
                  ? "article"
                  : "articles"}
              </p>
            ) : null}
          </div>

          {isLoading ? (
            <div
              role="status"
              aria-live="polite"
              className="mt-10 flex min-h-72 items-center justify-center rounded-3xl border border-slate-200 bg-white"
            >
              <div className="flex flex-col items-center gap-3 text-slate-600">
                <LoaderCircle
                  aria-hidden="true"
                  className="h-9 w-9 animate-spin text-green-700"
                />

                <p className="font-semibold">
                  Loading Ministry news
                </p>
              </div>
            </div>
          ) : null}

          {!isLoading && error ? (
            <div
              role="alert"
              className="mt-10 rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center"
            >
              <Newspaper
                aria-hidden="true"
                className="mx-auto h-10 w-10 text-green-700"
              />

              <h3 className="mt-5 text-2xl font-bold text-slate-950">
                News temporarily unavailable
              </h3>

              <p className="mx-auto mt-4 max-w-lg leading-7 text-slate-600">
                {error}
              </p>

              <button
                type="button"
                onClick={() =>
                  void loadNews()
                }
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-green-700 px-6 font-bold text-white transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
              >
                Try again
              </button>
            </div>
          ) : null}

          {!isLoading &&
          !error &&
          filteredArticles.length > 0 ? (
            <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filteredArticles.map(
                (article) => {
                  const imageUrl =
                    getAbsoluteNewsUrl(
                      getNewsImageUrl(
                        article,
                      ),
                    )

                  const publishedDate =
                    formatNewsDate(
                      article.published_at,
                    )

                  return (
                    <article
                      key={article.id}
                      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedArticle(
                            article,
                          )
                        }
                        aria-haspopup="dialog"
                        aria-label={`Read full news article: ${article.title}`}
                        className="block w-full text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-green-200"
                      >
                        <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-sky-100 via-green-50 to-white">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={getNewsImageAlt(
                                article,
                              )}
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <>
                              <div
                                aria-hidden="true"
                                className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-sky-200/50"
                              />

                              <div
                                aria-hidden="true"
                                className="absolute -bottom-14 -left-10 h-36 w-36 rounded-full bg-green-200/50"
                              />

                              <Newspaper
                                aria-hidden="true"
                                className="relative h-14 w-14 text-green-700"
                              />
                            </>
                          )}

                          <div className="absolute left-4 top-4">
                            <span className="rounded-full bg-green-700 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                              {article.category
                                ?.name ??
                                "Ministry news"}
                            </span>
                          </div>

                          {article.is_featured ? (
                            <div className="absolute right-4 top-4">
                              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-green-800 shadow-sm">
                                Featured
                              </span>
                            </div>
                          ) : null}
                        </div>
                      </button>

                      <div className="flex flex-1 flex-col p-6">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <CalendarDays
                            aria-hidden="true"
                            className="h-4 w-4 text-green-700"
                          />

                          <time
                            dateTime={
                              article.published_at ??
                              undefined
                            }
                          >
                            {publishedDate ??
                              "Date unavailable"}
                          </time>
                        </div>

                        <h3 className="mt-5 text-xl font-bold leading-8 text-slate-950">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedArticle(
                                article,
                              )
                            }
                            aria-haspopup="dialog"
                            className="text-left transition hover:text-green-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                          >
                            {article.title}
                          </button>
                        </h3>

                        <p className="mt-4 flex-1 leading-7 text-slate-600">
                          {article.summary}
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedArticle(
                              article,
                            )
                          }
                          aria-haspopup="dialog"
                          className="mt-6 inline-flex w-fit items-center gap-2 font-semibold text-green-700 transition hover:text-green-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                        >
                          Read More

                          <ArrowRight
                            aria-hidden="true"
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          />
                        </button>
                      </div>
                    </article>
                  )
                },
              )}
            </div>
          ) : null}

          {!isLoading &&
          !error &&
          filteredArticles.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <SearchX
                  aria-hidden="true"
                  className="h-8 w-8"
                />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-950">
                No news found
              </h3>

              <p className="mx-auto mt-4 max-w-lg leading-7 text-slate-600">
                Try another keyword or choose a
                different category to browse more
                Ministry news and updates.
              </p>

              {searchQuery ||
              activeCategory !== "All" ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 font-bold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                >
                  Clear filters
                </button>
              ) : null}
            </div>
          ) : null}
        </Container>
      </section>

      {selectedArticle ? (
        <NewsDrawer
          article={selectedArticle}
          onClose={() =>
            setSelectedArticle(null)
          }
          closeButtonRef={closeButtonRef}
        />
      ) : null}
    </>
  )
}

type NewsDrawerProps = {
  article: NewsArticle
  onClose: () => void
  closeButtonRef: React.RefObject<
    HTMLButtonElement | null
  >
}

function NewsDrawer({
  article,
  onClose,
  closeButtonRef,
}: NewsDrawerProps) {
  const detailedArticle =
    article as NewsArticleWithDetails

  const publishedDate = formatNewsDate(
    article.published_at,
  )

  const imageUrl = getAbsoluteNewsUrl(
    getNewsImageUrl(article),
  )

  const categoryName =
    article.category?.name ??
    "Ministry news"

  const content =
    detailedArticle.content?.trim() ?? ""

  const attachments =
    detailedArticle.attachments ?? []

  return (
    <div
      className="fixed inset-0 z-[9999] flex justify-end"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close news article"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-slate-950/70 backdrop-blur-sm"
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={`news-dialog-title-${article.id}`}
        className="relative z-10 flex h-full w-full max-w-2xl flex-col overflow-hidden bg-white shadow-2xl"
      >
        <div className="relative overflow-hidden bg-[linear-gradient(145deg,#071d24_0%,#0a322f_55%,#0a4350_100%)] px-6 py-7 text-white sm:px-8">
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/10 bg-white/[0.04]"
          />

          <div className="relative">
            <div className="flex items-start justify-between gap-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-green-100">
                  {categoryName}
                </span>

                {article.is_featured ? (
                  <span className="rounded-full border border-amber-200/30 bg-amber-200/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-amber-100">
                    Featured
                  </span>
                ) : (
                  <span className="rounded-full border border-green-200/30 bg-green-200/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-green-100">
                    Latest News
                  </span>
                )}
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close full news article"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
              >
                <X
                  aria-hidden="true"
                  className="h-6 w-6"
                />
              </button>
            </div>

            <p className="mt-7 text-sm font-semibold text-green-200">
              Official Ministry News
            </p>

            <h2
              id={`news-dialog-title-${article.id}`}
              className="mt-3 text-3xl font-bold leading-tight sm:text-4xl"
            >
              {article.title}
            </h2>

            <p className="mt-5 leading-7 text-slate-300">
              {article.summary}
            </p>

            {publishedDate ? (
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CalendarDays
                    aria-hidden="true"
                    className="h-4 w-4 text-green-200"
                  />

                  <span>
                    Published {publishedDate}
                  </span>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {imageUrl ? (
            <div className="border-b border-slate-200 bg-slate-100">
              <img
                src={imageUrl}
                alt={getNewsImageAlt(article)}
                className="max-h-80 w-full object-cover"
              />
            </div>
          ) : null}

          <div className="px-6 py-8 sm:px-8">
            <article>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                Full story
              </p>

              {content ? (
                <div
                  className="prose prose-slate mt-6 max-w-none prose-headings:text-slate-950 prose-p:leading-8 prose-a:font-semibold prose-a:text-green-700"
                  dangerouslySetInnerHTML={{
                    __html: content,
                  }}
                />
              ) : (
                <div className="mt-6 space-y-6 text-base leading-8 text-slate-700">
                  <p>{article.summary}</p>

                  <p>
                    Complete news information is not
                    currently available.
                  </p>
                </div>
              )}
            </article>

            {attachments.length > 0 ? (
              <section
                aria-labelledby={`news-attachments-${article.id}`}
                className="mt-12 border-t border-slate-200 pt-9"
              >
                <h3
                  id={`news-attachments-${article.id}`}
                  className="text-2xl font-bold text-slate-950"
                >
                  Downloads and Attachments
                </h3>

                <div className="mt-6 space-y-4">
                  {attachments.map(
                    (attachment) => {
                      const attachmentUrl =
                        getAbsoluteNewsUrl(
                          attachment.file_url ??
                            attachment.file ??
                            null,
                        )

                      if (!attachmentUrl) {
                        return null
                      }

                      return (
                        <a
                          key={attachment.id}
                          href={attachmentUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-center justify-between gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-green-300 hover:bg-green-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                        >
                          <div className="flex min-w-0 items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                              <FileText
                                aria-hidden="true"
                                className="h-6 w-6"
                              />
                            </div>

                            <div className="min-w-0">
                              <p className="truncate font-bold text-slate-950">
                                {attachment.title ??
                                  "News attachment"}
                              </p>

                              <p className="mt-1 text-sm text-slate-500">
                                {attachment.file_type ??
                                  "Document"}
                              </p>
                            </div>
                          </div>

                          <Download
                            aria-hidden="true"
                            className="h-5 w-5 shrink-0 text-green-700 transition group-hover:translate-y-0.5"
                          />
                        </a>
                      )
                    },
                  )}
                </div>
              </section>
            ) : null}
          </div>
        </div>

        <div className="border-t border-slate-200 bg-white px-6 py-5 sm:px-8">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex w-full items-center justify-center rounded-xl bg-green-700 px-6 py-3 font-bold text-white transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
          >
            Close news
          </button>
        </div>
      </section>
    </div>
  )
}