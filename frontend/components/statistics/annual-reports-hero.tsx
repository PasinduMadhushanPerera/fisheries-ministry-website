import { BarChart3, BookOpen } from "lucide-react"
import { PageHero } from "@/components/ui/page-hero"

export function AnnualReportsHero() {
  return (
    <PageHero
      badgeIcon={BarChart3}
      badgeText="Statistics"
      title="Annual Statistics"
      highlightTitle="Reports & Bulletins"
      description="Browse and download official annual fisheries statistics, statistical bulletins and supporting datasets published by the Ministry."
      cardIcon={BookOpen}
      cardEyebrow="Official Publications"
      cardTitle="Sectorial Annual Data"
      cardDescription="Comprehensive statistics covering long-term trends in production, vessel counts, trade, and socio-economic indicators."
    />
  )
}
