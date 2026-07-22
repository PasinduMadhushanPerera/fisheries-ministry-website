import type { LucideIcon } from "lucide-react"
import {
  Anchor,
  BadgeDollarSign,
  Building2,
  Factory,
  FileCheck2,
  FileSearch,
  FileText,
  Globe2,
  Search,
  Ship,
} from "lucide-react"

export type BusinessQuickTask = {
  title: string
  description: string
  href: string
  icon: LucideIcon
}

export type BusinessService = {
  title: string
  description: string
  href: string
  icon: LucideIcon
}

export type BusinessGuidanceItem = {
  title: string
  description: string
  href: string
  linkLabel: string
  icon: LucideIcon
}

export const businessQuickTasks: BusinessQuickTask[] = [
  {
    title: "Import & export permits",
    description:
      "Find permits, application requirements and guidance for seafood import and export activities.",
    href: "/services/import-export-permit",
    icon: Globe2,
  },
  {
    title: "Commercial licences",
    description:
      "Browse commercial fishing, processing and aquaculture licence information.",
    href: "/services/licences-and-registrations",
    icon: Search,
  },
  {
    title: "Download business forms",
    description:
      "Access official business application forms, templates and supporting documents.",
    href: "/resources?category=forms",
    icon: FileText,
  },
  {
    title: "Check application status",
    description:
      "Find guidance for checking the progress of submitted applications.",
    href: "/services/application-status",
    icon: FileSearch,
  },
]

export const businessServices: BusinessService[] = [
  {
    title: "Commercial fishing services",
    description:
      "Access licences, approvals and guidance for commercial fishing operations and vessel owners.",
    href: "/services/commercial-fishing",
    icon: Ship,
  },
  {
    title: "Import & export services",
    description:
      "Learn about permits, documentation and regulatory requirements for international seafood trade.",
    href: "/services/import-export-permit",
    icon: Globe2,
  },
  {
    title: "Aquaculture business services",
    description:
      "Find approvals, registrations and support programmes for aquaculture businesses.",
    href: "/services/aquaculture-licence",
    icon: Anchor,
  },
  {
    title: "Processing establishment approvals",
    description:
      "Guidance for seafood processing facilities, inspections and operational approvals.",
    href: "/services/processing-establishment",
    icon: Factory,
  },
  {
    title: "Investment & development programmes",
    description:
      "Explore investment opportunities, incentives and fisheries sector development initiatives.",
    href: "/services/investment-programmes",
    icon: BadgeDollarSign,
  },
  {
    title: "Business forms & guidance",
    description:
      "Download business application forms and review submission requirements before applying.",
    href: "/resources?category=forms",
    icon: FileCheck2,
  },
]

export const businessGuidanceItems: BusinessGuidanceItem[] = [
  {
    title: "Business forms and documents",
    description:
      "Download official forms, document checklists and application guidance for commercial fisheries services.",
    href: "/resources?category=forms",
    linkLabel: "Browse business forms",
    icon: FileText,
  },
  {
    title: "Relevant institutions",
    description:
      "Identify the Ministry department or affiliated institution responsible for your business application.",
    href: "/institutions",
    linkLabel: "View institutions",
    icon: Building2,
  },
]