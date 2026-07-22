import Link from "next/link"
import { ArrowRight, CircleHelp, PhoneCall } from "lucide-react"

import { Container } from "@/components/ui/container"

export function CitizenHelp() {
  return (
    <section
      aria-labelledby="citizen-help-heading"
      className="bg-white py-16 sm:py-20"
    >
      <Container>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-[#061d24] px-6 py-10 text-white shadow-xl sm:px-10 sm:py-12 lg:px-12">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,197,94,0.18),transparent_34%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,0.22),transparent_38%),linear-gradient(135deg,#061d24_0%,#0a322f_50%,#0a4350_100%)]"
          />

          <div
            aria-hidden="true"
            className="absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/10 bg-white/[0.03]"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full border border-green-200/10 bg-green-300/[0.03]"
          />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex items-start gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-300 text-slate-900">
                <CircleHelp aria-hidden="true" className="h-7 w-7" />
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-200">
                  Need assistance?
                </p>

                <h2
                  id="citizen-help-heading"
                  className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
                >
                  Need help finding the correct service?
                </h2>

                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
                  Contact the Ministry for guidance about licences,
                  registrations, application forms, supporting documents or the
                  institution responsible for your request.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href="/services"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
              >
                View all services
              </Link>

              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
              >
                <PhoneCall aria-hidden="true" className="h-5 w-5" />
                Contact the Ministry
                <ArrowRight aria-hidden="true" className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}