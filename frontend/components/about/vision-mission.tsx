import { CheckCircle2 } from "lucide-react"

import { visionMissionItems } from "@/data/about"
import { Section } from "@/components/ui/section"
import { SectionTitle } from "@/components/ui/section-title"
import { cn } from "@/lib/utils"

const accentClasses = {
  green: {
    card: "from-[#256B29] to-[#388E3C]",
    icon: "bg-white/15",
    label: "text-green-100",
  },
  blue: {
    card: "from-sky-800 to-blue-700",
    icon: "bg-white/15",
    label: "text-sky-100",
  },
}

export function VisionMission() {
  return (
    <Section
      id="vision-and-mission"
      background="soft"
      labelledBy="vision-mission-heading"
      spacing="lg"
    >
      <SectionTitle
        id="vision-mission-heading"
        eyebrow="Our direction"
        title="Vision and mission"
        description="The following content provides a professional draft structure. Replace it with the exact approved Ministry vision and mission statements before publication."
        align="center"
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {visionMissionItems.map((item) => {
          const Icon = item.icon
          const accent = accentClasses[item.accent]

          return (
            <article
              key={item.type}
              className={cn(
                "relative isolate min-h-[25rem] overflow-hidden rounded-[2rem] bg-gradient-to-br p-7 text-white shadow-xl sm:p-9",
                accent.card,
              )}
            >
              <div
                aria-hidden="true"
                className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10"
              />

              <div
                aria-hidden="true"
                className="absolute -bottom-28 -left-16 h-56 w-56 rounded-full border border-white/10"
              />

              <div className="relative flex h-full flex-col">
                <div
                  className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-2xl ring-1 ring-white/20",
                    accent.icon,
                  )}
                >
                  <Icon
                    aria-hidden="true"
                    className="h-8 w-8"
                  />
                </div>

                <p
                  className={cn(
                    "mt-8 text-sm font-bold uppercase tracking-[0.18em]",
                    accent.label,
                  )}
                >
                  {item.type}
                </p>

                <h3 className="mt-3 text-3xl font-bold leading-tight">
                  {item.title}
                </h3>

                <p className="mt-5 text-lg leading-8 text-white/85">
                  {item.description}
                </p>

                <div className="mt-auto pt-8">
                  <div className="flex items-start gap-3 border-t border-white/15 pt-6 text-sm leading-6 text-white/80">
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0"
                    />

                    <p>
                      Final wording must be reviewed and approved by
                      the authorised Ministry officer.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </Section>
  )
}