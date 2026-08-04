"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, GraduationCap, Globe, ShoppingBag, UserPlus } from "lucide-react"

import { Container } from "@/components/ui/container"

type ServiceCardItem = {
  title: string
  description: string
  image: string
  alt: string
  href: string
  fallbackIcon: React.ElementType
}

const serviceCards: ServiceCardItem[] = [
  {
    title: "Local Training",
    description:
      "Connect people with local courses, workshops and programmes that support career development, knowledge and professional growth.",
    image: "/images/services/local-training.jpg",
    alt: "Local fisheries training workshop in Sri Lanka",
    href: "/services/local-training",
    fallbackIcon: GraduationCap,
  },
  {
    title: "Foreign Training",
    description:
      "Discover international courses and programmes that develop global skills, professional knowledge, cultural experience and career opportunities.",
    image: "/images/services/foreign-training.jpg",
    alt: "International ocean science and foreign training seminar",
    href: "/services/foreign-training",
    fallbackIcon: Globe,
  },
  {
    title: "Procurement",
    description:
      "Access procurement opportunities, purchasing information and official notices relating to goods and services.",
    image: "/images/services/procurement.jpg",
    alt: "Official government procurement documents and tenders",
    href: "/resources/procurement",
    fallbackIcon: ShoppingBag,
  },
  {
    title: "Recruitment",
    description:
      "View current job opportunities, vacancies, internship announcements and recruitment information published by the Ministry.",
    image: "/images/services/recruitment.jpg",
    alt: "Fisheries ministry career recruitment and job vacancies",
    href: "/resources/recruitment",
    fallbackIcon: UserPlus,
  },
]

export function PopularServices() {
  return (
    <section
      id="popular-services"
      aria-labelledby="popular-services-heading"
      className="py-16 bg-white border-b border-slate-200"
    >
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#256B29]">
              Ministry Services
            </p>
            <h2
              id="popular-services-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            >
              Services and Opportunities
            </h2>
          </div>
          <p className="max-w-xl text-base text-slate-600">
            Explore training programmes, procurement information, recruitment updates and other key Ministry opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {serviceCards.map((card) => (
            <ServiceCardItemComponent key={card.title} card={card} />
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
    <article className="flex flex-col h-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      {/* Card Image Header */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 shrink-0">
        {!imageError ? (
          <Image
            src={card.image}
            alt={card.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-emerald-50 text-[#388E3C]">
            <FallbackIcon className="h-12 w-12 stroke-[1.5]" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="flex flex-col flex-1 p-6 justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            {card.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {card.description}
          </p>
        </div>

        {/* View Details Button */}
        <div className="mt-6 pt-2">
          <Link
            href={card.href}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#388E3C] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#256B29] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
          >
            <span>View details</span>
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}