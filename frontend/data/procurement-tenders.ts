export type AdditionalDocument = {
  id: number | string
  label?: string
  downloadUrl?: string
  fileType?: "PDF" | "DOCX" | "XLSX" | "ZIP" | string
  fileSize?: string
}

export type ProcurementNotice = {
  id: string
  refNumber: string
  title: string
  publisher: string
  description: string
  detailedScope: string[]
  additionalInfo?: string
  docButtonLabel?: string
  category?:
    | "harbour"
    | "equipment"
    | "it"
    | "consultancy"
    | "supplies"
    | "other"
    | ""
    | string
  categoryLabel?: string
  publishedDate: string
  closingDate: string
  submissionAddress: string
  tenderFee?: string
  bidSecurity?: string
  eligibility: string
  contactInfo: string
  fileType: "PDF" | "DOCX" | "XLSX" | "ZIP" | string
  fileSize: string
  fileUrl: string
  downloadUrl: string
  secondDocumentLabel?: string
  secondDownloadUrl?: string
  secondFileType?: "PDF" | "DOCX" | "XLSX" | "ZIP" | string
  secondFileSize?: string
  additionalDocuments?: AdditionalDocument[]
  featured?: boolean
  status?: "Open" | "Closing Soon" | "Closed" | "Awarded" | "" | string
  year: number
}

export const procurementNotices: ProcurementNotice[] = [
  {
    id: "procurement-1",
    refNumber: "MOF/CFHC/2026/FUEL-TANKS",
    title: "Invitation for Bids Fabrication, Supply, Delivery, Installation and Commissioning of 08 No’s Above Ground Horizontal Fuel Storage Tanks of 8000 Gallon Capacity for Ceylon Fisheries Harbour Corporation (CFHC)",
    publisher: "Ceylon Fisheries Harbour Corporation (CFHC)",
    description: "Fabrication, supply, delivery, installation and commissioning of 08 No’s above ground horizontal fuel storage tanks of 8000 gallon capacity for CFHC harbours.",
    detailedScope: ["Fabrication and supply of 08 fuel storage tanks"],
    docButtonLabel: "Document can be downloaded from here",
    category: "equipment",
    categoryLabel: "Equipment & Machinery",
    publishedDate: "2026-02-10",
    closingDate: "2026-04-15",
    submissionAddress: "Procurement Committee, CFHC HQ, Colombo 15",
    eligibility: "CIDA Registered Suppliers",
    contactInfo: "+94 112 529 361",
    fileType: "PDF",
    fileSize: "483 KB",
    fileUrl: "#",
    downloadUrl: "#",
    featured: true,
    status: "Open",
    year: 2026,
  },
  {
    id: "procurement-2",
    refNumber: "MOF/CFHC/2026/AMB-ROOF",
    title: "Invitation for Bids Roof Renovation Works of the Administration Building at Ambalangoda Fishery Harbour",
    publisher: "Ceylon Fisheries Harbour Corporation (CFHC)",
    description: "Roof renovation and waterproofing structural works of the main administration building at Ambalangoda Fishery Harbour.",
    detailedScope: ["Roof renovation works"],
    docButtonLabel: "Document can be downloaded from here",
    category: "harbour",
    categoryLabel: "Harbour & Civil Works",
    publishedDate: "2026-02-12",
    closingDate: "2026-04-20",
    submissionAddress: "CFHC HQ, Colombo 15",
    eligibility: "CIDA Grade C3 or above",
    contactInfo: "+94 112 529 361",
    fileType: "PDF",
    fileSize: "504 KB",
    fileUrl: "#",
    downloadUrl: "#",
    featured: true,
    status: "Open",
    year: 2026,
  },
  {
    id: "procurement-3",
    refNumber: "MOF/CFHC/2026/MIR-TOILET",
    title: "Invitation for Bids Rehabilitation of the Public Toilet at Mirissa Fishery Harbour",
    publisher: "Ceylon Fisheries Harbour Corporation (CFHC)",
    description: "Rehabilitation and plumbing upgrade works of the public toilet complex at Mirissa Fishery Harbour.",
    detailedScope: ["Toilet rehabilitation works"],
    docButtonLabel: "Document can be downloaded from here",
    category: "harbour",
    categoryLabel: "Harbour & Civil Works",
    publishedDate: "2026-02-14",
    closingDate: "2026-04-22",
    submissionAddress: "CFHC HQ, Colombo 15",
    eligibility: "CIDA Grade C4 or above",
    contactInfo: "+94 112 529 361",
    fileType: "PDF",
    fileSize: "503 KB",
    fileUrl: "#",
    downloadUrl: "#",
    featured: true,
    status: "Open",
    year: 2026,
  },
  {
    id: "procurement-4",
    refNumber: "MOF/CFHC/2026/KALP-JETTY",
    title: "Invitation for Bids Rehabilitation of the Existing Jetty at Kalpitiya Fishery Harbour",
    publisher: "Ceylon Fisheries Harbour Corporation (CFHC)",
    description: "Structural repair and pile reinforcement of the main jetty at Kalpitiya Fishery Harbour.",
    detailedScope: ["Jetty rehabilitation works"],
    docButtonLabel: "Document can be downloaded from here",
    category: "harbour",
    categoryLabel: "Harbour & Civil Works",
    publishedDate: "2026-02-15",
    closingDate: "2026-04-25",
    submissionAddress: "CFHC HQ, Colombo 15",
    eligibility: "CIDA Grade C3 or above",
    contactInfo: "+94 112 529 361",
    fileType: "PDF",
    fileSize: "503 KB",
    fileUrl: "#",
    downloadUrl: "#",
    featured: true,
    status: "Open",
    year: 2026,
  },
  {
    id: "procurement-5",
    refNumber: "MOF/NAQDA/2026/ICB-AQUA",
    title: "International Competitive Bidding for Supply and Delivery of Live Aquaculture Species (Ornamental Fish, Shrimp, Seabass, Grouper and Tilapia) for the National Aquaculture Development Programme",
    publisher: "National Aquaculture Development Authority of Sri Lanka (NAQDA)",
    description: "International competitive bidding for supply and delivery of high-health live aquaculture species.",
    detailedScope: ["Supply and delivery of live aquaculture species"],
    additionalInfo: "Join Zoom Meeting\nZoom meeting link: https://zoom.us/j/73961883339\nTime: Aug 19, 2026 10:30 AM Colombo\nMeeting ID: 739 6188 3339\nPasscode: 6iznsj",
    docButtonLabel: "Document can be downloaded from here",
    category: "supplies",
    categoryLabel: "Supplies & Services",
    publishedDate: "2026-02-18",
    closingDate: "2026-05-15",
    submissionAddress: "NAQDA HQ, Battaramulla",
    eligibility: "Registered Aquaculture Suppliers",
    contactInfo: "+94 112 786 497",
    fileType: "PDF",
    fileSize: "1.59 MB",
    fileUrl: "#",
    downloadUrl: "#",
    secondDocumentLabel: "Document can be downloaded from here",
    secondDownloadUrl: "#",
    secondFileType: "PDF",
    secondFileSize: "753 KB",
    featured: true,
    status: "Open",
    year: 2026,
  },
]
