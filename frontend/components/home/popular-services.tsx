import {
  Anchor,
  ClipboardList,
  FileText,
  Fish,
  HandHelping,
  IdCard,
} from "lucide-react"

import { LinkButton } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { SectionTitle } from "@/components/ui/section-title"
import { ServiceCard } from "@/components/ui/service-card"

const services = [
  {
    title: "Fishing Vessel Registration",
    description:
      "Access guidance for registering fishing vessels, updating ownership records and submitting vessel information.",
    href: "/services/fishing-vessel-registration",
    icon: Anchor,
    category: "Registration",
    status: "Public service",
  },
  {
    title: "Fisher Registration",
    description:
      "Find information about fisher registration, eligibility requirements and documents needed for applications.",
    href: "/services/fisher-registration",
    icon: IdCard,
    category: "Registration",
    status: "Public service",
  },
  {
    title: "Fishing Licence Services",
    description:
      "View application guidance for fishing licences, renewals and related approvals administered by the Ministry.",
    href: "/services/fishing-licences",
    icon: ClipboardList,
    category: "Licensing",
    status: "Official guidance",
  },
  {
    title: "Fisheries Support Programmes",
    description:
      "Explore assistance, livelihood development and welfare programmes available to fishing communities.",
    href: "/services/support-programmes",
    icon: HandHelping,
    category: "Community support",
    status: "Programme",
  },
  {
    title: "Aquaculture Services",
    description:
      "Access information on aquaculture development, technical support, approvals and sector resources.",
    href: "/services/aquaculture",
    icon: Fish,
    category: "Aquaculture",
    status: "Sector service",
  },
  {
    title: "Forms and Downloads",
    description:
      "Download application forms, guidelines, reports, circulars and other official Ministry documents.",
    href: "/documents",
    icon: FileText,
    category: "Documents",
    status: "Downloads",
  },
]

export function PopularServices() {
  return (
    <Section
      id="popular-services"
      background="gradient"
      labelledBy="popular-services-heading"
    >
      <SectionTitle
        id="popular-services-heading"
        eyebrow="Citizen services"
        title="Popular fisheries services"
        description="Quickly access frequently requested Ministry services, application guidance and official resources."
        actions={
          <LinkButton
            href="/services"
            variant="outline"
          >
            View all services
          </LinkButton>
        }
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <ServiceCard
            key={service.href}
            {...service}
          />
        ))}
      </div>
    </Section>
  )
}