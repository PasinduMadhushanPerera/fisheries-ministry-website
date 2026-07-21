import { strategicPriorities } from "@/data/about"
import { Card } from "@/components/ui/card"
import { Section } from "@/components/ui/section"
import { SectionTitle } from "@/components/ui/section-title"

const gradientClasses = [
  "from-green-700 to-emerald-500",
  "from-sky-800 to-blue-600",
  "from-teal-700 to-cyan-600",
  "from-emerald-800 to-green-600",
]

export function StrategicPriorities() {
  return (
    <Section
      id="strategic-priorities"
      background="gradient"
      labelledBy="strategic-priorities-heading"
      spacing="lg"
    >
      <SectionTitle
        id="strategic-priorities-heading"
        eyebrow="Future direction"
        title="Strategic priorities"
        description="Key focus areas that support sustainable fisheries, stronger communities, improved public services and responsible sector development."
        align="center"
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {strategicPriorities.map((priority, index) => {
          const Icon = priority.icon
          const gradient =
            gradientClasses[index % gradientClasses.length]

          return (
            <Card
              key={priority.title}
              interactive
              className="group relative min-h-80 overflow-hidden border-0 p-0 shadow-xl"
            >
              <div
                className={`relative flex h-full flex-col bg-gradient-to-br ${gradient} p-7 text-white`}
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10"
                />

                <div
                  aria-hidden="true"
                  className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full border border-white/10"
                />

                <div className="relative flex h-full flex-col">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 transition duration-300 group-hover:scale-105 group-hover:rotate-3">
                    <Icon
                      aria-hidden="true"
                      className="h-7 w-7"
                    />
                  </div>

                  <p className="mt-8 text-sm font-bold uppercase tracking-[0.16em] text-white/75">
                    Priority {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="mt-3 text-2xl font-bold leading-snug">
                    {priority.title}
                  </h3>

                  <p className="mt-4 leading-7 text-white/85">
                    {priority.description}
                  </p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </Section>
  )
}