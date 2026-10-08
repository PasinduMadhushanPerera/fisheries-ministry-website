"use client"

import { useMemo, useState } from "react"
import { ProcurementToolbar } from "@/components/services/procurement-toolbar"
import { ProcurementLibrary } from "@/components/services/procurement-library"
import { ProcurementPreview } from "@/components/services/procurement-preview"
import { procurementNotices as defaultProcurementNotices, type ProcurementNotice } from "@/data/procurement-tenders"
import type { ApiProcurementPageData } from "@/lib/api/procurement"

interface ProcurementPageContentProps {
  initialData?: ApiProcurementPageData | null
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

export function ProcurementPageContent({ initialData }: ProcurementPageContentProps) {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedStatus, setSelectedStatus] = useState<string>("All")
  const [selectedYear, setSelectedYear] = useState<string>("All")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedFileType, setSelectedFileType] = useState<string>("All")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [selectedTender, setSelectedTender] = useState<ProcurementNotice | null>(null)

  // Map API tenders or fallback to static list
  const tendersList: ProcurementNotice[] = useMemo(() => {
    if (initialData !== undefined && initialData !== null) {
      if (!initialData.tenders) return []
      return initialData.tenders.map((t) => ({
        id: t.slug || String(t.id),
        refNumber: t.ref_number,
        title: t.title,
        publisher: t.publisher,
        description: t.description,
        detailedScope: t.detailed_scope && t.detailed_scope.length > 0 ? t.detailed_scope : [t.description],
        additionalInfo: t.additional_info,
        docButtonLabel: t.doc_button_label,
        category: t.category as any,
        categoryLabel: t.category_label,
        publishedDate: t.published_date,
        closingDate: t.closing_date,
        submissionAddress: t.submission_address,
        tenderFee: t.tender_fee,
        bidSecurity: t.bid_security,
        eligibility: t.eligibility,
        contactInfo: t.contact_info,
        fileType: (t.file_type as any) || "PDF",
        fileSize: t.file_size,
        fileUrl: t.download_url,
        downloadUrl: t.download_url,
        secondDocumentLabel: t.second_document_label,
        secondDownloadUrl: t.second_download_url,
        secondFileType: t.second_file_type as any,
        secondFileSize: t.second_file_size,
        featured: t.featured,
        status: t.status,
        year: t.year,
      }))
    }
    return defaultProcurementNotices
  }, [initialData])

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedStatus("All")
    setSelectedYear("All")
    setSelectedCategory("All")
    setSelectedFileType("All")
    setSortBy("newest")
  }

  // Filter and sort tenders
  const filteredTenders = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase()

    let result = tendersList.filter((item) => {
      // Search filter
      if (
        keyword &&
        !item.title.toLowerCase().includes(keyword) &&
        !item.refNumber.toLowerCase().includes(keyword) &&
        !item.publisher.toLowerCase().includes(keyword) &&
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
      if (sortBy === "closing-soon") {
        return (a.closingDate ?? "").localeCompare(b.closingDate ?? "")
      }
      if (sortBy === "title-az") {
        return a.title.localeCompare(b.title)
      }
      return 0
    })

    return result
  }, [tendersList, searchQuery, selectedStatus, selectedYear, selectedCategory, selectedFileType, sortBy])

  return (
    <>
      {/* 1. Search & Filter Toolbar */}
      <ProcurementToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedFileType={selectedFileType}
        setSelectedFileType={setSelectedFileType}
        sortBy={sortBy}
        setSortBy={setSortBy}
        resultCount={filteredTenders.length}
        onClearFilters={handleClearFilters}
      />

      {/* 2. Procurement Row List */}
      <ProcurementLibrary
        tenders={filteredTenders}
        activeYearTab={selectedYear}
        setActiveYearTab={setSelectedYear}
        catalogueBadge={initialData?.header?.catalogue_badge}
        libraryTitle={initialData?.header?.library_title}
        onSelectTender={(tender) => setSelectedTender(tender)}
        onClearFilters={handleClearFilters}
      />

      {/* 3. Same-page Procurement Preview Modal */}
      <ProcurementPreview
        tender={selectedTender}
        onClose={() => setSelectedTender(null)}
      />
    </>
  )
}
