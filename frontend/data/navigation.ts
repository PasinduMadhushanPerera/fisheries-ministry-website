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
  },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Citizen Services",
        href: "/services/citizen",
      },
      {
        label: "Business Services",
        href: "/services/business",
      },
      {
        label: "Licensing & Permits",
        href: "/services/licensing",
      },
      {
        label: "Registration Services",
        href: "/services/registration",
      },
      {
        label: "Fisheries Development",
        href: "/services/fisheries-development",
      },
      {
        label: "Aquatic Resources",
        href: "/services/aquatic-resources",
      },
      {
        label: "View All Services",
        href: "/services/all",
      },
    ],
  },
  {
    label: "Laws & Policies",
    href: "/laws-and-policies",
  },
  {
    label: "Media Centre",
    href: "/media-centre",
    children: [
      {
        label: "News",
        href: "/news",
      },
      {
        label: "Gallery",
        href: "/gallery",
      },
      {
        label: "Videos",
        href: "/videos",
      },
      {
        label: "Press Releases",
        href: "/press-releases",
      },
      {
        label: "Notices",
        href: "/notices",
      },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      {
        label: "Documents & Downloads",
        href: "/resources/documents",
      },
      {
        label: "Publications",
        href: "/resources/publications",
      },
      {
        label: "Annual Reports",
        href: "/resources/annual-reports",
      },
      {
        label: "Circulars",
        href: "/resources/circulars",
      },
      {
        label: "Forms",
        href: "/resources/forms",
      },
      {
        label: "Tenders",
        href: "/resources/tenders",
      },
    ],
  },
  {
    label: "Projects & Programmes",
    href: "/projects",
  },
  {
    label: "Institutions",
    href: "/institutions",
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
]