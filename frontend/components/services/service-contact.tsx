import Link from "next/link"
import {
  ArrowRight,
  Building2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import type { ServiceDetail } from "@/data/service-details"

type ServiceContactProps = {
  service: ServiceDetail
}

export function ServiceContact({
  service,
}: ServiceContactProps) {
  const phoneHref = `tel:${service.contact.phone.replace(/\s+/g, "")}`
  const emailHref = `mailto:${service.contact.email}`

  return (
    <section
      aria-labelledby="service-contact-heading"
      className="bg-slate-50 py-16 sm:py-20"
    >
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-green-100/70 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-cyan-100/70 blur-3xl"
          />

          <div className="relative grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-gradient-to-br from-emerald-800 via-teal-800 to-slate-900 p-8 text-white sm:p-10 lg:p-12">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-200">
                Official assistance
              </p>

              <h2
                id="service-contact-heading"
                className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Contact the responsible authority
              </h2>

              <p className="mt-5 leading-8 text-slate-200">
                Contact the responsible department for official guidance about
                eligibility, documents, fees, inspections and application
                procedures for this service.
              </p>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-300 text-slate-950">
                  <Building2
                    aria-hidden="true"
                    className="h-6 w-6"
                  />
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  {service.contact.department}
                </h3>

                <p className="mt-3 leading-7 text-slate-300">
                  Use the contact details provided to confirm current service
                  requirements before submitting your application.
                </p>
              </div>

              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
              >
                View Ministry Contact Page

                <ArrowRight
                  aria-hidden="true"
                  className="h-5 w-5"
                />
              </Link>
            </div>

            <div className="p-8 sm:p-10 lg:p-12">
              <div className="space-y-5">
                <article className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                    <Building2
                      aria-hidden="true"
                      className="h-6 w-6"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-950">
                      Department
                    </h3>

                    <p className="mt-2 leading-7 text-slate-600">
                      {service.contact.department}
                    </p>
                  </div>
                </article>

                <article className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                    <MapPin
                      aria-hidden="true"
                      className="h-6 w-6"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-950">
                      Address
                    </h3>

                    <address className="mt-2 not-italic leading-7 text-slate-600">
                      {service.contact.address}
                    </address>
                  </div>
                </article>

                <article className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                    <Phone
                      aria-hidden="true"
                      className="h-6 w-6"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-950">
                      Telephone
                    </h3>

                    <a
                      href={phoneHref}
                      className="mt-2 inline-block font-medium text-green-700 transition hover:text-green-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                    >
                      {service.contact.phone}
                    </a>
                  </div>
                </article>

                <article className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                    <Mail
                      aria-hidden="true"
                      className="h-6 w-6"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-semibold text-slate-950">
                      Email
                    </h3>

                    <a
                      href={emailHref}
                      className="mt-2 inline-block break-all font-medium text-green-700 transition hover:text-green-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                    >
                      {service.contact.email}
                    </a>
                  </div>
                </article>
              </div>

              <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <p className="text-sm leading-6 text-amber-950">
                  Contact information and service requirements may change.
                  Confirm the latest details with the responsible authority
                  before travelling to an office or submitting documents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}