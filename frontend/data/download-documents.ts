export type DownloadCategory =
  | "project-disclosures"
  | "sdg14"
  | "hr-development"
  | "citizen-charter"
  | "policy-strategy"
  | "performance-report"
  | "mega-project-progress"
  | "progress-report"
  | "physical-financial-progress"
  | "annual-statistics"
  | "action-plan"
  | "fishery-articles"

export type CategoryMeta = {
  id: DownloadCategory
  title: string
  description: string
}

export type DownloadDocument = {
  id: string
  category: DownloadCategory
  title: string
  description: string
  year?: number
  publishedDate?: string
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
    | "PNG"
    | "JPG"
  fileSize: string
  fileUrl: string
  downloadUrl: string
  language?: "English" | "Sinhala" | "Tamil" | "Bilingual"
  featured?: boolean
}

export const downloadCategories: CategoryMeta[] = [
  {
    id: "project-disclosures",
    title: "Project Disclosures",
    description: "Environmental, social and stakeholder documents related to Ministry development projects.",
  },
  {
    id: "sdg14",
    title: "SDG 14 Regional Symposium",
    description: "Presentations, reports and documents from SDG 14 regional events.",
  },
  {
    id: "hr-development",
    title: "Human Resource Development Plan",
    description: "Official workforce development, capacity-building and training plans.",
  },
  {
    id: "citizen-charter",
    title: "Citizen Charter",
    description: "Public-service commitments, service standards and citizen information.",
  },
  {
    id: "policy-strategy",
    title: "Fisheries Policy / Strategy",
    description: "National fisheries policies, strategies and sector-development frameworks.",
  },
  {
    id: "performance-report",
    title: "Performance Report",
    description: "Annual and periodic performance reports of the Ministry.",
  },
  {
    id: "mega-project-progress",
    title: "Monthly Progress of Mega Projects",
    description: "Monthly implementation updates on major fisheries development projects.",
  },
  {
    id: "progress-report",
    title: "Progress Report",
    description: "General progress reports on programmes and institutional activities.",
  },
  {
    id: "physical-financial-progress",
    title: "Physical and Financial Progress Report",
    description: "Reports on project implementation, expenditure and physical progress.",
  },
  {
    id: "annual-statistics",
    title: "Annual Statistics",
    description: "Official fisheries statistics, bulletins and datasets.",
  },
  {
    id: "action-plan",
    title: "Action Plan",
    description: "Annual and multi-year Ministry action plans.",
  },
  {
    id: "fishery-articles",
    title: "Fishery Related Articles",
    description: "Research articles, technical papers and other fisheries reference materials.",
  },
]

