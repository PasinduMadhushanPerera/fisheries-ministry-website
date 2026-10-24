"use client"

import { useState, useTransition, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Search,
  X,
  Sparkles,
  Calendar,
  Layers,
  HelpCircle,
  Loader2,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { useLanguage } from "@/src/contexts/LanguageContext"
import {
  fetchSearchResults,
  type SearchApiResponse,
  type SearchResultItem,
} from "@/lib/api/search"

interface SearchPageContentProps {
  initialData: SearchApiResponse | null
  initialQuery?: string
  initialCategory?: string
}

const UI_TEXT = {
  en: {
    badge: "Website Search",
    heroTitle: "Find opportunities, tenders and information",
    heroSubtitle:
      "Search Ministry training opportunities, procurement tenders, recruitment vacancies, resources, news, projects, laws and public information.",
    inputLabel: "What are you looking for?",
    placeholder: "Search tenders, fish prices, vacancies, downloads, news...",
    searchButton: "Search",
    resultsHeading: "Search results",
    resultsFor: (q: string) => (q ? `Results for “${q}”` : "Browse website content"),
    resultsFound: (count: number, cat: string) =>
      `${count} ${count === 1 ? "result" : "results"} found${cat && cat !== "All Results" && cat !== "all" ? ` in ${cat}` : ""}.`,
    clearSearch: "Clear search",
    explorePage: "Explore page",
    noResultsTitle: (q: string) => (q ? `No results found for “${q}”` : "No results found"),
    noResultsDesc:
      "We could not find content matching your query. Check spelling, try one of the popular search topics below, or browse all categories.",
    popularHeading: "Popular Topics & Suggestions",
    browseAll: "Browse all content",
    helpdeskTitle: "Cannot find what you need?",
    helpdeskDesc:
      "Contact the Ministry information desk for direct assistance with training programmes, tenders, recruitment, or official public inquiries.",
    helpdeskButton: "Contact Ministry Helpdesk",
    filterByCategory: "Filter search results by category",
  },
  si: {
    badge: "වෙබ් අඩවි සෙවුම",
    heroTitle: "අවස්ථා, ටෙන්ඩර් සහ තොරතුරු සොයන්න",
    heroSubtitle:
      "අමාත්‍යාංශ පුහුණු අවස්ථා, ප්‍රසම්පාදන ටෙන්ඩර්, රැකියා පුරප්පාඩු, සම්පත්, පුවත්, ව්‍යාපෘති, නීති සහ මහජන තොරතුරු සොයන්න.",
    inputLabel: "ඔබ සොයන්නේ කුමක්ද?",
    placeholder: "ටෙන්ඩර්, මාළු මිල, පුරප්පාඩු, බාගැනීම්, පුවත් සොයන්න...",
    searchButton: "සොයන්න",
    resultsHeading: "සෙවුම් ප්‍රතිඵල",
    resultsFor: (q: string) => (q ? `“${q}” සඳහා ප්‍රතිඵල` : "වෙබ් අඩවි අන්තර්ගතය පිරික්සන්න"),
    resultsFound: (count: number, cat: string) =>
      `ප්‍රතිඵල ${count} ක් හමු විය${cat && cat !== "All Results" && cat !== "all" ? ` (${cat} යටතේ)` : ""}.`,
    clearSearch: "සෙවුම ඉවත් කරන්න",
    explorePage: "විස්තර බලන්න",
    noResultsTitle: (q: string) => (q ? `“${q}” සඳහා ප්‍රතිඵල හමු නොවීය` : "කිසිදු ප්‍රතිඵලයක් හමු නොවීය"),
    noResultsDesc:
      "ඔබගේ සෙවුමට ගැලපෙන අන්තර්ගතයක් හමු නොවීය. අක්ෂර වින්‍යාසය පරීක්ෂා කරන්න, පහත යෝජිත ජනප්‍රිය මාතෘකා උත්සාහ කරන්න හෝ සියලු අන්තර්ගතයන් බලන්න.",
    popularHeading: "ජනප්‍රිය මාතෘකා සහ යෝජනා",
    browseAll: "සියලු අන්තර්ගතයන් බලන්න",
    helpdeskTitle: "ඔබට අවශ්‍ය දේ සොයාගත නොහැකිද?",
    helpdeskDesc:
      "පුහුණු වැඩසටහන්, ටෙන්ඩර්, බඳවා ගැනීම් හෝ නිල මහජන විමසීම් සඳහා සෘජු සහාය ලබා ගැනීමට අමාත්‍යාංශ තොරතුරු අංශය අමතන්න.",
    helpdeskButton: "අමාත්‍යාංශ සහාය අංශය අමතන්න",
    filterByCategory: "ප්‍රවර්ගය අනුව ප්‍රතිඵල පෙරා ගන්න",
  },
  ta: {
    badge: "இணையதளத் தேடல்",
    heroTitle: "வாய்ப்புகள், டெண்டர்கள் மற்றும் தகவல்களைத் தேடுங்கள்",
    heroSubtitle:
      "அமைச்சின் பயிற்சி வாய்ப்புகள், கொள்முதல் டெண்டர்கள், வேலைவாய்ப்புகள், வளங்கள், செய்திகள் மற்றும் பொதுத் தகவல்களைத் தேடுங்கள்.",
    inputLabel: "நீங்கள் என்ன தேடுகிறீர்கள்?",
    placeholder: "டெண்டர்கள், மீன் விலை, வேலைவாய்ப்புகள், பதிவிறக்கங்களைத் தேடுங்கள்...",
    searchButton: "தேடவும்",
    resultsHeading: "தேடல் முடிவுகள்",
    resultsFor: (q: string) => (q ? `“${q}” இற்கான தேடல் முடிவுகள்` : "இணையதள உள்ளடக்கத்தைப் பார்க்க"),
    resultsFound: (count: number, cat: string) =>
      `${count} முடிவுகள் கிடைத்துள்ளன${cat && cat !== "All Results" && cat !== "all" ? ` (${cat} பிரிவில்)` : ""}.`,
    clearSearch: "தேடலை அழிக்கவும்",
    explorePage: "பக்கத்தைப் பார்க்க",
    noResultsTitle: (q: string) => (q ? `“${q}” இற்கு முடிவுகள் கிடைக்கவில்லை` : "முடிவுகள் எதுவும் இல்லை"),
    noResultsDesc:
      "உங்கள் தேடலுடன் பொருந்தக்கூடிய உள்ளடக்கம் கிடைக்கவில்லை. எழுத்துப் பிழைகளைச் சரிபார்க்கவும் அல்லது கீழே உள்ள பிரபலமான தலைப்புகளை முயற்சிக்கவும்.",
    popularHeading: "பிரபலமான தலைப்புகள் & பரிந்துரைகள்",
    browseAll: "அனைத்து உள்ளடக்கங்களையும் பார்க்க",
    helpdeskTitle: "உங்களுக்குத் தேவையானதை கண்டுபிடிக்க முடியவில்லையா?",
    helpdeskDesc:
      "பயிற்சித் திட்டங்கள், டெண்டர்கள், வேலைவாய்ப்புகள் அல்லது உத்தியோகபூர்வ விசாரணைகளுக்கு உதவ அமைச்சுத் தகவல் மையத்தைத் தொடர்புகொள்ளவும்.",
    helpdeskButton: "அமைச்சு உதவி மையத்தைத் தொடர்பு கொள்ளவும்",
    filterByCategory: "பிரிவு வாரியாக முடிவுகளை வடிகட்டவும்",
  },
}

export function SearchPageContent({
  initialData,
  initialQuery = "",
  initialCategory = "all",
}: SearchPageContentProps) {
  const router = useRouter()
  const { language } = useLanguage()
  const ui = UI_TEXT[language] || UI_TEXT.en

  const [query, setQuery] = useState(initialQuery)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [data, setData] = useState<SearchApiResponse | null>(initialData)
  const [loading, setLoading] = useState(false)
  const [, startTransition] = useTransition()

  // Fetch search results whenever query, category, or language changes
  const executeSearch = async (newQuery: string, newCategory: string) => {
    setLoading(true)
    try {
      const res = await fetchSearchResults(newQuery, language, newCategory)
      startTransition(() => {
        setData(res)
      })

      // Update URL query params smoothly without full reload
      const params = new URLSearchParams()
      if (newQuery) params.set("q", newQuery)
      if (newCategory && newCategory !== "all") params.set("category", newCategory)
      params.set("lang", language)
      const queryString = params.toString()
      router.replace(queryString ? `/search?${queryString}` : "/search", { scroll: false })
    } catch (err) {
      console.error("Search execution error:", err)
    } finally {
      setLoading(false)
    }
  }

  // Handle language changes live
  useEffect(() => {
    executeSearch(query, selectedCategory)
  }, [language])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    executeSearch(query.trim(), selectedCategory)
  }

  const handleCategorySelect = (catKey: string) => {
    setSelectedCategory(catKey)
    executeSearch(query.trim(), catKey)
  }

  const handleClear = () => {
    setQuery("")
    setSelectedCategory("all")
    executeSearch("", "all")
  }

  const handleSuggestionClick = (suggestionQuery: string) => {
    setQuery(suggestionQuery)
    setSelectedCategory("all")
    executeSearch(suggestionQuery, "all")
  }

  const categories = data?.categories || []
  const results = data?.results || []
  const popularSuggestions = data?.popular_suggestions || []
  const totalResults = data?.total_results ?? results.length

  const activeCategoryObj = categories.find((c) => c.key === selectedCategory)
  const activeCategoryLabel = activeCategoryObj?.label || ""

  return (
    <>
      {/* Hero Section with Search Input */}
      <section className="relative overflow-hidden bg-[#061d24] text-white py-12 sm:py-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,197,94,0.18),transparent_35%),radial-gradient(circle_at_85%_25%,rgba(14,165,233,0.16),transparent_32%)]"
        />

        <Container className="relative z-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-300 border border-emerald-500/30">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{ui.badge}</span>
              </p>

              <h1 className="mt-3 max-w-2xl text-2xl font-black tracking-tight sm:text-4xl text-white">
                {ui.heroTitle}
              </h1>

              <p className="mt-3 max-w-xl text-xs sm:text-sm leading-relaxed text-slate-300">
                {ui.heroSubtitle}
              </p>
            </div>

            {/* Search Input Box */}
            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-md sm:p-6">
              <form role="search" onSubmit={handleFormSubmit}>
                <label htmlFor="main-search" className="text-xs font-bold text-white block mb-2">
                  {ui.inputLabel}
                </label>

                <div className="flex overflow-hidden rounded-xl bg-white shadow-lg focus-within:ring-4 focus-within:ring-emerald-400/30">
                  <input
                    id="main-search"
                    name="q"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    maxLength={100}
                    autoComplete="off"
                    placeholder={ui.placeholder}
                    className="min-h-12 min-w-0 flex-1 border-0 px-4 text-xs sm:text-sm text-slate-950 outline-none placeholder:text-slate-400 font-medium"
                  />

                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="inline-flex min-h-12 items-center justify-center px-3 text-slate-400 hover:text-slate-700 cursor-pointer"
                      title={ui.clearSearch}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex min-h-12 min-w-14 items-center justify-center bg-[#256B29] px-5 font-bold text-white transition hover:bg-[#1b4d1d] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 cursor-pointer disabled:opacity-60"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Search aria-hidden="true" className="h-5 w-5" />
                    )}
                    <span className="sr-only">{ui.searchButton}</span>
                  </button>
                </div>

                {/* Quick Suggestion Chips */}
                {popularSuggestions.length > 0 && (
                  <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-2">
                    <span className="text-[11px] font-semibold text-slate-300">
                      {ui.popularHeading}:
                    </span>
                    {popularSuggestions.slice(0, 4).map((sugg, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSuggestionClick(sugg.query)}
                        className="inline-flex items-center rounded-lg bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-200 hover:bg-white/20 transition cursor-pointer"
                      >
                        {sugg.label}
                      </button>
                    ))}
                  </div>
                )}
              </form>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content Area */}
      <section className="bg-slate-50 py-10 sm:py-14 border-t border-slate-200 min-h-[600px]">
        <Container>
          {/* Section Header */}
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-[#256B29]">
                {ui.resultsHeading}
              </p>

              <h2 className="mt-1 text-xl sm:text-2xl font-black text-slate-950">
                {ui.resultsFor(query)}
              </h2>

              <p aria-live="polite" className="mt-1 text-xs text-slate-600 font-medium">
                {ui.resultsFound(totalResults, activeCategoryLabel)}
              </p>
            </div>

            {(query || selectedCategory !== "all") && (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 text-xs font-bold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 cursor-pointer shadow-2xs"
              >
                <X className="h-3.5 w-3.5 text-slate-500" />
                <span>{ui.clearSearch}</span>
              </button>
            )}
          </div>

          {/* Category Filter Pills Navigation */}
          {categories.length > 0 && (
            <nav aria-label={ui.filterByCategory} className="py-5 overflow-x-auto">
              <ul className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const active = selectedCategory === category.key

                  return (
                    <li key={category.key}>
                      <button
                        type="button"
                        onClick={() => handleCategorySelect(category.key)}
                        aria-current={active ? "page" : undefined}
                        className={`inline-flex min-h-9 items-center gap-1.5 rounded-xl border px-3.5 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 cursor-pointer ${
                          active
                            ? "border-[#256B29] bg-[#256B29] text-white shadow-xs"
                            : "border-slate-200 bg-white text-slate-700 hover:border-[#256B29] hover:text-[#256B29]"
                        }`}
                      >
                        <span>{category.label}</span>
                        {category.count > 0 && (
                          <span
                            className={`rounded-full px-1.5 py-0.2 text-[10px] font-black ${
                              active ? "bg-white/25 text-white" : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {category.count}
                          </span>
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>
          )}

          {/* Results List */}
          {loading ? (
            <div className="py-20 text-center space-y-3">
              <Loader2 className="h-8 w-8 animate-spin text-[#256B29] mx-auto" />
              <p className="text-xs font-bold text-slate-500">Searching ministry records...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="grid gap-4 mt-2">
              {results.map((result) => (
                <article
                  key={result.id}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#256B29] border border-emerald-200/80">
                      <FileText aria-hidden="true" className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {result.badge && (
                          <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-[#256B29]">
                            {result.badge}
                          </span>
                        )}
                        <span className="text-[11px] font-semibold text-slate-500">
                          {result.category}
                        </span>
                        {result.date && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                            <Calendar className="h-3 w-3" />
                            <span>{result.date}</span>
                          </span>
                        )}
                      </div>

                      <h3 className="mt-2 text-base sm:text-lg font-black text-slate-950">
                        <Link
                          href={result.href}
                          className="transition hover:text-[#256B29] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                        >
                          {result.title}
                        </Link>
                      </h3>

                      <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600 text-justify">
                        {result.summary}
                      </p>

                      <div className="mt-3.5">
                        <Link
                          href={result.href}
                          className="inline-flex items-center gap-1.5 font-bold text-xs text-[#256B29] transition hover:gap-2.5 hover:text-[#1b4d1d]"
                        >
                          <span>{ui.explorePage}</span>
                          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Empty State with Smart Recommendations */
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-xs sm:px-10 mt-4">
              <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
                <Search aria-hidden="true" className="h-8 w-8" />
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                {ui.noResultsTitle(query)}
              </h2>

              <p className="mx-auto mt-2 max-w-lg text-xs sm:text-sm leading-relaxed text-slate-600">
                {ui.noResultsDesc}
              </p>

              {/* Popular Search Recommendation Chips */}
              {popularSuggestions.length > 0 && (
                <div className="mt-6 max-w-xl mx-auto">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    {ui.popularHeading}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {popularSuggestions.map((sugg, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSuggestionClick(sugg.query)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 hover:border-[#256B29] hover:bg-emerald-50 hover:text-[#256B29] transition cursor-pointer"
                      >
                        <Search className="h-3 w-3 text-emerald-600" />
                        <span>{sugg.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8">
                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#256B29] px-6 text-xs font-bold text-white transition hover:bg-[#1b4d1d] cursor-pointer"
                >
                  {ui.browseAll}
                </button>
              </div>
            </div>
          )}

          {/* Helpdesk Callout Box */}
          <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#256B29] font-extrabold text-sm mb-1">
                <HelpCircle className="h-4 w-4" />
                <span>{ui.helpdeskTitle}</span>
              </div>
              <p className="max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-700">
                {ui.helpdeskDesc}
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#256B29] px-5 text-xs font-bold text-white transition hover:bg-[#1b4d1d] cursor-pointer"
            >
              <span>{ui.helpdeskButton}</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
