export type MinistryCircular = {
  id: string
  circularNumber: string
  title: string
  description: string
  category: string
  department: string
  issuedDate: string
  year: number
  language: string
  fileType: "PDF"
  fileSize: string
  href: string
  featured?: boolean
}

export const circularCategories = [
  "All Circulars",
  "Administration",
  "Finance",
  "Fisheries Management",
  "Human Resources",
  "Procurement",
  "Public Services",
]

export const circularYears = [
  "All Years",
  "2026",
  "2025",
  "2024",
  "2023",
]

export const ministryCirculars: MinistryCircular[] = [
  {
    id: "circular-01",
    circularNumber: "MF/CIR/2026/01",
    title: "Sample Administrative Circular",
    description:
      "Placeholder circular entry. Replace this content with an officially approved Ministry circular.",
    category: "Administration",
    department: "Administration Division",
    issuedDate: "To be confirmed",
    year: 2026,
    language: "English",
    fileType: "PDF",
    fileSize: "850 KB",
    href: "#",
    featured: true,
  },
  {
    id: "circular-02",
    circularNumber: "MF/CIR/2026/02",
    title: "Sample Fisheries Management Circular",
    description:
      "Placeholder circular covering an approved fisheries management instruction or operational notice.",
    category: "Fisheries Management",
    department: "Fisheries Division",
    issuedDate: "To be confirmed",
    year: 2026,
    language: "Sinhala / Tamil / English",
    fileType: "PDF",
    fileSize: "1.2 MB",
    href: "#",
  },
  {
    id: "circular-03",
    circularNumber: "MF/CIR/2025/08",
    title: "Sample Finance Circular",
    description:
      "Placeholder finance-related circular awaiting verified information and an approved downloadable document.",
    category: "Finance",
    department: "Finance Division",
    issuedDate: "To be confirmed",
    year: 2025,
    language: "English",
    fileType: "PDF",
    fileSize: "960 KB",
    href: "#",
  },
  {
    id: "circular-04",
    circularNumber: "MF/CIR/2025/05",
    title: "Sample Human Resources Circular",
    description:
      "Placeholder staff and human resources circular for future CMS-managed publication.",
    category: "Human Resources",
    department: "Human Resources Division",
    issuedDate: "To be confirmed",
    year: 2025,
    language: "English",
    fileType: "PDF",
    fileSize: "780 KB",
    href: "#",
  },
  {
    id: "circular-05",
    circularNumber: "MF/CIR/2024/11",
    title: "Sample Procurement Circular",
    description:
      "Placeholder procurement circular containing official instructions or procedural guidance.",
    category: "Procurement",
    department: "Procurement Division",
    issuedDate: "To be confirmed",
    year: 2024,
    language: "English",
    fileType: "PDF",
    fileSize: "1.1 MB",
    href: "#",
  },
  {
    id: "circular-06",
    circularNumber: "MF/CIR/2023/06",
    title: "Sample Public Services Circular",
    description:
      "Placeholder circular relating to Ministry public services and administrative procedures.",
    category: "Public Services",
    department: "Public Services Division",
    issuedDate: "To be confirmed",
    year: 2023,
    language: "Sinhala / Tamil / English",
    fileType: "PDF",
    fileSize: "1.4 MB",
    href: "#",
  },
]