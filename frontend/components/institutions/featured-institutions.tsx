import Image from "next/image"
import {
  Building2,
  ExternalLink,
  Info,
} from "lucide-react"

import { featuredInstitutions } from "@/data/institutions"
import { Container } from "@/components/ui/container"

export function FeaturedInstitutions() {
  return (
    <section className="bg-slate-50/80 py-16 sm:py-20 lg:py-24 border-b border-slate-200/80">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-emerald-100/80 border border-emerald-200/80 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#256B29]">
            Featured Institutions
          </span>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Key Organizations Supporting the Fisheries Sector
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed text-justify max-w-2xl mx-auto">
            These statutory bodies and research institutes play a vital role in oceanographic research, harbour infrastructure, aquaculture extension, and sustainable aquatic resource administration across Sri Lanka.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {featuredInstitutions.map((institution, index) => (
            <article
              key={institution.id}
              className={`grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs transition-all duration-300 hover:border-emerald-300 hover:shadow-xl lg:grid-cols-2 ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Image Banner */}
              <div className="relative min-h-[300px] lg:min-h-[360px] overflow-hidden group">
                <Image
                  src={institution.image}
                  alt={institution.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-emerald-500/80 border border-emerald-300/40 px-3 py-1 text-xs font-extrabold text-white backdrop-blur-md">
                      {institution.type}
                    </span>
                    {institution.shortTitle && (
                      <span className="rounded-md bg-white/20 border border-white/20 px-2.5 py-1 text-xs font-mono font-bold text-white backdrop-blur-md">
                        {institution.shortTitle}
                      </span>
                    )}
                  </div>

                  {institution.established && (
                    <span className="text-[11px] font-bold text-slate-200 bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-md">
                      Est. {institution.established}
                    </span>
                  )}
                </div>
              </div>

              {/* Content Card Body */}
              <div className="flex flex-col justify-between p-7 sm:p-9 lg:p-10">
                <div>
                  <div className="flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-wider text-[#256B29] mb-2">
                    <Building2 className="h-4 w-4" />
                    <span>Statutory Authority</span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-slate-900 leading-snug">
                    {institution.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600 text-justify">
                    {institution.description}
                  </p>

                  <div className="mt-6 space-y-2.5 border-t border-slate-100 pt-5">
                    {institution.responsibilities.slice(0, 3).map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#256B29]">
                          <Info className="h-3.5 w-3.5" />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Official Website Button */}
                <div className="mt-8 pt-5 border-t border-slate-100">
                  <a
                    href={institution.website || "https://www.fisheries.gov.lk"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#256B29] px-6 text-xs font-extrabold !text-white transition hover:bg-[#1b4d1d] shadow-md shadow-emerald-900/10 group/btn"
                  >
                    <span>Visit Official Website</span>
                    <ExternalLink className="h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}