import { Newspaper } from "lucide-react"
import { PageHero } from "@/components/ui/page-hero"

export function NewsHero() {
  return (
    <PageHero
      badgeIcon={Newspaper}
      badgeText="Ministry News"
      title="Latest News &"
      highlightTitle="Ministry Updates"
      description="Read the latest fisheries news, development updates, community programmes, and events from across Sri Lanka."
      cardIcon={Newspaper}
      cardEyebrow="Official Newsroom"
      cardTitle="Fisheries & Ocean News"
      cardDescription="Timely updates on coastal developments, aquaculture projects, fisher welfare initiatives, and national policies."
    >
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">Category</p>
          <p className="mt-1 text-sm font-extrabold text-white">All Fisheries</p>
        </div>

        <div className="rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">Coverage</p>
          <p className="mt-1 text-sm font-extrabold text-white">Island-Wide</p>
        </div>

        <div className="rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-300">Source</p>
          <p className="mt-1 text-sm font-extrabold text-white">Verified Ministry</p>
        </div>
      </div>
    </PageHero>
  )
}