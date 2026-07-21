import { HelpCircle } from "lucide-react"

import { serviceFaqs } from "@/data/services"
import { Section } from "@/components/ui/section"
import { SectionTitle } from "@/components/ui/section-title"

export function ServiceFaq() {
  return (
    <Section
      id="service-faq"
      background="white"
      labelledBy="service-faq-heading"
      spacing="lg"
    >
      <SectionTitle
        id="service-faq-heading"
        eyebrow="Frequently asked questions"
        title="Common service questions"
        description="Find general answers about Ministry services, applications and public documents."
        align="center"
      />

      <div className="mx-auto mt-12 max-w-4xl space-y-4">
        {serviceFaqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-emerald-200"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-6 py-5 font-bold text-slate-950 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200">
              <span className="flex items-center gap-3">
                <HelpCircle
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-[#256B29]"
                />

                {faq.question}
              </span>

              <span
                aria-hidden="true"
                className="text-2xl font-light text-slate-500 transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>

            <div className="border-t border-slate-100 px-6 py-5">
              <p className="leading-7 text-slate-600">
                {faq.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </Section>
  )
}