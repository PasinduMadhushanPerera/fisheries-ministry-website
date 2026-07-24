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

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Read the terms governing the use of the official website of the Ministry of Fisheries, Aquatic and Ocean Resources, Sri Lanka.",
}

const breadcrumbItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Terms of Use",
  },
]

const sections = [
  {
    id: "acceptance",
    label: "Acceptance of Terms",
  },
  {
    id: "website-purpose",
    label: "Website Purpose",
  },
  {
    id: "permitted-use",
    label: "Permitted Use",
  },
  {
    id: "user-responsibilities",
    label: "User Responsibilities",
  },
  {
    id: "intellectual-property",
    label: "Intellectual Property",
  },
  {
    id: "information-accuracy",
    label: "Accuracy of Information",
  },
  {
    id: "external-links",
    label: "External Links",
  },
  {
    id: "online-services",
    label: "Online Services",
  },
  {
    id: "disclaimer",
    label: "Disclaimer",
  },
  {
    id: "liability",
    label: "Limitation of Liability",
  },
  {
    id: "changes",
    label: "Changes to These Terms",
  },
  {
    id: "governing-law",
    label: "Governing Law",
  },
  {
    id: "contact",
    label: "Contact Information",
  },
]

export default function TermsOfUsePage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content">
        <Breadcrumb items={breadcrumbItems} />

        <section
          aria-labelledby="terms-heading"
          className="relative isolate overflow-hidden bg-[#061d24] text-white"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,197,94,0.18),transparent_34%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,0.22),transparent_38%),linear-gradient(135deg,#061d24_0%,#0a322f_50%,#0a4350_100%)]"
          />

          <div
            aria-hidden="true"
            className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full border border-white/10 bg-white/[0.03]"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-52 -left-24 h-[32rem] w-[32rem] rounded-full border border-green-200/10 bg-green-300/[0.03]"
          />

          <svg
            aria-hidden="true"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-0 h-40 w-full text-white/[0.05]"
          >
            <path
              fill="currentColor"
              d="M0,192L60,186.7C120,181,240,171,360,170.7C480,171,600,181,720,186.7C840,192,960,192,1080,176C1200,160,1320,128,1380,112L1440,96L1440,320L0,320Z"
            />
          </svg>

          <Container className="relative z-10 py-16 sm:py-20 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md">
                  <Scale
                    aria-hidden="true"
                    className="h-4 w-4 text-green-200"
                  />
                  Legal Information
                </div>

                <h1
                  id="terms-heading"
                  className="mt-7 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
                >
                  Terms of
                  <span className="block bg-gradient-to-r from-green-200 via-cyan-200 to-sky-200 bg-clip-text text-transparent">
                    Use
                  </span>
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
                  These terms explain the conditions that apply when accessing
                  and using the official website of the Ministry of Fisheries,
                  Aquatic and Ocean Resources.
                </p>

                <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <FileText
                      aria-hidden="true"
                      className="h-5 w-5 text-green-200"
                    />
                    Official website terms
                  </div>

                  <div className="flex items-center gap-2">
                    <Landmark
                      aria-hidden="true"
                      className="h-5 w-5 text-green-200"
                    />
                    Government of Sri Lanka
                  </div>
                </div>
              </div>

              <aside className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
                <ShieldCheck
                  aria-hidden="true"
                  className="h-10 w-10 text-green-200"
                />

                <p className="mt-5 text-sm font-bold uppercase tracking-[0.15em] text-green-200">
                  Important information
                </p>

                <p className="mt-3 leading-7 text-slate-200">
                  By continuing to use this website, you agree to comply with
                  these terms and all applicable laws and regulations.
                </p>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-sm text-slate-300">Last updated</p>

                  <p className="mt-1 font-semibold text-white">
                    24 July 2026
                  </p>
                </div>
              </aside>
            </div>
          </Container>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[18rem_minmax(0,1fr)]">
              <aside>
                <nav
                  aria-label="Terms of Use sections"
                  className="sticky top-28 rounded-3xl border border-slate-200 bg-slate-50 p-6"
                >
                  <p className="text-sm font-bold uppercase tracking-[0.15em] text-green-700">
                    On this page
                  </p>

                  <ol className="mt-5 space-y-1">
                    {sections.map((section, index) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="group flex items-start gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                        >
                          <span className="mt-0.5 text-xs font-bold text-slate-400 group-hover:text-green-700">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span>{section.label}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>

              <div className="min-w-0">
                <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
                  <div className="flex items-start gap-4">
                    <Info
                      aria-hidden="true"
                      className="mt-0.5 h-6 w-6 shrink-0 text-blue-700"
                    />

                    <div>
                      <h2 className="text-lg font-bold text-slate-950">
                        About these terms
                      </h2>

                      <p className="mt-2 leading-7 text-slate-700">
                        These terms apply to this website and its public digital
                        services. Additional conditions may apply to specific
                        applications, licences, registrations, payments or
                        online submissions.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 space-y-14">
                  <section
                    id="acceptance"
                    aria-labelledby="acceptance-heading"
                    className="scroll-mt-32"
                  >
                    <h2
                      id="acceptance-heading"
                      className="text-3xl font-bold tracking-tight text-slate-950"
                    >
                      1. Acceptance of Terms
                    </h2>

                    <div className="mt-5 space-y-4 leading-8 text-slate-700">
                      <p>
                        By accessing, browsing or using this website, you
                        acknowledge that you have read, understood and agreed
                        to these Terms of Use.
                      </p>

                      <p>
                        Where you do not agree with any part of these terms,
                        you should discontinue use of the website and its
                        associated online services.
                      </p>
                    </div>
                  </section>

                  <section
                    id="website-purpose"
                    aria-labelledby="website-purpose-heading"
                    className="scroll-mt-32 border-t border-slate-200 pt-12"
                  >
                    <h2
                      id="website-purpose-heading"
                      className="text-3xl font-bold tracking-tight text-slate-950"
                    >
                      2. Website Purpose
                    </h2>

                    <p className="mt-5 leading-8 text-slate-700">
                      This website provides official information, public
                      services, notices, publications, policies, programmes,
                      contact details and updates relating to fisheries,
                      aquaculture, aquatic resources and ocean resources in Sri
                      Lanka.
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {[
                        "Provide access to official Ministry information",
                        "Support public access to government services",
                        "Publish notices, policies and public documents",
                        "Improve communication with citizens and stakeholders",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                        >
                          <CheckCircle2
                            aria-hidden="true"
                            className="mt-0.5 h-5 w-5 shrink-0 text-green-700"
                          />

                          <p className="font-medium leading-7 text-slate-700">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section
                    id="permitted-use"
                    aria-labelledby="permitted-use-heading"
                    className="scroll-mt-32 border-t border-slate-200 pt-12"
                  >
                    <h2
                      id="permitted-use-heading"
                      className="text-3xl font-bold tracking-tight text-slate-950"
                    >
                      3. Permitted Use
                    </h2>

                    <p className="mt-5 leading-8 text-slate-700">
                      You may use this website for lawful personal,
                      educational, professional, research and public-service
                      purposes.
                    </p>

                    <p className="mt-4 leading-8 text-slate-700">
                      You must not use the website in a way that damages,
                      disables, overloads, disrupts or interferes with its
                      operation, security or availability.
                    </p>
                  </section>

                  <section
                    id="user-responsibilities"
                    aria-labelledby="user-responsibilities-heading"
                    className="scroll-mt-32 border-t border-slate-200 pt-12"
                  >
                    <h2
                      id="user-responsibilities-heading"
                      className="text-3xl font-bold tracking-tight text-slate-950"
                    >
                      4. User Responsibilities
                    </h2>

                    <p className="mt-5 leading-8 text-slate-700">
                      When using this website or submitting information through
                      an online service, you are responsible for ensuring that
                      the information you provide is accurate, complete and
                      lawful.
                    </p>

                    <ul className="mt-6 space-y-3">
                      {[
                        "Do not provide false, misleading or fraudulent information.",
                        "Do not attempt to gain unauthorised access to protected systems or data.",
                        "Do not upload malicious software, harmful code or unlawful content.",
                        "Do not impersonate another person, organisation or government officer.",
                        "Follow any additional instructions applicable to a specific service.",
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 leading-7 text-slate-700"
                        >
                          <CheckCircle2
                            aria-hidden="true"
                            className="mt-1 h-5 w-5 shrink-0 text-green-700"
                          />

                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section
                    id="intellectual-property"
                    aria-labelledby="intellectual-property-heading"
                    className="scroll-mt-32 border-t border-slate-200 pt-12"
                  >
                    <h2
                      id="intellectual-property-heading"
                      className="text-3xl font-bold tracking-tight text-slate-950"
                    >
                      5. Intellectual Property
                    </h2>

                    <p className="mt-5 leading-8 text-slate-700">
                      Unless otherwise stated, the text, graphics, government
                      marks, logos, photographs, documents, databases and other
                      materials published on this website are owned by, licensed
                      to or used with permission by the Government of Sri Lanka
                      or the Ministry.
                    </p>

                    <p className="mt-4 leading-8 text-slate-700">
                      Content may be quoted or reproduced for non-commercial,
                      educational or informational purposes where the source is
                      clearly acknowledged and the material is not altered in a
                      misleading manner.
                    </p>

                    <p className="mt-4 leading-8 text-slate-700">
                      Separate permission may be required for commercial use,
                      official emblems, third-party materials, photographs,
                      maps, datasets or content subject to specific licence
                      conditions.
                    </p>
                  </section>

                  <section
                    id="information-accuracy"
                    aria-labelledby="information-accuracy-heading"
                    className="scroll-mt-32 border-t border-slate-200 pt-12"
                  >
                    <h2
                      id="information-accuracy-heading"
                      className="text-3xl font-bold tracking-tight text-slate-950"
                    >
                      6. Accuracy of Information
                    </h2>

                    <p className="mt-5 leading-8 text-slate-700">
                      The Ministry takes reasonable steps to publish accurate,
                      current and reliable information. However, information may
                      be updated, corrected, replaced or removed without prior
                      notice.
                    </p>

                    <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                      <div className="flex items-start gap-4">
                        <AlertTriangle
                          aria-hidden="true"
                          className="mt-0.5 h-6 w-6 shrink-0 text-amber-700"
                        />

                        <p className="leading-7 text-slate-700">
                          Users should verify important deadlines, eligibility
                          requirements, fees, legal obligations and application
                          instructions using the relevant official notice,
                          document or responsible Ministry division.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section
                    id="external-links"
                    aria-labelledby="external-links-heading"
                    className="scroll-mt-32 border-t border-slate-200 pt-12"
                  >
                    <h2
                      id="external-links-heading"
                      className="text-3xl font-bold tracking-tight text-slate-950"
                    >
                      7. External Links
                    </h2>

                    <p className="mt-5 leading-8 text-slate-700">
                      This website may contain links to other government
                      websites, statutory bodies, international organisations
                      and third-party services.
                    </p>

                    <p className="mt-4 leading-8 text-slate-700">
                      External links are provided for convenience and reference.
                      The Ministry does not control all external websites and is
                      not responsible for their availability, security,
                      accuracy, privacy practices or content.
                    </p>

                    <a
                      href="https://www.gov.lk/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 font-semibold text-green-700 transition hover:text-green-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                    >
                      Visit the Government of Sri Lanka portal

                      <ExternalLink
                        aria-hidden="true"
                        className="h-4 w-4"
                      />

                      <span className="visually-hidden">
                        opens in a new tab
                      </span>
                    </a>
                  </section>

                  <section
                    id="online-services"
                    aria-labelledby="online-services-heading"
                    className="scroll-mt-32 border-t border-slate-200 pt-12"
                  >
                    <h2
                      id="online-services-heading"
                      className="text-3xl font-bold tracking-tight text-slate-950"
                    >
                      8. Online Services and Submissions
                    </h2>

                    <p className="mt-5 leading-8 text-slate-700">
                      Certain online services may require users to submit
                      personal, business, licensing or application information.
                      Additional terms, declarations or eligibility conditions
                      may apply to those services.
                    </p>

                    <p className="mt-4 leading-8 text-slate-700">
                      Submission of an online form does not automatically
                      guarantee approval, registration, licensing, payment
                      confirmation or entitlement to a government service.
                    </p>
                  </section>

                  <section
                    id="disclaimer"
                    aria-labelledby="disclaimer-heading"
                    className="scroll-mt-32 border-t border-slate-200 pt-12"
                  >
                    <h2
                      id="disclaimer-heading"
                      className="text-3xl font-bold tracking-tight text-slate-950"
                    >
                      9. Disclaimer
                    </h2>

                    <p className="mt-5 leading-8 text-slate-700">
                      This website and its content are provided for general
                      information and public-service purposes. Website content
                      should not be treated as a substitute for legislation,
                      regulations, official circulars, gazette notifications,
                      professional advice or formal decisions of the Ministry.
                    </p>

                    <p className="mt-4 leading-8 text-slate-700">
                      Where website information differs from an applicable law,
                      regulation, gazette, official notice or formally issued
                      document, the authoritative legal or official document
                      will prevail.
                    </p>
                  </section>

                  <section
                    id="liability"
                    aria-labelledby="liability-heading"
                    className="scroll-mt-32 border-t border-slate-200 pt-12"
                  >
                    <h2
                      id="liability-heading"
                      className="text-3xl font-bold tracking-tight text-slate-950"
                    >
                      10. Limitation of Liability
                    </h2>

                    <p className="mt-5 leading-8 text-slate-700">
                      To the extent permitted by law, the Ministry will not be
                      liable for loss, damage, delay, inconvenience or expense
                      arising from use of this website, temporary
                      unavailability, transmission errors, security incidents,
                      reliance on website content or use of external links.
                    </p>

                    <p className="mt-4 leading-8 text-slate-700">
                      Nothing in these terms excludes responsibilities or
                      liabilities that cannot lawfully be excluded under the
                      laws of Sri Lanka.
                    </p>
                  </section>

                  <section
                    id="changes"
                    aria-labelledby="changes-heading"
                    className="scroll-mt-32 border-t border-slate-200 pt-12"
                  >
                    <h2
                      id="changes-heading"
                      className="text-3xl font-bold tracking-tight text-slate-950"
                    >
                      11. Changes to These Terms
                    </h2>

                    <p className="mt-5 leading-8 text-slate-700">
                      The Ministry may revise these Terms of Use when website
                      services, legal requirements, technologies or government
                      policies change.
                    </p>

                    <p className="mt-4 leading-8 text-slate-700">
                      The updated version will be published on this page with a
                      revised last-updated date. Continued use of the website
                      after publication of changes constitutes acceptance of
                      the updated terms.
                    </p>
                  </section>

                  <section
                    id="governing-law"
                    aria-labelledby="governing-law-heading"
                    className="scroll-mt-32 border-t border-slate-200 pt-12"
                  >
                    <h2
                      id="governing-law-heading"
                      className="text-3xl font-bold tracking-tight text-slate-950"
                    >
                      12. Governing Law
                    </h2>

                    <div className="mt-6 rounded-3xl bg-[linear-gradient(145deg,#071d24_0%,#0a322f_55%,#0a4350_100%)] p-7 text-white shadow-xl">
                      <Gavel
                        aria-hidden="true"
                        className="h-9 w-9 text-green-200"
                      />

                      <p className="mt-5 leading-8 text-slate-200">
                        These Terms of Use are governed by and interpreted in
                        accordance with the laws of the Democratic Socialist
                        Republic of Sri Lanka. Any dispute relating to use of
                        this website will be subject to the jurisdiction of the
                        competent courts of Sri Lanka.
                      </p>
                    </div>
                  </section>

                  <section
                    id="contact"
                    aria-labelledby="contact-heading"
                    className="scroll-mt-32 border-t border-slate-200 pt-12"
                  >
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                      Questions and assistance
                    </p>

                    <h2
                      id="contact-heading"
                      className="mt-3 text-3xl font-bold tracking-tight text-slate-950"
                    >
                      13. Contact Information
                    </h2>

                    <p className="mt-5 max-w-3xl leading-8 text-slate-700">
                      For questions regarding these Terms of Use, website
                      content or use of Ministry digital services, contact the
                      Ministry through its official communication channels.
                    </p>

                    <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
                      <div className="grid md:grid-cols-[0.8fr_1.2fr]">
                        <div className="bg-[linear-gradient(145deg,#071d24_0%,#0a322f_55%,#0a4350_100%)] p-7 text-white sm:p-8">
                          <Landmark
                            aria-hidden="true"
                            className="h-10 w-10 text-green-200"
                          />

                          <h3 className="mt-5 text-2xl font-bold">
                            Ministry of Fisheries, Aquatic and Ocean Resources
                          </h3>

                          <p className="mt-4 leading-7 text-slate-300">
                            Government of Sri Lanka
                          </p>
                        </div>

                        <div className="p-7 sm:p-8">
                          <div className="flex items-start gap-4">
                            <Mail
                              aria-hidden="true"
                              className="mt-0.5 h-6 w-6 shrink-0 text-green-700"
                            />

                            <div>
                              <p className="font-bold text-slate-950">
                                Contact the Ministry
                              </p>

                              <p className="mt-2 leading-7 text-slate-600">
                                Use the official contact page for enquiries,
                                feedback and assistance.
                              </p>

                              <Link
                                href="/contact"
                                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                              >
                                Go to contact page

                                <ArrowRight
                                  aria-hidden="true"
                                  className="h-5 w-5"
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section
          aria-labelledby="related-legal-pages-heading"
          className="border-t border-slate-200 bg-slate-50 py-16"
        >
          <Container>
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                Related information
              </p>

              <h2
                id="related-legal-pages-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-slate-950"
              >
                Policies and Website Standards
              </h2>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <Link
                href="/privacy"
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
              >
                <ShieldCheck
                  aria-hidden="true"
                  className="h-8 w-8 text-green-700"
                />

                <h3 className="mt-5 text-2xl font-bold text-slate-950 group-hover:text-green-800">
                  Privacy Policy
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Learn how personal information is collected, used, stored and
                  protected.
                </p>

                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-green-700">
                  Read privacy policy

                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>

              <Link
                href="/accessibility"
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
              >
                <CheckCircle2
                  aria-hidden="true"
                  className="h-8 w-8 text-green-700"
                />

                <h3 className="mt-5 text-2xl font-bold text-slate-950 group-hover:text-green-800">
                  Accessibility Statement
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Read about our commitment to accessible and inclusive digital
                  government services.
                </p>

                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-green-700">
                  Read accessibility statement

                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
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