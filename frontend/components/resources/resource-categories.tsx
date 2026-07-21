import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Container } from "@/components/ui/container"
import { resourceCategories } from "@/data/resources"

export function ResourceCategories() {
  return (
    <section
      id="resource-categories"
      aria-labelledby="resource-categories-heading"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#2f7d32]">
              Resource categories
            </p>

            <h2
              id="resource-categories-heading"
              className="mt-3 text-3xl font-bold tracking-[-0.025em] text-slate-950 sm:text-4xl"
            >
              Find official information by category
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Browse Ministry documents, publications, reports,
              circulars, forms and tender information from one
              organized resource centre.
            </p>
          </div>

          <Link
            href="/resources/documents"
            className="inline-flex min-h-11 items-center gap-2 self-start rounded-lg border border-slate-300 px-5 py-2.5 font-semibold text-slate-800 transition hover:border-green-600 hover:bg-green-50 hover:text-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200 lg:self-auto"
          >
            View all documents
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4"
            />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {resourceCategories.map((category, index) => {
            const Icon = category.icon

            return (
              <Link
                key={category.href}
                href={category.href}
                className="group relative isolate min-h-[18rem] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50 p-7 transition duration-300 hover:-translate-y-1 hover:border-green-300 hover:bg-white hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-green-100/70 transition duration-300 group-hover:scale-125"
                />

                <div
                  aria-hidden="true"
                  className="absolute -bottom-20 -left-16 h-40 w-40 rounded-full bg-sky-100/60 transition duration-300 group-hover:scale-110"
                />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0a322f] text-white shadow-sm transition duration-300 group-hover:bg-green-700">
                      <Icon
                        aria-hidden="true"
                        className="h-7 w-7"
                      />
                    </div>

                    <span className="text-sm font-bold text-slate-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                    {category.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-600">
                    {category.description}
                  </p>

                  <div className="mt-auto flex items-center gap-2 pt-7 text-sm font-bold text-green-800">
                    Explore category

                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </Container>
    </section>
  )
}