import Link from "next/link"
import {
  ArrowRight,
  Mail,
  MapPin,
  PhoneCall,
} from "lucide-react"

import { Section } from "@/components/ui/section"

export function ServiceAssistance() {
  return (
    <Section
      id="service-assistance"
      background="soft"
      spacing="lg"
    >
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#073f2a] via-[#256B29] to-[#075985] px-7 py-14 text-white shadow-2xl sm:px-10 lg:px-14">
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-emerald-300/10 blur-3xl"
        />

        <div className="relative grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-100">
              Need assistance?
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              Get help finding the right Ministry service
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-100">
              Contact the Ministry for guidance about service information,
              responsible institutions, application channels and official
              documents.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[#256B29] transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
              >
                Contact the Ministry

                <ArrowRight
                  aria-hidden="true"
                  className="h-5 w-5"
                />
              </Link>

              <Link
                href="/institutions"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
              >
                View institutions
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
              <PhoneCall
                aria-hidden="true"
                className="h-6 w-6"
              />

              <h3 className="mt-4 font-bold">
                Telephone support
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-200">
                Official telephone details will be shown on the Contact page.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
              <Mail
                aria-hidden="true"
                className="h-6 w-6"
              />

              <h3 className="mt-4 font-bold">
                Email enquiries
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-200">
                Use verified Ministry email addresses only.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
              <MapPin
                aria-hidden="true"
                className="h-6 w-6"
              />

              <h3 className="mt-4 font-bold">
                Office locations
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-200">
                Find official office locations and opening information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}