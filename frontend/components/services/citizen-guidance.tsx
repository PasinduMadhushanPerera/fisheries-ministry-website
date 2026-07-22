import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Container } from "@/components/ui/container"
import { citizenGuidanceItems } from "@/data/citizen-services"

export function CitizenGuidance() {
  return (
    <section
      aria-labelledby="citizen-guidance-heading"
      className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20"
    >
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
            Guidance & Resources
          </p>

          <h2
            id="citizen-guidance-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
          >
            Prepare before you apply
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Before submitting an application, review the required forms,
            supporting documents and identify the correct institution
            responsible for your service.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {citizenGuidanceItems.map((item) => {
            const Icon = item.icon

            return (
              <article
                key={item.title}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700 transition group-hover:bg-green-100">
                  <Icon aria-hidden="true" className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-4 flex-1 leading-8 text-slate-600">
                  {item.description}
                </p>

                <Link
                  href={item.href}
                  className="mt-8 inline-flex items-center gap-2 self-start rounded-lg font-semibold text-green-700 transition hover:text-green-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                >
                  {item.linkLabel}

                  <ArrowRight
                    aria-hidden="true"
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}