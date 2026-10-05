import { Target, Compass } from "lucide-react"

import { Section } from "@/components/ui/section"
import { SectionTitle } from "@/components/ui/section-title"
import { cn } from "@/lib/utils"
import { ApiVisionMission } from "@/lib/api/about"

export function VisionMission({ initialVisionMission }: { initialVisionMission?: ApiVisionMission }) {
  const eyebrow = initialVisionMission?.eyebrow || "Our Direction"
  const title = initialVisionMission?.title || "Vision and Mission"
  const description =
    initialVisionMission?.description ||
    "Guiding Sri Lanka's fisheries and ocean sector toward sustainable growth and community prosperity."

  const visionBadge = initialVisionMission?.vision_badge || "Vision"
  const visionHeading = initialVisionMission?.vision_heading || "Sustainable Aquatic Wealth"
  const visionDescription =
    initialVisionMission?.vision_description ||
    "To be the leading contributor to the national economy through sustainable utilization and conservation of fisheries and ocean resources, ensuring nutritional security, enhanced livelihoods for fishing communities, and world-class aquatic stewardship."
  const visionFooter = initialVisionMission?.vision_footer || "National Fisheries Sector Strategy"

  const missionBadge = initialVisionMission?.mission_badge || "Mission"
  const missionHeading = initialVisionMission?.mission_heading || "Empowered Fishing Communities"
  const missionDescription =
    initialVisionMission?.mission_description ||
    "Providing regulatory leadership, technological adoption, high-yield aquaculture, and social security for fishing communities while preserving marine ecosystems through evidence-based policies and transparent institutional governance."
  const missionFooter = initialVisionMission?.mission_footer || "National Fisheries Sector Strategy"

  const items = [
    {
      badge: visionBadge,
      heading: visionHeading,
      description: visionDescription,
      footer: visionFooter,
      Icon: Target,
    },
    {
      badge: missionBadge,
      heading: missionHeading,
      description: missionDescription,
      footer: missionFooter,
      Icon: Compass,
    },
  ]

  return (
    <Section
      id="vision-and-mission"
      background="soft"
      labelledBy="vision-mission-heading"
      className="py-12 bg-slate-50/80 border-y border-slate-200/80"
    >
      <SectionTitle
        id="vision-mission-heading"
        eyebrow={eyebrow}
        title={title}
        description={description}
        align="center"
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto items-stretch">
        {items.map((item) => {
          const Icon = item.Icon

          return (
            <article
              key={item.badge}
              className={cn(
                "relative overflow-hidden rounded-2xl p-6 sm:p-7 text-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between border bg-gradient-to-br from-[#123F36] via-[#1b554a] to-[#144239] border-emerald-700/40"
              )}
            >
              {/* Subtle background glow */}
              <div
                aria-hidden="true"
                className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/5 blur-xl pointer-events-none"
              />

              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-green-300 ring-1 ring-white/20">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </div>

                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-green-300">
                    {item.badge}
                  </span>
                </div>

                {/* Explicit Pure White Title Color */}
                <h3 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight !text-white drop-shadow-md">
                  {item.heading}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-200/90 text-justify">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between text-xs font-semibold text-green-200">
                <span>{item.footer}</span>
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              </div>
            </article>
          )
        })}
      </div>
    </Section>
  )
}