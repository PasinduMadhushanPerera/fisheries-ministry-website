export const siteConfig = {
  name: "Ministry of Fisheries, Aquatic and Ocean Resources",
  shortName: "Ministry of Fisheries",
  governmentName: "Government of Sri Lanka",

  description:
    "Official website of the Ministry of Fisheries, Aquatic and Ocean Resources, Sri Lanka.",

  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000",

  contact: {
    telephone: "Official telephone number to be verified",
    email: "Official email address to be verified",
    address: "Official Ministry address to be verified",
    officeHours: "Official office hours to be verified",
  },

  languages: [
    {
      code: "en",
      label: "English",
      nativeLabel: "English",
    },
    {
      code: "si",
      label: "Sinhala",
      nativeLabel: "සිංහල",
    },
    {
      code: "ta",
      label: "Tamil",
      nativeLabel: "தமிழ்",
    },
  ],
} as const

export type SiteConfig = typeof siteConfig