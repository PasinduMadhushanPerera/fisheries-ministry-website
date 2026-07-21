import { ministryValues } from "@/data/about"
import { Card } from "@/components/ui/card"
import { Section } from "@/components/ui/section"
import { SectionTitle } from "@/components/ui/section-title"

export function CoreValues() {
  return (
    <Section
      id="core-values"
      background="soft"
      labelledBy="core-values-heading"
      spacing="lg"
    >
      <SectionTitle
        id="core-values-heading"
        eyebrow="Our Values"
        title="The principles that guide our work"
        description="These values shape how the Ministry serves citizens, works with partners and manages public responsibilities."
        align="center"
      />

      <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {ministryValues.map((value) => {
          const Icon = value.icon

          return (
            <Card
              key={value.title}
              interactive
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#388E3C] hover:shadow-2xl"
            >
              <div
                aria-hidden="true"
                className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-green-50 opacity-60 transition group-hover:scale-125"
              />

              <div className="relative">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#256B29] to-[#388E3C] text-white shadow-lg transition duration-300 group-hover:rotate-6 group-hover:scale-110">
                  <Icon
                    aria-hidden="true"
                    className="h-9 w-9"
                  />
                </div>

                <h3 className="mt-8 text-xl font-bold text-slate-900">
                  {value.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {value.description}
                </p>
              </div>
            </Card>
          )
        })}
      </div>
    </Section>
  )
}