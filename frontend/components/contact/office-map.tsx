import Link from "next/link"
import {
  ArrowUpRight,
  Building2,
  Clock3,
  Mail,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react"

import { Container } from "@/components/ui/container"

const officeDetails = [
  {
    label: "Address",
    value: "New Secretariat, Maligawatta, Colombo 10, Sri Lanka",
    icon: MapPin,
  },
  {
    label: "Telephone",
    value: "+94 11 244 6183",
    icon: Phone,
  },
  {
    label: "Email",
    value: "info@fisheries.gov.lk",
    icon: Mail,
  },
  {
    label: "Office Hours",
    value: "Monday – Friday: 8:00 AM – 5:00 PM",
    icon: Clock3,
  },
]

export function OfficeMap() {
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.660212325883!2d79.86489807399767!3d6.931154593068711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259071d2f5389%3A0x986c02d39d63bae0!2sMinistry%20of%20Fisheries%20and%20Aquatic%20Resources%20Development%20New%20Secretariat%2C%20Maligawatta%2C%20Colombo!5e0!3m2!1sen!2slk!4v1785127944172!5m2!1sen!2slk"

  // Opens the official place card on Google Maps directly in a new tab
  const officeLocationUrl =
    "https://www.google.com/maps/place/?q=place_id:ChIJiVMvHQdZ4joR4LpjndMCbJg"

  return (
    <section
      id="office-location"
      aria-labelledby="office-location-heading"
      className="scroll-mt-24 bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          {/* Details Card */}
          <div className="flex flex-col justify-between rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <div>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-cyan-100 text-[#256B29]">
                <Building2 className="h-8 w-8" />
              </div>

              <span className="mt-8 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-[#256B29]">
                Ministry Office
              </span>

              <h2
                id="office-location-heading"
                className="mt-5 text-4xl font-bold tracking-tight text-slate-950"
              >
                Visit Our Main Office
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">

http://googleusercontent.com/map_location_reference/1
                Visit [Ministry of Fisheries and Aquatic Resources Development New Secretariat, Maligawatta, Colombo](http://googleusercontent.com/map_location_reference/0) for official inquiries, document submissions, public services, and assistance from the relevant divisions.
              </p>

              <div className="mt-10 space-y-5">
                {officeDetails.map((detail) => {
                  const Icon = detail.icon

                  return (
                    <div
                      key={detail.label}
                      className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#256B29] shadow-sm">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
                          {detail.label}
                        </p>

                        <p className="mt-1 leading-7 text-slate-800">
                          {detail.value}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={officeLocationUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Ministry location in Google Maps"
                className="inline-flex items-center gap-2 rounded-xl bg-[#256B29] px-5 py-3 font-semibold text-white transition hover:bg-[#1d5320]"
              >
                View Location
                <MapPin className="h-5 w-5" />
              </Link>

              <Link
                href="#contact-form"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-[#256B29] hover:text-[#256B29]"
              >
                Send a Message
                <ArrowUpRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Map Section */}
          <div className="min-h-[32rem] overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-sm">
            <div className="h-full min-h-[30rem] w-full overflow-hidden rounded-[1.5rem]">
              <iframe
                title="Ministry of Fisheries and Aquatic Resources Development Location"
                src={mapEmbedUrl}
                className="h-full min-h-[30rem] w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}