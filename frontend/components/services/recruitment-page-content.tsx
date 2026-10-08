"use client"

import { useMemo, useState } from "react"
import { RecruitmentToolbar } from "@/components/services/recruitment-toolbar"
import { RecruitmentLibrary } from "@/components/services/recruitment-library"
import { RecruitmentPreview } from "@/components/services/recruitment-preview"
import { recruitmentVacancies as defaultRecruitmentVacancies, type RecruitmentVacancy } from "@/data/recruitment-vacancies"
import type { ApiRecruitmentPageData } from "@/lib/api/recruitment"

interface RecruitmentPageContentProps {
  initialData?: ApiRecruitmentPageData | null
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

export function RecruitmentPageContent({ initialData }: RecruitmentPageContentProps) {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedStatus, setSelectedStatus] = useState<string>("All")
  const [selectedYear, setSelectedYear] = useState<string>("All")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [selectedVacancy, setSelectedVacancy] = useState<RecruitmentVacancy | null>(null)

  // Map API vacancies or fallback to static list
  const vacanciesList: RecruitmentVacancy[] = useMemo(() => {
    if (initialData !== undefined && initialData !== null) {
      if (!initialData.vacancies) return []
      return initialData.vacancies.map((v) => ({
        id: v.slug || String(v.id),
        refNumber: v.ref_number,
        title: v.title,
        subheading: v.subheading,
        institution: v.institution,
        department: v.department,
        description: v.description,
        qualifications: v.qualifications && v.qualifications.length > 0 ? v.qualifications : [v.description],
        category: v.category as any,
        categoryLabel: v.category_label,
        publishedDate: v.published_date,
        closingDate: v.closing_date,
        salaryScale: v.salary_scale,
        ageLimit: v.age_limit,
        docButtonLabel: v.doc_button_label,
        fileType: (v.file_type as any) || "PDF",
        fileSize: v.file_size,
        fileUrl: v.download_url,
        downloadUrl: v.download_url,
        secondDocumentLabel: v.second_document_label,
        secondDownloadUrl: v.second_download_url,
        secondFileType: v.second_file_type as any,
        secondFileSize: v.second_file_size,
        additionalDocuments: v.additional_documents?.map((d) => ({
          id: d.id,
          label: d.label,
          downloadUrl: d.download_url,
          fileType: d.file_type,
          fileSize: d.file_size,
        })),
        featured: v.featured,
        status: v.status,
        year: v.year,
      }))
    }
    return defaultRecruitmentVacancies
  }, [initialData])

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedStatus("All")
    setSelectedYear("All")
    setSelectedCategory("All")
    setSortBy("newest")
  }

  // Filter and sort vacancies
  const filteredVacancies = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase()

    let result = vacanciesList.filter((item) => {
      // Search filter
      if (
        keyword &&
        !item.title.toLowerCase().includes(keyword) &&
        !item.refNumber.toLowerCase().includes(keyword) &&
        !item.institution.toLowerCase().includes(keyword) &&
        !item.description.toLowerCase().includes(keyword)
      ) {
        return false
      }

      // Status filter
      if (selectedStatus !== "All" && item.status !== selectedStatus) {
        return false
      }

      // Year filter from toolbar
      if (selectedYear !== "All" && item.year.toString() !== selectedYear) {
        return false
      }

      // Category filter using robust matcher
      if (!isCategoryMatch(item.category, item.categoryLabel, selectedCategory)) {
        return false
      }

      return true
    })

    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === "newest") {
        return b.year - a.year || (b.publishedDate ?? "").localeCompare(a.publishedDate ?? "")
      }
      if (sortBy === "closing-soon") {
        return (a.closingDate ?? "").localeCompare(b.closingDate ?? "")
      }
      if (sortBy === "title-az") {
        return a.title.localeCompare(b.title)
      }
      return 0
    })

    return result
  }, [vacanciesList, searchQuery, selectedStatus, selectedYear, selectedCategory, sortBy])

  return (
    <>
      {/* 1. Search & Filter Toolbar */}
      <RecruitmentToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        resultCount={filteredVacancies.length}
        onClearFilters={handleClearFilters}
      />

      {/* 2. Recruitment Accordion Library */}
      <RecruitmentLibrary
        categories={initialData?.categories}
        vacancies={filteredVacancies}
        activeYearTab={selectedYear}
        setActiveYearTab={setSelectedYear}
        catalogueBadge={initialData?.header?.catalogue_badge}
        libraryTitle={initialData?.header?.library_title}
        onSelectVacancy={(v) => setSelectedVacancy(v)}
        onClearFilters={handleClearFilters}
      />

      {/* 4. Same-page Recruitment Preview Modal */}
      <RecruitmentPreview
        vacancy={selectedVacancy}
        onClose={() => setSelectedVacancy(null)}
      />
    </>
  )
}
