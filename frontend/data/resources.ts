import {
  BookOpen,
  BriefcaseBusiness,
  ClipboardList,
  Download,
  FileText,
  FolderOpen,
  type LucideIcon,
} from "lucide-react"

export type ResourceCategory = {
  title: string
  description: string
  href: string
  icon: LucideIcon
}

export type FeaturedResource = {
  title: string
  category: string
  description: string
  fileType: string
  publishedDate?: string
  href: string
}

export const resourceCategories: ResourceCategory[] = [
  {
    title: "Documents & Downloads",
    description:
      "Access official documents, downloadable files, guidelines and supporting materials.",
    href: "/resources/documents",
    icon: FolderOpen,
  },
  {
    title: "Publications",
    description:
      "Browse Ministry publications, research materials, handbooks and information resources.",
    href: "/resources/publications",
    icon: BookOpen,
  },
  {
    title: "Annual Reports",
    description:
      "View annual reports and institutional performance information published by the Ministry.",
    href: "/resources/annual-reports",
    icon: FileText,
  },
  {
    title: "Circulars",
    description:
      "Find official circulars, administrative instructions and public communications.",
    href: "/resources/circulars",
    icon: ClipboardList,
  },
  {
    title: "Forms",
    description:
      "Download application forms and supporting documents for Ministry services.",
    href: "/resources/forms",
    icon: Download,
  },
  {
    title: "Tenders",
    description:
      "View procurement notices, tender documents and related opportunities.",
    href: "/resources/tenders",
    icon: BriefcaseBusiness,
  },
]

export const featuredResources: FeaturedResource[] = [
  {
    title: "Official Ministry Document",
    category: "Documents & Downloads",
    description:
      "Verified Ministry documents will be published here through the content management system.",
    fileType: "PDF",
    href: "/resources/documents",
  },
  {
    title: "Latest Publication",
    category: "Publications",
    description:
      "Current publications and information resources will be made available after approval.",
    fileType: "PDF",
    href: "/resources/publications",
  },
  {
    title: "Annual Report",
    category: "Annual Reports",
    description:
      "Official annual reports will be uploaded after the relevant content has been verified.",
    fileType: "PDF",
    href: "/resources/annual-reports",
  },
]