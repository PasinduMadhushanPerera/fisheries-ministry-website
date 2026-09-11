"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertTriangle, ArrowRight, FileText, HelpCircle, Send, X } from "lucide-react"

import { Container } from "@/components/ui/container"

export function ComplaintOptions() {
  const [showModal, setShowModal] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  return (
    <section aria-labelledby="complaint-options-heading" className="bg-white py-14 sm:py-18">
      <Container>
        <div className="flex flex-col gap-2 border-b border-slate-200 pb-6 mb-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#256B29]">
            Public Actions
          </p>

          <h2 id="complaint-options-heading" className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
            Complaint & Inquiry Options
          </h2>

          <p className="text-xs sm:text-sm leading-relaxed text-slate-600 max-w-2xl">
            Select an action below to log an official grievance, report misconduct, or consult our desk officers.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-stretch">
          {/* Card 1: Submit Complaint */}
          <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-emerald-950 via-[#071b18] to-slate-950 p-7 sm:p-8 text-white shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <AlertTriangle className="h-7 w-7 text-amber-400" />
                </div>
                <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-extrabold text-amber-300 border border-amber-500/30">
                  Official Portal
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-white">Submit Complaint</h3>

              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed text-justify">
                Report misconduct, corruption, administrative irregularities, or service-related concerns securely to the Ministry's Internal Affairs Unit.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false)
                  setShowModal(true)
                }}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-6 text-xs font-extrabold text-slate-950 shadow-md transition hover:bg-emerald-100 cursor-pointer"
              >
                <FileText className="h-4 w-4 text-[#256B29]" />
                <span>Submit Complaint Now</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Card 2: General Inquiry */}
          <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-7 sm:p-8 shadow-md">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-[#256B29] border border-emerald-200">
                  <HelpCircle className="h-7 w-7" />
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-[#256B29] border border-emerald-200">
                  Help Desk
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-slate-950">General Inquiry</h3>

              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                Ask questions regarding Internal Affairs services, clarify complaint procedures, or request public service guidance from our team.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#256B29] px-6 text-xs font-extrabold text-white shadow-sm transition hover:bg-[#1b4d1d]"
              >
                <span>Contact Officer</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* MODAL FORM FOR COMPLAINT SUBMISSION */}
        {showModal && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="complaint-modal-title"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 p-4 sm:p-6 backdrop-blur-sm overflow-y-auto"
          >
            <div className="relative w-full max-w-xl max-h-[90vh] flex flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-auto">
              <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
                <h3 id="complaint-modal-title" className="text-lg font-extrabold text-slate-950">
                  Official Complaint Submission Form
                </h3>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 sm:p-7">
                {submitted ? (
                  <div className="py-8 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-[#256B29] mb-4">
                      <Send className="h-8 w-8" />
                    </div>
                    <h4 className="text-xl font-extrabold text-slate-950">Complaint Submitted Successfully!</h4>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                      Your reference tracking ID is <strong className="text-slate-950">IAU-2026-8942</strong>. A confirmation email has been logged with our oversight team.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="mt-6 inline-flex min-h-10 items-center justify-center rounded-xl bg-[#256B29] px-6 text-xs font-extrabold text-white"
                    >
                      Close Window
                    </button>
                  </div>
                ) : (
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault()
                      setSubmitted(true)
                    }}
                  >
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Full Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="Your name"
                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs text-slate-950 outline-none focus:border-[#256B29] focus:ring-2 focus:ring-emerald-200"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">Phone Number *</label>
                        <input
                          required
                          type="tel"
                          placeholder="07X XXX XXXX"
                          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs text-slate-950 outline-none focus:border-[#256B29] focus:ring-2 focus:ring-emerald-200"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">Email Address</label>
                        <input
                          type="email"
                          placeholder="name@example.com"
                          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs text-slate-950 outline-none focus:border-[#256B29] focus:ring-2 focus:ring-emerald-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Department / Subject *</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Harbour licensing, inspection, staff conduct"
                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs text-slate-950 outline-none focus:border-[#256B29] focus:ring-2 focus:ring-emerald-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Complaint Details *</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Provide dates, location, and clear description..."
                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs text-slate-950 outline-none focus:border-[#256B29] focus:ring-2 focus:ring-emerald-200"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#256B29] px-6 text-xs font-extrabold text-white transition hover:bg-[#1b4d1d] cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                      <span>Submit Official Complaint</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
