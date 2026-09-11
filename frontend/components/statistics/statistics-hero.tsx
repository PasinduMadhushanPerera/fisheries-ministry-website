import { BarChart3 } from "lucide-react"
import { PageHero } from "@/components/ui/page-hero"

export function StatisticsHero() {
  return (
    <PageHero
      badgeIcon={BarChart3}
      badgeText="Statistics"
      title="Fisheries at a"
      highlightTitle="Glance"
      description="Explore key statistics on fish production, fishing fleets, infrastructure, social information, canned fish, fisheries indicators, exports and imports."
      cardIcon={BarChart3}
      cardEyebrow="Summary Statistics 2024"
      cardTitle="National Fisheries Overview"
      cardDescription="Integrated indicators covering marine landings, inland harvests, operating fleet counts, canned fish production, and trade balances."
    />
  )
}
