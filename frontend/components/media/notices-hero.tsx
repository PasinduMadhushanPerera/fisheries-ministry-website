import { BellRing } from "lucide-react"
import { PageHero } from "@/components/ui/page-hero"

export function NoticesHero() {
  return (
    <PageHero
      badgeIcon={BellRing}
      badgeText="Public Notices"
      title="Notices & Public"
      highlightTitle="Announcements"
      description="Find official Ministry notices, procurement opportunities, recruitment announcements, vessel licensing updates, and public consultation information."
      cardIcon={BellRing}
      cardEyebrow="Official Gazette & Notices"
      cardTitle="Public Notice Board"
      cardDescription="Verified public notices, application deadlines, tender documents, and regulatory updates from the Ministry."
    >
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">Status</p>
          <p className="mt-1 text-sm font-extrabold text-white">Active Notices</p>
        </div>

        <div className="rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">Access</p>
          <p className="mt-1 text-sm font-extrabold text-white">Public Download</p>
        </div>

        <div className="rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-300">Verification</p>
          <p className="mt-1 text-sm font-extrabold text-white">Official Ministry</p>
        </div>
      </div>
    </PageHero>
  )
}