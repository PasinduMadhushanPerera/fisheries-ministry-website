import { BarChart3, FileSpreadsheet } from "lucide-react"
import { PageHero } from "@/components/ui/page-hero"

export function MonthlyProductionHero() {
  return (
    <PageHero
      badgeIcon={BarChart3}
      badgeText="Statistics"
      title="Monthly Fish"
      highlightTitle="Production Reports"
      description="Download official monthly fish production statistics compiled by the Ministry of Fisheries across marine, coastal, and inland sectors."
      cardIcon={FileSpreadsheet}
      cardEyebrow="Excel Datasets"
      cardTitle="Monthly Production Trends"
      cardDescription="Detailed monthly tracking of marine, inland, and coastal aquaculture yields across all Sri Lankan fishing districts."
    />
  )
}
