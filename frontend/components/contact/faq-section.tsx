"use client"

import { useState } from "react"
import { ChevronDown, CircleHelp } from "lucide-react"

import { Container } from "@/components/ui/container"

const faqs = [
  {
    question: "How can I contact the correct Ministry department?",
    answer:
      "Use the department directory on this page to identify the most relevant division. You may also submit the general contact form and your inquiry can later be routed through the Ministry's backend system.",
  },
  {
    question: "How do I apply for a fisheries licence or permit?",
    answer:
      "Licensing procedures should be confirmed with the responsible department. The website can later provide verified application forms, eligibility requirements, fees and step-by-step guidance.",
  },
  {
    question: "How long will it take to receive a response?",
    answer:
      "Response times depend on the type and complexity of the inquiry. Official service standards and expected response periods should be verified before the website is published.",
  },
  {
    question: "Can I submit a complaint through this website?",
    answer:
      "Yes. Select the complaints option in the contact form and provide clear details about the matter. A secure complaint-handling workflow can be connected through the Django backend later.",
  },
  {
    question: "Where can I find official forms and documents?",
    answer:
      "Official forms, reports, policies, circulars and downloadable documents should be available through the Resources and Laws & Policies sections once verified content is added.",
  },
  {
    question: "How can I report illegal fishing activity?",
    answer:
      "Use the verified illegal-fishing reporting contact once it is added to the emergency section. For urgent incidents, contact the appropriate national authority using an officially confirmed hotline.",
  },
  {
    question: "Can I visit the Ministry without an appointment?",
    answer:
      "Public visiting arrangements, office hours and appointment requirements should be confirmed with the Ministry before publication. The final page should display verified visitor guidance.",
  },
  {
    question: "Will my personal information be protected?",
    answer:
      "The production contact form should use secure transmission, input validation, access controls and an approved privacy policy. Personal information should only be collected and processed for legitimate official purposes.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  function toggleItem(index: number) {
    setOpenIndex((currentIndex) =>
      currentIndex === index ? null : index,
    )
  }

  return (
    <section
      aria-labelledby="contact-faq-heading"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-cyan-100 text-[#256B29]">
              <CircleHelp className="h-8 w-8" />
            </div>

            <span className="mt-8 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-[#256B29]">
              Frequently Asked Questions
            </span>

            <h2
              id="contact-faq-heading"
              className="mt-6 text-4xl font-bold tracking-tight text-slate-950"
            >
              Find Answers to Common Questions
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Review common questions about Ministry services, licensing,
              complaints, documents and public inquiries before sending a
              message.
            </p>

            <div className="mt-8 rounded-3xl border border-emerald-100 bg-emerald-50 p-6">
              <h3 className="font-bold text-slate-950">
                Cannot Find Your Answer?
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Use the contact form to send your question to the appropriate
                Ministry division.
              </p>

              <a
                href="#contact-form"
                className="mt-5 inline-flex font-semibold text-[#256B29] underline-offset-4 hover:underline"
              >
                Send an inquiry
              </a>
            </div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index
              const contentId = `contact-faq-content-${index}`
              const buttonId = `contact-faq-button-${index}`

              return (
                <article
                  key={faq.question}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-emerald-200"
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                      onClick={() => toggleItem(index)}
                      className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left sm:px-8"
                    >
                      <span className="text-lg font-bold text-slate-950">
                        {faq.question}
                      </span>

                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[#256B29]">
                        <ChevronDown
                          aria-hidden="true"
                          className={`h-5 w-5 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    className="border-t border-slate-200 px-6 py-6 sm:px-8"
                  >
                    <p className="leading-8 text-slate-600">
                      {faq.answer}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}