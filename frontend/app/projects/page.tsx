import type { Metadata } from "next"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

import { FeaturedProjects } from "@/components/projects/featured-projects"
import { ProjectList } from "@/components/projects/project-list"
import { ProjectsCTA } from "@/components/projects/projects-cta"
import { ProjectsHero } from "@/components/projects/projects-hero"

import { Breadcrumb } from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore development projects and initiatives undertaken by the Ministry of Fisheries to strengthen the fisheries and aquatic resources sector in Sri Lanka.",
}

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader />

      <main
        id="main-content"
        tabIndex={-1}
        className="outline-none"
      >
        <Breadcrumb
          items={[
            {
              label: "Projects",
            },
          ]}
        />

        <ProjectsHero />
        <FeaturedProjects />
        <ProjectList />
        <ProjectsCTA />
      </main>

      <SiteFooter />
    </>
  )
}