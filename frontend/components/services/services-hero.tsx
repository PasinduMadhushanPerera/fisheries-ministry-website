import Link from "next/link"
import {
  Anchor,
  ArrowRight,
  Search,
} from "lucide-react"

import {
  popularServiceSearches,
  serviceQuickLinks,
} from "@/data/services"

export function ServicesHero() {
  return (
    <section
      aria-labelledby="services-hero-heading"
      className="relative isolate overflow-hidden bg-slate-950 text-white"
    >
      {/* Background decorations */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-[#063b27] via-[#0b5b38] to-[#075985]"
      />

      <div
        aria-hidden="true"
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cyan-300/15 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-24 h-[28rem] w-[28rem] rounded-full bg-emerald-300/15 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-xl backdrop-blur">
            <Anchor
              aria-hidden="true"
              className="h-8 w-8"
            />
          </div>

          <p className="mt-7 text-sm font-bold uppercase tracking-[0.24em] text-emerald-100">
            Public services
          </p>

          <h1
            id="services-hero-heading"
            className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Find Ministry services and information
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-100 sm:text-xl">
            Search for public services, application guidance, forms,
            licences, permits and fisheries-related information.
          </p>

          <form
            action="/services"
            method="get"
            role="search"
            className="mx-auto mt-10 max-w-3xl"
          >
            <label
              htmlFor="service-search"
              className="sr-only"
            >
              Search Ministry services
            </label>

            <div className="flex flex-col gap-3 rounded-2xl border border-white/20 bg-white p-2 shadow-2xl sm:flex-row">
              <div className="relative flex-1">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
                />

                <input
                  id="service-search"
                  name="query"
                  type="search"
                  autoComplete="off"
                  maxLength={100}
                  placeholder="Search licences, forms, permits and services"
                  className="min-h-14 w-full rounded-xl border-0 bg-white py-3 pl-12 pr-4 text-base text-slate-950 outline-none placeholder:text-slate-500 focus-visible:ring-4 focus-visible:ring-emerald-200"
                />
              </div>

              <button
                type="submit"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#176b3a] px-7 py-3 font-semibold text-white transition hover:bg-[#10582f] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
              >
                Search services

                <ArrowRight
                  aria-hidden="true"
                  className="h-5 w-5"
                />
              </button>
            </div>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm font-medium text-slate-200">
              Popular:
            </span>

            {popularServiceSearches.map((searchTerm) => (
              <Link
                key={searchTerm}
                href={`/services?query=${encodeURIComponent(searchTerm)}`}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
              >
                {searchTerm}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {serviceQuickLinks.map((service) => {
            const Icon = service.icon

            return (
              <Link
                key={service.title}
                href={service.href}
                className="group rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#176b3a] shadow">
                  <Icon
                    aria-hidden="true"
                    className="h-6 w-6"
                  />
                </div>

                <h2 className="mt-5 text-lg font-bold">
                  {service.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-200">
                  {service.description}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  View services

                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}