import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Search } from "lucide-react"

import { popularServices } from "@/data/services"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "All Services",
  description:
    "Browse all public services and guidance provided through the Ministry website.",
}

export default function AllServicesPage() {
  return (
    <>
      <SiteHeader />

      <main
        id="main-content"
        tabIndex={-1}
        className="outline-none"
      >
        <Breadcrumb
          items={[
            {
              label: "Services",
              href: "/services",
            },
            {
              label: "All Services",
            },
          ]}
        />

        <section className="bg-slate-950 px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">
              Service directory
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Browse all services
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">
              Find public-service information, application guidance and
              responsible institutions.
            </p>

            <form
              action="/services/all"
              method="get"
              role="search"
              className="mt-8 max-w-2xl"
            >
              <label
                htmlFor="all-services-search"
                className="sr-only"
              >
                Search all services
              </label>

              <div className="relative">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
                />

                <input
                  id="all-services-search"
                  name="query"
                  type="search"
                  maxLength={100}
                  placeholder="Search services"
                  className="min-h-14 w-full rounded-xl bg-white py-3 pl-12 pr-4 text-slate-950 outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
                />
              </div>
            </form>
          </div>
        </section>

        <section
          aria-labelledby="all-services-heading"
          className="bg-white px-4 py-16 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <h2
              id="all-services-heading"
              className="text-3xl font-bold text-slate-950"
            >
              Available service information
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-slate-600">
              This directory currently contains demonstration content. Replace
              it with verified Ministry services before publication.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {popularServices.map((service) => {
                const Icon = service.icon

                return (
                  <article
                    key={service.title}
                    className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-emerald-200 hover:shadow-lg"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-[#256B29]">
                      <Icon
                        aria-hidden="true"
                        className="h-7 w-7"
                      />
                    </div>

                    <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
                      {service.category.replaceAll("-", " ")}
                    </p>

                    <h3 className="mt-3 text-xl font-bold text-slate-950">
                      {service.title}
                    </h3>

                    <p className="mt-4 flex-1 leading-7 text-slate-600">
                      {service.description}
                    </p>

                    <Link
                      href={service.href}
                      className="mt-7 inline-flex w-fit items-center gap-2 rounded-lg font-semibold text-[#256B29] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                    >
                      View service
                      <ArrowRight
                        aria-hidden="true"
                        className="h-5 w-5"
                      />
                    </Link>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}