"use client"

import { useEffect, useState, useCallback } from "react"
import { ExportImportSummary } from "@/components/statistics/export-import-summary"
import { ExportImportLibrary } from "@/components/statistics/export-import-library"
import { useLanguage } from "@/src/contexts/LanguageContext"
import {
  fetchExportImportData,
  type ApiExportImportData,
} from "@/lib/api/export-import-statistics"

interface ExportImportContentProps {
  initialData?: ApiExportImportData | null
}

export function ExportImportContent({ initialData }: ExportImportContentProps) {
  const { language } = useLanguage()
  const [data, setData] = useState<ApiExportImportData | null>(initialData || null)

  const loadFreshData = useCallback(async () => {
    try {
      const freshData = await fetchExportImportData(language)
      if (freshData) {
        setData(freshData)
      }
    } catch (err) {
      console.error("Failed to load fresh export & import statistics data:", err)
    }
  }, [language])

  useEffect(() => {
    void loadFreshData()

    const handleWindowFocus = () => {
      void loadFreshData()
    }
    window.addEventListener("focus", handleWindowFocus)

    return () => {
      window.removeEventListener("focus", handleWindowFocus)
    }
  }, [loadFreshData])

  return (
    <>
      <ExportImportSummary
        metrics={data?.summary_metrics}
        heading={data?.header?.summary_heading}
      />

      <ExportImportLibrary
        header={data?.header}
        reports={data?.reports}
        availableYears={data?.available_years}
        categories={data?.categories}
      />
    </>
  )
}
