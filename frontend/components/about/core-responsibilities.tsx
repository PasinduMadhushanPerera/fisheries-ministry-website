import { ArrowRight } from "lucide-react"

import { responsibilities } from "@/data/about"
import { LinkButton } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Section } from "@/components/ui/section"
import { SectionTitle } from "@/components/ui/section-title"

export function CoreResponsibilities() {
  return (
    <Section
      id="core-responsibilities"
      background="gradient"
      labelledBy="responsibilities-heading"
      spacing="lg"
    >
      <SectionTitle
        id="responsibilities-heading"
        eyebrow="What we do"
        title="Core responsibilities"
        description="The Ministry provides leadership and coordination across policy, administration, sustainability, community development and institutional services."
        actions={
          <LinkButton
            href="/downloads"
            variant="outline"
          >
            Explore Downloads Portal
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4"
            />
          </LinkButton>
        }
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {responsibilities.map((item, index) => {
          const Icon = item.icon

          return (
            <Card
              key={item.title}
              interactive
              className="group relative h-full overflow-hidden p-7"
            >
              <span
                aria-hidden="true"
                className="absolute right-5 top-4 text-5xl font-bold text-slate-100"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-[#256B29] transition duration-300 group-hover:scale-105 group-hover:bg-[#388E3C] group-hover:text-white">
                  <Icon
                    aria-hidden="true"
                    className="h-7 w-7"
                  />
                </div>

                <h3 className="mt-6 text-xl font-bold leading-snug text-slate-950 group-hover:text-[#256B29]">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            </Card>
          )
        })}
      </div>
    </Section>
  )
}