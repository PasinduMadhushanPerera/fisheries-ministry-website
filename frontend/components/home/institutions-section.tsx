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
import { getAbsoluteMediaUrl } from "@/lib/utils"

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
          image: getAbsoluteMediaUrl(c.image_url || "/images/institutions/dfar.jpg"),
          alt: c.image_alt || c.title,
          href: c.url,
          isExternal: Boolean(c.is_external),
          fallbackIcon: Anchor,
        }))
      : defaultInstitutions

  return (
    <section
      id="institutions-section"
      aria-labelledby="institutions-heading"
      className="py-16 sm:py-20 bg-white"
    >
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
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

        {/* Institutions Grid */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {institutions.map((inst) => {
            const FallbackIcon = inst.fallbackIcon
            const CardWrapper = inst.isExternal ? "a" : Link
            const linkProps = inst.isExternal
              ? { href: inst.href, target: "_blank", rel: "noopener noreferrer" }
              : { href: inst.href }

            return (
              <article
                key={inst.acronym}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-2xs transition duration-300 hover:-translate-y-1 hover:border-[#256B29]/40 hover:shadow-xl"
              >
                <div>
                  {/* Top Bar: Acronym & External Icon */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex rounded-lg bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 text-xs font-extrabold text-[#256B29]">
                      {inst.acronym}
                    </span>
                    {inst.isExternal && (
                      <ExternalLink className="h-4 w-4 text-slate-400 transition-colors group-hover:text-[#256B29]" />
                    )}
                  </div>

                  {/* Thumbnail Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-950 flex items-center justify-center p-1.5 mb-4">
                    <img
                      src={inst.image}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover blur-xl opacity-30 scale-110 pointer-events-none"
                    />
                    <img
                      src={inst.image}
                      alt={inst.alt}
                      className="relative z-10 max-h-full w-auto max-w-full object-contain mx-auto rounded-lg shadow-xs transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-extrabold text-slate-900 leading-snug line-clamp-2 transition-colors group-hover:text-[#256B29]">
                    <CardWrapper {...(linkProps as any)}>{inst.title}</CardWrapper>
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3 text-justify">
                    {inst.description}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <CardWrapper
                    {...(linkProps as any)}
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-100 px-4 py-2 text-xs font-extrabold text-slate-700 transition hover:bg-[#256B29] hover:text-white"
                  >
                    <span>Visit Institution</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </CardWrapper>
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}