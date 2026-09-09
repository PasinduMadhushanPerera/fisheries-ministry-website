import type { Metadata } from "next"
import { Suspense } from "react"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { ContactPageContent } from "@/components/contact/contact-page-content"
import { fetchContactPageData } from "@/lib/api/contact"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"
import { getServerLanguage } from "@/lib/get-server-language"

export const metadata: Metadata = {
  title: "Contact Us - Ministry of Fisheries",
  description:
    "Official contact portal of the Ministry of Fisheries. Access departmental directories, headquarters address, office map, inquiry submission form, and public FAQs.",
}

interface ContactPageProps {
  searchParams?: Promise<{ lang?: string }>
}

export default async function ContactPage(props: ContactPageProps) {
  const resolvedSearchParams = props.searchParams ? await props.searchParams : null
  const langFromUrl = resolvedSearchParams?.lang && ["en", "si", "ta"].includes(resolvedSearchParams.lang.toLowerCase())
    ? resolvedSearchParams.lang.toLowerCase()
    : null

  const initialLang = langFromUrl || await getServerLanguage(props.searchParams)

  const [initialData, headerFooterData] = await Promise.all([
    fetchContactPageData(initialLang),
    fetchHeaderFooterData(initialLang),
  ])

  return (
    <>
      <SiteHeader initialHeader={headerFooterData?.header} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Contact Us" },
          ]}
        />

        <Suspense fallback={
          <div className="py-16 text-center text-slate-500 font-semibold">
            Loading contact directory...
          </div>
        }>
          <ContactPageContent initialData={initialData} />
        </Suspense>
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}