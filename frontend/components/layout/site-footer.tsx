import {
  ExternalLink,
  Mail,
  MapPin,
  Phone,
} from "lucide-react"
import Link from "next/link"

import { Container } from "@/components/ui/container"

import { BackToTop } from "./back-to-top"

const serviceLinks = [
  { label: "All services", href: "/services" },
  {
    label: "Fishing vessel registration",
    href: "/services/fishing-vessel-registration",
  },
  {
    label: "Fishing licence services",
    href: "/services/fishing-licences",
  },
  {
    label: "Forms and downloads",
    href: "/documents",
  },
]

const informationLinks = [
  { label: "About the Ministry", href: "/about" },
  { label: "News and notices", href: "/media-centre" },
  {
    label: "Projects and programmes",
    href: "/projects",
  },
  {
    label: "Laws and policies",
    href: "/laws-and-policies",
  },
]

const supportLinks = [
  { label: "Contact us", href: "/contact" },
  {
    label: "Frequently asked questions",
    href: "/frequently-asked-questions",
  },
  {
    label: "Accessibility statement",
    href: "/accessibility",
  },
  {
    label: "Sitemap",
    href: "/sitemap",
  },
]

export function SiteFooter() {
  return (
    <>
      <footer className="bg-[#071b18] text-white">
        <div className="border-b border-white/10">
          <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-green-300">
                Government of Sri Lanka
              </p>

              <h2 className="mt-3 text-xl font-bold leading-snug">
                Ministry of Fisheries, Aquatic and Ocean Resources
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-300">
                Providing public information, services and institutional access
                for Sri Lanka&apos;s fisheries and aquatic resources sector.
              </p>

              <a
                href="https://www.gov.lk/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-md font-bold text-green-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
              >
                Visit Gov.lk

                <ExternalLink
                  aria-hidden="true"
                  className="h-4 w-4"
                />

                <span className="visually-hidden">
                  opens in a new tab
                </span>
              </a>
            </div>

            <FooterColumn
              title="Services"
              links={serviceLinks}
            />

            <FooterColumn
              title="Information"
              links={informationLinks}
            />

            <div>
              <h2 className="text-base font-bold">
                Contact and support
              </h2>

              <div className="mt-5 grid gap-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin
                    aria-hidden="true"
                    className="mt-1 h-4 w-4 shrink-0 text-green-300"
                  />

                  <span>
                    Official Ministry address will be displayed here after
                    confirmation.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <Phone
                    aria-hidden="true"
                    className="mt-1 h-4 w-4 shrink-0 text-green-300"
                  />

                  <span>
                    Official telephone number
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <Mail
                    aria-hidden="true"
                    className="mt-1 h-4 w-4 shrink-0 text-green-300"
                  />

                  <span>
                    Official Ministry email
                  </span>
                </div>
              </div>

              <nav
                aria-label="Footer support links"
                className="mt-6"
              >
                <ul className="grid gap-2">
                  {supportLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-10 items-center rounded-sm text-sm font-medium text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </Container>
        </div>

        <Container className="flex flex-col gap-4 py-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Ministry of Fisheries, Aquatic and
            Ocean Resources. All rights reserved.
          </p>

          <nav aria-label="Legal links">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="rounded-sm transition hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
                >
                  Privacy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms-of-use"
                  className="rounded-sm transition hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
                >
                  Terms of use
                </Link>
              </li>

              <li>
                <Link
                  href="/accessibility"
                  className="rounded-sm transition hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
                >
                  Accessibility
                </Link>
              </li>
            </ul>
          </nav>
        </Container>
      </footer>

      <BackToTop />
    </>
  )
}

type FooterColumnProps = {
  title: string
  links: {
    label: string
    href: string
  }[]
}

function FooterColumn({
  title,
  links,
}: FooterColumnProps) {
  return (
    <nav aria-label={`${title} footer links`}>
      <h2 className="text-base font-bold">
        {title}
      </h2>

      <ul className="mt-5 grid gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex min-h-10 items-center rounded-sm text-sm font-medium text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}