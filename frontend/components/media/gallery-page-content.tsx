"use client"

import { useEffect, useMemo, useState, useCallback } from "react"
import { GalleryToolbar } from "@/components/media/gallery-toolbar"
import { GalleryFeatured } from "@/components/media/gallery-featured"
import { GalleryGrid } from "@/components/media/gallery-grid"
import { GalleryPreview } from "@/components/media/gallery-preview"
import { useLanguage } from "@/src/contexts/LanguageContext"
import { fetchGalleryPageData, type ApiGalleryAlbum, type ApiGalleryPageData } from "@/lib/api/gallery"

interface GalleryPageContentProps {
  initialData?: ApiGalleryPageData | null
}

export function GalleryPageContent({ initialData }: GalleryPageContentProps) {
  const { language } = useLanguage()
  const [data, setData] = useState<ApiGalleryPageData | null>(initialData || null)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [selectedAlbum, setSelectedAlbum] = useState<ApiGalleryAlbum | null>(null)

  // Function to load fresh localized gallery data
  const loadFreshGallery = useCallback(async () => {
    try {
      const freshData = await fetchGalleryPageData(language)
      if (freshData) {
        setData(freshData)
      }
    } catch (err) {
      console.error("Failed to load fresh gallery data:", err)
    }
  }, [language])

  // Refetch on mount, language change, and window focus
  useEffect(() => {
    void loadFreshGallery()

    const handleWindowFocus = () => {
      void loadFreshGallery()
    }
    window.addEventListener("focus", handleWindowFocus)

    return () => {
      window.removeEventListener("focus", handleWindowFocus)
    }
  }, [loadFreshGallery])

  // All active albums from database
  const albums = useMemo(() => {
    return data?.albums || []
  }, [data])

  // Categories list matching backend choices
  const categories = useMemo(() => {
    return [
      {
        key: "All",
        label: language === "si" ? "සියල්ල" : language === "ta" ? "அனைத்தும்" : "All Collections",
      },
      {
        key: "official_events",
        label: language === "si" ? "නිල උත්සව" : language === "ta" ? "உத்தியோகபூர்வ நிகழ்வுகள்" : "Official Events",
      },
      {
        key: "fisheries",
        label: language === "si" ? "ධීවර හා සාගර" : language === "ta" ? "கடற்றොழில்" : "Fisheries & Marine",
      },
      {
        key: "aquaculture",
        label: language === "si" ? "ජලජීවී වගා" : language === "ta" ? "நீரியல் வளர்ப்பு" : "Aquaculture",
      },
      {
        key: "community",
        label: language === "si" ? "ප්‍රජා සුබසාධන" : language === "ta" ? "சமூக நலன்புரி" : "Community & Welfare",
      },
      {
        key: "conservation",
        label: language === "si" ? "පරිසර සංරක්ෂණ" : language === "ta" ? "சுற்றாடல் பாதுகாப்பு" : "Conservation",
      },
    ]
  }, [language])

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setSortBy("newest")
  }

  // Filter and sort albums
  const filteredAlbums = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase()

    let result = albums.filter((item) => {
      // Search keyword filter
      if (
        keyword &&
        !item.title.toLowerCase().includes(keyword) &&
        !item.description.toLowerCase().includes(keyword) &&
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

    // Sort albums
    result = [...result].sort((a, b) => {
      if (sortBy === "photos-count") {
        return (b.image_count || b.images.length) - (a.image_count || a.images.length)
      }
      if (sortBy === "featured") {
        return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0)
      }
      if (sortBy === "title-az") {
        return a.title.localeCompare(b.title)
      }
      // default: newest
      return (
        (b.event_date ?? "").localeCompare(a.event_date ?? "") ||
        a.order - b.order
      )
    })

    return result
  }, [albums, searchQuery, selectedCategory, sortBy])

  // Featured Album (shown in spotlight when no search/category filter active)
  const featuredAlbum = useMemo(() => {
    const explicitFeatured = albums.find((a) => a.is_featured)
    return explicitFeatured || albums[0] || null
  }, [albums])

  return (
    <>
      {/* 1. Standardized Filter Toolbar */}
      <GalleryToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
        resultCount={filteredAlbums.length}
        onClearFilters={handleClearFilters}
      />

      {/* 2. Featured Photo Collection Spotlight Section */}
      {!searchQuery && selectedCategory === "All" && featuredAlbum && (
        <GalleryFeatured
          featuredAlbum={featuredAlbum}
          featuredBadge={data?.header?.featured_badge || "Featured Collection"}
          onSelectAlbum={(album) => setSelectedAlbum(album)}
        />
      )}

      {/* 3. Official Photo Collections Grid */}
      <GalleryGrid
        albums={filteredAlbums}
        catalogueBadge={data?.header?.catalogue_badge || "Photo Albums"}
        libraryTitle={data?.header?.library_title || "All Photo Collections & State Albums"}
        onSelectAlbum={(album) => setSelectedAlbum(album)}
        onClearFilters={handleClearFilters}
      />

      {/* 4. Interactive Photo Viewer / Lightbox Modal */}
      <GalleryPreview
        album={selectedAlbum}
        onClose={() => setSelectedAlbum(null)}
      />
    </>
  )
}
