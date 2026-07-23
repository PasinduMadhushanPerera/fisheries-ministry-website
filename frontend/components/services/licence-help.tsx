import Link from "next/link"
import { ArrowRight, PhoneCall } from "lucide-react"

import { Container } from "@/components/ui/container"

export function LicenceHelp() {
  return (
    <section className="bg-slate-950 py-16 text-white sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-emerald-800 via-teal-800 to-slate-900 px-8 py-12 shadow-2xl sm:px-10 lg:px-14 lg:py-16">
          {/* Decorative background */}
          <div
            aria-hidden="true"
            className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-200">
                Need assistance?
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                We're here to help with your application
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-200">
                Whether you're applying for a new licence, renewing an existing
                registration or looking for the correct permit, our ministry can
                help you understand the requirements, required documents and
                application procedures.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
                >
                  Contact the Ministry

                  <ArrowRight
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3 font-semibold transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
                >
                  View All Services
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl lg:w-80">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-300 text-slate-900">
                <PhoneCall
                  aria-hidden="true"
                  className="h-7 w-7"
                />
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Application Support
              </h3>

              <p className="mt-3 leading-7 text-slate-300">
                Need help choosing the correct licence, permit or registration?
                Contact the Ministry for official guidance before submitting your
                application.
              </p>

              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-emerald-200 transition hover:text-white"
              >
                Contact Support

                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}