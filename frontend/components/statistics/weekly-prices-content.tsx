"use client"

import { useEffect, useState, useCallback } from "react"
import { WeeklyPricesDirectory } from "@/components/statistics/weekly-prices-directory"
import { useLanguage } from "@/src/contexts/LanguageContext"
import {
  fetchWeeklyFishPricesData,
  type ApiWeeklyFishPricesData,
} from "@/lib/api/weekly-fish-prices"

interface WeeklyPricesContentProps {
  initialData?: ApiWeeklyFishPricesData | null
}

export function WeeklyPricesContent({ initialData }: WeeklyPricesContentProps) {
  const { language } = useLanguage()
  const [data, setData] = useState<ApiWeeklyFishPricesData | null>(initialData || null)

  const loadFreshData = useCallback(async () => {
    try {
      const freshData = await fetchWeeklyFishPricesData(language)
      if (freshData) {
        setData(freshData)
      }
    } catch (err) {
      console.error("Failed to load fresh weekly fish prices data:", err)
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
    <WeeklyPricesDirectory
      header={data?.header}
      reports={data?.reports}
      availableYears={data?.available_years}
      categories={data?.categories}
    />
  )
}
