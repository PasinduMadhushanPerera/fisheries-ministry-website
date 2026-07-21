export type AnnualReport = {
  id: string
  title: string
  description: string
  year: number
  language: string
  fileType: "PDF"
  fileSize: string
  href: string
  featured?: boolean
}

export const annualReportYears = [
  "All Years",
  "2026",
  "2025",
  "2024",
  "2023",
  "2022",
]

export const annualReports: AnnualReport[] = [
  {
    id: "annual-report-2026",
    title: "Annual Report 2026",
    description:
      "Placeholder annual report entry. Replace this content with the officially approved Ministry annual report.",
    year: 2026,
    language: "English",
    fileType: "PDF",
    fileSize: "8.4 MB",
    href: "#",
    featured: true,
  },
  {
    id: "annual-report-2025",
    title: "Annual Report 2025",
    description:
      "Placeholder annual report covering Ministry activities, programmes, achievements and financial information.",
    year: 2025,
    language: "English",
    fileType: "PDF",
    fileSize: "7.9 MB",
    href: "#",
  },
  {
    id: "annual-report-2024",
    title: "Annual Report 2024",
    description:
      "Placeholder annual report for fisheries, aquatic resources and related Ministry programmes.",
    year: 2024,
    language: "Sinhala / Tamil / English",
    fileType: "PDF",
    fileSize: "9.1 MB",
    href: "#",
  },
  {
    id: "annual-report-2023",
    title: "Annual Report 2023",
    description:
      "Placeholder report containing annual performance, institutional progress and sector information.",
    year: 2023,
    language: "English",
    fileType: "PDF",
    fileSize: "7.2 MB",
    href: "#",
  },
  {
    id: "annual-report-2022",
    title: "Annual Report 2022",
    description:
      "Placeholder historical annual report awaiting approved document details and download links.",
    year: 2022,
    language: "English",
    fileType: "PDF",
    fileSize: "6.8 MB",
    href: "#",
  },
]