import { Play } from "lucide-react"
import { PageHero } from "@/components/ui/page-hero"

export function VideosHero() {
  return (
    <PageHero
      badgeIcon={Play}
      badgeText="Video Gallery"
      title="Official Videos &"
      highlightTitle="Media Highlights"
      description="Watch official Ministry videos featuring fisheries development, aquaculture initiatives, community programmes, marine conservation, and national events."
      cardIcon={Play}
      cardEyebrow="Video Portal"
      cardTitle="Ministry Video Archive"
      cardDescription="Documentary films, field visit coverage, official addresses, and training videos."
    >
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">Format</p>
          <p className="mt-1 text-sm font-extrabold text-white">Full HD Video</p>
        </div>

        <div className="rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">Source</p>
          <p className="mt-1 text-sm font-extrabold text-white">Official YouTube</p>
        </div>

        <div className="rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-300">Category</p>
          <p className="mt-1 text-sm font-extrabold text-white">Projects & Events</p>
        </div>
      </div>
    </PageHero>
  )
}