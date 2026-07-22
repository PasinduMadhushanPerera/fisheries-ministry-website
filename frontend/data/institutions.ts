export interface Institution {
  id: string
  title: string
  shortTitle?: string
  type:
    | "Department"
    | "Authority"
    | "Corporation"
    | "Research Institute"
    | "Training Institute"
    | "Regional Office"
    | "Other"
  description: string
  responsibilities: string[]
  image: string
  href: string
  website?: string
  featured?: boolean
}

export const featuredInstitutions: Institution[] = [
  {
    id: "institution-1",
    title: "National Aquatic Resources Research and Development Agency",
    shortTitle: "NARA",
    type: "Research Institute",
    description:
      "Supports research, scientific studies and technical development related to aquatic resources, fisheries and marine environments.",
    responsibilities: [
      "Aquatic resources research",
      "Marine scientific studies",
      "Technical advisory services",
    ],
    image: "/images/institutions/institution-1.jpg",
    href: "/institutions/nara",
    featured: true,
  },
  {
    id: "institution-2",
    title: "National Aquaculture Development Authority",
    shortTitle: "NAQDA",
    type: "Authority",
    description:
      "Supports the development of aquaculture and inland fisheries through technical assistance, training and sector-development programmes.",
    responsibilities: [
      "Aquaculture development",
      "Inland fisheries support",
      "Training and technical assistance",
    ],
    image: "/images/institutions/institution-2.jpg",
    href: "/institutions/naqda",
    featured: true,
  },
  {
    id: "institution-3",
    title: "Ceylon Fisheries Corporation",
    shortTitle: "CFC",
    type: "Corporation",
    description:
      "Supports fisheries-sector services and market-related activities connected with fish distribution and public access.",
    responsibilities: [
      "Fisheries-related services",
      "Distribution support",
      "Public-sector market operations",
    ],
    image: "/images/institutions/institution-3.jpg",
    href: "/institutions/cfc",
    featured: true,
  },
]

export const institutions: Institution[] = [
  ...featuredInstitutions,
  {
    id: "institution-4",
    title: "Department of Fisheries and Aquatic Resources",
    shortTitle: "DFAR",
    type: "Department",
    description:
      "Supports fisheries administration, regulatory functions and services associated with the management of fisheries and aquatic resources.",
    responsibilities: [
      "Fisheries administration",
      "Licensing and regulation",
      "Resource-management support",
    ],
    image: "/images/institutions/institution-4.jpg",
    href: "/institutions/dfar",
  },
  {
    id: "institution-5",
    title: "Ceylon Fishery Harbours Corporation",
    shortTitle: "CFHC",
    type: "Corporation",
    description:
      "Supports the management and development of fishery-harbour infrastructure and related facilities.",
    responsibilities: [
      "Fishery-harbour management",
      "Infrastructure development",
      "Harbour-service coordination",
    ],
    image: "/images/institutions/institution-5.jpg",
    href: "/institutions/cfhc",
  },
  {
    id: "institution-6",
    title: "North Sea Limited",
    type: "Corporation",
    description:
      "Provides fisheries-related products and services in support of fishing communities and sector activities.",
    responsibilities: [
      "Fisheries-related products",
      "Industry support services",
      "Community-service delivery",
    ],
    image: "/images/institutions/institution-6.jpg",
    href: "/institutions/north-sea-limited",
  },
  {
    id: "institution-7",
    title: "Ocean University of Sri Lanka",
    shortTitle: "OCUSL",
    type: "Training Institute",
    description:
      "Supports education, professional training and skills development connected with ocean, fisheries and maritime sectors.",
    responsibilities: [
      "Higher education",
      "Vocational training",
      "Maritime and fisheries skills development",
    ],
    image: "/images/institutions/institution-7.jpg",
    href: "/institutions/ocean-university",
  },
  {
    id: "institution-8",
    title: "Regional Fisheries Offices",
    type: "Regional Office",
    description:
      "Provide regional-level services, coordination and public assistance for fisheries-sector stakeholders.",
    responsibilities: [
      "Regional service delivery",
      "Stakeholder coordination",
      "Public assistance",
    ],
    image: "/images/institutions/institution-8.jpg",
    href: "/institutions/regional-offices",
  },
]