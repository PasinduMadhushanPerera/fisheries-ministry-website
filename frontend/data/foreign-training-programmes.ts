export type ForeignTrainingProgramme = {
  id: string
  year: number
  title: string
  country: string
  institution: string
  description: string
  category:
    | "scholarships"
    | "technical-seminars"
    | "oceanography"
    | "high-seas"
    | "blue-economy"
    | "other"
  categoryLabel: string
  publishedDate?: string
  applicationDeadline?: string
  fileType: "PDF" | "DOCX" | "XLSX" | "JPG" | "PNG" | "ZIP"
  fileSize: string
  fileUrl: string
  downloadUrl: string
  image?: string
  featured?: boolean
  status: "Open" | "Closing Soon" | "Closed" | "Upcoming" | "Archived"
}

export const foreignTrainingProgrammes: ForeignTrainingProgramme[] = [
  {
    id: "foreign-1",
    year: 2026,
    title: "JICA Knowledge Co-Creation Program in Sustainable Fisheries & Coastal Management",
    country: "Japan",
    institution: "Japan International Cooperation Agency (JICA) & Tokyo University of Marine Science",
    description:
      "Fully-funded 6-month international training fellowship in Japan focusing on sustainable coastal capture fisheries, artificial reef management, and post-harvest cold chain logistics.",
    category: "scholarships",
    categoryLabel: "Scholarships & Fellowships",
    publishedDate: "2026-01-10",
    applicationDeadline: "2026-04-15",
    fileType: "PDF",
    fileSize: "1.4 MB",
    fileUrl: "#",
    downloadUrl: "#",
    image: "/images/services/foreign-training.jpg",
    featured: true,
    status: "Open",
  },
  {
    id: "foreign-2",
    year: 2026,
    title: "NORAD High-Seas Fishery Management & Satellite VMS Seminar 2026",
    country: "Norway",
    institution: "Norwegian Agency for Development Cooperation (NORAD) & Institute of Marine Research, Bergen",
    description:
      "Specialized technical seminar in Bergen, Norway, exploring satellite Vessel Monitoring Systems (VMS), electronic catch reporting, and combating Illegal, Unreported, and Unregulated (IUU) fishing.",
    category: "high-seas",
    categoryLabel: "High-Seas Fisheries",
    publishedDate: "2026-01-25",
    applicationDeadline: "2026-05-10",
    fileType: "PDF",
    fileSize: "920 KB",
    fileUrl: "#",
    downloadUrl: "#",
    image: "/images/services/foreign-training.jpg",
    featured: true,
    status: "Open",
  },
  {
    id: "foreign-3",
    year: 2026,
    title: "ITEC International Course in Advanced Marine Aquaculture & Hatchery Management",
    country: "India",
    institution: "Central Institute of Brackishwater Aquaculture (CIBA), Chennai & ITEC Ministry of External Affairs",
    description:
      "Fully sponsored 8-week practical training in Chennai, India, covering sea bass and mud crab seed production, recirculating aquaculture systems (RAS), and fish health management.",
    category: "technical-seminars",
    categoryLabel: "Technical Seminars",
    publishedDate: "2026-02-01",
    applicationDeadline: "2026-04-30",
    fileType: "PDF",
    fileSize: "780 KB",
    fileUrl: "#",
    downloadUrl: "#",
    image: "/images/services/local-training.jpg",
    featured: true,
    status: "Open",
  },
  {
    id: "foreign-4",
    year: 2026,
    title: "Blue Economy & Ocean Governance Leadership Program 2026",
    country: "Australia",
    institution: "Australian National Centre for Ocean Resources and Security (ANCORS), University of Wollongong",
    description:
      "Executive leadership fellowship in Australia for senior Ministry policy makers examining maritime boundary delimitation, marine spatial planning, and sustainable ocean economy governance.",
    category: "blue-economy",
    categoryLabel: "Blue Economy",
    publishedDate: "2026-01-18",
    applicationDeadline: "2026-03-30",
    fileType: "PDF",
    fileSize: "1.1 MB",
    fileUrl: "#",
    downloadUrl: "#",
    status: "Closing Soon",
  },
  {
    id: "foreign-5",
    year: 2026,
    title: "China-AOSHR Marine Oceanographic Survey & Hydrographic Mapping Workshop",
    country: "China",
    institution: "First Institute of Oceanography (FIO), Ministry of Natural Resources, Qingdao",
    description:
      "Technical workshop in Qingdao, China, providing hands-on instruction in ocean bathymetric mapping, acoustic sub-bottom profiling, and marine ecosystem modeling.",
    category: "oceanography",
    categoryLabel: "Oceanography & Marine Biology",
    publishedDate: "2026-02-05",
    applicationDeadline: "2026-06-15",
    fileType: "DOCX",
    fileSize: "540 KB",
    fileUrl: "#",
    downloadUrl: "#",
    status: "Open",
  },
  {
    id: "foreign-6",
    year: 2026,
    title: "Chevening Climate Resilience & Ocean Conservation Masters Scholarship",
    country: "United Kingdom",
    institution: "UK Foreign, Commonwealth & Development Office (FCDO) & Plymouth Marine Laboratory",
    description:
      "Prestigious 1-year master's degree scholarship at leading UK universities focusing on climate change impacts on coastal fisheries, coral reef restoration, and marine protected areas.",
    category: "scholarships",
    categoryLabel: "Scholarships & Fellowships",
    publishedDate: "2026-01-05",
    applicationDeadline: "2026-04-01",
    fileType: "PDF",
    fileSize: "860 KB",
    fileUrl: "#",
    downloadUrl: "#",
    status: "Closing Soon",
  },
  {
    id: "foreign-7",
    year: 2025,
    title: "KOICA Fisheries Infrastructure & Cold-Chain Management Course",
    country: "Korea",
    institution: "Korea International Cooperation Agency (KOICA) & Pukyong National University, Busan",
    description:
      "3-month specialized training in Busan, South Korea, detailing automated fish market auctions, hygienic landing site operations, and solar-powered cold storage engineering.",
    category: "technical-seminars",
    categoryLabel: "Technical Seminars",
    publishedDate: "2025-08-15",
    fileType: "PDF",
    fileSize: "950 KB",
    fileUrl: "#",
    downloadUrl: "#",
    status: "Archived",
  },
  {
    id: "foreign-8",
    year: 2025,
    title: "IOTC Regional Tuna Stock Assessment & Observer Training Seminar",
    country: "Seychelles",
    institution: "Indian Ocean Tuna Commission (IOTC) Secretariat, Victoria",
    description:
      "Regional observer deployment training for multiday vessel monitoring, pelagic shark species identification, and tuna stock assessment data validation.",
    category: "high-seas",
    categoryLabel: "High-Seas Fisheries",
    publishedDate: "2025-06-20",
    fileType: "XLSX",
    fileSize: "320 KB",
    fileUrl: "#",
    downloadUrl: "#",
    status: "Archived",
  },
  {
    id: "foreign-9",
    year: 2025,
    title: "AUSAID Coastal Ecosystem Restoration & Mangrove Management Workshop",
    country: "Australia",
    institution: "Australian Centre for International Agricultural Research (ACIAR), Townsville",
    description:
      "Field workshop in Queensland, Australia, covering mangrove carbon sequestration assessment, estuary rehabilitation, and community-based coastal protection.",
    category: "oceanography",
    categoryLabel: "Oceanography & Marine Biology",
    publishedDate: "2025-05-12",
    fileType: "JPG",
    fileSize: "185 KB",
    fileUrl: "#",
    downloadUrl: "#",
    status: "Archived",
  },
  {
    id: "foreign-10",
    year: 2025,
    title: "Bilateral Blue Growth & Seafood Export Compliance Seminar",
    country: "Netherlands",
    institution: "Wageningen University & Research & Netherlands Food and Consumer Product Safety Authority",
    description:
      "Technical compliance seminar in the Netherlands examining EU seafood hygiene regulations, trace-metal laboratory testing, and sanitary export certification.",
    category: "blue-economy",
    categoryLabel: "Blue Economy",
    publishedDate: "2025-04-10",
    fileType: "PDF",
    fileSize: "670 KB",
    fileUrl: "#",
    downloadUrl: "#",
    status: "Archived",
  },
  {
    id: "foreign-11",
    year: 2024,
    title: "FAO/Bay of Bengal Program (BOBP) Maritime Safety & VMS Protocol Conference",
    country: "India",
    institution: "Bay of Bengal Programme Inter-Governmental Organisation (BOBP-IGO), Chennai",
    description:
      "Inter-governmental conference on regional sea safety standards, transboundary vessel distress frequency protocols, and artisanal fisher life-saving gear.",
    category: "high-seas",
    categoryLabel: "High-Seas Fisheries",
    publishedDate: "2024-10-15",
    fileType: "PDF",
    fileSize: "810 KB",
    fileUrl: "#",
    downloadUrl: "#",
    status: "Archived",
  },
  {
    id: "foreign-12",
    year: 2024,
    title: "JICA Sustainable Deep-Sea Fishing & Longline Gear Technology Course",
    country: "Japan",
    institution: "JICA Yokohama Center & Japan Fisheries Research Agency",
    description:
      "4-month practical training in Yokohama, Japan, on eco-friendly longline gear design, turtle excluder devices (TEDs), and fuel-efficient vessel propulsion.",
    category: "technical-seminars",
    categoryLabel: "Technical Seminars",
    publishedDate: "2024-05-20",
    fileType: "ZIP",
    fileSize: "2.1 MB",
    fileUrl: "#",
    downloadUrl: "#",
    status: "Archived",
  },
]
