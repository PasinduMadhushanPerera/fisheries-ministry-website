"use client"

import { useState } from "react"
import Image from "next/image"
import {
  CalendarDays,
  FileText,
  MapPin,
  Tag,
  X,
  Printer,
  ShieldCheck,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { getFeaturedPressRelease, type PressRelease } from "@/data/press-releases"

export function FeaturedPressRelease() {
  const featuredPressRelease = getFeaturedPressRelease()
  const [modalRelease, setModalRelease] = useState<PressRelease | null>(null)

  if (!featuredPressRelease) {
    return null
  }

  return (
    <>
      <section aria-labelledby="featured-press-release-heading" className="bg-white py-12 sm:py-16">
        <Container>
          <div className="flex flex-col gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-[#256B29] border border-emerald-200">
                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Featured Statement</span>
              </span>
              <h2
                id="featured-press-release-heading"
                className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900"
              >
                Latest Official Announcement
              </h2>
            </div>
          </div>

          <article className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <button
                type="button"
                onClick={() => setModalRelease(featuredPressRelease)}
                className="group relative block w-full min-h-[20rem] sm:min-h-[26rem] overflow-hidden text-left cursor-pointer"
              >
                <Image
                  src={featuredPressRelease.image ?? "/images/placeholder.jpg"}
                  alt={featuredPressRelease.imageAlt ?? featuredPressRelease.title}
                  fill
                  priority
                  sizes="(min-width:1024px) 60vw,100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                <div className="absolute left-5 top-5">
                  <span className="rounded-md bg-[#256B29] px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white">
                    {featuredPressRelease.category}
                  </span>
                </div>

                <div className="absolute bottom-5 right-5">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-950/80 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                    <Tag aria-hidden="true" className="h-3.5 w-3.5 text-emerald-300" />
                    <span>{featuredPressRelease.referenceNumber}</span>
                  </span>
                </div>
              </button>

              <div className="flex flex-col justify-center bg-[linear-gradient(145deg,#071d24_0%,#0a322f_55%,#0a4350_100%)] p-7 text-white sm:p-10">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Official Statement
                </span>

                <h3 className="mt-3 text-2xl font-extrabold leading-tight">
                  <button
                    type="button"
                    onClick={() => setModalRelease(featuredPressRelease)}
                    className="text-left !text-white hover:text-emerald-300 transition-colors cursor-pointer"
                  >
                    {featuredPressRelease.title}
                  </button>
                </h3>

                <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {featuredPressRelease.summary}
                </p>

                <div className="mt-6 flex flex-wrap gap-4 border-y border-white/10 py-4 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                    <span>{featuredPressRelease.displayDate}</span>
                  </div>

                  {featuredPressRelease.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                      <span>{featuredPressRelease.location}</span>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setModalRelease(featuredPressRelease)}
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-extrabold text-slate-950 transition hover:bg-emerald-100 cursor-pointer"
                >
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  <span>Read Full Release</span>
                </button>
              </div>
            </div>
          </article>
        </Container>
      </section>

      {/* MODAL WITH Z-[9999] */}
      {modalRelease && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="featured-release-modal-title"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 p-4 sm:p-6 backdrop-blur-md overflow-y-auto"
        >
          <div className="relative w-full max-w-3xl max-h-[88vh] flex flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-auto">
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-[#256B29] px-2.5 py-1 text-xs font-extrabold text-white">
                  {modalRelease.category}
                </span>
                <span className="text-xs font-bold text-slate-500">Featured Press Release</span>
              </div>
              <button
                type="button"
                onClick={() => setModalRelease(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <p className="text-xs font-semibold text-slate-500 mb-1">Ref: {modalRelease.referenceNumber} • Published: {modalRelease.displayDate}</p>
                <h3 id="featured-release-modal-title" className="text-2xl font-extrabold text-slate-900 leading-snug">
                  {modalRelease.title}
                </h3>
              </div>

              <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                {modalRelease.summary}
              </p>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 flex items-center gap-3 text-xs text-slate-700">
                <ShieldCheck className="h-5 w-5 text-[#256B29] shrink-0" />
                <span>Authenticated official statement issued by the Ministry of Fisheries, Aquatic and Ocean Resources.</span>
              </div>
            </div>

            <div className="flex shrink-0 items-center justify-between border-t border-slate-200 px-6 py-4 bg-slate-50">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <Printer className="h-3.5 w-3.5 text-slate-500" />
                <span>Print Statement</span>
              </button>
              <button
                type="button"
                onClick={() => setModalRelease(null)}
                className="inline-flex min-h-[38px] items-center gap-2 rounded-xl bg-[#388E3C] px-5 text-xs font-bold text-white hover:bg-[#256B29] transition cursor-pointer"
              >
                <span>Close Statement</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}