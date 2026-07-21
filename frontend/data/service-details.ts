import {
  Anchor,
  Fish,
  FileCheck,
  ShipWheel,
  Waves,
} from "lucide-react"

export const serviceDetails = [
  {
    slug: "fishing-licences",

    title: "Fishing Licences",

    shortDescription:
      "Information about fishing licence applications and related public services.",

    overview:
      "This page provides general information about fishing licence services. Replace this content with the officially approved Ministry information before publication.",

    icon: Fish,

    category: "Licences",

    processingTime: "Varies",

    deliveryMethod: "Online / In Person",

    eligibility:
      "Eligibility requirements depend on the licence type.",

    requiredDocuments: [
      "Completed application form",
      "Identification documents",
      "Supporting documents",
    ],

    steps: [
      "Read the eligibility requirements.",
      "Prepare the required documents.",
      "Submit the application.",
      "Await official confirmation.",
    ],
  },

  {
    slug: "vessel-services",

    title: "Fishing Vessel Services",

    shortDescription:
      "Information related to fishing vessel registration and documentation.",

    overview:
      "Official vessel registration information should be published here.",

    icon: ShipWheel,

    category: "Vessels",

    processingTime: "Varies",

    deliveryMethod: "Online / In Person",

    eligibility:
      "Eligibility depends on vessel ownership and registration requirements.",

    requiredDocuments: [
      "Application",
      "Ownership documents",
      "Supporting certificates",
    ],

    steps: [
      "Review requirements.",
      "Prepare documents.",
      "Submit application.",
      "Receive confirmation.",
    ],
  },

  {
    slug: "aquaculture",

    title: "Aquaculture Services",

    shortDescription:
      "Information regarding aquaculture programmes and approvals.",

    overview:
      "Official aquaculture information will appear here.",

    icon: Waves,

    category: "Aquaculture",

    processingTime: "Varies",

    deliveryMethod: "Online /In Person",

    eligibility:
      "Requirements differ depending on the programme.",

    requiredDocuments: [
      "Application",
      "Site information",
      "Supporting documents",
    ],

    steps: [
      "Read guidance.",
      "Prepare documents.",
      "Submit.",
      "Receive decision.",
    ],
  },

  {
    slug: "certification",

    title: "Certification Services",

    shortDescription:
      "Certification and inspection related public services.",

    overview:
      "Official certification information will be published here.",

    icon: FileCheck,

    category: "Certification",

    processingTime: "Varies",

    deliveryMethod: "Online / In Person",

    eligibility:
      "Depends on certification type.",

    requiredDocuments: [
      "Application",
      "Supporting certificates",
    ],

    steps: [
      "Read requirements.",
      "Submit application.",
      "Verification.",
      "Receive certificate.",
    ],
  },

  {
    slug: "marine-resources",

    title: "Marine Resource Services",

    shortDescription:
      "Marine and aquatic resource information and public services.",

    overview:
      "Official marine resource information should be placed here.",

    icon: Anchor,

    category: "Marine",

    processingTime: "Varies",

    deliveryMethod: "Online / In Person",

    eligibility:
      "Depends on requested service.",

    requiredDocuments: [
      "Application",
      "Supporting information",
    ],

    steps: [
      "Review guidance.",
      "Prepare documents.",
      "Submit.",
      "Receive response.",
    ],
  },
  
  {
  slug: "general",
  title: "General Services",
  shortDescription: "General information about Ministry services.",
  overview: "This page provides general service information.",
  icon: FileCheck,
  category: "General",
  processingTime: "Varies",
  deliveryMethod: "Online / In Person",
  eligibility: "Refer to individual services.",
  requiredDocuments: [
    "Application form",
  ],
  steps: [
    "Read the information.",
    "Prepare documents.",
    "Submit application.",
    "Receive response.",
  ],
}
]