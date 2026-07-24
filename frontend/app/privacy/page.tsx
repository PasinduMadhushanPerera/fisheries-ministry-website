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

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how the Ministry of Fisheries, Aquatic and Ocean Resources collects, uses, protects and manages personal information through this website.",
}

const breadcrumbItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Privacy Policy",
  },
]

const sections = [
  {
    id: "overview",
    label: "Overview",
  },
  {
    id: "information",
    label: "Information We Collect",
  },
  {
    id: "usage",
    label: "How Information is Used",
  },
  {
    id: "sharing",
    label: "Information Sharing",
  },
  {
    id: "security",
    label: "Security",
  },
  {
    id: "cookies",
    label: "Cookies",
  },
  {
    id: "retention",
    label: "Data Retention",
  },
  {
    id: "rights",
    label: "Your Rights",
  },
  {
    id: "changes",
    label: "Policy Changes",
  },
  {
    id: "contact",
    label: "Contact",
  },
]

type InformationType = {
  title: string
  description: string
  icon: LucideIcon
}

const informationTypes: InformationType[] = [
  {
    title: "Personal information",
    description:
      "Names, identification details or other personal information provided through Ministry services.",
    icon: UserCheck,
  },
  {
    title: "Contact information",
    description:
      "Email addresses, telephone numbers, postal addresses and preferred communication details.",
    icon: Mail,
  },
  {
    title: "Website usage information",
    description:
      "Technical information such as browser type, device details, pages visited and website activity.",
    icon: Globe,
  },
  {
    title: "Application information",
    description:
      "Information submitted through applications, registrations, enquiries and other digital services.",
    icon: Database,
  },
]

const informationUses = [
  "Provide government information and public services",
  "Process applications, registrations and requests",
  "Respond to enquiries, complaints and feedback",
  "Improve website functionality and user experience",
  "Maintain website security and prevent misuse",
  "Meet legal, administrative and regulatory obligations",
]

