import Link from "next/link"
import {
  ArrowRight,
  Briefcase,
  Building2,
  FolderKanban,
  MapPinned,
  Target,
} from "lucide-react"

import { Container } from "@/components/ui/container"

export function ProjectsHero() {
  return (
    <section
      aria-labelledby="projects-page-heading"
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
              <Briefcase className="h-4 w-4 text-green-200" />
              Development Projects
            </div>

            <h1
              id="projects-page-heading"
              className="mt-7 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Projects &
              <span className="block bg-gradient-to-r from-green-200 via-cyan-200 to-sky-200 bg-clip-text text-transparent">
                Development Initiatives
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              Explore the Ministry&apos;s key development projects aimed at
              strengthening fisheries infrastructure, marine conservation,
              aquaculture, digital transformation and sustainable growth across
              Sri Lanka.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#featured-projects"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Explore Projects
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
                <FolderKanban className="mb-3 h-7 w-7 text-green-200" />
                <p className="text-3xl font-bold">20+</p>
                <p className="mt-1 text-sm text-slate-300">
                  Development Projects
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <Building2 className="mb-3 h-7 w-7 text-green-200" />
                <p className="text-3xl font-bold">25</p>
                <p className="mt-1 text-sm text-slate-300">
                  District Coverage
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <Target className="mb-3 h-7 w-7 text-green-200" />
                <p className="text-3xl font-bold">5+</p>
                <p className="mt-1 text-sm text-slate-300">
                  Strategic Programmes
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
                <Briefcase className="h-8 w-8" />
              </div>

              <p className="mt-8 text-sm font-bold uppercase tracking-[0.15em] text-green-200">
                Project Overview
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Building a Sustainable Fisheries Sector
              </h2>

              <p className="mt-5 leading-8 text-slate-300">
                The Ministry implements development initiatives that improve
                fisheries infrastructure, strengthen coastal communities,
                promote marine conservation and modernize the fisheries sector
                through sustainable investment.
              </p>

              <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">
                    Fisheries Development
                  </span>
                  <span className="font-semibold">Active</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-300">
                    Infrastructure Projects
                  </span>
                  <span className="font-semibold">Ongoing</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-300">
                    Marine Conservation
                  </span>
                  <span className="font-semibold">Supported</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-300">
                    Community Programmes
                  </span>
                  <span className="font-semibold">Available</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-300">
                    Digital Initiatives
                  </span>
                  <span className="font-semibold">Growing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}