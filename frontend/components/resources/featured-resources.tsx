import Link from "next/link"
import {
  ArrowRight,
  CalendarDays,
  Download,
  FileText,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { featuredResources } from "@/data/resources"

export function FeaturedResources() {
  return (
    <section
      aria-labelledby="featured-resources-heading"
      className="bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#2f7d32]">
              Featured resources
            </p>

            <h2
              id="featured-resources-heading"
              className="mt-3 text-3xl font-bold tracking-[-0.025em] text-slate-950 sm:text-4xl"
            >
              Important documents and publications
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Access recently highlighted reports, official publications,
              downloadable forms and other important Ministry resources.
            </p>
          </div>

          <Link
            href="/resources/documents"
            className="inline-flex min-h-11 items-center gap-2 self-start rounded-lg border border-slate-300 bg-white px-5 py-2.5 font-semibold text-slate-800 transition hover:border-green-600 hover:bg-green-50 hover:text-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200 lg:self-auto"
          >
            Browse all documents

            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4"
            />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {featuredResources.map((resource) => (
            <article
              key={`${resource.category}-${resource.title}`}
              className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-xl"
            >
              <div className="relative overflow-hidden bg-[#071f26] px-7 py-8 text-white">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.22),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.18),transparent_42%)]"
                />

                <div
                  aria-hidden="true"
                  className="absolute -right-10 -top-10 h-28 w-28 rounded-full border border-white/10 bg-white/[0.03]"
                />

                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-300 text-slate-950 shadow-lg">
                      <FileText
                        aria-hidden="true"
                        className="h-7 w-7"
                      />
                    </div>

                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-green-100">
                      {resource.fileType}
                    </span>
                  </div>

                  <p className="mt-6 text-sm font-bold uppercase tracking-[0.14em] text-green-200">
                    {resource.category}
                  </p>

                  <h3 className="mt-3 text-2xl font-bold leading-snug">
                    {resource.title}
                  </h3>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-7">
                <p className="leading-7 text-slate-600">
                  {resource.description}
                </p>

                {resource.publishedDate ? (
                  <div className="mt-5 flex items-center gap-2 text-sm font-medium text-slate-500">
                    <CalendarDays
                      aria-hidden="true"
                      className="h-4 w-4"
                    />
                    Published {resource.publishedDate}
                  </div>
                ) : null}

                <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row">
                  <Link
                    href={resource.href}
                    className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#0a322f] px-4 py-2.5 font-semibold text-white transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                  >
                    View resource

                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    />
                  </Link>

                  <Link
                    href={resource.href}
                    aria-label={`Download ${resource.title}`}
                    className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 transition hover:border-green-600 hover:bg-green-50 hover:text-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                  >
                    <Download
                      aria-hidden="true"
                      className="h-4 w-4"
                    />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
          <p className="text-sm leading-6 text-amber-900">
            Replace the sample entries with verified document titles, dates,
            file links and descriptions after official Ministry approval.
          </p>
        </div>
      </Container>
    </section>
  )
}