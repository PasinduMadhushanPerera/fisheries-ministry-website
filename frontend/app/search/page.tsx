import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, FileText, Search } from "lucide-react"

import { Container } from "@/components/ui/container"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search services, opportunities, procurement tenders, recruitment vacancies, publications and resources provided by the Ministry of Fisheries.",
}

type SearchPageProps = {
  searchParams: Promise<{
    q?: string
    category?: string
  }>
}

type SearchResult = {
  id: string
  title: string
  summary: string
  href: string
  category: string
  keywords: string[]
}

const searchResults: SearchResult[] = [
  {
    id: "weather",
    title: "Marine Weather & Sea Forecast",
    summary:
      "View today's weather conditions, sea conditions, wind speeds, and ocean forecasts relevant to fisheries and marine activities.",
    href: "https://www.meteo.gov.lk",
    category: "Resources",
    keywords: [
      "weather",
      "forecast",
      "sea state",
      "waves",
      "wind",
      "marine",
      "meteorology",
      "coastal",
    ],
  },
  {
    id: "internal-affairs",
    title: "Internal Affairs Unit & Public Complaints",
    summary:
      "Submit complaints, report concerns, or contact the Ministry's Internal Affairs Unit regarding public services and governance oversight.",
    href: "https://www.publiccomplaint.gov.lk",
    category: "Support",
    keywords: [
      "internal affairs",
      "complaints",
      "public complaint",
      "grievances",
      "oversight",
      "integrity",
      "helpline",
    ],
  },
  {
    id: "local-training",
    title: "Local Fisheries Training",
    summary:
      "Browse local training courses, seamanship workshops and technical development programmes for Ministry staff and sector stakeholders.",
    href: "/local-training",
    category: "Opportunities",
    keywords: [
      "local",
      "training",
      "courses",
      "workshops",
      "capacity",
      "education",
      "skills",
      "seamanship",
    ],
  },
  {
    id: "foreign-training",
    title: "Foreign & Overseas Training",
    summary:
      "Discover international oceanography courses, overseas scholarships, bilateral technical seminars, and global ocean science fellowships.",
    href: "/foreign-training",
    category: "Opportunities",
    keywords: [
      "foreign",
      "overseas",
      "training",
      "scholarships",
      "fellowships",
      "oceanography",
      "jica",
      "norad",
      "itec",
    ],
  },
  {
    id: "procurement",
    title: "Procurement & Tenders Portal",
    summary:
      "Access official bidding documents, tender notices, harbour construction projects, equipment purchasing, and procurement announcements.",
    href: "/procurement",
    category: "Tenders",
    keywords: [
      "procurement",
      "tenders",
      "bids",
      "harbour",
      "contracts",
      "purchasing",
      "bidding",
      "cfhc",
    ],
  },
  {
    id: "recruitment",
    title: "Recruitment & Vacancies Portal",
    summary:
      "View public service job vacancies, gazette recruitment notices, research fellowships, and career application forms.",
    href: "/recruitment",
    category: "Careers",
    keywords: [
      "recruitment",
      "vacancies",
      "careers",
      "jobs",
      "gazette",
      "employment",
      "inspector",
      "research",
    ],
  },
  {
    id: "downloads-overview",
    title: "Forms & Downloads Centre",
    summary:
      "Browse official downloadable forms, application guides, circulars and public resources.",
    href: "/downloads",
    category: "Resources",
    keywords: [
      "downloads",
      "applications",
      "forms",
      "circulars",
      "documents",
    ],
  },
  {
    id: "about-ministry",
    title: "About the Ministry",
    summary:
      "Learn about the Ministry, its responsibilities, leadership, institutional structure and strategic direction.",
    href: "/about",
    category: "Ministry",
    keywords: [
      "about",
      "ministry",
      "leadership",
      "vision",
      "mission",
      "history",
    ],
  },
  {
    id: "institutions",
    title: "Institutions",
    summary:
      "Explore institutions operating within Sri Lanka’s fisheries, aquatic and ocean resources sector.",
    href: "/institutions",
    category: "Institutions",
    keywords: [
      "institutions",
      "agencies",
      "departments",
      "organizations",
      "nara",
      "naqda",
      "cfhc",
    ],
  },
  {
    id: "projects",
    title: "Projects and Programmes",
    summary:
      "Browse fisheries development projects, programmes and sector initiatives.",
    href: "/projects",
    category: "Projects",
    keywords: [
      "projects",
      "programmes",
      "development",
      "initiatives",
      "fisheries",
    ],
  },
  {
    id: "news",
    title: "News",
    summary:
      "Read the latest Ministry news, announcements and sector updates.",
    href: "/media-centre/news",
    category: "Media",
    keywords: [
      "news",
      "latest",
      "updates",
      "announcement",
      "media",
    ],
  },
  {
    id: "notices",
    title: "Notices",
    summary:
      "View public notices, service announcements and important Ministry updates.",
    href: "/media-centre/notices",
    category: "Media",
    keywords: [
      "notices",
      "public notice",
      "announcement",
      "updates",
      "media",
    ],
  },
  {
    id: "press-releases",
    title: "Press Releases",
    summary:
      "Access official press releases and media communications published by the Ministry.",
    href: "/media-centre/press-releases",
    category: "Media",
    keywords: [
      "press",
      "release",
      "media",
      "communication",
      "statement",
    ],
  },
  {
    id: "statistics",
    title: "Fisheries Statistics",
    summary:
      "Access statistical information and data resources relating to the fisheries sector.",
    href: "/statistics/at-a-glance",
    category: "Resources",
    keywords: [
      "statistics",
      "data",
      "export",
      "import",
      "fish production",
      "prices",
    ],
  },
  {
    id: "frequently-asked-questions",
    title: "Frequently Asked Questions",
    summary:
      "Find answers to common questions about Ministry services, applications and public information.",
    href: "/frequently-asked-questions",
    category: "Support",
    keywords: [
      "faq",
      "questions",
      "answers",
      "help",
      "support",
    ],
  },
  {
    id: "contact",
    title: "Contact the Ministry",
    summary:
      "Find Ministry contact information, departmental contacts and public inquiry options.",
    href: "/contact",
    category: "Contact",
    keywords: [
      "contact",
      "telephone",
      "email",
      "address",
      "inquiry",
    ],
  },
]

