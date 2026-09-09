import {
  ArrowRight,
  CircleHelp,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
} from "lucide-react"

import { LinkButton } from "@/components/ui/button"
import { Section } from "@/components/ui/section"

export function CitizenHelp() {
  return (
    <Section
      id="citizen-help"
      background="dark"
      spacing="lg"
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-green-300">
            <CircleHelp
              aria-hidden="true"
              className="h-4 w-4"
            />
            Citizen assistance
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Need help finding a service or document?
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Contact the Ministry for guidance on fisheries
            services, application requirements, institutions,
            public information and official documents.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <LinkButton
              href="/contact"
              className="bg-white text-slate-950 hover:bg-slate-100"
            >
              Contact the Ministry
              <ArrowRight
                aria-hidden="true"
                className="h-5 w-5"
              />
            </LinkButton>

            <LinkButton
              href="/contact#contact-faq"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              Frequently asked questions
            </LinkButton>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-start gap-4">
              <Phone
                aria-hidden="true"
                className="mt-1 h-5 w-5 text-green-300"
              />

              <div>
                <h3 className="font-bold text-white">
                  Telephone assistance
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-300">
                  Use the official Ministry telephone number
                  published on the contact page.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-start gap-4">
              <Mail
                aria-hidden="true"
                className="mt-1 h-5 w-5 text-green-300"
              />

              <div>
                <h3 className="font-bold text-white">
                  Email enquiries
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-300">
                  Send general enquiries through the official
                  Ministry email or online contact form.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-start gap-4">
              <MapPin
                aria-hidden="true"
                className="mt-1 h-5 w-5 text-green-300"
              />

              <div>
                <h3 className="font-bold text-white">
                  Visit or locate an office
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-300">
                  Find the Ministry and related service
                  institutions through the contact directory.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-start gap-4">
              <MessageSquareText
                aria-hidden="true"
                className="mt-1 h-5 w-5 text-green-300"
              />

              <div>
                <h3 className="font-bold text-white">
                  Online enquiries
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-300">
                  Use the contact form to submit a structured
                  enquiry to the appropriate Ministry team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}