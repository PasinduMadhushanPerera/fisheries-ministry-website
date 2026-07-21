import { ArrowRight, PhoneCall } from "lucide-react"
import Link from "next/link"

import { Section } from "@/components/ui/section"

export function AboutCTA() {
  return (
    <Section
      id="about-cta"
      background="white"
      spacing="lg"
    >
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0B4F2A] via-[#256B29] to-[#1B75BC] px-8 py-16 text-white shadow-2xl sm:px-12 lg:px-16">
        {/* Decorative background */}
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/10 blur-2xl"
        />

        <div
          aria-hidden="true"
          className="absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-white/5 blur-3xl"
        />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-100">
            Continue Your Journey
          </p>

          <h2 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
            Discover services, information and opportunities
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-green-50">
            Explore digital services, fisheries information, institutional
            resources, publications and official announcements from the
            Ministry of Fisheries, Aquatic and Ocean Resources.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-[#256B29] transition hover:scale-105 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
            >
              Explore Services

              <ArrowRight
                className="h-5 w-5"
                aria-hidden="true"
              />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
            >
              Contact the Ministry

              <PhoneCall
                className="h-5 w-5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
}