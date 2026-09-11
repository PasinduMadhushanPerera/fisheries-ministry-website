export type MonthlyProductionReport = {
  id: string
  year: number
  month: string
  monthNumber: number
  title: string
  description: string
  fileType: "XLSX" | "XLS"
  fileSize: string
  fileUrl: string
  publishedDate: string
  featured?: boolean
}

export const monthlyProductionReports: MonthlyProductionReport[] = [
  // --- 2026 Reports ---
  {
    id: "2026-03",
    year: 2026,
    month: "March",
    monthNumber: 3,
    title: "Monthly Fish Production Report",
    description: "Official fish production statistics for March 2026 across marine, coastal, and inland sectors.",
    fileType: "XLSX",
    fileSize: "56 KB",
    fileUrl: "#",
    publishedDate: "31 March 2026",
    featured: true,
  },
  {
    id: "2026-02",
    year: 2026,
    month: "February",
    monthNumber: 2,
    title: "Monthly Fish Production Report",
    description: "Official fish production statistics for February 2026 across marine, coastal, and inland sectors.",
    fileType: "XLSX",
    fileSize: "56 KB",
    fileUrl: "#",
    publishedDate: "28 February 2026",
  },
  {
    id: "2026-01",
    year: 2026,
    month: "January",
    monthNumber: 1,
    title: "Monthly Fish Production Report",
    description: "Official fish production statistics for January 2026 across marine, coastal, and inland sectors.",
    fileType: "XLSX",
    fileSize: "55 KB",
    fileUrl: "#",
    publishedDate: "31 January 2026",
  },

  // --- 2025 Reports ---
  {
    id: "2025-12",
    year: 2025,
    month: "December",
    monthNumber: 12,
    title: "Monthly Fish Production Report",
    description: "Official fish production statistics for December 2025 including annual yield reconciliations.",
    fileType: "XLSX",
    fileSize: "62 KB",
    fileUrl: "#",
    publishedDate: "31 December 2025",
  },
  {
    id: "2025-11",
    year: 2025,
    month: "November",
    monthNumber: 11,
    title: "Monthly Fish Production Report",
    description: "Official fish production statistics for November 2025 across all coastal harbor divisions.",
    fileType: "XLSX",
    fileSize: "58 KB",
    fileUrl: "#",
    publishedDate: "30 November 2025",
  },
  {
    id: "2025-10",
    year: 2025,
    month: "October",
    monthNumber: 10,
    title: "Monthly Fish Production Report",
    description: "Official fish production statistics for October 2025 including aquaculture harvests.",
    fileType: "XLSX",
    fileSize: "57 KB",
    fileUrl: "#",
    publishedDate: "31 October 2025",
  },
  {
    id: "2025-09",
    year: 2025,
    month: "September",
    monthNumber: 9,
    title: "Monthly Fish Production Report",
    description: "Official fish production statistics for September 2025 across marine and inland waters.",
    fileType: "XLSX",
    fileSize: "54 KB",
    fileUrl: "#",
    publishedDate: "30 September 2025",
  },

  // --- 2024 Reports ---
  {
    id: "2024-12",
    year: 2024,
    month: "December",
    monthNumber: 12,
    title: "Monthly Fish Production Report",
    description: "Official fish production statistics for December 2024 including annual totals.",
    fileType: "XLSX",
    fileSize: "60 KB",
    fileUrl: "#",
    publishedDate: "31 December 2024",
  },
  {
    id: "2024-06",
    year: 2024,
    month: "June",
    monthNumber: 6,
    title: "Monthly Fish Production Report",
    description: "Official fish production statistics for June 2024 mid-year performance summary.",
    fileType: "XLSX",
    fileSize: "53 KB",
    fileUrl: "#",
    publishedDate: "30 June 2024",
  },

  // --- 2023 Reports ---
  {
    id: "2023-12",
    year: 2023,
    month: "December",
    monthNumber: 12,
    title: "Monthly Fish Production Report",
    description: "Official fish production statistics for December 2023.",
    fileType: "XLSX",
    fileSize: "58 KB",
    fileUrl: "#",
    publishedDate: "31 December 2023",
  },

  // --- 2022 Reports ---
  {
    id: "2022-12",
    year: 2022,
    month: "December",
    monthNumber: 12,
    title: "Monthly Fish Production Report",
    description: "Official fish production statistics for December 2022.",
    fileType: "XLS",
    fileSize: "49 KB",
    fileUrl: "#",
    publishedDate: "31 December 2022",
  },

  // --- 2021 Reports ---
  {
    id: "2021-12",
    year: 2021,
    month: "December",
    monthNumber: 12,
    title: "Monthly Fish Production Report",
    description: "Official fish production statistics for December 2021.",
    fileType: "XLS",
    fileSize: "48 KB",
    fileUrl: "#",
    publishedDate: "31 December 2021",
  },

  // --- 2020 Reports ---
  {
    id: "2020-12",
    year: 2020,
    month: "December",
    monthNumber: 12,
    title: "Monthly Fish Production Report",
    description: "Official fish production statistics for December 2020.",
    fileType: "XLS",
    fileSize: "46 KB",
    fileUrl: "#",
    publishedDate: "31 December 2020",
  },

  // --- 2019 Reports ---
  {
    id: "2019-12",
    year: 2019,
    month: "December",
    monthNumber: 12,
    title: "Monthly Fish Production Report",
    description: "Official fish production statistics for December 2019.",
    fileType: "XLS",
    fileSize: "45 KB",
    fileUrl: "#",
    publishedDate: "31 December 2019",
  },
]
