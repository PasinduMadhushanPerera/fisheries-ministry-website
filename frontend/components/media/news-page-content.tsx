"use client"

import { useEffect, useMemo, useState, useCallback } from "react"
import { NewsToolbar } from "@/components/media/news-toolbar"
import { NewsFeatured } from "@/components/media/news-featured"
import { NewsLibrary } from "@/components/media/news-library"
import { NewsPreview } from "@/components/media/news-preview"
import { useLanguage } from "@/src/contexts/LanguageContext"
import { fetchNewsPageData, type ApiNewsArticleItem, type ApiNewsPageData } from "@/lib/api/news"

interface NewsPageContentProps {
  initialData?: ApiNewsPageData | null
}

export function NewsPageContent({ initialData }: NewsPageContentProps) {
  const { language } = useLanguage()
  const [data, setData] = useState<ApiNewsPageData | null>(initialData || null)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [selectedArticle, setSelectedArticle] = useState<ApiNewsArticleItem | null>(null)

  // Function to load fresh localized news data
  const loadFreshNews = useCallback(async () => {
    try {
      const freshData = await fetchNewsPageData(language)
      if (freshData) {
        setData(freshData)
      }
    } catch (err) {
      console.error("Failed to load fresh news:", err)
    }
  }, [language])

  // Fetch fresh data on mount and on language switch
  useEffect(() => {
    void loadFreshNews()

    // Auto-refresh when admin tab switches back to this browser window
    const handleWindowFocus = () => {
      void loadFreshNews()
    }
    window.addEventListener("focus", handleWindowFocus)

    return () => {
      window.removeEventListener("focus", handleWindowFocus)
    }
  }, [loadFreshNews])

  // Display all active news articles from database
  const articles = useMemo(() => {
    return data?.articles || []
  }, [data])

  // Categories list matching backend CATEGORY_CHOICES
  const categories = useMemo(() => {
    return [
      {
        key: "All",
        label: language === "si" ? "සියල්ල" : language === "ta" ? "அனைத்தும்" : "All News",
      },
      {
        key: "ministry",
        label: language === "si" ? "අමාත්‍යාංශ පුවත්" : language === "ta" ? "அமைச்சுச் செய்திகள்" : "Ministry News",
      },
      {
        key: "development",
        label: language === "si" ? "ක්ෂේත්‍ර සංවර්ධනය" : language === "ta" ? "துறைசார் அபிவிருத்தி" : "Sector Development",
      },
      {
        key: "community",
        label: language === "si" ? "ධීවර ප්‍රජාව සහ සුබසාධනය" : language === "ta" ? "மீனவ சமூகம் & நலன்புரி" : "Fisher Community & Welfare",
      },
      {
        key: "aquaculture",
        label: language === "si" ? "ජලජීවී සහ මිරිදිය වගාව" : language === "ta" ? "நீரியல் மற்றும் நன்னீர் வளர்ப்பு" : "Aquaculture & Inland",
      },
      {
        key: "ocean",
        label: language === "si" ? "සාගර සම්පත් සහ සංරක්ෂණය" : language === "ta" ? "கடல்சார் வளங்கள் & பாதுகாப்பு" : "Ocean Resources & Marine",
      },
      {
        key: "events",
        label: language === "si" ? "විශේෂ සිදුවීම් සහ උත්සව" : language === "ta" ? "நிகழ்வுகள் & வைபவங்கள்" : "Events & Ceremonies",
      },
      {
        key: "other",
        label: language === "si" ? "පොදු පුවත්" : language === "ta" ? "பொதுச் செய்திகள்" : "General News",
      },
    ]
  }, [language])

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setSortBy("newest")
  }

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase()

    let result = articles.filter((item) => {
      // Search
      if (
        keyword &&
        !item.title.toLowerCase().includes(keyword) &&
        !item.summary.toLowerCase().includes(keyword) &&
        !item.publisher.toLowerCase().includes(keyword) &&
        !item.category_label.toLowerCase().includes(keyword)
      ) {
        return false
      }

      // Category filter matching category key or label
      if (selectedCategory !== "All") {
        const itemCategory = (item.category || "").toLowerCase().trim()
        const targetCategory = selectedCategory.toLowerCase().trim()
        if (itemCategory !== targetCategory) {
          return false
        }
      }

      return true
    })

    // Sort
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
  }, [articles, searchQuery, selectedCategory, sortBy])

  // Top featured story
  const featuredArticle = useMemo(() => {
    const explicitFeatured = articles.find((a) => a.is_featured)
    return explicitFeatured || articles[0] || null
  }, [articles])

  // Articles for the library grid
  const libraryArticles = useMemo(() => {
    return filteredArticles
  }, [filteredArticles])

  return (
    <>
      {/* 1. Search & Category Filter Toolbar */}
      <NewsToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
        resultCount={filteredArticles.length}
        onClearFilters={handleClearFilters}
      />

      {/* 2. Featured Story Section (shown when no search or category filter is active) */}
      {!searchQuery && selectedCategory === "All" && featuredArticle && (
        <NewsFeatured
          featuredArticle={featuredArticle}
          featuredBadge={data?.header?.featured_badge || "Latest Featured News"}
          onSelectArticle={(article) => setSelectedArticle(article)}
        />
      )}

      {/* 3. All News Articles Library Grid */}
      <NewsLibrary
        articles={libraryArticles}
        catalogueBadge={data?.header?.catalogue_badge || "Official News Feed"}
        libraryTitle={data?.header?.library_title || "All News & Press Updates"}
        onSelectArticle={(article) => setSelectedArticle(article)}
        onClearFilters={handleClearFilters}
      />

      {/* 4. Screen-Centered Accessible News Preview Popup Window */}
      <NewsPreview
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </>
  )
}
