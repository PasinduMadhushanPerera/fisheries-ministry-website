export type ExportImportReport = {
  id: string
  year: number
  month: string
  monthNumber: number
  title: string
  description: string
  fileType:
    | "PDF"
    | "XLSX"
    | "XLS"
    | "CSV"
    | "DOCX"
    | "ZIP"
  fileSize: string
  fileUrl: string
  downloadUrl?: string
  publishedDate: string
}

export type TradeMetric = {
  id: string
  title: string
  value: string
  unit: string
  period: string
  trend?: string
  iconType: "export-qty" | "import-qty" | "export-val" | "import-val" | "balance" | "latest-month"
}

export const tradeMetrics: TradeMetric[] = [
  {
    id: "export-val",
    title: "Export Value",
    value: "LKR 78.4",
    unit: "Billion",
    period: "2026 YTD",
    trend: "+12.4% YoY",
    iconType: "export-val",
  },
  {
    id: "import-val",
    title: "Import Value",
    value: "LKR 31.2",
    unit: "Billion",
    period: "2026 YTD",
    trend: "-4.1% YoY",
    iconType: "import-val",
  },
  {
    id: "trade-balance",
    title: "Trade Balance",
    value: "+ LKR 47.2",
    unit: "Billion Surplus",
    period: "2026 YTD",
    trend: "Positive Surplus",
    iconType: "balance",
  },
  {
    id: "export-qty",
    title: "Total Export Volume",
    value: "24,850",
    unit: "Metric Tons",
    period: "2026 YTD",
    trend: "+8.2% YoY",
    iconType: "export-qty",
  },
  {
    id: "import-qty",
    title: "Total Import Volume",
    value: "42,100",
    unit: "Metric Tons",
    period: "2026 YTD",
    trend: "-2.5% YoY",
    iconType: "import-qty",
  },
  {
    id: "latest-month",
    title: "Latest Report Month",
    value: "May 2026",
    unit: "Official Release",
    period: "Published 31 May 2026",
    iconType: "latest-month",
  },
]

export const exportImportReports: ExportImportReport[] = [
  // --- 2026 Reports ---
  {
    id: "2026-05",
    year: 2026,
    month: "May",
    monthNumber: 5,
    title: "Export and Import of Fish",
    description:
      "Official monthly statistics on fish exports, imports and trade performance for May 2026.",
    fileType: "PDF",
    fileSize: "258 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "31 May 2026",
  },
  {
    id: "2026-05-xlsx",
    year: 2026,
    month: "May",
    monthNumber: 5,
    title: "Export & Import Trade Breakdown Dataset",
    description:
      "Detailed spreadsheet breakdown of seafood trade volumes by HS codes, destination countries, and port of origin for May 2026.",
    fileType: "XLSX",
    fileSize: "145 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "05 June 2026",
  },
  {
    id: "2026-04",
    year: 2026,
    month: "April",
    monthNumber: 4,
    title: "Export and Import of Fish",
    description:
      "Official monthly statistics on fish exports, imports and trade performance for April 2026.",
    fileType: "PDF",
    fileSize: "689 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "30 April 2026",
  },
  {
    id: "2026-03",
    year: 2026,
    month: "March",
    monthNumber: 3,
    title: "Export and Import of Fish",
    description:
      "Official monthly statistics on fish exports, imports and trade performance for March 2026.",
    fileType: "PDF",
    fileSize: "688 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "31 March 2026",
  },
  {
    id: "2026-02",
    year: 2026,
    month: "February",
    monthNumber: 2,
    title: "Export and Import of Fish",
    description:
      "Official monthly statistics on fish exports, imports and trade performance for February 2026.",
    fileType: "PDF",
    fileSize: "686 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "28 February 2026",
  },
  {
    id: "2026-01",
    year: 2026,
    month: "January",
    monthNumber: 1,
    title: "Export and Import of Fish",
    description:
      "Official monthly statistics on fish exports, imports and trade performance for January 2026.",
    fileType: "PDF",
    fileSize: "684 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "31 January 2026",
  },

  // --- 2025 Sample Reports ---
  {
    id: "2025-12",
    year: 2025,
    month: "December",
    monthNumber: 12,
    title: "Export and Import of Fish",
    description:
      "Official monthly statistics on fish exports, imports and trade performance for December 2025.",
    fileType: "PDF",
    fileSize: "675 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "31 December 2025",
  },
  {
    id: "2025-11",
    year: 2025,
    month: "November",
    monthNumber: 11,
    title: "Export and Import of Fish",
    description:
      "Official monthly statistics on fish exports, imports and trade performance for November 2025.",
    fileType: "PDF",
    fileSize: "640 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "30 November 2025",
  },
  {
    id: "2025-10",
    year: 2025,
    month: "October",
    monthNumber: 10,
    title: "Export and Import of Fish",
    description:
      "Official monthly statistics on fish exports, imports and trade performance for October 2025.",
    fileType: "PDF",
    fileSize: "620 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "31 October 2025",
  },
  {
    id: "2025-09",
    year: 2025,
    month: "September",
    monthNumber: 9,
    title: "Export and Import of Fish",
    description:
      "Official monthly statistics on fish exports, imports and trade performance for September 2025.",
    fileType: "PDF",
    fileSize: "615 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "30 September 2025",
  },
  {
    id: "2025-06-csv",
    year: 2025,
    month: "June",
    monthNumber: 6,
    title: "Export & Import Monthly CSV Data Dump",
    description:
      "Raw CSV data stream of monthly seafood trade figures by commodity code and country for research analysis.",
    fileType: "CSV",
    fileSize: "92 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "10 July 2025",
  },
  {
    id: "2025-01-zip",
    year: 2025,
    month: "January",
    monthNumber: 1,
    title: "Annual Seafood Trade Consolidated Archive 2025",
    description:
      "Complete zip archive containing all 12 monthly trade reports, customs clearance summaries, and product category tables for 2025.",
    fileType: "ZIP",
    fileSize: "14.2 MB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "15 January 2026",
  },
]
