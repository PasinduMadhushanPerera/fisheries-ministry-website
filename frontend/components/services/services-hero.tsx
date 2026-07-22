import Link from "next/link"
import { Anchor, ArrowRight, Search } from "lucide-react"

import {
  popularServiceSearches,
  serviceQuickLinks,
} from "@/data/services"

import { Container } from "@/components/ui/container"

export function ServicesHero() {
  return (
    <section
      aria-labelledby="services-hero-heading"
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
        className="absolute -bottom-56 -left-28 h-[34rem] w-[34rem] rounded-full border border-green-200/10 bg-green-300/[0.03]"
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
              <Anchor className="h-4 w-4 text-green-200" />
              Public Services
            </div>

            <h1
              id="services-hero-heading"
              className="mt-7 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Ministry Services &
              <span className="block bg-gradient-to-r from-green-200 via-cyan-200 to-sky-200 bg-clip-text text-transparent">
                Public Information
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              Explore Ministry services, licences, permits, applications,
              downloadable forms and guidance for fisheries, aquatic resources
              and ocean-related activities.
            </p>

            <form
              action="/services"
              method="get"
              role="search"
              className="mt-10 max-w-2xl"
            >
              <label
                htmlFor="service-search"
                className="sr-only"
              >
                Search Ministry services
              </label>

              <div className="flex overflow-hidden rounded-2xl border border-white/20 bg-white shadow-2xl">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                  <input
                    id="service-search"
                    name="query"
                    type="search"
                    placeholder="Search services, licences, permits..."
                    className="h-16 w-full border-0 bg-transparent pl-12 pr-4 text-slate-900 outline-none placeholder:text-slate-500"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#256B29] px-7 font-semibold text-white transition hover:bg-[#1d5320]"
                >
                  Search

                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </form>

            <div className="mt-8 flex flex-wrap gap-3">
              {popularServiceSearches.map((item) => (
                <Link
                  key={item}
                  href={`/services?query=${encodeURIComponent(item)}`}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur transition hover:bg-white/20"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-8 rounded-full bg-cyan-400/10 blur-3xl"
            />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-300 text-slate-900">
                <Anchor className="h-8 w-8" />
              </div>

              <p className="mt-8 text-sm font-bold uppercase tracking-[0.15em] text-green-200">
                Quick Access
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Frequently Used Services
              </h2>

              <p className="mt-5 leading-8 text-slate-300">
                Access the Ministry's most requested public services, licensing
                information, downloadable forms and guidance from one place.
              </p>

              <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
                {serviceQuickLinks.slice(0, 4).map((service) => {
                  const Icon = service.icon

                  return (
                    <Link
                      key={service.title}
                      href={service.href}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-300 text-slate-900">
                          <Icon className="h-5 w-5" />
                        </div>

                        <span className="font-medium">
                          {service.title}
                        </span>
                      </div>

                      <ArrowRight className="h-5 w-5 text-green-200" />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}