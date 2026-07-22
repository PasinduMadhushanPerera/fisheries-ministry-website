import Link from "next/link"
import {
  ArrowRight,
  Mail,
  Phone,
} from "lucide-react"

import { Container } from "@/components/ui/container"

export function ProjectsCTA() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="overflow-hidden rounded-[2rem] bg-[#061d24]">
          <div className="relative px-8 py-14 sm:px-12 lg:px-16">
            {/* Background Decoration */}

            <div className="absolute inset-0">
              <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
              <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
            </div>

            <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
                  Learn More
                </span>

                <h2 className="mt-6 text-4xl font-bold text-white">
                  Interested in Our Development Projects?
                </h2>

                <p className="mt-6 text-lg leading-8 text-slate-300">
                  Contact the Ministry of Fisheries to obtain more information
                  about ongoing initiatives, completed projects and development
                  programmes supporting Sri Lanka&apos;s fisheries sector.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
                  >
                    Contact Us
                    <ArrowRight className="h-5 w-5" />
                  </Link>

                  <Link
                    href="/media"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20"
                  >
                    Latest News
                  </Link>
                </div>
              </div>

              <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white">
                  Contact Information
                </h3>

                <div className="mt-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-emerald-500/15 p-3 text-emerald-300">
                      <Phone className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="font-semibold text-white">Telephone</p>
                      <p className="text-slate-300">
                        +94 XX XXX XXXX
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-emerald-500/15 p-3 text-emerald-300">
                      <Mail className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="font-semibold text-white">Email</p>
                      <p className="text-slate-300">
                        info@fisheries.gov.lk
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 font-semibold text-emerald-300 transition hover:gap-3"
                >
                  Visit Contact Page
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}