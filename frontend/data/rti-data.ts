export type RtiOfficer = {
  id: string
  officerType: "Designated Officer" | "Information Officer"
  name: string
  designation: string
  organization: string
  telephone: string
  fax?: string
  emails: string[]
  image: string
  imageAlt: string
}

export type RtiCategory =
  | "forms"
  | "biannual-reports"
  | "decisions-policies"
  | "budget"
  | "projects"
  | "other-reports"
  | "procurement"
  | "legal"

export type RtiCategoryMeta = {
  id: RtiCategory
  title: string
  description: string
}

export type RtiDocument = {
  id: string
  category: RtiCategory
  title: string
  subheading?: string
  description: string
  year?: number
  fileType:
    | "PDF"
    | "XLSX"
    | "XLS"
    | "CSV"
    | "DOCX"
    | "DOC"
    | "PPTX"
    | "ZIP"
  fileSize: string
  fileUrl: string
  downloadUrl?: string
  fileUrlEn?: string | null
  fileUrlSi?: string | null
  fileUrlTa?: string | null
  availableLanguages?: string[]
  publishedDate?: string
  featured?: boolean
}

export const rtiOfficers: RtiOfficer[] = [
  {
    id: "designated-officer",
    officerType: "Designated Officer",
    name: "Mr. B.K. Kolitha Kamal Jinadasa (PhD)",
    designation: "Secretary to the Ministry of Fisheries, Aquatic and Ocean Resources",
    organization: "Ministry of Fisheries, Aquatic and Ocean Resources",
    telephone: "+94 112 327 060",
    fax: "+94 112 541 184",
    emails: ["secfisherieslk@gmail.com", "secretary@fisheries.gov.lk"],
    image: "/images/leadership/secretary.jpg",
    imageAlt: "Mr. B.K. Kolitha Kamal Jinadasa (PhD) - Designated Officer",
  },
  {
    id: "information-officer",
    officerType: "Information Officer",
    name: "Mrs. N. A. A. P. S. Nissanka",
    designation: "Additional Secretary (Administration and Human Resources)",
    organization: "Ministry of Fisheries, Aquatic and Ocean Resources",
    telephone: "+94 112 436 665",
    fax: "+94 112 320 140",
    emails: ["asstsecfisheries@yahoo.com"],
    image: "/images/leadership/additional-secretary.jpg",
    imageAlt: "Mrs. N. A. A. P. S. Nissanka - Information Officer",
  },
]

export const rtiLegalDocuments: RtiDocument[] = [
  {
    id: "rti-act-2016",
    category: "legal",
    title: "Right to Information Act No. 12 of 2016",
    description: "Read the principal legislation governing public access to information held by public authorities in Sri Lanka.",
    fileType: "PDF",
    fileSize: "114 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "04 August 2016",
  },
  {
    id: "rti-regulations",
    category: "legal",
    title: "Regulations Promulgated Under the RTI Act",
    description: "Review gazetted regulations and procedural guidelines issued under the Right to Information Act.",
    fileType: "PDF",
    fileSize: "272 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "03 February 2017",
  },
  {
    id: "rti-procedure",
    category: "legal",
    title: "Procedure to be Followed to Access Information",
    description: "Learn the official step-by-step procedure for submitting, processing, and appealing an RTI request.",
    fileType: "PDF",
    fileSize: "132 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "15 March 2017",
  },
]

export const rtiCategories: RtiCategoryMeta[] = [
  {
    id: "forms",
    title: "RTI Forms",
    description: "Access official application, appeal and information-request forms.",
  },
  {
    id: "biannual-reports",
    title: "Biannual Reports under Section 8 of the RTI Act No. 12 of 2016",
    description: "Browse reports published under Section 8 of the RTI Act.",
  },
  {
    id: "decisions-policies",
    title: "Decisions and Policies",
    description: "Access Ministry decisions, policies and public-information disclosures.",
  },
  {
    id: "budget",
    title: "Budget Information",
    description: "Review approved budgets, allocations and related financial information.",
  },
  {
    id: "projects",
    title: "Projects Reports",
    description: "Browse public reports on Ministry projects and programmes.",
  },
  {
    id: "other-reports",
    title: "Other Reports",
    description: "Access additional reports and public-information documents.",
  },
  {
    id: "procurement",
    title: "Procurement Information",
    description: "Review procurement notices, awards and related disclosures.",
  },
]

