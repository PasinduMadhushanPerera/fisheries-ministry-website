import Link from "next/link"
import {
  ArrowRight,
  CircleHelp,
  ShieldCheck,
} from "lucide-react"

import { Container } from "@/components/ui/container"

export function TendersHelp() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 lg:grid-cols-[1fr_0.82fr]">
          <div className="p-7 sm:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-800">
              <CircleHelp aria-hidden="true" className="h-7 w-7" />
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950">
              Need information about a tender?
            </h2>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              Contact the relevant Ministry division and provide the tender
              reference number when requesting clarification.
            </p>

            <Link
              href="/contact"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#0a322f] px-6 py-3 font-semibold text-white transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
            >
              Contact the Ministry
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </Link>
          </div>

          <div className="border-t border-slate-200 bg-white p-7 sm:p-10 lg:border-l lg:border-t-0">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-800">
              <ShieldCheck aria-hidden="true" className="h-7 w-7" />
            </div>

            <h3 className="mt-6 text-2xl font-bold text-slate-950">
              Before submitting a bid
            </h3>

            <ul className="mt-5 space-y-3 text-slate-600">
              <li>Read the complete tender document.</li>
              <li>Confirm eligibility and required documents.</li>
              <li>Check the closing date and submission time.</li>
              <li>Use only the officially stated submission method.</li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}