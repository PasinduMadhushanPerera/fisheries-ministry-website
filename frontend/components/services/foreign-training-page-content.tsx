"use client"

import { useMemo, useState } from "react"
import { ForeignTrainingHero } from "@/components/services/foreign-training-hero"
import { ForeignTrainingToolbar } from "@/components/services/foreign-training-toolbar"
import { ForeignTrainingFeatured } from "@/components/services/foreign-training-featured"
import { ForeignTrainingLibrary } from "@/components/services/foreign-training-library"
import { ForeignTrainingPreview } from "@/components/services/foreign-training-preview"
import { foreignTrainingProgrammes as defaultForeignProgrammes, type ForeignTrainingProgramme } from "@/data/foreign-training-programmes"
import type { ApiForeignTrainingPageData } from "@/lib/api/foreign-training"

interface ForeignTrainingPageContentProps {
  initialData?: ApiForeignTrainingPageData | null
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

export function ForeignTrainingPageContent({ initialData }: ForeignTrainingPageContentProps) {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedYear, setSelectedYear] = useState<string>("All")
  const [selectedCountry, setSelectedCountry] = useState<string>("All")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedFileType, setSelectedFileType] = useState<string>("All")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [selectedProgramme, setSelectedProgramme] = useState<ForeignTrainingProgramme | null>(null)

  // Map API programmes or fallback to static list
  const programmesList: ForeignTrainingProgramme[] = useMemo(() => {
    if (initialData?.programmes && initialData.programmes.length > 0) {
      return initialData.programmes.map((p) => ({
        id: p.slug || String(p.id),
        year: p.year,
        title: p.title,
        country: p.country,
        institution: p.institution,
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
    return defaultForeignProgrammes
  }, [initialData])

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedYear("All")
    setSelectedCountry("All")
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
        !item.country.toLowerCase().includes(keyword) &&
        !item.institution.toLowerCase().includes(keyword) &&
        !item.description.toLowerCase().includes(keyword)
      ) {
        return false
      }

      // Year filter from toolbar
      if (selectedYear !== "All" && item.year.toString() !== selectedYear) {
        return false
      }

      // Country filter
      if (selectedCountry !== "All" && item.country !== selectedCountry) {
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
  }, [programmesList, searchQuery, selectedYear, selectedCountry, selectedCategory, selectedFileType, sortBy])

  return (
    <>
      {/* 1. Compact Page Hero if enabled */}
      {/* <ForeignTrainingHero initialHeader={initialData?.header} /> */}

      {/* 2. Search & Filter Toolbar */}
      <ForeignTrainingToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedFileType={selectedFileType}
        setSelectedFileType={setSelectedFileType}
        sortBy={sortBy}
        setSortBy={setSortBy}
        resultCount={filteredProgrammes.length}
        onClearFilters={handleClearFilters}
      />

      {/* 3. Featured Overseas Scholarships */}
      <ForeignTrainingFeatured
        programmes={filteredProgrammes}
        featuredBadge={initialData?.header?.featured_badge}
        onSelectProgramme={(prog) => setSelectedProgramme(prog)}
      />

      {/* 4. Foreign Training Library */}
      <ForeignTrainingLibrary
        programmes={filteredProgrammes}
        activeYearTab={selectedYear}
        setActiveYearTab={setSelectedYear}
        catalogueBadge={initialData?.header?.catalogue_badge}
        libraryTitle={initialData?.header?.library_title}
        onSelectProgramme={(prog) => setSelectedProgramme(prog)}
        onClearFilters={handleClearFilters}
      />

      {/* 5. Same-page Programme Preview Modal */}
      <ForeignTrainingPreview
        programme={selectedProgramme}
        onClose={() => setSelectedProgramme(null)}
      />
    </>
  )
}
