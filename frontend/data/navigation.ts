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
        label: "Services for Citizens",
        href: "/services/citizens",
      },
      {
        label: "Services for Businesses",
        href: "/services/businesses",
      },
      {
        label: "Licences & Registrations",
        href: "/services/licences-and-registrations",
      },
      // {
      //   label: "All Services",
      //   href: "/services/registration",
      // },
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
        href: " /media-centre/news",
      },
      {
        label: "Gallery",
        href: "/media-centre/gallery",
      },
      {
        label: "Videos",
        href: "/media-centre/videos",
      },
      {
        label: "Press Releases",
        href: "/media-centre/press-releases",
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