import { ShieldCheck, Scale } from "lucide-react"
import { PageHero } from "@/components/ui/page-hero"

export function RtiHero() {
  return (
    <PageHero
      badgeIcon={ShieldCheck}
      badgeText="Public Information"
      title="Right to"
      highlightTitle="Information (RTI)"
      description="Access Right to Information legislation, procedures, forms, officers, reports and other public disclosures published by the Ministry."
      cardIcon={Scale}
      cardEyebrow="RTI Act No. 12 of 2016"
      cardTitle="Public Information & Legal Transparency"
      cardDescription="Ensuring accountability, public access to information, and official disclosure mechanisms for all citizens under Sri Lankan law."
    />
  )
}
