import { GraduationCap, Award, BookOpenCheck, School } from "lucide-react"

import { PageHero } from "@/components/ui/page-hero"

export function LocalTrainingHero() {
  return (
    <PageHero
      badgeIcon={GraduationCap}
      badgeText="Training Opportunities"
      title="Local Training"
      highlightTitle="Programmes & Workshops"
      description="Browse local courses, workshops, professional development programmes and capacity-building opportunities available to Ministry staff and sector stakeholders across Sri Lanka."
      highlights={[
        { label: "2026 Opportunities", icon: Award },
        { label: "Vocational Courses", icon: School },
        { label: "Seamanship & Safety", icon: BookOpenCheck },
      ]}
      cardIcon={GraduationCap}
      cardEyebrow="Ministry Education Desk"
      cardTitle="Capacity Development & Skill Growth"
      cardDescription="Practical vocational training, seamanship certification, engine maintenance, and sustainable aquaculture workshops conducted across all 15 coastal and inland districts."
    />
  )
}
