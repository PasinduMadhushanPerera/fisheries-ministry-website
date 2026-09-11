export type RecruitmentVacancy = {
  id: string
  refNumber: string
  title: string
  institution: string
  department: string
  description: string
  qualifications: string[]
  category: "technical" | "administrative" | "research" | "inspection" | "other"
  categoryLabel: string
  publishedDate: string
  closingDate: string
  salaryScale?: string
  ageLimit?: string
  fileType: "PDF" | "DOCX"
  fileSize: string
  fileUrl: string
  downloadUrl: string
  featured?: boolean
  status: "Open" | "Closing Soon" | "Closed"
  year: number
}

export const recruitmentVacancies: RecruitmentVacancy[] = [
  {
    id: "vacancy-1",
    refNumber: "MOF/REC/2026/01",
    title: "Marine Fisheries Inspector (Grade III)",
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
    categoryLabel: "Inspection & Compliance",
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
    categoryLabel: "Scientific Research",
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
    institution: "National Aquaculture Development Authority (NAQDA)",
    department: "Inland & Coastal Extension Division",
    description:
      "Field extension officers required across Eastern and Northern provinces to assist rural fish farmers, monitor shrimp hatcheries, and manage freshwater fish seed distribution.",
    qualifications: [
      "Diploma in Agriculture / Aquaculture from a recognized school of agriculture",
      "Valid light motor vehicle / motorcycle riding license",
    ],
    category: "technical",
    categoryLabel: "Technical & Extension",
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
    refNumber: "MOF/REC/2025/09",
    title: "Civil Mechanical Engineer (Harbour Infrastructure)",
    institution: "Ceylon Fishery Harbours Corporation (CFHC)",
    department: "Engineering & Technical Services",
    description:
      "CFHC requires experienced Civil/Mechanical Engineers for breakwater maintenance, harbour dredging operations, and slipway cradle overhaul.",
    qualifications: [
      "B.Sc. Engineering (Civil or Mechanical) and Corporate Membership of IESL",
      "Minimum 3 years post-qualificational experience in coastal/marine engineering",
    ],
    category: "technical",
    categoryLabel: "Technical & Extension",
    publishedDate: "2025-09-05",
    closingDate: "2025-10-20",
    fileType: "PDF",
    fileSize: "920 KB",
    fileUrl: "#",
    downloadUrl: "#",
    status: "Closed",
    year: 2025,
  },
]
