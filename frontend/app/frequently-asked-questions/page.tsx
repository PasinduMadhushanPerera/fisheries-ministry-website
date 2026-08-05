"use client"

import { useMemo, useState } from "react"
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
  Phone,
  Search,
  SearchX,
  ShieldCheck,
  ShipWheel,
  Sparkles,
} from "lucide-react"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Container } from "@/components/ui/container"
import { PageHero } from "@/components/ui/page-hero"

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Frequently Asked Questions" },
]

type FaqItem = {
  question: string
  answer: string
  linkText?: string
  linkHref?: string
}

type FaqGroup = {
  id: string
  title: string
  description: string
  icon: React.ElementType
  questions: FaqItem[]
}

const faqGroups: FaqGroup[] = [
  {
    id: "general",
    title: "General Information",
    description: "Common questions about the Ministry, its statutory mandates, organizational structure, and public information services.",
    icon: CircleHelp,
    questions: [
      {
        question: "What is the primary role of the Ministry of Fisheries, Aquatic and Ocean Resources?",
        answer: "The Ministry of Fisheries, Aquatic and Ocean Resources is responsible for formulating, coordinating, and implementing national policies, programmes, and public services related to marine capture fisheries, inland fisheries, aquaculture development, coastal conservation, and ocean resource management in Sri Lanka.",
        linkText: "Learn more About the Ministry",
        linkHref: "/about/overview",
      },
      {
        question: "What public information and official resources can I access on this website?",
        answer: "The official Ministry web portal provides access to news releases, public notices, tender opportunities, gazettes, fisheries statistics, downloadable application forms, statutory acts and policies, Right to Information (RTI) procedures, and official contact directories.",
        linkText: "View Public Downloads",
        linkHref: "/downloads",
      },
      {
        question: "How can I contact Ministry Headquarters or specific regional offices?",
        answer: "You can reach the Ministry Headquarters at New Secretariat, Maligawatta, Colombo 10. For phone inquiries call +94 112 327 060, or email info@fisheries.gov.lk. Specific department extension numbers are listed in our Contact Directory.",
        linkText: "View Full Contact Directory",
        linkHref: "/contact",
      },
      {
        question: "Where can I find the latest Ministry notices, tenders, and announcements?",
        answer: "Current public notices, tender invitations, procurement opportunities, recruitment advertisements, and official announcements are published under the Public Notices section in our Media Centre.",
        linkText: "Explore Public Notices",
        linkHref: "/media-centre/notices",
      },
    ],
  },
  {
    id: "applications",
    title: "Applications & Forms",
    description: "Information about obtaining official application forms, circulars, and document requirements.",
    icon: FileText,
    questions: [
      {
        question: "Where can I download official Ministry application forms?",
        answer: "Commercial vessel registration forms, licensing renewal applications, fingerling request forms, and procurement document guidelines are available for free download in PDF format on our Downloads Portal.",
        linkText: "Go to Downloads Centre",
        linkHref: "/downloads",
      },
      {
        question: "What general documents are required when submitting official applications?",
        answer: "Applicants typically need to submit a completed application form, National Identity Card (NIC) copy, vessel registration or land title documents where applicable, and safety/technical certificates.",
        linkText: "Download Application Forms",
        linkHref: "/downloads",
      },
      {
        question: "Where can I check published procurement opportunities and tender guidelines?",
        answer: "Official tender notices, procurement guidelines, and bidding documents published by the Ministry and Ceylon Fishery Harbours Corporation (CFHC) can be accessed on our Public Notices page.",
        linkText: "View Procurement Notices",
        linkHref: "/media-centre/notices",
      },
    ],
  },
  {
    id: "fisheries",
    title: "Fisheries and Aquaculture",
    description: "Guidance relating to coastal fisheries, inland aquaculture support, fingerling supply, and marine research.",
    icon: Fish,
    questions: [
      {
        question: "Where can I obtain assistance for freshwater fish and shrimp aquaculture projects?",
        answer: "The National Aquaculture Development Authority (NAQDA) provides fingerling supply, pond construction technical assistance, water quality testing, and aquaculture guidance for registered producers.",
        linkText: "Explore Institutions",
        linkHref: "/institutions",
      },
      {
        question: "How can coastal fishers access safety equipment and emergency relief assistance?",
        answer: "Safety equipment programs (VHF marine radios, VMS distress beacons, lifejackets) and disaster relief schemes are announced via official circulars and coordinated through local Fishermen Co-operative Societies.",
        linkText: "View Downloads & Circulars",
        linkHref: "/downloads",
      },
      {
        question: "Where can I access official fisheries statistics and fish production data?",
        answer: "Weekly fish market prices, monthly marine & inland production reports, and annual statistical bulletins are published under the Statistics section.",
        linkText: "View Fisheries Statistics",
        linkHref: "/statistics",
      },
      {
        question: "How can I report illegal fishing (IUU) or marine environmental pollution?",
        answer: "Illegal fishing, unauthorized gear usage, or coastal environment degradation can be reported directly to the Department of Fisheries MCS Control Room (+94 112 449 175) or via our online contact portal.",
        linkText: "Report to Ministry Support",
        linkHref: "/contact",
      },
    ],
  },
  {
    id: "rti",
    title: "Right to Information (RTI)",
    description: "Answers about accessing public information and submitting formal RTI requests.",
    icon: Landmark,
    questions: [
      {
        question: "How do I submit a Right to Information (RTI) request to the Ministry?",
        answer: "Download RTI Form 01 from our RTI Portal, fill out the required information, and submit it to our designated Information Officer via post, email (rti@fisheries.gov.lk), or in person at HQ.",
        linkText: "Visit RTI Portal",
        linkHref: "/rti",
      },
      {
        question: "What is the expected response timeframe for public inquiries and RTI requests?",
        answer: "Inquiries submitted through our website contact form receive an immediate automated confirmation and a response within 3 to 5 business days. Formal RTI requests are processed within statutory timeframes.",
        linkText: "Contact Information Desk",
        linkHref: "/contact",
      },
    ],
  },
  {
    id: "website",
    title: "Website & Accessibility Support",
    description: "Help with navigating this web portal, adjusting text contrast, and language selection.",
    icon: ShieldCheck,
    questions: [
      {
        question: "Is this website available in English, Sinhala, and Tamil?",
        answer: "Yes. The Ministry website supports all three official languages of Sri Lanka (English, Sinhala, and Tamil). You can switch languages using the language toggle located in the top utility bar.",
      },
      {
        question: "How do I customize text size or enable high contrast mode?",
        answer: "Use the Accessibility Utility Bar fixed at the top of every page to adjust font scale (+ / -), toggle high-contrast mode, or enable screen reader optimizations.",
        linkText: "Read Accessibility Statement",
        linkHref: "/accessibility",
      },
      {
        question: "What should I do if a link or document fails to load?",
        answer: "Try refreshing the page or clearing browser cache. If a document link remains unavailable, please contact info@fisheries.gov.lk specifying the page and document title.",
      },
    ],
  },
]

