"use client"

import { useEffect, useState, useTransition, Suspense } from "react"
import { useLanguage } from "@/src/contexts/LanguageContext"
import {
  fetchDownloadsPageData,
  type ApiDownloadsPageData,
} from "@/lib/api/downloads"
import { FeaturedDownloads } from "@/components/downloads/featured-downloads"
import { DownloadsLibrary } from "@/components/downloads/downloads-library"

interface DownloadsPageContentProps {
  initialData: ApiDownloadsPageData | null
}

export function DownloadsPageContent({ initialData }: DownloadsPageContentProps) {
  const { language } = useLanguage()
  const [data, setData] = useState<ApiDownloadsPageData | null>(initialData)
  const [, startTransition] = useTransition()

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      const freshData = await fetchDownloadsPageData(language)
      if (isMounted && freshData) {
        startTransition(() => {
          setData(freshData)
        })
      }
    }

    loadData()

    // Auto-refresh when admin modifies data and user switches back to browser tab
    const handleFocus = () => {
      loadData()
    }
    window.addEventListener("focus", handleFocus)

    return () => {
      isMounted = false
      window.removeEventListener("focus", handleFocus)
    }
  }, [language])

  return (
    <>
      <FeaturedDownloads
        featuredDocuments={data?.featuredDocuments || []}
      />

      <Suspense fallback={
        <div className="py-12 bg-slate-50 border-b border-slate-200 text-center text-sm font-semibold text-slate-500">
          Loading downloads library...
        </div>
      }>
        <DownloadsLibrary
          categories={data?.categories || []}
          documents={data?.documents || []}
        />
      </Suspense>
    </>
  )
}
