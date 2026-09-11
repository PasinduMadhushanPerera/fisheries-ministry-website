import { CalendarDays } from "lucide-react"
import { PageHero } from "@/components/ui/page-hero"

export function EventsHero() {
  return (
    <PageHero
      badgeIcon={CalendarDays}
      badgeText="Events Calendar"
      title="Upcoming Programmes &"
      highlightTitle="Ministry Events"
      description="Explore official symposiums, coastal safety workshops, aquaculture conferences, stakeholder forums, and community events organized by the Ministry of Fisheries."
      cardIcon={CalendarDays}
      cardEyebrow="Public Engagement"
      cardTitle="Programmes & Events"
      cardDescription="Discover schedule details, venues, agendas, and participation guidelines for all upcoming Ministry events."
    >
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">Format</p>
          <p className="mt-1 text-sm font-extrabold text-white">Workshops & Conferences</p>
        </div>

        <div className="rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">Venues</p>
          <p className="mt-1 text-sm font-extrabold text-white">All Coastal & Inland Districts</p>
        </div>

        <div className="rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-300">Access</p>
          <p className="mt-1 text-sm font-extrabold text-white">Public & Stakeholders</p>
        </div>
      </div>
    </PageHero>
  )
}
