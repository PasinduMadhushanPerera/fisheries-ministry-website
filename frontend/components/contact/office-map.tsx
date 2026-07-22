import Link from "next/link"
import {
  ArrowUpRight,
  Building2,
  Clock3,
  Mail,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react"

import { Container } from "@/components/ui/container"

const officeDetails = [
  {
    label: "Address",
    value: "Official Ministry address to be verified before publication",
    icon: MapPin,
  },
  {
    label: "Telephone",
    value: "+94 XX XXX XXXX",
    icon: Phone,
  },
  {
    label: "Email",
    value: "info@fisheries.gov.lk",
    icon: Mail,
  },
  {
    label: "Office Hours",
    value: "Monday – Friday, official working hours to be confirmed",
    icon: Clock3,
  },
]

export function OfficeMap() {
  return (
    <section
      id="office-location"
      aria-labelledby="office-location-heading"
      className="scroll-mt-24 bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-cyan-100 text-[#256B29]">
              <Building2 className="h-8 w-8" />
            </div>

            <span className="mt-8 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-[#256B29]">
              Ministry Office
            </span>

            <h2
              id="office-location-heading"
              className="mt-5 text-4xl font-bold tracking-tight text-slate-950"
            >
              Visit Our Main Office
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Visit the Ministry for official inquiries, document submissions,
              public services and assistance from the relevant divisions.
              Confirm the official address and working hours before publishing
              this page.
            </p>

            <div className="mt-10 space-y-5">
              {officeDetails.map((detail) => {
                const Icon = detail.icon

                return (
                  <div
                    key={detail.label}
                    className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#256B29] shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
                        {detail.label}
                      </p>

                      <p className="mt-1 leading-7 text-slate-800">
                        {detail.value}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#"
                aria-label="Open the Ministry location in Google Maps"
                className="inline-flex items-center gap-2 rounded-xl bg-[#256B29] px-5 py-3 font-semibold text-white transition hover:bg-[#1d5320]"
              >
                Get Directions
                <Navigation className="h-5 w-5" />
              </Link>

              <Link
                href="#contact-form"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-[#256B29] hover:text-[#256B29]"
              >
                Send a Message
                <ArrowUpRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="min-h-[32rem] overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-sm">
            <div className="relative flex h-full min-h-[30rem] items-center justify-center overflow-hidden rounded-[1.5rem] bg-[#dfeee9]">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-[size:40px_40px]"
              />

              <div
                aria-hidden="true"
                className="absolute left-[8%] top-[16%] h-2/3 w-20 rotate-12 rounded-full bg-cyan-200/70 blur-sm"
              />

              <div
                aria-hidden="true"
                className="absolute right-[12%] top-[10%] h-3/4 w-28 -rotate-12 rounded-full bg-emerald-200/60 blur-sm"
              />

              <div className="relative z-10 max-w-sm px-6 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#256B29] text-white shadow-xl">
                  <MapPin className="h-10 w-10" />
                </div>

                <div className="mt-6 rounded-2xl border border-white/80 bg-white/90 p-6 shadow-xl backdrop-blur">
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#256B29]">
                    Map Placeholder
                  </p>

                  <h3 className="mt-3 text-2xl font-bold text-slate-950">
                    Ministry Location
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    Replace this placeholder with the verified Google Maps
                    embed after confirming the Ministry&apos;s official
                    location.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}