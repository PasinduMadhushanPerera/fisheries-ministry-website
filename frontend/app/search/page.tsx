import type { Metadata } from "next"
import { Suspense } from "react"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { SearchPageContent } from "@/components/search/search-page-content"
import { fetchSearchResults } from "@/lib/api/search"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"
import { getServerLanguage } from "@/lib/get-server-language"

export const metadata: Metadata = {
  title: "Search - Ministry of Fisheries",
  description:
    "Search services, opportunities, procurement tenders, recruitment vacancies, publications, statistics and resources provided by the Ministry of Fisheries.",
}

interface SearchPageProps {
  searchParams?: Promise<{
    q?: string
    category?: string
    lang?: string
  }>
}

const BREADCRUMB_LABELS: Record<string, string> = {
  en: "Search",
  si: "සෙවීම",
  ta: "தேடல்",
}

const HOME_LABELS: Record<string, string> = {
  en: "Home",
  si: "මුල් පිටුව",
  ta: "முகப்பு",
}

export default async function SearchPage(props: SearchPageProps) {
  const resolvedSearchParams = props.searchParams ? await props.searchParams : null
  const query = resolvedSearchParams?.q?.trim() ?? ""
  const category = resolvedSearchParams?.category?.trim() ?? "all"

  const langFromUrl =
    resolvedSearchParams?.lang && ["en", "si", "ta"].includes(resolvedSearchParams.lang.toLowerCase())
      ? resolvedSearchParams.lang.toLowerCase()
      : null

  const initialLang = langFromUrl || (await getServerLanguage(props.searchParams))

  const [initialData, headerFooterData] = await Promise.all([
    fetchSearchResults(query, initialLang, category),
    fetchHeaderFooterData(initialLang),
  ])

  const homeLabel = HOME_LABELS[initialLang] || "Home"
  const searchLabel = BREADCRUMB_LABELS[initialLang] || "Search"

  return (
    <>
      <SiteHeader initialHeader={headerFooterData?.header} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb
          items={[
            { label: homeLabel, href: "/" },
            { label: searchLabel },
          ]}
        />

        <Suspense
          fallback={
            <div className="py-20 text-center text-slate-500 font-semibold">
              Loading search portal...
            </div>
          }
        >
          <SearchPageContent
            initialData={initialData}
            initialQuery={query}
            initialCategory={category}
          />
        </Suspense>
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}