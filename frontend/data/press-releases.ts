import type { StaticImageData } from "next/image"

export type PressReleaseCategory =
  | "All"
  | "Ministry Updates"
  | "Fisheries"
  | "Aquaculture"
  | "Marine Conservation"
  | "International Cooperation"

export type PressRelease = {
  slug: string
  title: string
  summary: string
  content: string[]
  category: Exclude<PressReleaseCategory, "All">
  publishedDate: string
  displayDate: string
  referenceNumber: string
  featured: boolean
  image?: string | StaticImageData
  imageAlt?: string
  location?: string
  documentUrl?: string
  contactName?: string
  contactTitle?: string
  contactEmail?: string
  contactPhone?: string
}

export const pressReleaseCategories: PressReleaseCategory[] = [
  "All",
  "Ministry Updates",
  "Fisheries",
  "Aquaculture",
  "Marine Conservation",
  "International Cooperation",
]

export const pressReleases: PressRelease[] = [
  {
    slug: "national-fisheries-development-programme-launched",
    title: "National Fisheries Development Programme Officially Launched",
    summary:
      "The Ministry has launched a national programme aimed at strengthening the fisheries sector, improving coastal livelihoods and promoting sustainable resource management.",
    content: [
      "The Ministry of Fisheries, Aquatic and Ocean Resources has officially launched the National Fisheries Development Programme to strengthen Sri Lanka’s fisheries sector and improve the livelihoods of fishing communities.",
      "The programme will support the modernization of fisheries infrastructure, improve access to technical services and encourage the adoption of safe and sustainable fishing practices.",
      "Special attention will be given to small-scale fishers, coastal communities, youth participation and opportunities for women involved in fisheries-related livelihoods.",
      "The Ministry will work closely with relevant government institutions, provincial authorities, fisheries organizations and development partners to implement the programme.",
      "Further information about programme activities, eligibility requirements and implementation schedules will be published through official Ministry communication channels.",
    ],
    category: "Ministry Updates",
    publishedDate: "2026-07-21",
    displayDate: "21 July 2026",
    referenceNumber: "MFAR/PR/2026/021",
    featured: true,
    image:
      "/images/press-releases/national-fisheries-development.jpg",
    imageAlt:
      "Officials attending the launch of the National Fisheries Development Programme",
    location: "Colombo",
    documentUrl:
      "/documents/press-releases/national-fisheries-development-programme.pdf",
    contactName: "Media Unit",
    contactTitle:
      "Ministry of Fisheries, Aquatic and Ocean Resources",
    contactEmail: "media@fisheries.gov.lk",
    contactPhone: "+94 11 244 6183",
  },
  {
    slug: "new-safety-initiative-for-coastal-fishers",
    title: "New Safety Initiative Introduced for Coastal Fishers",
    summary:
      "A new national safety initiative will provide training, awareness and emergency-preparedness support to coastal fishing communities.",
    content: [
      "The Ministry has introduced a new safety initiative designed to reduce risks faced by coastal fishers and strengthen emergency preparedness within fishing communities.",
      "The initiative includes safety training, awareness programmes, guidance on weather information and the responsible use of communication and navigation equipment.",
      "Training sessions will be conducted in selected coastal districts with the participation of fisheries officers, community organizations and relevant maritime authorities.",
      "Fishers will also receive information on emergency procedures, vessel safety requirements and recommended practices before departing for fishing activities.",
      "The Ministry encourages all eligible fishing communities to participate in the scheduled awareness and training programmes.",
    ],
    category: "Fisheries",
    publishedDate: "2026-07-17",
    displayDate: "17 July 2026",
    referenceNumber: "MFAR/PR/2026/020",
    featured: false,
    image:
      "/images/press-releases/coastal-fisher-safety.jpg",
    imageAlt:
      "Coastal fishers participating in a safety awareness programme",
    location: "Southern Province",
    documentUrl:
      "/documents/press-releases/coastal-fisher-safety-initiative.pdf",
    contactName: "Department of Fisheries and Aquatic Resources",
    contactTitle: "Fisher Safety Coordination Unit",
    contactEmail: "info@fisheries.gov.lk",
    contactPhone: "+94 11 244 6183",
  },
  {
    slug: "sustainable-aquaculture-development-project-approved",
    title: "Sustainable Aquaculture Development Project Approved",
    summary:
      "The Ministry has approved a new project to expand responsible aquaculture production and strengthen technical support for producers.",
    content: [
      "A new Sustainable Aquaculture Development Project has been approved to support responsible production, improve food security and create livelihood opportunities.",
      "The project will promote environmentally responsible aquaculture practices and provide technical assistance to eligible producers and community-based organizations.",
      "Planned activities include facility development, training, aquatic animal health support and improved access to quality production inputs.",
      "Environmental safeguards and monitoring procedures will be applied throughout the implementation of the project.",
      "Implementation details and opportunities for participation will be announced through the Ministry and relevant regional institutions.",
    ],
    category: "Aquaculture",
    publishedDate: "2026-07-13",
    displayDate: "13 July 2026",
    referenceNumber: "MFAR/PR/2026/019",
    featured: false,
    image:
      "/images/press-releases/aquaculture-development.jpg",
    imageAlt:
      "Officials inspecting a sustainable aquaculture development facility",
    location: "North Western Province",
    documentUrl:
      "/documents/press-releases/sustainable-aquaculture-development.pdf",
    contactName:
      "National Aquaculture Development Authority",
    contactTitle: "Public Information Unit",
    contactEmail: "info@naqda.gov.lk",
    contactPhone: "+94 11 278 6495",
  },
  {
    slug: "fishing-harbour-modernization-programme",
    title: "Fishing Harbour Modernization Programme Expanded",
    summary:
      "The Ministry will expand harbour improvement work to strengthen operational safety, sanitation and services available to fishing communities.",
    content: [
      "The Ministry has announced the expansion of the Fishing Harbour Modernization Programme to improve essential infrastructure and services at selected fishing harbours.",
      "The programme will address operational safety, sanitation, waste management, landing facilities and access to basic services for fishers and harbour users.",
      "Engineering assessments and stakeholder consultations will be conducted before construction and improvement work begins.",
      "The programme will be implemented in phases to minimize disruption to fishing activities and harbour operations.",
      "Regular progress updates will be published through official Ministry channels.",
    ],
    category: "Fisheries",
    publishedDate: "2026-07-09",
    displayDate: "9 July 2026",
    referenceNumber: "MFAR/PR/2026/018",
    featured: false,
    image:
      "/images/press-releases/harbour-modernization.jpg",
    imageAlt:
      "Fishing harbour infrastructure undergoing modernization",
    location: "Western and Southern Provinces",
    documentUrl:
      "/documents/press-releases/fishing-harbour-modernization.pdf",
    contactName: "Ceylon Fishery Harbours Corporation",
    contactTitle: "Corporate Communications Unit",
    contactEmail: "info@cfhc.gov.lk",
    contactPhone: "+94 11 252 3104",
  },
  {
    slug: "marine-conservation-awareness-campaign",
    title: "National Marine Conservation Awareness Campaign Announced",
    summary:
      "A national awareness campaign will promote responsible coastal behaviour, marine habitat protection and community participation.",
    content: [
      "The Ministry has announced a National Marine Conservation Awareness Campaign focused on protecting marine habitats and encouraging responsible use of coastal resources.",
      "The campaign will include educational programmes, community events, coastal clean-up activities and awareness materials for schools and fishing communities.",
      "Government agencies, local authorities, educational institutions and community organizations will be invited to participate.",
      "The campaign will highlight the importance of reducing marine pollution, protecting sensitive ecosystems and supporting sustainable fisheries.",
      "A schedule of national and district-level activities will be released through official communication channels.",
    ],
    category: "Marine Conservation",
    publishedDate: "2026-07-05",
    displayDate: "5 July 2026",
    referenceNumber: "MFAR/PR/2026/017",
    featured: false,
    image:
      "/images/press-releases/marine-conservation-campaign.jpg",
    imageAlt:
      "Participants attending a marine conservation awareness activity",
    location: "Galle",
    documentUrl:
      "/documents/press-releases/marine-conservation-awareness-campaign.pdf",
    contactName: "Marine Environment Protection Unit",
    contactTitle: "Public Awareness Division",
    contactEmail: "environment@fisheries.gov.lk",
    contactPhone: "+94 11 244 6183",
  },
  {
    slug: "regional-cooperation-on-sustainable-fisheries",
    title:
      "Sri Lanka Strengthens Regional Cooperation on Sustainable Fisheries",
    summary:
      "Sri Lanka has reaffirmed its commitment to regional collaboration on responsible fisheries management, research and marine resource protection.",
    content: [
      "Sri Lanka has reaffirmed its commitment to regional cooperation in sustainable fisheries management and the protection of shared marine resources.",
      "The Ministry participated in discussions with regional partners on scientific research, monitoring, responsible fishing practices and measures to address illegal fishing.",
      "The discussions also considered knowledge sharing, technical capacity development and improved cooperation among relevant institutions.",
      "Sri Lanka emphasized the importance of balancing fisheries development with long-term environmental sustainability and community livelihoods.",
      "The Ministry will continue engaging with international and regional partners to support responsible management of aquatic and ocean resources.",
    ],
    category: "International Cooperation",
    publishedDate: "2026-06-30",
    displayDate: "30 June 2026",
    referenceNumber: "MFAR/PR/2026/016",
    featured: false,
    image:
      "/images/press-releases/regional-cooperation.jpg",
    imageAlt:
      "Regional representatives meeting to discuss sustainable fisheries",
    location: "Colombo",
    documentUrl:
      "/documents/press-releases/regional-sustainable-fisheries-cooperation.pdf",
    contactName: "International Relations Division",
    contactTitle:
      "Ministry of Fisheries, Aquatic and Ocean Resources",
    contactEmail: "international@fisheries.gov.lk",
    contactPhone: "+94 11 244 6183",
  },
]

export function getFeaturedPressRelease() {
  return pressReleases.find((pressRelease) => pressRelease.featured)
}

export function getPressReleaseBySlug(slug: string) {
  return pressReleases.find(
    (pressRelease) => pressRelease.slug === slug,
  )
}

export function getRelatedPressReleases(
  pressRelease: PressRelease,
  limit = 3,
) {
  const sameCategory = pressReleases.filter(
    (item) =>
      item.slug !== pressRelease.slug &&
      item.category === pressRelease.category,
  )

  const otherReleases = pressReleases.filter(
    (item) =>
      item.slug !== pressRelease.slug &&
      item.category !== pressRelease.category,
  )

  return [...sameCategory, ...otherReleases].slice(0, limit)
}