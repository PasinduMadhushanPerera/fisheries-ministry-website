import {
  Accessibility,
  Bell,
  Building2,
  Clock3,
  Download,
  FileCheck2,
  FileText,
  Globe2,
  Languages,
  LifeBuoy,
  Newspaper,
  Search,
  ShipWheel,
} from "lucide-react"

export const popularSearches = [
  {
    label: "Fishing licences",
    href: "/services/fishing-licences",
  },
  {
    label: "Vessel registration",
    href: "/services/fishing-vessel-registration",
  },
  {
    label: "Application forms",
    href: "/documents/forms",
  },
  {
    label: "Public notices",
    href: "/media-centre/notices",
  },
  {
    label: "Contact the Ministry",
    href: "/contact",
  },
]

export const quickActions = [
  {
    title: "Access services",
    description:
      "Browse registration, licensing, support and fisheries-related public services.",
    href: "/services",
    icon: FileCheck2,
    accent: "green" as const,
  },
  {
    title: "Download forms",
    description:
      "Find application forms, guidance documents and official Ministry resources.",
    href: "/documents/forms",
    icon: Download,
    accent: "blue" as const,
  },
  {
    title: "Latest news",
    description:
      "Read Ministry updates, sector activities and public information.",
    href: "/media-centre/news",
    icon: Newspaper,
    accent: "sky" as const,
  },
  {
    title: "Public notices",
    description:
      "Review official announcements, circulars and important public updates.",
    href: "/media-centre/notices",
    icon: Bell,
    accent: "amber" as const,
  },
  {
    title: "Institutions",
    description:
      "Connect with departments, authorities and fisheries-sector organisations.",
    href: "/institutions",
    icon: Building2,
    accent: "violet" as const,
  },
  {
    title: "Contact and support",
    description:
      "Get assistance with Ministry services, enquiries and public information.",
    href: "/contact",
    icon: LifeBuoy,
    accent: "rose" as const,
  },
]

export const capabilityStats = [
  {
    value: "24/7",
    label: "Digital information access",
    description:
      "Public information can be accessed online at any time.",
    icon: Clock3,
  },
  {
    value: "3",
    label: "Official languages",
    description:
      "The platform is structured for Sinhala, Tamil and English content.",
    icon: Languages,
  },
  {
    value: "One",
    label: "Citizen service portal",
    description:
      "Services, notices, institutions and documents are brought together.",
    icon: Globe2,
  },
  {
    value: "Inclusive",
    label: "Accessible experience",
    description:
      "Keyboard support, readable content and accessibility controls are built in.",
    icon: Accessibility,
  },
]

export const heroHighlights = [
  {
    label: "Public services",
    icon: ShipWheel,
  },
  {
    label: "Official documents",
    icon: FileText,
  },
  {
    label: "Accessible information",
    icon: Search,
  },
]