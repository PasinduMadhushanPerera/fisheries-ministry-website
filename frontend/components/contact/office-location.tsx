import { MapPin, Phone, Mail, Clock, ExternalLink, Navigation } from "lucide-react"

import { Container } from "@/components/ui/container"
import { contactHeadquarters } from "@/data/contact-data"
import type { ApiContactPageSettings } from "@/lib/api/contact"

interface OfficeLocationProps {
  settings?: ApiContactPageSettings
}

export function OfficeLocation({ settings }: OfficeLocationProps) {
  const hqBadge = settings?.hq_badge || "Ministry Headquarters"
  const hqTitle = settings?.hq_title || contactHeadquarters.title
  const hqDesc = settings?.hq_description || contactHeadquarters.description
  const address = settings?.hq_address || contactHeadquarters.address
  const telephone = settings?.hq_telephone || contactHeadquarters.telephone
  const email = settings?.hq_email || contactHeadquarters.email
  const officeHours = settings?.office_hours || contactHeadquarters.officeHours
  const mapUrl = settings?.map_embed_url || contactHeadquarters.mapEmbedUrl
  const directionsUrl = settings?.directions_url || contactHeadquarters.directionsUrl

  return (
    <section id="office-location" className="py-12 sm:py-16 bg-white border-b border-slate-200" aria-label="Ministry Headquarters Location">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Office Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-[#256B29] border border-emerald-200">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{hqBadge}</span>
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {hqTitle}
              </h2>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {hqDesc}
              </p>
            </div>

            {/* Information Cards List */}
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl border border-slate-200 bg-slate-50/60">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-[#256B29]">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Address</h3>
                  <p className="mt-1 text-sm font-bold text-slate-900 leading-snug">
                    {address}
                  </p>
                </div>
              </div>

              {/* Telephone */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl border border-slate-200 bg-slate-50/60">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-800">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Telephone</h3>
                  <a
                    href={`tel:${telephone.replace(/\s+/g, "")}`}
                    className="mt-1 text-sm font-bold text-slate-900 hover:text-[#388E3C] transition-colors block"
                  >
                    {telephone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl border border-slate-200 bg-slate-50/60">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-[#0B3D3A]">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">General Email</h3>
                  <a
                    href={`mailto:${email}`}
                    className="mt-1 text-sm font-bold text-[#256B29] hover:underline block"
                  >
                    {email}
                  </a>
                </div>
              </div>

              {/* Office Hours */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl border border-slate-200 bg-slate-50/60">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Office Hours</h3>
                  <p className="mt-1 text-sm font-bold text-slate-900 leading-snug">
                    {officeHours}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#388E3C] px-5 py-2.5 text-xs font-bold !text-white transition hover:bg-[#256B29]"
              >
                <Navigation className="h-4 w-4" aria-hidden="true" />
                <span>Get Directions</span>
              </a>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
              >
                <ExternalLink className="h-4 w-4 text-slate-500" aria-hidden="true" />
                <span>View Location</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Map Embed */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-md h-[400px] sm:h-[480px]">
              <iframe
                title="Ministry of Fisheries Headquarters Map Location"
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
