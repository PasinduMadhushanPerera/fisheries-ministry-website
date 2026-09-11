import { Download, FileText } from "lucide-react"
import { PageHero } from "@/components/ui/page-hero"

export function DownloadsHero() {
  return (
    <PageHero
      badgeIcon={Download}
      badgeText="Official Downloads"
      title="Document &"
      highlightTitle="Downloads Portal"
      description="Access official Ministry circulars, forms, policy documents, project disclosures, performance reports, statistics and public resources."
      cardIcon={FileText}
      cardEyebrow="Public Document Repository"
      cardTitle="Centralized Ministry Disclosures"
      cardDescription="Browse, preview and download verified government forms, policies, statistics and project publications."
    />
  )
}
