import { ShoppingBag, FileCheck, Anchor, HardHat } from "lucide-react"

import { PageHero } from "@/components/ui/page-hero"

export function ProcurementHero() {
  return (
    <PageHero
      badgeIcon={ShoppingBag}
      badgeText="Government e-Procurement Portal"
      title="Procurement & Tenders"
      highlightTitle="Bidding Documents & Contract Notices"
      description="Access official bidding documents, tender notices, harbour construction projects, equipment purchasing, and procurement announcements published by the Ministry and affiliated bodies."
      highlights={[
        { label: "2026 Procurement", icon: FileCheck },
        { label: "Harbour Construction Bids", icon: Anchor },
        { label: "Public Transparency", icon: HardHat },
      ]}
      cardIcon={ShoppingBag}
      cardEyebrow="Ministry Procurement Desk"
      cardTitle="Transparent Public Bidding & Contracts"
      cardDescription="Publishing standardized government bidding documents, technical specifications, and tender award notices under the oversight of Ministry Procurement Committees."
    />
  )
}
