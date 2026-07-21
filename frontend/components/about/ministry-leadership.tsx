import {
  ArrowRight,
  UserRound,
} from "lucide-react"

import { leadershipRoles } from "@/data/about"
import { LinkButton } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Section } from "@/components/ui/section"
import { SectionTitle } from "@/components/ui/section-title"

export function MinistryLeadership() {
  return (
    <Section
      id="ministry-leadership"
      background="white"
      labelledBy="leadership-heading"
      spacing="lg"
    >
      <SectionTitle
        id="leadership-heading"
        eyebrow="Leadership"
        title="Ministry leadership"
        description="Official names, titles, biographies and photographs should be added only after confirmation by the Ministry."
        actions={
          <LinkButton
            href="/about/leadership"
            variant="outline"
          >
            View leadership information
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4"
            />
          </LinkButton>
        }
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {leadershipRoles.map((leader) => (
          <Card
            key={leader.role}
            interactive
            className="group h-full overflow-hidden"
          >
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 via-green-50 to-sky-100">
              <div
                aria-hidden="true"
                className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-sky-200/40"
              />

              <div
                aria-hidden="true"
                className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-green-200/50"
              />

              <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-white/80 text-slate-400 shadow-xl backdrop-blur-sm">
                <UserRound
                  aria-hidden="true"
                  className="h-14 w-14"
                />
              </div>

              <span className="absolute bottom-4 left-4 rounded-full border border-white/70 bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#256B29] shadow-sm">
                Official photo pending
              </span>
            </div>

            <div className="flex h-full flex-col p-7">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#256B29]">
                {leader.role}
              </p>

              <h3 className="mt-3 text-2xl font-bold text-slate-950">
                {leader.title}
              </h3>

              <p className="mt-4 flex-1 leading-7 text-slate-600">
                {leader.description}
              </p>

              <span className="mt-6 inline-flex items-center gap-2 font-bold text-[#256B29]">
                Leadership profile
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </span>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}