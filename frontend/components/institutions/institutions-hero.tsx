import Link from "next/link"
import {
  ArrowRight,
  Building2,
  Landmark,
  Network,
  ShieldCheck,
  Users,
} from "lucide-react"

import { Container } from "@/components/ui/container"

export function InstitutionsHero() {
  return (
    <section
      aria-labelledby="institutions-page-heading"
      className="relative isolate overflow-hidden bg-[#061d24] text-white"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,197,94,0.18),transparent_34%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,0.22),transparent_38%),linear-gradient(135deg,#061d24_0%,#0a322f_50%,#0a4350_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute -right-36 -top-44 h-[36rem] w-[36rem] rounded-full border border-white/10 bg-white/[0.03]"
      />

      <div
        aria-hidden="true"
        className="absolute -left-28 -bottom-56 h-[34rem] w-[34rem] rounded-full border border-green-200/10 bg-green-300/[0.03]"
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
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md">
              <Building2 className="h-4 w-4 text-green-200" />
              Departments & Institutions
            </div>

            <h1
              id="institutions-page-heading"
              className="mt-7 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Departments &
              <span className="block bg-gradient-to-r from-green-200 via-cyan-200 to-sky-200 bg-clip-text text-transparent">
                Affiliated Institutions
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              Explore the departments, statutory bodies, research institutes,
              training organizations and affiliated institutions working
              together to support fisheries, aquatic resources and sustainable
              ocean development across Sri Lanka.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#institutions"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Explore Institutions
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3 font-semibold transition hover:bg-white/20"
              >
                Contact Us
              </Link>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <Landmark className="mb-3 h-7 w-7 text-green-200" />
                <p className="text-3xl font-bold">Departments</p>
                <p className="mt-1 text-sm text-slate-300">
                  Government divisions
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <Building2 className="mb-3 h-7 w-7 text-green-200" />
                <p className="text-3xl font-bold">Institutions</p>
                <p className="mt-1 text-sm text-slate-300">
                  Affiliated organizations
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <Users className="mb-3 h-7 w-7 text-green-200" />
                <p className="text-3xl font-bold">Public Services</p>
                <p className="mt-1 text-sm text-slate-300">
                  Services for citizens
                </p>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-8 rounded-full bg-cyan-400/10 blur-3xl"
            />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-300 text-slate-900">
                <Network className="h-8 w-8" />
              </div>

              <p className="mt-8 text-sm font-bold uppercase tracking-[0.15em] text-green-200">
                Ministry Network
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Supporting Sri Lanka&apos;s Fisheries Sector
              </h2>

              <p className="mt-5 leading-8 text-slate-300">
                The Ministry works closely with departments, statutory bodies,
                research organizations and training institutes to deliver
                fisheries services, scientific research, education and
                sustainable sector development.
              </p>

              <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Departments</span>
                  <ShieldCheck className="h-5 w-5 text-green-200" />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Authorities</span>
                  <ShieldCheck className="h-5 w-5 text-green-200" />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Research Institutes</span>
                  <ShieldCheck className="h-5 w-5 text-green-200" />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Training Centres</span>
                  <ShieldCheck className="h-5 w-5 text-green-200" />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Regional Offices</span>
                  <ShieldCheck className="h-5 w-5 text-green-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}