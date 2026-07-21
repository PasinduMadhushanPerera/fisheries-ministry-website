import Link from "next/link"
import { ArrowRight, CircleHelp } from "lucide-react"

import { Container } from "@/components/ui/container"

export function AnnualReportsHelp() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-8 rounded-[2rem] border border-slate-200 bg-slate-50 p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-800">
              <CircleHelp
                aria-hidden="true"
                className="h-7 w-7"
              />
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950">
              Need an older annual report?
            </h2>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              Contact the Ministry and include the required reporting year,
              preferred language and related department.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-[#0a322f] px-6 py-3 font-semibold text-white transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200 lg:self-auto"
          >
            Request assistance
            <ArrowRight
              aria-hidden="true"
              className="h-5 w-5"
            />
          </Link>
        </div>
      </Container>
    </section>
  )
}