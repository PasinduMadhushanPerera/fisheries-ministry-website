import { Phone, Building2, Clock, Mail } from "lucide-react"
import { PageHero } from "@/components/ui/page-hero"

export function ContactHero() {
  return (
    <PageHero
      badgeIcon={Phone}
      badgeText="Contact Us"
      title="Get in Touch with"
      highlightTitle="the Ministry"
      description="Find the correct department, contact our offices, visit the Ministry headquarters or submit your inquiry online."
      cardIcon={Building2}
      cardEyebrow="Government Portal"
      cardTitle="Ministry Contact Directory"
      cardDescription="Connecting citizens, commercial fishers, and aquatic businesses directly to departmental officers and public services."
    >
      {/* 3 Compact Stat Cards Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
          <div className="flex items-center gap-2 text-emerald-300">
            <Building2 className="h-4 w-4" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-wider">Departments</span>
          </div>
          <p className="mt-1 text-sm font-extrabold text-white">15 Offices</p>
        </div>

        <div className="rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
          <div className="flex items-center gap-2 text-cyan-300">
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-wider">Channels</span>
          </div>
          <p className="mt-1 text-sm font-extrabold text-white">Phone • Email</p>
        </div>

        <div className="rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
          <div className="flex items-center gap-2 text-amber-300">
            <Clock className="h-4 w-4" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-wider">Hours</span>
          </div>
          <p className="mt-1 text-sm font-extrabold text-white">8:30 AM – 4:15 PM</p>
        </div>
      </div>
    </PageHero>
  )
}