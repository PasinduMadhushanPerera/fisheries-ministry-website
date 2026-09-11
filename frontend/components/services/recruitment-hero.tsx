import { UserPlus, Briefcase, Award, GraduationCap } from "lucide-react"

import { PageHero } from "@/components/ui/page-hero"

export function RecruitmentHero() {
  return (
    <PageHero
      badgeIcon={UserPlus}
      badgeText="Public Service Careers"
      title="Recruitment & Vacancies"
      highlightTitle="Career Opportunities & Gazette Notices"
      description="View current job vacancies, gazette recruitment notices, research fellowships, and public service career opportunities across Ministry institutions."
      highlights={[
        { label: "2026 Careers", icon: Briefcase },
        { label: "Public Service Commission", icon: Award },
        { label: "Fisheries Research & Extension", icon: GraduationCap },
      ]}
      cardIcon={UserPlus}
      cardEyebrow="Ministry Careers Desk"
      cardTitle="Serving the Nation in Marine Development"
      cardDescription="Equal opportunity public sector recruitment under Public Service Commission guidelines for inspectors, research scientists, engineers, and administrative staff."
    />
  )
}
