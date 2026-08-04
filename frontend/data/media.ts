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
    href: "/media-centre/news",
    icon: "newspaper",
  },
  {
    id: 2,
    title: "Public Notices",
    description:
      "Public notices, gazette announcements, procurement opportunities and licensing updates.",
    href: "/media-centre/notices",
    icon: "bell",
  },
  {
    id: 3,
    title: "Press Releases",
    description:
      "Official press releases, statements and media briefings.",
    href: "/media-centre/press-releases",
    icon: "megaphone",
  },
  {
    id: 4,
    title: "Events",
    description:
      "Upcoming conferences, awareness programmes and ministry events.",
    href: "/news-and-events",
    icon: "calendar",
  },
  {
    id: 5,
    title: "Photo Gallery",
    description:
      "Official photographs from ministry programmes, field visits and activities.",
    href: "/media-centre/gallery",
    icon: "image",
  },
  {
    id: 6,
    title: "Video Gallery",
    description:
      "Videos highlighting projects, campaigns and official events.",
    href: "/media-centre/videos",
    icon: "video",
  },
]

export const featuredNews: NewsArticle[] = [
  {
    id: 1,
    title: "National Fisheries Development Programme Launched",
    summary:
      "Major nationwide initiative launched to empower artisanal fishing communities and upgrade harbor infrastructure across coastal districts.",
    category: "Development",
    date: "15 May 2026",
    image: "/placeholder-news.jpg",
    href: "/media-centre/news/national-fisheries-development-programme-launched",
    featured: true,
  },
  {
    id: 2,
    title: "Sustainable Aquaculture Expansion Plan",
    summary:
      "Cabinet approves new inland shrimp and freshwater fish farming framework to boost regional employment and seafood exports.",
    category: "Aquaculture",
    date: "02 May 2026",
    image: "/placeholder-news.jpg",
    href: "/media-centre/news/sustainable-aquaculture-expansion-plan",
  },
  {
    id: 3,
    title: "New Safety Equipment Distributed to Coastal Fishers",
    summary:
      "VHF radios and lifejackets issued to multiday fishing vessel operators in Southern and Eastern provinces.",
    category: "Safety",
    date: "28 April 2026",
    image: "/placeholder-news.jpg",
    href: "/media-centre/news/new-safety-equipment-distributed-to-coastal-fishers",
  },
]

export const latestAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "Registration Renewal Notice for Commercial Vessels 2026",
    date: "10 May 2026",
    href: "/media-centre/notices/registration-renewal-for-fishing-vessels-2026",
  },
  {
    id: 2,
    title: "Procurement Notice: Safety Equipment for Fishing Communities",
    date: "04 May 2026",
    href: "/media-centre/notices/procurement-of-safety-equipment-for-fishing-communities",
  },
  {
    id: 3,
    title: "Applications Called for Fisheries Inspector Trainees",
    date: "25 April 2026",
    href: "/media-centre/notices/applications-for-fisheries-inspector-trainees",
  },
]

export const upcomingEvents: Event[] = [
  {
    id: 1,
    title: "National Fisheries Symposium 2026",
    location: "BMICH, Colombo",
    date: "20 June 2026",
    href: "/news-and-events",
  },
  {
    id: 2,
    title: "Coastal Fisher Safety & Radio Training Workshop",
    location: "Tangalle Fishery Harbour",
    date: "12 June 2026",
    href: "/news-and-events",
  },
  {
    id: 3,
    title: "Inland Aquaculture Farmers Conference",
    location: "Auditorium, Anuradhapura",
    date: "05 June 2026",
    href: "/news-and-events",
  },
]

export const galleryPreview: GalleryItem[] = [
  {
    id: 1,
    title: "National Fisheries Development Programme",
    type: "photo",
    image: "/placeholder-gallery.jpg",
    href: "/media-centre/gallery/national-fisheries-development-programme",
  },
  {
    id: 2,
    title: "Coastal Fisher Safety Training",
    type: "photo",
    image: "/placeholder-gallery.jpg",
    href: "/media-centre/gallery/coastal-fisher-safety-training",
  },
  {
    id: 3,
    title: "Aquaculture Facility Inspection",
    type: "photo",
    image: "/placeholder-gallery.jpg",
    href: "/media-centre/gallery/aquaculture-facility-inspection",
  },
  {
    id: 4,
    title: "Fisheries Development Initiative",
    type: "video",
    image: "/placeholder-gallery.jpg",
    href: "/media-centre/videos/national-fisheries-development-programme",
  },
  {
    id: 5,
    title: "Safety at Sea Training",
    type: "video",
    image: "/placeholder-gallery.jpg",
    href: "/media-centre/videos/coastal-fisher-safety-training",
  },
]