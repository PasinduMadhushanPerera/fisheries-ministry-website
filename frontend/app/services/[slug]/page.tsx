import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  FileText,
  MapPin,
} from "lucide-react"

import { serviceDetails } from "@/data/service-details"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"

type ServiceDetailPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return serviceDetails.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params

  const service = serviceDetails.find(
    (item) => item.slug === slug
  )

  if (!service) {
    return {
      title: "Service Not Found",
    }
  }

  return {
    title: service.title,
    description: service.shortDescription,
  }
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params

  const service = serviceDetails.find(
    (item) => item.slug === slug
  )

  if (!service) {
    notFound()
  }

  const Icon = service.icon

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
              label: "Services",
              href: "/services",
            },
            {
              label: service.title,
            },
          ]}
        />

        <section className="bg-gradient-to-br from-[#073f2a] via-[#256B29] to-[#075985] px-4 py-14 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex max-w-4xl items-start gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                <Icon
                  aria-hidden="true"
                  className="h-8 w-8"
                />
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-100">
                  {service.category}
                </p>

                <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                  {service.title}
                </h1>

                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-100">
                  {service.shortDescription}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-10">
              <section aria-labelledby="service-overview-heading">
                <h2
                  id="service-overview-heading"
                  className="text-2xl font-bold text-slate-950"
                >
                  Service overview
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  {service.overview}
                </p>
              </section>

              <section aria-labelledby="eligibility-heading">
                <h2
                  id="eligibility-heading"
                  className="text-2xl font-bold text-slate-950"
                >
                  Eligibility
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  {service.eligibility}
                </p>
              </section>

              <section aria-labelledby="documents-heading">
                <h2
                  id="documents-heading"
                  className="text-2xl font-bold text-slate-950"
                >
                  Required documents
                </h2>

                <ul className="mt-5 space-y-3">
                  {service.requiredDocuments.map((document) => (
                    <li
                      key={document}
                      className="flex items-start gap-3 rounded-xl border border-slate-200 p-4"
                    >
                      <FileText
                        aria-hidden="true"
                        className="mt-0.5 h-5 w-5 shrink-0 text-[#256B29]"
                      />

                      <span className="text-slate-700">
                        {document}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="process-heading">
                <h2
                  id="process-heading"
                  className="text-2xl font-bold text-slate-950"
                >
                  Application process
                </h2>

                <ol className="mt-5 space-y-4">
                  {service.steps.map((step, index) => (
                    <li
                      key={step}
                      className="flex items-start gap-4"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#256B29] font-bold text-white">
                        {index + 1}
                      </span>

                      <p className="pt-1 leading-7 text-slate-600">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            <aside className="h-fit rounded-2xl border border-slate-200 bg-slate-50 p-6 lg:sticky lg:top-24">
              <h2 className="text-xl font-bold text-slate-950">
                Service information
              </h2>

              <dl className="mt-6 space-y-5">
                <div className="flex items-start gap-3">
                  <Clock3
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 text-[#256B29]"
                  />

                  <div>
                    <dt className="text-sm font-semibold text-slate-500">
                      Processing time
                    </dt>

                    <dd className="mt-1 font-semibold text-slate-900">
                      {service.processingTime}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 text-[#256B29]"
                  />

                  <div>
                    <dt className="text-sm font-semibold text-slate-500">
                      Delivery method
                    </dt>

                    <dd className="mt-1 font-semibold text-slate-900">
                      {service.deliveryMethod}
                    </dd>
                  </div>
                </div>
              </dl>

              <Link
                href="/contact"
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#256B29] px-5 py-3 font-semibold text-white transition hover:bg-[#1f5823] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
              >
                Get assistance
              </Link>
            </aside>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-semibold text-[#256B29]"
            >
              <ArrowLeft
                aria-hidden="true"
                className="h-5 w-5"
              />
              Back to services
            </Link>

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <CheckCircle2
                aria-hidden="true"
                className="h-5 w-5 text-[#256B29]"
              />
              Verify all information before publication
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}