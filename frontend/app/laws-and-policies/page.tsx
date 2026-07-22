import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  Download,
  FileCheck2,
  FileText,
  Gavel,
  Landmark,
  Scale,
  ScrollText,
  ShieldCheck,
} from "lucide-react"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Container } from "@/components/ui/container"

export const metadata: Metadata = {
  title: "Laws & Policies",
  description:
    "Access laws, regulations, policies, circulars and other official documents related to fisheries, aquatic resources and ocean affairs.",
}

const categories = [
  {
    title: "Acts & Legislation",
    description:
      "Access legislation relevant to fisheries, aquatic resources and related administrative responsibilities.",
    icon: Scale,
    href: "#documents",
  },
  {
    title: "Regulations",
    description:
      "Browse regulations, rules and regulatory documents supporting responsible sector management.",
    icon: Gavel,
    href: "#documents",
  },
  {
    title: "National Policies",
    description:
      "Review policy documents, strategic directions and frameworks connected with sector development.",
    icon: Landmark,
    href: "#documents",
  },
  {
    title: "Circulars",
    description:
      "Find official circulars, administrative notices and operational guidance issued by relevant authorities.",
    icon: ScrollText,
    href: "#documents",
  },
]

const documents = [
  {
    title: "Fisheries and Aquatic Resources Legislation",
    type: "Act",
    description:
      "Official legislative documents governing fisheries and aquatic-resource administration.",
    date: "To be verified",
    fileType: "PDF",
    href: "#",
  },
  {
    title: "Fisheries Management Regulations",
    type: "Regulation",
    description:
      "Regulatory documents relating to fisheries management, licensing and responsible resource use.",
    date: "To be verified",
    fileType: "PDF",
    href: "#",
  },
  {
    title: "National Fisheries and Aquaculture Policy",
    type: "Policy",
    description:
      "Policy direction supporting fisheries, aquaculture and sustainable sector development.",
    date: "To be verified",
    fileType: "PDF",
    href: "#",
  },
  {
    title: "Administrative Circulars",
    type: "Circular",
    description:
      "Circulars and administrative guidance relevant to institutions, officers and sector stakeholders.",
    date: "To be verified",
    fileType: "PDF",
    href: "#",
  },
  {
    title: "Marine Resource Management Guidelines",
    type: "Guideline",
    description:
      "Guidance documents supporting responsible marine-resource management and conservation activities.",
    date: "To be verified",
    fileType: "PDF",
    href: "#",
  },
  {
    title: "Licensing and Compliance Guidance",
    type: "Guideline",
    description:
      "Public guidance relating to licensing, regulatory responsibilities and compliance processes.",
    date: "To be verified",
    fileType: "PDF",
    href: "#",
  },
]

