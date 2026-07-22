import Link from "next/link"
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { upcomingEvents } from "@/data/media"

export function UpcomingEvents() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#2f7d32]">
              Events
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Upcoming Programmes & Events
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Discover conferences, workshops, awareness campaigns,
              exhibitions and public programmes organized by the Ministry.
            </p>
          </div>

          <Link
            href="/media/events"
            className="inline-flex items-center gap-2 font-semibold text-[#0a322f] transition hover:gap-3"
          >
            View All Events
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <article
              key={event.id}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-green-300 hover:shadow-xl"
            >
              {/* Top */}

              <div className="relative bg-gradient-to-br from-[#0a322f] via-[#0d4b45] to-[#0b6974] p-8 text-white">
                <div
                  aria-hidden="true"
                  className="absolute right-0 top-0 h-32 w-32 rounded-full bg-white/10 blur-3xl"
                />

                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-300 text-slate-900 shadow-lg">
                    <CalendarDays className="h-8 w-8" />
                  </div>

                  <p className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-green-200">
                    Upcoming Event
                  </p>

                  <h3 className="mt-3 text-2xl font-bold leading-snug">
                    {event.title}
                  </h3>
                </div>
              </div>

              {/* Content */}

              <div className="space-y-5 p-8">
                <div className="flex items-center gap-3 text-slate-600">
                  <CalendarDays className="h-5 w-5 text-green-700" />
                  <span>{event.date}</span>
                </div>

                <div className="flex items-center gap-3 text-slate-600">
                  <MapPin className="h-5 w-5 text-green-700" />
                  <span>{event.location}</span>
                </div>

                <div className="flex items-center gap-3 text-slate-600">
                  <Clock3 className="h-5 w-5 text-green-700" />
                  <span>Further details will be announced.</span>
                </div>

                <div className="border-t border-slate-200 pt-6">
                  <Link
                    href={event.href}
                    className="inline-flex items-center gap-2 font-semibold text-[#0a322f] transition hover:gap-3"
                  >
                    View Details
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}

        <div className="mt-16 rounded-[2rem] border border-green-200 bg-gradient-to-r from-green-50 via-white to-cyan-50 p-8 sm:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#2f7d32]">
                Participate
              </p>

              <h3 className="mt-3 text-3xl font-bold text-slate-900">
                Join Ministry Events
              </h3>

              <p className="mt-4 text-lg leading-8 text-slate-600">
                Participate in workshops, awareness programmes,
                conferences and stakeholder meetings conducted by the
                Ministry of Fisheries.
              </p>
            </div>

            <Link
              href="/media/events"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0a322f] px-7 py-4 font-semibold text-white transition hover:bg-green-800"
            >
              Explore Events
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}