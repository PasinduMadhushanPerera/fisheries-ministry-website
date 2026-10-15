"use client"

import { useEffect, useState, useCallback } from "react"
import { MonthlyProductionLibrary } from "@/components/statistics/monthly-production-library"
import { useLanguage } from "@/src/contexts/LanguageContext"
import {
  fetchMonthlyFishProductionData,
  type ApiMonthlyFishProductionData,
} from "@/lib/api/monthly-fish-production"

interface MonthlyProductionContentProps {
  initialData?: ApiMonthlyFishProductionData | null
}

export function MonthlyProductionContent({ initialData }: MonthlyProductionContentProps) {
  const { language } = useLanguage()
  const [data, setData] = useState<ApiMonthlyFishProductionData | null>(initialData || null)

  const loadFreshData = useCallback(async () => {
    try {
      const freshData = await fetchMonthlyFishProductionData(language)
      if (freshData) {
        setData(freshData)
      }
    } catch (err) {
      console.error("Failed to load fresh monthly fish production data:", err)
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
    <MonthlyProductionLibrary
      header={data?.header}
      reports={data?.reports}
      availableYears={data?.available_years}
      categories={data?.categories}
    />
  )
}
