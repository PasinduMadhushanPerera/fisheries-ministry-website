import Link from "next/link"
import {
  ArrowRight,
  BellRing,
  CalendarClock,
  FileCheck2,
  Landmark,
} from "lucide-react"

import { Container } from "@/components/ui/container"

export function NoticesHero() {
  return (
    <section
      aria-labelledby="notices-page-heading"
      className="relative isolate overflow-hidden bg-[#061d24] text-white"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,197,94,0.18),transparent_34%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,0.22),transparent_38%),linear-gradient(135deg,#061d24_0%,#0a322f_50%,#0a4350_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full border border-white/10 bg-white/[0.03]"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-52 -left-24 h-[32rem] w-[32rem] rounded-full border border-green-200/10 bg-green-300/[0.03]"
      />

      <svg
        aria-hidden="true"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-40 w-full text-white/[0.05]"
      >
        <path
          fill="currentColor"
          d="M0,192L60,186.7C120,181,240,171,360,170.7C480,171,600,181,720,186.7C840,192,960,192,1080,176C1200,160,1320,128,1380,112L1440,96L1440,320L0,320Z"
        />
      </svg>

      <Container className="relative z-10 py-16 sm:py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md">
              <BellRing
                aria-hidden="true"
                className="h-4 w-4 text-green-200"
              />
              Official Public Notices
            </div>

            <h1
              id="notices-page-heading"
              className="mt-7 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Notices and
              <span className="block bg-gradient-to-r from-green-200 via-cyan-200 to-sky-200 bg-clip-text text-transparent">
                Public Announcements
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              Find official Ministry notices, procurement opportunities,
              recruitment announcements, licensing updates and public
              consultation information.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#notices-library"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
              >
                Browse Notices

                <ArrowRight
                  aria-hidden="true"
                  className="h-5 w-5"
                />
              </Link>

              <Link
                href="/services/licences-and-registrations"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3 font-semibold transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
              >
                Licensing Services
              </Link>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <FileCheck2
                  aria-hidden="true"
                  className="mb-3 h-7 w-7 text-green-200"
                />

                <p className="text-3xl font-bold">Verified</p>

                <p className="mt-1 text-sm text-slate-300">
                  Official notices
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <CalendarClock
                  aria-hidden="true"
                  className="mb-3 h-7 w-7 text-green-200"
                />

                <p className="text-3xl font-bold">Timely</p>

                <p className="mt-1 text-sm text-slate-300">
                  Closing dates shown
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <Landmark
                  aria-hidden="true"
                  className="mb-3 h-7 w-7 text-green-200"
                />

                <p className="text-3xl font-bold">Public</p>

                <p className="mt-1 text-sm text-slate-300">
                  Government information
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-8 rounded-full bg-cyan-400/10 blur-3xl"
            />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-300 text-slate-900">
                <BellRing
                  aria-hidden="true"
                  className="h-8 w-8"
                />
              </div>

              <p className="mt-8 text-sm font-bold uppercase tracking-[0.15em] text-green-200">
                Notice Information Centre
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Important Public Updates
              </h2>

              <p className="mt-5 leading-8 text-slate-300">
                Review active notices, download official documents and check
                relevant deadlines before submitting applications or
                responses.
              </p>

              <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
                {[
                  "General Announcements",
                  "Procurement Opportunities",
                  "Recruitment Notices",
                  "Licensing Updates",
                  "Fisheries and Aquaculture",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between gap-4"
                  >
                    <span className="text-slate-300">{item}</span>

                    <ArrowRight
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-green-200"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}