import type { LucideIcon } from "lucide-react"
import {
  BadgeCheck,
  Building2,
  ClipboardCheck,
  FileSearch,
  FileText,
  GraduationCap,
  HandHeart,
  MapPin,
  Search,
  ShipWheel,
} from "lucide-react"

export type CitizenQuickTask = {
  title: string
  description: string
  href: string
  icon: LucideIcon
}

export type CitizenService = {
  title: string
  description: string
  href: string
  icon: LucideIcon
}

export type CitizenGuidanceItem = {
  title: string
  description: string
  href: string
  linkLabel: string
  icon: LucideIcon
}

export const citizenQuickTasks: CitizenQuickTask[] = [
  {
    title: "Find a licence or registration",
    description:
      "View fishing licences, fisher registrations, vessel registrations and renewal services.",
    href: "/services/licences-and-registrations",
    icon: Search,
  },
  {
    title: "Download an application form",
    description:
      "Access official forms, document checklists and application guidance.",
    href: "/resources?category=forms",
    icon: FileText,
  },
  {
    title: "Find a fisheries office",
    description:
      "Locate the Ministry, department, institution or regional office you need.",
    href: "/contact",
    icon: MapPin,
  },
  {
    title: "Check application status",
    description:
      "Find guidance about checking the progress of a submitted application.",
    href: "/services/application-status",
    icon: FileSearch,
  },
]

export const citizenServices: CitizenService[] = [
  {
    title: "Fishing licence guidance",
    description:
      "Find information about fishing licence applications, renewals, required documents, fees and submission methods.",
    href: "/services/fishing-licence",
    icon: BadgeCheck,
  },
  {
    title: "Fisher registration",
    description:
      "Learn how to register as a fisher and understand the documents and information required for registration.",
    href: "/services/fisher-registration",
    icon: ClipboardCheck,
  },
  {
    title: "Vessel registration",
    description:
      "Access guidance for fishing vessel registration, ownership updates, renewals and replacement documents.",
    href: "/services/vessel-registration",
    icon: ShipWheel,
  },
  {
    title: "Welfare and assistance",
    description:
      "Find welfare, livelihood support and assistance programmes available to fishers and fishing communities.",
    href: "/services/fisher-welfare",
    icon: HandHeart,
  },
  {
    title: "Training and development",
    description:
      "Explore training, awareness and skills-development programmes for fishers, youth and coastal communities.",
    href: "/services/training-and-development",
    icon: GraduationCap,
  },
  {
    title: "Forms and application guidance",
    description:
      "Download official forms and review the required documents before submitting an application.",
    href: "/resources?category=forms",
    icon: FileText,
  },
]

export const citizenGuidanceItems: CitizenGuidanceItem[] = [
  {
    title: "Forms and application guidance",
    description:
      "Download official application forms, supporting-document checklists and submission instructions.",
    href: "/resources?category=forms",
    linkLabel: "Browse forms and documents",
    icon: FileText,
  },
  {
    title: "Find the correct institution",
    description:
      "Identify the Ministry, department or fisheries institution responsible for the service you need.",
    href: "/institutions",
    linkLabel: "View fisheries institutions",
    icon: Building2,
  },
]