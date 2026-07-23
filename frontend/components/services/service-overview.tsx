import {
  Building2,
  CalendarClock,
  CheckCircle2,
  CircleDollarSign,
  FileText,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import {
  serviceInformationIcons,
  type ServiceDetail,
} from "@/data/service-details"

type ServiceOverviewProps = {
  service: ServiceDetail
}

export function ServiceOverview({
  service,
}: ServiceOverviewProps) {
  const ProcessingIcon = serviceInformationIcons.processingTime
  const ValidityIcon = serviceInformationIcons.validityPeriod
  const ApplicationIcon = serviceInformationIcons.applicationMethod
  const FeeIcon = serviceInformationIcons.fees

  return (
    <section
      aria-labelledby="service-overview-heading"
      className="bg-white py-16 sm:py-20"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
              Service overview
            </p>

            <h2
              id="service-overview-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
            >
              Overview
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              {service.summary}
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <ProcessingIcon
                  aria-hidden="true"
                  className="h-7 w-7 text-green-700"
                />

                <h3 className="mt-4 font-semibold text-slate-950">
                  Processing Time
                </h3>

                <p className="mt-2 leading-7 text-slate-600">
                  {service.processingTime}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <ValidityIcon
                  aria-hidden="true"
                  className="h-7 w-7 text-green-700"
                />

                <h3 className="mt-4 font-semibold text-slate-950">
                  Validity
                </h3>

                <p className="mt-2 leading-7 text-slate-600">
                  {service.validityPeriod}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:col-span-2">
                <ApplicationIcon
                  aria-hidden="true"
                  className="h-7 w-7 text-green-700"
                />

                <h3 className="mt-4 font-semibold text-slate-950">
                  Application Method
                </h3>

                <p className="mt-2 leading-7 text-slate-600">
                  {service.applicationMethod}
                </p>
              </div>
            </div>
          </div>

          {/* Right */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
              <div className="border-b border-slate-200 bg-gradient-to-r from-green-700 to-emerald-700 px-8 py-6 text-white">
                <h3 className="text-2xl font-bold">
                  Quick Information
                </h3>

                <p className="mt-2 text-sm text-green-100">
                  Important information before submitting your application.
                </p>
              </div>

              <div className="space-y-6 p-8">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                    <CalendarClock
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-950">
                      Processing Time
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {service.processingTime}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                    <CheckCircle2
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-950">
                      Validity
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {service.validityPeriod}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                    <Building2
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-950">
                      Application Method
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {service.applicationMethod}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-6">
                  <div className="flex items-center gap-3">
                    <CircleDollarSign
                      className="h-6 w-6 text-green-700"
                      aria-hidden="true"
                    />

                    <h4 className="font-semibold text-slate-950">
                      Fees
                    </h4>
                  </div>

                  <div className="mt-4 space-y-4">
                    {service.fees.map((fee) => (
                      <div key={fee.label}>
                        <p className="font-medium text-slate-900">
                          {fee.label}
                        </p>

                        <p className="mt-1 text-green-700 font-semibold">
                          {fee.amount}
                        </p>

                        {fee.note && (
                          <p className="mt-1 text-sm leading-6 text-slate-600">
                            {fee.note}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {service.formUrl && (
                  <a
                    href={service.formUrl}
                    className="flex items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
                  >
                    <FileText
                      className="h-5 w-5"
                      aria-hidden="true"
                    />

                    Download Form
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  )
}