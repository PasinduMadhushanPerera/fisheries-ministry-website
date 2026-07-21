import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react"

import {
  institutionalFeatures,
  ministryOverviewPoints,
} from "@/data/about"
import { LinkButton } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Section } from "@/components/ui/section"
import { SectionTitle } from "@/components/ui/section-title"

export function MinistryOverview() {
  return (
    <Section
      id="ministry-overview"
      background="white"
      labelledBy="ministry-overview-heading"
      spacing="lg"
    >
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <SectionTitle
            id="ministry-overview-heading"
            eyebrow="Ministry overview"
            title="Serving the fisheries sector and the nation"
            description="The Ministry coordinates national priorities, public services and institutional activities connected with fisheries, aquaculture and aquatic resources."
          />

          <div className="mt-8 space-y-5 text-base leading-8 text-slate-600">
            <p>
              Its responsibilities extend across policy development,
              public administration, resource sustainability,
              community support and coordination with organisations
              operating throughout the sector.
            </p>

            <p>
              Through its departments, authorities and associated
              institutions, the Ministry supports citizens,
              fisheries communities, industry participants,
              researchers and public-sector stakeholders.
            </p>
          </div>

          <ul className="mt-8 grid gap-3">
            {institutionalFeatures.map((item) => {
              const Icon = item.icon

              return (
                <li
                  key={item.title}
                  className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#256B29] shadow-sm">
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5"
                    />
                  </div>

                  <div>
                    <p className="font-bold text-slate-950">
                      {item.title}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>

          <LinkButton
            href="/institutions"
            variant="outline"
            className="mt-8"
          >
            View Ministry institutions
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4"
            />
          </LinkButton>
        </div>

        <div className="grid gap-5">
          {ministryOverviewPoints.map((item, index) => {
            const Icon = item.icon

            return (
              <Card
                key={item.title}
                interactive
                className="group relative overflow-hidden p-6 sm:p-7"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-green-400 to-sky-500"
                />

                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-[#256B29] transition group-hover:bg-[#388E3C] group-hover:text-white">
                    <Icon
                      aria-hidden="true"
                      className="h-7 w-7"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-slate-400">
                        0{index + 1}
                      </span>

                      <CheckCircle2
                        aria-hidden="true"
                        className="h-4 w-4 text-green-600"
                      />
                    </div>

                    <h3 className="mt-2 text-xl font-bold text-slate-950 group-hover:text-[#256B29]">
                      {item.title}
                    </h3>

                    <p className="mt-3 leading-7 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </Section>
  )
}