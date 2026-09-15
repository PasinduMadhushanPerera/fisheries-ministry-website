"use client"

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
import { getAbsoluteMediaUrl } from "@/lib/utils"

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
          image: getAbsoluteMediaUrl(c.image_url || "/images/services/local-training.jpg"),
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

        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {serviceCards.map((service) => {
            const FallbackIcon = service.fallbackIcon

            return (
              <article
                key={service.id}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xs transition duration-300 hover:-translate-y-1 hover:border-[#256B29]/40 hover:shadow-xl"
              >
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Visual Header Thumbnail Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#faf8f5] border border-amber-100/80 flex items-center justify-center p-2 mb-4 shadow-xs">
                      <img
                        src={service.image}
                        alt={service.alt}
                        className="relative z-10 max-h-full w-auto max-w-full object-contain mx-auto rounded-lg shadow-xs transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>

                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#256B29] mb-1">
                      {service.category}
                    </p>
                    <h3 className="text-lg font-extrabold text-slate-900 leading-snug line-clamp-2 transition-colors group-hover:text-[#256B29]">
                      <Link href={service.href}>{service.title}</Link>
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3 text-justify">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <Link
                      href={service.href}
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#256B29] px-4 py-2.5 text-xs font-extrabold !text-white shadow-2xs transition hover:bg-[#1b4d1d] group-hover:bg-[#1b4d1d]"
                    >
                      <span className="!text-white">{service.btnText}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 !text-white" />
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}