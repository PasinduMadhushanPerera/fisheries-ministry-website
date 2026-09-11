import type { Metadata } from "next"
import Link from "next/link"
import { BarChart3, TrendingUp, DollarSign, FileText, Globe, Info, LineChart } from "lucide-react"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Container } from "@/components/ui/container"
import { PageHero } from "@/components/ui/page-hero"

export const metadata: Metadata = {
  title: "Fisheries Statistics",
  description:
    "Official fisheries statistics, fish prices, production metrics, import/export data, and annual statistics reports.",
}

const statisticsCards = [
  {
    title: "Fisheries at a Glance",
    description: "Key summary statistics and indicators of Sri Lanka's marine and inland fisheries sector.",
    href: "/statistics/at-a-glance",
    icon: BarChart3,
  },
  {
    title: "Weekly Fish Prices",
    description: "Weekly updated retail and wholesale market prices of popular fish varieties across islandwide harbors.",
    href: "/statistics/weekly-fish-prices",
    icon: DollarSign,
  },
  {
    title: "Monthly Fish Production",
    description: "Monthly breakdown of marine, coastal, offshore, and inland aquatic production metrics.",
    href: "/statistics/monthly-fish-production",
    icon: TrendingUp,
  },
  {
    title: "Annual Statistics Reports",
    description: "Comprehensive annual statistical bulletins and publications for research and analysis.",
    href: "/statistics/annual-reports",
    icon: FileText,
  },
  {
    title: "Export and Import",
    description: "Trade figures, export values, volume metrics, and destination markets for Sri Lankan seafood.",
    href: "/statistics/export-and-import",
    icon: Globe,
  },
  {
    title: "Fishery Related Information",
    description: "Vessel registrations, fleet statistics, aquaculture production, and census data.",
    href: "/statistics/related-information",
    icon: Info,
  },
]

export default function StatisticsPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb
          items={[
            {
              label: "Statistics",
            },
          ]}
        />

        <PageHero
          badgeIcon={LineChart}
          badgeText="Sector Data & Analytics"
          title="Fisheries Statistics &"
          highlightTitle="Market Data"
          description="Access official data, weekly market prices, production statistics, and trade metrics maintained by the Ministry of Fisheries."
          primaryAction={{
            label: "Explore Market Prices",
            href: "/statistics/weekly-fish-prices",
          }}
          secondaryAction={{
            label: "View Sector Summary",
            href: "/statistics/at-a-glance",
          }}
          cardIcon={BarChart3}
          cardEyebrow="Data Transparency"
          cardTitle="Official Sector Metrics"
          cardDescription="Providing open, reliable statistical bulletins for researchers, fishers, commercial operators, and policy planners."
        />

        <section className="py-16 bg-slate-50">
          <Container>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {statisticsCards.map((card) => {
                const Icon = card.icon
                return (
                  <Link
                    key={card.href}
                    href={card.href}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-[#388E3C] hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                  >
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-[#388E3C] group-hover:bg-[#388E3C] group-hover:text-white transition-colors">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h2 className="mt-4 text-xl font-bold text-slate-900 group-hover:text-[#256B29]">
                      {card.title}
                    </h2>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {card.description}
                    </p>
                  </Link>
                )
              })}
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
