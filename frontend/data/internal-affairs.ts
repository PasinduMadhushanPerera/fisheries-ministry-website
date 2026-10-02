export type CustomContactLine = {
  id: number | string
  label: string
  value: string
  icon_type?: string
  link_type?: string
  linkUrl?: string
  order?: number
}

export type InternalAffairsOfficer = {
  id: string
  name: string
  designation: string
  roleBadge: string
  phone?: string
  phoneLabel?: string
  mobileWhatsapp?: string
  mobileLabel?: string
  email?: string
  emailLabel?: string
  officeAddress?: string
  photo: string
  customContactLines?: CustomContactLine[]
}

export type ImportantInfoCard = {
  id: string
  title: string
  description: string
  iconName: "Lock" | "Clock" | "Calendar" | "Award"
}

export type InternalAffairsFaq = {
  id: string
  question: string
  answer: string
}

export const internalAffairsOfficers: InternalAffairsOfficer[] = [
  {
    id: "senior-assistant-secretary",
    name: "Mrs. Priyanka Kodithuwakku",
    designation: "Senior Assistant Secretary",
    roleBadge: "Internal Affairs Lead",
    phone: "+94 11 244 6183",
    phoneLabel: "Telephone",
    mobileWhatsapp: "+94 71 442 8434",
    mobileLabel: "Mobile / WhatsApp",
    email: "iau@fisheries.gov.lk",
    emailLabel: "Email",
    officeAddress: "Ministry of Fisheries, Aquatic and Ocean Resources, New Secretariat, Maligawatta, Colombo 10",
    photo: "/images/leadership/Senior Assistant Secretary.jpg",
    customContactLines: [
      {
        id: 1,
        label: "IAU WhatsApp",
        value: "+94 707 786 181",
        icon_type: "whatsapp",
        linkUrl: "https://wa.me/94707786181",
      },
      {
        id: 2,
        label: "IAU E-mail",
        value: "iau[at]fisheries.gov.lk",
        icon_type: "email",
        linkUrl: "mailto:iau@fisheries.gov.lk",
      },
    ],
  },
  {
    id: "director-development",
    name: "Mrs. Y.I.D. Gunawardhana",
    designation: "Director (Development)",
    roleBadge: "Development Oversight",
    phone: "+94 11 244 1537",
    phoneLabel: "Telephone",
    mobileWhatsapp: "+94 77 692 7738",
    mobileLabel: "Mobile / WhatsApp",
    email: "gyasintha@yahoo.com",
    emailLabel: "Email",
    officeAddress: "Ministry of Fisheries, Aquatic and Ocean Resources, New Secretariat, Maligawatta, Colombo 10",
    photo: "/images/leadership/Director (Development).jpg",
    customContactLines: [],
  },
]

export const importantInfoCards: ImportantInfoCard[] = [
  {
    id: "confidential-complaints",
    title: "Confidential Complaints",
    description:
      "All public complaints, identity disclosures and evidence submissions are strictly protected under Sri Lanka public service whistleblower protocols.",
    iconName: "Lock",
  },
  {
    id: "response-time",
    title: "Response & Resolution Time",
    description:
      "Complaints receive an official tracking receipt within 3 working days. Standard investigations are completed within 14 to 21 working days.",
    iconName: "Clock",
  },
  {
    id: "working-hours",
    title: "Official Working Hours",
    description:
      "Public inquiry desk operates Monday through Friday from 8:30 AM to 4:15 PM, excluding gazetted public holidays.",
    iconName: "Calendar",
  },
  {
    id: "service-standards",
    title: "Public Service Standards",
    description:
      "Strict compliance with government anti-corruption frameworks, administrative transparency codes and Citizen Charter benchmarks.",
    iconName: "Award",
  },
]

export const internalAffairsFaqs: InternalAffairsFaq[] = [
  {
    id: "how-to-submit",
    question: "How do I submit a complaint to the Internal Affairs Unit?",
    answer:
      "You can submit complaints directly using our online Complaint Portal on this page, by sending an official email to iau@fisheries.gov.lk, calling our helpline (+94 11 244 6183), or visiting the 4th Floor Complaints Desk at the Ministry Secretariat in Colombo 10.",
  },
  {
    id: "confidentiality",
    question: "Can complaints remain strictly confidential?",
    answer:
      "Yes. The Internal Affairs Unit maintains maximum confidentiality. Your identity details and contact information are protected and disclosed solely to authorized investigating officers under Sri Lankan administrative laws.",
  },
  {
    id: "investigation-duration",
    question: "How long does an official investigation take?",
    answer:
      "Initial acknowledgment receipts are issued within 3 working days. Preliminary reviews are conducted within 7 working days, and comprehensive investigation reports are completed within 14 to 21 working days depending on evidence complexity.",
  },
  {
    id: "anonymous-reporting",
    question: "Can I report a complaint anonymously?",
    answer:
      "Yes, anonymous complaints are accepted provided sufficient specific details, dates, and evidence are supplied. However, providing contact information allows the unit to update you on progress and request clarifications if needed.",
  },
  {
    id: "who-can-contact",
    question: "Who can contact the Internal Affairs Unit?",
    answer:
      "Any Sri Lankan citizen, artisanal fisher, commercial vessel owner, aquaculture farmer, departmental officer, or public service stakeholder can contact the unit regarding Ministry services, officer conduct, or administrative grievances.",
  },
]
