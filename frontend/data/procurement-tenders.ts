export type ProcurementNotice = {
  id: string
  refNumber: string
  title: string
  publisher: string
  description: string
  detailedScope: string[]
  category:
    | "harbour"
    | "equipment"
    | "it"
    | "consultancy"
    | "supplies"
    | "other"
  categoryLabel: string
  publishedDate: string
  closingDate: string
  submissionAddress: string
  tenderFee?: string
  bidSecurity?: string
  eligibility: string
  contactInfo: string
  fileType: "PDF" | "DOCX" | "XLSX" | "ZIP"
  fileSize: string
  fileUrl: string
  downloadUrl: string
  featured?: boolean
  status: "Open" | "Closing Soon" | "Closed" | "Awarded"
  year: number
}

export const procurementNotices: ProcurementNotice[] = [
  {
    id: "procurement-1",
    refNumber: "MOF/PR/2026/04",
    title: "Dredging and Basin Deepening Works at Mirissa Fishery Harbour",
    publisher: "Ceylon Fishery Harbours Corporation (CFHC)",
    description:
      "Sealed bids are invited from CIDA-registered civil engineering contractors for maintenance dredging, entrance channel clearing, and basin deepening works at Mirissa Fishery Harbour.",
    detailedScope: [
      "Removal of approximately 45,000 cu.m of marine sediment from inner harbour basin",
      "Maintenance clearing of harbour entrance navigation channel to 5.5m depth",
      "Environmental water quality monitoring during dredging operations",
      "Dredged spoil disposal at designated offshore dumping location",
    ],
    category: "harbour",
    categoryLabel: "Harbour & Civil Works",
    publishedDate: "2026-02-01",
    closingDate: "2026-03-25",
    submissionAddress: "Procurement Committee, CFHC HQ, No. 15, Rock House Lane, Colombo 15",
    tenderFee: "LKR 12,500 (Non-refundable)",
    bidSecurity: "LKR 450,000 (Valid for 120 days)",
    eligibility: "CIDA Grade C3 or above in Marine / Dredging Works",
    contactInfo: "Chief Engineer (Harbours): +94 112 529 361 | tender@cfhc.gov.lk",
    fileType: "PDF",
    fileSize: "2.4 MB",
    fileUrl: "#",
    downloadUrl: "#",
    featured: true,
    status: "Closing Soon",
    year: 2026,
  },
  {
    id: "procurement-2",
    refNumber: "MOF/EQ/2026/01",
    title: "Supply, Installation and Commissioning of Industrial Flake Ice Plants",
    publisher: "Ministry of Fisheries HQ",
    description:
      "International competitive bidding for the supply, installation, testing and commissioning of three 25-Ton daily capacity industrial flake ice making plants for coastal fish landing centers.",
    detailedScope: [
      "Supply of 3 x 25-Ton/day automated containerized flake ice production units",
      "Installation of ammonia/eco-refrigerant compressors and ice storage bins",
      "On-site technical training for Ministry refrigeration technicians",
      "Comprehensive 2-year warranty and maintenance service agreement",
    ],
    category: "equipment",
    categoryLabel: "Equipment & Refrigeration",
    publishedDate: "2026-01-15",
    closingDate: "2026-04-10",
    submissionAddress: "Ministry Procurement Committee, New Secretariat, Maligawatta, Colombo 10",
    tenderFee: "LKR 25,000",
    bidSecurity: "LKR 1,200,000",
    eligibility: "Authorized original equipment manufacturers (OEM) or certified agents",
    contactInfo: "Director Engineering: +94 112 327 060 | procurement@fisheries.gov.lk",
    fileType: "PDF",
    fileSize: "1.8 MB",
    fileUrl: "#",
    downloadUrl: "#",
    featured: true,
    status: "Open",
    year: 2026,
  },
  {
    id: "procurement-3",
    refNumber: "MOF/IT/2026/02",
    title: "Procurement of Enterprise VMS Satellite Transceivers and Server Hardware",
    publisher: "Department of Fisheries and Aquatic Resources (DFAR)",
    description:
      "Supply and delivery of 150 Inmarsat/Iridium Marine Satellite VMS Transceivers and enterprise rack servers for DFAR Monitoring, Control and Surveillance (MCS) operations center.",
    detailedScope: [
      "150 x IP67 waterproof marine VMS transceivers with emergency SOS button",
      "2 x Enterprise 2U Rack Servers with 128GB RAM & redundant power supplies",
      "Integration API documentation for existing national vessel registry system",
      "Type approval certification by Telecommunications Regulatory Commission (TRCSL)",
    ],
    category: "it",
    categoryLabel: "IT & Communications",
    publishedDate: "2026-01-20",
    closingDate: "2026-04-05",
    submissionAddress: "Departmental Procurement Committee, DFAR, Maligawatta, Colombo 10",
    tenderFee: "LKR 15,000",
    bidSecurity: "LKR 650,000",
    eligibility: "TRCSL registered ICT vendors with marine electronics experience",
    contactInfo: "MCS Operations Manager: +94 112 449 175 | mcs@fisheriesdept.gov.lk",
    fileType: "PDF",
    fileSize: "1.2 MB",
    fileUrl: "#",
    downloadUrl: "#",
    featured: true,
    status: "Open",
    year: 2026,
  },
  {
    id: "procurement-4",
    refNumber: "MOF/CS/2026/03",
    title: "Consultancy Services for Environmental Impact Assessment (EIA) of Proposed Commercial Aquaculture Zones",
    publisher: "National Aquaculture Development Authority (NAQDA)",
    description:
      "Expressions of Interest (EOI) are invited from consultancy firms to conduct comprehensive Environmental Impact Assessments for proposed brackishwater shrimp zones in Mannar & Batticaloa.",
    detailedScope: [
      "Baseline ecological surveys of mangrove ecosystems & estuarine water quality",
      "Hydrodynamic modeling for effluent discharge & carrying capacity estimation",
      "Public stakeholder consultations & environmental management plan (EMP) preparation",
      "Submission of EIA report for Central Environmental Authority (CEA) approval",
    ],
    category: "consultancy",
    categoryLabel: "Consultancy Services",
    publishedDate: "2026-02-10",
    closingDate: "2026-03-30",
    submissionAddress: "Chairman, Consultancy Procurement Committee, NAQDA, Pelawatte, Battaramulla",
    tenderFee: "LKR 10,000",
    bidSecurity: "LKR 250,000",
    eligibility: "CEA registered environmental consultancy organizations",
    contactInfo: "Director (Coastal Aquaculture): +94 112 786 497 | eia@naqda.gov.lk",
    fileType: "DOCX",
    fileSize: "680 KB",
    fileUrl: "#",
    downloadUrl: "#",
    status: "Closing Soon",
    year: 2026,
  },
  {
    id: "procurement-5",
    refNumber: "MOF/SU/2026/05",
    title: "Annual Supply of High-Density Polyethylene (HDPE) Fish Boxes and Crates",
    publisher: "Ceylon Fisheries Corporation (CFC)",
    description:
      "National competitive bidding for the manufacture and supply of 20,000 food-grade insulated HDPE fish transport boxes for CFC retail and wholesale distribution networks.",
    detailedScope: [
      "20,000 x 50-Liter food-grade UV-stabilized HDPE stackable fish crates",
      "Custom hot-stamped CFC logo and serial numbering on all units",
      "Compliance with Sri Lanka Standards Institute (SLSI) food contact regulations",
    ],
    category: "supplies",
    categoryLabel: "Supplies & Services",
    publishedDate: "2026-02-05",
    closingDate: "2026-04-20",
    submissionAddress: "Procurement Division, CFC, No. 118, Rockhouse Lane, Colombo 15",
    tenderFee: "LKR 7,500",
    bidSecurity: "LKR 300,000",
    eligibility: "Plastic injection molding manufacturers with food-grade certification",
    contactInfo: "Supplies Manager: +94 112 523 000 | supplies@cfc.gov.lk",
    fileType: "PDF",
    fileSize: "890 KB",
    fileUrl: "#",
    downloadUrl: "#",
    status: "Open",
    year: 2026,
  },
  {
    id: "procurement-6",
    refNumber: "MOF/PR/2025/12",
    title: "Construction of Breakwater Extension and Slipway at Tangalle Fishery Harbour",
    publisher: "Ceylon Fishery Harbours Corporation (CFHC)",
    description:
      "Contract for the construction of 120m rubble-mound breakwater extension, 25-ton vessel repair slipway, and reinforced concrete quay wall at Tangalle.",
    detailedScope: [
      "Placement of 35,000 cu.m of armour rock and core material",
      "Construction of 120m concrete cap and wave wall",
      "Mechanical winch and cradle installation for vessel slipway",
    ],
    category: "harbour",
    categoryLabel: "Harbour & Civil Works",
    publishedDate: "2025-08-10",
    closingDate: "2025-10-15",
    submissionAddress: "CFHC HQ, Colombo 15",
    eligibility: "CIDA Grade C2 or above",
    contactInfo: "CFHC Tender Board: +94 112 529 361",
    fileType: "ZIP",
    fileSize: "4.5 MB",
    fileUrl: "#",
    downloadUrl: "#",
    status: "Awarded",
    year: 2025,
  },
  {
    id: "procurement-7",
    refNumber: "MOF/EQ/2025/08",
    title: "Procurement of Oceanographic Survey Equipment for RV Samuddrika",
    publisher: "National Aquatic Resources Research Agency (NARA)",
    description:
      "Supply of multi-beam echo sounder, CTD profiler, and plankton sampling nets for oceanographic research vessel RV Samuddrika.",
    detailedScope: [
      "1 x High-resolution 300kHz Multi-Beam Echo Sounder System",
      "2 x Deep-sea Conductivity-Temperature-Depth (CTD) Rosette Profilers",
    ],
    category: "equipment",
    categoryLabel: "Equipment & Refrigeration",
    publishedDate: "2025-06-15",
    closingDate: "2025-08-20",
    submissionAddress: "NARA HQ, Crow Island, Colombo 15",
    eligibility: "Scientific instrument OEMs and authorized distributors",
    contactInfo: "NARA Procurement: +94 112 521 000",
    fileType: "PDF",
    fileSize: "1.5 MB",
    fileUrl: "#",
    downloadUrl: "#",
    status: "Closed",
    year: 2025,
  },
  {
    id: "procurement-8",
    refNumber: "MOF/IT/2025/05",
    title: "Implementation of E-Licensing Portal & Digital Payment Gateway",
    publisher: "Department of Fisheries and Aquatic Resources (DFAR)",
    description:
      "Development and cloud hosting of online vessel licensing portal, mobile inspection app, and LankaPay payment gateway integration.",
    detailedScope: [
      "Web portal for vessel registration & permit renewals",
      "Mobile app for field inspectors with offline sync",
    ],
    category: "it",
    categoryLabel: "IT & Communications",
    publishedDate: "2025-04-12",
    closingDate: "2025-06-01",
    submissionAddress: "DFAR Headquarters, Colombo 10",
    eligibility: "Software firms with government e-service experience",
    contactInfo: "IT Unit: +94 112 449 175",
    fileType: "PDF",
    fileSize: "980 KB",
    fileUrl: "#",
    downloadUrl: "#",
    status: "Awarded",
    year: 2025,
  },
  {
    id: "procurement-9",
    refNumber: "MOF/PR/2024/09",
    title: "Rehabilitation of Dambulla Freshwater Fish Breeding Center Ponds",
    publisher: "National Aquaculture Development Authority (NAQDA)",
    description:
      "Civil works contract for repairing 24 earth breeding ponds, concrete water intake channels, and drainage sluice gates.",
    detailedScope: [
      "Desilting and earthen bund re-compaction of 24 nursery ponds",
      "Construction of 400m concrete inlet channel and water gates",
    ],
    category: "harbour",
    categoryLabel: "Harbour & Civil Works",
    publishedDate: "2024-09-01",
    closingDate: "2024-10-30",
    submissionAddress: "NAQDA HQ, Battaramulla",
    eligibility: "CIDA Grade C4 or above",
    contactInfo: "NAQDA Civil Division: +94 112 786 497",
    fileType: "PDF",
    fileSize: "1.1 MB",
    fileUrl: "#",
    downloadUrl: "#",
    status: "Closed",
    year: 2024,
  },
]
