import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Container } from "@/components/ui/container"
import {
  getRelatedServices,
  type ServiceDetail,
} from "@/data/service-details"

type RelatedServicesProps = {
  service: ServiceDetail
}

export function RelatedServices({
  service,
}: RelatedServicesProps) {
  const relatedServices = getRelatedServices(service)

  if (relatedServices.length === 0) {
    return null
  }

  return (
    <section
      aria-labelledby="related-services-heading"
      className="bg-white py-16 sm:py-20"
    >
      <Container>
        <div className="flex flex-col gap-5 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
              Continue exploring
            </p>

            <h2
              id="related-services-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
            >
              Related services
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              These services may also be relevant to your application,
              registration or fisheries activity.
            </p>
          </div>

          <Link
            href="/services/licences-and-registrations"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-green-700 transition hover:text-green-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
          >
            View all applications

            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4"
            />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {relatedServices.map((relatedService) => {
            const Icon = relatedService.icon

            return (
              <article
                key={relatedService.slug}
                className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-slate-50 p-7 transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:bg-white hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700 transition group-hover:bg-green-700 group-hover:text-white">
                    <Icon
                      aria-hidden="true"
                      className="h-7 w-7"
                    />
                  </div>

                  <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-green-800">
                    {relatedService.category}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-950">
                  {relatedService.shortTitle}
                </h3>

                <p className="mt-3 flex-1 leading-7 text-slate-600">
                  {relatedService.description}
                </p>

                <Link
                  href={`/services/${relatedService.slug}`}
                  aria-label={`View details for ${relatedService.title}`}
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-green-700 transition hover:text-green-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                >
                  View service details

                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}