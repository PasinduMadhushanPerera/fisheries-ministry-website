import type { Metadata } from "next"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import {
  ArrowRight,
  CheckCircle2,
  Cookie,
  Database,
  Eye,
  FileLock2,
  Globe,
  Info,
  Landmark,
  Lock,
  Mail,
  ShieldCheck,
  UserCheck,
} from "lucide-react"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Container } from "@/components/ui/container"
import { PageHero } from "@/components/ui/page-hero"

export const metadata: Metadata = {
  title: "Privacy Policy - Ministry of Fisheries",
  description:
    "Learn how the Ministry of Fisheries, Aquatic and Ocean Resources collects, uses, protects and manages personal information through this website.",
}

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Privacy Policy" },
]

const sections = [
  { id: "overview", label: "1. Overview" },
  { id: "information", label: "2. Information We Collect" },
  { id: "usage", label: "3. How Information is Used" },
  { id: "sharing", label: "4. Information Sharing" },
  { id: "security", label: "5. Information Security" },
  { id: "cookies", label: "6. Cookies Policy" },
  { id: "retention", label: "7. Data Retention" },
  { id: "rights", label: "8. Your Privacy Rights" },
  { id: "changes", label: "9. Policy Revisions" },
  { id: "contact", label: "10. Contact Us" },
]

type InformationType = {
  title: string
  description: string
  icon: LucideIcon
}

const informationTypes: InformationType[] = [
  {
    title: "Personal Information",
    description: "Names, NIC numbers, or contact details provided through Ministry service applications.",
    icon: UserCheck,
  },
  {
    title: "Contact Details",
    description: "Email addresses, telephone numbers, postal addresses and preferred communication channels.",
    icon: Mail,
  },
  {
    title: "Technical Usage Data",
    description: "Browser type, device IP, page views, and analytical session data to optimize website performance.",
    icon: Globe,
  },
  {
    title: "Application Submissions",
    description: "Registration forms, permit applications, public inquiries, and online service submissions.",
    icon: Database,
  },
]

const informationUses = [
  "Provide official government information and public services",
  "Process licensing applications, vessel registrations and permits",
  "Respond to public inquiries, grievances and feedback",
  "Improve website usability, performance and accessibility",
  "Maintain system security and prevent unauthorized activity",
  "Fulfill statutory, administrative and legal obligations",
]

