export type LocalTrainingProgramme = {
  id: string
  year: number
  title: string
  provider: string
  description: string
  category:
    | "language"
    | "professional-development"
    | "administration"
    | "finance"
    | "procurement"
    | "technology"
    | "management"
    | "other"
  categoryLabel: string
  subheading?: string
  publishedDate?: string
  applicationDeadline?: string
  fileType: "PDF" | "JPG" | "PNG" | "DOCX" | "XLSX" | "ZIP"
  fileSize: string
  fileUrl: string
  downloadUrl: string
  image?: string
  featured?: boolean
  status: "Open" | "Closing Soon" | "Closed" | "Upcoming" | "Archived"
}

export const localTrainingProgrammes: LocalTrainingProgramme[] = [
  {
    id: "training-1",
    year: 2026,
    title: "English Language Courses 2026/2027",
    provider: "Department of Official Languages & Ministry HRD",
    description:
      "Comprehensive English language proficiency courses designed for public sector officers and Ministry staff to enhance professional communication and report writing.",
    category: "language",
    categoryLabel: "Language Courses",
    publishedDate: "2026-01-15",
    applicationDeadline: "2026-03-31",
    fileType: "PDF",
    fileSize: "1 MB",
    fileUrl: "#",
    downloadUrl: "#",
    image: "/images/services/local-training.jpg",
    featured: true,
    status: "Open",
  },
  {
    id: "training-2",
    year: 2026,
    title: "Training Program on SDFL – Program Schedule – July 2026",
    provider: "Skills Development Fund Limited (SDFL)",
    description:
      "Official annual training schedule and course catalogue offered by SDFL focusing on technical skill upgrading, vocational competency, and industrial productivity.",
    category: "professional-development",
    categoryLabel: "Professional Development",
    publishedDate: "2026-02-01",
    applicationDeadline: "2026-06-30",
    fileType: "PDF",
    fileSize: "178 KB",
    fileUrl: "#",
    downloadUrl: "#",
    image: "/images/services/foreign-training.jpg",
    featured: true,
    status: "Open",
  },
  {
    id: "training-3",
    year: 2026,
    title: "Master of Business Administration Program – The Open University of Sri Lanka",
    provider: "The Open University of Sri Lanka (OUSL)",
    description:
      "Postgraduate MBA degree programme intake notice for executive public officers seeking advanced managerial, strategic planning, and organizational leadership skills.",
    category: "management",
    categoryLabel: "Management",
    publishedDate: "2026-01-20",
    applicationDeadline: "2026-04-15",
    fileType: "PDF",
    fileSize: "794 KB",
    fileUrl: "#",
    downloadUrl: "#",
    image: "/images/services/recruitment.jpg",
    featured: true,
    status: "Open",
  },
  {
    id: "training-4",
    year: 2026,
    title: "Contract Administration and Payment Procedures",
    provider: "National Institute of Business Management (NIBM)",
    description:
      "Specialized workshop covering public contract management, contractor dispute resolution, milestone verification, and government payment clearance protocols.",
    category: "procurement",
    categoryLabel: "Procurement",
    publishedDate: "2026-02-10",
    applicationDeadline: "2026-03-25",
    fileType: "PDF",
    fileSize: "891 KB",
    fileUrl: "#",
    downloadUrl: "#",
    image: "/images/services/procurement.jpg",
    status: "Open",
  },
  {
    id: "training-5",
    year: 2026,
    title: "Government Accounting System and Recording of Treasury Transactions",
    provider: "Department of Public Finance & Treasury Training Centre",
    description:
      "Practical training for finance officers on CIGAS software, vote ledger maintenance, monthly treasury reconciliation, and public sector accounting standards.",
    category: "finance",
    categoryLabel: "Finance",
    publishedDate: "2026-01-10",
    applicationDeadline: "2026-03-10",
    fileType: "PDF",
    fileSize: "829 KB",
    fileUrl: "#",
    downloadUrl: "#",
    image: "/images/services/local-training.jpg",
    status: "Open",
  },
  {
    id: "training-6",
    year: 2026,
    title: "Financial Regulations",
    provider: "Ministry of Finance, Economic Stabilization and National Policies",
    description:
      "Refresher seminar on Sri Lanka Public Financial Regulations (FR), delegation of financial authority, tender board operations, and audit compliance.",
    category: "finance",
    categoryLabel: "Finance",
    publishedDate: "2026-01-05",
    applicationDeadline: "2026-03-05",
    fileType: "PDF",
    fileSize: "838 KB",
    fileUrl: "#",
    downloadUrl: "#",
    image: "/images/services/foreign-training.jpg",
    status: "Closing Soon",
  },
  {
    id: "training-7",
    year: 2026,
    title: "Training Programme 2026 – National Institute of Labour Studies",
    provider: "National Institute of Labour Studies (NILS)",
    description:
      "Industrial relations, labour law compliance, occupational safety at sea, and human resource management training for Ministry operational units.",
    category: "administration",
    categoryLabel: "Administration",
    publishedDate: "2026-02-05",
    applicationDeadline: "2026-05-30",
    fileType: "PDF",
    fileSize: "512 KB",
    fileUrl: "#",
    downloadUrl: "#",
    image: "/images/services/recruitment.jpg",
    status: "Open",
  },
  {
    id: "training-8",
    year: 2025,
    title: "Preparation of the Government Officers’ Advances ‘B’ Account",
    provider: "Department of Public Accounts",
    description:
      "Technical guidance notes and ledger reconciliation templates for preparing annual Government Officers' Advances 'B' accounts and audit submission files.",
    category: "finance",
    categoryLabel: "Finance",
    publishedDate: "2025-09-12",
    fileType: "PDF",
    fileSize: "821 KB",
    fileUrl: "#",
    downloadUrl: "#",
    image: "/images/services/procurement.jpg",
    status: "Archived",
  },
  {
    id: "training-9",
    year: 2025,
    title: "Procurement Procedures for Information Technology (IT) Equipment",
    provider: "Information and Communication Technology Agency (ICTA)",
    description:
      "Standard operating procedures, technical specifications, and evaluation criteria for purchasing server hardware, office computers, and network gear.",
    category: "procurement",
    categoryLabel: "Procurement",
    publishedDate: "2025-08-20",
    fileType: "PDF",
    fileSize: "843 KB",
    fileUrl: "#",
    downloadUrl: "#",
    image: "/images/services/local-training.jpg",
    status: "Archived",
  },
  {
    id: "training-10",
    year: 2025,
    title: "Executive Certificate in Photography",
    provider: "Sri Lanka Foundation Institute (SLFI)",
    description:
      "Creative course covering official event documentation, digital photojournalism, field photography techniques, and media archiving for public relations officers.",
    category: "professional-development",
    categoryLabel: "Professional Development",
    publishedDate: "2025-06-15",
    fileType: "JPG",
    fileSize: "68 KB",
    fileUrl: "#",
    downloadUrl: "#",
    image: "/images/services/foreign-training.jpg",
    status: "Archived",
  },
  {
    id: "training-11",
    year: 2025,
    title: "Diploma in Digital Journalism",
    provider: "Sri Lanka Press Council & University of Kelaniya",
    description:
      "Comprehensive diploma in digital news writing, social media management, press release drafting, and ethical communications in government sector media.",
    category: "professional-development",
    categoryLabel: "Professional Development",
    publishedDate: "2025-05-10",
    fileType: "JPG",
    fileSize: "209 KB",
    fileUrl: "#",
    downloadUrl: "#",
    image: "/images/services/recruitment.jpg",
    status: "Archived",
  },
  {
    id: "training-12",
    year: 2025,
    title: "Open Water Diver Course – The Institution of Engineers, Sri Lanka",
    provider: "The Institution of Engineers, Sri Lanka (IESL)",
    description:
      "Certified SCUBA open water diving training for coastal engineers, marine biologists, and underwater inspection officers conducting aquatic surveys.",
    category: "technology",
    categoryLabel: "Technology",
    publishedDate: "2025-04-18",
    fileType: "JPG",
    fileSize: "198 KB",
    fileUrl: "#",
    downloadUrl: "#",
    image: "/images/home/hero-ocean-resources.jpg",
    status: "Archived",
  },
  {
    id: "training-13",
    year: 2024,
    title: "Training Programs offered by Distance Learning Centre – Promotion 06",
    provider: "Distance Learning Centre (DLC) Sri Lanka",
    description:
      "Online distance learning modules on e-governance, public policy execution, project monitoring, and strategic management for provincial fisheries officers.",
    category: "management",
    categoryLabel: "Management",
    publishedDate: "2024-11-05",
    fileType: "PDF",
    fileSize: "800 KB",
    fileUrl: "#",
    downloadUrl: "#",
    image: "/images/services/local-training.jpg",
    status: "Archived",
  },
  {
    id: "training-14",
    year: 2024,
    title: "Skills Development Fund Limited – Training Programme – May",
    provider: "Skills Development Fund Limited (SDFL)",
    description:
      "Mid-year vocational skill enhancement modules focusing on technical machinery upkeep, refrigeration mechanics, and quality control processing.",
    category: "professional-development",
    categoryLabel: "Professional Development",
    publishedDate: "2024-05-14",
    fileType: "PDF",
    fileSize: "651 KB",
    fileUrl: "#",
    downloadUrl: "#",
    image: "/images/services/foreign-training.jpg",
    status: "Archived",
  },
  {
    id: "training-15",
    year: 2024,
    title: "Awareness Session on IIPSASB SRS1 Standard and its Impacts on Public Sector Entities and Sri Lanka’s Achievement of SDGs",
    provider: "Chartered Institute of Public Finance and Accountancy (CIPFA)",
    description:
      "Executive seminar examining international public sector accounting standards (IPSAS/SRS1), sustainability reporting, and SDG progress tracking.",
    category: "finance",
    categoryLabel: "Finance",
    publishedDate: "2024-07-22",
    fileType: "PDF",
    fileSize: "674 KB",
    fileUrl: "#",
    downloadUrl: "#",
    image: "/images/services/procurement.jpg",
    status: "Archived",
  },
  {
    id: "training-16",
    year: 2024,
    title: "Personal Files & Salary Conversion, Bid Evaluation – PRAG Institute",
    provider: "PRAG Institute of Management & Public Administration",
    description:
      "Specialized administrative training covering public service personal file maintenance, salary conversion circulars, and tender bid evaluation mechanics.",
    category: "administration",
    categoryLabel: "Administration",
    publishedDate: "2024-03-30",
    fileType: "PDF",
    fileSize: "390 KB",
    fileUrl: "#",
    downloadUrl: "#",
    image: "/images/services/recruitment.jpg",
    status: "Archived",
  },
]
