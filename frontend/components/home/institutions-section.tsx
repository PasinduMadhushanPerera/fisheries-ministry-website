"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Anchor,
  Building2,
  Fish,
  ShieldCheck,
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
  fallbackIcon: React.ElementType
}

const institutions: InstitutionItem[] = [
  {
    title: "Department of Fisheries & Aquatic Resources",
    acronym: "DFAR",
    description:
      "Responsible for fisheries management, vessel registration, licensing, and marine enforcement across Sri Lanka.",
    image: "/images/institutions/dfar.jpg",
    alt: "Department of Fisheries and Aquatic Resources headquarters",
    href: "/institutions",
    fallbackIcon: Anchor,
  },
  {
    title: "National Aquatic Resources Research Agency",
    acronym: "NARA",
    description:
      "Conducts scientific research in oceanography, marine biology, fisheries management, and aquatic environment.",
    image: "/images/institutions/nara.jpg",
    alt: "NARA oceanographic marine research vessel and laboratory",
    href: "/institutions",
    fallbackIcon: Building2,
  },
  {
    title: "National Aquaculture Development Authority",
    acronym: "NAQDA",
    description:
      "Drives sustainable inland fisheries, commercial shrimp farming, seed production, and freshwater aquaculture.",
    image: "/images/institutions/naqda.jpg",
    alt: "NAQDA freshwater aquaculture fish farming facility",
    href: "/institutions",
    fallbackIcon: Fish,
  },
  {
    title: "Ceylon Fishery Harbours Corporation",
    acronym: "CFHC",
    description:
      "Constructs, manages, and operates fishery harbours, anchorage facilities, and maritime safety infrastructure.",
    image: "/images/institutions/cfhc.jpg",
    alt: "CFHC commercial fishery harbour and anchorage",
    href: "/institutions",
    fallbackIcon: ShieldCheck,
  },
]

export function InstitutionsSection() {
  return (
    <section
      id="institutions"
      aria-labelledby="institutions-heading"
      className="py-16 bg-slate-50 border-b border-slate-200"
    >
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#256B29]">
              Government Network
            </p>
            <h2
              id="institutions-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            >
              Ministry institutions and service organisations
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="max-w-md text-sm text-slate-600 hidden lg:block">
              Access departments, research authorities and public corporations supporting Sri Lanka’s aquatic sector.
            </p>
            <LinkButton
              href="/institutions"
              variant="outline"
              className="border-slate-300 bg-white hover:border-[#388E3C] hover:bg-emerald-50 shrink-0"
            >
              <span>View all institutions</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </LinkButton>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {institutions.map((item) => (
            <InstitutionCardComponent key={item.acronym} item={item} />
          ))}
        </div>
      </Container>
    </section>
  )
}

function InstitutionCardComponent({ item }: { item: InstitutionItem }) {
  const [imageError, setImageError] = useState(false)
  const FallbackIcon = item.fallbackIcon

  return (
    <article className="group flex flex-col h-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      {/* Top Image Area with Next.js Image & Hover Zoom */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 shrink-0">
        {!imageError ? (
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-emerald-50 text-[#388E3C]">
            <FallbackIcon className="h-12 w-12 stroke-[1.5]" aria-hidden="true" />
          </div>
        )}

        {/* Abbreviation Badge overlay */}
        <span className="absolute left-3.5 top-3.5 rounded-full bg-slate-900/90 text-white px-3 py-1 text-xs font-bold shadow-xs backdrop-blur-xs">
          {item.acronym}
        </span>
      </div>

      {/* Card Content Body */}
      <div className="flex flex-col flex-1 p-6 justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug group-hover:text-[#256B29] transition-colors">
            {item.title}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-slate-600 line-clamp-3">
            {item.description}
          </p>
        </div>

        {/* Visit Institution Button */}
        <div className="mt-6 pt-2">
          <Link
            href={item.href}
            aria-label={`Visit ${item.title}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#388E3C] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#256B29] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
          >
            <span>Visit institution</span>
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}