export default function LawsAndPoliciesPage() {
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
              label: "Laws & Policies",
            },
          ]}
        />

        {/* Hero */}
        <section
          aria-labelledby="laws-page-heading"
          className="relative isolate overflow-hidden bg-[#061d24] text-white"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,197,94,0.18),transparent_34%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,0.22),transparent_38%),linear-gradient(135deg,#061d24_0%,#0a322f_50%,#0a4350_100%)]"
          />

          <div
            aria-hidden="true"
            className="absolute -right-36 -top-44 h-[36rem] w-[36rem] rounded-full border border-white/10 bg-white/[0.03]"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-56 -left-28 h-[34rem] w-[34rem] rounded-full border border-green-200/10 bg-green-300/[0.03]"
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

          <Container className="relative z-10 py-16 sm:py-20 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md">
                  <Scale className="h-4 w-4 text-green-200" />
                  Legal & Policy Framework
                </div>

                <h1
                  id="laws-page-heading"
                  className="mt-7 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
                >
                  Laws, Regulations &
                  <span className="block bg-gradient-to-r from-green-200 via-cyan-200 to-sky-200 bg-clip-text text-transparent">
                    National Policies
                  </span>
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
                  Access legislation, regulations, policies, circulars and
                  official guidance supporting transparent administration and
                  sustainable management of fisheries and aquatic resources.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="#documents"
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
                  >
                    Browse Documents
                    <ArrowRight className="h-5 w-5" />
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3 font-semibold transition hover:bg-white/20"
                  >
                    Contact Us
                  </Link>
                </div>

                <div className="mt-12 grid gap-5 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                    <Scale className="mb-3 h-7 w-7 text-green-200" />
                    <p className="text-2xl font-bold">Legislation</p>
                    <p className="mt-1 text-sm text-slate-300">
                      Acts and legal documents
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                    <Landmark className="mb-3 h-7 w-7 text-green-200" />
                    <p className="text-2xl font-bold">Policies</p>
                    <p className="mt-1 text-sm text-slate-300">
                      National policy direction
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                    <ScrollText className="mb-3 h-7 w-7 text-green-200" />
                    <p className="text-2xl font-bold">Circulars</p>
                    <p className="mt-1 text-sm text-slate-300">
                      Official administrative guidance
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -inset-8 rounded-full bg-cyan-400/10 blur-3xl"
                />

                <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-300 text-slate-900">
                    <BookOpen className="h-8 w-8" />
                  </div>

                  <p className="mt-8 text-sm font-bold uppercase tracking-[0.15em] text-green-200">
                    Official Documents
                  </p>

                  <h2 className="mt-3 text-3xl font-bold">
                    Clear Access to Legal Information
                  </h2>

                  <p className="mt-5 leading-8 text-slate-300">
                    This section provides a central location for verified legal
                    and policy documents. Document titles, publication dates
                    and downloadable files should be confirmed before launch.
                  </p>

                  <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
                    {[
                      "Acts & Legislation",
                      "Regulations",
                      "National Policies",
                      "Circulars",
                      "Guidelines",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between"
                      >
                        <span className="text-slate-300">{item}</span>
                        <ShieldCheck className="h-5 w-5 text-green-200" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Categories */}
        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-[#256B29]">
                Document Categories
              </span>

              <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-950">
                Explore Legal and Policy Resources
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                Browse documents by category to find relevant legislation,
                regulatory information, policy frameworks and official
                administrative guidance.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {categories.map((category) => {
                const Icon = category.icon

                return (
                  <article
                    key={category.title}
                    className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-cyan-100 text-[#256B29]">
                      <Icon className="h-7 w-7" />
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-slate-950">
                      {category.title}
                    </h3>

                    <p className="mt-4 flex-1 leading-7 text-slate-600">
                      {category.description}
                    </p>

                    <Link
                      href={category.href}
                      className="mt-7 inline-flex items-center gap-2 font-semibold text-[#256B29] transition group-hover:gap-3"
                    >
                      Browse documents
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </article>
                )
              })}
            </div>
          </Container>
        </section>

        {/* Documents */}
        <section
          id="documents"
          aria-labelledby="documents-heading"
          className="scroll-mt-24 bg-slate-50 py-16 sm:py-20 lg:py-24"
        >
          <Container>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-[#256B29]">
                  Document Library
                </span>

                <h2
                  id="documents-heading"
                  className="mt-6 text-4xl font-bold tracking-tight text-slate-950"
                >
                  Laws, Policies and Official Documents
                </h2>

                <p className="mt-5 text-lg leading-8 text-slate-600">
                  The documents below are sample entries. Replace them with
                  verified titles, publication dates and files before the
                  website is published.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-[#256B29] hover:text-[#256B29]"
              >
                Request a Document
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {documents.map((document) => (
                <article
                  key={document.title}
                  className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:border-emerald-200 hover:shadow-xl"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-[#256B29]">
                      <FileText className="h-7 w-7" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#256B29]">
                          {document.type}
                        </span>

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                          {document.fileType}
                        </span>
                      </div>

                      <h3 className="mt-4 text-xl font-bold leading-snug text-slate-950">
                        {document.title}
                      </h3>

                      <p className="mt-3 leading-7 text-slate-600">
                        {document.description}
                      </p>

                      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-5">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <FileCheck2 className="h-4 w-4" />
                          {document.date}
                        </div>

                        <Link
                          href={document.href}
                          aria-label={`Download ${document.title}`}
                          className="inline-flex items-center gap-2 rounded-lg bg-[#256B29] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1d5320]"
                        >
                          Download
                          <Download className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="relative overflow-hidden rounded-[2rem] bg-[#061d24] px-8 py-14 sm:px-12 lg:px-16 lg:py-16">
              <div
                aria-hidden="true"
                className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl"
              />

              <div
                aria-hidden="true"
                className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"
              />

              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
                    Need Assistance?
                  </span>

                  <h2 className="mt-6 text-4xl font-bold tracking-tight text-white">
                    Cannot Find the Document You Need?
                  </h2>

                  <p className="mt-5 text-lg leading-8 text-slate-300">
                    Contact the Ministry for assistance locating legislation,
                    policies, circulars or other official documents.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
                >
                  Contact the Ministry
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}