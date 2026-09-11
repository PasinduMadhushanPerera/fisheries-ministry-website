export type EventCategory =
  | "All"
  | "Symposiums & Conferences"
  | "Workshops & Training"
  | "Stakeholder Forums"
  | "Community Outreach"

export type MinistryEvent = {
  id: string
  title: string
  summary: string
  category: Exclude<EventCategory, "All">
  date: string
  displayDate: string
  time: string
  location: string
  venue: string
  organizer: string
  referenceNumber: string
  status: "Upcoming" | "Completed" | "Ongoing"
  image?: string
  contactEmail: string
  contactPhone: string
  description: string[]
  agenda: { time: string; topic: string }[]
}

export const eventCategories: EventCategory[] = [
  "All",
  "Symposiums & Conferences",
  "Workshops & Training",
  "Stakeholder Forums",
  "Community Outreach",
]

export const ministryEvents: MinistryEvent[] = [
  {
    id: "national-fisheries-symposium-2026",
    title: "National Fisheries & Blue Economy Symposium 2026",
    summary:
      "A landmark gathering of marine scientists, policymakers, fisheries leaders, and international partners to chart the future of sustainable fisheries in Sri Lanka.",
    category: "Symposiums & Conferences",
    date: "2026-06-20",
    displayDate: "20 June 2026",
    time: "09:00 AM - 04:30 PM",
    location: "Colombo",
    venue: "BMICH Main Auditorium, Colombo 07",
    organizer: "Ministry of Fisheries & NARA",
    referenceNumber: "MFAR/EV/2026/001",
    status: "Upcoming",
    image: "/images/events/symposium.jpg",
    contactEmail: "symposium@fisheries.gov.lk",
    contactPhone: "+94 11 244 6183",
    description: [
      "The National Fisheries & Blue Economy Symposium brings together over 500 delegates from government, academic research institutions, commercial fisheries, and international marine organizations.",
      "The symposium will focus on sustainable stock management, modernizing harbor technologies, marine climate adaptation, and expanding value-added fish exports.",
      "Keynote addresses will be delivered by the Hon. Minister of Fisheries and leading international ocean conservation specialists.",
    ],
    agenda: [
      { time: "09:00 AM", topic: "Registration & Welcome Reception" },
      { time: "09:30 AM", topic: "Keynote Address: Sustainable Ocean Governance" },
      { time: "11:00 AM", topic: "Panel 1: Modernizing Artisanal & Deep-Sea Fisheries" },
      { time: "01:30 PM", topic: "Panel 2: Climate Resilience & Coastal Community Welfare" },
      { time: "03:30 PM", topic: "Closing Declarations & Policy Roadmap" },
    ],
  },
  {
    id: "coastal-fisher-safety-radio-training-workshop",
    title: "Coastal Fisher Safety & Maritime VHF Radio Workshop",
    summary:
      "Hands-on safety training and maritime VHF radio communication workshop for multiday vessel operators and coastal fishers.",
    category: "Workshops & Training",
    date: "2026-06-12",
    displayDate: "12 June 2026",
    time: "08:30 AM - 02:00 PM",
    location: "Southern Province",
    venue: "Tangalle Fishery Harbour Training Hall",
    organizer: "Department of Fisheries & Maritime Safety Unit",
    referenceNumber: "MFAR/EV/2026/002",
    status: "Upcoming",
    image: "/images/events/safety-workshop.jpg",
    contactEmail: "safety@fisheries.gov.lk",
    contactPhone: "+94 47 224 0120",
    description: [
      "This practical workshop equips coastal fishers and boat captains with critical sea survival, distress signal protocol, and maritime radio operating skills.",
      "Participants will receive hands-on instruction on operating VHF marine radios, VMS distress beacons, life-raft deployment, and interpreting real-time weather alerts from the Department of Meteorology.",
    ],
    agenda: [
      { time: "08:30 AM", topic: "Vessel Safety Pre-Departure Checklist" },
      { time: "10:00 AM", topic: "VHF Channel 16 Emergency Calls & VMS Distresses" },
      { time: "11:30 AM", topic: "Live Survival at Sea Demonstration" },
      { time: "01:00 PM", topic: "Distribution of Certified Safety Manuals" },
    ],
  },
  {
    id: "inland-aquaculture-farmers-conference",
    title: "National Inland Aquaculture & Freshwater Farmers Conference",
    summary:
      "A national technical conference discussing fingerling production, pond water quality management, and commercial fish farming subsidies.",
    category: "Stakeholder Forums",
    date: "2026-06-05",
    displayDate: "05 June 2026",
    time: "09:00 AM - 03:30 PM",
    location: "North Central Province",
    venue: "District Auditorium, Anuradhapura",
    organizer: "National Aquaculture Development Authority (NAQDA)",
    referenceNumber: "MFAR/EV/2026/003",
    status: "Upcoming",
    image: "/images/events/aquaculture-conference.jpg",
    contactEmail: "aquaculture@naqda.gov.lk",
    contactPhone: "+94 25 222 3410",
    description: [
      "Organized by NAQDA, this conference provides freshwater fish and prawn farmers with expert insights into sustainable aquaculture technologies.",
      "Topics include disease prevention, high-efficiency feeds, government loan schemes for pond expansion, and market linkages with commercial exporters.",
    ],
    agenda: [
      { time: "09:00 AM", topic: "Opening Remarks by NAQDA Chairman" },
      { time: "10:15 AM", topic: "Session: Quality Seed Stock & Broodstock Management" },
      { time: "01:15 PM", topic: "Session: Accessing Credit & Fisheries Insurance" },
      { time: "02:45 PM", topic: "Interactive Q&A Session with Technical Officers" },
    ],
  },
  {
    id: "marine-environment-protection-awareness-rally",
    title: "Coastal Ecosystems & Marine Conservation Community Rally",
    summary:
      "A islandwide coastal cleanup and marine environment protection rally engaging youth, coastal schools, and local fishing societies.",
    category: "Community Outreach",
    date: "2026-05-28",
    displayDate: "28 May 2026",
    time: "07:30 AM - 12:00 PM",
    location: "Western Province",
    venue: "Negombo Beach Park & Lagoon Coastal Line",
    organizer: "Ministry Environment Unit & MEPA",
    referenceNumber: "MFAR/EV/2026/004",
    status: "Upcoming",
    image: "/images/events/coastal-rally.jpg",
    contactEmail: "environment@fisheries.gov.lk",
    contactPhone: "+94 31 222 8900",
    description: [
      "A community outreach event focused on reducing plastic pollution in coastal fishing waters, protecting coral reefs, and preserving mangrove estuaries.",
      "Volunteers and fishing community members will participate in beach cleanups, mangrove sapling planting, and educational sessions.",
    ],
    agenda: [
      { time: "07:30 AM", topic: "Volunteer Briefing & Cleanup Gear Distribution" },
      { time: "08:00 AM", topic: "Lagoon & Coastal Beach Cleanup Activity" },
      { time: "10:30 AM", topic: "Mangrove Replanting & Ecological Session" },
      { time: "11:45 AM", topic: "Certificates of Appreciation Presentation" },
    ],
  },
]

export function getUpcomingEvents() {
  return ministryEvents.filter((event) => event.status === "Upcoming")
}

export function getEventById(id: string) {
  return ministryEvents.find((event) => event.id === id)
}
