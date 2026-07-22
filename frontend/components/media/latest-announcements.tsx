import Link from "next/link"
import {
  ArrowRight,
  Bell,
  CalendarDays,
  ChevronRight,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { latestAnnouncements } from "@/data/media"

export function LatestAnnouncements() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#2f7d32]">
              Public Notices
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Latest Announcements
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Stay informed with official public notices, service updates,
              circular information and important ministry announcements.
            </p>
          </div>

          <Link
            href="/media/announcements"
            className="inline-flex items-center gap-2 font-semibold text-[#0a322f] transition hover:gap-3"
          >
            View All
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          {/* Left Card */}

          <div className="rounded-3xl bg-[#0a322f] p-8 text-white">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-300 text-slate-900">
              <Bell className="h-8 w-8" />
            </div>

            <h3 className="mt-8 text-3xl font-bold">
              Official Announcements
            </h3>

            <p className="mt-5 leading-8 text-slate-300">
              Important notices issued by the Ministry for the public,
              stakeholders, fisheries communities and government
              institutions.
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm leading-7 text-slate-300">
                Future announcements will be published through the
                administration panel and automatically appear here.
              </p>
            </div>

            <Link
              href="/media/announcements"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-green-300"
            >
              Announcement Archive
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Announcement List */}

          <div className="space-y-5">
            {latestAnnouncements.map((announcement) => (
              <article
                key={announcement.id}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                      <Bell className="h-4 w-4" />
                      Announcement
                    </div>

                    <h3 className="mt-4 text-xl font-bold text-slate-900">
                      {announcement.title}
                    </h3>

                    <div className="mt-4 inline-flex items-center gap-2 text-sm text-slate-500">
                      <CalendarDays className="h-4 w-4" />
                      {announcement.date}
                    </div>
                  </div>

                  <Link
                    href={announcement.href}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-3 font-semibold text-[#0a322f] transition hover:border-green-600 hover:bg-green-50"
                  >
                    View Notice
                    <ChevronRight className="h-5 w-5 transition group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}

            <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
              <h3 className="text-lg font-bold text-slate-900">
                Looking for older announcements?
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Browse the complete archive of official announcements,
                notices and ministry communications.
              </p>

              <Link
                href="/media/announcements"
                className="mt-5 inline-flex items-center gap-2 font-semibold text-green-700"
              >
                Browse Archive
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}