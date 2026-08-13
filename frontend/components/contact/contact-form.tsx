"use client"

import { useState } from "react"
import { Send, CheckCircle2, Info, MessageSquare } from "lucide-react"

import { Container } from "@/components/ui/container"

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    telephone: "",
    subject: "General Inquiry",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        fullName: "",
        email: "",
        telephone: "",
        subject: "General Inquiry",
        message: "",
      })
    }, 4000)
  }

  return (
    <section id="contact-form" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200" aria-label="Submit Public Inquiry">
      <Container>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Guidance Box */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-[#256B29] border border-emerald-200">
                  <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Public Inquiry Form</span>
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Send an Inquiry
                </h2>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Submit your question, feedback or public inquiry directly to the Ministry staff. All inquiries are assigned to relevant department officers.
                </p>
              </div>

              {/* Green Guidance Box */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-5 space-y-3">
                <div className="flex items-center gap-2 text-[#256B29] font-bold text-sm">
                  <Info className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Before you submit</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700 font-medium list-disc pl-5 leading-relaxed">
                  <li>Use your full official name as registered on identification</li>
                  <li>Provide a valid email address for official response delivery</li>
                  <li>Choose the correct subject division for faster processing</li>
                  <li>Explain your inquiry clearly with relevant registration numbers</li>
                </ul>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center space-y-3">
                  <CheckCircle2 className="h-12 w-12 text-[#388E3C] mx-auto" aria-hidden="true" />
                  <h3 className="text-xl font-bold text-slate-900">Inquiry Submitted Successfully</h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Thank you for reaching out. Your inquiry has been logged and forwarded to the designated division officer.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. K. A. Perera"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition focus:border-[#388E3C] focus:bg-white focus:outline-none"
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition focus:border-[#388E3C] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Telephone */}
                    <div>
                      <label htmlFor="telephone" className="block text-xs font-bold text-slate-700 mb-1">
                        Telephone Number
                      </label>
                      <input
                        type="tel"
                        id="telephone"
                        value={formData.telephone}
                        onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                        placeholder="+94 77 123 4567"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition focus:border-[#388E3C] focus:bg-white focus:outline-none"
                      />
                    </div>

                    {/* Subject Dropdown */}
                    <div>
                      <label htmlFor="subject" className="block text-xs font-bold text-slate-700 mb-1">
                        Subject Division <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-sm text-slate-900 transition focus:border-[#388E3C] focus:bg-white focus:outline-none cursor-pointer"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Fishing Licensing">Fishing Licensing (DFAR)</option>
                        <option value="Aquaculture Permits">Aquaculture Permits (NAQDA)</option>
                        <option value="Harbor & Infrastructure">Harbor & Infrastructure</option>
                        <option value="Right to Information">Right to Information (RTI)</option>
                        <option value="Media & Press">Media & Press Relations</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-slate-700 mb-1">
                      Inquiry Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Explain your inquiry or request clearly..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition focus:border-[#388E3C] focus:bg-white focus:outline-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#388E3C] px-6 py-3 font-bold text-white transition hover:bg-[#256B29] cursor-pointer"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}