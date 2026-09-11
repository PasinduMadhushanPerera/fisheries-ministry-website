"use client"

import { useEffect, useState, useCallback } from "react"
import { StatisticsSummary } from "@/components/statistics/statistics-summary"
import { StatisticsAccordion } from "@/components/statistics/statistics-accordion"
import { useLanguage } from "@/src/contexts/LanguageContext"
import {
  fetchFisheriesAtAGlanceData,
  type ApiFisheriesAtAGlanceData,
} from "@/lib/api/fisheries-statistics"

interface AtAGlanceContentProps {
  initialData?: ApiFisheriesAtAGlanceData | null
}

export function AtAGlanceContent({ initialData }: AtAGlanceContentProps) {
  const { language } = useLanguage()
  const [data, setData] = useState<ApiFisheriesAtAGlanceData | null>(initialData || null)

  // Function to load fresh localized statistics data
  const loadFreshStatistics = useCallback(async () => {
    try {
      const freshData = await fetchFisheriesAtAGlanceData(language)
      if (freshData) {
        setData(freshData)
      }
    } catch (err) {
      console.error("Failed to load fresh statistics data:", err)
    }
  }, [language])

  // Refetch on mount, language change, and window focus
  useEffect(() => {
    void loadFreshStatistics()

    const handleWindowFocus = () => {
      void loadFreshStatistics()
    }
    window.addEventListener("focus", handleWindowFocus)

    return () => {
      window.removeEventListener("focus", handleWindowFocus)
    }
  }, [loadFreshStatistics])

  return (
    <>
      {/* 1. Top Key Summary Metrics */}
      <StatisticsSummary cards={data?.summary_cards} />

      {/* 2. Statistical Category Accordions & Breakdown Tables */}
      <StatisticsAccordion
        header={data?.header}
        sections={data?.sections}
      />
    </>
  )
}
