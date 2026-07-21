import Link from "next/link"
import { ArrowRight, Info } from "lucide-react"

import { serviceProcessSteps } from "@/data/services"
import { Section } from "@/components/ui/section"
import { SectionTitle } from "@/components/ui/section-title"

export function ServiceProcess() {
  return (
    <Section
      id="service-process"
      background="white"
      labelledBy="service-process-heading"
      spacing="lg"
    >
      <SectionTitle
        id="service-process-heading"
        eyebrow="Application guidance"
        title="How to access a Ministry service"
        description="Use this general process to identify a service, prepare the required information and follow the approved application channel."
        align="center"
      />

      <div className="relative mt-14">
        <div
          aria-hidden="true"
          className="absolute left-7 top-8 hidden h-px w-[calc(100%-3.5rem)] bg-gradient-to-r from-emerald-200 via-sky-200 to-emerald-200 lg:block"
        />

        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {serviceProcessSteps.map((item) => {
            const Icon = item.icon

            return (
              <li
                key={item.step}
                className="group relative rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
              >
                <div className="relative z-10 flex items-center justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#256B29] text-white shadow-md transition duration-300 group-hover:scale-105">
                    <Icon
                      aria-hidden="true"
                      className="h-7 w-7"
                    />
                  </div>

                  <span className="text-3xl font-bold text-slate-200">
                    {item.step}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-bold leading-snug text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {item.description}
                </p>
              </li>
            )
          })}
        </ol>
      </div>

      <div className="mt-10 flex flex-col gap-5 rounded-3xl border border-sky-200 bg-sky-50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-sky-700 shadow-sm">
            <Info
              aria-hidden="true"
              className="h-5 w-5"
            />
          </div>

          <div>
            <h3 className="font-bold text-slate-950">
              Requirements may differ by service
            </h3>

            {/* <p className="mt-2 max-w-3xl leading-7 text-slate-600">
              Always review the official service page before submitting an
              application. Required documents, fees, processing methods and
              responsible institutions may vary.
            </p> */}
          </div>
        </div>

        <Link
          href="/services/all"
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#256B29] px-6 py-3 font-semibold text-white transition hover:bg-[#1f5823] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
        >
          Browse all services

          <ArrowRight
            aria-hidden="true"
            className="h-5 w-5"
          />
        </Link>
      </div>
    </Section>
  )
}