export default function FrequentlyAskedQuestionsPage() {
  const [activeTab, setActiveTab] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")

  const filteredGroups = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase()

    return faqGroups
      .map((group) => {
        if (activeTab !== "all" && group.id !== activeTab) {
          return null
        }

        if (!keyword) {
          return group
        }

        const matchingQuestions = group.questions.filter(
          (q) =>
            q.question.toLowerCase().includes(keyword) ||
            q.answer.toLowerCase().includes(keyword)
        )

        if (matchingQuestions.length === 0) {
          return null
        }

        return {
          ...group,
          questions: matchingQuestions,
        }
      })
      .filter((group): group is FaqGroup => group !== null)
  }, [activeTab, searchQuery])

  return (
    <>
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb items={breadcrumbItems} />

        {/* Hero Section */}
        <PageHero
          badgeIcon={CircleHelp}
          badgeText="Public Support Desk"
          title="Frequently Asked"
          highlightTitle="Questions (FAQ)"
          description="Find clear, verified answers to common questions regarding Ministry public information, downloadable application forms, aquaculture support, public notices, and website accessibility."
          cardIcon={ShipWheel}
          cardEyebrow="Ministry Help Desk"
          cardTitle="Here to Support You"
          cardDescription="Cannot find the specific answer you are looking for? Our public support team is ready to assist you."
        >
          <div className="mt-6 border-t border-white/10 pt-4">
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#256B29] px-6 text-xs font-extrabold text-white transition hover:bg-[#1b4d1d] shadow-md shadow-emerald-900/20"
            >
              <span>Contact Ministry Support</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </PageHero>

        {/* Search & Subject Tabs Section */}
        <section aria-labelledby="faq-search-heading" className="border-b border-slate-200/80 bg-gradient-to-b from-white to-slate-50/60 py-10">
          <Container>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              {/* Live Search Bar */}
              <div className="relative w-full lg:max-w-md">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  placeholder="Search FAQ questions by keyword or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#256B29] focus:outline-none focus:ring-4 focus:ring-emerald-100/80 shadow-2xs transition-all"
                />
              </div>

              {/* Subject Tabs */}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("all")}
                  className={`rounded-xl px-4 py-2 text-xs font-extrabold transition-all cursor-pointer ${
                    activeTab === "all"
                      ? "bg-[#256B29] text-white shadow-md shadow-emerald-900/10 scale-[1.02]"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  All Subjects
                </button>
                {faqGroups.map((group) => (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => setActiveTab(group.id)}
                    className={`rounded-xl px-4 py-2 text-xs font-extrabold transition-all cursor-pointer ${
                      activeTab === group.id
                        ? "bg-[#256B29] text-white shadow-md shadow-emerald-900/10 scale-[1.02]"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {group.title}
                  </button>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Main Content Accordion Stream */}
        <section className="bg-slate-50/80 py-12 sm:py-16">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)]">
              {/* Left Navigation Sidebar */}
              <aside className="hidden lg:block">
                <nav
                  aria-label="FAQ category navigation"
                  className="sticky top-28 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs"
                >
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#256B29] flex items-center gap-1.5 mb-2">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Table of Contents</span>
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                    FAQ Categories
                  </h3>

                  <ol className="mt-4 space-y-1.5">
                    {faqGroups.map((group, index) => (
                      <li key={group.id}>
                        <a
                          href={`#${group.id}`}
                          onClick={() => setActiveTab("all")}
                          className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                            activeTab === group.id
                              ? "bg-emerald-50 text-[#256B29] font-bold"
                              : "text-slate-700 hover:bg-slate-100 hover:text-[#256B29]"
                          }`}
                        >
                          <span className="text-[#256B29] font-mono font-bold">0{index + 1}.</span>
                          <span>{group.title}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>

              {/* Right Accordion Questions Stream */}
              <div className="min-w-0 space-y-12">
                {filteredGroups.length > 0 ? (
                  filteredGroups.map((group, groupIndex) => {
                    const Icon = group.icon
                    return (
                      <section
                        key={group.id}
                        id={group.id}
                        aria-labelledby={`${group.id}-heading`}
                        className={`scroll-mt-28 ${groupIndex > 0 ? "border-t border-slate-200/80 pt-10" : ""}`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100/80 text-[#256B29] border border-emerald-200/80 shadow-2xs">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </div>
                          <div>
                            <span className="text-xs font-extrabold uppercase tracking-wider text-[#256B29]">
                              Category 0{groupIndex + 1}
                            </span>
                            <h2 id={`${group.id}-heading`} className="text-2xl font-extrabold tracking-tight text-slate-900">
                              {group.title}
                            </h2>
                            <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                              {group.description}
                            </p>
                          </div>
                        </div>

                        {/* Accordions */}
                        <div className="mt-6 space-y-4">
                          {group.questions.map((faq, questionIndex) => (
                            <details
                              key={faq.question}
                              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs transition-all duration-200 open:border-emerald-300 open:shadow-md"
                            >
                              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-xs sm:text-sm font-extrabold text-slate-900 transition hover:bg-slate-50 focus-visible:outline-none">
                                <span className="flex items-start gap-3 text-left">
                                  <span className="text-[#256B29] font-mono">0{questionIndex + 1}.</span>
                                  <span className="leading-snug">{faq.question}</span>
                                </span>
                                <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
                              </summary>

                              <div className="border-t border-slate-100 bg-slate-50/60 px-6 py-5 text-xs sm:text-sm leading-relaxed text-slate-700 space-y-3 font-normal">
                                {/* Justified Answer Text */}
                                <p className="text-justify leading-relaxed">{faq.answer}</p>

                                {faq.linkHref && (
                                  <div className="pt-2">
                                    <Link
                                      href={faq.linkHref}
                                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#256B29] hover:text-[#1b4d1d] hover:underline"
                                    >
                                      <span>{faq.linkText || "View Related Section"}</span>
                                      <ArrowRight className="h-3.5 w-3.5" />
                                    </Link>
                                  </div>
                                )}
                              </div>
                            </details>
                          ))}
                        </div>
                      </section>
                    )
                  })
                ) : (
                  <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
                    <SearchX className="mx-auto h-12 w-12 text-slate-400" aria-hidden="true" />
                    <h3 className="mt-4 text-lg font-bold text-slate-900">No questions match your query</h3>
                    <p className="mt-1 text-xs text-slate-600">Try adjusting your search terms or selecting another subject filter.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("all")
                        setSearchQuery("")
                      }}
                      className="mt-5 rounded-xl bg-[#256B29] px-5 py-2.5 text-xs font-extrabold text-white transition hover:bg-[#1b4d1d] cursor-pointer"
                    >
                      Clear search & filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* Further Assistance Card */}
        <section aria-labelledby="faq-contact-heading" className="border-t border-slate-200/80 bg-white py-14 sm:py-16">
          <Container>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
              <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
                {/* Left Ocean Dark Card */}
                <div className="relative overflow-hidden bg-[linear-gradient(135deg,#041c22_0%,#093835_55%,#0c4e48_100%)] p-8 sm:p-10 text-white">
                  <div
                    aria-hidden="true"
                    className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-emerald-400/10 blur-2xl"
                  />
                  <div className="relative z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-emerald-300 backdrop-blur-md border border-white/10">
                      <Mail className="h-6 w-6" />
                    </div>
                    <span className="mt-5 block text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                      Direct Support
                    </span>
                    <h2 id="faq-contact-heading" className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                      Couldn&apos;t find your answer?
                    </h2>
                    <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed text-justify">
                      Contact the Ministry of Fisheries directly for guidance regarding public information, downloadable application forms, aquaculture programs, or Right to Information requests.
                    </p>
                  </div>
                </div>

                {/* Right Info Grid */}
                <div className="p-8 sm:p-10 flex flex-col justify-between space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
                        <Landmark className="h-4 w-4 text-[#256B29]" />
                        <span>General Inquiries</span>
                      </div>
                      <p className="text-xs text-slate-600 text-justify">Inquire about public documents, official circulars, and government programs.</p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
                        <MapPin className="h-4 w-4 text-[#256B29]" />
                        <span>HQ Help Desk</span>
                      </div>
                      <p className="text-xs text-slate-600">Maligawatta, Colombo 10 • Tel: +94 112 327 060</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <Phone className="h-4 w-4 text-[#256B29]" />
                      <span>Hotline: +94 112 327 060</span>
                    </div>

                    <Link
                      href="/contact"
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-[#256B29] px-6 text-xs font-extrabold text-white transition hover:bg-[#1b4d1d] shadow-md shadow-emerald-900/10"
                    >
                      <span>Go to Contact Page</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}