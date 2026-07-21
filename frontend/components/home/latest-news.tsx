import { ArrowRight, Newspaper } from "lucide-react"

import { LinkButton } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Section } from "@/components/ui/section"
import { SectionTitle } from "@/components/ui/section-title"

const newsItems = [
  {
    title:
      "Ministry activities supporting sustainable fisheries development",
    description:
      "Read updates about programmes, policy initiatives and collaborative activities that support fisheries communities and aquatic resources.",
    category: "Ministry news",
  },
  {
    title:
      "Strengthening services for fishing communities across Sri Lanka",
    description:
      "Learn how public institutions work together to improve access to services, information and development support.",
    category: "Community",
  },
  {
    title:
      "Promoting responsible use of aquatic and ocean resources",
    description:
      "Explore Ministry initiatives focused on sustainability, sector development, conservation and responsible resource management.",
    category: "Sustainability",
  },
]

export function LatestNews() {
  return (
    <Section
      id="latest-news"
      background="soft"
      labelledBy="latest-news-heading"
    >
      <SectionTitle
        id="latest-news-heading"
        eyebrow="Media centre"
        title="Latest Ministry news"
        description="Follow Ministry activities, sector developments, community programmes and official public information."
        actions={
          <LinkButton
            href="/media-centre/news"
            variant="outline"
          >
            View all news
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4"
            />
          </LinkButton>
        }
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {newsItems.map((item, index) => (
          <Card
            key={item.title}
            interactive
            className="group flex h-full flex-col overflow-hidden"
          >
            <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-gradient-to-br from-sky-100 via-green-50 to-white">
              <div
                aria-hidden="true"
                className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-sky-200/50"
              />

              <div
                aria-hidden="true"
                className="absolute -bottom-14 -left-10 h-36 w-36 rounded-full bg-green-200/50"
              />

              <Newspaper
                aria-hidden="true"
                className="relative h-14 w-14 text-[#256B29]"
              />

              <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700 shadow-sm">
                {item.category}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <p className="text-sm font-semibold text-slate-500">
                Ministry update {index + 1}
              </p>

              <h3 className="mt-3 text-xl font-bold leading-snug text-slate-950 transition-colors group-hover:text-[#256B29]">
                {item.title}
              </h3>

              <p className="mt-3 flex-1 leading-7 text-slate-600">
                {item.description}
              </p>

              <LinkButton
                href="/media-centre/news"
                variant="outline"
                className="mt-6 self-start"
              >
                Read Ministry news
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </LinkButton>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}