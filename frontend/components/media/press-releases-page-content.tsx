"use client"

import { useEffect, useMemo, useState, useCallback } from "react"
import { PressReleasesToolbar } from "@/components/media/press-releases-toolbar"
import { PressReleasesFeatured } from "@/components/media/press-releases-featured"
import { PressReleasesLibrary } from "@/components/media/press-releases-library"
import { PressReleasesPreview } from "@/components/media/press-releases-preview"
import { useLanguage } from "@/src/contexts/LanguageContext"
import { fetchPressReleasesPageData, type ApiPressReleaseItem, type ApiPressReleasesPageData } from "@/lib/api/press-releases"

interface PressReleasesPageContentProps {
  initialData?: ApiPressReleasesPageData | null
}

export function PressReleasesPageContent({ initialData }: PressReleasesPageContentProps) {
  const { language } = useLanguage()
  const [data, setData] = useState<ApiPressReleasesPageData | null>(initialData || null)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [selectedRelease, setSelectedRelease] = useState<ApiPressReleaseItem | null>(null)

  // Load fresh localized press releases data
  const loadFreshReleases = useCallback(async () => {
    try {
      const freshData = await fetchPressReleasesPageData(language)
      if (freshData) {
        setData(freshData)
      }
    } catch (err) {
      console.error("Failed to load fresh press releases:", err)
    }
  }, [language])

  // Fetch on mount, language switch, and window focus
  useEffect(() => {
    void loadFreshReleases()

    const handleWindowFocus = () => {
      void loadFreshReleases()
    }
    window.addEventListener("focus", handleWindowFocus)

    return () => {
      window.removeEventListener("focus", handleWindowFocus)
    }
  }, [loadFreshReleases])

  // All active press releases from database
  const pressReleases = useMemo(() => {
    return data?.press_releases || []
  }, [data])

  // Categories list matching backend CATEGORY_CHOICES
  const categories = useMemo(() => {
    return [
      {
        key: "All",
        label: language === "si" ? "සියල්ල" : language === "ta" ? "அனைத்தும்" : "All Releases",
      },
      {
        key: "ministerial_statement",
        label: language === "si" ? "අමාත්‍ය ප්‍රකාශ" : language === "ta" ? "அமைச்சரின் அறிக்கைகள்" : "Ministerial Statements",
      },
      {
        key: "sector_progress",
        label: language === "si" ? "ක්ෂේත්‍ර ප්‍රගතිය" : language === "ta" ? "துறைசார் முன்னேற்றம்" : "Sector & Export Progress",
      },
      {
        key: "fisher_welfare",
        label: language === "si" ? "ධීවර සුබසාධනය" : language === "ta" ? "மீனவ நலன்புரி" : "Fisher Welfare & Relief",
      },
      {
        key: "ocean_conservation",
        label: language === "si" ? "සාගර සංරක්ෂණය" : language === "ta" ? "கடல்சார் பாதுகாப்பு" : "Ocean Conservation",
      },
      {
        key: "bilateral_cooperation",
        label: language === "si" ? "ද්විපාර්ශ්වික සබඳතා" : language === "ta" ? "இருதரப்பு ஒத்துழைப்பு" : "Bilateral Cooperation",
      },
      {
        key: "emergency_alert",
        label: language === "si" ? "ආරක්ෂණ නිවේදන" : language === "ta" ? "பாதுகாப்பு எச்சரிக்கைகள்" : "Maritime Safety Alerts",
      },
      {
        key: "general",
        label: language === "si" ? "පොදු මාධ්‍ය නිවේදන" : language === "ta" ? "பொது ஊடக வெளியீடுகள்" : "General Releases",
      },
    ]
  }, [language])

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setSortBy("newest")
  }

  // Filter and sort press releases
  const filteredReleases = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase()

    let result = pressReleases.filter((item) => {
      // Search by title, release_number, summary, publisher, location, category_label
      if (
        keyword &&
        !item.title.toLowerCase().includes(keyword) &&
        !item.release_number.toLowerCase().includes(keyword) &&
        !item.summary.toLowerCase().includes(keyword) &&
        !item.publisher.toLowerCase().includes(keyword) &&
        !item.location.toLowerCase().includes(keyword) &&
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

    // Sort press releases
    result = [...result].sort((a, b) => {
      if (sortBy === "featured") {
        return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0)
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
  }, [pressReleases, searchQuery, selectedCategory, sortBy])

  // Featured Press Release (shown in spotlight when no search/category filter is active)
  const featuredRelease = useMemo(() => {
    const explicitFeatured = pressReleases.find((r) => r.is_featured)
    return explicitFeatured || pressReleases[0] || null
  }, [pressReleases])

  return (
    <>
      {/* 1. Search & Category Filter Toolbar */}
      <PressReleasesToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
        resultCount={filteredReleases.length}
        onClearFilters={handleClearFilters}
      />

      {/* 2. Featured Lead Press Release Spotlight Section */}
      {!searchQuery && selectedCategory === "All" && featuredRelease && (
        <PressReleasesFeatured
          featuredRelease={featuredRelease}
          featuredBadge={data?.header?.featured_badge || "Lead Press Briefing"}
          onSelectRelease={(release) => setSelectedRelease(release)}
        />
      )}

      {/* 3. Official Press Releases Directory Grid */}
      <PressReleasesLibrary
        pressReleases={filteredReleases}
        catalogueBadge={data?.header?.catalogue_badge || "Press Room Archive"}
        libraryTitle={data?.header?.library_title || "All Official Press Releases & Media Briefings"}
        onSelectRelease={(release) => setSelectedRelease(release)}
        onClearFilters={handleClearFilters}
      />

      {/* 4. Screen-Centered Accessible Press Release Preview Popup Modal */}
      <PressReleasesPreview
        release={selectedRelease}
        onClose={() => setSelectedRelease(null)}
      />
    </>
  )
}
