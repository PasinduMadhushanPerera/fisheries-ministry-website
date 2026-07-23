import type { StaticImageData } from "next/image"

export type NewsCategory =
  | "All"
  | "Ministry News"
  | "Fisheries"
  | "Aquaculture"
  | "Events"
  | "Community"

export type NewsArticle = {
  slug: string
  title: string
  excerpt: string
  content: string[]
  category: Exclude<NewsCategory, "All">
  publishedDate: string
  displayDate: string
  image: string | StaticImageData
  imageAlt: string
  featured: boolean
  author?: string
  location?: string
}

export const newsCategories: NewsCategory[] = [
  "All",
  "Ministry News",
  "Fisheries",
  "Aquaculture",
  "Events",
  "Community",
]

export const newsArticles: NewsArticle[] = [
  {
    slug: "national-fisheries-development-programme-launched",
    title: "National Fisheries Development Programme Launched",
    excerpt:
      "A new national programme has been introduced to strengthen sustainable fisheries, improve livelihoods and support coastal communities.",
    content: [
      "The Ministry of Fisheries, Aquatic and Ocean Resources has launched a national fisheries development programme focused on sustainable resource management, industry development and community welfare.",
      "The programme aims to improve fisheries infrastructure, promote responsible fishing practices and strengthen support services available to fishers and related businesses.",
      "Further information about implementation activities, regional programmes and application procedures will be published through official Ministry channels.",
    ],
    category: "Ministry News",
    publishedDate: "2026-07-20",
    displayDate: "20 July 2026",
    image: "/images/news/fisheries-development-programme.jpg",
    imageAlt:
      "Government representatives attending a fisheries development programme",
    featured: true,
    author: "Ministry Media Unit",
    location: "Colombo",
  },
  {
    slug: "coastal-fisher-training-programme",
    title: "Training Programme Conducted for Coastal Fishing Communities",
    excerpt:
      "Fishers received practical guidance on safety, sustainable fishing practices and responsible resource management.",
    content: [
      "A training programme was conducted for members of coastal fishing communities to improve awareness of marine safety and sustainable fishing practices.",
      "The sessions covered safe vessel operations, responsible fishing methods, conservation measures and access to government fisheries services.",
      "Regional programmes are expected to continue in selected fisheries districts.",
    ],
    category: "Community",
    publishedDate: "2026-07-16",
    displayDate: "16 July 2026",
    image: "/images/news/coastal-fisher-training.jpg",
    imageAlt:
      "Fishers participating in a coastal community training programme",
    featured: false,
    author: "Ministry Media Unit",
    location: "Southern Province",
  },
  {
    slug: "aquaculture-development-project-review",
    title: "Aquaculture Development Projects Reviewed",
    excerpt:
      "Officials reviewed progress, technical requirements and future development priorities for aquaculture projects.",
    content: [
      "The Ministry reviewed the progress of ongoing aquaculture development initiatives carried out with relevant institutions and regional authorities.",
      "The review focused on production capacity, technical support, environmental safeguards and opportunities for expanding responsible aquaculture activities.",
      "Recommendations from the review will support future planning and implementation.",
    ],
    category: "Aquaculture",
    publishedDate: "2026-07-12",
    displayDate: "12 July 2026",
    image: "/images/news/aquaculture-project-review.jpg",
    imageAlt:
      "Officials reviewing an aquaculture development facility",
    featured: false,
    author: "Ministry Media Unit",
  },
  {
    slug: "fishing-harbour-improvement-meeting",
    title: "Discussion Held on Fishing Harbour Improvements",
    excerpt:
      "Stakeholders discussed infrastructure, safety, sanitation and service improvements at major fishing harbours.",
    content: [
      "A stakeholder discussion was held to review planned improvements at selected fishing harbours.",
      "The discussion considered infrastructure maintenance, sanitation, safety, waste management and services for fishers and businesses.",
      "Relevant institutions will coordinate the next stages of assessment and implementation.",
    ],
    category: "Fisheries",
    publishedDate: "2026-07-08",
    displayDate: "8 July 2026",
    image: "/images/news/fishing-harbour-meeting.jpg",
    imageAlt:
      "Officials participating in a fishing harbour development meeting",
    featured: false,
    author: "Ministry Media Unit",
    location: "Colombo",
  },
  {
    slug: "marine-conservation-awareness-event",
    title: "Marine Conservation Awareness Event Conducted",
    excerpt:
      "Students and community representatives participated in an awareness event focused on marine ecosystem protection.",
    content: [
      "A marine conservation awareness event was conducted with the participation of students, community members and fisheries officials.",
      "The programme highlighted the importance of protecting marine habitats, reducing plastic pollution and supporting sustainable fisheries.",
      "Participants also received information about practical conservation activities that can be implemented within coastal communities.",
    ],
    category: "Events",
    publishedDate: "2026-07-04",
    displayDate: "4 July 2026",
    image: "/images/news/marine-conservation-event.jpg",
    imageAlt:
      "Students attending a marine conservation awareness event",
    featured: false,
    author: "Ministry Media Unit",
  },
  {
    slug: "new-support-services-for-small-scale-fishers",
    title: "New Support Services Introduced for Small-Scale Fishers",
    excerpt:
      "The Ministry has expanded access to guidance, training and welfare-related support for eligible fishers.",
    content: [
      "New support services have been introduced to improve access to official guidance, training and welfare programmes for small-scale fishers.",
      "Eligible applicants will be able to obtain information through regional fisheries offices and participating institutions.",
      "Detailed eligibility conditions and application guidance will be announced through official notices.",
    ],
    category: "Ministry News",
    publishedDate: "2026-06-28",
    displayDate: "28 June 2026",
    image: "/images/news/small-scale-fisher-support.jpg",
    imageAlt:
      "Small-scale fishers receiving information about government support services",
    featured: false,
    author: "Ministry Media Unit",
  },
]

export function getFeaturedNews() {
  return newsArticles.find((article) => article.featured)
}

export function getNewsBySlug(slug: string) {
  return newsArticles.find((article) => article.slug === slug)
}

export function getRelatedNews(article: NewsArticle, limit = 3) {
  return newsArticles
    .filter(
      (item) =>
        item.slug !== article.slug && item.category === article.category,
    )
    .slice(0, limit)
}