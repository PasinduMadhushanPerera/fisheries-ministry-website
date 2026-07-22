export interface MediaCategory {
  id: number
  title: string
  description: string
  href: string
  icon:
    | "newspaper"
    | "megaphone"
    | "calendar"
    | "image"
    | "video"
    | "bell"
}

export interface NewsArticle {
  id: number
  title: string
  summary: string
  category: string
  date: string
  image: string
  href: string
  featured?: boolean
}

export interface Announcement {
  id: number
  title: string
  date: string
  href: string
}

export interface Event {
  id: number
  title: string
  location: string
  date: string
  href: string
}

export interface GalleryItem {
  id: number
  title: string
  type: "photo" | "video"
  image: string
  href: string
}

export const mediaCategories: MediaCategory[] = [
  {
    id: 1,
    title: "News",
    description:
      "Latest ministry news, fisheries sector developments and official updates.",
    href: "/media/news",
    icon: "newspaper",
  },
  {
    id: 2,
    title: "Press Releases",
    description:
      "Official press releases, statements and media briefings.",
    href: "/media/press-releases",
    icon: "megaphone",
  },
  {
    id: 3,
    title: "Events",
    description:
      "Upcoming conferences, awareness programmes and ministry events.",
    href: "/media/events",
    icon: "calendar",
  },
  {
    id: 4,
    title: "Photo Gallery",
    description:
      "Official photographs from ministry programmes and activities.",
    href: "/media/gallery",
    icon: "image",
  },
  {
    id: 5,
    title: "Video Gallery",
    description:
      "Videos highlighting projects, campaigns and official events.",
    href: "/media/videos",
    icon: "video",
  },
  {
    id: 6,
    title: "Announcements",
    description:
      "Public notices, important announcements and service updates.",
    href: "/media/announcements",
    icon: "bell",
  },
]

export const featuredNews: NewsArticle[] = [
  {
    id: 1,
    title: "Sample Ministry News Headline",
    summary:
      "Placeholder content for featured ministry news. Replace with approved official content through the admin panel.",
    category: "News",
    date: "To be Updated",
    image: "/placeholder-news.jpg",
    href: "/media/news",
    featured: true,
  },
  {
    id: 2,
    title: "Sample Fisheries Development Programme",
    summary:
      "Placeholder content describing a fisheries development initiative.",
    category: "Programme",
    date: "To be Updated",
    image: "/placeholder-news.jpg",
    href: "/media/news",
  },
  {
    id: 3,
    title: "Sample Marine Conservation Initiative",
    summary:
      "Placeholder content highlighting marine conservation activities.",
    category: "Environment",
    date: "To be Updated",
    image: "/placeholder-news.jpg",
    href: "/media/news",
  },
]

export const latestAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "Sample Public Announcement",
    date: "To be Updated",
    href: "/media/announcements",
  },
  {
    id: 2,
    title: "Sample Service Notification",
    date: "To be Updated",
    href: "/media/announcements",
  },
  {
    id: 3,
    title: "Sample Ministry Notice",
    date: "To be Updated",
    href: "/media/announcements",
  },
]

export const upcomingEvents: Event[] = [
  {
    id: 1,
    title: "Sample Fisheries Workshop",
    location: "Location to be updated",
    date: "To be Updated",
    href: "/media/events",
  },
  {
    id: 2,
    title: "Sample Awareness Programme",
    location: "Location to be updated",
    date: "To be Updated",
    href: "/media/events",
  },
  {
    id: 3,
    title: "Sample Stakeholder Meeting",
    location: "Location to be updated",
    date: "To be Updated",
    href: "/media/events",
  },
]

export const galleryPreview: GalleryItem[] = [
  {
    id: 1,
    title: "Official Photo",
    type: "photo",
    image: "/placeholder-gallery.jpg",
    href: "/media/gallery",
  },
  {
    id: 2,
    title: "Official Photo",
    type: "photo",
    image: "/placeholder-gallery.jpg",
    href: "/media/gallery",
  },
  {
    id: 3,
    title: "Official Photo",
    type: "photo",
    image: "/placeholder-gallery.jpg",
    href: "/media/gallery",
  },
  {
    id: 4,
    title: "Official Video",
    type: "video",
    image: "/placeholder-gallery.jpg",
    href: "/media/videos",
  },
  {
    id: 5,
    title: "Official Video",
    type: "video",
    image: "/placeholder-gallery.jpg",
    href: "/media/videos",
  },
]