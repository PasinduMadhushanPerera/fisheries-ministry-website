"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"

import { Container } from "@/components/ui/container"
import { internalAffairsFaqs } from "@/data/internal-affairs"

export function InternalAffairsFaq() {
  const [openId, setOpenId] = useState<string | null>(internalAffairsFaqs[0]?.id ?? null)

  function toggleFaq(id: string) {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <section aria-labelledby="faq-heading" className="bg-[#f8faf9] py-14 sm:py-18 border-t border-slate-200/80">
      <Container>
        <div className="flex flex-col gap-2 border-b border-slate-200 pb-6 mb-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#256B29]">
            Frequently Asked Questions
          </p>

          <h2 id="faq-heading" className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
            Internal Affairs Unit FAQ
          </h2>

          <p className="text-xs sm:text-sm leading-relaxed text-slate-600 max-w-2xl">
            Quick answers to common questions about filing complaints, confidentiality rules, and investigation steps.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {internalAffairsFaqs.map((faq) => {
            const isOpen = openId === faq.id

            return (
              <div
                key={faq.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left font-extrabold text-slate-950 text-sm sm:text-base hover:text-[#256B29] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-[#256B29] shrink-0" aria-hidden="true" />
                    <span>{faq.question}</span>
                  </div>

                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#256B29]" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 text-justify">
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
