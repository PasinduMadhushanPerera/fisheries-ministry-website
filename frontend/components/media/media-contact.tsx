import Link from "next/link"
import {
  ArrowRight,
  Mail,
  MapPin,
  Newspaper,
  Phone,
} from "lucide-react"

import { Container } from "@/components/ui/container"

export function MediaContact() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="overflow-hidden rounded-[2rem] bg-[#061d24] shadow-2xl">
          <div className="grid lg:grid-cols-2">
            {/* Left */}

            <div className="relative overflow-hidden p-10 sm:p-12 lg:p-16">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0a322f]/70 via-transparent to-[#0b6974]/40" />

              <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-green-500/10 blur-3xl" />
              <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

              <div className="relative">
                <span className="inline-flex items-center rounded-full border border-green-400/30 bg-green-400/10 px-4 py-2 text-sm font-semibold text-green-300">
                  Media Relations
                </span>

                <h2 className="mt-6 text-4xl font-bold leading-tight text-white">
                  Need Media Assistance?
                </h2>

                <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                  Journalists, media organizations and stakeholders can
                  contact the Ministry for official information, media
                  inquiries, interview requests and press-related
                  communications.
                </p>

                <div className="mt-10 space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-green-300">
                      <Mail className="h-6 w-6" />
                    </div>

                    <div>
                      <p className="font-semibold text-white">
                        Media Email
                      </p>

                      <p className="text-slate-300">
                        media@fisheries.gov.lk
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-green-300">
                      <Phone className="h-6 w-6" />
                    </div>

                    <div>
                      <p className="font-semibold text-white">
                        Telephone
                      </p>

                      <p className="text-slate-300">
                        +94 XX XXX XXXX
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-green-300">
                      <MapPin className="h-6 w-6" />
                    </div>

                    <div>
                      <p className="font-semibold text-white">
                        Office Address
                      </p>

                      <p className="text-slate-300">
                        Ministry of Fisheries, Colombo,
                        <br />
                        Sri Lanka
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right */}

            <div className="bg-white p-10 sm:p-12 lg:p-16">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                <Newspaper className="h-8 w-8" />
              </div>

              <h3 className="mt-8 text-3xl font-bold text-slate-900">
                Press Resources
              </h3>

              <p className="mt-5 leading-8 text-slate-600">
                Access official press releases, ministry news,
                announcements, image galleries and other public media
                resources published by the Ministry.
              </p>

              <div className="mt-10 space-y-4">
                <Link
                  href="/media/news"
                  className="flex items-center justify-between rounded-2xl border border-slate-200 p-5 transition hover:border-green-300 hover:bg-green-50"
                >
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Ministry News
                    </h4>

                    <p className="mt-1 text-sm text-slate-600">
                      Latest official news and updates
                    </p>
                  </div>

                  <ArrowRight className="h-5 w-5 text-slate-500" />
                </Link>

                <Link
                  href="/media/announcements"
                  className="flex items-center justify-between rounded-2xl border border-slate-200 p-5 transition hover:border-green-300 hover:bg-green-50"
                >
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Announcements
                    </h4>

                    <p className="mt-1 text-sm text-slate-600">
                      Official notices and public announcements
                    </p>
                  </div>

                  <ArrowRight className="h-5 w-5 text-slate-500" />
                </Link>

                <Link
                  href="/media/gallery"
                  className="flex items-center justify-between rounded-2xl border border-slate-200 p-5 transition hover:border-green-300 hover:bg-green-50"
                >
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Media Gallery
                    </h4>

                    <p className="mt-1 text-sm text-slate-600">
                      Photos and videos from ministry events
                    </p>
                  </div>

                  <ArrowRight className="h-5 w-5 text-slate-500" />
                </Link>
              </div>

              <div className="mt-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0a322f] px-6 py-4 font-semibold text-white transition hover:bg-[#0d4b45]"
                >
                  Contact the Ministry
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}