import type { Metadata } from "next"
import { Suspense } from "react"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { PrivacyContent } from "@/components/privacy/privacy-content"
import { fetchPrivacyPageData } from "@/lib/api/privacy"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"
import { getServerLanguage } from "@/lib/get-server-language"

export const metadata: Metadata = {
  title: "Privacy Policy - Ministry of Fisheries",
  description:
    "Learn how the Ministry of Fisheries, Aquatic and Ocean Resources collects, uses, protects and manages personal information through this website.",
}

interface PrivacyPageProps {
  searchParams?: Promise<{ lang?: string }>
}

const BREADCRUMB_LABELS: Record<string, string> = {
  en: "Privacy Policy",
  si: "පුද්ගලිකත්ව ප්‍රතිපත්තිය",
  ta: "தனியுரிமைக் கொள்கை",
}

const HOME_LABELS: Record<string, string> = {
  en: "Home",
  si: "මුල් පිටුව",
  ta: "முகப்பு",
}

export default async function PrivacyPolicyPage(props: PrivacyPageProps) {
  const resolvedSearchParams = props.searchParams ? await props.searchParams : null
  const langFromUrl = resolvedSearchParams?.lang && ["en", "si", "ta"].includes(resolvedSearchParams.lang.toLowerCase())
    ? resolvedSearchParams.lang.toLowerCase()
    : null

  const initialLang = langFromUrl || await getServerLanguage(props.searchParams)

  const [initialData, headerFooterData] = await Promise.all([
    fetchPrivacyPageData(initialLang),
    fetchHeaderFooterData(initialLang),
  ])

  const homeLabel = HOME_LABELS[initialLang] || "Home"
  const privacyLabel = BREADCRUMB_LABELS[initialLang] || "Privacy Policy"

  return (
    <>
      <SiteHeader initialHeader={headerFooterData?.header} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb
          items={[
            { label: homeLabel, href: "/" },
            { label: privacyLabel },
          ]}
        />

        <Suspense
          fallback={
            <div className="py-16 text-center text-slate-500 font-semibold">
              Loading privacy policy...
            </div>
          }
        >
          <PrivacyContent initialData={initialData} />
        </Suspense>
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}