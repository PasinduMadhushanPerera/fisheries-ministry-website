import {
  Anchor,
  Award,
  BarChart3,
  Briefcase,
  Database,
  Fish,
  Globe,
  HeartPulse,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { SectionTitle } from "@/components/ui/section-title"
import { ApiObjective, ApiSectionHeader } from "@/lib/api/about"

const iconMap: Record<string, React.ElementType> = {
  Database,
  Globe,
  Anchor,
  Fish,
  TrendingUp,
  BarChart3,
  HeartPulse,
  Briefcase,
  Users,
  ShieldCheck,
  Award,
}

const defaultPolicyObjectives = [
  {
    number: "01",
    title: "Science-Based Resource Management",
    description: "Sustainable management of resources using science-based information.",
    icon: Database,
  },
  {
    number: "02",
    title: "Global & Regional Obligations",
    description: "Compliance with regional and international obligations.",
    icon: Globe,
  },
  {
    number: "03",
    title: "Marine Fisheries Production",
    description: "Increased marine fisheries production across territorial waters.",
    icon: Anchor,
  },
  {
    number: "04",
    title: "Aquaculture & Inland Growth",
    description: "Increased aquaculture and inland fisheries production.",
    icon: Fish,
  },
  {
    number: "05",
    title: "Post-Harvest & Value Addition",
    description: "Minimized post-harvest losses and increased value addition.",
    icon: TrendingUp,
  },
  {
    number: "06",
    title: "Export Earnings Growth",
    description: "Increased export earnings through premium seafood production.",
    icon: BarChart3,
  },
  {
    number: "07",
    title: "Nutrition & Consumption",
    description: "Increased per capita consumption of fish nationwide.",
    icon: HeartPulse,
  },
  {
    number: "08",
    title: "Leisure, Jobs & Enterprise",
    description: "Improved opportunities for leisure, employment and enterprises development.",
    icon: Briefcase,
  },
  {
    number: "09",
    title: "Fisher Community Wellbeing",
    description: "Improved socio-economic activities of the fisher community.",
    icon: Users,
  },
]

export function MinistryObjectives({
  initialHeader,
  initialObjectives,
}: {
  initialHeader?: ApiSectionHeader
  initialObjectives?: ApiObjective[]
}) {
  const eyebrow = initialHeader?.eyebrow || "Policy Objectives"
  const title = initialHeader?.title || "Objectives of the Sector Policy"
  const description =
    initialHeader?.description ||
    "The Government envisages achieving the following objectives from implementation of the new Policy in the fisheries and aquaculture sector."

  const items =
    initialObjectives && initialObjectives.length > 0
      ? initialObjectives.map((obj) => {
          const Icon = iconMap[obj.icon_name] || ShieldCheck
          return {
            number: obj.number_badge,
            title: obj.title,
            description: obj.description,
            icon: Icon,
          }
        })
      : defaultPolicyObjectives

  return (
    <Section
      id="objectives"
      background="white"
      labelledBy="objectives-heading"
      className="py-16 bg-white border-b border-slate-200"
    >
      <Container>
        <SectionTitle
          id="objectives-heading"
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="left"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <article
                key={item.number + item.title}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs transition-all duration-200 hover:-translate-y-1 hover:border-[#388E3C] hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-[#388E3C] transition-all duration-300 group-hover:bg-[#388E3C] group-hover:text-white">
                      <Icon className="h-6 w-6 stroke-[1.75]" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900 group-hover:text-[#256B29] transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-[#256B29]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#388E3C]" />
                  <span>Strategic Objective</span>
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