const userRights = [
  {
    title: "Request information",
    description:
      "Ask what personal information may be held about you, subject to applicable laws and procedures.",
  },
  {
    title: "Request corrections",
    description:
      "Request correction of personal information that is inaccurate, incomplete or outdated.",
  },
  {
    title: "Contact the Ministry",
    description:
      "Ask questions about how your information is collected, used, stored or protected.",
  },
  {
    title: "Submit feedback",
    description:
      "Report privacy concerns or provide feedback about Ministry digital services.",
  },
]

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content">
        <Breadcrumb items={breadcrumbItems} />

        <section
          aria-labelledby="privacy-heading"
          className="relative isolate overflow-hidden bg-[#061d24] text-white"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.18),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,0.18),transparent_40%),linear-gradient(135deg,#061d24_0%,#0a322f_50%,#0a4350_100%)]"
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
                  <ShieldCheck
                    aria-hidden="true"
                    className="h-4 w-4 text-green-200"
                  />

                  Privacy and Data Protection
                </div>

                <h1
                  id="privacy-heading"
                  className="mt-7 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
                >
                  Privacy
                  <span className="block bg-gradient-to-r from-green-200 via-cyan-200 to-sky-200 bg-clip-text text-transparent">
                    Policy
                  </span>
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
                  The Ministry is committed to protecting personal information
                  and maintaining public trust when delivering digital
                  information and government services.
                </p>

                <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <Lock
                      aria-hidden="true"
                      className="h-5 w-5 text-green-200"
                    />

                    Responsible data handling
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
                <FileLock2
                  aria-hidden="true"
                  className="h-10 w-10 text-green-200"
                />

                <p className="mt-5 text-sm font-bold uppercase tracking-[0.15em] text-green-200">
                  Privacy commitment
                </p>

                <p className="mt-3 leading-7 text-slate-200">
                  This policy explains how information is collected, used,
                  shared, retained and protected when you use this website.
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
                  aria-label="Privacy Policy sections"
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
                        About this policy
                      </h2>

                      <p className="mt-2 leading-7 text-slate-700">
                        This policy applies to information collected through
                        this website and Ministry-operated digital services.
                        Separate privacy notices may apply to particular
                        applications, programmes or online systems.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 space-y-14">
                  <section
                    id="overview"
                    aria-labelledby="overview-heading"
                    className="scroll-mt-32"
                  >
                    <h2
                      id="overview-heading"
                      className="text-3xl font-bold tracking-tight text-slate-950"
                    >
                      1. Overview
                    </h2>

                    <div className="mt-5 space-y-4 leading-8 text-slate-700">
                      <p>
                        This Privacy Policy explains how personal information
                        may be collected and managed when you access this
                        website, contact the Ministry or use a Ministry digital
                        service.
                      </p>

                      <p>
                        The Ministry aims to collect only the information
                        reasonably required to provide services, respond to
                        requests, maintain security and meet applicable legal
                        and administrative obligations.
                      </p>
                    </div>
                  </section>

                  <section
                    id="information"
                    aria-labelledby="information-heading"
                    className="scroll-mt-32 border-t border-slate-200 pt-12"
                  >
                    <h2
                      id="information-heading"
                      className="text-3xl font-bold tracking-tight text-slate-950"
                    >
                      2. Information We Collect
                    </h2>

                    <p className="mt-5 leading-8 text-slate-700">
                      The type of information collected depends on how you
                      interact with the website and which services you use.
                    </p>

                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                      {informationTypes.map((item) => {
                        const Icon = item.icon

                        return (
                          <article
                            key={item.title}
                            className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                          >
                            <Icon
                              aria-hidden="true"
                              className="h-8 w-8 text-green-700"
                            />

                            <h3 className="mt-5 text-xl font-bold text-slate-950">
                              {item.title}
                            </h3>

                            <p className="mt-3 leading-7 text-slate-600">
                              {item.description}
                            </p>
                          </article>
                        )
                      })}
                    </div>

                    <p className="mt-6 leading-8 text-slate-700">
                      You should provide only accurate, relevant and lawful
                      information when completing forms, submitting
                      applications or contacting the Ministry.
                    </p>
                  </section>

                  <section
                    id="usage"
                    aria-labelledby="usage-heading"
                    className="scroll-mt-32 border-t border-slate-200 pt-12"
                  >
                    <h2
                      id="usage-heading"
                      className="text-3xl font-bold tracking-tight text-slate-950"
                    >
                      3. How Information is Used
                    </h2>

                    <p className="mt-5 leading-8 text-slate-700">
                      Information may be used for legitimate government,
                      administrative, operational and public-service purposes.
                    </p>

                    <ul className="mt-8 space-y-4">
                      {informationUses.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2
                            aria-hidden="true"
                            className="mt-1 h-5 w-5 shrink-0 text-green-700"
                          />

                          <span className="leading-7 text-slate-700">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section
                    id="sharing"
                    aria-labelledby="sharing-heading"
                    className="scroll-mt-32 border-t border-slate-200 pt-12"
                  >
                    <h2
                      id="sharing-heading"
                      className="text-3xl font-bold tracking-tight text-slate-950"
                    >
                      4. Information Sharing
                    </h2>

                    <div className="mt-5 space-y-4 leading-8 text-slate-700">
                      <p>
                        Personal information is not sold or rented for
                        commercial purposes.
                      </p>

                      <p>
                        Information may be shared with authorised Ministry
                        divisions, government institutions, statutory bodies,
                        service providers or law-enforcement authorities where
                        this is required to deliver a service, perform an
                        official function, protect public systems or comply
                        with applicable law.
                      </p>

                      <p>
                        Where third-party service providers process information
                        on behalf of the Ministry, reasonable measures should be
                        used to ensure that the information is handled securely
                        and only for authorised purposes.
                      </p>
                    </div>
                  </section>

                  <section
                    id="security"
                    aria-labelledby="security-heading"
                    className="scroll-mt-32 border-t border-slate-200 pt-12"
                  >
                    <h2
                      id="security-heading"
                      className="text-3xl font-bold tracking-tight text-slate-950"
                    >
                      5. Information Security
                    </h2>

                    <div className="mt-6 rounded-3xl bg-[linear-gradient(145deg,#071d24_0%,#0a322f_55%,#0a4350_100%)] p-7 text-white shadow-xl sm:p-8">
                      <FileLock2
                        aria-hidden="true"
                        className="h-10 w-10 text-green-200"
                      />

                      <p className="mt-5 leading-8 text-slate-200">
                        Appropriate technical and organisational safeguards are
                        used to help protect information against unauthorised
                        access, alteration, disclosure, loss, misuse or
                        destruction.
                      </p>
                    </div>

                    <p className="mt-6 leading-8 text-slate-700">
                      Although reasonable security measures are used, no
                      internet transmission or information system can be
                      guaranteed to be completely secure. Users should avoid
                      sending sensitive information through unsecured channels.
                    </p>
                  </section>

                  <section
                    id="cookies"
                    aria-labelledby="cookies-heading"
                    className="scroll-mt-32 border-t border-slate-200 pt-12"
                  >
                    <h2
                      id="cookies-heading"
                      className="text-3xl font-bold tracking-tight text-slate-950"
                    >
                      6. Cookies and Similar Technologies
                    </h2>

                    <div className="mt-6 flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                      <Cookie
                        aria-hidden="true"
                        className="mt-1 h-8 w-8 shrink-0 text-green-700"
                      />

                      <div>
                        <h3 className="text-xl font-bold text-slate-950">
                          Website cookies
                        </h3>

                        <p className="mt-3 leading-8 text-slate-700">
                          Cookies may be used to support essential website
                          functionality, remember user preferences, improve
                          usability, maintain security and understand general
                          website usage.
                        </p>
                      </div>
                    </div>

                    <p className="mt-5 leading-8 text-slate-700">
                      You may control or disable cookies through your browser
                      settings. Some website functions may not operate
                      correctly when essential cookies are disabled.
                    </p>
                  </section>

                  <section
                    id="retention"
                    aria-labelledby="retention-heading"
                    className="scroll-mt-32 border-t border-slate-200 pt-12"
                  >
                    <h2
                      id="retention-heading"
                      className="text-3xl font-bold tracking-tight text-slate-950"
                    >
                      7. Data Retention
                    </h2>

                    <p className="mt-5 leading-8 text-slate-700">
                      Information is retained only for as long as reasonably
                      necessary to provide services, maintain official records,
                      resolve disputes, meet administrative requirements and
                      comply with applicable laws.
                    </p>

                    <p className="mt-4 leading-8 text-slate-700">
                      Retention periods may vary depending on the type of
                      information, the service involved and applicable
                      government record-management requirements.
                    </p>
                  </section>

                  <section
                    id="rights"
                    aria-labelledby="rights-heading"
                    className="scroll-mt-32 border-t border-slate-200 pt-12"
                  >
                    <h2
                      id="rights-heading"
                      className="text-3xl font-bold tracking-tight text-slate-950"
                    >
                      8. Your Privacy Rights
                    </h2>

                    <p className="mt-5 leading-8 text-slate-700">
                      Subject to applicable laws, official procedures and
                      necessary identity verification, you may contact the
                      Ministry regarding your personal information.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                      {userRights.map((item) => (
                        <article
                          key={item.title}
                          className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                        >
                          <Eye
                            aria-hidden="true"
                            className="h-6 w-6 text-green-700"
                          />

                          <h3 className="mt-4 text-lg font-bold text-slate-950">
                            {item.title}
                          </h3>

                          <p className="mt-2 leading-7 text-slate-600">
                            {item.description}
                          </p>
                        </article>
                      ))}
                    </div>
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
                      9. Changes to This Policy
                    </h2>

                    <p className="mt-5 leading-8 text-slate-700">
                      This Privacy Policy may be updated to reflect changes to
                      legislation, government policy, technology, website
                      functions or Ministry services.
                    </p>

                    <p className="mt-4 leading-8 text-slate-700">
                      The revised policy will be published on this page with an
                      updated revision date.
                    </p>
                  </section>

                  <section
                    id="contact"
                    aria-labelledby="contact-heading"
                    className="scroll-mt-32 border-t border-slate-200 pt-12"
                  >
                    <p className="text-sm font-bold uppercase tracking-[0.15em] text-green-700">
                      Privacy assistance
                    </p>

                    <h2
                      id="contact-heading"
                      className="mt-3 text-3xl font-bold tracking-tight text-slate-950"
                    >
                      10. Contact the Ministry
                    </h2>

                    <p className="mt-5 max-w-3xl leading-8 text-slate-700">
                      Contact the Ministry if you have questions about this
                      policy, require assistance or wish to report a concern
                      about the handling of personal information.
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
                                Privacy enquiries
                              </p>

                              <p className="mt-2 leading-7 text-slate-600">
                                Use the official contact page for privacy
                                questions, requests, concerns and feedback.
                              </p>

                              <Link
                                href="/contact"
                                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                              >
                                Contact the Ministry

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
          aria-labelledby="related-policy-pages-heading"
          className="border-t border-slate-200 bg-slate-50 py-16"
        >
          <Container>
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                Related information
              </p>

              <h2
                id="related-policy-pages-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-slate-950"
              >
                Website Policies and Standards
              </h2>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <Link
                href="/terms-of-use"
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
              >
                <Landmark
                  aria-hidden="true"
                  className="h-8 w-8 text-green-700"
                />

                <h3 className="mt-5 text-2xl font-bold text-slate-950 group-hover:text-green-800">
                  Terms of Use
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Read the conditions governing access to and use of this
                  website.
                </p>

                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-green-700">
                  Read terms of use

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
                <ShieldCheck
                  aria-hidden="true"
                  className="h-8 w-8 text-green-700"
                />

                <h3 className="mt-5 text-2xl font-bold text-slate-950 group-hover:text-green-800">
                  Accessibility Statement
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Learn about the Ministry&apos;s commitment to accessible and
                  inclusive digital services.
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