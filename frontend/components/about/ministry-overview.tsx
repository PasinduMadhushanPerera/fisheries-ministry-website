import {
  ArrowRight,
  CheckCircle2,
  Anchor,
  Sparkles,
  Award,
  TrendingUp,
  ShieldCheck,
  Fish,
  HeartHandshake,
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { Section } from "@/components/ui/section"
import { ApiAboutOverview } from "@/lib/api/about"

export function MinistryOverview({ initialOverview }: { initialOverview?: ApiAboutOverview }) {
  const eyebrow = initialOverview?.eyebrow || "Ministry Overview"
  const title = initialOverview?.title || "Serving the fisheries sector and the nation"
  const description =
    initialOverview?.description ||
    "Fishing has a long tradition in Sri Lanka spanning over two thousand years. From traditional coastal livelihoods to a multibillion-rupee modern industry, the Ministry provides leadership, regulatory oversight, and sustainable development."
  const legacyTitle = initialOverview?.legacy_title || "Historical Legacy & Sector Evolution"
  const legacyContent =
    initialOverview?.legacy_content ||
    "Marine fishing has gradually developed from a traditional coastal livelihood activity to a multibillion-rupee industry since Sri Lanka obtained independence in 1948. Inland fishing and aquaculture are recent developments over the last 75 years, with coastal shrimp farming commencing in the 1980s and marine aquaculture expanding rapidly since 2010."
  const economicTitle = initialOverview?.economic_title || "Economic Impact & Resource Base"
  const economicContent =
    initialOverview?.economic_content ||
    "The sector contributes around 1.4% to the national Gross Domestic Product (GDP), providing direct and indirect employment to approximately 575,000 individuals (3.7% of the nation's workforce). Annual fish production exceeds 530,000 metric tons valued at over USD 1.3 Billion, with export earnings topping USD 250 Million annually."
  const economicSubcontent =
    initialOverview?.economic_subcontent ||
    "Local production currently satisfies 65% of national fish consumption. The Ministry is committed to fulfilling 100% of national consumption from local fisheries and sustainable aquaculture while expanding export revenues."

  const stat1Value = initialOverview?.stat_1_value || "517,000"
  const stat1Label = initialOverview?.stat_1_label || "Sq km EEZ Zone"
  const stat2Value = initialOverview?.stat_2_value || "575,000"
  const stat2Label = initialOverview?.stat_2_label || "Active Workforce"
  const stat3Value = initialOverview?.stat_3_value || "530,000"
  const stat3Label = initialOverview?.stat_3_label || "MT Annual Yield"
  const stat4Value = initialOverview?.stat_4_value || "$250M+"
  const stat4Label = initialOverview?.stat_4_label || "Export Earnings"

  const ctaButtonText = initialOverview?.cta_button_text || "Explore Ministry Institutions"
  const ctaButtonUrl = initialOverview?.cta_button_url || "/institutions"

  const pillarBadge = initialOverview?.pillar_mandate_badge || "Strategic Mandate"
  const pillarTitle = initialOverview?.pillar_mandate_title || "Key Public Pillars"

  const pillars = [
    {
      num: "01",
      title: initialOverview?.pillar_1_title || "National fisheries development",
      description:
        initialOverview?.pillar_1_description ||
        "Supporting the responsible development of fisheries, aquaculture and related economic activities.",
      icon: Fish,
    },
    {
      num: "02",
      title: initialOverview?.pillar_2_title || "Community-focused public services",
      description:
        initialOverview?.pillar_2_description ||
        "Improving access to information, services and institutional support for fisheries communities.",
      icon: HeartHandshake,
    },
    {
      num: "03",
      title: initialOverview?.pillar_3_title || "Responsible resource management",
      description:
        initialOverview?.pillar_3_description ||
        "Promoting the sustainable use, conservation and protection of aquatic and ocean resources.",
      icon: ShieldCheck,
    },
  ]

  const benefitTitle = initialOverview?.benefit_banner_title || "National Protein & Economic Security"
  const benefitText =
    initialOverview?.benefit_banner_text ||
    "Ensuring sustainable marine conservation while supplying nutritious food to Sri Lanka."

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
          <span>{eyebrow}</span>
        </p>
        <h2
          id="ministry-overview-heading"
          className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
        >
          {title}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed text-justify">
          {description}
        </p>
      </div>

      {/* BALANCED 2-COLUMN GRID */}
      <div className="grid gap-10 lg:grid-cols-12 items-start">
        {/* LEFT COLUMN: SECTOR OVERVIEW & BACKGROUND (7 COLS) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 sm:p-8 space-y-4 shadow-xs">
            <h3 className="text-lg font-extrabold text-slate-950 flex items-center gap-2">
              <Anchor className="h-5 w-5 text-[#256B29]" />
              <span>{legacyTitle}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              {legacyContent}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 space-y-4 shadow-xs">
            <h3 className="text-lg font-extrabold text-slate-950 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#256B29]" />
              <span>{economicTitle}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              {economicContent}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              {economicSubcontent}
            </p>
          </div>

          {/* QUICK STATS STRIP */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3.5 text-center">
              <p className="text-lg font-extrabold text-[#256B29]">{stat1Value}</p>
              <p className="text-[11px] font-bold text-slate-600">{stat1Label}</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3.5 text-center">
              <p className="text-lg font-extrabold text-[#256B29]">{stat2Value}</p>
              <p className="text-[11px] font-bold text-slate-600">{stat2Label}</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3.5 text-center">
              <p className="text-lg font-extrabold text-[#256B29]">{stat3Value}</p>
              <p className="text-[11px] font-bold text-slate-600">{stat3Label}</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3.5 text-center">
              <p className="text-lg font-extrabold text-[#256B29]">{stat4Value}</p>
              <p className="text-[11px] font-bold text-slate-600">{stat4Label}</p>
            </div>
          </div>


        </div>

        {/* RIGHT COLUMN: 3 CORE RESPONSIBILITY CARDS (5 COLS) */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-5">
          <div className="space-y-4">
            <div className="rounded-2xl bg-emerald-950 p-4 text-white flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400">
                  {pillarBadge}
                </p>
                <p className="text-sm font-extrabold">{pillarTitle}</p>
              </div>
              <Award className="h-6 w-6 text-amber-400" />
            </div>

            {pillars.map((item) => {
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
                          {item.num}
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
              <p className="text-xs font-extrabold text-slate-900">{benefitTitle}</p>
              <p className="text-[11px] text-slate-600 leading-snug">
                {benefitText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
