export type MinistryForm = {
  id: string
  title: string
  description: string
  category: string
  department: string
  formNumber?: string
  language: string
  fileType: "PDF" | "DOCX"
  fileSize: string
  updatedDate: string
  href: string
  featured?: boolean
}

export const formCategories = [
  "All Forms",
  "Licensing",
  "Registration",
  "Applications",
  "Aquaculture",
  "Fisheries Services",
  "Public Requests",
]

export const ministryForms: MinistryForm[] = [
  {
    id: "form-01",
    title: "Sample Fisheries Licence Application Form",
    description:
      "Placeholder application form for a fisheries-related licence. Replace with an officially approved Ministry form.",
    category: "Licensing",
    department: "Fisheries Division",
    formNumber: "MF-FRM-001",
    language: "Sinhala / Tamil / English",
    fileType: "PDF",
    fileSize: "620 KB",
    updatedDate: "To be confirmed",
    href: "#",
    featured: true,
  },
  {
    id: "form-02",
    title: "Sample Fishing Vessel Registration Form",
    description:
      "Placeholder registration form for vessel information and related fisheries services.",
    category: "Registration",
    department: "Registration Division",
    formNumber: "MF-FRM-002",
    language: "English",
    fileType: "PDF",
    fileSize: "740 KB",
    updatedDate: "To be confirmed",
    href: "#",
  },
  {
    id: "form-03",
    title: "Sample Aquaculture Project Application",
    description:
      "Placeholder application form for aquaculture development assistance or project registration.",
    category: "Aquaculture",
    department: "Aquaculture Development Division",
    formNumber: "MF-FRM-003",
    language: "Sinhala / Tamil / English",
    fileType: "DOCX",
    fileSize: "480 KB",
    updatedDate: "To be confirmed",
    href: "#",
  },
  {
    id: "form-04",
    title: "Sample Fisheries Service Request Form",
    description:
      "Placeholder form for requesting an approved fisheries-related public service.",
    category: "Fisheries Services",
    department: "Public Services Division",
    language: "English",
    fileType: "PDF",
    fileSize: "560 KB",
    updatedDate: "To be confirmed",
    href: "#",
  },
  {
    id: "form-05",
    title: "Sample General Application Form",
    description:
      "Placeholder general application form for future Ministry services and programmes.",
    category: "Applications",
    department: "Administration Division",
    formNumber: "MF-FRM-005",
    language: "English",
    fileType: "DOCX",
    fileSize: "390 KB",
    updatedDate: "To be confirmed",
    href: "#",
  },
  {
    id: "form-06",
    title: "Sample Public Information Request Form",
    description:
      "Placeholder form for submitting an approved public information or document request.",
    category: "Public Requests",
    department: "Information Division",
    language: "Sinhala / Tamil / English",
    fileType: "PDF",
    fileSize: "510 KB",
    updatedDate: "To be confirmed",
    href: "#",
  },
]