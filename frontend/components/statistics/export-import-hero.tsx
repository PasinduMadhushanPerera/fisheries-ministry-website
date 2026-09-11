import { BarChart3, Ship } from "lucide-react"
import { PageHero } from "@/components/ui/page-hero"

export function ExportImportHero() {
  return (
    <PageHero
      badgeIcon={BarChart3}
      badgeText="Statistics"
      title="Seafood Export &"
      highlightTitle="Import Data"
      description="Browse official monthly statistics on fish exports, imports, trade values and related fisheries-sector data."
      cardIcon={Ship}
      cardEyebrow="Updated Monthly"
      cardTitle="Global Seafood Trade"
      cardDescription="International trade metrics, seafood export values, volume statistics, destination markets, and import figures."
    />
  )
}
