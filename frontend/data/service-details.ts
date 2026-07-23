import type { LucideIcon } from "lucide-react"
import {
  BadgeCheck,
  Building2,
  CalendarClock,
  CircleDollarSign,
  FileCheck2,
  FileText,
  HelpCircle,
  Landmark,
  Mail,
  MapPin,
  Phone,
  RefreshCcw,
  ShipWheel,
  UserRoundCheck,
  Waves,
} from "lucide-react"

export type ServiceCategory =
  | "Licence"
  | "Permit"
  | "Registration"
  | "Renewal"

export type ServiceAudience =
  | "Citizens"
  | "Businesses"
  | "Fishers"
  | "Vessel Owners"
  | "Aquaculture Operators"

export type ServiceRequirement = {
  title: string
  description: string
}

export type ServiceStep = {
  step: number
  title: string
  description: string
}

export type ServiceDocument = {
  title: string
  description?: string
  required: boolean
}

export type ServiceFee = {
  label: string
  amount: string
  note?: string
}

export type ServiceContact = {
  department: string
  address: string
  phone: string
  email: string
}

export type ServiceDetail = {
  slug: string
  title: string
  shortTitle: string
  description: string
  summary: string
  category: ServiceCategory
  audience: ServiceAudience[]
  icon: LucideIcon
  processingTime: string
  validityPeriod: string
  applicationMethod: string
  onlineApplicationUrl?: string
  formUrl?: string
  requirements: ServiceRequirement[]
  documents: ServiceDocument[]
  steps: ServiceStep[]
  fees: ServiceFee[]
  contact: ServiceContact
  relatedServices: string[]
  lastUpdated: string
}

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "fishing-licence",
    title: "Fishing Licence",
    shortTitle: "Fishing Licence",
    description:
      "Apply for a licence to conduct eligible fishing activities in Sri Lankan waters.",
    summary:
      "A fishing licence authorises an eligible person or organisation to conduct approved fishing activities in accordance with fisheries laws, regulations and licence conditions.",
    category: "Licence",
    audience: ["Citizens", "Fishers", "Vessel Owners"],
    icon: BadgeCheck,
    processingTime: "Subject to application review",
    validityPeriod: "Specified on the issued licence",
    applicationMethod: "Submit the completed application to the relevant office",
    formUrl: "/resources?category=forms",
    requirements: [
      {
        title: "Eligible applicant",
        description:
          "The applicant must meet the eligibility requirements for the requested fishing activity.",
      },
      {
        title: "Registered vessel",
        description:
          "Where a vessel is used, it must hold a valid fishing vessel registration.",
      },
      {
        title: "Compliance with regulations",
        description:
          "The proposed activity must comply with applicable fisheries laws, conservation measures and operational restrictions.",
      },
    ],
    documents: [
      {
        title: "Completed fishing licence application form",
        required: true,
      },
      {
        title: "Copy of National Identity Card or business registration",
        required: true,
      },
      {
        title: "Copy of fishing vessel registration certificate",
        required: true,
      },
      {
        title: "Supporting approvals relevant to the fishing activity",
        required: false,
      },
    ],
    steps: [
      {
        step: 1,
        title: "Review the requirements",
        description:
          "Confirm your eligibility and identify the licence required for your fishing activity.",
      },
      {
        step: 2,
        title: "Prepare the application",
        description:
          "Complete the official application form and collect the required supporting documents.",
      },
      {
        step: 3,
        title: "Submit the application",
        description:
          "Submit the application to the relevant fisheries office for assessment.",
      },
      {
        step: 4,
        title: "Application review",
        description:
          "The responsible authority will verify the information and may request further documents or inspections.",
      },
      {
        step: 5,
        title: "Receive the decision",
        description:
          "Approved applicants will receive the licence together with its conditions and validity period.",
      },
    ],
    fees: [
      {
        label: "Application or licence fee",
        amount: "Contact the relevant authority",
        note: "Fees may differ according to the type of fishing activity and vessel.",
      },
    ],
    contact: {
      department: "Department of Fisheries and Aquatic Resources",
      address: "New Secretariat, Maligawatta, Colombo 10, Sri Lanka",
      phone: "+94 11 244 6183",
      email: "info@fisheries.gov.lk",
    },
    relatedServices: [
      "vessel-registration",
      "fisher-registration",
      "licence-renewal",
    ],
    lastUpdated: "July 2026",
  },
  {
    slug: "aquaculture-licence",
    title: "Aquaculture Licence",
    shortTitle: "Aquaculture Licence",
    description:
      "Apply for authorisation to establish or operate an eligible aquaculture activity.",
    summary:
      "An aquaculture licence supports the lawful establishment and operation of approved aquaculture farms and related activities while protecting aquatic resources and the environment.",
    category: "Licence",
    audience: ["Businesses", "Aquaculture Operators"],
    icon: Waves,
    processingTime: "Subject to technical review and inspection",
    validityPeriod: "Specified on the issued licence",
    applicationMethod:
      "Submit the application with site and operational information",
    formUrl: "/resources?category=forms",
    requirements: [
      {
        title: "Suitable site",
        description:
          "The proposed site must be appropriate for the intended aquaculture activity.",
      },
      {
        title: "Technical information",
        description:
          "The applicant must provide sufficient technical and operational details for assessment.",
      },
      {
        title: "Required approvals",
        description:
          "Environmental, land-use or other regulatory approvals may be required depending on the project.",
      },
    ],
    documents: [
      {
        title: "Completed aquaculture licence application",
        required: true,
      },
      {
        title: "Applicant identification or business registration",
        required: true,
      },
      {
        title: "Site plan and location details",
        required: true,
      },
      {
        title: "Operational or project proposal",
        required: true,
      },
      {
        title: "Environmental or local authority approvals",
        required: false,
      },
    ],
    steps: [
      {
        step: 1,
        title: "Identify the licence requirement",
        description:
          "Confirm the licence and approvals required for the proposed aquaculture operation.",
      },
      {
        step: 2,
        title: "Prepare technical documents",
        description:
          "Collect site plans, operational details and supporting approvals.",
      },
      {
        step: 3,
        title: "Submit the application",
        description:
          "Submit the completed application to the relevant aquaculture authority.",
      },
      {
        step: 4,
        title: "Technical assessment",
        description:
          "Officials may review the proposal, inspect the site and request additional information.",
      },
      {
        step: 5,
        title: "Licence decision",
        description:
          "The applicant will be informed of the decision and any conditions attached to the licence.",
      },
    ],
    fees: [
      {
        label: "Application and inspection fees",
        amount: "Confirmed during application",
      },
    ],
    contact: {
      department: "National Aquaculture Development Authority",
      address: "Sri Lanka",
      phone: "Contact the relevant regional office",
      email: "info@fisheries.gov.lk",
    },
    relatedServices: ["import-permit", "export-permit"],
    lastUpdated: "July 2026",
  },
  {
    slug: "import-permit",
    title: "Fisheries Import Permit",
    shortTitle: "Import Permit",
    description:
      "Apply for permission to import eligible fisheries products, aquatic organisms or related materials.",
    summary:
      "The import permit process helps ensure that imported fisheries products and aquatic materials meet applicable health, biosecurity, conservation and trade requirements.",
    category: "Permit",
    audience: ["Businesses", "Aquaculture Operators"],
    icon: FileCheck2,
    processingTime: "Depends on product type and document verification",
    validityPeriod: "Specified on the permit",
    applicationMethod:
      "Submit the application and shipment information before importation",
    formUrl: "/resources?category=forms",
    requirements: [
      {
        title: "Registered applicant",
        description:
          "The applicant must provide valid personal or business registration information.",
      },
      {
        title: "Eligible products",
        description:
          "The intended products or aquatic materials must be eligible for import.",
      },
      {
        title: "Supporting certificates",
        description:
          "Health, origin, quarantine or other certificates may be required.",
      },
    ],
    documents: [
      {
        title: "Completed import permit application",
        required: true,
      },
      {
        title: "Commercial invoice or pro forma invoice",
        required: true,
      },
      {
        title: "Product and shipment details",
        required: true,
      },
      {
        title: "Health or origin certificates",
        required: false,
      },
      {
        title: "Business registration documents",
        required: true,
      },
    ],
    steps: [
      {
        step: 1,
        title: "Confirm import requirements",
        description:
          "Check whether the product requires fisheries, quarantine or other approvals.",
      },
      {
        step: 2,
        title: "Prepare shipment information",
        description:
          "Collect product descriptions, quantities, supplier details and supporting certificates.",
      },
      {
        step: 3,
        title: "Submit the application",
        description:
          "Submit the application before the shipment arrives in Sri Lanka.",
      },
      {
        step: 4,
        title: "Document assessment",
        description:
          "The authority will assess the application and may request clarification.",
      },
      {
        step: 5,
        title: "Receive the permit",
        description:
          "Approved applicants receive the permit and any applicable import conditions.",
      },
    ],
    fees: [
      {
        label: "Permit processing fee",
        amount: "Contact the issuing authority",
      },
    ],
    contact: {
      department: "Department of Fisheries and Aquatic Resources",
      address: "New Secretariat, Maligawatta, Colombo 10, Sri Lanka",
      phone: "+94 11 244 6183",
      email: "info@fisheries.gov.lk",
    },
    relatedServices: ["export-permit", "aquaculture-licence"],
    lastUpdated: "July 2026",
  },
  {
    slug: "export-permit",
    title: "Fisheries Export Permit",
    shortTitle: "Export Permit",
    description:
      "Apply for permission to export eligible fisheries and aquatic products from Sri Lanka.",
    summary:
      "The export permit process supports legal and traceable fisheries trade by verifying the products, exporter information and required regulatory documentation.",
    category: "Permit",
    audience: ["Businesses"],
    icon: FileCheck2,
    processingTime: "Depends on shipment and document verification",
    validityPeriod: "Specified on the permit",
    applicationMethod:
      "Submit the application with export and shipment documentation",
    formUrl: "/resources?category=forms",
    requirements: [
      {
        title: "Registered exporter",
        description:
          "The applicant must hold the registrations required to conduct the export activity.",
      },
      {
        title: "Compliant products",
        description:
          "The products must meet applicable fisheries, food safety and conservation requirements.",
      },
      {
        title: "Traceability information",
        description:
          "Applicants may be required to provide source, processing and shipment information.",
      },
    ],
    documents: [
      {
        title: "Completed export permit application",
        required: true,
      },
      {
        title: "Commercial invoice",
        required: true,
      },
      {
        title: "Packing list and shipment details",
        required: true,
      },
      {
        title: "Health or catch certificates",
        required: false,
      },
      {
        title: "Exporter registration documents",
        required: true,
      },
    ],
    steps: [
      {
        step: 1,
        title: "Check export requirements",
        description:
          "Confirm the permits and certificates required for the product and destination.",
      },
      {
        step: 2,
        title: "Prepare documents",
        description:
          "Collect shipment, product, source and supporting certification details.",
      },
      {
        step: 3,
        title: "Submit the application",
        description:
          "Submit the completed application before the planned export date.",
      },
      {
        step: 4,
        title: "Application assessment",
        description:
          "Officials will verify the documents and may inspect the shipment or facility.",
      },
      {
        step: 5,
        title: "Receive export approval",
        description:
          "Approved applicants receive the permit and relevant conditions.",
      },
    ],
    fees: [
      {
        label: "Export permit fee",
        amount: "Confirmed by the issuing authority",
      },
    ],
    contact: {
      department: "Department of Fisheries and Aquatic Resources",
      address: "New Secretariat, Maligawatta, Colombo 10, Sri Lanka",
      phone: "+94 11 244 6183",
      email: "info@fisheries.gov.lk",
    },
    relatedServices: ["import-permit", "aquaculture-licence"],
    lastUpdated: "July 2026",
  },
  {
    slug: "vessel-registration",
    title: "Fishing Vessel Registration",
    shortTitle: "Vessel Registration",
    description:
      "Register a fishing vessel or update its ownership and registration information.",
    summary:
      "Fishing vessel registration creates an official record of the vessel, its ownership and authorised use, supporting safety, compliance and fisheries management.",
    category: "Registration",
    audience: ["Vessel Owners", "Fishers"],
    icon: ShipWheel,
    processingTime: "Subject to document review and vessel inspection",
    validityPeriod: "Specified on the registration certificate",
    applicationMethod:
      "Submit the application to the relevant fisheries office",
    formUrl: "/resources?category=forms",
    requirements: [
      {
        title: "Proof of ownership",
        description:
          "The applicant must provide acceptable evidence of ownership or legal possession.",
      },
      {
        title: "Vessel information",
        description:
          "Accurate technical, identification and operational details must be provided.",
      },
      {
        title: "Inspection compliance",
        description:
          "The vessel may be required to pass an inspection before registration.",
      },
    ],
    documents: [
      {
        title: "Completed vessel registration application",
        required: true,
      },
      {
        title: "Proof of vessel ownership",
        required: true,
      },
      {
        title: "Owner identification documents",
        required: true,
      },
      {
        title: "Vessel photographs and technical information",
        required: true,
      },
      {
        title: "Previous registration certificate",
        required: false,
      },
    ],
    steps: [
      {
        step: 1,
        title: "Prepare vessel information",
        description:
          "Collect vessel dimensions, engine details, ownership information and photographs.",
      },
      {
        step: 2,
        title: "Complete the application",
        description:
          "Fill in the official vessel registration form.",
      },
      {
        step: 3,
        title: "Submit the documents",
        description:
          "Submit the application and supporting documents to the relevant office.",
      },
      {
        step: 4,
        title: "Vessel inspection",
        description:
          "The vessel may be inspected to verify its details and suitability.",
      },
      {
        step: 5,
        title: "Receive registration",
        description:
          "Approved applicants receive the official vessel registration certificate.",
      },
    ],
    fees: [
      {
        label: "Registration and inspection fees",
        amount: "Based on vessel category",
      },
    ],
    contact: {
      department: "Department of Fisheries and Aquatic Resources",
      address: "New Secretariat, Maligawatta, Colombo 10, Sri Lanka",
      phone: "+94 11 244 6183",
      email: "info@fisheries.gov.lk",
    },
    relatedServices: [
      "fishing-licence",
      "fisher-registration",
      "registration-renewal",
    ],
    lastUpdated: "July 2026",
  },
  {
    slug: "fisher-registration",
    title: "Fisher Registration",
    shortTitle: "Fisher Registration",
    description:
      "Register as a fisher and maintain an official fisheries registration record.",
    summary:
      "Fisher registration provides an official record that may support access to fisheries services, welfare programmes, training and licensing procedures.",
    category: "Registration",
    audience: ["Citizens", "Fishers"],
    icon: UserRoundCheck,
    processingTime: "Subject to document verification",
    validityPeriod: "Specified on the registration record",
    applicationMethod:
      "Apply through the relevant fisheries office or authorised institution",
    formUrl: "/resources?category=forms",
    requirements: [
      {
        title: "Eligible fisher",
        description:
          "The applicant must be actively engaged in an eligible fisheries activity.",
      },
      {
        title: "Identity verification",
        description:
          "Valid personal identification and residential information must be provided.",
      },
      {
        title: "Activity information",
        description:
          "Applicants must provide details about their fisheries occupation or activity.",
      },
    ],
    documents: [
      {
        title: "Completed fisher registration form",
        required: true,
      },
      {
        title: "Copy of National Identity Card",
        required: true,
      },
      {
        title: "Proof of address",
        required: true,
      },
      {
        title: "Evidence of fisheries occupation",
        required: false,
      },
    ],
    steps: [
      {
        step: 1,
        title: "Check eligibility",
        description:
          "Confirm that you meet the registration requirements for your fisheries activity.",
      },
      {
        step: 2,
        title: "Complete the form",
        description:
          "Enter your personal, contact and fisheries occupation details.",
      },
      {
        step: 3,
        title: "Submit supporting documents",
        description:
          "Provide the application and required identification documents.",
      },
      {
        step: 4,
        title: "Verification",
        description:
          "The relevant office will verify your identity and fisheries activity.",
      },
      {
        step: 5,
        title: "Receive registration",
        description:
          "Successful applicants will receive confirmation of registration.",
      },
    ],
    fees: [
      {
        label: "Registration fee",
        amount: "Confirm with the relevant fisheries office",
      },
    ],
    contact: {
      department: "Department of Fisheries and Aquatic Resources",
      address: "New Secretariat, Maligawatta, Colombo 10, Sri Lanka",
      phone: "+94 11 244 6183",
      email: "info@fisheries.gov.lk",
    },
    relatedServices: [
      "fishing-licence",
      "vessel-registration",
      "registration-renewal",
    ],
    lastUpdated: "July 2026",
  },
  {
    slug: "licence-renewal",
    title: "Licence Renewal",
    shortTitle: "Licence Renewal",
    description:
      "Renew an existing fisheries or aquaculture licence before it expires.",
    summary:
      "Licence renewal allows eligible licence holders to continue approved activities while ensuring that their information, documents and compliance status remain current.",
    category: "Renewal",
    audience: ["Citizens", "Businesses", "Fishers", "Aquaculture Operators"],
    icon: RefreshCcw,
    processingTime: "Subject to renewal assessment",
    validityPeriod: "Based on the renewed licence",
    applicationMethod:
      "Submit the renewal application before the current licence expires",
    formUrl: "/resources?category=forms",
    requirements: [
      {
        title: "Existing valid licence",
        description:
          "The applicant must provide the current or most recent licence information.",
      },
      {
        title: "Updated information",
        description:
          "Any changes to ownership, activity, contact or operational information must be declared.",
      },
      {
        title: "Compliance status",
        description:
          "Outstanding conditions, inspections or payments may need to be resolved.",
      },
    ],
    documents: [
      {
        title: "Completed licence renewal form",
        required: true,
      },
      {
        title: "Copy of current licence",
        required: true,
      },
      {
        title: "Updated identification or business documents",
        required: true,
      },
      {
        title: "Supporting compliance records",
        required: false,
      },
    ],
    steps: [
      {
        step: 1,
        title: "Check the expiry date",
        description:
          "Begin the renewal process before the current licence expires.",
      },
      {
        step: 2,
        title: "Review your information",
        description:
          "Confirm that all personal, business and operational information is current.",
      },
      {
        step: 3,
        title: "Submit the renewal",
        description:
          "Provide the renewal form, existing licence and supporting documents.",
      },
      {
        step: 4,
        title: "Renewal assessment",
        description:
          "The authority will assess compliance, documents and any applicable fees.",
      },
      {
        step: 5,
        title: "Receive the renewed licence",
        description:
          "Approved applicants receive the updated licence and validity details.",
      },
    ],
    fees: [
      {
        label: "Renewal fee",
        amount: "Depends on the licence type",
      },
    ],
    contact: {
      department: "Department of Fisheries and Aquatic Resources",
      address: "New Secretariat, Maligawatta, Colombo 10, Sri Lanka",
      phone: "+94 11 244 6183",
      email: "info@fisheries.gov.lk",
    },
    relatedServices: ["fishing-licence", "aquaculture-licence"],
    lastUpdated: "July 2026",
  },
  {
    slug: "registration-renewal",
    title: "Registration Renewal",
    shortTitle: "Registration Renewal",
    description:
      "Renew or update an existing fisher or fishing vessel registration.",
    summary:
      "Registration renewal keeps official fisher and vessel records accurate and active by verifying current ownership, identity and operational information.",
    category: "Renewal",
    audience: ["Fishers", "Vessel Owners"],
    icon: RefreshCcw,
    processingTime: "Subject to record verification",
    validityPeriod: "Specified on the renewed registration",
    applicationMethod:
      "Submit the renewal request to the relevant fisheries office",
    formUrl: "/resources?category=forms",
    requirements: [
      {
        title: "Existing registration",
        description:
          "The applicant must provide the current or previous registration record.",
      },
      {
        title: "Updated details",
        description:
          "Changes to ownership, address, contact or vessel information must be reported.",
      },
      {
        title: "Required inspections",
        description:
          "Vessel registrations may require an updated inspection.",
      },
    ],
    documents: [
      {
        title: "Completed registration renewal form",
        required: true,
      },
      {
        title: "Current registration certificate",
        required: true,
      },
      {
        title: "Updated identity or ownership documents",
        required: true,
      },
      {
        title: "Inspection documents where applicable",
        required: false,
      },
    ],
    steps: [
      {
        step: 1,
        title: "Review the registration",
        description:
          "Check the expiry date and identify any information that must be updated.",
      },
      {
        step: 2,
        title: "Prepare documents",
        description:
          "Collect the current registration and updated supporting information.",
      },
      {
        step: 3,
        title: "Submit the renewal request",
        description:
          "Submit the completed form to the relevant fisheries office.",
      },
      {
        step: 4,
        title: "Verification or inspection",
        description:
          "Officials may verify the information or inspect the vessel.",
      },
      {
        step: 5,
        title: "Receive renewed registration",
        description:
          "Approved applicants receive an updated registration record.",
      },
    ],
    fees: [
      {
        label: "Registration renewal fee",
        amount: "Confirmed during the renewal process",
      },
    ],
    contact: {
      department: "Department of Fisheries and Aquatic Resources",
      address: "New Secretariat, Maligawatta, Colombo 10, Sri Lanka",
      phone: "+94 11 244 6183",
      email: "info@fisheries.gov.lk",
    },
    relatedServices: ["vessel-registration", "fisher-registration"],
    lastUpdated: "July 2026",
  },
]

export const serviceInformationIcons = {
  processingTime: CalendarClock,
  validityPeriod: FileCheck2,
  applicationMethod: Building2,
  fees: CircleDollarSign,
  forms: FileText,
  department: Landmark,
  address: MapPin,
  phone: Phone,
  email: Mail,
  help: HelpCircle,
}

export function getServiceBySlug(slug: string) {
  return serviceDetails.find((service) => service.slug === slug)
}

export function getRelatedServices(service: ServiceDetail) {
  return service.relatedServices
    .map((slug) => getServiceBySlug(slug))
    .filter((item): item is ServiceDetail => Boolean(item))
}