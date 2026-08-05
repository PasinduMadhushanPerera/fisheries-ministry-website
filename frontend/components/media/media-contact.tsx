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
        <div className="overflow-hidden rounded-3xl bg-[#061d24] shadow-2xl">
          <div className="grid lg:grid-cols-2">
            {/* Left Box */}
            <div className="relative overflow-hidden p-8 sm:p-10 lg:p-12">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0a322f]/70 via-transparent to-[#0b6974]/40" />

              <div className="relative">
                <span className="inline-flex items-center rounded-md border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-extrabold text-emerald-300">
                  Media Desk & Press Information
                </span>

                <h2 className="mt-4 text-3xl font-extrabold leading-tight !text-white sm:text-4xl ">
                  Need Official Media Assistance?
                </h2>

                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-300">
                  Journalists, news agencies, and public stakeholders can contact the Ministry for official press statements, media accreditation, interview requests, and verified communications.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-300">
                      <Mail className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-xs font-extrabold text-white">Press Desk Email</p>
                      <p className="text-xs text-slate-300">info@fisheries.gov.lk</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-300">
                      <Phone className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-xs font-extrabold text-white">Telephone Helpline</p>
                      <p className="text-xs text-slate-300">+94 112 327 060</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-300">
                      <MapPin className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-xs font-extrabold text-white">Ministry Headquarters</p>
                      <p className="text-xs text-slate-300">
                        New Secretariat Building, Maligawatta, Colombo 10, Sri Lanka
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Box */}
            <div className="bg-white p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-[#256B29]">
                  <Newspaper className="h-6 w-6" />
                </div>

                <h3 className="mt-6 text-2xl font-extrabold text-slate-900">
                  Media Quick Resources
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Access official press releases, news archives, public notices, photo albums, and video highlights.
                </p>

                <div className="mt-6 space-y-3">
                  <Link
                    href="/media-centre/news"
                    className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-[#256B29] hover:bg-emerald-50/50"
                  >
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900">Ministry News</h4>
                      <p className="text-[11px] text-slate-500">Latest official news & updates</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </Link>

                  <Link
                    href="/media-centre/notices"
                    className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-[#256B29] hover:bg-emerald-50/50"
                  >
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900">Public Notices</h4>
                      <p className="text-[11px] text-slate-500">Official gazettes & tender announcements</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </Link>

                  <Link
                    href="/media-centre/gallery"
                    className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-[#256B29] hover:bg-emerald-50/50"
                  >
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900">Photo & Video Gallery</h4>
                      <p className="text-[11px] text-slate-500">Official event media collections</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </Link>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100">
                <Link
                  href="/contact"
                  className="inline-flex min-h-[40px] w-full items-center justify-center gap-2 rounded-xl bg-[#388E3C] px-5 text-xs font-extrabold text-white transition hover:bg-[#256B29]"
                >
                  <span>Contact Ministry Desk</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}