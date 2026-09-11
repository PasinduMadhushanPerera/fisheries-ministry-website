import type { Metadata } from "next"
import { UserPlus, Briefcase, Award } from "lucide-react"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Container } from "@/components/ui/container"
import { PageHero } from "@/components/ui/page-hero"

export const metadata: Metadata = {
  title: "Recruitment & Job Vacancies",
  description:
    "View current job opportunities, vacancies, internship announcements and recruitment information published by the Ministry.",
}

export default function RecruitmentPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb
          items={[
            { label: "Resources", href: "/resources" },
            { label: "Recruitment" },
          ]}
        />

        <PageHero
          badgeIcon={UserPlus}
          badgeText="Ministry Careers"
          title="Recruitment &"
          highlightTitle="Job Vacancies"
          description="View current job opportunities, vacancies, internship announcements and recruitment information published by the Ministry of Fisheries."
          primaryAction={{
            label: "Explore Openings",
            href: "#openings",
          }}
          cardIcon={Briefcase}
          cardEyebrow="Public Service"
          cardTitle="Join Our Ministry Team"
          cardDescription="Official notices for open positions, public service examinations, technical officer gazettes, and graduate trainee programs."
        />

        <section id="openings" className="py-14 bg-slate-50">
          <Container>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm max-w-4xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Career Opportunities & Vacancies
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Official notices for open positions, public service examinations, technical officer gazettes, and graduate trainee programs.
              </p>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
