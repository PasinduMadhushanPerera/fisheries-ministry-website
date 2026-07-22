import Link from "next/link"
import {
  ArrowRight,
  Mail,
  Phone,
} from "lucide-react"

import { Container } from "@/components/ui/container"

export function InstitutionsCTA() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-[#061d24]">
          {/* Background */}
          <div className="absolute inset-0">
            <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
          </div>

          <div className="relative grid gap-12 px-8 py-14 sm:px-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-16 lg:py-16">
            {/* Left */}
            <div>
              <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
                Need More Information?
              </span>

              <h2 className="mt-6 text-4xl font-bold tracking-tight text-white">
                Learn More About Our
                <span className="block text-emerald-300">
                  Departments & Institutions
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                If you require additional information regarding the Ministry&apos;s
                departments, affiliated institutions, public services or
                organizational responsibilities, our team is ready to assist
                you.
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
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20"
                >
                  View Services
                </Link>
              </div>
            </div>

            {/* Right Card */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-white">
                Contact Information
              </h3>

              <p className="mt-3 leading-7 text-slate-300">
                Our officers can provide guidance regarding departments,
                institutions and ministry-related public services.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-emerald-500/15 p-3 text-emerald-300">
                    <Phone className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-semibold text-white">
                      General Telephone
                    </p>

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
                    <p className="font-semibold text-white">
                      General Email
                    </p>

                    <p className="text-slate-300">
                      info@fisheries.gov.lk
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-white/10 pt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-semibold text-emerald-300 transition hover:gap-3"
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