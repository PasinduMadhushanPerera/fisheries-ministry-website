"use client"

import { useEffect, useState, useTransition } from "react"
import { useLanguage } from "@/src/contexts/LanguageContext"
import { fetchRtiPageData, type ApiRtiPageData } from "@/lib/api/rti"
import { RtiQuickActions } from "@/components/rti/rti-quick-actions"
import { RtiOfficers } from "@/components/rti/rti-officers"
import { RtiLegalDocuments } from "@/components/rti/rti-legal-documents"
import { RtiLibrary } from "@/components/rti/rti-library"

interface RtiPageContentProps {
  initialData: ApiRtiPageData | null
}

export function RtiPageContent({ initialData }: RtiPageContentProps) {
  const { language } = useLanguage()
  const [data, setData] = useState<ApiRtiPageData | null>(initialData)
  const [, startTransition] = useTransition()

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      const freshData = await fetchRtiPageData(language)
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
      <RtiQuickActions />

      <RtiOfficers officers={data?.officers || []} />

      <RtiLegalDocuments legalDocuments={data?.legalDocuments || []} />

      <RtiLibrary
        categories={data?.categories || []}
        documents={data?.documents || []}
      />
    </>
  )
}
