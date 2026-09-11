import { Globe, Award, Compass, PlaneTakeoff } from "lucide-react"

import { PageHero } from "@/components/ui/page-hero"

export function ForeignTrainingHero() {
  return (
    <PageHero
      badgeIcon={Globe}
      badgeText="International Opportunities"
      title="Foreign Training"
      highlightTitle="Scholarships & Fellowships"
      description="Browse international courses, overseas scholarships, bilateral technical seminars, and global oceanography training opportunities available to Ministry staff and fisheries specialists."
      highlights={[
        { label: "2026 Fellowships", icon: Award },
        { label: "Bilateral Seminars", icon: Compass },
        { label: "Overseas Training", icon: PlaneTakeoff },
      ]}
      cardIcon={Globe}
      cardEyebrow="International Relations Desk"
      cardTitle="Global Marine Excellence & Fellowships"
      cardDescription="Facilitating specialized foreign scholarships, technical oceanography courses, and international research delegations in partnership with global maritime bodies."
    />
  )
}
