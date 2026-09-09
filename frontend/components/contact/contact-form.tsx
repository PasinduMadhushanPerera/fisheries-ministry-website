"use client"

import { useState } from "react"
import { Send, CheckCircle2, Info, MessageSquare, AlertCircle, Loader2 } from "lucide-react"

import { Container } from "@/components/ui/container"
import { submitContactMessage } from "@/lib/api/contact"

interface ContactFormProps {
  departments?: Array<{ id: string | number; name: string }>
  settings?: import("@/lib/api/contact").ApiContactPageSettings
}

export function ContactForm({ departments, settings }: ContactFormProps) {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const formBadge = settings?.form_badge || "Public Inquiry Form"
  const formTitle = settings?.form_title || "Send Us a Message"
  const formSubtitle = settings?.form_subtitle || "Submit your question, feedback or public inquiry directly to the Ministry staff."
  const guidanceTitle = settings?.form_guidance_title || "Before you submit"
  const guidanceItems = settings?.form_guidance_items && settings.form_guidance_items.length > 0
    ? settings.form_guidance_items
    : [
        "Use your official full name as registered on national identification",
        "Provide a valid email address for official response delivery",
        "Choose the correct subject division for faster processing",
        "Explain your inquiry clearly with any relevant registration numbers",
      ]

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    telephone: "",
    subject: "General Inquiry",
    departmentName: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage(null)

    try {
      const res = await submitContactMessage({
        name: formData.fullName,
        email: formData.email,
        phone: formData.telephone,
        subject: formData.subject,
        department_name: formData.departmentName,
        message: formData.message,
      })

      if (res.success) {
        setSubmitted(true)
        setFormData({
          fullName: "",
          email: "",
          telephone: "",
          subject: "General Inquiry",
          departmentName: "",
          message: "",
        })
      } else {
        setErrorMessage(res.message || "Failed to send your inquiry. Please try again.")
      }
    } catch (err) {
      console.error("Error submitting contact form:", err)
      setErrorMessage("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
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
                  <span>{formBadge}</span>
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {formTitle}
                </h2>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {formSubtitle}
                </p>
              </div>

              {/* Green Guidance Box */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-5 space-y-3">
                <div className="flex items-center gap-2 text-[#256B29] font-bold text-sm">
                  <Info className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{guidanceTitle}</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700 font-medium list-disc pl-5 leading-relaxed">
                  {guidanceItems.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/90 p-8 text-center space-y-4">
                  <CheckCircle2 className="h-14 w-14 text-[#256B29] mx-auto animate-bounce" aria-hidden="true" />
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">Inquiry Submitted Successfully</h3>
                  <p className="text-sm text-slate-700 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out! Your message has been logged and sent to <strong>minfishit@gmail.com</strong>. Designated division officers will contact you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#256B29] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#1b4d1d] cursor-pointer"
                  >
                    <span>Send Another Message</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-bold text-red-700 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

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
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition focus:border-[#256B29] focus:bg-white focus:outline-none"
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
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition focus:border-[#256B29] focus:bg-white focus:outline-none"
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
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition focus:border-[#256B29] focus:bg-white focus:outline-none"
                      />
                    </div>

                    {/* Subject Dropdown */}
                    <div>
                      <label htmlFor="subject" className="block text-xs font-bold text-slate-700 mb-1">
                        Subject Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-sm text-slate-900 transition focus:border-[#256B29] focus:bg-white focus:outline-none cursor-pointer"
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
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition focus:border-[#256B29] focus:bg-white focus:outline-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#256B29] px-7 py-3 font-bold text-white transition hover:bg-[#1b4d1d] disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        <span>Send Message</span>
                      </>
                    )}
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