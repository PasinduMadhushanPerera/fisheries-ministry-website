"use client"

import { useEffect, useMemo, useState, useCallback } from "react"
import { VideosToolbar } from "@/components/media/videos-toolbar"
import { FeaturedVideo } from "@/components/media/featured-video"
import { VideoList } from "@/components/media/video-list"
import { VideoModal } from "@/components/media/video-modal"
import { useLanguage } from "@/src/contexts/LanguageContext"
import { fetchVideosPageData, type ApiVideoItem, type ApiVideosPageData } from "@/lib/api/videos"

interface VideosPageContentProps {
  initialData?: ApiVideosPageData | null
}

export function VideosPageContent({ initialData }: VideosPageContentProps) {
  const { language } = useLanguage()
  const [data, setData] = useState<ApiVideosPageData | null>(initialData || null)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [selectedVideo, setSelectedVideo] = useState<ApiVideoItem | null>(null)

  // Function to load fresh localized videos data
  const loadFreshVideos = useCallback(async () => {
    try {
      const freshData = await fetchVideosPageData(language)
      if (freshData) {
        setData(freshData)
      }
    } catch (err) {
      console.error("Failed to load fresh videos data:", err)
    }
  }, [language])

  // Refetch on mount, language change, and window focus
  useEffect(() => {
    void loadFreshVideos()

    const handleWindowFocus = () => {
      void loadFreshVideos()
    }
    window.addEventListener("focus", handleWindowFocus)

    return () => {
      window.removeEventListener("focus", handleWindowFocus)
    }
  }, [loadFreshVideos])

  // All active videos from database
  const videos = useMemo(() => {
    return data?.videos || []
  }, [data])

  // Categories list matching backend choices
  const categories = useMemo(() => {
    return [
      {
        key: "All",
        label: language === "si" ? "සියල්ල" : language === "ta" ? "அனைத்தும்" : "All Categories",
      },
      {
        key: "official_events",
        label: language === "si" ? "නිල උත්සව" : language === "ta" ? "உத்தியோகபூர்வ நிகழ்வுகள்" : "Official Events",
      },
      {
        key: "fisheries",
        label: language === "si" ? "ධීවර හා සාගර" : language === "ta" ? "கடற்றொழில்" : "Fisheries & Marine",
      },
      {
        key: "aquaculture",
        label: language === "si" ? "ජලජීවී වගා" : language === "ta" ? "நீரியல் வளர்ப்பு" : "Aquaculture",
      },
      {
        key: "community",
        label: language === "si" ? "ප්‍රජා සුබසාධන" : language === "ta" ? "සමூக நலன்புரி" : "Community & Welfare",
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

  // Filter and sort videos
  const filteredVideos = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase()

    let result = videos.filter((item) => {
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

    // Sort videos
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
  }, [videos, searchQuery, selectedCategory, sortBy])

  // Featured Video (shown in spotlight when no search/category filter is active)
  const featuredVideo = useMemo(() => {
    const explicitFeatured = videos.find((v) => v.is_featured)
    return explicitFeatured || videos[0] || null
  }, [videos])

  return (
    <>
      {/* 1. Standardized Filter Toolbar */}
      <VideosToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
        resultCount={filteredVideos.length}
        onClearFilters={handleClearFilters}
      />

      {/* 2. Featured Official Video Spotlight */}
      {!searchQuery && selectedCategory === "All" && featuredVideo && (
        <FeaturedVideo
          featuredVideo={featuredVideo}
          featuredBadge={data?.header?.featured_badge || "Featured Official Video"}
          onSelectVideo={(video) => setSelectedVideo(video)}
        />
      )}

      {/* 3. Official Video Directory Grid */}
      <VideoList
        videos={filteredVideos}
        catalogueBadge={data?.header?.catalogue_badge || "Video Directory"}
        libraryTitle={data?.header?.library_title || "All Official Videos & Documentaries"}
        onSelectVideo={(video) => setSelectedVideo(video)}
        onClearFilters={handleClearFilters}
      />

      {/* 4. Interactive Video Player Modal */}
      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </>
  )
}
