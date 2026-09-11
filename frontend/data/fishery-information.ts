export type FisheryInfoCategory =
  | "landing-site-maps"
  | "fish-species"
  | "tuna-identification"
  | "processing-establishments"
  | "boat-census"

export type CategoryMeta = {
  id: FisheryInfoCategory
  title: string
  description: string
}

export type FisheryInformationItem = {
  id: string
  category: FisheryInfoCategory
  title: string
  description: string
  location?: string
  year?: number
  fileType:
    | "PDF"
    | "XLSX"
    | "XLS"
    | "CSV"
    | "DOCX"
    | "DOC"
    | "PPTX"
    | "ZIP"
    | "PNG"
    | "JPG"
  fileSize: string
  fileUrl: string
  downloadUrl?: string
  publishedDate?: string
  featured?: boolean
}

export const informationCategories: CategoryMeta[] = [
  {
    id: "landing-site-maps",
    title: "Landing Site Maps",
    description: "Browse official landing-site maps for coastal fisheries locations across Sri Lanka.",
  },
  {
    id: "fish-species",
    title: "Fish Species List",
    description: "Access official fish species lists and fisheries reference information.",
  },
  {
    id: "tuna-identification",
    title: "Tuna Identification Cards",
    description: "View practical tuna-identification resources and reference cards.",
  },
  {
    id: "processing-establishments",
    title: "Fish Processing Establishments for Export",
    description: "Access approved or registered fish-processing establishment information.",
  },
  {
    id: "boat-census",
    title: "Boat Census",
    description: "Browse fisheries vessel and boat census documents and datasets.",
  },
]

