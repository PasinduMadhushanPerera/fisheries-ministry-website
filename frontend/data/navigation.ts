export type NavigationItem = {
  label: string
  href: string
  children?: NavigationItem[]
}

export const mainNavigation: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/about",
    children: [
      {
        label: "Overview",
        href: "/about/overview",
      },
      {
        label: "Hon. Minister",
        href: "/about/minister",
      },
      {
        label: "Hon. Deputy Minister",
        href: "/about/deputy-minister",
      },
      {
        label: "Secretary",
        href: "/about/secretary",
      },
      {
        label: "Divisions",
        href: "/about/divisions",
      },
      {
        label: "Organization Structure",
        href: "/about/organization-structure",
      },
    ],
  },
  {
    label: "Opportunities & Portals",
    href: "/#popular-services",
    children: [
      {
        label: "Local Fisheries Training",
        href: "/local-training",
      },
      {
        label: "Foreign Training & Fellowships",
        href: "/foreign-training",
      },
      {
        label: "Procurement & Tenders Portal",
        href: "/procurement",
      },
      {
        label: "Recruitment & Vacancies Portal",
        href: "/recruitment",
      },
    ],
  },
  {
    label: "Media Centre",
    href: "/media-centre",
    children: [
      {
        label: "News",
        href: "/media-centre/news",
      },
      {
        label: "Notices",
        href: "/media-centre/notices",
      },
      {
        label: "Press Releases",
        href: "/media-centre/press-releases",
      },
      {
        label: "Events",
        href: "/media-centre/events",
      },
      {
        label: "Photo Gallery",
        href: "/media-centre/gallery",
      },
      {
        label: "Videos",
        href: "/media-centre/videos",
      },
    ],
  },
  {
    label: "Statistics",
    href: "/statistics",
    children: [
      {
        label: "Fisheries at a Glance",
        href: "/statistics/at-a-glance",
      },
      {
        label: "Weekly Fish Prices",
        href: "/statistics/weekly-fish-prices",
      },
      {
        label: "Monthly Fish Production",
        href: "/statistics/monthly-fish-production",
      },
      {
        label: "Annual Statistics Reports",
        href: "/statistics/annual-reports",
      },
      {
        label: "Export and Import",
        href: "/statistics/export-and-import",
      },
      {
        label: "Fishery Related Information",
        href: "/statistics/related-information",
      },
    ],
  },
  {
    label: "RTI",
    href: "/rti",
  },
  {
    label: "Downloads",
    href: "/downloads",
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
]