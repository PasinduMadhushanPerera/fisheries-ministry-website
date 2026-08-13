import type { Metadata } from "next"
import Link from "next/link"
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileText,
  Gavel,
  Info,
  Landmark,
  Mail,
  Scale,
  ShieldCheck,
} from "lucide-react"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Container } from "@/components/ui/container"
import { PageHero } from "@/components/ui/page-hero"

export const metadata: Metadata = {
  title: "Terms of Use - Ministry of Fisheries",
  description:
    "Read the terms governing the use of the official website of the Ministry of Fisheries, Aquatic and Ocean Resources, Sri Lanka.",
}

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Terms of Use" },
]

const sections = [
  { id: "acceptance", label: "1. Acceptance of Terms" },
  { id: "website-purpose", label: "2. Website Purpose" },
  { id: "permitted-use", label: "3. Permitted Use" },
  { id: "user-responsibilities", label: "4. User Responsibilities" },
  { id: "intellectual-property", label: "5. Intellectual Property" },
  { id: "information-accuracy", label: "6. Accuracy of Information" },
  { id: "external-links", label: "7. External Links" },
  { id: "online-services", label: "8. Online Services & Submissions" },
  { id: "disclaimer", label: "9. Legal Disclaimer" },
  { id: "liability", label: "10. Limitation of Liability" },
  { id: "changes", label: "11. Policy Revisions" },
  { id: "governing-law", label: "12. Governing Law" },
  { id: "contact", label: "13. Contact Information" },
]

