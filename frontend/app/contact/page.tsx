import type { Metadata } from "next"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { ContactHero } from "@/components/contact/contact-hero"
import { DepartmentDirectory } from "@/components/contact/department-directory"
import { OfficeLocation } from "@/components/contact/office-location"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactFaq } from "@/components/contact/contact-faq"
import { CommunicationChannels } from "@/components/contact/communication-channels"

export const metadata: Metadata = {
  title: "Contact Us - Ministry of Fisheries",
  description:
    "Official contact portal of the Ministry of Fisheries. Access departmental directories, headquarters address, office map, inquiry submission form, and public FAQs.",
}

export default function ContactPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Contact Us" },
          ]}
        />

        <ContactHero />

        <DepartmentDirectory />

        <OfficeLocation />

        <ContactForm />

        <ContactFaq />

        <CommunicationChannels />
      </main>

      <SiteFooter />
    </>
  )
}