export const fisheryInformationItems: FisheryInformationItem[] = [
  // --- 1. Landing Site Maps (Exact Locations and File Sizes) ---
  {
    id: "map-chilaw",
    category: "landing-site-maps",
    title: "Chilaw Landing Site Map",
    description: "Official coastal fishing landing site map, harbor boundaries, and anchorage coordinates for Chilaw district.",
    location: "Chilaw",
    year: 2025,
    fileType: "PDF",
    fileSize: "55 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "15 January 2025",
  },
  {
    id: "map-batticaloa",
    category: "landing-site-maps",
    title: "Batticaloa Landing Site Map",
    description: "Official coastal fishing landing site map, lagoon access points, and fish landing center layout for Batticaloa.",
    location: "Batticaloa",
    year: 2025,
    fileType: "PDF",
    fileSize: "225 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "20 January 2025",
  },
  {
    id: "map-tangalle",
    category: "landing-site-maps",
    title: "Tangalle Landing Site Map",
    description: "Official fisheries harbor and coastal landing-site geographical map for Tangalle southern coast.",
    location: "Tangalle",
    year: 2025,
    fileType: "PDF",
    fileSize: "207 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "25 January 2025",
  },
  {
    id: "map-kalutara",
    category: "landing-site-maps",
    title: "Kalutara Landing Site Map",
    description: "Official coastal fishing landing site map and river estuary anchorage layout for Kalutara district.",
    location: "Kalutara",
    year: 2025,
    fileType: "PDF",
    fileSize: "62 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "28 January 2025",
  },
  {
    id: "map-puttalam",
    category: "landing-site-maps",
    title: "Puttalam Landing Site Map",
    description: "Official coastal lagoon and offshore landing site map detailing fish centers across Puttalam district.",
    location: "Puttalam",
    year: 2025,
    fileType: "PDF",
    fileSize: "88 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "02 February 2025",
  },
  {
    id: "map-kalmunai",
    category: "landing-site-maps",
    title: "Kalmunai Landing Site Map",
    description: "Official coastal landing-site geographical map and beach landing points for Kalmunai eastern sector.",
    location: "Kalmunai",
    year: 2025,
    fileType: "PDF",
    fileSize: "191 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "08 February 2025",
  },
  {
    id: "map-matara",
    category: "landing-site-maps",
    title: "Matara Landing Site Map",
    description: "Official fisheries landing site map, breakwater anchorage, and market facilities for Matara coastal zone.",
    location: "Matara",
    year: 2025,
    fileType: "PDF",
    fileSize: "78 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "12 February 2025",
  },
  {
    id: "map-colombo",
    category: "landing-site-maps",
    title: "Colombo Landing Site Map",
    description: "Official metropolitan coastal fishing landing site map and Mutwal harbor facilities diagram.",
    location: "Colombo",
    year: 2025,
    fileType: "PDF",
    fileSize: "48 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "15 February 2025",
  },
  {
    id: "map-trincomalee",
    category: "landing-site-maps",
    title: "Trincomalee Landing Site Map",
    description: "Official natural harbor landing sites, cod bay complex, and coastal fish landing centers map for Trincomalee.",
    location: "Trincomalee",
    year: 2025,
    fileType: "PDF",
    fileSize: "142 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "20 February 2025",
  },
  {
    id: "map-mannar",
    category: "landing-site-maps",
    title: "Mannar Landing Site Map",
    description: "Official coastal landing-site map, lagoon boundaries, and vessel anchorage points for Mannar island and mainland.",
    location: "Mannar",
    year: 2025,
    fileType: "PDF",
    fileSize: "96 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "25 February 2025",
  },
  {
    id: "map-galle",
    category: "landing-site-maps",
    title: "Galle Landing Site Map",
    description: "Official fisheries harbor and coastal landing-site geographical map for Galle southern maritime district.",
    location: "Galle",
    year: 2025,
    fileType: "PDF",
    fileSize: "97 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "28 February 2025",
  },

  // --- 2. Fish Species List ---
  {
    id: "species-marine",
    category: "fish-species",
    title: "Sri Lankan Marine Fish Species List",
    description: "Comprehensive scientific taxonomy, Sinhala/Tamil local names, and commercial classifications of Sri Lanka marine fish species.",
    year: 2025,
    fileType: "PDF",
    fileSize: "310 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "10 March 2025",
  },
  {
    id: "species-freshwater",
    category: "fish-species",
    title: "Inland and Freshwater Fish Species Guide",
    description: "Reference catalogue detailing endemic and cultured freshwater fish species found across Sri Lanka reservoirs and rivers.",
    year: 2025,
    fileType: "PDF",
    fileSize: "280 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "15 March 2025",
  },
  {
    id: "species-commercial-xlsx",
    category: "fish-species",
    title: "Commercially Important Fish Species Database",
    description: "Downloadable Excel database listing commercial fish species codes, export market values, and biological size limits.",
    year: 2025,
    fileType: "XLSX",
    fileSize: "150 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "20 March 2025",
  },

  // --- 3. Tuna Identification Cards ---
  {
    id: "tuna-yellowfin",
    category: "tuna-identification",
    title: "Yellowfin Tuna Identification Card",
    description: "Illustrated pocket field guide for rapid identification of Yellowfin Tuna (Thunnus albacares) vs Bigeye Tuna juveniles.",
    year: 2024,
    fileType: "PDF",
    fileSize: "420 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "05 April 2024",
  },
  {
    id: "tuna-bigeye",
    category: "tuna-identification",
    title: "Bigeye Tuna Identification Card",
    description: "Technical identification card detailing morphological characteristics, fin coloration, and liver histology for Bigeye Tuna.",
    year: 2024,
    fileType: "PDF",
    fileSize: "390 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "10 April 2024",
  },
  {
    id: "tuna-skipjack",
    category: "tuna-identification",
    title: "Skipjack Tuna Identification Card",
    description: "Practical field reference card highlighting ventral stripe patterns and anatomical markers for Skipjack Tuna (Katsuwonus pelamis).",
    year: 2024,
    fileType: "PDF",
    fileSize: "350 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "15 April 2024",
  },
  {
    id: "tuna-albacore",
    category: "tuna-identification",
    title: "Albacore Tuna Identification Card",
    description: "Identification guide for Albacore Tuna (Thunnus alalunga) showing pectoral fin lengths and body shape indicators.",
    year: 2024,
    fileType: "PDF",
    fileSize: "380 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "20 April 2024",
  },

  // --- 4. Fish Processing Establishments for Export ---
  {
    id: "processing-approved-list",
    category: "processing-establishments",
    title: "Approved Processing Establishments List",
    description: "Official registry of EU & US FDA approved seafood processing plants, cold storage facilities, and packing centers in Sri Lanka.",
    year: 2026,
    fileType: "PDF",
    fileSize: "210 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "10 January 2026",
  },
  {
    id: "processing-directory-xlsx",
    category: "processing-establishments",
    title: "Export Establishment Directory",
    description: "Spreadsheet matrix of certified export processing units containing registration numbers, location details, and HACCP status.",
    year: 2026,
    fileType: "XLSX",
    fileSize: "180 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "15 January 2026",
  },
  {
    id: "processing-compliance-docx",
    category: "processing-establishments",
    title: "Processing Facility Compliance Guide",
    description: "Regulatory standard guidelines for fish processing plant hygiene, cold chain integrity, and traceabilty documentation.",
    year: 2025,
    fileType: "DOCX",
    fileSize: "240 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "01 December 2025",
  },

  // --- 5. Boat Census ---
  {
    id: "census-national-boat",
    category: "boat-census",
    title: "National Fishing Boat Census Report",
    description: "Comprehensive census report documenting multi-day offshore vessels, day boats, outboard motorboats, and non-motorized craft.",
    year: 2025,
    fileType: "PDF",
    fileSize: "850 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "15 November 2025",
  },
  {
    id: "census-fleet-csv",
    category: "boat-census",
    title: "Marine Fishing Fleet Dataset",
    description: "Raw CSV dataset containing district-wise fishing fleet registration counts, hull types, engine capacity, and licensing status.",
    year: 2025,
    fileType: "CSV",
    fileSize: "110 KB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "20 November 2025",
  },
  {
    id: "census-inland-zip",
    category: "boat-census",
    title: "Inland Fishing Vessel Summary Archive",
    description: "Compressed archive containing reservoir vessel counts, traditional craft inventories, and inland fisheries vessel registration tables.",
    year: 2025,
    fileType: "ZIP",
    fileSize: "3.4 MB",
    fileUrl: "#",
    downloadUrl: "#",
    publishedDate: "25 November 2025",
  },
]
