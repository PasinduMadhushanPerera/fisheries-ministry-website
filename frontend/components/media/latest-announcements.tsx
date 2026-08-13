"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Bell,
  CalendarDays,
  ChevronRight,
  FileText,
  X,
  ShieldCheck,
  Printer,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { latestAnnouncements, type Announcement } from "@/data/media"

export function LatestAnnouncements() {
  const [selectedNotice, setSelectedNotice] = useState<Announcement | null>(null)

  return (
    <>
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-extrabold uppercase tracking-wider text-[#256B29]">
                Public Notices
              </p>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Latest Announcements & Gazettes
              </h2>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Stay informed with official public notices, service updates, circular information and important ministry announcements.
              </p>
            </div>

            {/* ONLY VIEW ALL OPTION NAVIGATES TO ANOTHER PAGE */}
            <Link
              href="/media-centre/notices"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#256B29] transition hover:text-[#388E3C]"
            >
              <span>View All Notices</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            {/* Left Card */}
            <div className="rounded-3xl bg-[#061d24] p-8 text-white flex flex-col justify-between">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#388E3C] text-white">
                  <Bell className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-2xl font-extrabold">
                  Official Announcements
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Important notices issued by the Ministry for the public, stakeholders, fisheries communities and government institutions.
                </p>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Official notices and tender documents are published regularly and accessible for public download.
                  </p>
                </div>
              </div>

              {/* ONLY VIEW ALL OPTION NAVIGATES TO ANOTHER PAGE */}
              <Link
                href="/media-centre/notices"
                className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-emerald-300 hover:text-white transition"
              >
                <span>Notice Archive</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Announcement List */}
            <div className="space-y-4">
              {latestAnnouncements.map((announcement) => (
                <article
                  key={announcement.id}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs transition-all duration-300 hover:border-slate-300 hover:shadow-md"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-xs font-extrabold text-[#256B29]">
                        <Bell className="h-3.5 w-3.5" />
                        Notice
                      </span>

                      <h3 className="mt-3 text-base font-extrabold text-slate-900">
                        <button
                          type="button"
                          onClick={() => setSelectedNotice(announcement)}
                          className="text-left hover:text-[#388E3C] transition-colors cursor-pointer"
                        >
                          {announcement.title}
                        </button>
                      </h3>

                      <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                        <span>{announcement.date}</span>
                      </div>
                    </div>

                    {/* OPENS SAME-PAGE PREVIEW MODAL */}
                    <button
                      type="button"
                      onClick={() => setSelectedNotice(announcement)}
                      className="inline-flex min-h-[38px] shrink-0 items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 text-xs font-bold text-slate-700 transition hover:bg-slate-50 cursor-pointer"
                    >
                      <span>View Notice</span>
                      <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </button>
                  </div>
                </article>
              ))}

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Looking for older announcements?
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Browse the complete archive of official announcements, notices and ministry communications.
                  </p>
                </div>

                {/* ONLY VIEW ALL OPTION NAVIGATES TO ANOTHER PAGE */}
                <Link
                  href="/media-centre/notices"
                  className="inline-flex min-h-[38px] shrink-0 items-center gap-1.5 rounded-xl bg-[#388E3C] px-4 text-xs font-bold text-white hover:bg-[#256B29] transition"
                >
                  <span>Browse Notice Archive</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SAME-PAGE ANNOUNCEMENT PREVIEW MODAL WITH Z-[9999] */}
      {selectedNotice && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="notice-modal-title"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 p-4 sm:p-6 backdrop-blur-md overflow-y-auto"
        >
          <div className="relative w-full max-w-2xl max-h-[88vh] flex flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-[#256B29] px-2.5 py-1 text-xs font-extrabold text-white">
                  Public Announcement
                </span>
                <span className="text-xs font-bold text-slate-500">Official Notice</span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedNotice(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors cursor-pointer"
                aria-label="Close notice preview"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <p className="text-xs font-semibold text-slate-500 mb-1">Published: {selectedNotice.date}</p>
                <h3 id="notice-modal-title" className="text-2xl font-extrabold text-slate-900 leading-snug">
                  {selectedNotice.title}
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  This official public notice is issued by the Ministry of Fisheries, Aquatic and Ocean Resources for public awareness and stakeholder compliance.
                </p>
                <p>
                  All concerned parties, fisheries organizations, and commercial operators are advised to follow official procedural guidelines as published in the Government Gazette and Ministry directives.
                </p>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 flex items-center gap-3 text-xs text-slate-700">
                <ShieldCheck className="h-5 w-5 text-[#256B29] shrink-0" />
                <span>Verified & authenticated announcement by the Ministry Information Desk.</span>
              </div>
            </div>

            {/* Modal Action Footer */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-200 px-6 py-4 bg-slate-50">
              <Link
                href="/media-centre/notices"
                className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl bg-[#388E3C] px-4 text-xs font-bold text-white hover:bg-[#256B29] transition"
              >
                <span>View Full Notice Page</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <button
                type="button"
                onClick={() => setSelectedNotice(null)}
                className="inline-flex min-h-[38px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <span>Close Notice</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}