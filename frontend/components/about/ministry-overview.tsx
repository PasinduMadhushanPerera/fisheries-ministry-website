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
            className="text-justify"
            id="ministry-overview-heading"
            eyebrow="Ministry overview"
            title="Serving the fisheries sector and the nation"
            description="Fishing has a long tradition in Sri Lanka that goes back to over two thousand years. It was one of the primary economic activities of the coastal communities. Marine fishing has gradually developed from a livelihood activity to a multibillion rupee industry over the years, particularly since Sri Lanka obtained Independence from the British rule in 1948. Inland fishing and aquaculture are recent developments not older than 75 years. Coastal aquaculture commenced in early 1980s with the establishment of shrimp farms in the North-western Province. Marine aquaculture commenced much later, i.e. around 2010.

The fisheries resource base of the country comprises the exclusive economic zone (EEZ) of 517,000 sq km, the territorial sea of 21,500 sq km, and internal waters that include lagoons and estuaries of 1580 sq km, and man-made reservoirs of 5200 sq km. The bays, lagoons, reservoirs and certain lands located in coastal and reservoir areas create conducive environment for the resource base for development of aquaculture.

The sector contributes around 1.4 % to the Gross Domestic Product (GDP) at current market prices. It provides direct and indirect employment to around 575,000 persons (3.7 % of the workforce of the country). The current (2017) annual fish production amounts to over 530,000 metric tons with a value addition of over USD 1300 million. The sector also supports an export industry that exports about 5 % of the production comprising tuna, shrimp, lobster, crab, sea-cucumber ornamental fish, etc. and earning over USD 250 million. Fish is the main source of animal protein of the masses. Currently the local fish production fulfills around 65 % of the total amount of fish required for the consumption of the country and the balance requirement is imported. The Government intends to meet the total requirement from the local fisheries and aquaculture production or alternatively meet the cost of fish imports from part of the income of fish exports."
          />

          <div className="mt-8 space-y-5 text-base leading-8 text-slate-600">
            <p className="text-justify">
              Its responsibilities extend across policy development,
              public administration, resource sustainability,
              community support and coordination with organisations
              operating throughout the sector.
            </p>

            <p className="text-justify">
              Through its departments, authorities and associated
              institutions, the Ministry supports citizens,
              fisheries communities, industry participants,
              researchers and public-sector stakeholders.
            </p>
          </div>

          {/* <ul className="mt-8 grid gap-3">
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
          </ul> */}

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