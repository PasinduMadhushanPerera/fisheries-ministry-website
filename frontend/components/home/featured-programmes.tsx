import {
  ArrowRight,
  Fish,
  HandHelping,
  Leaf,
  Waves,
} from "lucide-react"

import { LinkButton } from "@/components/ui/button"
import { CtaCard } from "@/components/ui/cta-card"
import { Section } from "@/components/ui/section"
import { SectionTitle } from "@/components/ui/section-title"

const programmes = [
  {
    title: "Fisheries community development",
    description:
      "Discover programmes designed to strengthen livelihoods, welfare, skills and economic opportunities within fisheries communities.",
    href: "/projects/community-development",
    actionLabel: "Explore community programmes",
    icon: HandHelping,
    variant: "green" as const,
  },
  {
    title: "Sustainable aquatic resources",
    description:
      "Learn about responsible fisheries management, resource protection and initiatives supporting long-term sector sustainability.",
    href: "/projects/sustainable-resources",
    actionLabel: "View sustainability initiatives",
    icon: Leaf,
    variant: "blue" as const,
  },
  {
    title: "Aquaculture development",
    description:
      "Access information about aquaculture development, technical services, sector opportunities and institutional support.",
    href: "/projects/aquaculture",
    actionLabel: "Explore aquaculture programmes",
    icon: Fish,
    variant: "dark" as const,
  },
]

export function FeaturedProgrammes() {
  return (
    <Section
      id="featured-programmes"
      background="white"
      labelledBy="featured-programmes-heading"
    >
      <SectionTitle
        id="featured-programmes-heading"
        eyebrow="Development priorities"
        title="Featured programmes and initiatives"
        description="Explore national programmes supporting fisheries communities, aquatic resources and sustainable sector development."
        actions={
          <LinkButton
            href="/projects"
            variant="outline"
          >
            All programmes
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4"
            />
          </LinkButton>
        }
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {programmes.map((programme) => (
          <CtaCard
            key={programme.title}
            {...programme}
          />
        ))}
      </div>

      <div className="mt-8 flex items-center gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-5 text-sky-950">
        <Waves
          aria-hidden="true"
          className="h-6 w-6 shrink-0 text-sky-700"
        />

        <p className="leading-7">
          Programme details, eligibility requirements and
          application information should be confirmed through
          the relevant Ministry service or institution.
        </p>
      </div>
    </Section>
  )
}