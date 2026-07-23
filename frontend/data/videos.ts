import type { StaticImageData } from "next/image"

export type VideoCategory =
  | "All"
  | "Official Events"
  | "Fisheries"
  | "Aquaculture"
  | "Community"
  | "Conservation"

export type VideoItem = {
  slug: string
  title: string
  description: string
  category: Exclude<VideoCategory, "All">
  publishedDate: string
  displayDate: string
  duration: string
  thumbnail: string | StaticImageData
  thumbnailAlt: string
  videoUrl: string
  youtubeId: string
  featured: boolean
  location?: string
}

export const videoCategories: VideoCategory[] = [
  "All",
  "Official Events",
  "Fisheries",
  "Aquaculture",
  "Community",
  "Conservation",
]

export const videos: VideoItem[] = [
  {
    slug: "national-fisheries-development-programme",
    title: "National Fisheries Development Programme",
    description:
      "Highlights from the official launch of the National Fisheries Development Programme.",
    category: "Official Events",
    publishedDate: "2026-07-20",
    displayDate: "20 July 2026",
    duration: "4:28",
    thumbnail:
      "/images/videos/national-fisheries-development.jpg",
    thumbnailAlt:
      "Officials launching the National Fisheries Development Programme",
    videoUrl: "https://www.youtube.com/watch?v=example001",
    youtubeId: "example001",
    featured: true,
    location: "Colombo",
  },
  {
    slug: "coastal-fisher-safety-training",
    title: "Coastal Fisher Safety Training Programme",
    description:
      "Training programme promoting safe fishing practices and emergency preparedness.",
    category: "Community",
    publishedDate: "2026-07-16",
    displayDate: "16 July 2026",
    duration: "6:12",
    thumbnail:
      "/images/videos/coastal-fisher-training.jpg",
    thumbnailAlt:
      "Fishers participating in a safety training programme",
    videoUrl: "https://www.youtube.com/watch?v=example002",
    youtubeId: "example002",
    featured: false,
    location: "Southern Province",
  },
  {
    slug: "aquaculture-development-project",
    title: "Aquaculture Development Project",
    description:
      "Overview of sustainable aquaculture development initiatives and infrastructure.",
    category: "Aquaculture",
    publishedDate: "2026-07-12",
    displayDate: "12 July 2026",
    duration: "5:47",
    thumbnail:
      "/images/videos/aquaculture-development.jpg",
    thumbnailAlt:
      "Aquaculture development facility",
    videoUrl: "https://www.youtube.com/watch?v=example003",
    youtubeId: "example003",
    featured: false,
    location: "North Western Province",
  },
  {
    slug: "fishing-harbour-development",
    title: "Fishing Harbour Development",
    description:
      "Infrastructure improvements and modernization of fishing harbours.",
    category: "Fisheries",
    publishedDate: "2026-07-08",
    displayDate: "8 July 2026",
    duration: "3:55",
    thumbnail:
      "/images/videos/fishing-harbour-development.jpg",
    thumbnailAlt:
      "Fishing harbour development activities",
    videoUrl: "https://www.youtube.com/watch?v=example004",
    youtubeId: "example004",
    featured: false,
    location: "Western Province",
  },
  {
    slug: "marine-conservation-awareness",
    title: "Marine Conservation Awareness Programme",
    description:
      "Students and community members participate in marine conservation awareness activities.",
    category: "Conservation",
    publishedDate: "2026-07-04",
    displayDate: "4 July 2026",
    duration: "5:03",
    thumbnail:
      "/images/videos/marine-conservation.jpg",
    thumbnailAlt:
      "Marine conservation awareness programme",
    videoUrl: "https://www.youtube.com/watch?v=example005",
    youtubeId: "example005",
    featured: false,
    location: "Galle",
  },
  {
    slug: "community-support-programme",
    title: "Small-Scale Fisher Community Support Programme",
    description:
      "Community outreach programme supporting small-scale fishers across Sri Lanka.",
    category: "Community",
    publishedDate: "2026-06-28",
    displayDate: "28 June 2026",
    duration: "4:41",
    thumbnail:
      "/images/videos/community-support.jpg",
    thumbnailAlt:
      "Community support programme for fishers",
    videoUrl: "https://www.youtube.com/watch?v=example006",
    youtubeId: "example006",
    featured: false,
    location: "Eastern Province",
  },
]

export function getFeaturedVideo() {
  return videos.find((video) => video.featured)
}

export function getVideoBySlug(slug: string) {
  return videos.find((video) => video.slug === slug)
}

export function getRelatedVideos(
  video: VideoItem,
  limit = 3,
) {
  return videos
    .filter(
      (item) =>
        item.slug !== video.slug &&
        item.category === video.category,
    )
    .slice(0, limit)
}