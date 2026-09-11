import { BarChart3, MapPinned } from "lucide-react"
import { PageHero } from "@/components/ui/page-hero"

export function FisheryInformationHero() {
  return (
    <PageHero
      badgeIcon={BarChart3}
      badgeText="Statistics and Information"
      title="Fishery Related"
      highlightTitle="Information & Data"
      description="Access landing-site maps, species information, identification resources, processing-establishment details and fisheries census documents."
      cardIcon={MapPinned}
      cardEyebrow="Official Information Resources"
      cardTitle="Maps, Species & Infrastructure"
      cardDescription="Supplementary data assets including harbor capacity, landing site maps, tuna identification cards, and boat census figures."
    />
  )
}
