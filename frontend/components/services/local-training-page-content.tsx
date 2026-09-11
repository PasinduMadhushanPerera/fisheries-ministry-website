"use client"

import { useMemo, useState } from "react"
import { LocalTrainingHero } from "@/components/services/local-training-hero"
import { LocalTrainingToolbar } from "@/components/services/local-training-toolbar"
import { LocalTrainingFeatured } from "@/components/services/local-training-featured"
import { LocalTrainingLibrary } from "@/components/services/local-training-library"
import { LocalTrainingPreview } from "@/components/services/local-training-preview"
import { localTrainingProgrammes as defaultLocalProgrammes, type LocalTrainingProgramme } from "@/data/local-training-programmes"
import type { ApiLocalTrainingPageData } from "@/lib/api/local-training"

interface LocalTrainingPageContentProps {
  initialData?: ApiLocalTrainingPageData | null
}

function isCategoryMatch(itemCategory?: string, itemCategoryLabel?: string, targetCategory?: string): boolean {
  if (!targetCategory || targetCategory === "All") return true

  const norm = (s?: string) => (s || "").toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim()
  const targetNorm = norm(targetCategory)
  const catNorm = norm(itemCategory)
  const labelNorm = norm(itemCategoryLabel)

  if (!targetNorm) return true

  const targetNoSpaces = targetNorm.replace(/\s+/g, "")
  if (catNorm.replace(/\s+/g, "") === targetNoSpaces || labelNorm.replace(/\s+/g, "") === targetNoSpaces) {
    return true
  }

  const targetWords = targetNorm.split(" ").filter((w) => w.length > 2)
  return targetWords.some((word) => catNorm.includes(word) || labelNorm.includes(word))
}

export function LocalTrainingPageContent({ initialData }: LocalTrainingPageContentProps) {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedYear, setSelectedYear] = useState<string>("All")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedFileType, setSelectedFileType] = useState<string>("All")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [selectedProgramme, setSelectedProgramme] = useState<LocalTrainingProgramme | null>(null)

  // Map API programmes or fallback to static list
  const programmesList: LocalTrainingProgramme[] = useMemo(() => {
    if (initialData?.programmes && initialData.programmes.length > 0) {
      return initialData.programmes.map((p) => ({
        id: p.slug || String(p.id),
        year: p.year,
        title: p.title,
        provider: p.provider,
        description: p.description,
        category: p.category as any,
        categoryLabel: p.category_label,
        publishedDate: p.published_date,
        applicationDeadline: p.application_deadline,
        fileType: (p.file_type as any) || "PDF",
        fileSize: p.file_size,
        fileUrl: p.download_url,
        downloadUrl: p.download_url,
        image: p.image_url,
        featured: p.featured,
        status: p.status,
      }))
    }
    return defaultLocalProgrammes
  }, [initialData])

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedYear("All")
    setSelectedCategory("All")
    setSelectedFileType("All")
    setSortBy("newest")
  }

  // Filter and sort programmes
  const filteredProgrammes = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase()

    let result = programmesList.filter((item) => {
      // Search filter
      if (
        keyword &&
        !item.title.toLowerCase().includes(keyword) &&
        !item.provider.toLowerCase().includes(keyword) &&
        !item.description.toLowerCase().includes(keyword)
      ) {
        return false
      }

      // Year filter
      if (selectedYear !== "All" && item.year.toString() !== selectedYear) {
        return false
      }

      // Category filter using robust matcher
      if (!isCategoryMatch(item.category, item.categoryLabel, selectedCategory)) {
        return false
      }

      // File type filter
      if (selectedFileType !== "All" && item.fileType !== selectedFileType) {
        return false
      }

      return true
    })

    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === "newest") {
        return b.year - a.year || (b.publishedDate ?? "").localeCompare(a.publishedDate ?? "")
      }
      if (sortBy === "oldest") {
        return a.year - b.year || (a.publishedDate ?? "").localeCompare(b.publishedDate ?? "")
      }
      if (sortBy === "title-az") {
        return a.title.localeCompare(b.title)
      }
      return 0
    })

    return result
  }, [programmesList, searchQuery, selectedYear, selectedCategory, selectedFileType, sortBy])

  return (
    <>
      {/* 1. Compact Page Hero if enabled */}
      {/* <LocalTrainingHero initialHeader={initialData?.header} /> */}

      {/* 2. Search & Filter Toolbar */}
      <LocalTrainingToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedFileType={selectedFileType}
        setSelectedFileType={setSelectedFileType}
        sortBy={sortBy}
        setSortBy={setSortBy}
        resultCount={filteredProgrammes.length}
        onClearFilters={handleClearFilters}
        programmes={programmesList}
      />

      {/* 3. Featured Opportunities */}
      <LocalTrainingFeatured
        programmes={filteredProgrammes}
        featuredBadge={initialData?.header?.featured_badge}
        onSelectProgramme={(prog) => setSelectedProgramme(prog)}
      />

      {/* 4. Training Programme Library */}
      <LocalTrainingLibrary
        programmes={filteredProgrammes}
        activeYearTab={selectedYear}
        setActiveYearTab={setSelectedYear}
        catalogueBadge={initialData?.header?.catalogue_badge}
        libraryTitle={initialData?.header?.library_title}
        onSelectProgramme={(prog) => setSelectedProgramme(prog)}
        onClearFilters={handleClearFilters}
      />

      {/* 5. Same-page Programme Preview Modal */}
      <LocalTrainingPreview
        programme={selectedProgramme}
        onClose={() => setSelectedProgramme(null)}
      />
    </>
  )
}
