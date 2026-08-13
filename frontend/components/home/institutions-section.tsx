"use client"

import Link from "next/link"
import {
  Anchor,
  Building2,
  ExternalLink,
  Fish,
  Globe,
  Ship,
  Sparkles,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { ApiInstitutionsSection } from "@/lib/api/home"

type InstitutionItem = {
  title: string
  acronym: string
  description: string
  image: string
  alt: string
  href: string
  isExternal: boolean
  fallbackIcon: React.ElementType
}

const defaultInstitutions: InstitutionItem[] = [
  {
    title: "Department of Fisheries & Aquatic Resources",
    acronym: "DFAR",
    description:
      "Responsible for fisheries management, vessel registration, licensing, and marine enforcement across Sri Lanka.",
    image: "/images/institutions/dfar.jpg",
    alt: "Department of Fisheries and Aquatic Resources Logo",
    href: "https://fisheriesdept.gov.lk/",
    isExternal: true,
    fallbackIcon: Anchor,
  },
  {
    title: "National Aquatic Resources Research Agency",
    acronym: "NARA",
    description:
      "Conducts scientific research in oceanography, marine biology, fisheries management, and aquatic environment.",
    image: "/images/institutions/nara.jpg",
    alt: "National Aquatic Resources Research Agency Logo",
    href: "http://www.nara.ac.lk/",
    isExternal: true,
    fallbackIcon: Globe,
  },
  {
    title: "National Aquaculture Development Authority",
    acronym: "NAQDA",
    description:
      "Drives sustainable inland fisheries, commercial shrimp farming, seed production, and freshwater aquaculture.",
    image: "/images/institutions/naqda.jpg",
    alt: "National Aquaculture Development Authority Logo",
    href: "https://naqda.gov.lk/",
    isExternal: true,
    fallbackIcon: Fish,
  },
  {
    title: "Ceylon Fishery Harbours Corporation",
    acronym: "CFHC",
    description:
      "Constructs, manages, and operates fishery harbours, anchorage facilities, and maritime safety infrastructure.",
    image: "/images/institutions/cfhc.jpg",
    alt: "Ceylon Fishery Harbours Corporation Logo",
    href: "https://cfhc.gov.lk/",
    isExternal: true,
    fallbackIcon: Anchor,
  },
  {
    title: "Ceylon Fisheries Corporation",
    acronym: "CFC",
    description:
      "Manages commercial fish purchasing, cold storage facilities, fish processing, and islandwide distribution.",
    image: "/images/institutions/cfc.jpg",
    alt: "Ceylon Fisheries Corporation Logo",
    href: "https://cfc.gov.lk/",
    isExternal: true,
    fallbackIcon: Fish,
  },
  {
    title: "CEY-NOR FOUNDATION LTD",
    acronym: "CNFL",
    description:
      "Specializes in fiberglass boat manufacturing, marine vessel construction, and modern fishing gear technology.",
    image: "/images/institutions/cnfl.jpg",
    alt: "CEY-NOR Foundation Ltd Logo",
    href: "https://www.ceynor.gov.lk/",
    isExternal: true,
    fallbackIcon: Ship,
  },
  {
    title: "North Sea Ltd",
    acronym: "NSL",
    description:
      "Operates state-of-the-art fishing net manufacturing plants supplying high-quality netting products to local fishers.",
    image: "/images/institutions/nsl.jpg",
    alt: "North Sea Ltd Logo",
    href: "https://northsea.lk/",
    isExternal: true,
    fallbackIcon: Anchor,
  },
  {
    title: "Other Sector Organisations",
    acronym: "OTHER",
    description:
      "Explore statutory boards, provincial fisheries bodies, and partner institutions under Ministry jurisdiction.",
    image: "/images/institutions/other.jpg",
    alt: "Other Ministry Institutions and Affiliates",
    href: "/institutions",
    isExternal: false,
    fallbackIcon: Globe,
  },
]

export function InstitutionsSection({ initialSection }: { initialSection?: ApiInstitutionsSection }) {
  const badgeText = initialSection?.badge_text || "Government Network"
  const sectionTitle = initialSection?.section_title || "Ministry institutions and service organisations"
  const sectionDescription =
    initialSection?.section_description ||
    "Explore the official departments, corporations, research authorities and statutory bodies operating under the Ministry of Fisheries."

  const institutions: InstitutionItem[] =
    initialSection?.cards && initialSection.cards.length > 0
      ? initialSection.cards.map((c) => ({
          title: c.title,
          acronym: c.acronym,
          description: c.description,
          image: c.image_url || "/images/institutions/dfar.jpg",
          alt: c.image_alt || `${c.title} Logo`,
          href: c.url,
          isExternal: c.is_external,
          fallbackIcon: Building2,
        }))
      : defaultInstitutions

  return (
    <section
      id="institutions"
      aria-labelledby="institutions-heading"
      className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200"
    >
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-[#256B29] flex items-center gap-1.5 mb-1">
              <Sparkles className="h-4 w-4 text-[#256B29]" />
              <span>{badgeText}</span>
            </p>
            <h2
              id="institutions-heading"
              className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
            >
              {sectionTitle}
            </h2>
          </div>
          <p className="max-w-xl text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
            {sectionDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {institutions.map((item) => {
            return (
              <article
                key={item.acronym}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#256B29] hover:shadow-xl"
              >
                <div>
                  {/* Top Bar: Acronym & Badge */}
                  <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-4">
                    <span className="text-xs font-extrabold tracking-wider text-[#256B29] bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                      {item.acronym}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      Official Body
                    </span>
                  </div>

                  {/* Clickable Image Banner */}
                  {item.isExternal ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${item.title} official website`}
                      className="relative block h-36 w-full overflow-hidden rounded-2xl bg-white border border-slate-100 p-2 mb-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                    >
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="h-full w-full object-contain p-1 transition-transform duration-500 group-hover:scale-105"
                      />
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      aria-label={`View ${item.title}`}
                      className="relative block h-36 w-full overflow-hidden rounded-2xl bg-white border border-slate-100 p-2 mb-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                    >
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="h-full w-full object-contain p-1 transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                  )}

                  {/* Title */}
                  <h3 className="text-base font-extrabold text-slate-950 transition-colors group-hover:text-[#256B29] leading-snug">
                    {item.isExternal ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-visible:outline-none"
                      >
                        {item.title}
                      </a>
                    ) : (
                      <Link href={item.href} className="focus-visible:outline-none">
                        {item.title}
                      </Link>
                    )}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 text-xs leading-relaxed text-slate-600 text-justify font-normal line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action CTA Button */}
                <div className="mt-6 pt-3 border-t border-slate-100">
                  {item.isExternal ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#256B29] px-4 py-2.5 text-xs font-extrabold !text-white shadow-2xs transition-colors hover:bg-[#1b4d1d] group/btn"
                    >
                      <span>Visit Website</span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 group-hover/btn:translate-x-0.5 transition-transform" aria-hidden="true" />
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#256B29] px-4 py-2.5 text-xs font-extrabold !text-white shadow-2xs transition-colors hover:bg-[#1b4d1d] group/btn"
                    >
                      <span>View Directory</span>
                      <Building2 className="h-3.5 w-3.5 shrink-0 group-hover/btn:translate-x-0.5 transition-transform" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}