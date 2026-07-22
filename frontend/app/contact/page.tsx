import type { Metadata } from "next"

import { ContactCards } from "@/components/contact/contact-cards"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactHero } from "@/components/contact/contact-hero"
import { DepartmentContacts } from "@/components/contact/department-contacts"
import { EmergencySection } from "@/components/contact/emergency-section"
import { FAQSection } from "@/components/contact/faq-section"
import { OfficeMap } from "@/components/contact/office-map"
import { SocialSection } from "@/components/contact/social-section"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

import { Breadcrumb } from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact the Ministry of Fisheries, Aquatic and Ocean Resources for general inquiries, public services, department contacts, office locations and official communication channels.",
}

export default function ContactPage() {
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
              label: "Contact",
            },
          ]}
        />

        <ContactHero />

        <ContactCards />

        <OfficeMap />

        <ContactForm />

        <DepartmentContacts />

        <EmergencySection />

        <FAQSection />

        <SocialSection />
      </main>

      <SiteFooter />
    </>
  )
}