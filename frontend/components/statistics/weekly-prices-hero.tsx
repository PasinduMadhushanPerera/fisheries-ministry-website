import { BarChart3, DollarSign } from "lucide-react"
import { PageHero } from "@/components/ui/page-hero"

export function WeeklyPricesHero() {
  return (
    <PageHero
      badgeIcon={BarChart3}
      badgeText="Statistics"
      title="Weekly"
      highlightTitle="Fish Prices"
      description="Browse official weekly fish price reports published by the Ministry of Fisheries. Access harbor retail and wholesale market intelligence reports."
      cardIcon={DollarSign}
      cardEyebrow="Updated Weekly"
      cardTitle="Harbor & Retail Price Monitoring"
      cardDescription="Weekly price indices across major landing harbors, wholesale markets, and retail centers for key commercial fish varieties."
    />
  )
}
