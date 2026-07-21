import Link from "next/link"
import {
  ArrowRight,
  Headphones,
  Search,
  Send,
} from "lucide-react"

import { Container } from "@/components/ui/container"

export function ResourceHelp() {
  return (
    <section
      aria-labelledby="resource-help-heading"
      className="relative isolate overflow-hidden bg-[#061d24] py-16 text-white sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(34,197,94,0.16),transparent_34%),radial-gradient(circle_at_88%_20%,rgba(14,165,233,0.2),transparent_36%),linear-gradient(135deg,#061d24_0%,#0a322f_50%,#0a4350_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute -right-28 -top-36 h-[30rem] w-[30rem] rounded-full border border-white/10 bg-white/[0.025]"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-48 -left-28 h-[32rem] w-[32rem] rounded-full border border-green-100/10 bg-green-300/[0.025]"
      />

      <Container className="relative z-10">
        <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.07] shadow-2xl backdrop-blur-xl">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
            <div className="p-7 sm:p-10 lg:p-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white">
                <Headphones
                  aria-hidden="true"
                  className="h-4 w-4 text-green-200"
                />
                Resource assistance
              </div>

              <h2
                id="resource-help-heading"
                className="mt-6 max-w-2xl text-3xl font-bold tracking-[-0.025em] sm:text-4xl"
              >
                Need help finding a document or publication?
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Search the website or contact the Ministry for support
                locating forms, reports, circulars, publications and
                other official resources.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/search"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
                >
                  <Search
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                  Search resources
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
                >
                  Contact the Ministry
                  <ArrowRight
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                </Link>
              </div>
            </div>

            <div className="border-t border-white/10 bg-white/[0.04] p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-300 text-slate-950 shadow-lg">
                <Send
                  aria-hidden="true"
                  className="h-8 w-8"
                />
              </div>

              <p className="mt-7 text-sm font-bold uppercase tracking-[0.16em] text-green-200">
                Contact guidance
              </p>

              <h3 className="mt-3 text-2xl font-bold">
                Request assistance from the Ministry
              </h3>

              <p className="mt-4 leading-8 text-slate-300">
                When contacting the Ministry, include the document
                title, relevant service, year or department whenever
                possible so the correct resource can be identified
                quickly.
              </p>

              <div className="mt-7 border-t border-white/10 pt-6">
                <p className="text-sm leading-6 text-slate-300">
                  Response times and official contact details should
                  be added after confirmation by the Ministry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}