import type { Metadata } from "next"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { InternalAffairsHero } from "@/components/internal-affairs/internal-affairs-hero"
import { InternalAffairsOverview } from "@/components/internal-affairs/internal-affairs-overview"
import { InternalAffairsOfficers } from "@/components/internal-affairs/internal-affairs-officers"
import { ComplaintOptions } from "@/components/internal-affairs/complaint-options"
import { ImportantInformation } from "@/components/internal-affairs/important-information"
import { InternalAffairsContact } from "@/components/internal-affairs/internal-affairs-contact"
import { InternalAffairsFaq } from "@/components/internal-affairs/internal-affairs-faq"

export const metadata: Metadata = {
  title: "Internal Affairs Unit",
  description:
    "Submit complaints, report misconduct, or contact the Internal Affairs Unit regarding Ministry services, officer integrity, and public service standards.",
}

export default function InternalAffairsPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="outline-none">
        {/* 1. Breadcrumb */}
        <Breadcrumb items={[{ label: "Internal Affairs Unit" }]} />

        {/* 2. Compact Hero */}
        {/* <InternalAffairsHero /> */}

        {/* 3. About Internal Affairs Unit */}
        {/* <InternalAffairsOverview /> */}

        {/* 4. Key Officers */}
        <InternalAffairsOfficers />

        {/* 5. Complaint & Inquiry Options */}
        {/* <ComplaintOptions /> */}

        {/* 6. Important Information */}
        {/* <ImportantInformation /> */}

        {/* 7. Contact Information & Map */}
        {/* <InternalAffairsContact /> */}

        {/* 8. FAQ Accordion */}
        {/* <InternalAffairsFaq /> */}
      </main>

      {/* 9. Footer */}
      <SiteFooter />
    </>
  )
}
