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
  lang?: string
}

export function RtiPageContent({ initialData, lang }: RtiPageContentProps) {
  const { language } = useLanguage()
  const [activeLang, setActiveLang] = useState<"en" | "si" | "ta">(
    (lang as "en" | "si" | "ta") || (language as "en" | "si" | "ta") || "en"
  )
  const [data, setData] = useState<ApiRtiPageData | null>(initialData)
  const [, startTransition] = useTransition()

  useEffect(() => {
    if (language) {
      setActiveLang(language as "en" | "si" | "ta")
    }
  }, [language])

  useEffect(() => {
    if (lang) {
      setActiveLang(lang as "en" | "si" | "ta")
    }
  }, [lang])

  useEffect(() => {
    if (initialData) {
      setData(initialData)
    }
  }, [initialData])

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      const freshData = await fetchRtiPageData(activeLang)
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
  }, [activeLang])

  const settings = data?.settings || data?.header

  return (
    <>
      <RtiQuickActions lang={activeLang} />

      <RtiOfficers
        officers={data?.officers || []}
        header={settings}
        lang={activeLang}
      />

      <RtiLegalDocuments
        legalDocuments={data?.legalDocuments || []}
        header={settings}
        lang={activeLang}
      />

      <RtiLibrary
        categories={data?.categories || []}
        documents={data?.documents || []}
        header={settings}
        lang={activeLang}
      />
    </>
  )
}
