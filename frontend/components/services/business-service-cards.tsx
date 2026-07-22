import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Container } from "@/components/ui/container"
import { businessServices } from "@/data/business-services"

export function BusinessServiceCards() {
  return (
    <section
      id="business-services"
      aria-labelledby="business-services-heading"
      className="scroll-mt-28 bg-white py-16 sm:py-20"
    >
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
              Business services
            </p>

            <h2
              id="business-services-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
            >
              Find the service your business needs
            </h2>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              Select a service to view regulatory requirements, application
              guidance, forms, approvals and relevant institutional contacts.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 self-start rounded-lg font-semibold text-green-700 transition hover:text-green-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200 lg:self-auto"
          >
            View all services
            <ArrowRight aria-hidden="true" className="h-5 w-5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {businessServices.map((service) => {
            const Icon = service.icon

            return (
              <article
                key={service.title}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-green-300 hover:shadow-xl sm:p-7"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700 transition group-hover:bg-green-100">
                  <Icon aria-hidden="true" className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-xl font-bold leading-8 text-slate-950">
                  {service.title}
                </h3>

                <p className="mt-3 flex-1 leading-7 text-slate-600">
                  {service.description}
                </p>

                <Link
                  href={service.href}
                  aria-label={`View ${service.title}`}
                  className="mt-6 inline-flex min-h-11 items-center gap-2 self-start rounded-lg font-semibold text-green-700 transition hover:text-green-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                >
                  View service
                  <ArrowRight
                    aria-hidden="true"
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
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