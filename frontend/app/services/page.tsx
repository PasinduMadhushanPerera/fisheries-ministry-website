import type { Metadata } from "next"

import { ServicesHero } from "@/components/services/services-hero"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { PopularServices } from "@/components/services/popular-services"
import { ServiceCategories } from "@/components/services/service-categories"
import { ServiceProcess } from "@/components/services/service-process"
import { DownloadsSection } from "@/components/services/downloads-section"
import { ServiceAssistance } from "@/components/services/service-assistance"
import { ServiceFaq } from "@/components/services/service-faq"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Find fisheries-related public services, application guidance, forms, licences and permits.",
}

export default function ServicesPage() {
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
              label: "Services",
            },
          ]}
        />

        <ServicesHero />
        <PopularServices />
        <ServiceCategories />
        <ServiceProcess />
        <DownloadsSection />
        <ServiceFaq />
        <ServiceAssistance />
      </main>

      <SiteFooter />
    </>
  )
}