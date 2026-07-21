import {
  Accessibility,
  Building2,
  Globe2,
  Languages,
} from "lucide-react"

import { Section } from "@/components/ui/section"
import { SectionTitle } from "@/components/ui/section-title"
import { StatCard } from "@/components/ui/stat-card"

const overviewItems = [
  {
    value: "Island-wide",
    label: "Public service access",
    description:
      "Information and services for fisheries communities throughout Sri Lanka.",
    icon: Globe2,
  },
  {
    value: "Connected",
    label: "Government institutions",
    description:
      "Access Ministry departments, authorities and related fisheries institutions.",
    icon: Building2,
  },
  {
    value: "3 languages",
    label: "Inclusive public information",
    description:
      "Website content is being prepared for English, Sinhala and Tamil access.",
    icon: Languages,
  },
  {
    value: "Accessible",
    label: "Citizen-first experience",
    description:
      "Keyboard support, readable layouts and accessibility preferences are built in.",
    icon: Accessibility,
  },
]

export function SectorOverview() {
  return (
    <Section
      id="sector-overview"
      background="gradient"
      labelledBy="sector-overview-heading"
    >
      <SectionTitle
        id="sector-overview-heading"
        eyebrow="Public service"
        title="Designed for citizens and fisheries communities"
        description="The Ministry website brings services, information, documents and institutional resources into one accessible public platform."
        align="center"
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {overviewItems.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </div>
    </Section>
  )
}