const categories = [
  "All",
  "Opportunities",
  "Tenders",
  "Careers",
  "Ministry",
  "Institutions",
  "Projects",
  "Media",
  "Resources",
  "Contact",
  "Support",
]

function normalizeText(value: string) {
  return value.trim().toLowerCase()
}

function createSearchHref(query: string, category: string) {
  const params = new URLSearchParams()

  if (query) {
    params.set("q", query)
  }

  if (category !== "All") {
    params.set("category", category)
  }

  const queryString = params.toString()

  return queryString ? `/search?${queryString}` : "/search"
}

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const params = await searchParams

  const query = params.q?.trim() ?? ""
  const selectedCategory =
    categories.find(
      (category) =>
        category.toLowerCase() ===
        params.category?.toLowerCase(),
    ) ?? "All"

  const normalizedQuery = normalizeText(query)

  const filteredResults = searchResults.filter((result) => {
    const matchesCategory =
      selectedCategory === "All" ||
      result.category === selectedCategory

    if (!matchesCategory) {
      return false
    }

    if (!normalizedQuery) {
      return true
    }

    const searchableContent = [
      result.title,
      result.summary,
      result.category,
      ...result.keywords,
    ]
      .join(" ")
      .toLowerCase()

    return searchableContent.includes(normalizedQuery)
  })

  return (
    <>
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb items={[{ label: "Search" }]} />

        <section className="relative overflow-hidden bg-[#061d24] text-white py-14 sm:py-18">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,197,94,0.16),transparent_32%),radial-gradient(circle_at_85%_25%,rgba(14,165,233,0.15),transparent_30%)]"
          />

          <Container className="relative z-10">
            <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-green-300">
                  Website search
                </p>

                <h1 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white">
                  Find opportunities, tenders and information
                </h1>

                <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-200">
                  Search Ministry training opportunities, procurement tenders, recruitment vacancies, resources, news, projects, laws and public information.
                </p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-md sm:p-7">
                <form role="search" action="/search" method="get">
                  <label htmlFor="main-search" className="text-sm font-semibold text-white">
                    What are you looking for?
                  </label>

                  <div className="mt-3 flex overflow-hidden rounded-xl bg-white shadow-lg focus-within:ring-4 focus-within:ring-green-300/40">
                    <input
                      id="main-search"
                      name="q"
                      type="search"
                      defaultValue={query}
                      maxLength={100}
                      autoComplete="off"
                      placeholder="Search training, tenders, vacancies, forms..."
                      className="min-h-12 min-w-0 flex-1 border-0 px-4 text-sm text-slate-950 outline-none placeholder:text-slate-500"
                    />

                    {selectedCategory !== "All" && (
                      <input type="hidden" name="category" value={selectedCategory} />
                    )}

                    <button
                      type="submit"
                      className="inline-flex min-h-12 min-w-12 items-center justify-center bg-[#256B29] px-5 font-semibold text-white transition hover:bg-[#1b4d1d] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 cursor-pointer"
                    >
                      <Search aria-hidden="true" className="h-5 w-5" />
                      <span className="sr-only">Search website</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-slate-50 py-12 sm:py-16 border-t border-slate-200">
          <Container>
            <div className="flex flex-col gap-5 border-b border-slate-200 pb-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#256B29]">
                  Search results
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">
                  {query ? `Results for “${query}”` : "Browse website content"}
                </h2>

                <p aria-live="polite" className="mt-2 text-xs sm:text-sm text-slate-600">
                  {filteredResults.length} {filteredResults.length === 1 ? "result" : "results"} found
                  {selectedCategory !== "All" ? ` in ${selectedCategory}` : ""}.
                </p>
              </div>

              {(query || selectedCategory !== "All") && (
                <Link
                  href="/search"
                  className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-xs font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-100"
                >
                  Clear search
                </Link>
              )}
            </div>

            <nav aria-label="Filter search results by category" className="py-7">
              <ul className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const active = selectedCategory === category

                  return (
                    <li key={category}>
                      <Link
                        href={createSearchHref(query, category)}
                        aria-current={active ? "page" : undefined}
                        className={`inline-flex min-h-10 items-center rounded-xl border px-4 text-xs font-extrabold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 ${
                          active
                            ? "border-[#256B29] bg-[#256B29] text-white shadow-xs"
                            : "border-slate-300 bg-white text-slate-700 hover:border-[#256B29] hover:text-[#256B29]"
                        }`}
                      >
                        {category}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            {filteredResults.length > 0 ? (
              <div className="grid gap-5">
                {filteredResults.map((result) => (
                  <article
                    key={result.id}
                    className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-xs transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg sm:p-7"
                  >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                      <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-[#256B29] border border-emerald-200/80">
                        <FileText aria-hidden="true" className="h-6 w-6" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-extrabold uppercase tracking-[0.13em] text-[#256B29]">
                          {result.category}
                        </p>

                        <h3 className="mt-2 text-lg sm:text-xl font-extrabold text-slate-950">
                          <Link
                            href={result.href}
                            className="transition hover:text-[#256B29] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                          >
                            {result.title}
                          </Link>
                        </h3>

                        <p className="mt-2.5 max-w-4xl text-xs sm:text-sm leading-relaxed text-slate-600 text-justify">
                          {result.summary}
                        </p>

                        <Link
                          href={result.href}
                          className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-lg font-bold text-xs text-[#256B29] transition hover:gap-3 hover:text-[#1b4d1d]"
                        >
                          <span>Explore page</span>
                          <ArrowRight aria-hidden="true" className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-xs sm:px-10">
                <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                  <Search aria-hidden="true" className="h-7 w-7" />
                </div>

                <h2 className="mt-5 text-xl font-extrabold text-slate-950">No results found</h2>

                <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm leading-relaxed text-slate-600">
                  We could not find content matching your search query. Check spelling or select a different category filter.
                </p>

                <Link
                  href="/search"
                  className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#256B29] px-6 text-xs font-extrabold text-white transition hover:bg-[#1b4d1d]"
                >
                  Browse all content
                </Link>
              </div>
            )}

            <div className="mt-10 rounded-3xl border border-emerald-200/80 bg-emerald-50/60 p-6 sm:p-8">
              <h3 className="text-base font-extrabold text-slate-950">Cannot find what you need?</h3>

              <p className="mt-2 max-w-3xl text-xs sm:text-sm leading-relaxed text-slate-700">
                Contact the Ministry information desk for direct assistance with training programmes, tenders, recruitment, or official public inquiries.
              </p>

              <Link
                href="/contact"
                className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#256B29] px-5 text-xs font-extrabold text-white transition hover:bg-[#1b4d1d]"
              >
                <span>Contact Ministry Helpdesk</span>
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}