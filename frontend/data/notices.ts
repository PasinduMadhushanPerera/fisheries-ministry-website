export type NoticeCategory =
  | "All"
  | "General"
  | "Procurement"
  | "Recruitment"
  | "Licensing"
  | "Fisheries"
  | "Aquaculture"

export type NoticeStatus = "Open" | "Closing Soon" | "Closed"

export type Notice = {
  slug: string
  title: string
  summary: string
  content: string[]
  category: Exclude<NoticeCategory, "All">
  referenceNumber: string
  publishedDate: string
  displayPublishedDate: string
  closingDate?: string
  displayClosingDate?: string
  status: NoticeStatus
  featured: boolean
  location?: string
  department?: string
  documentUrl?: string
  applicationUrl?: string
  contactName?: string
  contactTitle?: string
  contactEmail?: string
  contactPhone?: string
  attachments?: {
    title: string
    url: string
    type: "PDF" | "DOCX" | "XLSX"
  }[]
}

export const noticeCategories: NoticeCategory[] = [
  "All",
  "General",
  "Procurement",
  "Recruitment",
  "Licensing",
  "Fisheries",
  "Aquaculture",
]

export const notices: Notice[] = [
  {
    slug: "registration-renewal-for-fishing-vessels-2026",
    title: "Annual Registration Renewal for Fishing Vessels – 2026",
    summary:
      "Owners and operators of registered fishing vessels are requested to complete their annual registration renewal before the specified closing date.",
    content: [
      "The Department of Fisheries and Aquatic Resources informs all fishing vessel owners and operators that the annual registration renewal process for 2026 is now open.",
      "Applicants must submit the completed renewal application together with the existing vessel registration certificate, proof of ownership, valid identification and any other documents requested by the relevant district fisheries office.",
      "Vessels may be subject to inspection before the renewed registration certificate is issued. Applicants are therefore advised to ensure that vessels comply with applicable safety and operational requirements.",
      "Applications should be submitted to the relevant district fisheries office before the closing date stated in this notice.",
      "Late applications may be subject to additional administrative procedures or penalties in accordance with applicable regulations.",
    ],
    category: "Licensing",
    referenceNumber: "MFAR/N/2026/042",
    publishedDate: "2026-07-22",
    displayPublishedDate: "22 July 2026",
    closingDate: "2026-08-30",
    displayClosingDate: "30 August 2026",
    status: "Open",
    featured: true,
    location: "Island-wide",
    department: "Department of Fisheries and Aquatic Resources",
    documentUrl:
      "/documents/notices/fishing-vessel-registration-renewal-2026.pdf",
    applicationUrl: "/services/licences-and-registrations",
    contactName: "Vessel Registration Division",
    contactTitle: "Department of Fisheries and Aquatic Resources",
    contactEmail: "registration@fisheries.gov.lk",
    contactPhone: "+94 11 244 6183",
    attachments: [
      {
        title: "Official Notice",
        url: "/documents/notices/fishing-vessel-registration-renewal-2026.pdf",
        type: "PDF",
      },
      {
        title: "Registration Renewal Application",
        url: "/documents/forms/vessel-registration-renewal-form.pdf",
        type: "PDF",
      },
    ],
  },
  {
    slug: "procurement-of-safety-equipment-for-fishing-communities",
    title: "Procurement of Safety Equipment for Fishing Communities",
    summary:
      "Sealed bids are invited from eligible suppliers for the supply and delivery of approved safety equipment for coastal fishing communities.",
    content: [
      "The Ministry invites sealed bids from qualified and eligible suppliers for the procurement of safety equipment intended for distribution among selected coastal fishing communities.",
      "The required items include life jackets, emergency communication equipment, first-aid kits and other approved marine safety accessories.",
      "Interested bidders must obtain the complete procurement document and comply with all technical specifications, eligibility requirements and submission instructions.",
      "Completed bids must be delivered to the address stated in the procurement document before the closing time and date.",
      "Late submissions and bids that do not meet the stated requirements will not be considered.",
    ],
    category: "Procurement",
    referenceNumber: "MFAR/PROC/2026/018",
    publishedDate: "2026-07-20",
    displayPublishedDate: "20 July 2026",
    closingDate: "2026-08-12",
    displayClosingDate: "12 August 2026",
    status: "Open",
    featured: false,
    location: "Colombo",
    department: "Procurement Division",
    documentUrl:
      "/documents/notices/procurement-fisher-safety-equipment.pdf",
    contactName: "Chairperson",
    contactTitle: "Ministry Procurement Committee",
    contactEmail: "procurement@fisheries.gov.lk",
    contactPhone: "+94 11 244 6183",
    attachments: [
      {
        title: "Invitation for Bids",
        url: "/documents/notices/procurement-fisher-safety-equipment.pdf",
        type: "PDF",
      },
      {
        title: "Technical Specifications",
        url: "/documents/procurement/fisher-safety-equipment-specifications.pdf",
        type: "PDF",
      },
    ],
  },
  {
    slug: "applications-for-fisheries-inspector-trainees",
    title: "Applications Invited for Fisheries Inspector Trainees",
    summary:
      "Applications are invited from eligible candidates for trainee positions supporting fisheries administration, field inspections and community services.",
    content: [
      "Applications are invited from suitably qualified Sri Lankan citizens for trainee positions within fisheries administration and field-support services.",
      "Selected candidates may assist with vessel inspections, licensing activities, fisheries data collection, community awareness programmes and other assigned responsibilities.",
      "Applicants must satisfy the educational, age and other eligibility requirements stated in the official recruitment notice.",
      "Completed applications must be submitted using the prescribed format together with certified copies of all required documents.",
      "Only shortlisted candidates will be contacted for further assessment or interview.",
    ],
    category: "Recruitment",
    referenceNumber: "MFAR/HR/2026/011",
    publishedDate: "2026-07-18",
    displayPublishedDate: "18 July 2026",
    closingDate: "2026-08-05",
    displayClosingDate: "5 August 2026",
    status: "Closing Soon",
    featured: false,
    location: "Island-wide",
    department: "Human Resources Division",
    documentUrl:
      "/documents/notices/fisheries-inspector-trainee-recruitment.pdf",
    applicationUrl: "/careers",
    contactName: "Director",
    contactTitle: "Human Resources Division",
    contactEmail: "careers@fisheries.gov.lk",
    contactPhone: "+94 11 244 6183",
    attachments: [
      {
        title: "Recruitment Notice",
        url: "/documents/notices/fisheries-inspector-trainee-recruitment.pdf",
        type: "PDF",
      },
      {
        title: "Application Form",
        url: "/documents/forms/fisheries-inspector-trainee-application.pdf",
        type: "PDF",
      },
    ],
  },
  {
    slug: "temporary-restriction-on-fishing-activities",
    title: "Temporary Restriction on Fishing Activities in Selected Waters",
    summary:
      "A temporary restriction will apply to specified fishing activities in selected coastal waters to support marine resource protection and public safety.",
    content: [
      "The Ministry informs fishing communities and vessel operators that a temporary restriction will apply to specified fishing activities within the areas identified in the official notice.",
      "The restriction has been introduced to support marine resource protection, operational safety and coordinated management activities.",
      "Fishers operating in or near the affected areas must follow instructions issued by fisheries officers, maritime authorities and other authorized agencies.",
      "The restriction will remain in effect during the period stated in the official notice unless amended or withdrawn through a further announcement.",
      "Fishing communities are encouraged to contact their nearest fisheries office for clarification regarding affected areas and permitted activities.",
    ],
    category: "Fisheries",
    referenceNumber: "MFAR/N/2026/039",
    publishedDate: "2026-07-15",
    displayPublishedDate: "15 July 2026",
    closingDate: "2026-08-01",
    displayClosingDate: "1 August 2026",
    status: "Closing Soon",
    featured: false,
    location: "Selected Coastal Areas",
    department: "Fisheries Management Division",
    documentUrl:
      "/documents/notices/temporary-fishing-restriction.pdf",
    contactName: "Fisheries Management Division",
    contactTitle: "Department of Fisheries and Aquatic Resources",
    contactEmail: "management@fisheries.gov.lk",
    contactPhone: "+94 11 244 6183",
    attachments: [
      {
        title: "Official Restriction Notice",
        url: "/documents/notices/temporary-fishing-restriction.pdf",
        type: "PDF",
      },
      {
        title: "Affected Area Map",
        url: "/documents/notices/temporary-fishing-restriction-map.pdf",
        type: "PDF",
      },
    ],
  },
  {
    slug: "applications-for-small-scale-aquaculture-support",
    title: "Applications Open for Small-Scale Aquaculture Support Programme",
    summary:
      "Eligible individuals and community organizations may apply for technical and development assistance under the small-scale aquaculture support programme.",
    content: [
      "The Ministry and the National Aquaculture Development Authority invite applications for the Small-Scale Aquaculture Support Programme.",
      "The programme is intended to assist eligible individuals, producer groups and community organizations engaged in responsible aquaculture activities.",
      "Support may include technical guidance, training, basic production inputs and assistance for improving selected aquaculture facilities.",
      "Applicants must meet the eligibility requirements and submit the prescribed application form with supporting documents.",
      "Applications will be evaluated according to programme criteria, available resources and environmental suitability.",
    ],
    category: "Aquaculture",
    referenceNumber: "MFAR/AQ/2026/014",
    publishedDate: "2026-07-10",
    displayPublishedDate: "10 July 2026",
    closingDate: "2026-08-20",
    displayClosingDate: "20 August 2026",
    status: "Open",
    featured: false,
    location: "Selected Districts",
    department: "National Aquaculture Development Authority",
    documentUrl:
      "/documents/notices/small-scale-aquaculture-support-programme.pdf",
    applicationUrl: "/services/businesses",
    contactName: "Programme Coordination Unit",
    contactTitle: "National Aquaculture Development Authority",
    contactEmail: "programmes@naqda.gov.lk",
    contactPhone: "+94 11 278 6495",
    attachments: [
      {
        title: "Programme Notice",
        url: "/documents/notices/small-scale-aquaculture-support-programme.pdf",
        type: "PDF",
      },
      {
        title: "Application Form",
        url: "/documents/forms/aquaculture-support-application.pdf",
        type: "PDF",
      },
    ],
  },
  {
    slug: "public-consultation-on-coastal-fisheries-policy",
    title: "Public Consultation on the Draft Coastal Fisheries Policy",
    summary:
      "Stakeholders are invited to submit written observations and recommendations on the draft coastal fisheries policy.",
    content: [
      "The Ministry invites fishers, industry representatives, researchers, civil society organizations and members of the public to provide comments on the draft Coastal Fisheries Policy.",
      "The consultation aims to gather stakeholder views on sustainable resource use, fishing-community livelihoods, safety, infrastructure and fisheries governance.",
      "Written submissions should clearly identify the relevant policy section and include the name and contact details of the submitting individual or organization.",
      "Submissions may be delivered by post or sent to the official email address stated in this notice.",
      "Comments received after the consultation deadline may not be considered during the current review process.",
    ],
    category: "General",
    referenceNumber: "MFAR/POL/2026/006",
    publishedDate: "2026-06-28",
    displayPublishedDate: "28 June 2026",
    closingDate: "2026-07-25",
    displayClosingDate: "25 July 2026",
    status: "Closed",
    featured: false,
    location: "Colombo",
    department: "Policy and Planning Division",
    documentUrl:
      "/documents/notices/coastal-fisheries-policy-consultation.pdf",
    contactName: "Director",
    contactTitle: "Policy and Planning Division",
    contactEmail: "policy@fisheries.gov.lk",
    contactPhone: "+94 11 244 6183",
    attachments: [
      {
        title: "Consultation Notice",
        url: "/documents/notices/coastal-fisheries-policy-consultation.pdf",
        type: "PDF",
      },
      {
        title: "Draft Coastal Fisheries Policy",
        url: "/documents/policies/draft-coastal-fisheries-policy.pdf",
        type: "PDF",
      },
    ],
  },
]

export function getFeaturedNotice() {
  return notices.find((notice) => notice.featured)
}

export function getNoticeBySlug(slug: string) {
  return notices.find((notice) => notice.slug === slug)
}

export function getRelatedNotices(notice: Notice, limit = 3) {
  const sameCategory = notices.filter(
    (item) =>
      item.slug !== notice.slug &&
      item.category === notice.category,
  )

  const otherNotices = notices.filter(
    (item) =>
      item.slug !== notice.slug &&
      item.category !== notice.category,
  )

  return [...sameCategory, ...otherNotices].slice(0, limit)
}

export function getOpenNotices() {
  return notices.filter((notice) => notice.status !== "Closed")
}