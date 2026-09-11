"use client"

import { useEffect, useMemo, useState, useCallback } from "react"
import { NoticesToolbar } from "@/components/media/notices-toolbar"
import { NoticesFeatured } from "@/components/media/notices-featured"
import { NoticesLibrary } from "@/components/media/notices-library"
import { NoticesPreview } from "@/components/media/notices-preview"
import { useLanguage } from "@/src/contexts/LanguageContext"
import { fetchNoticesPageData, type ApiNoticeItem, type ApiNoticesPageData } from "@/lib/api/notices"

interface NoticesPageContentProps {
  initialData?: ApiNoticesPageData | null
}

export function NoticesPageContent({ initialData }: NoticesPageContentProps) {
  const { language } = useLanguage()
  const [data, setData] = useState<ApiNoticesPageData | null>(initialData || null)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [selectedNotice, setSelectedNotice] = useState<ApiNoticeItem | null>(null)

  // Function to load fresh localized notices data
  const loadFreshNotices = useCallback(async () => {
    try {
      const freshData = await fetchNoticesPageData(language)
      if (freshData) {
        setData(freshData)
      }
    } catch (err) {
      console.error("Failed to load fresh notices:", err)
    }
  }, [language])

  // Fetch fresh data on mount, language change, and window focus
  useEffect(() => {
    void loadFreshNotices()

    const handleWindowFocus = () => {
      void loadFreshNotices()
    }
    window.addEventListener("focus", handleWindowFocus)

    return () => {
      window.removeEventListener("focus", handleWindowFocus)
    }
  }, [loadFreshNotices])

  // All active notices from database
  const notices = useMemo(() => {
    return data?.notices || []
  }, [data])

  // Categories list matching backend CATEGORY_CHOICES
  const categories = useMemo(() => {
    return [
      {
        key: "All",
        label: language === "si" ? "සියල්ල" : language === "ta" ? "அனைத்தும்" : "All Notices",
      },
      {
        key: "circular",
        label: language === "si" ? "අමාත්‍යාංශ චක්‍රලේඛ" : language === "ta" ? "அமைச்சு சுற்றறிக்கைகள்" : "Ministry Circulars",
      },
      {
        key: "procurement",
        label: language === "si" ? "ටෙන්ඩර් / ප්‍රසම්පාදන" : language === "ta" ? "டெண்டர் / கொள்முதல்" : "Tenders & Procurement",
      },
      {
        key: "recruitment",
        label: language === "si" ? "බඳවාගැනීම් සහ පුරප්පාඩු" : language === "ta" ? "ஆட்சேர்ப்பு & காலியிடங்கள்" : "Recruitment & Vacancies",
      },
      {
        key: "licensing",
        label: language === "si" ? "බලපත්‍ර සහ ලියාපදිංචිය" : language === "ta" ? "உரிமம் மற்றும் பதிவு" : "Licensing & Registration",
      },
      {
        key: "public_consultation",
        label: language === "si" ? "මහජන අදහස් විමසීම්" : language === "ta" ? "பொதுமக்கள் கலந்தாய்வு" : "Public Consultations",
      },
      {
        key: "general",
        label: language === "si" ? "පොදු නිවේදන" : language === "ta" ? "பொது அறிவித்தல்கள்" : "General Notices",
      },
    ]
  }, [language])

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setSortBy("newest")
  }

  // Filter and sort notices
  const filteredNotices = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase()

    let result = notices.filter((item) => {
      // Search by title, notice_number, summary, department, category_label
      if (
        keyword &&
        !item.title.toLowerCase().includes(keyword) &&
        !item.notice_number.toLowerCase().includes(keyword) &&
        !item.summary.toLowerCase().includes(keyword) &&
        !item.department.toLowerCase().includes(keyword) &&
        !item.category_label.toLowerCase().includes(keyword)
      ) {
        return false
      }

      // Category filter
      if (selectedCategory !== "All") {
        const itemCategory = (item.category || "").toLowerCase().trim()
        const targetCategory = selectedCategory.toLowerCase().trim()
        if (itemCategory !== targetCategory) {
          return false
        }
      }

      return true
    })

    // Sort notices
    result = [...result].sort((a, b) => {
      if (sortBy === "urgent") {
        const getPriorityScore = (n: ApiNoticeItem) => (n.is_urgent ? 3 : n.priority === "urgent" ? 3 : n.priority === "high" ? 2 : 1)
        return getPriorityScore(b) - getPriorityScore(a)
      }
      if (sortBy === "deadline") {
        return (a.expiry_date ?? "").localeCompare(b.expiry_date ?? "")
      }
      if (sortBy === "title-az") {
        return a.title.localeCompare(b.title)
      }
      // default: newest
      return (
        (b.published_date ?? "").localeCompare(a.published_date ?? "") ||
        a.order - b.order
      )
    })

    return result
  }, [notices, searchQuery, selectedCategory, sortBy])

  // Featured / Urgent Notice (shown in spotlight when no search filter is active)
  const featuredNotice = useMemo(() => {
    const explicitFeatured = notices.find((n) => n.is_featured)
    const urgentNotice = notices.find((n) => n.is_urgent || n.priority === "urgent")
    return explicitFeatured || urgentNotice || notices[0] || null
  }, [notices])

  return (
    <>
      {/* 1. Search & Category Filter Toolbar */}
      <NoticesToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
        resultCount={filteredNotices.length}
        onClearFilters={handleClearFilters}
      />

      {/* 2. Featured / Urgent Notice Spotlight Section */}
      {!searchQuery && selectedCategory === "All" && featuredNotice && (
        <NoticesFeatured
          featuredNotice={featuredNotice}
          featuredBadge={data?.header?.featured_badge || "Urgent / Important Notice"}
          onSelectNotice={(notice) => setSelectedNotice(notice)}
        />
      )}

      {/* 3. Official Notices Directory Grid */}
      <NoticesLibrary
        notices={filteredNotices}
        catalogueBadge={data?.header?.catalogue_badge || "Notice Board Directory"}
        libraryTitle={data?.header?.library_title || "All Official Notices & Public Gazettes"}
        onSelectNotice={(notice) => setSelectedNotice(notice)}
        onClearFilters={handleClearFilters}
      />

      {/* 4. Screen-Centered Accessible Notice Preview Popup Modal */}
      <NoticesPreview
        notice={selectedNotice}
        onClose={() => setSelectedNotice(null)}
      />
    </>
  )
}
