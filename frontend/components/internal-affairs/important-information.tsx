import { Award, Calendar, Clock, Lock } from "lucide-react"

import { Container } from "@/components/ui/container"
import { importantInfoCards } from "@/data/internal-affairs"

const iconMap = {
  Lock: Lock,
  Clock: Clock,
  Calendar: Calendar,
  Award: Award,
}

export function ImportantInformation() {
  return (
    <section aria-labelledby="important-info-heading" className="bg-[#f8faf9] py-14 sm:py-18 border-t border-slate-200/80">
      <Container>
        <div className="flex flex-col gap-2 border-b border-slate-200 pb-6 mb-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#256B29]">
            Service Guidelines
          </p>

          <h2 id="important-info-heading" className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
            Important Information
          </h2>

          <p className="text-xs sm:text-sm leading-relaxed text-slate-600 max-w-2xl">
            Key operational standards, confidentiality guarantees, and investigation timelines governing public inquiries.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {importantInfoCards.map((card) => {
            const IconComponent = iconMap[card.iconName]

            return (
              <article
                key={card.id}
                className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:border-[#256B29] hover:shadow-xl"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-[#256B29] border border-emerald-200 mb-4">
                    <IconComponent className="h-6 w-6" aria-hidden="true" />
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-950">{card.title}</h3>

                  <p className="mt-2 text-xs text-slate-600 leading-relaxed text-justify">
                    {card.description}
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
