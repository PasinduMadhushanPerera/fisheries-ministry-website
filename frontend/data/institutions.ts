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
  established?: string
  actOrMandate?: string
  location?: string
  contactPhone?: string
  contactEmail?: string
  detailedOverview?: string[]
  coreDivisions?: string[]
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
      "Aquatic resources research & marine biodiversity surveys",
      "Oceanographic studies & hydrographic survey mapping",
      "Technical advisory services for sustainable fisheries",
      "Post-harvest technology & fish quality assessment",
    ],
    image: "/images/institutions/nara.jpg",
    href: "/institutions/nara",
    website: "http://www.nara.ac.lk",
    featured: true,
    established: "1981",
    actOrMandate: "NARA Act No. 54 of 1981",
    location: "Crow Island, Mattakkuliya, Colombo 15, Sri Lanka",
    contactPhone: "+94 112 521 000",
    contactEmail: "info@nara.ac.lk",
    detailedOverview: [
      "The National Aquatic Resources Research and Development Agency (NARA) is the apex national body charged with research and development in aquatic resources, marine biodiversity, and oceanography in Sri Lanka.",
      "NARA conducts comprehensive scientific investigations in marine, inland, and brackishwater fisheries, coastal zone management, post-harvest fish technology, oceanography, and environmental assessment to ensure sustainable aquatic resource management.",
    ],
    coreDivisions: [
      "Marine Biological Resources Division (MBRD)",
      "Inland Aquatic Resources & Aquaculture Division (IARAD)",
      "Oceanography & Marine Environment Division (OMED)",
      "Fishing Technology & Vessel Design Division (FTD)",
      "Post-Harvest Technology Division (PHTD)",
    ],
  },
  {
    id: "institution-2",
    title: "National Aquaculture Development Authority",
    shortTitle: "NAQDA",
    type: "Authority",
    description:
      "Supports the development of aquaculture and inland fisheries through technical assistance, training and sector-development programmes.",
    responsibilities: [
      "Aquaculture development & extension services",
      "Freshwater & brackishwater fingerling production",
      "Technical assistance for shrimp and ornamental fish farming",
      "Commercial aquaculture licensing & cluster support",
    ],
    image: "/images/institutions/naqda.jpg",
    href: "/institutions/naqda",
    website: "http://www.naqda.gov.lk",
    featured: true,
    established: "1998",
    actOrMandate: "NAQDA Act No. 5 of 1998",
    location: "No. 41/1, New Parliament Road, Pelawatte, Battaramulla, Sri Lanka",
    contactPhone: "+94 112 786 497",
    contactEmail: "info@naqda.gov.lk",
    detailedOverview: [
      "The National Aquaculture Development Authority of Sri Lanka (NAQDA) was established to manage, develop, and promote aquaculture and inland fisheries across Sri Lanka.",
      "NAQDA produces high-quality fish seed and shrimp post-larvae, operates fish breeding centers, provides technical guidance to rural farmers, and facilitates commercial aquaculture investments to increase national fish production.",
    ],
    coreDivisions: [
      "Freshwater Aquaculture Division",
      "Brackishwater Aquaculture & Coastal Division",
      "Ornamental Fish Development Division",
      "Aquaculture Extension & Training Division",
    ],
  },
  {
    id: "institution-3",
    title: "Ceylon Fisheries Corporation",
    shortTitle: "CFC",
    type: "Corporation",
    description:
      "Supports fisheries-sector services and market-related activities connected with fish distribution and public access.",
    responsibilities: [
      "Fisheries-related commercial services",
      "Island-wide fresh fish purchasing & cold chain distribution",
      "Public-sector market operations & price stabilization",
      "Ice production & cold storage facility management",
    ],
    image: "/images/institutions/cfhc.jpg",
    href: "/institutions/cfhc",
    website: "http://www.cfc.gov.lk",
    featured: true,
    established: "1964",
    actOrMandate: "State Industrial Corporations Act No. 49 of 1957",
    location: "No. 118, Rockhouse Lane, Colombo 15, Sri Lanka",
    contactPhone: "+94 112 523 000",
    contactEmail: "info@cfc.gov.lk",
    detailedOverview: [
      "The Ceylon Fisheries Corporation (CFC) operates key commercial and public distribution networks to ensure consumers receive high-quality fish at fair and stable prices across Sri Lanka.",
      "CFC manages cold storage complexes, ice plants, fish processing factories, and a widespread retail outlet network to support artisanal fishers by securing guaranteed purchase prices.",
    ],
    coreDivisions: [
      "Commercial & Fish Purchasing Division",
      "Cold Storage & Ice Production Division",
      "Quality Control & Processing Division",
      "Island-wide Retail & Outlet Network Division",
    ],
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
      "Fisheries administration & law enforcement",
      "Fishing vessel registration & seaworthiness licensing",
      "Monitoring, Control & Surveillance (MCS) operations",
      "Fisher welfare, insurance & safety protocol delivery",
    ],
    image: "/images/institutions/dfar.jpg",
    href: "/institutions/dfar",
    website: "http://www.fisheriesdept.gov.lk",
    established: "1941",
    actOrMandate: "Fisheries & Aquatic Resources Act No. 2 of 1996",
    location: "New Secretariat, Maligawatta, Colombo 10, Sri Lanka",
    contactPhone: "+94 112 449 175",
    contactEmail: "info@fisheriesdept.gov.lk",
    detailedOverview: [
      "The Department of Fisheries and Aquatic Resources (DFAR) is the regulatory authority responsible for administering Sri Lanka's fisheries sector, enforcing marine conservation laws, and registering all fishing craft.",
      "DFAR operates a 24/7 Monitoring, Control and Surveillance (MCS) center, issues vessel seaworthiness permits, manages international catch certification, and ensures compliance with regional fisheries management organizations.",
    ],
    coreDivisions: [
      "Vessel Licensing & Registration Division",
      "Monitoring, Control & Surveillance (MCS) Division",
      "Fish Health & Quality Control Division",
      "Fisher Welfare & Extension Services Division",
    ],
  },
  {
    id: "institution-5",
    title: "Ceylon Fishery Harbours Corporation",
    shortTitle: "CFHC",
    type: "Corporation",
    description:
      "Supports the management and development of fishery-harbour infrastructure and related facilities.",
    responsibilities: [
      "Fishery-harbour management & maritime maintenance",
      "Harbour infrastructure development & dredging",
      "Slipway, fuel bunkering & vessel repair services",
      "Coastal harbour security & anchorage coordination",
    ],
    image: "/images/institutions/cfhc.jpg",
    href: "/institutions/cfhc",
    website: "http://www.cfhc.gov.lk",
    established: "1972",
    actOrMandate: "State Industrial Corporations Act No. 49 of 1957",
    location: "No. 15, Rock House Lane, Colombo 15, Sri Lanka",
    contactPhone: "+94 112 529 361",
    contactEmail: "info@cfhc.gov.lk",
    detailedOverview: [
      "The Ceylon Fishery Harbours Corporation (CFHC) constructs, maintains, and manages Sri Lanka's network of major fishery harbours, coastal anchorages, and landing sites.",
      "CFHC provides multiday fishing vessels with safe berthage, fuel bunkering, ice supply, freshwater, vessel repair slipways, and modern auction hall infrastructure.",
    ],
    coreDivisions: [
      "Harbour Operations & Management Division",
      "Civil Engineering & Coastal Dredging Division",
      "Bunkering & Facility Services Division",
    ],
  },
  {
    id: "institution-6",
    title: "North Sea Limited",
    shortTitle: "NSL",
    type: "Corporation",
    description:
      "Provides fisheries-related products and services in support of fishing communities and sector activities.",
    responsibilities: [
      "High-quality fish net manufacturing & supply",
      "Fiberglass vessel construction & repair",
      "Community-service delivery for coastal fishers",
    ],
    image: "/images/institutions/dfar.jpg",
    href: "/institutions/dfar",
    website: "http://www.northsea.lk",
    established: "2001",
    actOrMandate: "Companies Act No. 7 of 2007",
    location: "Gurunagar, Jaffna / Weerawila, Hambantota, Sri Lanka",
    contactPhone: "+94 212 222 145",
    contactEmail: "info@northsea.lk",
    detailedOverview: [
      "North Sea Limited is a government-owned enterprise engaged in manufacturing high-strength fishing nets, twines, and marine gear designed specifically for local oceanic conditions.",
      "Operating production facilities in Jaffna and Hambantota, North Sea Ltd helps lower gear costs for traditional fishers while maintaining international quality standards.",
    ],
    coreDivisions: [
      "Net Manufacturing Division (Jaffna)",
      "Boat Building & Gear Assembly Division (Hambantota)",
    ],
  },
  {
    id: "institution-7",
    title: "Ocean University of Sri Lanka",
    shortTitle: "OCUSL",
    type: "Training Institute",
    description:
      "Supports education, professional training and skills development connected with ocean, fisheries and maritime sectors.",
    responsibilities: [
      "Higher education & degree programs in oceanography",
      "Vocational training in marine engine maintenance & navigation",
      "Maritime and fisheries skills accreditation",
    ],
    image: "/images/institutions/nara.jpg",
    href: "/institutions/nara",
    website: "http://www.ocu.ac.lk",
    established: "2014",
    actOrMandate: "Ocean University of Sri Lanka Act No. 31 of 2014",
    location: "Crow Island, Mattakkuliya, Colombo 15, Sri Lanka",
    contactPhone: "+94 112 522 546",
    contactEmail: "info@ocu.ac.lk",
    detailedOverview: [
      "The Ocean University of Sri Lanka is a specialized higher education institution dedicated to producing qualified marine scientists, oceanographers, nautical officers, and aquaculture technologists.",
      "It offers degree programs, NVQ vocational diplomas, and practical sea-training courses designed to empower youth for careers in global maritime and fisheries industries.",
    ],
    coreDivisions: [
      "Faculty of Fisheries & Ocean Sciences",
      "Faculty of Engineering & Maritime Technology",
      "Vocational & Technical Training Directorate",
    ],
  },
  {
    id: "institution-8",
    title: "Regional Fisheries Extension Offices",
    shortTitle: "RFEO",
    type: "Regional Office",
    description:
      "Provide regional-level services, coordination and public assistance for fisheries-sector stakeholders.",
    responsibilities: [
      "District-level service delivery & licensing support",
      "Fishermen co-operative society coordination",
      "Disaster relief & fuel subsidy administration",
    ],
    image: "/images/institutions/cfhc.jpg",
    href: "/institutions/cfhc",
    established: "1996",
    location: "Coastal & Inland District Offices Islandwide",
    contactPhone: "+94 112 327 060",
    contactEmail: "regional@fisheries.gov.lk",
    detailedOverview: [
      "Regional Fisheries Extension Offices operate across 15 coastal and inland districts in Sri Lanka to bring Ministry services directly to local fishing communities.",
      "District Fisheries Extension Officers (DFEOs) handle local vessel inspections, manage welfare schemes, mediate lagoon resource disputes, and support co-operative societies.",
    ],
    coreDivisions: [
      "District Licensing & Vessel Inspection Unit",
      "Co-operative Extension & Welfare Unit",
    ],
  },
]