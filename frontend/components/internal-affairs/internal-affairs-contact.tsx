import { Clock, ExternalLink, Mail, MapPin, Navigation, Phone } from "lucide-react"

import { Container } from "@/components/ui/container"

export function InternalAffairsContact() {
  const mapEmbedUrl =
    "https://maps.google.com/maps?q=Ministry+of+Fisheries+Maligawatta+Colombo+10&t=&z=15&ie=UTF8&iwloc=&output=embed"
  const googleMapsDirectionsUrl =
    "https://www.google.com/maps/dir//Ministry+of+Fisheries,+New+Secretariat+Building,+Maligawatta,+Colombo+10"

  return (
    <section aria-labelledby="contact-info-heading" className="bg-white py-14 sm:py-18">
      <Container>
        <div className="flex flex-col gap-2 border-b border-slate-200 pb-6 mb-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#256B29]">
            Location & Access
          </p>

          <h2 id="contact-info-heading" className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
            Contact Information & Location
          </h2>

          <p className="text-xs sm:text-sm leading-relaxed text-slate-600 max-w-2xl">
            Visit our desk at the Ministry Secretariat in Colombo 10 or reach out via official phone and email channels.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 items-stretch">
          {/* Contact Card */}
          <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 shadow-md">
            <div>
              <h3 className="text-xl font-extrabold text-slate-950 mb-6">Internal Affairs Unit Desk</h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#256B29] border border-emerald-200">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-950">Office Address</p>
                    <p className="mt-0.5 leading-relaxed text-slate-600">
                      Internal Affairs Unit, 4th Floor, Ministry of Fisheries, New Secretariat Building, Maligawatta, Colombo 10, Sri Lanka
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#256B29] border border-emerald-200">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-950">Direct Telephone & Hotline</p>
                    <p className="mt-0.5 text-slate-600">+94 11 244 6183 / +94 11 244 6184</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#256B29] border border-emerald-200">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-950">Email Addresses</p>
                    <p className="mt-0.5 text-slate-600">iau@fisheries.gov.lk / info@fisheries.gov.lk</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#256B29] border border-emerald-200">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-950">Public Office Hours</p>
                    <p className="mt-0.5 text-slate-600">Monday – Friday: 8:30 AM – 4:15 PM (Closed on public holidays)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-3">
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#256B29] px-5 text-xs font-extrabold !text-white transition hover:bg-[#1b4d1d]"
              >
                <Navigation className="h-3.5 w-3.5" />
                <span>Get Directions</span>
              </a>

              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-xs font-bold text-slate-800 transition hover:bg-slate-100"
              >
                <span>View Location</span>
                <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-md min-h-[22rem] relative">
            <iframe
              title="Ministry of Fisheries Internal Affairs Unit Location Map"
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "22rem" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
