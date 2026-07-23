import type { LucideIcon } from "lucide-react"
import {
  BadgeCheck,
  FileCheck2,
  FileSearch,
  FileText,
  RefreshCcw,
  Search,
  ShipWheel,
  UserRoundCheck,
} from "lucide-react"

export type LicenceFilter =
  | "All"
  | "Licences"
  | "Permits"
  | "Registrations"
  | "Renewals"

export type LicenceQuickTask = {
  title: string
  description: string
  href: string
  icon: LucideIcon
}

export type LicenceService = {
  title: string
  description: string
  href: string
  category: LicenceFilter
  icon: LucideIcon
}

export type LicenceGuidanceItem = {
  title: string
  description: string
  href: string
  linkLabel: string
  icon: LucideIcon
}

export const licenceFilters: LicenceFilter[] = [
  "All",
  "Licences",
  "Permits",
  "Registrations",
  "Renewals",
]

export const licenceQuickTasks: LicenceQuickTask[] = [
  {
    title: "Find a licence",
    description:
      "Browse fishing and aquaculture licences and understand the application requirements.",
    href: "/services/licences-and-registrations",
    icon: Search,
  },
  {
    title: "Register a vessel or fisher",
    description:
      "Find registration guidance for fishing vessels and individual fishers.",
    href: "/services/vessel-registration",
    icon: ShipWheel,
  },
  {
    title: "Download application forms",
    description:
      "Access official forms, supporting documents and submission guidance.",
    href: "/resources?category=forms",
    icon: FileText,
  },
  {
    title: "Renew an existing licence",
    description:
      "Learn how to renew licences and registrations before they expire.",
    href: "/services/licence-renewal",
    icon: RefreshCcw,
  },
]

export const licenceServices: LicenceService[] = [
  {
    title: "Fishing Licence",
    description:
      "Apply for or renew a fishing licence for eligible fishing activities.",
    href: "/services/fishing-licence",
    category: "Licences",
    icon: BadgeCheck,
  },
  {
    title: "Aquaculture Licence",
    description:
      "Licensing requirements for aquaculture farms and related activities.",
    href: "/services/aquaculture-licence",
    category: "Licences",
    icon: BadgeCheck,
  },
  {
    title: "Import Permit",
    description:
      "Guidance for importing fisheries products and related materials.",
    href: "/services/import-permit",
    category: "Permits",
    icon: FileCheck2,
  },
  {
    title: "Export Permit",
    description:
      "Requirements for exporting fisheries products from Sri Lanka.",
    href: "/services/export-permit",
    category: "Permits",
    icon: FileCheck2,
  },
  {
    title: "Fishing Vessel Registration",
    description:
      "Register a new fishing vessel or update ownership information.",
    href: "/services/vessel-registration",
    category: "Registrations",
    icon: ShipWheel,
  },
  {
    title: "Fisher Registration",
    description:
      "Register as a fisher and maintain an active registration record.",
    href: "/services/fisher-registration",
    category: "Registrations",
    icon: UserRoundCheck,
  },
  {
    title: "Licence Renewal",
    description:
      "Renew existing licences before their expiry date.",
    href: "/services/licence-renewal",
    category: "Renewals",
    icon: RefreshCcw,
  },
  {
    title: "Registration Renewal",
    description:
      "Renew existing registrations and update your information.",
    href: "/services/registration-renewal",
    category: "Renewals",
    icon: RefreshCcw,
  },
]

export const licenceGuidanceItems: LicenceGuidanceItem[] = [
  {
    title: "Forms and supporting documents",
    description:
      "Download official forms, document checklists and application instructions before submitting your request.",
    href: "/resources?category=forms",
    linkLabel: "Browse forms",
    icon: FileText,
  },
  {
    title: "Check application status",
    description:
      "Find guidance for checking the progress of licence, permit and registration applications.",
    href: "/services/application-status",
    linkLabel: "Check application guidance",
    icon: FileSearch,
  },
]