export const downloadDocuments: DownloadDocument[] = [
  // --- 1. Project Disclosures ---
  {
    id: "project-escp-2025",
    category: "project-disclosures",
    title: "Environmental and Social Commitment Plan (ESCP)",
    description: "Official ESCP disclosure document for the Coastal Aquaculture & Climate Resilience Project.",
    year: 2025,
    publishedDate: "15 February 2025",
    fileType: "PDF",
    fileSize: "521 KB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English",
    featured: true,
  },
  {
    id: "project-sep-2025",
    category: "project-disclosures",
    title: "Stakeholder Engagement Plan (SEP)",
    description: "Official SEP framework document outlining community consultations and grievance mechanisms.",
    year: 2025,
    publishedDate: "20 January 2025",
    fileType: "PDF",
    fileSize: "412 KB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English",
    featured: true,
  },

  // --- 2. SDG 14 Regional Symposium ---
  {
    id: "sdg14-proceedings",
    category: "sdg14",
    title: "SDG 14 Regional Symposium Proceedings",
    description: "Comprehensive summary and declaration from the South Asian Marine Sustainability Symposium.",
    year: 2024,
    publishedDate: "10 November 2024",
    fileType: "PDF",
    fileSize: "2.1 MB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English",
    featured: false,
  },
  {
    id: "sdg14-presentation",
    category: "sdg14",
    title: "Marine Sustainability Presentation Deck",
    description: "Keynote presentation on ocean conservation targets and blue economy initiatives.",
    year: 2024,
    publishedDate: "12 November 2024",
    fileType: "PPTX",
    fileSize: "4.5 MB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English",
  },

  // --- 3. Human Resource Development Plan ---
  {
    id: "hr-dev-plan-2025-2029",
    category: "hr-development",
    title: "Ministry Human Resource Development Plan 2025–2029",
    description: "Strategic capacity-building framework for fisheries officers, inspectors, and research personnel.",
    year: 2025,
    publishedDate: "05 January 2025",
    fileType: "PDF",
    fileSize: "1.8 MB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "Bilingual",
  },

  // --- 4. Citizen Charter ---
  {
    id: "citizen-charter-2025",
    category: "citizen-charter",
    title: "Ministry Citizen Charter",
    description: "Official service standards, response times, and citizen rights for permits, licenses, and subsidies.",
    year: 2025,
    publishedDate: "01 January 2025",
    fileType: "PDF",
    fileSize: "680 KB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "Bilingual",
    featured: true,
  },
  {
    id: "public-service-standards",
    category: "citizen-charter",
    title: "Public Service Standards & Guidelines",
    description: "Operational guidelines for vessel licensing, harbor clearances, and aquaculture approvals.",
    year: 2025,
    publishedDate: "15 January 2025",
    fileType: "DOCX",
    fileSize: "320 KB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English",
  },

  // --- 5. Fisheries Policy / Strategy ---
  {
    id: "policy-national-fisheries-2025",
    category: "policy-strategy",
    title: "National Fisheries Policy 2025",
    description: "Comprehensive national policy governing ocean fisheries, inland aquaculture, and export quality.",
    year: 2025,
    publishedDate: "10 February 2025",
    fileType: "PDF",
    fileSize: "1.4 MB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English",
    featured: true,
  },
  {
    id: "strategy-fisheries-dev",
    category: "policy-strategy",
    title: "Fisheries Development Strategy 2025–2030",
    description: "Long-term strategic roadmap for modernizing deep-sea fleets and expand eco-certified aquaculture.",
    year: 2025,
    publishedDate: "18 February 2025",
    fileType: "PDF",
    fileSize: "2.2 MB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English",
  },

  // --- 6. Performance Report ---
  {
    id: "perf-report-2025",
    category: "performance-report",
    title: "Annual Performance Report 2025",
    description: "Comprehensive annual review of targets achieved across all departments and statutory bodies.",
    year: 2025,
    publishedDate: "30 January 2026",
    fileType: "PDF",
    fileSize: "3.1 MB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English",
  },
  {
    id: "perf-summary-2024",
    category: "performance-report",
    title: "Ministry Performance Summary 2024",
    description: "Executive summary highlighting fish production milestones, export growth, and rural fisher support.",
    year: 2024,
    publishedDate: "31 December 2024",
    fileType: "PDF",
    fileSize: "2.8 MB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English",
  },

  // --- 7. Monthly Progress of Mega Projects ---
  {
    id: "mega-projects-june-2026",
    category: "mega-project-progress",
    title: "Mega Projects Progress Report – June 2026",
    description: "Detailed monthly progress updates on commercial fishing harbor expansions and cold-storage construction.",
    year: 2026,
    publishedDate: "30 June 2026",
    fileType: "XLSX",
    fileSize: "450 KB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English",
  },

  // --- 8. Progress Report ---
  {
    id: "progress-report-q1-2026",
    category: "progress-report",
    title: "Fisheries Development Progress Report Q1 2026",
    description: "Quarterly progress report on inland stocking, coastal conservation, and fisher welfare programs.",
    year: 2026,
    publishedDate: "15 April 2026",
    fileType: "PDF",
    fileSize: "980 KB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English",
  },

  // --- 9. Physical and Financial Progress Report ---
  {
    id: "phys-fin-progress-q2-2026",
    category: "physical-financial-progress",
    title: "Physical and Financial Progress Report – Q2 2026",
    description: "Budget utilization, procurement milestone tracking, and physical completion audit figures.",
    year: 2026,
    publishedDate: "10 July 2026",
    fileType: "XLSX",
    fileSize: "520 KB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English",
  },

  // --- 10. Annual Statistics ---
  {
    id: "annual-stat-bulletin-2024",
    category: "annual-statistics",
    title: "Annual Fisheries Statistical Bulletin 2024",
    description: "Official annual statistical publication covering fish catch volumes, species counts, and fleet numbers.",
    year: 2024,
    publishedDate: "15 December 2024",
    fileType: "PDF",
    fileSize: "4.2 MB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English",
  },
  {
    id: "annual-stat-indicators-2024",
    category: "annual-statistics",
    title: "Fisheries Indicators Dataset 2024",
    description: "Raw tabular dataset containing regional production figures, export values, and vessel registration data.",
    year: 2024,
    publishedDate: "20 December 2024",
    fileType: "CSV",
    fileSize: "180 KB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English",
  },

  // --- 11. Action Plan ---
  {
    id: "action-plan-2026",
    category: "action-plan",
    title: "Ministry Master Action Plan 2026",
    description: "Annual operational plan detailing departmental goals, resource allocation, and implementation timelines.",
    year: 2026,
    publishedDate: "10 January 2026",
    fileType: "PDF",
    fileSize: "1.1 MB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English",
  },

  // --- 12. Fishery Related Articles ---
  {
    id: "article-sustainable-management",
    category: "fishery-articles",
    title: "Sustainable Fisheries Management Research Article",
    description: "Technical paper analyzing sustainable harvest yields and mesh-size regulation impact on coastal stocks.",
    year: 2025,
    publishedDate: "22 May 2025",
    fileType: "PDF",
    fileSize: "850 KB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English",
  },
  {
    id: "article-aquaculture-innovation",
    category: "fishery-articles",
    title: "Aquaculture Development & Bio-security Research Paper",
    description: "Research article evaluating disease prevention practices and feed efficiency in brackish-water shrimp farming.",
    year: 2025,
    publishedDate: "14 June 2025",
    fileType: "DOCX",
    fileSize: "620 KB",
    fileUrl: "#",
    downloadUrl: "#",
    language: "English",
  },
]
