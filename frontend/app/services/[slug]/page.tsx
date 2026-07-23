import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { RelatedServices } from "@/components/services/related-services"
import { ServiceApplicationSteps } from "@/components/services/service-application-steps"
import { ServiceContact } from "@/components/services/service-contact"
import { ServiceDetailHero } from "@/components/services/service-detail-hero"
import { ServiceOverview } from "@/components/services/service-overview"
import { ServiceRequirements } from "@/components/services/service-requirements"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import {
  getServiceBySlug,
  serviceDetails,
} from "@/data/service-details"

type ServiceDetailPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return serviceDetails.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested fisheries service could not be found.",
    }
  }

  return {
    title: service.title,
    description: service.description,
  }
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  return (
    <>
      <SiteHeader />

      <main id="main-content">
        <Breadcrumb
          items={[
            {
              label: "Services",
              href: "/services",
            },
            {
              label: "Licences & Registrations",
              href: "/services/licences-and-registrations",
            },
            {
              label: service.shortTitle,
            },
          ]}
        />

        <ServiceDetailHero service={service} />

        <ServiceOverview service={service} />

        <ServiceRequirements service={service} />

        <ServiceApplicationSteps service={service} />

        <ServiceContact service={service} />

        <RelatedServices service={service} />
      </main>

      <SiteFooter />
    </>
  )
}