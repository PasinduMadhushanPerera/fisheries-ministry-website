import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Container } from "@/components/ui/container"
import { licenceGuidanceItems } from "@/data/licences-and-registrations"

export function LicenceGuidance() {
  return (
    <section
      aria-labelledby="licence-guidance-heading"
      className="bg-white py-16 sm:py-20"
    >
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
            Application guidance
          </p>

          <h2
            id="licence-guidance-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
          >
            Prepare before you apply
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Review official forms, supporting document requirements and
            application guidance before submitting a licence, permit,
            registration or renewal request.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {licenceGuidanceItems.map((item) => {
            const Icon = item.icon

            return (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-7 transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:bg-white hover:shadow-lg sm:p-8"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-green-100/60 blur-3xl"
                />

                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700 transition group-hover:bg-green-700 group-hover:text-white">
                    <Icon aria-hidden="true" className="h-7 w-7" />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold tracking-tight text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-600">
                    {item.description}
                  </p>

                  <Link
                    href={item.href}
                    className="mt-6 inline-flex items-center gap-2 font-semibold text-green-700 transition hover:text-green-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                  >
                    {item.linkLabel}

                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}