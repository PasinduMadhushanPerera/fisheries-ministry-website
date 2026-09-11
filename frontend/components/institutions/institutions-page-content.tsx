"use client"

import { useState } from "react"
import { FeaturedInstitutions } from "@/components/institutions/featured-institutions"
import { InstitutionDetailModal } from "@/components/institutions/institution-detail-modal"
import { InstitutionsGrid } from "@/components/institutions/institutions-grid"
import { InstitutionsHero } from "@/components/institutions/institutions-hero"
import { InstitutionsOverview } from "@/components/institutions/institutions-overview"
import type { Institution } from "@/data/institutions"

export function InstitutionsPageContent() {
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null)

  return (
    <>
      <InstitutionsHero />
      <InstitutionsOverview />
      <FeaturedInstitutions onSelectInstitution={(inst) => setSelectedInstitution(inst)} />
      <InstitutionsGrid onSelectInstitution={(inst) => setSelectedInstitution(inst)} />

      {/* ULTRA-PREMIUM LEARN PREVIEW WINDOW POPUP MODAL */}
      <InstitutionDetailModal
        institution={selectedInstitution}
        onClose={() => setSelectedInstitution(null)}
      />
    </>
  )
}
