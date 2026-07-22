import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  FileText,
  Search,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search services, information, publications and resources provided by the Ministry of Fisheries, Aquatic and Ocean Resources.",
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
    id: "service-overview",
    title: "Ministry Services",
    summary:
      "Browse public services, applications, registrations, licences and fisheries-related support.",
    href: "/services",
    category: "Services",
    keywords: [
      "services",
      "applications",
      "registration",
      "licence",
      "public services",
    ],
  },
  {
    id: "citizen-services",
    title: "Citizen Services",
    summary:
      "Access fisheries-related information and services intended for citizens and fishing communities.",
    href: "/services/citizen-services",
    category: "Services",
    keywords: [
      "citizen",
      "fisher",
      "community",
      "assistance",
      "services",
    ],
  },
  {
    id: "business-services",
    title: "Business Services",
    summary:
      "Find information for businesses operating within the fisheries and aquatic resources sector.",
    href: "/services/business-services",
    category: "Services",
    keywords: [
      "business",
      "company",
      "industry",
      "commercial",
      "services",
    ],
  },
  {
    id: "licensing-permits",
    title: "Licensing and Permits",
    summary:
      "View information relating to fisheries licences, permits, application procedures and requirements.",
    href: "/services/licensing-and-permits",
    category: "Services",
    keywords: [
      "licence",
      "license",
      "permit",
      "application",
      "fishing",
    ],
  },
  {
    id: "registration-services",
    title: "Registration Services",
    summary:
      "Find registration services and guidance for fisheries-related activities and vessels.",
    href: "/services/registration-services",
    category: "Services",
    keywords: [
      "registration",
      "register",
      "vessel",
      "boat",
      "fishing",
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
      "ministry",
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
    id: "publications",
    title: "Publications",
    summary:
      "Browse Ministry publications and fisheries-related information resources.",
    href: "/resources/publications",
    category: "Resources",
    keywords: [
      "publications",
      "documents",
      "resources",
      "information",
      "download",
    ],
  },
  {
    id: "reports",
    title: "Reports",
    summary:
      "Access reports relating to Ministry activities, fisheries development and aquatic resources.",
    href: "/resources/reports",
    category: "Resources",
    keywords: [
      "reports",
      "documents",
      "annual report",
      "resources",
      "download",
    ],
  },
  {
    id: "forms",
    title: "Forms",
    summary:
      "Find downloadable application forms and supporting documents for Ministry services.",
    href: "/resources/forms",
    category: "Resources",
    keywords: [
      "forms",
      "application",
      "download",
      "documents",
      "services",
    ],
  },
  {
    id: "statistics",
    title: "Fisheries Statistics",
    summary:
      "Access statistical information and data resources relating to the fisheries sector.",
    href: "/resources/statistics",
    category: "Resources",
    keywords: [
      "statistics",
      "data",
      "fisheries",
      "information",
      "resources",
    ],
  },
  {
    id: "laws-policies",
    title: "Laws and Policies",
    summary:
      "Browse laws, regulations, policies and official guidance relevant to fisheries and aquatic resources.",
    href: "/laws-and-policies",
    category: "Laws and Policies",
    keywords: [
      "laws",
      "policies",
      "regulations",
      "legal",
      "guidelines",
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
]

const categories = [
  "All",
  "Services",
  "Ministry",
  "Institutions",
  "Projects",
  "Media",
  "Resources",
  "Laws and Policies",
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

      <main
        id="main-content"
        tabIndex={-1}
        className="outline-none"
      >
        <section className="relative overflow-hidden bg-[#061d24] text-white">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,197,94,0.16),transparent_32%),radial-gradient(circle_at_85%_25%,rgba(14,165,233,0.15),transparent_30%)]"
          />

          <div
            aria-hidden="true"
            className="absolute -left-24 top-20 h-72 w-72 rounded-full border border-white/10"
          />

          <div
            aria-hidden="true"
            className="absolute -right-20 bottom-8 h-64 w-64 rounded-full border border-white/10"
          />

          <Container className="relative py-16 sm:py-20 lg:py-24">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 text-sm text-slate-300"
            >
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link
                    href="/"
                    className="rounded-sm transition hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
                  >
                    Home
                  </Link>
                </li>

                <li aria-hidden="true">/</li>

                <li aria-current="page" className="text-white">
                  Search
                </li>
              </ol>
            </nav>

            <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-300">
                  Website search
                </p>

                <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
                  Find services and information
                </h1>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                  Search Ministry services, resources, news,
                  projects, laws and public information.
                </p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-md sm:p-7">
                <form
                  role="search"
                  action="/search"
                  method="get"
                >
                  <label
                    htmlFor="main-search"
                    className="text-sm font-semibold text-white"
                  >
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
                      placeholder="Search services, forms, reports..."
                      className="min-h-14 min-w-0 flex-1 border-0 px-5 text-base text-slate-950 outline-none placeholder:text-slate-500"
                    />

                    {selectedCategory !== "All" && (
                      <input
                        type="hidden"
                        name="category"
                        value={selectedCategory}
                      />
                    )}

                    <button
                      type="submit"
                      className="inline-flex min-h-14 min-w-14 items-center justify-center bg-[#388E3C] px-5 font-semibold text-white transition hover:bg-[#256B29] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-emerald-200"
                    >
                      <Search
                        aria-hidden="true"
                        className="h-5 w-5"
                      />

                      <span className="visually-hidden">
                        Search website
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Container>

          <svg
            aria-hidden="true"
            viewBox="0 0 1440 90"
            className="block w-full"
            preserveAspectRatio="none"
          >
            <path
              fill="#f8fafc"
              d="M0,42 C240,90 480,0 720,38 C960,76 1200,18 1440,46 L1440,90 L0,90 Z"
            />
          </svg>
        </section>

        <section className="bg-slate-50 py-12 sm:py-16">
          <Container>
            <div className="flex flex-col gap-5 border-b border-slate-200 pb-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#256B29]">
                  Search results
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">
                  {query
                    ? `Results for “${query}”`
                    : "Browse website content"}
                </h2>

                <p
                  aria-live="polite"
                  className="mt-2 text-slate-600"
                >
                  {filteredResults.length}{" "}
                  {filteredResults.length === 1
                    ? "result"
                    : "results"}{" "}
                  found
                  {selectedCategory !== "All"
                    ? ` in ${selectedCategory}`
                    : ""}
                  .
                </p>
              </div>

              {(query || selectedCategory !== "All") && (
                <Link
                  href="/search"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                >
                  Clear search
                </Link>
              )}
            </div>

            <nav
              aria-label="Filter search results by category"
              className="py-7"
            >
              <ul className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const active = selectedCategory === category

                  return (
                    <li key={category}>
                      <Link
                        href={createSearchHref(query, category)}
                        aria-current={active ? "page" : undefined}
                        className={`inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 ${
                          active
                            ? "border-[#256B29] bg-[#256B29] text-white"
                            : "border-slate-300 bg-white text-slate-700 hover:border-[#388E3C] hover:text-[#256B29]"
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
                    className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md sm:p-7"
                  >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                      <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#256B29]">
                        <FileText
                          aria-hidden="true"
                          className="h-6 w-6"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold uppercase tracking-[0.13em] text-[#388E3C]">
                          {result.category}
                        </p>

                        <h3 className="mt-2 text-xl font-bold text-slate-950">
                          <Link
                            href={result.href}
                            className="rounded-sm transition hover:text-[#256B29] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                          >
                            {result.title}
                          </Link>
                        </h3>

                        <p className="mt-3 max-w-4xl leading-7 text-slate-600">
                          {result.summary}
                        </p>

                        <Link
                          href={result.href}
                          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-md font-semibold text-[#256B29] transition hover:gap-3 hover:text-[#1f5a23] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                        >
                          View information

                          <ArrowRight
                            aria-hidden="true"
                            className="h-4 w-4"
                          />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm sm:px-10">
                <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                  <Search
                    aria-hidden="true"
                    className="h-7 w-7"
                  />
                </div>

                <h2 className="mt-5 text-2xl font-bold text-slate-950">
                  No results found
                </h2>

                <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
                  We could not find content matching your search.
                  Check the spelling, use fewer words or select a
                  different category.
                </p>

                <Link
                  href="/search"
                  className="mt-7 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#388E3C] px-6 font-semibold text-white transition hover:bg-[#256B29] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                >
                  Browse all content
                </Link>
              </div>
            )}

            <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-slate-950">
                Cannot find what you need?
              </h2>

              <p className="mt-2 max-w-3xl leading-7 text-slate-700">
                Contact the Ministry for assistance with services,
                applications and official public information.
              </p>

              <Link
                href="/contact"
                className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-md font-semibold text-blue-800 transition hover:gap-3 hover:text-blue-950 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
              >
                Contact the Ministry

                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </Link>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}