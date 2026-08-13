import {
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

import { Container } from "@/components/ui/container"
import { BackToTop } from "./back-to-top"
import { ApiFooterSetting } from "@/lib/api/header-footer"

const defaultQuickLinks = [
  { label: "Downloads Centre", href: "/downloads" },
  { label: "About the Ministry", href: "/about/overview" },
  { label: "Fisheries Institutions", href: "/institutions" },
]

const defaultMediaLinks = [
  { label: "News & Media Centre", href: "/media-centre" },
  { label: "Public Notices", href: "/media-centre/notices" },
  { label: "Events & Programmes", href: "/media-centre/events" },
  { label: "Fisheries Statistics", href: "/statistics" },
  { label: "Right to Information (RTI)", href: "/rti" },
]

const defaultSupportLinks = [
  { label: "Contact HQ & Directory", href: "/contact" },
  { label: "Frequently Asked Questions", href: "/frequently-asked-questions" },
  { label: "Accessibility Statement", href: "/accessibility" },
]

const defaultLegalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Accessibility Statement", href: "/accessibility" },
]

export function SiteFooter({ initialFooter }: { initialFooter?: ApiFooterSetting }) {
  const governmentBadge = initialFooter?.government_badge || "Government of Sri Lanka"
  const ministryName = initialFooter?.ministry_name || "Ministry of Fisheries, Aquatic and Ocean Resources"
  const aboutText =
    initialFooter?.about_text ||
    "Providing public information, official announcements, downloadable forms, and institutional access for Sri Lanka's fisheries, aquaculture, and ocean resources sector."
  const govPortalLabel = initialFooter?.gov_portal_label || "Visit Sri Lanka Gov.lk"
  const govPortalUrl = initialFooter?.gov_portal_url || "https://www.gov.lk/"
  const hqAddress = initialFooter?.hq_address || "New Secretariat, Maligawatta, Colombo 10, Sri Lanka"
  const telephone = initialFooter?.telephone || "+94 112 327 060"
  const email = initialFooter?.email || "info@fisheries.gov.lk"
  const copyrightText =
    initialFooter?.copyright_text ||
    "Ministry of Fisheries, Aquatic and Ocean Resources. Official Government Website."

  const phoneTel = `tel:${telephone.replace(/[^0-9+]/g, "")}`

  const quickLinks =
    initialFooter?.quick_links && initialFooter.quick_links.length > 0
      ? initialFooter.quick_links.map((l) => ({ label: l.label, href: l.url }))
      : defaultQuickLinks

  const infoLinks =
    initialFooter?.info_links && initialFooter.info_links.length > 0
      ? initialFooter.info_links.map((l) => ({ label: l.label, href: l.url }))
      : defaultMediaLinks

  const supportLinks =
    initialFooter?.support_links && initialFooter.support_links.length > 0
      ? initialFooter.support_links.map((l) => ({ label: l.label, href: l.url }))
      : defaultSupportLinks

  const legalLinks =
    initialFooter?.legal_links && initialFooter.legal_links.length > 0
      ? initialFooter.legal_links.map((l) => ({ label: l.label, href: l.url }))
      : defaultLegalLinks

  return (
    <>
      <footer className="bg-[#071b18] text-white">
        {/* Main Footer Body */}
        <div className="border-b border-white/10">
          <Container className="grid gap-10 py-14 sm:py-16 md:grid-cols-2 lg:grid-cols-4">
            {/* Column 1: Ministry Branding */}
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-emerald-300">
                {governmentBadge}
              </span>

              <h2 className="text-lg font-extrabold leading-snug text-white">
                {ministryName}
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed text-justify">
                {aboutText}
              </p>

              <div className="pt-2">
                <a
                  href={govPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[38px] items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 text-xs font-bold text-emerald-300 transition hover:bg-white hover:text-slate-950"
                >
                  <span>{govPortalLabel}</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links & Downloads */}
            <FooterColumn title="Quick Links" links={quickLinks} />

            {/* Column 3: Media & Statistics */}
            <FooterColumn title="Information & Portals" links={infoLinks} />

            {/* Column 4: Contact & HQ Info */}
            <div className="space-y-4">
              <h2 className="text-base font-extrabold text-white border-b border-white/10 pb-2">
                Contact & Support
              </h2>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                  <span className="leading-relaxed">{hqAddress}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                  <a href={phoneTel} className="hover:text-emerald-300 transition-colors font-medium">
                    {telephone}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                  <a href={`mailto:${email}`} className="hover:text-emerald-300 transition-colors font-medium">
                    {email}
                  </a>
                </div>
              </div>

              <nav aria-label="Footer support links" className="border-t border-white/10 pt-3">
                <ul className="space-y-2">
                  {supportLinks.map((link) => (
                    <li key={link.label + link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 transition hover:text-white"
                      >
                        <ChevronRight className="h-3 w-3 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </Container>
        </div>

        {/* Bottom Copyright & Legal Links Bar */}
        <Container className="flex flex-col gap-4 py-6 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <p>
              © {new Date().getFullYear()} {copyrightText}
            </p>
          </div>

          <nav aria-label="Legal links">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium">
              {legalLinks.map((link) => (
                <li key={link.label + link.href}>
                  <Link href={link.href} className="transition hover:text-emerald-300">
                    {link.label}
                  </Link>
                </li>
              ))}
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

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <nav aria-label={`${title} footer links`} className="space-y-4">
      <h2 className="text-base font-extrabold text-white border-b border-white/10 pb-2">
        {title}
      </h2>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label + link.href}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 transition hover:text-white"
            >
              <ChevronRight className="h-3 w-3 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}