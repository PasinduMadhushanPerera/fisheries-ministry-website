export type AnnualStatisticsDocument = {
  id: string
  year: number
  title: string
  description: string
  publishedDate: string
  fileType:
    | "PDF"
    | "XLSX"
    | "XLS"
    | "DOCX"
    | "DOC"
    | "CSV"
    | "PPTX"
    | "PPT"
    | "ZIP"
  fileSize: string
  fileUrl: string
  downloadUrl: string
  language?: string
  featured?: boolean
}

export const annualStatisticsReports: AnnualStatisticsDocument[] = [
  // --- Featured 2024 Report ---
  {
    id: "annual-bulletin-2024",
    year: 2024,
    title: "Annual Fisheries Statistical Bulletin – 2024",
    description: "Official annual fisheries statistics, comprehensive sector performance metrics, fleet counts, and socio-economic indicators for 2024.",
    publishedDate: "30 June 2025",
    fileType: "PDF",
    fileSize: "548 KB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English / Sinhala / Tamil",
    featured: true,
  },

  // --- Supporting Datasets & Multi-format Reports (2024) ---
  {
    id: "indicators-dataset-2024",
    year: 2024,
    title: "Fisheries Indicators Dataset – 2024",
    description: "Raw numerical spreadsheet of key performance indicators, regional catch breakdowns, and fish landing quantities.",
    publishedDate: "15 July 2025",
    fileType: "XLSX",
    fileSize: "120 KB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English",
  },
  {
    id: "production-data-2024",
    year: 2024,
    title: "Fisheries Production Data – 2024",
    description: "Comma-separated values dataset containing monthly production volumes by harbor and species for data analysis.",
    publishedDate: "20 July 2025",
    fileType: "CSV",
    fileSize: "85 KB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English",
  },
  {
    id: "methodology-notes-2024",
    year: 2024,
    title: "Annual Statistics Methodology Notes – 2024",
    description: "Technical document describing survey sampling methodologies, statistical estimation models, and data validation protocols.",
    publishedDate: "05 August 2025",
    fileType: "DOCX",
    fileSize: "240 KB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English",
  },
  {
    id: "statistics-presentation-2024",
    year: 2024,
    title: "Fisheries Statistics Presentation – 2024",
    description: "Official executive presentation slides summarizing sectoral growth trends, GDP contributions, and export trade statistics.",
    publishedDate: "10 August 2025",
    fileType: "PPTX",
    fileSize: "4.2 MB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English",
  },
  {
    id: "complete-package-2024",
    year: 2024,
    title: "Complete Statistics Data Package – 2024",
    description: "Compressed archive containing the 2024 bulletin PDF, raw Excel spreadsheets, district maps, and methodology documentation.",
    publishedDate: "15 August 2025",
    fileType: "ZIP",
    fileSize: "18.5 MB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English / Sinhala",
  },

  // --- Historical Reports (2024 down to 2017) ---
  {
    id: "statistics-2024-pertaining-2023",
    year: 2024,
    title: "Fisheries Statistics – 2024, data pertaining to year 2023",
    description: "Comprehensive annual statistical report providing consolidated figures and retrospective analysis for the 2023 operating year.",
    publishedDate: "30 June 2024",
    fileType: "PDF",
    fileSize: "395 KB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English / Sinhala",
  },
  {
    id: "statistics-2023",
    year: 2023,
    title: "Fisheries Statistics – 2023",
    description: "Official annual statistics report on Sri Lanka marine fish production, inland fisheries, and harbor infrastructure for 2023.",
    publishedDate: "30 June 2024",
    fileType: "PDF",
    fileSize: "404 KB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English / Sinhala",
  },
  {
    id: "statistics-2022",
    year: 2022,
    title: "Fisheries Statistics – 2022",
    description: "Annual statistical report summarizing sector performance, vessel registrations, and fish trade balance during 2022.",
    publishedDate: "30 June 2023",
    fileType: "PDF",
    fileSize: "434 KB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English / Sinhala",
  },
  {
    id: "statistics-2021",
    year: 2021,
    title: "Fisheries Statistics – 2021",
    description: "Annual statistical bulletin covering commercial fisheries, coastal aquaculture yield, and active fisher population in 2021.",
    publishedDate: "30 June 2022",
    fileType: "PDF",
    fileSize: "434 KB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English / Sinhala",
  },
  {
    id: "statistics-2020",
    year: 2020,
    title: "Fisheries Statistics – 2020",
    description: "Annual statistical compilation detailing marine landings, inland reservoir harvests, and fisheries trade data for 2020.",
    publishedDate: "30 June 2021",
    fileType: "PDF",
    fileSize: "612 KB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English / Sinhala",
  },
  {
    id: "statistics-2019",
    year: 2019,
    title: "Fisheries Statistics – 2019",
    description: "Annual fisheries statistical publication documenting fish production trends, fleet composition, and trade figures for 2019.",
    publishedDate: "30 June 2020",
    fileType: "PDF",
    fileSize: "459 KB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English / Sinhala",
  },
  {
    id: "statistics-2018",
    year: 2018,
    title: "Fisheries Statistics – 2018",
    description: "Annual statistical report detailing national fish production, export earnings, and harbor landing statistics for 2018.",
    publishedDate: "30 June 2019",
    fileType: "PDF",
    fileSize: "491 KB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English / Sinhala",
  },
  {
    id: "statistics-2017",
    year: 2017,
    title: "Fisheries Statistics – 2017",
    description: "Annual statistical report providing baseline figures for marine and inland fisheries production in Sri Lanka for 2017.",
    publishedDate: "30 June 2018",
    fileType: "PDF",
    fileSize: "435 KB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English / Sinhala",
  },
]
