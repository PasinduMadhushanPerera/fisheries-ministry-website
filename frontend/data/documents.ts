export type MinistryDocument = {
  id: string
  title: string
  description: string
  category: string
  department: string
  fileType: "PDF" | "DOCX" | "XLSX"
  fileSize: string
  publishedDate: string
  year: number
  href: string
  featured?: boolean
}

export const documentCategories = [
  "All Documents",
  "Policies",
  "Guidelines",
  "Reports",
  "Applications",
  "Statistics",
  "Procurement",
]

export const ministryDocuments: MinistryDocument[] = [
  {
    id: "document-01",
    title: "Sample Ministry Policy Document",
    description:
      "Placeholder entry for an approved policy document. Replace this content with verified Ministry information.",
    category: "Policies",
    department: "Ministry of Fisheries",
    fileType: "PDF",
    fileSize: "1.8 MB",
    publishedDate: "To be confirmed",
    year: 2026,
    href: "#",
    featured: true,
  },
  {
    id: "document-02",
    title: "Sample Fisheries Service Guideline",
    description:
      "Placeholder entry for an official service guideline or public information document.",
    category: "Guidelines",
    department: "Fisheries Division",
    fileType: "PDF",
    fileSize: "1.2 MB",
    publishedDate: "To be confirmed",
    year: 2026,
    href: "#",
  },
  {
    id: "document-03",
    title: "Sample Application Form",
    description:
      "Placeholder downloadable form for a fisheries-related public service.",
    category: "Applications",
    department: "Public Services Division",
    fileType: "DOCX",
    fileSize: "420 KB",
    publishedDate: "To be confirmed",
    year: 2026,
    href: "#",
  },
  {
    id: "document-04",
    title: "Sample Fisheries Statistics Report",
    description:
      "Placeholder statistical report awaiting verified Ministry data and publication details.",
    category: "Statistics",
    department: "Planning Division",
    fileType: "XLSX",
    fileSize: "860 KB",
    publishedDate: "To be confirmed",
    year: 2025,
    href: "#",
  },
  {
    id: "document-05",
    title: "Sample Procurement Document",
    description:
      "Placeholder procurement-related document for future CMS-managed publication.",
    category: "Procurement",
    department: "Procurement Division",
    fileType: "PDF",
    fileSize: "2.1 MB",
    publishedDate: "To be confirmed",
    year: 2025,
    href: "#",
  },
]