export const rtiDocuments: RtiDocument[] = [
  // --- Biannual Reports (Open by Default) ---
  {
    id: "biannual-2024",
    category: "biannual-reports",
    title: "Biannual Report – 2024",
    description: "Biannual report published under Section 8 of the Right to Information Act No. 12 of 2016.",
    year: 2024,
    fileType: "PDF",
    fileSize: "1.42 MB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "31 December 2024",
  },
  {
    id: "biannual-2023",
    category: "biannual-reports",
    title: "Biannual Report – 2023",
    description: "Biannual report published under Section 8 of the Right to Information Act No. 12 of 2016.",
    year: 2023,
    fileType: "PDF",
    fileSize: "1.28 MB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "31 December 2023",
  },

  // --- RTI Forms ---
  {
    id: "form-rti-01",
    category: "forms",
    title: "RTI Information Request Form (RTI 01)",
    description: "Official application form for requesting information under Section 3 & 24 of the RTI Act.",
    fileType: "PDF",
    fileSize: "185 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "01 January 2024",
  },
  {
    id: "form-rti-10",
    category: "forms",
    title: "RTI First Appeal Form (RTI 10)",
    description: "Official appeal form for appealing to the Designated Officer under Section 31 of the RTI Act.",
    fileType: "PDF",
    fileSize: "160 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "01 January 2024",
  },
  {
    id: "form-rti-02",
    category: "forms",
    title: "RTI Request Acknowledgement Form (RTI 02)",
    description: "Standard receipt form issued by Information Officers upon receiving an information request.",
    fileType: "PDF",
    fileSize: "120 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "01 January 2024",
  },

  // --- Decisions & Policies ---
  {
    id: "policy-disclosure",
    category: "decisions-policies",
    title: "Ministry Proactive RTI Disclosure Policy",
    description: "Official policy document outlining open data practices, disclosure rules, and publication schedules.",
    fileType: "PDF",
    fileSize: "320 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "15 March 2024",
  },
  {
    id: "policy-classification",
    category: "decisions-policies",
    title: "Ministry Information Classification & Retention Policy",
    description: "Guidelines governing the classification, archival, and public disclosure of Ministry documents.",
    fileType: "DOCX",
    fileSize: "210 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "10 April 2024",
  },

  // --- Budget Information ---
  {
    id: "budget-approved-summary",
    category: "budget",
    title: "Approved Ministry Annual Budget Summary – 2026",
    description: "Comprehensive breakdown of approved capital allocation, recurrent expenditure, and development funds.",
    year: 2026,
    fileType: "XLSX",
    fileSize: "245 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "15 January 2026",
  },
  {
    id: "budget-allocation-2025",
    category: "budget",
    title: "Fisheries Department Budget Allocation Report – 2025",
    description: "Financial performance report on project disbursements and infrastructure expenditure for 2025.",
    year: 2025,
    fileType: "PDF",
    fileSize: "890 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "30 December 2025",
  },

  // --- Projects Reports ---
  {
    id: "project-dev-report",
    category: "projects",
    title: "National Fisheries Development Programme Progress Report",
    description: "Evaluation report detailing coastal harbor upgrades, lagoon rehabilitation, and fisher welfare projects.",
    year: 2025,
    fileType: "PDF",
    fileSize: "1.65 MB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "10 November 2025",
  },
  {
    id: "project-infra-report",
    category: "projects",
    title: "Coastal Harbor Infrastructure Project Report",
    description: "Quarterly progress and environmental compliance audit for harbor construction works.",
    year: 2025,
    fileType: "PDF",
    fileSize: "1.12 MB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "20 October 2025",
  },

  // --- Other Reports ---
  {
    id: "report-rti-annual-summary",
    category: "other-reports",
    title: "Annual RTI Operations & Request Performance Summary – 2025",
    description: "Summary of RTI applications received, decisions granted, fees collected, and appeal outcomes during 2025.",
    year: 2025,
    fileType: "PDF",
    fileSize: "410 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "25 January 2026",
  },

  // --- Procurement Information ---
  {
    id: "procurement-plan-2026",
    category: "procurement",
    title: "Ministry Master Procurement Plan – 2026",
    description: "Official schedule of major tenders, civil works, equipment acquisitions, and consultancy procurements.",
    year: 2026,
    fileType: "XLSX",
    fileSize: "310 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "05 January 2026",
  },
  {
    id: "procurement-award-2025",
    category: "procurement",
    title: "Major Tender Award & Contract Disclosure Report – 2025",
    description: "Public disclosure of awarded tenders, contractor details, contract values, and completion timelines.",
    year: 2025,
    fileType: "PDF",
    fileSize: "750 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "20 December 2025",
  },
]
