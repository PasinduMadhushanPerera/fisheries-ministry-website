"use client"

import { useState } from "react"
import { CheckCircle2, Loader2, Send } from "lucide-react"

import { Container } from "@/components/ui/container"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsSubmitting(true)

    // Replace with backend API later
    await new Promise((resolve) => setTimeout(resolve, 1200))

    setIsSubmitting(false)
    setSubmitted(true)

    event.currentTarget.reset()
  }

  return (
    <section
      id="contact-form"
      aria-labelledby="contact-form-heading"
      className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          {/* Left */}
          <div>
            <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-[#256B29]">
              Send an Inquiry
            </span>

            <h2
              id="contact-form-heading"
              className="mt-6 text-4xl font-bold tracking-tight text-slate-950"
            >
              We&apos;d Love to Hear From You
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Complete the form below to send your inquiry to the Ministry.
              Once the backend is connected, messages will be delivered directly
              to the appropriate department.
            </p>

            <div className="mt-10 rounded-[2rem] border border-emerald-100 bg-emerald-50 p-6">
              <h3 className="text-lg font-bold text-slate-900">
                Before You Submit
              </h3>

              <ul className="mt-4 space-y-3 text-slate-600">
                <li>• Provide your full name.</li>
                <li>• Use a valid email address.</li>
                <li>• Select the appropriate subject.</li>
                <li>• Clearly describe your inquiry.</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            {submitted ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <CheckCircle2 className="h-20 w-20 text-green-600" />

                <h3 className="mt-6 text-3xl font-bold text-slate-900">
                  Message Sent
                </h3>

                <p className="mt-4 max-w-md leading-8 text-slate-600">
                  Thank you for contacting the Ministry. This demo will later
                  connect to the Django backend and email service.
                </p>

                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 rounded-xl bg-[#256B29] px-6 py-3 font-semibold text-white transition hover:bg-[#1d5320]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Full Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      required
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#256B29]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      type="email"
                      required
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#256B29]"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Telephone
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#256B29]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Subject
                    </label>

                    <select
                      id="subject"
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#256B29]"
                    >
                      <option value="">Select a subject</option>
                      <option>General Inquiry</option>
                      <option>Public Service</option>
                      <option>Licensing</option>
                      <option>Technical Assistance</option>
                      <option>Complaints</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    rows={7}
                    required
                    placeholder="Write your message..."
                    className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#256B29]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#256B29] px-6 py-4 font-semibold text-white transition hover:bg-[#1d5320] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}