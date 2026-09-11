"use client"

import { useEffect, useState, useCallback } from "react"
import { AnnualReportsLibrary } from "@/components/statistics/annual-reports-library"
import { useLanguage } from "@/src/contexts/LanguageContext"
import {
  fetchAnnualStatisticsData,
  type ApiAnnualStatisticsData,
} from "@/lib/api/annual-statistics"

interface AnnualReportsContentProps {
  initialData?: ApiAnnualStatisticsData | null
}

export function AnnualReportsContent({ initialData }: AnnualReportsContentProps) {
  const { language } = useLanguage()
  const [data, setData] = useState<ApiAnnualStatisticsData | null>(initialData || null)

  const loadFreshData = useCallback(async () => {
    try {
      const freshData = await fetchAnnualStatisticsData(language)
      if (freshData) {
        setData(freshData)
      }
    } catch (err) {
      console.error("Failed to load fresh annual statistics data:", err)
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
    <AnnualReportsLibrary
      header={data?.header}
      reports={data?.reports}
      availableYears={data?.available_years}
    />
  )
}
