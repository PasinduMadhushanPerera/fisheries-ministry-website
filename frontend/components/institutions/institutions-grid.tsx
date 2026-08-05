import Image from "next/image"
import {
  Building2,
  ExternalLink,
} from "lucide-react"

import { institutions } from "@/data/institutions"
import { Container } from "@/components/ui/container"

export function InstitutionsGrid() {
  return (
    <section id="institutions" className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-emerald-100/80 border border-emerald-200/80 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#256B29]">
            Institution Directory
          </span>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Departments & Affiliated Institutions
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed text-justify max-w-2xl mx-auto">
            Browse the complete directory of statutory departments, development authorities, state corporations, regional extension offices, and ocean training academies.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {institutions.map((institution) => (
            <article
              key={institution.id}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 shrink-0">
                <Image
                  src={institution.image}
                  alt={institution.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className="rounded-md bg-white/90 px-2.5 py-1 text-[11px] font-extrabold text-slate-900 shadow-xs backdrop-blur-sm">
                    {institution.type}
                  </span>
                  {institution.shortTitle && (
                    <span className="rounded-md bg-emerald-500/90 px-2 py-1 text-[11px] font-mono font-bold text-white shadow-xs backdrop-blur-sm">
                      {institution.shortTitle}
                    </span>
                  )}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex flex-1 flex-col justify-between space-y-5">
                <div>
                  <h3 className="text-lg font-extrabold leading-snug text-slate-900 group-hover:text-[#256B29] transition-colors line-clamp-2">
                    {institution.title}
                  </h3>

                  <p className="mt-2.5 text-xs text-slate-600 leading-relaxed text-justify line-clamp-3 font-normal">
                    {institution.description}
                  </p>

                  <div className="mt-4 border-t border-slate-100 pt-4 space-y-2">
                    <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-[#256B29]" />
                      <span>Key Responsibilities</span>
                    </h4>

                    <ul className="space-y-1.5">
                      {institution.responsibilities.slice(0, 2).map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-slate-600">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                          <span className="line-clamp-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Direct Official Website Link */}
                <div className="border-t border-slate-100 pt-4">
                  <a
                    href={institution.website || "https://www.fisheries.gov.lk"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[40px] w-full items-center justify-center gap-2 rounded-xl bg-[#256B29] px-4 text-xs font-extrabold !text-white transition hover:bg-[#1b4d1d] shadow-2xs group/btn"
                  >
                    <span>Visit Official Website</span>
                    <ExternalLink className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
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