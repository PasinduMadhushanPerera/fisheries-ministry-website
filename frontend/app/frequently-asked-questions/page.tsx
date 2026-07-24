import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  ChevronDown,
  CircleHelp,
  FileText,
  Fish,
  Landmark,
  Mail,
  MapPin,
  Search,
  ShieldCheck,
  ShipWheel,
} from "lucide-react"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Container } from "@/components/ui/container"

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers to frequently asked questions about Ministry services, fisheries, licences, applications, public information and website support.",
}

const breadcrumbItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Frequently Asked Questions",
  },
]

const faqCategories = [
  {
    id: "general",
    label: "General Information",
    icon: CircleHelp,
  },
  {
    id: "licensing",
    label: "Licences and Registration",
    icon: FileText,
  },
  {
    id: "fisheries",
    label: "Fisheries and Aquaculture",
    icon: Fish,
  },
  {
    id: "services",
    label: "Online and Public Services",
    icon: Landmark,
  },
  {
    id: "website",
    label: "Website Support",
    icon: ShieldCheck,
  },
]

const faqGroups = [
  {
    id: "general",
    title: "General Information",
    description:
      "Common questions about the Ministry, its responsibilities and public information.",
    icon: CircleHelp,
    questions: [
      {
        question:
          "What is the role of the Ministry of Fisheries, Aquatic and Ocean Resources?",
        answer:
          "The Ministry is responsible for developing, coordinating and supporting policies, programmes and public services related to fisheries, aquaculture, aquatic resources and ocean resources in Sri Lanka.",
      },
      {
        question:
          "What information can I find on this website?",
        answer:
          "The website provides Ministry news, public notices, press releases, publications, policies, services, project information, contact details, media resources and other official government information.",
      },
      {
        question:
          "How can I contact the Ministry?",
        answer:
          "You can use the official contact page to find telephone numbers, email addresses, office locations and enquiry information for the Ministry and its relevant divisions.",
      },
      {
        question:
          "Where can I find the latest Ministry notices and announcements?",
        answer:
          "Current notices, announcements, vacancies, procurement information and other public updates are published in the Media Centre and Notices sections of this website.",
      },
      {
        question:
          "Are Ministry publications available online?",
        answer:
          "Available reports, policy documents, guidelines, statistical publications and other official documents can be accessed through the Publications or Media Centre sections.",
      },
    ],
  },
  {
    id: "licensing",
    title: "Licences and Registration",
    description:
      "Information about fisheries-related licences, registrations and application requirements.",
    icon: FileText,
    questions: [
      {
        question:
          "How can I apply for a fisheries-related licence?",
        answer:
          "Application procedures depend on the type of licence required. Please review the relevant service page or contact the responsible Ministry division for the applicable form, supporting documents, fees and submission process.",
      },
      {
        question:
          "What documents are required for a licence application?",
        answer:
          "Required documents vary by licence type. They may include identification documents, vessel or business registration details, ownership records, technical information and other supporting documents specified by the responsible authority.",
      },
      {
        question:
          "Can I submit a licence application online?",
        answer:
          "Some services may support online applications or downloadable forms. Where an online service is available, instructions will be provided on the relevant service page.",
      },
      {
        question:
          "How can I check the status of an application?",
        answer:
          "Use the contact details or reference information provided when your application was submitted. Application status services may also be available through the relevant digital service.",
      },
      {
        question:
          "Does submitting an application guarantee approval?",
        answer:
          "No. Applications are reviewed according to applicable laws, regulations, eligibility requirements and administrative procedures. Additional documents or inspections may be required before a decision is made.",
      },
    ],
  },
  {
    id: "fisheries",
    title: "Fisheries and Aquaculture",
    description:
      "General guidance relating to fisheries, aquaculture and aquatic resources.",
    icon: Fish,
    questions: [
      {
        question:
          "Where can I find information about fisheries development programmes?",
        answer:
          "Information about current programmes, projects and initiatives is published in the Services, Projects, Programmes or News sections of this website.",
      },
      {
        question:
          "How can fishers obtain information about government assistance?",
        answer:
          "Available assistance programmes, eligibility conditions and application procedures are announced through official notices, service pages and responsible Ministry divisions.",
      },
      {
        question:
          "Where can I report an issue affecting fisheries or aquatic resources?",
        answer:
          "Use the official contact page to identify the appropriate Ministry division or regional office. Provide the location, nature of the issue and any relevant supporting information.",
      },
      {
        question:
          "Where can I obtain fisheries statistics or research information?",
        answer:
          "Published statistics, reports and research-related documents may be available through the Publications section or through institutions operating under the Ministry.",
      },
      {
        question:
          "How can I learn about aquaculture opportunities?",
        answer:
          "Information about aquaculture development, technical support, training, investment opportunities and applicable approvals can be obtained from the relevant Ministry division or associated institution.",
      },
    ],
  },
  {
    id: "services",
    title: "Online and Public Services",
    description:
      "Answers about accessing Ministry services, forms and public information.",
    icon: Landmark,
    questions: [
      {
        question:
          "Where can I find Ministry application forms?",
        answer:
          "Available forms can be found on the relevant service page, publication page or downloads area. Some forms may also be provided directly by the responsible Ministry division.",
      },
      {
        question:
          "Can I make payments through this website?",
        answer:
          "Online payment availability depends on the service. Only use payment facilities clearly identified as official Ministry or government services.",
      },
      {
        question:
          "How will I know whether an online submission was successful?",
        answer:
          "A successful service may display a confirmation message, reference number or email acknowledgement. Keep this information for future enquiries.",
      },
      {
        question:
          "What should I do if I submitted incorrect information?",
        answer:
          "Contact the responsible Ministry division as soon as possible and provide your application or reference number. Do not submit a duplicate application unless instructed.",
      },
      {
        question:
          "Can another person submit an application on my behalf?",
        answer:
          "This depends on the service and applicable requirements. Authorisation documents, identification or a formal declaration may be required.",
      },
    ],
  },
  {
    id: "website",
    title: "Website and Accessibility Support",
    description:
      "Help with using this website, accessing documents and reporting technical issues.",
    icon: ShieldCheck,
    questions: [
      {
        question:
          "What should I do if a page or online service is not working?",
        answer:
          "Refresh the page, check your internet connection and try a current version of a supported browser. If the problem continues, report it through the contact page with the page address, device and browser used.",
      },
      {
        question:
          "How can I search for information on the website?",
        answer:
          "Use the website search function and enter a service name, document title, subject, programme or other relevant keyword.",
      },
      {
        question:
          "Can I use the website with a keyboard or screen reader?",
        answer:
          "The website is designed to support keyboard navigation, semantic page structure, accessible labels and assistive technologies. More information is available in the Accessibility Statement.",
      },
      {
        question:
          "What should I do if I cannot access a PDF or document?",
        answer:
          "Report the document through the contact page and request an accessible or alternative format. Include the document title and the page where it appears.",
      },
      {
        question:
          "Is this website available in Sinhala, Tamil and English?",
        answer:
          "The Ministry aims to provide important public information in Sinhala, Tamil and English where translations are available. Language availability may vary by page or document.",
      },
    ],
  },
]

export default function FrequentlyAskedQuestionsPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content">
        <Breadcrumb items={breadcrumbItems} />

        <section
          aria-labelledby="faq-heading"
          className="relative isolate overflow-hidden bg-[#061d24] text-white"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,197,94,0.2),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,0.22),transparent_40%),linear-gradient(135deg,#061d24_0%,#0a322f_50%,#0a4350_100%)]"
          />

          <div
            aria-hidden="true"
            className="absolute -right-44 -top-44 h-[36rem] w-[36rem] rounded-full border border-white/10 bg-white/[0.03]"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-52 -left-20 h-[32rem] w-[32rem] rounded-full border border-green-200/10 bg-green-300/[0.03]"
          />

          <svg
            aria-hidden="true"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-0 h-40 w-full text-white/[0.05]"
          >
            <path
              fill="currentColor"
              d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,202.7C840,203,960,181,1080,165.3C1200,149,1320,139,1380,133.3L1440,128L1440,320L0,320Z"
            />
          </svg>

          <Container className="relative z-10 py-16 sm:py-20 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md">
                  <CircleHelp
                    aria-hidden="true"
                    className="h-4 w-4 text-green-200"
                  />

                  Public Information and Support
                </div>

                <h1
                  id="faq-heading"
                  className="mt-7 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
                >
                  Frequently Asked
                  <span className="block bg-gradient-to-r from-green-200 via-cyan-200 to-sky-200 bg-clip-text text-transparent">
                    Questions
                  </span>
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
                  Find answers to common questions about Ministry information,
                  fisheries services, applications, licences and website
                  support.
                </p>

                <form
                  role="search"
                  action="/search"
                  method="get"
                  className="mt-8 flex max-w-2xl overflow-hidden rounded-xl border border-white/20 bg-white shadow-2xl"
                >
                  <label
                    htmlFor="faq-search"
                    className="visually-hidden"
                  >
                    Search frequently asked questions
                  </label>

                  <input
                    id="faq-search"
                    name="q"
                    type="search"
                    maxLength={100}
                    autoComplete="off"
                    placeholder="Search the website for an answer"
                    className="min-h-14 min-w-0 flex-1 border-0 px-5 text-base text-slate-950 outline-none placeholder:text-slate-500"
                  />

                  <button
                    type="submit"
                    aria-label="Search the website"
                    className="inline-flex min-h-14 min-w-14 items-center justify-center bg-green-700 px-5 text-white transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-green-200"
                  >
                    <Search
                      aria-hidden="true"
                      className="h-5 w-5"
                    />

                    <span className="ml-2 hidden font-semibold sm:inline">
                      Search
                    </span>
                  </button>
                </form>
              </div>

              <aside className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
                <ShipWheel
                  aria-hidden="true"
                  className="h-10 w-10 text-green-200"
                />

                <p className="mt-5 text-sm font-bold uppercase tracking-[0.15em] text-green-200">
                  Need more help?
                </p>

                <p className="mt-3 leading-7 text-slate-200">
                  Contact the Ministry when you cannot find the information or
                  service you require.
                </p>

                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white hover:text-slate-950 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
                >
                  Contact the Ministry

                  <ArrowRight
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                </Link>
              </aside>
            </div>
          </Container>
        </section>

        <section
          aria-labelledby="faq-categories-heading"
          className="border-b border-slate-200 bg-slate-50 py-12"
        >
          <Container>
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                Browse by subject
              </p>

              <h2
                id="faq-categories-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-slate-950"
              >
                FAQ Categories
              </h2>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {faqCategories.map((category) => {
                const Icon = category.icon

                return (
                  <a
                    key={category.id}
                    href={`#${category.id}`}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-green-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                  >
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700 transition group-hover:bg-green-700 group-hover:text-white">
                      <Icon
                        aria-hidden="true"
                        className="h-5 w-5"
                      />
                    </div>

                    <p className="mt-4 font-bold leading-6 text-slate-950 group-hover:text-green-800">
                      {category.label}
                    </p>
                  </a>
                )
              })}
            </div>
          </Container>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[18rem_minmax(0,1fr)]">
              <aside>
                <nav
                  aria-label="Frequently asked question categories"
                  className="sticky top-28 rounded-3xl border border-slate-200 bg-slate-50 p-6"
                >
                  <p className="text-sm font-bold uppercase tracking-[0.15em] text-green-700">
                    On this page
                  </p>

                  <ol className="mt-5 space-y-1">
                    {faqGroups.map((group, index) => (
                      <li key={group.id}>
                        <a
                          href={`#${group.id}`}
                          className="group flex items-start gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                        >
                          <span className="mt-0.5 text-xs font-bold text-slate-400 group-hover:text-green-700">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span>{group.title}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>

              <div className="min-w-0 space-y-16">
                {faqGroups.map((group, groupIndex) => {
                  const Icon = group.icon

                  return (
                    <section
                      key={group.id}
                      id={group.id}
                      aria-labelledby={`${group.id}-heading`}
                      className={`scroll-mt-32 ${
                        groupIndex > 0
                          ? "border-t border-slate-200 pt-14"
                          : ""
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                          <Icon
                            aria-hidden="true"
                            className="h-6 w-6"
                          />
                        </div>

                        <div>
                          <p className="text-sm font-bold uppercase tracking-[0.15em] text-green-700">
                            Category {groupIndex + 1}
                          </p>

                          <h2
                            id={`${group.id}-heading`}
                            className="mt-2 text-3xl font-bold tracking-tight text-slate-950"
                          >
                            {group.title}
                          </h2>

                          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                            {group.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-8 space-y-4">
                        {group.questions.map((faq, questionIndex) => (
                          <details
                            key={faq.question}
                            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition open:border-green-300 open:shadow-lg"
                          >
                            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 font-bold text-slate-950 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-green-200 sm:px-6">
                              <span className="flex items-start gap-4">
                                <span className="mt-0.5 text-sm font-bold text-green-700">
                                  {String(questionIndex + 1).padStart(2, "0")}
                                </span>

                                <span>{faq.question}</span>
                              </span>

                              <ChevronDown
                                aria-hidden="true"
                                className="h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 group-open:rotate-180"
                              />
                            </summary>

                            <div className="border-t border-slate-200 bg-slate-50 px-5 py-5 sm:px-6">
                              <p className="leading-8 text-slate-700">
                                {faq.answer}
                              </p>
                            </div>
                          </details>
                        ))}
                      </div>
                    </section>
                  )
                })}
              </div>
            </div>
          </Container>
        </section>

        <section
          aria-labelledby="faq-contact-heading"
          className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20"
        >
          <Container>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
              <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
                <div className="relative isolate overflow-hidden bg-[linear-gradient(145deg,#071d24_0%,#0a322f_55%,#0a4350_100%)] p-8 text-white sm:p-10">
                  <div
                    aria-hidden="true"
                    className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10 bg-white/[0.03]"
                  />

                  <div className="relative">
                    <Mail
                      aria-hidden="true"
                      className="h-10 w-10 text-green-200"
                    />

                    <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-green-200">
                      Further assistance
                    </p>

                    <h2
                      id="faq-contact-heading"
                      className="mt-3 text-3xl font-bold tracking-tight"
                    >
                      Couldn&apos;t find your answer?
                    </h2>

                    <p className="mt-5 max-w-xl leading-8 text-slate-200">
                      Contact the Ministry for assistance with public
                      information, applications, services or technical
                      problems.
                    </p>
                  </div>
                </div>

                <div className="p-8 sm:p-10">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <Landmark
                        aria-hidden="true"
                        className="h-7 w-7 text-green-700"
                      />

                      <h3 className="mt-4 text-lg font-bold text-slate-950">
                        General enquiries
                      </h3>

                      <p className="mt-2 leading-7 text-slate-600">
                        Ask about Ministry services, documents, programmes and
                        public information.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <MapPin
                        aria-hidden="true"
                        className="h-7 w-7 text-green-700"
                      />

                      <h3 className="mt-4 text-lg font-bold text-slate-950">
                        Office information
                      </h3>

                      <p className="mt-2 leading-7 text-slate-600">
                        Find official addresses, telephone numbers, email
                        contacts and office locations.
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="mt-8 inline-flex items-center gap-2 rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
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
          </Container>
        </section>

        <section
          aria-labelledby="related-information-heading"
          className="border-t border-slate-200 bg-white py-16"
        >
          <Container>
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                Related information
              </p>

              <h2
                id="related-information-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-slate-950"
              >
                Website Help and Policies
              </h2>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <Link
                href="/accessibility"
                className="group rounded-3xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:border-green-200 hover:bg-white hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
              >
                <ShieldCheck
                  aria-hidden="true"
                  className="h-8 w-8 text-green-700"
                />

                <h3 className="mt-5 text-xl font-bold text-slate-950 group-hover:text-green-800">
                  Accessibility
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Learn about accessible website features and how to report a
                  barrier.
                </p>

                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-green-700">
                  Read statement

                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>

              <Link
                href="/privacy"
                className="group rounded-3xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:border-green-200 hover:bg-white hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
              >
                <ShieldCheck
                  aria-hidden="true"
                  className="h-8 w-8 text-green-700"
                />

                <h3 className="mt-5 text-xl font-bold text-slate-950 group-hover:text-green-800">
                  Privacy Policy
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Learn how information submitted through this website is
                  managed.
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
                href="/terms-of-use"
                className="group rounded-3xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:border-green-200 hover:bg-white hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
              >
                <FileText
                  aria-hidden="true"
                  className="h-8 w-8 text-green-700"
                />

                <h3 className="mt-5 text-xl font-bold text-slate-950 group-hover:text-green-800">
                  Terms of Use
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Read the conditions that apply when using this website.
                </p>

                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-green-700">
                  Read terms

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