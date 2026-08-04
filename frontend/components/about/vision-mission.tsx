import { Target, Compass } from "lucide-react"

import { visionMissionItems } from "@/data/about"
import { Section } from "@/components/ui/section"
import { SectionTitle } from "@/components/ui/section-title"
import { cn } from "@/lib/utils"

export function VisionMission() {
  return (
    <Section
      id="vision-and-mission"
      background="soft"
      labelledBy="vision-mission-heading"
      className="py-12 bg-slate-50/80 border-y border-slate-200/80"
    >
      <SectionTitle
        id="vision-mission-heading"
        eyebrow="Our Direction"
        title="Vision and Mission"
        description="Guiding Sri Lanka's fisheries and ocean sector toward sustainable growth and community prosperity."
        align="center"
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto items-stretch">
        {visionMissionItems.map((item) => {
          const isVision = item.type === "Vision"
          const Icon = isVision ? Target : Compass

          return (
            <article
              key={item.type}
              className={cn(
                "relative overflow-hidden rounded-2xl p-6 sm:p-7 text-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between border",
                isVision
                  ? "bg-gradient-to-br from-[#123F36] via-[#1b554a] to-[#144239] border-emerald-700/40"
                  : "bg-gradient-to-br from-[#123F36] via-[#1b554a] to-[#144239] border-emerald-700/40"
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
                    {item.type}
                  </span>
                </div>

                {/* Explicit Pure White Title Color */}
                <h3 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight !text-white drop-shadow-md">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-200/90">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between text-xs font-semibold text-green-200">
                <span>National Fisheries Sector Strategy</span>
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              </div>
            </article>
          )
        })}
      </div>
    </Section>
  )
}