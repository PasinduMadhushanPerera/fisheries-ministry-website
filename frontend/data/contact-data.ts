export type ContactOfficer = {
  id: string
  designation: string
  name: string
  telephone: string
  mobile?: string
  fax?: string
  email: string
  location?: string
}

export type DepartmentContact = {
  id: string
  name: string
  description: string
  officersCount: number
  location?: string
  officers: ContactOfficer[]
}

export type ContactFaq = {
  id: string
  question: string
  answer: string
}

export type SocialChannel = {
  id: string
  platform: string
  description: string
  iconName: "Facebook" | "Youtube" | "Linkedin" | "Bell"
  url: string
  buttonLabel: string
}

export const contactHeadquarters = {
  title: "Visit Our Main Office",
  description: "Official Headquarters of the Ministry of Fisheries, Aquatic and Ocean Resources.",
  address: "New Secretariat, Maligawatta, Colombo 10, Sri Lanka",
  telephone: "+94 112 327 060 / +94 112 436 665",
  email: "info@fisheries.gov.lk",
  secretaryEmail: "secretary@fisheries.gov.lk",
  officeHours: "Monday – Friday: 8:30 AM – 4:15 PM (Closed on weekends & Poya Days)",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.660212325883!2d79.8648980749966!3d6.931154593068715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259071d2f5389%3A0x986c02d39d63bae0!2sMinistry%20of%20Fisheries%20and%20Aquatic%20Resources%20Development%20New%20Secretariat%2C%20Maligawatta%2C%20Colombo!5e0!3m2!1sen!2slk!4v1785832315813!5m2!1sen!2slk",
  directionsUrl: "https://maps.google.com/?q=Ministry+of+Fisheries+Maligawatta+Colombo",
}

export const departmentDirectory: DepartmentContact[] = [
  {
    id: "sec-exec",
    name: "Ministry Secretariat & Executive Office",
    description: "Policy direction, executive management, and secretarial administration.",
    officersCount: 2,
    location: "4th Floor, Main Building",
    officers: [
      {
        id: "sec-01",
        designation: "Secretary to the Ministry",
        name: "Mr. B.K. Kolitha Kamal Jinadasa (PhD)",
        telephone: "+94 112 327 060",
        fax: "+94 112 541 184",
        email: "secretary[at]fisheries.gov.lk",
        location: "4th Floor, Room 401",
      },
      {
        id: "sec-02",
        designation: "Additional Secretary (Admin & HR)",
        name: "Mrs. N. A. A. P. S. Nissanka",
        telephone: "+94 112 436 665",
        fax: "+94 112 320 140",
        email: "asstsecfisheries[at]yahoo.com",
        location: "4th Floor, Room 405",
      },
    ],
  },
  {
    id: "admin-hr",
    name: "Administration & Human Resources Division",
    description: "General administration, cadre management, foreign training, and staff welfare.",
    officersCount: 2,
    location: "3rd Floor, Main Building",
    officers: [
      {
        id: "admin-01",
        designation: "Director (Administration)",
        name: "Mr. H. M. P. Senarathne",
        telephone: "+94 112 446 183",
        mobile: "+94 714 289 101",
        email: "diradmin[at]fisheries.gov.lk",
        location: "3rd Floor, Room 302",
      },
      {
        id: "admin-02",
        designation: "Assistant Director (HRD)",
        name: "Ms. K. G. Perera",
        telephone: "+94 112 446 185",
        email: "hrd[at]fisheries.gov.lk",
        location: "3rd Floor, Room 304",
      },
    ],
  },
  {
    id: "fisheries-dev",
    name: "Fisheries & Aquatic Resources Development Division",
    description: "Marine capture fisheries policy, harbor operations, and fleet development.",
    officersCount: 2,
    location: "2nd Floor, Main Building",
    officers: [
      {
        id: "fish-01",
        designation: "Director Development (Fisheries)",
        name: "Mr. M. S. M. Fernando",
        telephone: "+94 112 423 781",
        email: "dirdev[at]fisheries.gov.lk",
        location: "2nd Floor, Room 201",
      },
      {
        id: "fish-02",
        designation: "Senior Fisheries Development Officer",
        name: "Mr. W. A. Silva",
        telephone: "+94 112 423 784",
        mobile: "+94 773 112 490",
        email: "devops[at]fisheries.gov.lk",
        location: "2nd Floor, Room 206",
      },
    ],
  },
  {
    id: "ocean-resources",
    name: "Ocean Resources & Coastal Conservation Division",
    description: "Exclusive Economic Zone (EEZ) management, marine spatial planning, and conservation.",
    officersCount: 2,
    location: "2nd Floor, Annex",
    officers: [
      {
        id: "ocean-01",
        designation: "Director (Ocean Resources)",
        name: "Dr. S. K. Wickramasinghe",
        telephone: "+94 112 331 405",
        email: "dirocean[at]fisheries.gov.lk",
        location: "2nd Floor Annex, Room A201",
      },
      {
        id: "ocean-02",
        designation: "Coastal Conservation Coordinator",
        name: "Mrs. T. D. Jayasuriya",
        telephone: "+94 112 331 408",
        email: "coastal[at]fisheries.gov.lk",
        location: "2nd Floor Annex, Room A204",
      },
    ],
  },
  {
    id: "finance-accounts",
    name: "Finance & Accounts Division",
    description: "Financial management, budget allocations, payments, and financial auditing.",
    officersCount: 2,
    location: "1st Floor, Main Building",
    officers: [
      {
        id: "fin-01",
        designation: "Chief Accountant",
        name: "Mr. R. M. N. Bandara",
        telephone: "+94 112 437 201",
        fax: "+94 112 437 205",
        email: "ca[at]fisheries.gov.lk",
        location: "1st Floor, Room 101",
      },
      {
        id: "fin-02",
        designation: "Senior Accountant (Payments)",
        name: "Mrs. G. H. De Silva",
        telephone: "+94 112 437 203",
        email: "payments[at]fisheries.gov.lk",
        location: "1st Floor, Room 104",
      },
    ],
  },
  {
    id: "dfar-dept",
    name: "Department of Fisheries & Aquatic Resources (DFAR)",
    description: "Vessel registration, fishing licensing, monitoring, control, and surveillance (MCS).",
    officersCount: 2,
    location: "Fisheries Department Building, Maligawatta",
    officers: [
      {
        id: "dfar-01",
        designation: "Director General (DFAR)",
        name: "Mr. S. J. Kahawatta",
        telephone: "+94 112 449 170",
        fax: "+94 112 449 171",
        email: "dg[at]fisheries.dept.gov.lk",
        location: "DFAR Head Office, 1st Floor",
      },
      {
        id: "dfar-02",
        designation: "Director (Licensing & Registration)",
        name: "Mr. K. A. L. Peiris",
        telephone: "+94 112 449 175",
        email: "licensing[at]fisheries.dept.gov.lk",
        location: "DFAR Head Office, 2nd Floor",
      },
    ],
  },
]

