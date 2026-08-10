import {
  ArrowRight,
  CheckCircle2,
  Anchor,
  Sparkles,
  Award,
  TrendingUp,
  ShieldCheck,
} from "lucide-react"

import {
  ministryOverviewPoints,
} from "@/data/about"
import { LinkButton } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Section } from "@/components/ui/section"

export function MinistryOverview() {
  return (
    <Section
      id="ministry-overview"
      background="white"
      labelledBy="ministry-overview-heading"
      spacing="lg"
    >
      {/* SECTION HEADER */}
      <div className="max-w-3xl mb-12">
        <p className="text-xs font-extrabold uppercase tracking-wider text-[#256B29] flex items-center gap-1.5 mb-1.5">
          <Sparkles className="h-4 w-4 text-[#256B29]" />
          <span>Ministry Overview</span>
        </p>
        <h2
          id="ministry-overview-heading"
          className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
        >
          Serving the fisheries sector and the nation
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed text-justify">
          Fishing has a long tradition in Sri Lanka spanning over two thousand years. From traditional coastal livelihoods to a multibillion-rupee modern industry, the Ministry provides leadership, regulatory oversight, and sustainable development.
        </p>
      </div>

      {/* BALANCED 2-COLUMN GRID */}
      <div className="grid gap-10 lg:grid-cols-12 items-start">
        {/* LEFT COLUMN: SECTOR OVERVIEW & BACKGROUND (7 COLS) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 sm:p-8 space-y-4 shadow-xs">
            <h3 className="text-lg font-extrabold text-slate-950 flex items-center gap-2">
              <Anchor className="h-5 w-5 text-[#256B29]" />
              <span>Historical Legacy & Sector Evolution</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              Marine fishing has gradually developed from a traditional coastal livelihood activity to a multibillion-rupee industry since Sri Lanka obtained independence in 1948. Inland fishing and aquaculture are recent developments over the last 75 years, with coastal shrimp farming commencing in the 1980s and marine aquaculture expanding rapidly since 2010.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 space-y-4 shadow-xs">
            <h3 className="text-lg font-extrabold text-slate-950 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#256B29]" />
              <span>Economic Impact & Resource Base</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              The sector contributes around 1.4% to the national Gross Domestic Product (GDP), providing direct and indirect employment to approximately 575,000 individuals (3.7% of the nation&apos;s workforce). Annual fish production exceeds 530,000 metric tons valued at over USD 1.3 Billion, with export earnings topping USD 250 Million annually.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              Local production currently satisfies 65% of national fish consumption. The Ministry is committed to fulfilling 100% of national consumption from local fisheries and sustainable aquaculture while expanding export revenues.
            </p>
          </div>

          {/* QUICK STATS STRIP */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3.5 text-center">
              <p className="text-lg font-extrabold text-[#256B29]">517,000</p>
              <p className="text-[11px] font-bold text-slate-600">Sq km EEZ Zone</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3.5 text-center">
              <p className="text-lg font-extrabold text-[#256B29]">575,000</p>
              <p className="text-[11px] font-bold text-slate-600">Active Workforce</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3.5 text-center">
              <p className="text-lg font-extrabold text-[#256B29]">530,000</p>
              <p className="text-[11px] font-bold text-slate-600">MT Annual Yield</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3.5 text-center">
              <p className="text-lg font-extrabold text-[#256B29]">$250M+</p>
              <p className="text-[11px] font-bold text-slate-600">Export Earnings</p>
            </div>
          </div>

          <div className="pt-2">
            <LinkButton
              href="/institutions"
              variant="outline"
              className="border-slate-300 bg-white hover:border-[#256B29] hover:bg-emerald-50 text-xs font-extrabold"
            >
              <span>Explore Ministry Institutions</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </LinkButton>
          </div>
        </div>

        {/* RIGHT COLUMN: 3 CORE RESPONSIBILITY CARDS (5 COLS) */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-5">
          <div className="space-y-4">
            <div className="rounded-2xl bg-emerald-950 p-4 text-white flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400">
                  Strategic Mandate
                </p>
                <p className="text-sm font-extrabold">Key Public Pillars</p>
              </div>
              <Award className="h-6 w-6 text-amber-400" />
            </div>

            {ministryOverviewPoints.map((item, index) => {
              const Icon = item.icon

              return (
                <Card
                  key={item.title}
                  interactive
                  className="group relative overflow-hidden p-6 sm:p-7 border border-slate-200/80 bg-white hover:border-[#256B29] hover:shadow-xl transition-all duration-300"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-1.5 bg-[#256B29] group-hover:bg-emerald-400 transition-colors"
                  />

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-[#256B29] transition-colors group-hover:bg-[#256B29] group-hover:text-white">
                      <Icon
                        aria-hidden="true"
                        className="h-6 w-6"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-extrabold text-[#256B29]">
                          0{index + 1}
                        </span>
                        <CheckCircle2
                          aria-hidden="true"
                          className="h-3.5 w-3.5 text-emerald-600"
                        />
                      </div>

                      <h3 className="mt-1 text-base sm:text-lg font-extrabold text-slate-950 group-hover:text-[#256B29] transition-colors">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 text-justify">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* BOTTOM QUICK BENEFIT BANNER */}
          <div className="rounded-3xl border border-emerald-200/80 bg-emerald-50/70 p-5 flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#256B29] text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-900">National Protein & Economic Security</p>
              <p className="text-[11px] text-slate-600 leading-snug">
                Ensuring sustainable marine conservation while supplying nutritious food to Sri Lanka.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
