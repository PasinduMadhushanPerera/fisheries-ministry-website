import type { StaticImageData } from "next/image"

export type GalleryCategory =
  | "All"
  | "Official Events"
  | "Fisheries"
  | "Aquaculture"
  | "Community"
  | "Conservation"

export type GalleryImage = {
  id: string
  src: string | StaticImageData
  alt: string
  caption: string
}

export type GalleryAlbum = {
  slug: string
  title: string
  description: string
  category: Exclude<GalleryCategory, "All">
  eventDate: string
  displayDate: string
  location?: string
  coverImage: string | StaticImageData
  coverImageAlt: string
  images: GalleryImage[]
  featured: boolean
}

export const galleryCategories: GalleryCategory[] = [
  "All",
  "Official Events",
  "Fisheries",
  "Aquaculture",
  "Community",
  "Conservation",
]

export const galleryAlbums: GalleryAlbum[] = [
  {
    slug: "national-fisheries-development-programme",
    title: "National Fisheries Development Programme",
    description:
      "Highlights from the official launch of the National Fisheries Development Programme and stakeholder participation.",
    category: "Official Events",
    eventDate: "2026-07-20",
    displayDate: "20 July 2026",
    location: "Colombo",
    coverImage:
      "/images/gallery/national-fisheries-development/cover.jpg",
    coverImageAlt:
      "Officials attending the National Fisheries Development Programme",
    featured: true,
    images: [
      {
        id: "national-development-1",
        src: "/images/gallery/national-fisheries-development/image-01.jpg",
        alt: "Officials seated during the fisheries development programme",
        caption:
          "Government officials and stakeholders attending the programme.",
      },
      {
        id: "national-development-2",
        src: "/images/gallery/national-fisheries-development/image-02.jpg",
        alt: "Speaker addressing participants at the official programme",
        caption:
          "A Ministry representative addressing the invited participants.",
      },
      {
        id: "national-development-3",
        src: "/images/gallery/national-fisheries-development/image-03.jpg",
        alt: "Participants discussing fisheries development activities",
        caption:
          "Stakeholders discussing national fisheries development priorities.",
      },
      {
        id: "national-development-4",
        src: "/images/gallery/national-fisheries-development/image-04.jpg",
        alt: "Group photograph from the fisheries development programme",
        caption:
          "Officials and stakeholders photographed following the programme.",
      },
    ],
  },
  {
    slug: "coastal-fisher-safety-training",
    title: "Coastal Fisher Safety Training Programme",
    description:
      "A practical training programme conducted for coastal fishers on marine safety, responsible fishing and emergency preparedness.",
    category: "Community",
    eventDate: "2026-07-16",
    displayDate: "16 July 2026",
    location: "Southern Province",
    coverImage:
      "/images/gallery/coastal-fisher-safety-training/cover.jpg",
    coverImageAlt:
      "Fishers participating in a coastal safety training programme",
    featured: false,
    images: [
      {
        id: "coastal-training-1",
        src: "/images/gallery/coastal-fisher-safety-training/image-01.jpg",
        alt: "Trainer explaining marine safety equipment to fishers",
        caption:
          "Participants receiving guidance on essential marine safety equipment.",
      },
      {
        id: "coastal-training-2",
        src: "/images/gallery/coastal-fisher-safety-training/image-02.jpg",
        alt: "Fishers taking part in a practical safety demonstration",
        caption:
          "A practical demonstration conducted during the training programme.",
      },
      {
        id: "coastal-training-3",
        src: "/images/gallery/coastal-fisher-safety-training/image-03.jpg",
        alt: "Community members attending a fisheries awareness session",
        caption:
          "Community members participating in the fisheries awareness session.",
      },
      {
        id: "coastal-training-4",
        src: "/images/gallery/coastal-fisher-safety-training/image-04.jpg",
        alt: "Officials speaking with coastal fishing community members",
        caption:
          "Officials discussing safety concerns with members of the community.",
      },
    ],
  },
  {
    slug: "aquaculture-facility-inspection",
    title: "Aquaculture Facility Inspection",
    description:
      "Ministry officials reviewed production facilities, environmental safeguards and technical requirements at an aquaculture development site.",
    category: "Aquaculture",
    eventDate: "2026-07-12",
    displayDate: "12 July 2026",
    location: "North Western Province",
    coverImage:
      "/images/gallery/aquaculture-facility-inspection/cover.jpg",
    coverImageAlt:
      "Officials inspecting an aquaculture production facility",
    featured: false,
    images: [
      {
        id: "aquaculture-inspection-1",
        src: "/images/gallery/aquaculture-facility-inspection/image-01.jpg",
        alt: "Officials walking through an aquaculture facility",
        caption:
          "The inspection team reviewing the facility infrastructure.",
      },
      {
        id: "aquaculture-inspection-2",
        src: "/images/gallery/aquaculture-facility-inspection/image-02.jpg",
        alt: "Aquaculture tanks at a production site",
        caption:
          "Production tanks and supporting infrastructure at the facility.",
      },
      {
        id: "aquaculture-inspection-3",
        src: "/images/gallery/aquaculture-facility-inspection/image-03.jpg",
        alt: "Technical officers inspecting water quality systems",
        caption:
          "Technical officers reviewing water quality management systems.",
      },
      {
        id: "aquaculture-inspection-4",
        src: "/images/gallery/aquaculture-facility-inspection/image-04.jpg",
        alt: "Officials meeting aquaculture facility representatives",
        caption:
          "A discussion with representatives responsible for facility operations.",
      },
    ],
  },
  {
    slug: "fishing-harbour-development-review",
    title: "Fishing Harbour Development Review",
    description:
      "A field visit and stakeholder review focused on harbour infrastructure, sanitation, safety and operational improvements.",
    category: "Fisheries",
    eventDate: "2026-07-08",
    displayDate: "8 July 2026",
    location: "Western Province",
    coverImage:
      "/images/gallery/fishing-harbour-development/cover.jpg",
    coverImageAlt:
      "Officials reviewing infrastructure at a fishing harbour",
    featured: false,
    images: [
      {
        id: "harbour-review-1",
        src: "/images/gallery/fishing-harbour-development/image-01.jpg",
        alt: "Officials inspecting a fishing harbour",
        caption:
          "Officials inspecting harbour facilities and operational areas.",
      },
      {
        id: "harbour-review-2",
        src: "/images/gallery/fishing-harbour-development/image-02.jpg",
        alt: "Fishing vessels docked at the harbour",
        caption:
          "Fishing vessels and working areas within the harbour.",
      },
      {
        id: "harbour-review-3",
        src: "/images/gallery/fishing-harbour-development/image-03.jpg",
        alt: "Stakeholders discussing harbour infrastructure improvements",
        caption:
          "Stakeholders discussing infrastructure and sanitation requirements.",
      },
      {
        id: "harbour-review-4",
        src: "/images/gallery/fishing-harbour-development/image-04.jpg",
        alt: "Harbour facilities viewed during the inspection",
        caption:
          "Existing harbour facilities reviewed during the field visit.",
      },
    ],
  },
  {
    slug: "marine-conservation-awareness-programme",
    title: "Marine Conservation Awareness Programme",
    description:
      "Students, community representatives and officials participated in an awareness programme on marine ecosystem protection.",
    category: "Conservation",
    eventDate: "2026-07-04",
    displayDate: "4 July 2026",
    location: "Galle",
    coverImage:
      "/images/gallery/marine-conservation-awareness/cover.jpg",
    coverImageAlt:
      "Students attending a marine conservation awareness programme",
    featured: false,
    images: [
      {
        id: "marine-awareness-1",
        src: "/images/gallery/marine-conservation-awareness/image-01.jpg",
        alt: "Students listening to a marine conservation presentation",
        caption:
          "Students learning about the importance of marine ecosystem protection.",
      },
      {
        id: "marine-awareness-2",
        src: "/images/gallery/marine-conservation-awareness/image-02.jpg",
        alt: "Community members participating in an environmental activity",
        caption:
          "Community participation in an environmental awareness activity.",
      },
      {
        id: "marine-awareness-3",
        src: "/images/gallery/marine-conservation-awareness/image-03.jpg",
        alt: "Officials explaining marine pollution prevention",
        caption:
          "Officials providing guidance on marine pollution prevention.",
      },
      {
        id: "marine-awareness-4",
        src: "/images/gallery/marine-conservation-awareness/image-04.jpg",
        alt: "Participants gathered at the conservation programme",
        caption:
          "Participants gathered at the conclusion of the programme.",
      },
    ],
  },
  {
    slug: "small-scale-fisher-community-support",
    title: "Small-Scale Fisher Community Support Programme",
    description:
      "A community programme providing guidance on welfare services, training opportunities and government support.",
    category: "Community",
    eventDate: "2026-06-28",
    displayDate: "28 June 2026",
    location: "Eastern Province",
    coverImage:
      "/images/gallery/fisher-community-support/cover.jpg",
    coverImageAlt:
      "Small-scale fishers attending a government support programme",
    featured: false,
    images: [
      {
        id: "community-support-1",
        src: "/images/gallery/fisher-community-support/image-01.jpg",
        alt: "Fishers attending an information session",
        caption:
          "Fishers attending a session on available government services.",
      },
      {
        id: "community-support-2",
        src: "/images/gallery/fisher-community-support/image-02.jpg",
        alt: "Official providing guidance to community members",
        caption:
          "An official providing guidance on welfare and training opportunities.",
      },
      {
        id: "community-support-3",
        src: "/images/gallery/fisher-community-support/image-03.jpg",
        alt: "Community representatives speaking with fisheries officers",
        caption:
          "Community representatives discussing local fisheries requirements.",
      },
      {
        id: "community-support-4",
        src: "/images/gallery/fisher-community-support/image-04.jpg",
        alt: "Participants gathered for the fisher support programme",
        caption:
          "Participants and officials at the community support programme.",
      },
    ],
  },
]

export function getFeaturedGalleryAlbum() {
  return galleryAlbums.find((album) => album.featured)
}

export function getGalleryAlbumBySlug(slug: string) {
  return galleryAlbums.find((album) => album.slug === slug)
}

export function getRelatedGalleryAlbums(
  album: GalleryAlbum,
  limit = 3,
) {
  return galleryAlbums
    .filter(
      (item) =>
        item.slug !== album.slug &&
        item.category === album.category,
    )
    .slice(0, limit)
}

export function getGalleryImageCount(album: GalleryAlbum) {
  return album.images.length
}