export const contactFaqs: ContactFaq[] = [
  {
    id: "faq-01",
    question: "How do I contact the correct department?",
    answer:
      "Browse our Department Directory above to find direct phone numbers, extension details, and officer emails for each division.",
  },
  {
    id: "faq-02",
    question: "How do I apply for a fisheries licence?",
    answer:
      "Fisheries licenses are issued by DFAR. Visit our Online Services section or contact the DFAR Licensing & Registration desk at +94 112 449 175.",
  },
  {
    id: "faq-03",
    question: "Where can I download official forms?",
    answer:
      "Official application forms, circulars, and RTI documents can be downloaded directly from our Downloads Portal.",
  },
  {
    id: "faq-04",
    question: "Can I submit complaints online?",
    answer:
      "Yes, you can submit official public inquiries or feedback using the Contact Form on this page or email info[at]fisheries.gov.lk.",
  },
  {
    id: "faq-05",
    question: "What are the official office hours?",
    answer:
      "Our main office is open Monday through Friday from 8:30 AM to 4:15 PM. Public counter services operate until 3:30 PM.",
  },
  {
    id: "faq-06",
    question: "How long does it take to receive a response?",
    answer:
      "General inquiries submitted online receive an automated receipt and a formal response within 3 to 5 working days.",
  },
]

export const socialChannels: SocialChannel[] = [
  {
    id: "soc-facebook",
    platform: "Facebook",
    description: "Follow for daily announcements & news.",
    iconName: "Facebook",
    url: "https://web.facebook.com/fisheries.gov.lk/",
    buttonLabel: "Visit Page",
  },
  {
    id: "soc-youtube",
    platform: "YouTube",
    description: "Watch official videos & documentaries.",
    iconName: "Youtube",
    url: "https://www.youtube.com/@Ministry_of_Fisheries_SL",
    buttonLabel: "Watch Channel",
  },
  {
    id: "soc-linkedin",
    platform: "LinkedIn",
    description: "Professional updates & career notices.",
    iconName: "Linkedin",
    url: "https://www.linkedin.com/company/ministry-of-fisheries-and-ocean-resources/",
    buttonLabel: "Follow Profile",
  },
  {
    id: "soc-notices",
    platform: "Public Notices",
    description: "Read gazettes, tenders & notices.",
    iconName: "Bell",
    url: "/media-centre/notices",
    buttonLabel: "View Notices",
  },
]
