"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  X,
  UserCheck,
  Building,
  Sparkles,
  ShieldCheck,
  Phone,
  Printer,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { upcomingEvents, type Event } from "@/data/media"

export function UpcomingEvents() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  return (
    <>
      <section className="bg-slate-50/80 py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-extrabold uppercase tracking-wider text-[#256B29] flex items-center gap-1.5 mb-1">
                <Sparkles className="h-4 w-4 text-[#256B29]" />
                <span>Events Calendar</span>
              </p>

              <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Upcoming Programmes & Events
              </h2>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed text-justify">
                Discover conferences, workshops, awareness campaigns, exhibitions and public programmes organized by the Ministry of Fisheries.
              </p>
            </div>

            <Link
              href="/media-centre/events"
              className="inline-flex items-center gap-2 text-xs font-extrabold text-[#256B29] transition hover:text-[#1b4d1d] group/link"
            >
              <span>View Full Events Calendar</span>
              <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <article
                key={event.id}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Event Card Header - Premium Ocean Dark Gradient with White Title */}
                <button
                  type="button"
                  onClick={() => setSelectedEvent(event)}
                  className="relative block w-full text-left bg-[linear-gradient(135deg,#041c22_0%,#093835_55%,#0c4e48_100%)] p-6 text-white cursor-pointer overflow-hidden"
                >
                  <div
                    aria-hidden="true"
                    className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-emerald-400/10 blur-xl group-hover:bg-emerald-400/20 transition-all duration-500"
                  />

                  <div className="relative z-10">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-emerald-300 backdrop-blur-md border border-white/10">
                      <CalendarDays className="h-5 w-5" />
                    </div>

                    <span className="mt-4 block text-[11px] font-extrabold uppercase tracking-wider text-emerald-300">
                      Upcoming Event
                    </span>

                    <h3 className="mt-2 text-lg font-extrabold leading-snug !text-white group-hover:text-emerald-300 transition-colors">
                      {event.title}
                    </h3>
                  </div>
                </button>

                {/* Event Info Body */}
                <div className="space-y-4 p-6 text-xs text-slate-600 font-medium flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-[#256B29]">
                        <CalendarDays className="h-4 w-4" />
                      </div>
                      <span className="font-bold text-slate-900">{event.date}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-[#256B29]">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <span className="text-slate-700">{event.location}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-[#256B29]">
                        <Clock3 className="h-4 w-4" />
                      </div>
                      <span className="text-slate-500">Full agenda & schedule available.</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <button
                      type="button"
                      onClick={() => setSelectedEvent(event)}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#256B29] hover:text-[#1b4d1d] cursor-pointer group/btn"
                    >
                      <span>View Event Details & Agenda</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-14 rounded-3xl border border-emerald-200/80 bg-gradient-to-r from-emerald-50/80 via-white to-teal-50/80 p-6 sm:p-8 shadow-2xs">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#256B29]">
                  Public Participation
                </span>

                <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-slate-900">
                  Join Ministry Events & Workshops
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                  Participate in workshops, awareness programmes, conferences and stakeholder meetings conducted by the Ministry of Fisheries across coastal and inland districts.
                </p>
              </div>

              <Link
                href="/media-centre/events"
                className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#256B29] px-6 text-xs font-extrabold text-white transition hover:bg-[#1b4d1d] shadow-md shadow-emerald-900/10"
              >
                <span>Explore All Events</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ULTRA-PREMIUM EVENT PREVIEW POPUP MODAL WITH PURE WHITE TITLE */}
      {selectedEvent && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-modal-title"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 p-4 sm:p-6 backdrop-blur-md overflow-y-auto"
        >
          <div className="relative w-full max-w-2xl max-h-[88vh] flex flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Premium Dark Header Bar with White Title */}
            <div className="flex shrink-0 flex-col gap-3 border-b border-slate-200 px-6 sm:px-8 py-6 bg-[linear-gradient(135deg,#041c22_0%,#093835_55%,#0c4e48_100%)] text-white relative overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/10 blur-xl"
              />

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-emerald-500/20 border border-emerald-400/30 px-2.5 py-1 text-xs font-extrabold text-emerald-300 shadow-xs">
                    Ministry Event
                  </span>
                  <span className="text-xs font-bold text-slate-300">Official Programme</span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:bg-white hover:text-slate-900 transition-colors cursor-pointer"
                  aria-label="Close event details"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {/* Pure White Event Title */}
              <div className="relative z-10 mt-1">
                <h3 id="event-modal-title" className="text-2xl font-extrabold !text-white leading-snug tracking-tight">
                  {selectedEvent.title}
                </h3>
              </div>
            </div>

            {/* Modal Content Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-600 mb-2">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4 text-[#256B29]" />
                    <span>Date: {selectedEvent.date}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-[#256B29]" />
                    <span>Venue: {selectedEvent.location}</span>
                  </div>
                </div>
              </div>

              {/* Justified Description Text */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal text-justify">
                <p className="text-justify">
                  Official programme organized by the Ministry of Fisheries to bring together key marine stakeholders, regional officers, artisanal fishers, and aquaculture operators across Sri Lanka.
                </p>
                <p className="text-justify">
                  Attendees will receive technical guidance, policy briefings, safety protocol updates, and interactive training sessions led by senior Ministry directors and scientific specialists.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
                  <Building className="h-4 w-4 text-[#256B29]" />
                  <span>Event Venue & Registration</span>
                </div>
                <p className="text-xs text-slate-600 text-justify">
                  Location: {selectedEvent.location} • Registration required at venue or through regional fisheries offices. Contact info@fisheries.gov.lk for details.
                </p>
              </div>
            </div>

            {/* Modal Action Footer */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-200 px-6 py-4 bg-slate-50">
              <Link
                href="/media-centre/events"
                className="inline-flex min-h-[40px] items-center gap-2 rounded-xl bg-[#256B29] px-5 text-xs font-extrabold text-white hover:bg-[#1b4d1d] transition shadow-2xs"
              >
                <span>View Full Events Calendar</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <span>Close Event Window</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}