export type AdditionalDocument = {
  id: number | string
  label?: string
  downloadUrl?: string
  fileType?: "PDF" | "DOCX" | "XLSX" | "ZIP" | string
  fileSize?: string
}

export type RecruitmentVacancy = {
  id: string
  refNumber: string
  title: string
  subheading?: string
  institution: string
  department: string
  description: string
  qualifications: string[]
  category: "technical" | "administrative" | "research" | "inspection" | "other" | string
  categoryLabel?: string
  publishedDate: string
  closingDate: string
  salaryScale?: string
  ageLimit?: string
  docButtonLabel?: string
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
  status: "Open" | "Closing Soon" | "Closed"
  year: number
}

export const recruitmentVacancies: RecruitmentVacancy[] = [
  {
    id: "vacancy-1",
    refNumber: "MOF/REC/2026/01",
    title: "Marine Fisheries Inspector (Grade III)",
    subheading: "Vessel Monitoring & Inspection Division",
    institution: "Department of Fisheries and Aquatic Resources (DFAR)",
    department: "Vessel Monitoring & Inspection Division",
    description:
      "Applications are invited from qualified Sri Lankan citizens for the post of Marine Fisheries Inspector. Duties include harbour vessel clearance, catch log auditing, and sea safety inspection.",
    qualifications: [
      "Degree in Fisheries Science, Marine Biology, Agriculture or B.Sc. Physical Science",
      "Passes in Sinhala/Tamil and English at G.C.E. (O/L) examination",
      "Physical fitness for high-seas vessel inspection duties",
    ],
    category: "inspection",
    categoryLabel: "Marine Inspection & Compliance",
    publishedDate: "2026-01-20",
    closingDate: "2026-03-25",
    salaryScale: "MN 4-2016: LKR 31,490 - 10x445 - 11x525 - 10x600 - LKR 51,965/-",
    ageLimit: "Between 18 and 35 years as of closing date",
    fileType: "PDF",
    fileSize: "1.1 MB",
    fileUrl: "#",
    downloadUrl: "#",
    featured: true,
    status: "Closing Soon",
    year: 2026,
  },
  {
    id: "vacancy-2",
    refNumber: "MOF/REC/2026/02",
    title: "Senior Research Scientist (Oceanography & Remote Sensing)",
    subheading: "Oceanography & Marine Environment Directorate",
    institution: "National Aquatic Resources Research Agency (NARA)",
    department: "Oceanography & Marine Environment Directorate",
    description:
      "NARA invites applications for Senior Research Scientist to lead satellite oceanographic surveys, sea-surface temperature (SST) modeling, and coastal habitat mapping projects.",
    qualifications: [
      "Ph.D. or Master of Science in Oceanography, GIS & Remote Sensing, or Geophysics",
      "Minimum 5 years research experience in marine satellite data analysis",
      "Demonstrated publication record in peer-reviewed scientific journals",
    ],
    category: "research",
    categoryLabel: "Scientific & Ocean Research",
    publishedDate: "2026-02-01",
    closingDate: "2026-04-15",
    salaryScale: "AR 2-2016: LKR 76,200 - 10x2,000 - LKR 96,200/-",
    ageLimit: "Below 45 years",
    fileType: "PDF",
    fileSize: "1.4 MB",
    fileUrl: "#",
    downloadUrl: "#",
    featured: true,
    status: "Open",
    year: 2026,
  },
  {
    id: "vacancy-3",
    refNumber: "MOF/REC/2026/03",
    title: "Aquaculture Development Extension Officer (Grade II)",
    subheading: "Inland & Coastal Extension Division",
    institution: "National Aquaculture Development Authority (NAQDA)",
    department: "Inland & Coastal Extension Division",
    description:
      "Field extension officers required across Eastern and Northern provinces to assist rural fish farmers, monitor shrimp hatcheries, and manage freshwater fish seed distribution.",
    qualifications: [
      "Diploma in Agriculture / Aquaculture from a recognized school of agriculture",
      "Valid light motor vehicle / motorcycle riding license",
    ],
    category: "technical",
    categoryLabel: "Technical & Extension Services",
    publishedDate: "2026-02-10",
    closingDate: "2026-04-30",
    salaryScale: "MA 3-2016: LKR 32,200 - LKR 52,500/-",
    ageLimit: "Between 20 and 35 years",
    fileType: "PDF",
    fileSize: "850 KB",
    fileUrl: "#",
    downloadUrl: "#",
    featured: true,
    status: "Open",
    year: 2026,
  },
  {
    id: "vacancy-4",
    refNumber: "MOF/REC/2026/04",
    title: "Assistant Director (Planning & Sector Monitoring)",
    subheading: "Planning & Monitoring Division",
    institution: "Ministry of Fisheries HQ",
    department: "Planning & Monitoring Division",
    description:
      "Executive role in formulation of national fisheries action plans, treasury capital expenditure tracking, and coordination with foreign development partners.",
    qualifications: [
      "Special Degree in Economics, Statistics, Public Administration or Development Studies",
      "SLAS / SLPS cadre officers or open recruitment with 3 years executive experience",
    ],
    category: "administrative",
    categoryLabel: "Administrative & Management Services",
    publishedDate: "2026-01-25",
    closingDate: "2026-03-30",
    salaryScale: "SL 1-2016: LKR 47,615 - LKR 84,005/-",
    ageLimit: "Between 22 and 35 years",
    fileType: "PDF",
    fileSize: "920 KB",
    fileUrl: "#",
    downloadUrl: "#",
    featured: false,
    status: "Closing Soon",
    year: 2026,
  },
]
