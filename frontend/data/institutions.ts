export interface Institution {
  id: string
  title: string
  shortTitle: string
  acronym: string
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
  website: string
  isExternal: boolean
  featured?: boolean
  established?: string
  actOrMandate?: string
  location?: string
  contactPhone?: string
  contactEmail?: string
  detailedOverview?: string[]
  coreDivisions?: string[]
}

export const institutions: Institution[] = [
  {
    id: "dfar",
    title: "Department of Fisheries & Aquatic Resources",
    shortTitle: "Department of Fisheries",
    acronym: "DFAR",
    type: "Department",
    description:
      "Responsible for fisheries management, vessel registration, licensing, and marine enforcement across Sri Lanka.",
    responsibilities: [
      "Fisheries administration & law enforcement",
      "Fishing vessel registration & seaworthiness licensing",
      "Monitoring, Control & Surveillance (MCS) operations",
      "Fisher welfare, insurance & safety protocol delivery",
    ],
    image: "/images/institutions/dfar.jpg",
    href: "https://fisheriesdept.gov.lk/",
    website: "https://fisheriesdept.gov.lk/",
    isExternal: true,
    featured: true,
    established: "1941",
    actOrMandate: "Fisheries & Aquatic Resources Act No. 2 of 1996",
    location: "New Secretariat, Maligawatta, Colombo 10, Sri Lanka",
    contactPhone: "+94 112 449 175",
    contactEmail: "info@fisheriesdept.gov.lk",
  },
  {
    id: "nara",
    title: "National Aquatic Resources Research Agency",
    shortTitle: "NARA",
    acronym: "NARA",
    type: "Research Institute",
    description:
      "Conducts scientific research in oceanography, marine biology, fisheries management, and aquatic environment.",
    responsibilities: [
      "Aquatic resources research & marine biodiversity surveys",
      "Oceanographic studies & hydrographic survey mapping",
      "Technical advisory services for sustainable fisheries",
      "Post-harvest technology & fish quality assessment",
    ],
    image: "/images/institutions/nara.jpg",
    href: "http://www.nara.ac.lk/",
    website: "http://www.nara.ac.lk/",
    isExternal: true,
    featured: true,
    established: "1981",
    actOrMandate: "NARA Act No. 54 of 1981",
    location: "Crow Island, Mattakkuliya, Colombo 15, Sri Lanka",
    contactPhone: "+94 112 521 000",
    contactEmail: "info@nara.ac.lk",
  },
  {
    id: "naqda",
    title: "National Aquaculture Development Authority",
    shortTitle: "NAQDA",
    acronym: "NAQDA",
    type: "Authority",
    description:
      "Drives sustainable inland fisheries, commercial shrimp farming, seed production, and freshwater aquaculture.",
    responsibilities: [
      "Aquaculture development & extension services",
      "Freshwater & brackishwater fingerling production",
      "Technical assistance for shrimp and ornamental fish farming",
      "Commercial aquaculture licensing & cluster support",
    ],
    image: "/images/institutions/naqda.jpg",
    href: "https://naqda.gov.lk/",
    website: "https://naqda.gov.lk/",
    isExternal: true,
    featured: true,
    established: "1998",
    actOrMandate: "NAQDA Act No. 5 of 1998",
    location: "No. 41/1, New Parliament Road, Pelawatte, Battaramulla, Sri Lanka",
    contactPhone: "+94 112 786 497",
    contactEmail: "info@naqda.gov.lk",
  },
  {
    id: "cfhc",
    title: "Ceylon Fishery Harbours Corporation",
    shortTitle: "CFHC",
    acronym: "CFHC",
    type: "Corporation",
    description:
      "Constructs, manages, and operates fishery harbours, anchorage facilities, and maritime safety infrastructure.",
    responsibilities: [
      "Fishery-harbour management & maritime maintenance",
      "Harbour infrastructure development & dredging",
      "Slipway, fuel bunkering & vessel repair services",
      "Coastal harbour security & anchorage coordination",
    ],
    image: "/images/institutions/cfhc.jpg",
    href: "https://cfhc.gov.lk/",
    website: "https://cfhc.gov.lk/",
    isExternal: true,
    featured: true,
    established: "1972",
    actOrMandate: "State Industrial Corporations Act No. 49 of 1957",
    location: "No. 15, Rock House Lane, Colombo 15, Sri Lanka",
    contactPhone: "+94 112 529 361",
    contactEmail: "info@cfhc.gov.lk",
  },
  {
    id: "cfc",
    title: "Ceylon Fisheries Corporation",
    shortTitle: "CFC",
    acronym: "CFC",
    type: "Corporation",
    description:
      "Manages commercial fish purchasing, cold storage facilities, fish processing, and islandwide public distribution.",
    responsibilities: [
      "Islandwide fresh fish purchasing & cold chain distribution",
      "Public-sector market operations & price stabilization",
      "Ice production & cold storage facility management",
    ],
    image: "/images/institutions/cfc.jpg",
    href: "https://cfc.gov.lk/",
    website: "https://cfc.gov.lk/",
    isExternal: true,
    featured: true,
    established: "1964",
    location: "No. 118, Rockhouse Lane, Colombo 15, Sri Lanka",
    contactPhone: "+94 112 523 000",
    contactEmail: "info@cfc.gov.lk",
  },
  {
    id: "cnfl",
    title: "CEY-NOR FOUNDATION LTD",
    shortTitle: "CEY-NOR",
    acronym: "CNFL",
    type: "Corporation",
    description:
      "Specializes in fiberglass boat manufacturing, marine vessel construction, and modern fishing gear technology.",
    responsibilities: [
      "Fiberglass multiday vessel & boat manufacturing",
      "Marine engine installation & hull repairs",
      "Modern fishing gear & maritime technology supply",
    ],
    image: "/images/institutions/cnfl.jpg",
    href: "https://www.ceynor.gov.lk/",
    website: "https://www.ceynor.gov.lk/",
    isExternal: true,
    established: "1967",
    location: "No. 335, D.R. Wijewardena Mawatha, Colombo 10, Sri Lanka",
    contactPhone: "+94 112 448 040",
    contactEmail: "info@ceynor.gov.lk",
  },
  {
    id: "nsl",
    title: "North Sea Ltd",
    shortTitle: "North Sea",
    acronym: "NSL",
    type: "Corporation",
    description:
      "Operates state-of-the-art fishing net manufacturing plants supplying high-quality netting products to local fishers.",
    responsibilities: [
      "High-strength fishing net manufacturing & supply",
      "Fiberglass vessel construction & repair",
      "Community-service delivery for coastal fishers",
    ],
    image: "/images/institutions/nsl.jpg",
    href: "https://northsea.lk/",
    website: "https://northsea.lk/",
    isExternal: true,
    established: "2001",
    location: "Gurunagar, Jaffna / Weerawila, Hambantota, Sri Lanka",
    contactPhone: "+94 212 222 145",
    contactEmail: "info@northsea.lk",
  },
  {
    id: "other",
    title: "Other Sector Organisations",
    shortTitle: "Affiliates",
    acronym: "OTHER",
    type: "Other",
    description:
      "Explore statutory boards, provincial fisheries bodies, and partner institutions under Ministry jurisdiction.",
    responsibilities: [
      "Provincial fisheries extension offices",
      "Co-operative societies & stakeholder bodies",
      "Marine environment protection partners",
    ],
    image: "/images/institutions/other.jpg",
    href: "/institutions",
    website: "https://other.lk/",
    isExternal: false,
  },
]

export const featuredInstitutions = institutions.filter((inst) => inst.featured)