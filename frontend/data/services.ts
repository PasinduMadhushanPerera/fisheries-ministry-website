import {
  Anchor,
  FileText,
  Fish,
  Search,
  ShipWheel,
  Waves,
  FileCheck2,
  Building2,
  ClipboardCheck,
  Microscope,
  CheckCircle2,
  ClipboardList,
  FileSearch,
  Send,
  Download,
  ScrollText,
  BookOpen,
  
} from "lucide-react"

export const popularServiceSearches = [
  "Fishing licences",
  "Application forms",
  "Vessel services",
  "Aquaculture services",
]

export const serviceQuickLinks = [
  {
    title: "Licences & permits",
    description: "Find information about fisheries-related licences and permits.",
    href: "/services/fishing-licences",
    icon: FileText,
  },
  {
    title: "Fishing vessel services",
    description: "Access information relating to fishing vessels and registration.",
    href: "/services/vessel-services",
    icon: ShipWheel,
  },
  {
    title: "Aquaculture services",
    description: "Explore services and guidance related to aquaculture development.",
    href: "/services/aquaculture",
    icon: Fish,
  },
  {
    title: "Marine resources",
    description: "Access public information related to aquatic and ocean resources.",
    href: "/services/marine-resources",
    icon: Waves,
  },
]

export const serviceCategories = [
  {
    value: "all",
    label: "All services",
  },
  {
    value: "licences",
    label: "Licences and permits",
  },
  {
    value: "vessels",
    label: "Fishing vessels",
  },
  {
    value: "aquaculture",
    label: "Aquaculture",
  },
  {
    value: "marine-resources",
    label: "Marine resources",
  },
]

export const servicesHeroIcons = {
  anchor: Anchor,
  search: Search,
}

export const popularServices = [
  {
    title: "Fishing licences and permits",
    description:
      "Access guidance, eligibility information and application resources for fisheries-related licences and permits.",
    category: "licences",
    href: "/services/fishing-licences",
    icon: FileCheck2,
    featured: true,
  },
  {
    title: "Fishing vessel services",
    description:
      "Find information about vessel registration, documentation and fisheries-related vessel services.",
    category: "vessels",
    href: "/services/vessel-services",
    icon: ShipWheel,
    featured: true,
  },
  {
    title: "Aquaculture services",
    description:
      "Explore public information and application guidance related to aquaculture development and support.",
    category: "aquaculture",
    href: "/services/aquaculture",
    icon: Fish,
    featured: true,
  },
  {
    title: "Forms and documents",
    description:
      "Locate official forms, application documents, guidelines and downloadable public resources.",
    category: "documents",
    href: "/documents",
    icon: FileText,
    featured: false,
  },
  {
    title: "Marine and aquatic resources",
    description:
      "Access public information relating to marine resources, aquatic ecosystems and responsible management.",
    category: "marine-resources",
    href: "/services/marine-resources",
    icon: Waves,
    featured: false,
  },
  {
    title: "General fisheries services",
    description:
      "Browse general fisheries-related public services and institutional information.",
    category: "general",
    href: "/services/general",
    icon: Anchor,
    featured: false,
  },
]


export const serviceCategoryCards = [
  {
    title: "Licences and permits",
    description:
      "Browse guidance and application information for fisheries-related licences, permits and approvals.",
    href: "/services?category=licences",
    icon: ClipboardCheck,
    serviceCount: "Services available",
  },
  {
    title: "Fishing vessel services",
    description:
      "Access information related to vessel registration, documentation and fisheries operations.",
    href: "/services?category=vessels",
    icon: ShipWheel,
    serviceCount: "Services available",
  },
  {
    title: "Aquaculture",
    description:
      "Explore information, guidance and public services supporting aquaculture development.",
    href: "/services?category=aquaculture",
    icon: Fish,
    serviceCount: "Services available",
  },
  {
    title: "Marine and aquatic resources",
    description:
      "Find information related to marine resources, aquatic ecosystems and responsible management.",
    href: "/services?category=marine-resources",
    icon: Waves,
    serviceCount: "Services available",
  },
  {
    title: "Research and technical information",
    description:
      "Access scientific, research and technical information relevant to fisheries and aquatic resources.",
    href: "/services?category=research",
    icon: Microscope,
    serviceCount: "Resources available",
  },
  {
    title: "Forms and public documents",
    description:
      "Find application forms, guidelines, notices and downloadable public documents.",
    href: "/documents",
    icon: FileText,
    serviceCount: "Documents available",
  },
  {
    title: "Institutional services",
    description:
      "Browse services and information provided through Ministry departments and affiliated institutions.",
    href: "/institutions",
    icon: Building2,
    serviceCount: "Institutions available",
  },
]


export const serviceProcessSteps = [
  {
    step: "01",
    title: "Find the relevant service",
    description:
      "Search the service directory and review the available guidance, eligibility requirements and responsible institution.",
    icon: FileSearch,
  },
  {
    step: "02",
    title: "Prepare the required documents",
    description:
      "Check the official checklist and prepare the forms, supporting documents and any applicable approvals.",
    icon: ClipboardList,
  },
  {
    step: "03",
    title: "Submit your application",
    description:
      "Submit the application through the approved online, postal or in-person channel stated for that service.",
    icon: Send,
  },
  {
    step: "04",
    title: "Receive the outcome",
    description:
      "Follow the official instructions for status updates, additional information requests and final decisions.",
    icon: CheckCircle2,
  },
]

export const serviceDownloads = [
  {
    title: "Application forms",
    description:
      "Access downloadable forms required for Ministry-related applications and public services.",
    type: "Forms",
    href: "/documents?category=forms",
    icon: FileText,
  },
  {
    title: "Guidelines and instructions",
    description:
      "Review official guidance, instructions and application requirements before submitting documents.",
    type: "Guidelines",
    href: "/documents?category=guidelines",
    icon: BookOpen,
  },
  {
    title: "Acts and regulations",
    description:
      "Browse publicly available legislation, regulations and policy-related documents.",
    type: "Legal documents",
    href: "/documents?category=regulations",
    icon: ScrollText,
  },
]

export const serviceFaqs = [
  {
    question: "How can I find the correct Ministry service?",
    answer:
      "Use the service search or browse by category. Each service page should clearly show the responsible institution, eligibility requirements, documents and submission method.",
  },
  {
    question: "Can I submit applications online?",
    answer:
      "Online submission availability depends on the specific service. The official service page should state whether the application is online, postal or in person.",
  },
  {
    question: "Where can I download official forms?",
    answer:
      "Official forms should be available through the Forms and Downloads section or the relevant service detail page.",
  },
  {
    question: "How do I check application progress?",
    answer:
      "Tracking methods vary by service. Use the official reference number, contact method or tracking system stated on the service page.",
  },
  {
    question: "Who should I contact for assistance?",
    answer:
      "Use the Ministry contact page or the contact details shown on the relevant service page.",
  },
]