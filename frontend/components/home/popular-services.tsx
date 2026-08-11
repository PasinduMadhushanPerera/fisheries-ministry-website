"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  GraduationCap,
  Globe,
  ShoppingBag,
  UserPlus,
  Sparkles,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { ApiServicesSection } from "@/lib/api/home"

type ServiceCardItem = {
  id: string
  title: string
  category: string
  description: string
  btnText: string
  href: string
  image: string
  alt: string
  fallbackIcon: React.ElementType
}

const defaultServiceCards: ServiceCardItem[] = [
  {
    id: "local-training",
    title: "Local Fisheries Training",
    category: "Capacity Development",
    description:
      "Browse local training courses, seamanship workshops and technical development programmes for Ministry staff and sector stakeholders.",
    btnText: "Explore Local Training",
    href: "/local-training",
    image: "/images/services/local-training.jpg",
    alt: "Local fisheries training workshop in Sri Lanka",
    fallbackIcon: GraduationCap,
  },
  {
    id: "foreign-training",
    title: "Foreign & Overseas Training",
    category: "International Exchange",
    description:
      "Discover international oceanography courses, technology exposure seminars and overseas training opportunities in partner maritime nations.",
    btnText: "Explore Foreign Training",
    href: "/foreign-training",
    image: "/images/services/foreign-training.jpg",
    alt: "International ocean science and foreign training seminar",
    fallbackIcon: Globe,
  },
  {
    id: "procurement",
    title: "Procurement & Tenders",
    category: "Ministry Bidding",
    description:
      "Access official procurement opportunities, purchasing tenders, harbour construction bids and supply contracts published by the Ministry.",
    btnText: "Explore Procurement Portal",
    href: "/procurement",
    image: "/images/services/procurement.jpg",
    alt: "Official government procurement documents and tenders",
    fallbackIcon: ShoppingBag,
  },
  {
    id: "recruitment",
    title: "Recruitment & Vacancies",
    category: "Career Opportunities",
    description:
      "View current job opportunities, public sector vacancies, research internships and career announcements across Ministry institutions.",
    btnText: "Explore Career Vacancies",
    href: "/recruitment",
    image: "/images/services/recruitment.jpg",
    alt: "Fisheries ministry career recruitment and job vacancies",
    fallbackIcon: UserPlus,
  },
]

export function PopularServices({ initialSection }: { initialSection?: ApiServicesSection }) {
  const badgeText = initialSection?.badge_text || "Ministry Portals"
  const sectionTitle = initialSection?.section_title || "Services and Opportunities"
  const sectionDescription =
    initialSection?.section_description ||
    "Explore local training programmes, foreign technical exchange, procurement notices, career recruitment, and key public opportunities provided by the Ministry of Fisheries."

  const serviceCards: ServiceCardItem[] =
    initialSection?.cards && initialSection.cards.length > 0
      ? initialSection.cards.map((c) => ({
          id: String(c.id),
          title: c.title,
          category: c.category,
          description: c.description,
          btnText: c.button_text || "Explore Portal",
          href: c.url,
          image: c.image_url || "/images/services/local-training.jpg",
          alt: c.image_alt || c.title,
          fallbackIcon: GraduationCap,
        }))
      : defaultServiceCards

  return (
    <section
      id="popular-services"
      aria-labelledby="popular-services-heading"
      className="py-16 sm:py-20 bg-white border-b border-slate-200"
    >
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-[#256B29] flex items-center gap-1.5 mb-1">
              <Sparkles className="h-4 w-4 text-[#256B29]" />
              <span>{badgeText}</span>
            </p>
            <h2
              id="popular-services-heading"
              className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
            >
              {sectionTitle}
            </h2>
          </div>
          <p className="max-w-xl text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
            {sectionDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {serviceCards.map((card) => (
            <ServiceCardItemComponent key={card.id} card={card} />
          ))}
        </div>
      </Container>
    </section>
  )
}

function ServiceCardItemComponent({ card }: { card: ServiceCardItem }) {
  const [imageError, setImageError] = useState(false)
  const FallbackIcon = card.fallbackIcon

  return (
    <article className="flex flex-col h-full bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1 transition-all duration-300 group">
      {/* Card Image Header */}
      <Link
        href={card.href}
        className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 shrink-0 text-left block"
      >
        {!imageError ? (
          <Image
            src={card.image}
            alt={card.alt}
            fill
            unoptimized={card.image.startsWith("http")}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-emerald-50 text-[#388E3C]">
            <FallbackIcon className="h-12 w-12 stroke-[1.5]" aria-hidden="true" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3">
          <span className="rounded-md bg-white/90 px-2.5 py-1 text-[11px] font-extrabold text-slate-900 backdrop-blur-xs shadow-2xs">
            {card.category}
          </span>
        </div>
      </Link>

      {/* Card Content Body */}
      <div className="flex flex-col flex-1 p-6 justify-between">
        <div>
          <Link href={card.href} className="group/title block">
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight group-hover/title:text-[#256B29] transition-colors leading-snug">
              {card.title}
            </h3>
          </Link>
          <p className="mt-2.5 text-xs leading-relaxed text-slate-600 text-justify font-normal line-clamp-3">
            {card.description}
          </p>
        </div>

        {/* Direct Link Action Button */}
        <div className="mt-6 pt-3 border-t border-slate-100">
          <Link
            href={card.href}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#256B29] px-4 py-2.5 text-xs font-extrabold !text-white transition-colors hover:bg-[#1b4d1d] shadow-2xs group/btn"
          >
            <span>{card.btnText}</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0 group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}