export default function TermsOfUsePage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb items={breadcrumbItems} />

        {/* Standardized Hero Section */}
        <PageHero
          badgeIcon={Scale}
          badgeText="Legal Information"
          title="Terms of"
          highlightTitle="Use & Service"
          description="These terms explain the conditions that apply when accessing and using the official website and public digital services of the Ministry of Fisheries, Aquatic and Ocean Resources."
          cardIcon={ShieldCheck}
          cardEyebrow="Legal Framework"
          cardTitle="Official Website Terms"
          cardDescription="By accessing or using this website, you agree to comply with these terms, official regulations, and applicable Sri Lankan laws."
        >
          <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-slate-300 border-t border-white/10 pt-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-emerald-300" aria-hidden="true" />
              <span>Official Government Terms</span>
            </div>
            <div className="flex items-center gap-2">
              <Landmark className="h-4 w-4 text-[#388E3C]" aria-hidden="true" />
              <span>Government of Sri Lanka</span>
            </div>
          </div>
        </PageHero>

        {/* Main Section */}
        <section className="bg-white py-12 sm:py-16">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)]">
              {/* Left Sticky Navigation */}
              <aside className="hidden lg:block">
                <nav
                  aria-label="Terms of Use sections"
                  className="sticky top-24 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 shadow-2xs"
                >
                  <p className="text-xs font-extrabold uppercase tracking-wider text-[#256B29]">
                    On This Page
                  </p>

                  <ol className="mt-4 space-y-1">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="flex items-center rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-white hover:text-[#256B29]"
                        >
                          <span>{section.label}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>

              {/* Right Content Stream */}
              <div className="min-w-0">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6">
                  <div className="flex items-start gap-4">
                    <Info aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-[#256B29]" />
                    <div>
                      <h2 className="text-base font-extrabold text-slate-900">
                        About these Terms of Use
                      </h2>
                      <p className="mt-1 text-xs sm:text-sm leading-relaxed text-slate-700">
                        These terms apply to this website and its public digital services. Additional specific conditions may apply to individual licence applications, vessel registrations, or online portal submissions.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 space-y-12">
                  <section id="acceptance" aria-labelledby="acceptance-heading" className="scroll-mt-28">
                    <h2 id="acceptance-heading" className="text-2xl font-extrabold tracking-tight text-slate-900">
                      1. Acceptance of Terms
                    </h2>
                    <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-slate-700">
                      <p>
                        By accessing, browsing or using this website, you acknowledge that you have read, understood and agreed to these Terms of Use.
                      </p>
                      <p>
                        If you do not agree with any part of these terms, please discontinue use of the website and its associated online services.
                      </p>
                    </div>
                  </section>

                  <section id="website-purpose" aria-labelledby="website-purpose-heading" className="scroll-mt-28 border-t border-slate-200 pt-10">
                    <h2 id="website-purpose-heading" className="text-2xl font-extrabold tracking-tight text-slate-900">
                      2. Website Purpose
                    </h2>
                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-700">
                      This website provides official information, public services, notices, publications, policies, programmes, contact details and updates relating to fisheries, aquaculture, aquatic resources and ocean resources in Sri Lanka.
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {[
                        "Provide access to official Ministry information",
                        "Support public access to government services",
                        "Publish notices, policies and public documents",
                        "Improve communication with citizens and stakeholders",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                          <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#256B29]" />
                          <p className="text-xs font-semibold text-slate-800 leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section id="permitted-use" aria-labelledby="permitted-use-heading" className="scroll-mt-28 border-t border-slate-200 pt-10">
                    <h2 id="permitted-use-heading" className="text-2xl font-extrabold tracking-tight text-slate-900">
                      3. Permitted Use
                    </h2>
                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-700">
                      You may use this website for lawful personal, educational, professional, research and public-service purposes. You must not use the website in a way that damages, overloads, or disrupts its operation or security.
                    </p>
                  </section>

                  <section id="user-responsibilities" aria-labelledby="user-responsibilities-heading" className="scroll-mt-28 border-t border-slate-200 pt-10">
                    <h2 id="user-responsibilities-heading" className="text-2xl font-extrabold tracking-tight text-slate-900">
                      4. User Responsibilities
                    </h2>
                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-700">
                      When submitting information through online services or contact forms, you are responsible for ensuring that all provided details are accurate, complete and lawful.
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {[
                        "Do not provide false, misleading or fraudulent information.",
                        "Do not attempt to gain unauthorized access to protected systems or databases.",
                        "Do not upload malicious software, harmful code or unlawful content.",
                        "Do not impersonate another person, commercial entity or government officer.",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#256B29]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section id="intellectual-property" aria-labelledby="intellectual-property-heading" className="scroll-mt-28 border-t border-slate-200 pt-10">
                    <h2 id="intellectual-property-heading" className="text-2xl font-extrabold tracking-tight text-slate-900">
                      5. Intellectual Property
                    </h2>
                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-700">
                      Unless otherwise stated, all content, marks, logos, photographs, documents, and databases published on this portal are owned by or licensed to the Government of Sri Lanka and the Ministry of Fisheries.
                    </p>
                  </section>

                  <section id="information-accuracy" aria-labelledby="information-accuracy-heading" className="scroll-mt-28 border-t border-slate-200 pt-10">
                    <h2 id="information-accuracy-heading" className="text-2xl font-extrabold tracking-tight text-slate-900">
                      6. Accuracy of Information
                    </h2>
                    <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/70 p-5 flex items-start gap-4">
                      <AlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        While the Ministry maintains accurate and current information, users should verify important application deadlines, eligibility criteria, and fee schedules against official published Gazettes or responsible Ministry divisions.
                      </p>
                    </div>
                  </section>

                  <section id="governing-law" aria-labelledby="governing-law-heading" className="scroll-mt-28 border-t border-slate-200 pt-10">
                    <h2 id="governing-law-heading" className="text-2xl font-extrabold tracking-tight text-slate-900">
                      12. Governing Law
                    </h2>
                    <div className="mt-4 rounded-2xl bg-gradient-to-br from-[#061d24] via-[#0a322f] to-[#0a4350] p-6 text-white shadow-lg">
                      <Gavel aria-hidden="true" className="h-8 w-8 text-emerald-300" />
                      <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-200">
                        These Terms of Use are governed by and interpreted in accordance with the laws of the Democratic Socialist Republic of Sri Lanka. Any disputes relating to this website shall be subject to the exclusive jurisdiction of the competent courts of Sri Lanka.
                      </p>
                    </div>
                  </section>

                  <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-28 border-t border-slate-200 pt-10">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#256B29]">
                      Public Assistance
                    </span>
                    <h2 id="contact-heading" className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
                      13. Contact Information
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600">
                      For questions regarding these Terms of Use or website policies, please reach out through our official contact portal:
                    </p>

                    <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-base font-extrabold text-[#0B3D3A]">Ministry Information Desk</h3>
                        <p className="text-xs text-slate-600 mt-1">Email: info@fisheries.gov.lk • Tel: +94 112 327 060</p>
                      </div>
                      <Link
                        href="/contact"
                        className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-xl bg-[#388E3C] px-5 text-xs font-extrabold text-white transition hover:bg-[#256B29]"
                      >
                        <Mail className="h-4 w-4" aria-hidden="true" />
                        <span>Go to Contact Page</span>
                      </Link>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Related Policies */}
        <section aria-labelledby="related-legal-pages-heading" className="border-t border-slate-200 bg-slate-50 py-12">
          <Container>
            <div className="max-w-3xl">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#256B29]">
                Related Policies
              </span>
              <h2 id="related-legal-pages-heading" className="mt-1 text-2xl font-extrabold text-slate-900">
                Policies and Website Standards
              </h2>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Link
                href="/privacy"
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs transition hover:border-slate-300 hover:shadow-md"
              >
                <ShieldCheck className="h-7 w-7 text-[#256B29]" aria-hidden="true" />
                <h3 className="mt-3 text-lg font-extrabold text-slate-900 group-hover:text-[#388E3C]">
                  Privacy Policy
                </h3>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Learn how personal information is collected, used, stored, and protected by the Ministry.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-extrabold text-[#256B29]">
                  <span>Read Privacy Policy</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>

              <Link
                href="/accessibility"
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs transition hover:border-slate-300 hover:shadow-md"
              >
                <CheckCircle2 className="h-7 w-7 text-[#256B29]" aria-hidden="true" />
                <h3 className="mt-3 text-lg font-extrabold text-slate-900 group-hover:text-[#388E3C]">
                  Accessibility Statement
                </h3>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Read about our commitment to accessible and inclusive digital government services.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-extrabold text-[#256B29]">
                  <span>Read Accessibility Statement</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}