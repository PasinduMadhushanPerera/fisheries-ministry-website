"use client"

import Link from "next/link"
import {
  Anchor,
  Building2,
  ExternalLink,
  Fish,
  Globe,
  Ship,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import { LinkButton } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

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

const institutions: InstitutionItem[] = [
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
    fallbackIcon: Building2,
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
    fallbackIcon: ShieldCheck,
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

export function InstitutionsSection() {
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
              <span>Government Network</span>
            </p>
            <h2
              id="institutions-heading"
              className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
            >
              Ministry institutions and service organisations
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="max-w-md text-xs sm:text-sm text-slate-600 hidden lg:block leading-relaxed">
              Access departments, research authorities and public corporations supporting Sri Lanka’s aquatic sector.
            </p>
            <LinkButton
              href="/institutions"
              variant="outline"
              className="border-slate-300 bg-white hover:border-[#388E3C] hover:bg-emerald-50 shrink-0 text-xs font-extrabold"
            >
              <span>View all institutions</span>
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
            </LinkButton>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
          {institutions.map((item) => (
            <InstitutionCardComponent key={item.acronym} item={item} />
          ))}
        </div>
      </Container>
    </section>
  )
}

function InstitutionCardComponent({ item }: { item: InstitutionItem }) {
  const CardLinkWrapper = ({ children }: { children: React.ReactNode }) =>
    item.isExternal ? (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit official website of ${item.title}`}
        className="focus-visible:outline-none"
      >
        {children}
      </a>
    ) : (
      <Link
        href={item.href}
        aria-label={`View ${item.title} directory`}
        className="focus-visible:outline-none"
      >
        {children}
      </Link>
    )

  return (
    <article className="group flex flex-col justify-between h-full bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:border-[#256B29] hover:-translate-y-1 transition-all duration-300 p-5 sm:p-6">
      <div>
        {/* Direct Static Image Rendering Stage Header */}
        <CardLinkWrapper>
          <div className="relative h-32 w-full overflow-hidden rounded-2xl bg-white border border-slate-100 p-3 flex items-center justify-center shadow-xs transition-colors group-hover:border-emerald-200">
            {/* Direct Static Image Tag to Guarantee 100% Rendering without Image Optimization Errors */}
            <img
              src={item.image}
              alt={item.alt}
              className="h-full w-full object-contain p-1 transition-transform duration-500 group-hover:scale-105"
            />

            {/* Acronym Badge Overlay */}
            <span className="absolute left-3 top-3 rounded-lg bg-[#256B29] text-white px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide shadow-xs">
              {item.acronym}
            </span>
          </div>
        </CardLinkWrapper>

        {/* Institution Title & Description */}
        <div className="mt-4">
          <h3 className="text-base sm:text-lg font-extrabold text-slate-950 tracking-tight leading-snug group-hover:text-[#256B29] transition-colors">
            <CardLinkWrapper>{item.title}</CardLinkWrapper>
          </h3>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed text-justify line-clamp-3">
            {item.description}
          </p>
        </div>
      </div>

      {/* External / Internal CTA Button */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        {item.isExternal ? (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit official website of ${item.title}`}
            className="inline-flex w-full min-h-10 items-center justify-center gap-2 rounded-xl bg-[#37923c] px-4 text-xs font-extrabold !text-white shadow-xs transition-colors hover:bg-[#1b4d1d] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
          >
            <span>Visit website</span>
            <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          </a>
        ) : (
          <Link
            href={item.href}
            aria-label={`View directory for ${item.title}`}
            className="inline-flex w-full min-h-10 items-center justify-center gap-2 rounded-xl bg-[#37923c] px-4 text-xs font-extrabold !text-white shadow-xs transition-colors hover:bg-[#1b4d1d] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
          >
            <span>Explore directory</span>
            <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  )
}