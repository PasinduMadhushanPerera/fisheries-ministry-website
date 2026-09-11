"use client"

import { useEffect, useState, useCallback } from "react"
import { FisheryInformationLibrary } from "@/components/statistics/fishery-information-library"
import { useLanguage } from "@/src/contexts/LanguageContext"
import {
  fetchFisheryInformationData,
  type ApiFisheryInformationData,
} from "@/lib/api/fishery-information"

interface FisheryInformationContentProps {
  initialData?: ApiFisheryInformationData | null
}

export function FisheryInformationContent({ initialData }: FisheryInformationContentProps) {
  const { language } = useLanguage()
  const [data, setData] = useState<ApiFisheryInformationData | null>(initialData || null)

  const loadFreshData = useCallback(async () => {
    try {
      const freshData = await fetchFisheryInformationData(language)
      if (freshData) {
        setData(freshData)
      }
    } catch (err) {
      console.error("Failed to load fresh fishery information data:", err)
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
    <FisheryInformationLibrary
      header={data?.header}
      categories={data?.categories}
      items={data?.items}
    />
  )
}