const userRights = [
  {
    title: "Access Records",
    description: "Request details regarding personal data held by the Ministry under RTI and privacy frameworks.",
  },
  {
    title: "Request Corrections",
    description: "Submit correction requests for inaccurate, outdated, or incomplete personal details.",
  },
  {
    title: "Inquire on Usage",
    description: "Contact our data protection desk regarding how personal information is handled.",
  },
  {
    title: "Submit Grievances",
    description: "Report privacy concerns or provide feedback regarding digital service data practices.",
  },
]

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb items={breadcrumbItems} />

        {/* Standardized Hero Section */}
        <PageHero
          badgeIcon={ShieldCheck}
          badgeText="Data Protection"
          title="Privacy & Data"
          highlightTitle="Protection Policy"
          description="The Ministry is committed to protecting personal information, maintaining public trust, and safeguarding privacy when delivering digital information and government services."
          cardIcon={FileLock2}
          cardEyebrow="Privacy Guarantee"
          cardTitle="Responsible Data Handling"
          cardDescription="This policy explains how personal information is collected, used, shared, retained and protected across all official Ministry web services."
        >
          <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-slate-300 border-t border-white/10 pt-4">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-emerald-300" aria-hidden="true" />
              <span>Secure Government Data</span>
            </div>
            <div className="flex items-center gap-2">
              <Landmark className="h-4 w-4 text-[#388E3C]" aria-hidden="true" />
              <span>Government of Sri Lanka</span>
            </div>
          </div>
        </PageHero>

        {/* Main Content Section */}
        <section className="bg-white py-12 sm:py-16">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)]">
              {/* Left Sticky Navigation */}
              <aside className="hidden lg:block">
                <nav
                  aria-label="Privacy Policy sections"
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
                        About this Privacy Policy
                      </h2>
                      <p className="mt-1 text-xs sm:text-sm leading-relaxed text-slate-700">
                        This policy applies to all personal information collected through this website and Ministry-operated digital portals. Specific additional privacy notices may apply to specialized portal systems.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 space-y-12">
                  <section id="overview" aria-labelledby="overview-heading" className="scroll-mt-28">
                    <h2 id="overview-heading" className="text-2xl font-extrabold tracking-tight text-slate-900">
                      1. Overview
                    </h2>
                    <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-slate-700">
                      <p>
                        This Privacy Policy outlines how personal information is gathered, managed, and protected when you visit this website, communicate with the Ministry, or utilize online services.
                      </p>
                      <p>
                        The Ministry adheres to strict data minimisation principles, collecting only information reasonably required to deliver public services and satisfy statutory obligations.
                      </p>
                    </div>
                  </section>

                  <section id="information" aria-labelledby="information-heading" className="scroll-mt-28 border-t border-slate-200 pt-10">
                    <h2 id="information-heading" className="text-2xl font-extrabold tracking-tight text-slate-900">
                      2. Information We Collect
                    </h2>
                    <p className="mt-3 text-xs sm:text-sm text-slate-700">
                      The type of data collected depends on your specific interaction with our digital services:
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {informationTypes.map((item) => {
                        const Icon = item.icon
                        return (
                          <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                            <Icon aria-hidden="true" className="h-6 w-6 text-[#256B29]" />
                            <h3 className="mt-2 text-sm font-extrabold text-slate-900">{item.title}</h3>
                            <p className="mt-1 text-xs text-slate-600 leading-relaxed">{item.description}</p>
                          </div>
                        )
                      })}
                    </div>
                  </section>

                  <section id="usage" aria-labelledby="usage-heading" className="scroll-mt-28 border-t border-slate-200 pt-10">
                    <h2 id="usage-heading" className="text-2xl font-extrabold tracking-tight text-slate-900">
                      3. How Information is Used
                    </h2>
                    <p className="mt-3 text-xs sm:text-sm text-slate-700">
                      Information gathered by the Ministry is utilized exclusively for legitimate administrative, public-service, and regulatory purposes:
                    </p>

                    <ul className="mt-4 space-y-2.5">
                      {informationUses.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#256B29]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section id="security" aria-labelledby="security-heading" className="scroll-mt-28 border-t border-slate-200 pt-10">
                    <h2 id="security-heading" className="text-2xl font-extrabold tracking-tight text-slate-900">
                      5. Information Security
                    </h2>
                    <div className="mt-4 rounded-2xl bg-gradient-to-br from-[#061d24] via-[#0a322f] to-[#0a4350] p-6 text-white shadow-lg">
                      <FileLock2 aria-hidden="true" className="h-8 w-8 text-emerald-300" />
                      <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-200">
                        Appropriate technical and organizational safeguards—including SSL encryption, secure data hosting, role-based access control, and vulnerability monitoring—are deployed to safeguard information against unauthorized access, loss, or disclosure.
                      </p>
                    </div>
                  </section>

                  <section id="cookies" aria-labelledby="cookies-heading" className="scroll-mt-28 border-t border-slate-200 pt-10">
                    <h2 id="cookies-heading" className="text-2xl font-extrabold tracking-tight text-slate-900">
                      6. Cookies & Similar Technologies
                    </h2>
                    <div className="mt-4 flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50/70 p-5">
                      <Cookie className="h-6 w-6 text-[#256B29] shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900">Essential & Functional Cookies</h3>
                        <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                          This portal uses essential cookies to preserve user preferences (such as text size, high contrast mode, and language selection). No tracking cookies are stored for commercial advertising purposes.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section id="rights" aria-labelledby="rights-heading" className="scroll-mt-28 border-t border-slate-200 pt-10">
                    <h2 id="rights-heading" className="text-2xl font-extrabold tracking-tight text-slate-900">
                      8. Your Privacy Rights
                    </h2>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      {userRights.map((item) => (
                        <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                          <Eye aria-hidden="true" className="h-5 w-5 text-[#256B29]" />
                          <h3 className="mt-2 text-sm font-extrabold text-slate-900">{item.title}</h3>
                          <p className="mt-1 text-xs text-slate-600 leading-relaxed">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-28 border-t border-slate-200 pt-10">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#256B29]">
                      Privacy Assistance
                    </span>
                    <h2 id="contact-heading" className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
                      10. Contact the Ministry
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600">
                      For privacy inquiries, data access requests, or to report a data protection concern, please contact our team:
                    </p>

                    <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-base font-extrabold text-[#0B3D3A]">Ministry Privacy Desk</h3>
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
        <section aria-labelledby="related-policy-pages-heading" className="border-t border-slate-200 bg-slate-50 py-12">
          <Container>
            <div className="max-w-3xl">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#256B29]">
                Related Policies
              </span>
              <h2 id="related-policy-pages-heading" className="mt-1 text-2xl font-extrabold text-slate-900">
                Website Policies and Standards
              </h2>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Link
                href="/terms-of-use"
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs transition hover:border-slate-300 hover:shadow-md"
              >
                <Landmark className="h-7 w-7 text-[#256B29]" aria-hidden="true" />
                <h3 className="mt-3 text-lg font-extrabold text-slate-900 group-hover:text-[#388E3C]">
                  Terms of Use
                </h3>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Read the conditions governing access to and use of this website.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-extrabold text-[#256B29]">
                  <span>Read Terms of Use</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>

              <Link
                href="/accessibility"
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs transition hover:border-slate-300 hover:shadow-md"
              >
                <ShieldCheck className="h-7 w-7 text-[#256B29]" aria-hidden="true" />
                <h3 className="mt-3 text-lg font-extrabold text-slate-900 group-hover:text-[#388E3C]">
                  Accessibility Statement
                </h3>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Learn about the Ministry&apos;s commitment to accessible and inclusive digital services.
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