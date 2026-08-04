import { Camera } from "lucide-react"
import { PageHero } from "@/components/ui/page-hero"

export function GalleryHero() {
  return (
    <PageHero
      badgeIcon={Camera}
      badgeText="Photo Gallery"
      title="Photo Gallery &"
      highlightTitle="Visual Media"
      description="Browse official photographs from Ministry events, fisheries programmes, aquaculture projects, conservation initiatives, and community engagement activities across Sri Lanka."
      cardIcon={Camera}
      cardEyebrow="Media Library"
      cardTitle="Official Photography Archive"
      cardDescription="High-resolution image albums documenting national fisheries development, harbour inspections, and community training events."
    >
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">Albums</p>
          <p className="mt-1 text-sm font-extrabold text-white">Event Galleries</p>
        </div>

        <div className="rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">Quality</p>
          <p className="mt-1 text-sm font-extrabold text-white">High Resolution</p>
        </div>

        <div className="rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-300">Coverage</p>
          <p className="mt-1 text-sm font-extrabold text-white">All Provinces</p>
        </div>
      </div>
    </PageHero>
  )
}