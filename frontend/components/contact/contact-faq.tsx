"use client"

import { useState } from "react"
import { HelpCircle, ChevronDown } from "lucide-react"

import { Container } from "@/components/ui/container"
import { contactFaqs } from "@/data/contact-data"
import { useLanguage } from "@/src/contexts/LanguageContext"
import type { ApiContactFaq } from "@/lib/api/contact"

interface ContactFaqProps {
  faqs?: ApiContactFaq[]
  badge?: string
  title?: string
  subtitle?: string
}

export function ContactFaq({ faqs: propFaqs, badge: propBadge, title: propTitle, subtitle: propSubtitle }: ContactFaqProps) {
  const { language } = useLanguage()

  const isSi = language === "si"
  const isTa = language === "ta"

  const badgeText = propBadge || (isSi ? "පොදු නිතර අසන ප්‍රශ්න" : isTa ? "பொදු FAQ" : "Public FAQ")
  const titleText = propTitle || (isSi
    ? "නිතර අසන ප්‍රශ්න"
    : isTa
    ? "අடிக்கடி கேட்கப்படும் கேள்விகள்"
    : "Frequently Asked Questions")

  const subtitleText = propSubtitle || (isSi
    ? "දෙපාර්තමේන්තු සම්බන්ධතා, කාර්යාල වේලාවන් සහ මහජන සේවා විමසීම් පිළිබඳ පොදු ප්‍රශ්නවලට ඉක්මන් පිළිතුරු."
    : isTa
    ? "திணைக்கள தொடர்புகள், அலுவலக நேரங்கள் மற்றும் பொது சேவை விசாரணைகள் பற்றிய பொதுவான கேள்விகளுக்கான விரைவான பதில்கள்."
    : "Quick answers to common questions regarding department contacts, office hours, and public service inquiries.")

  const displayFaqs = (propFaqs && propFaqs.length > 0
    ? propFaqs
    : contactFaqs) as Array<ApiContactFaq | { id: string; question: string; answer: string }>

  const [openFaqId, setOpenFaqId] = useState<string | number | null>(displayFaqs[0]?.id || null)

  const toggleFaq = (id: string | number) => {
    setOpenFaqId((prev) => (prev === id ? null : id))
  }

  return (
    <section id="contact-faq" className="py-12 bg-white border-b border-slate-200" aria-label="Frequently Asked Questions">
      <Container>
        {/* Section Header */}
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-[#256B29] border border-emerald-200">
            <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{badgeText}</span>
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {titleText}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {subtitleText}
          </p>
        </div>

        {/* Accordion Cards */}
        <div className="max-w-3xl mx-auto space-y-3">
          {displayFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id
            const headerId = `faq-header-${faq.id}`
            const contentId = `faq-content-${faq.id}`

            return (
              <div
                key={faq.id}
                className="rounded-xl border border-slate-200 bg-slate-50/50 overflow-hidden transition-all duration-200 hover:border-slate-300"
              >
                <button
                  type="button"
                  id={headerId}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none bg-white hover:bg-slate-50/80 transition-colors"
                >
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {faq.question}
                  </h3>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-emerald-50 text-[#256B29] border-emerald-200" : ""
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" aria-hidden="true" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
