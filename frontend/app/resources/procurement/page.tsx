import type { Metadata } from "next"
import { ShoppingBag, FileText, CheckCircle2 } from "lucide-react"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Container } from "@/components/ui/container"
import { PageHero } from "@/components/ui/page-hero"

export const metadata: Metadata = {
  title: "Procurement & Tenders",
  description:
    "Access procurement opportunities, purchasing information and official notices relating to goods and services.",
}

export default function ProcurementPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb
          items={[
            { label: "Resources", href: "/resources" },
            { label: "Procurement" },
          ]}
        />

        <PageHero
          badgeIcon={ShoppingBag}
          badgeText="Ministry Procurement"
          title="Procurement &"
          highlightTitle="Tenders Notices"
          description="Access procurement opportunities, purchasing information and official notices relating to goods and services published by the Ministry."
          primaryAction={{
            label: "View Tender Notices",
            href: "#tenders",
          }}
          cardIcon={FileText}
          cardEyebrow="Transparent Purchasing"
          cardTitle="Public Procurement & Bids"
          cardDescription="All tender documents, bidding instructions, and contract award notices are published transparently in accordance with government procurement guidelines."
        />

        <section id="tenders" className="py-14 bg-slate-50">
          <Container>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm max-w-4xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Active Bids & Purchasing Notices
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                All tender documents, bidding instructions, pre-qualification requirements, and contract award notices are published transparently in accordance with government procurement guidelines.
              </p>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
