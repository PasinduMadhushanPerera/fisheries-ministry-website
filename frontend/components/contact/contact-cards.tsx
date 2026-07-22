import {
  Clock3,
  Mail,
  MapPinned,
  Phone,
} from "lucide-react"

import { Container } from "@/components/ui/container"

const contactCards = [
  {
    title: "Visit Our Office",
    description:
      "Official address to be verified before the website is published.",
    icon: MapPinned,
    value: "Official Ministry Address",
  },
  {
    title: "Call Us",
    description:
      "Contact the Ministry for general inquiries and public services.",
    icon: Phone,
    value: "+94 XX XXX XXXX",
  },
  {
    title: "Email Us",
    description:
      "Send your inquiries and requests through our official email.",
    icon: Mail,
    value: "info@fisheries.gov.lk",
  },
  {
    title: "Office Hours",
    description:
      "Working hours should be verified before website publication.",
    icon: Clock3,
    value: "Monday – Friday",
  },
]

export function ContactCards() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-[#256B29]">
            Contact Information
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900">
            Multiple Ways to Reach Us
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Whether you need information about fisheries services, ministry
            departments or official procedures, our team is available through
            several communication channels.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {contactCards.map((card) => {
            const Icon = card.icon

            return (
              <article
                key={card.title}
                className="group rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-cyan-100 text-[#256B29]">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-900">
                  {card.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {card.description}
                </p>

                <div className="mt-8 border-t border-slate-200 pt-5">
                  <p className="font-semibold text-[#256B29]">
                    {card.value}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}