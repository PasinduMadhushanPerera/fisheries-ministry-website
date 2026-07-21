export type MinistryPublication = {
  id: string
  title: string
  description: string
  category: string
  year: number
  language: string
  fileType: "PDF"
  fileSize: string
  coverImage?: string
  href: string
  featured?: boolean
}

export const publicationCategories = [
  "All Publications",
  "Research",
  "Fisheries",
  "Aquaculture",
  "Marine Resources",
  "Statistical Publications",
]

export const ministryPublications: MinistryPublication[] = [
  {
    id: "publication-01",
    title: "Sample Fisheries Sector Publication",
    description:
      "Placeholder publication entry. Replace this content with an officially verified Ministry publication.",
    category: "Fisheries",
    year: 2026,
    language: "English",
    fileType: "PDF",
    fileSize: "3.2 MB",
    href: "#",
    featured: true,
  },
  {
    id: "publication-02",
    title: "Sample Aquaculture Development Publication",
    description:
      "Placeholder publication covering aquaculture development, industry guidance and sector information.",
    category: "Aquaculture",
    year: 2026,
    language: "English",
    fileType: "PDF",
    fileSize: "2.6 MB",
    href: "#",
  },
  {
    id: "publication-03",
    title: "Sample Marine Resources Research Review",
    description:
      "Placeholder research publication related to marine ecosystems and aquatic resource management.",
    category: "Marine Resources",
    year: 2025,
    language: "English",
    fileType: "PDF",
    fileSize: "4.1 MB",
    href: "#",
  },
  {
    id: "publication-04",
    title: "Sample Fisheries Statistical Publication",
    description:
      "Placeholder publication containing fisheries statistics and sector performance information.",
    category: "Statistical Publications",
    year: 2025,
    language: "English",
    fileType: "PDF",
    fileSize: "5.3 MB",
    href: "#",
  },
  {
    id: "publication-05",
    title: "Sample Research and Development Bulletin",
    description:
      "Placeholder bulletin for approved research findings, development updates and technical knowledge.",
    category: "Research",
    year: 2024,
    language: "English",
    fileType: "PDF",
    fileSize: "2.9 MB",
    href: "#",
  },
  {
    id: "publication-06",
    title: "Sample Fisheries Public Information Guide",
    description:
      "Placeholder public information publication for fisheries-related services and programmes.",
    category: "Fisheries",
    year: 2024,
    language: "Sinhala / Tamil / English",
    fileType: "PDF",
    fileSize: "3.8 MB",
    href: "#",
  },
]