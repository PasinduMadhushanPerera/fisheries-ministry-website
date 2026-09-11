import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CloudSun, ExternalLink, Sparkles } from "lucide-react"

import { Container } from "@/components/ui/container"
import { ApiQuickInfoSection } from "@/lib/api/home"
import { getAbsoluteMediaUrl } from "@/lib/utils"

type QuickInfoCard = {
  id: string
  title: string
  description: string
  href: string
  isExternal: boolean
  image: string
  imageAlt: string
  primaryButtonLabel: string
  type: "weather" | "internal-affairs" | "custom"
}

const defaultQuickInfoCards: QuickInfoCard[] = [
  {
    id: "weather",
    title: "Weather",
    description:
      "View today's live weather conditions, sea state updates and marine forecasts relevant to fisheries and ocean activities.",
    href: "https://www.meteo.gov.lk",
    isExternal: true,
    image: "/images/home/weather.jpg",
    imageAlt: "Marine Weather and Ocean Sea Conditions Forecast",
    primaryButtonLabel: "View Weather",
    type: "weather",
  },
  {
    id: "internal-affairs",
    title: "Internal Affairs Unit",
    description:
      "Submit complaints, report concerns, or contact the Ministry's Internal Affairs Unit regarding public services and officer conduct.",
    href: "/internal-affairs",
    isExternal: false,
    image: "/images/home/internal-affairs.jpg",
    imageAlt: "Ministry of Fisheries Internal Affairs Unit Office",
    primaryButtonLabel: "Submit Complaint",
    type: "internal-affairs",
  },
]

export function QuickInformation({ initialSection }: { initialSection?: ApiQuickInfoSection }) {
  const badgeText = initialSection?.badge_text || "Public Portals & Services"
  const sectionTitle = initialSection?.section_title || "Quick Information & Public Services"
  const sectionDescription =
    initialSection?.section_description ||
    "Access frequently used public services and important Ministry information."

  const quickInfoCards: QuickInfoCard[] =
    initialSection?.cards && initialSection.cards.length > 0
      ? initialSection.cards.map((c) => ({
          id: String(c.id),
          title: c.title,
          description: c.description,
          href: c.url,
          isExternal: Boolean(c.is_external),
          image: getAbsoluteMediaUrl(c.image_url || "/images/home/weather.jpg"),
          imageAlt: c.image_alt || c.title,
          primaryButtonLabel: c.primary_button_label || "View Details",
          type: (c.card_type as any) || "custom",
        }))
      : defaultQuickInfoCards

  return (
    <section
      aria-labelledby="quick-information-heading"
      className="bg-[#f8faf9] py-16 sm:py-20 border-t border-slate-200/80"
    >
      <Container>
        {/* SECTION HEADER MATCHING SERVICES AND OPPORTUNITIES DESIGN */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-[#256B29] flex items-center gap-1.5 mb-1">
              <Sparkles className="h-4 w-4 text-[#256B29]" />
              <span>{badgeText}</span>
            </p>
            <h2
              id="quick-information-heading"
              className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
            >
              {sectionTitle}
            </h2>
          </div>
          <p className="max-w-xl text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
            {sectionDescription}
          </p>
        </div>

        {/* CENTERED CARDS CONTAINER */}
        <div className="grid gap-8 md:grid-cols-2 items-stretch max-w-5xl mx-auto">
          {quickInfoCards.map((card) => {
            const isInternalAffairs = card.type === "internal-affairs" || card.id === "internal-affairs"

            return (
              <article
                key={card.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#256B29] hover:shadow-xl"
              >
                <div>
                  {/* TOPIC TITLE & CLICKABLE ICON IN LIGHT GREEN BADGE CONTAINER */}
                  <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-4">
                    <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl transition-colors group-hover:text-[#256B29]">
                      {card.isExternal ? (
                        <a
                          href={card.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="focus-visible:outline-none"
                        >
                          {card.title}
                        </a>
                      ) : (
                        <Link href={card.href} className="focus-visible:outline-none">
                          {card.title}
                        </Link>
                      )}
                    </h3>

                    {/* Light Green Badge Container with Icon */}
                    {card.isExternal ? (
                      <a
                        href={card.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${card.title} external portal`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100/80 text-[#256B29] transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#256B29] group-hover:text-white"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : (
                      <Link
                        href={card.href}
                        aria-label={`Go to ${card.title} page`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100/80 text-[#256B29] transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#256B29] group-hover:text-white"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>

                  {/* THUMBNAIL IMAGE BOX */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-950 flex items-center justify-center p-1.5 mb-4">
                    <img
                      src={card.image}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover blur-xl opacity-30 scale-110 pointer-events-none"
                    />
                    <img
                      src={card.image}
                      alt={card.imageAlt}
                      className="relative z-10 max-h-full w-auto max-w-full object-contain mx-auto rounded-lg shadow-md transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                    {card.description}
                  </p>
                </div>

                {/* BOTTOM PRIMARY ACTION BUTTON */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  {card.isExternal ? (
                    <a
                      href={card.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-xl bg-[#256B29] px-5 text-xs font-extrabold text-white shadow-2xs transition hover:bg-[#1b4d1d]"
                    >
                      <span>{card.primaryButtonLabel}</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : (
                    <Link
                      href={card.href}
                      className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-xl bg-[#256B29] px-5 text-xs font-extrabold text-white shadow-2xs transition hover:bg-[#1b4d1d]"
                    >
                      <span>{card.primaryButtonLabel}</span>
                      <ArrowRight className="h-4 w-4" />
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
