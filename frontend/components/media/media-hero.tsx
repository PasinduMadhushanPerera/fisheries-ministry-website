import { Newspaper } from "lucide-react"
import { PageHero } from "@/components/ui/page-hero"

export function MediaHero() {
  return (
    <PageHero
      badgeIcon={Newspaper}
      badgeText="Media Centre"
      title="Latest News &"
      highlightTitle="Official Updates"
      description="Stay informed with the latest news, official announcements, press releases, events, photographs, and videos from the Ministry of Fisheries, Aquatic and Ocean Resources."
      cardIcon={Newspaper}
      cardEyebrow="Ministry Newsroom"
      cardTitle="Official Public Media Portal"
      cardDescription="Verified announcements, gazettes, project progress, event schedules, photo galleries, and official video releases."
    >
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">News & Releases</p>
          <p className="mt-1 text-sm font-extrabold text-white">Daily Updates</p>
        </div>

        <div className="rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">Photo & Video</p>
          <p className="mt-1 text-sm font-extrabold text-white">Official Media</p>
        </div>

        <div className="rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-300">Public Notices</p>
          <p className="mt-1 text-sm font-extrabold text-white">Gazettes & Tenders</p>
        </div>
      </div>
    </PageHero>
  )
}