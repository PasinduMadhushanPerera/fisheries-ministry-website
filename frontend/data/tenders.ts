export type TenderStatus = "Open" | "Closing Soon" | "Closed"

export type MinistryTender = {
  id: string
  referenceNumber: string
  title: string
  description: string
  category: string
  department: string
  publishedDate: string
  closingDate: string
  year: number
  status: TenderStatus
  fileType: "PDF"
  fileSize: string
  href: string
  featured?: boolean
}

export const tenderCategories = [
  "All Tenders",
  "Goods",
  "Services",
  "Works",
  "Consultancy",
  "Information Technology",
]

export const tenderStatuses = [
  "All Statuses",
  "Open",
  "Closing Soon",
  "Closed",
]

export const ministryTenders: MinistryTender[] = [
  {
    id: "tender-01",
    referenceNumber: "MF/TEN/2026/001",
    title: "Sample Procurement of Fisheries Equipment",
    description:
      "Placeholder tender notice. Replace this content with an officially approved Ministry procurement notice.",
    category: "Goods",
    department: "Procurement Division",
    publishedDate: "To be confirmed",
    closingDate: "To be confirmed",
    year: 2026,
    status: "Open",
    fileType: "PDF",
    fileSize: "1.4 MB",
    href: "#",
    featured: true,
  },
  {
    id: "tender-02",
    referenceNumber: "MF/TEN/2026/002",
    title: "Sample Website Development and Support Service",
    description:
      "Placeholder tender for information technology services, system maintenance or digital development.",
    category: "Information Technology",
    department: "Information Technology Division",
    publishedDate: "To be confirmed",
    closingDate: "To be confirmed",
    year: 2026,
    status: "Closing Soon",
    fileType: "PDF",
    fileSize: "1.8 MB",
    href: "#",
  },
  {
    id: "tender-03",
    referenceNumber: "MF/TEN/2026/003",
    title: "Sample Consultancy Service",
    description:
      "Placeholder expression of interest or consultancy procurement notice for a Ministry programme.",
    category: "Consultancy",
    department: "Planning Division",
    publishedDate: "To be confirmed",
    closingDate: "To be confirmed",
    year: 2026,
    status: "Open",
    fileType: "PDF",
    fileSize: "1.1 MB",
    href: "#",
  },
  {
    id: "tender-04",
    referenceNumber: "MF/TEN/2025/014",
    title: "Sample Building Renovation Work",
    description:
      "Placeholder works tender relating to Ministry buildings, facilities or infrastructure improvements.",
    category: "Works",
    department: "Administration Division",
    publishedDate: "To be confirmed",
    closingDate: "To be confirmed",
    year: 2025,
    status: "Closed",
    fileType: "PDF",
    fileSize: "2.3 MB",
    href: "#",
  },
  {
    id: "tender-05",
    referenceNumber: "MF/TEN/2025/011",
    title: "Sample Maintenance Service Agreement",
    description:
      "Placeholder service procurement notice for maintenance, operational support or technical services.",
    category: "Services",
    department: "Procurement Division",
    publishedDate: "To be confirmed",
    closingDate: "To be confirmed",
    year: 2025,
    status: "Closed",
    fileType: "PDF",
    fileSize: "1.6 MB",
    href: "#",
  },
]