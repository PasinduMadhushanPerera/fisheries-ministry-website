import { Megaphone } from "lucide-react"
import { PageHero } from "@/components/ui/page-hero"

export function PressReleasesHero() {
  return (
    <PageHero
      badgeIcon={Megaphone}
      badgeText="Press Releases"
      title="Ministry Press Releases"
      highlightTitle="& Official Statements"
      description="Access verified press releases, public statements, policy announcements, and official communications issued by the Ministry of Fisheries, Aquatic and Ocean Resources."
      cardIcon={Megaphone}
      cardEyebrow="Press Office"
      cardTitle="Media & Press Portal"
      cardDescription="Authentic press releases, media kits, ministerial statements, and policy briefing documents."
    >
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">Releases</p>
          <p className="mt-1 text-sm font-extrabold text-white">Verified Statements</p>
        </div>

        <div className="rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">Downloads</p>
          <p className="mt-1 text-sm font-extrabold text-white">PDF & Text Format</p>
        </div>

        <div className="rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-300">Contact</p>
          <p className="mt-1 text-sm font-extrabold text-white">Press Desk</p>
        </div>
      </div>
    </PageHero>
  )
}