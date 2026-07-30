import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
} from "lucide-react"

import { timeline } from "@/data/about"
import { LinkButton } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { SectionTitle } from "@/components/ui/section-title"
import { cn } from "@/lib/utils"

export function MinistryTimeline() {
  return (
    <Section
      id="ministry-history"
      background="white"
      labelledBy="ministry-history-heading"
      spacing="lg"
    >
      <SectionTitle
        id="ministry-history-heading"
        eyebrow="Our journey"
        title="Ministry history and development"
        description="This timeline is prepared for officially verified historical milestones. Replace the draft content only after confirmation by the Ministry."
        align="center"
      />

      <div className="relative mx-auto mt-14 max-w-6xl">
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-green-500 via-sky-500 to-slate-200 md:left-1/2 md:-translate-x-1/2"
        />

        <ol className="space-y-10 md:space-y-14">
          {timeline.map((item, index) => {
            const isEven = index % 2 === 0

            return (
              <li
                key={`${item.period}-${item.title}`}
                className="relative grid gap-6 pl-14 md:grid-cols-2 md:gap-14 md:pl-0"
              >
                <div
                  aria-hidden="true"
                  className="absolute left-5 top-7 z-10 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full bg-white ring-4 ring-green-100 md:left-1/2"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-[#388E3C]" />
                </div>

                <div
                  className={cn(
                    "md:row-start-1",
                    isEven
                      ? "md:col-start-1 md:text-right"
                      : "md:col-start-2",
                  )}
                >
                  <div
                    className={cn(
                      "group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl sm:p-8",
                      isEven && "md:ml-auto",
                    )}
                  >
                    <div
                      aria-hidden="true"
                      className={cn(
                        "absolute top-0 h-1 w-full bg-gradient-to-r from-[#256B29] via-[#388E3C] to-sky-500",
                        isEven ? "right-0" : "left-0",
                      )}
                    />

                    <div
                      className={cn(
                        "flex items-start gap-4",
                        isEven && "md:flex-row-reverse",
                      )}
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-[#256B29] transition group-hover:bg-[#388E3C] group-hover:text-white">
                        <CalendarDays
                          aria-hidden="true"
                          className="h-6 w-6"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#256B29]">
                          {item.period}
                        </p>

                        <h3 className="mt-3 text-xl font-bold leading-snug text-slate-950 sm:text-2xl">
                          {item.title}
                        </h3>

                        <p className="mt-4 leading-7 text-slate-600">
                          {item.description}
                        </p>

                        <div
                          className={cn(
                            "mt-6 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700",
                            isEven && "md:flex-row-reverse",
                          )}
                        >
                          <CheckCircle2
                            aria-hidden="true"
                            className="h-4 w-4 text-green-600"
                          />

                          {item.status}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  className={cn(
                    "hidden md:block md:row-start-1",
                    isEven
                      ? "md:col-start-2"
                      : "md:col-start-1",
                  )}
                />
              </li>
            )
          })}
        </ol>
      </div>

      <div className="mt-12 rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-7">
        {/* <p className="font-bold text-amber-950">
          Historical-content review required
        </p> */}

        {/* <p className="mt-2 max-w-4xl text-sm leading-6 text-amber-900">
          Dates, previous Ministry names, legal changes and institutional
          milestones must be checked against authorised government records
          before this website is published.
        </p> */}

        {/* <LinkButton
          href="/documents"
          variant="outline"
          className="mt-5 border-amber-300 bg-white text-amber-950 hover:bg-amber-100"
        >
          View official documents
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4"
          />
        </LinkButton> */}
      </div>
    </Section>
  )
}