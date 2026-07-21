import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Building2 } from "lucide-react"

import { departments } from "@/data/about"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "Departments and Institutions",
  description:
    "Explore departments and institutions associated with the Ministry.",
}

export default function InstitutionsPage() {
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
              label: "Departments and Institutions",
            },
          ]}
        />

        <section className="bg-gradient-to-br from-[#073f2a] via-[#256B29] to-[#075985] px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-100">
              Ministry network
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
              Departments and institutions
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-100">
              Explore public institutions, authorities and agencies associated
              with the fisheries and aquatic-resources sector.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="institutions-heading"
          className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <h2
              id="institutions-heading"
              className="text-3xl font-bold text-slate-950"
            >
              Institutional directory
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-slate-600">
              Institution names, responsibilities and links must be verified
              before the website is published.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {departments.map((department) => (
                <article
                  key={department.title}
                  className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-[#256B29]">
                    <Building2
                      aria-hidden="true"
                      className="h-7 w-7"
                    />
                  </div>

                  <h2 className="mt-6 text-xl font-bold leading-snug text-slate-950">
                    {department.title}
                  </h2>

                  <p className="mt-4 flex-1 leading-7 text-slate-600">
                    {department.description}
                  </p>

                  <Link
                    href={department.href}
                    className="mt-7 inline-flex w-fit items-center gap-2 rounded-lg font-semibold text-[#256B29] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                  >
                    View institution
                    <ArrowRight
                      aria-hidden="true"
                      className="h-5 w-5"
                    />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}