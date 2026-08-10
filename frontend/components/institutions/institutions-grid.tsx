import {
  Building2,
  ExternalLink,
} from "lucide-react"

import { Institution, institutions } from "@/data/institutions"
import { Container } from "@/components/ui/container"

export function InstitutionsGrid({
  onSelectInstitution,
}: {
  onSelectInstitution?: (institution: Institution) => void
}) {
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

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {institutions.map((institution) => (
            <article
              key={institution.id}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-xs transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Logo Stage */}
              <a
                href={institution.website || "https://www.fisheries.gov.lk"}
                target="_blank"
                rel="noopener noreferrer"
                className="relative h-32 w-full overflow-hidden rounded-2xl bg-white border border-slate-100 p-3 flex items-center justify-center shadow-xs transition-colors group-hover:border-emerald-200 block shrink-0"
              >
                <img
                  src={institution.image}
                  alt={institution.title}
                  className="h-full w-full object-contain p-1 transition-transform duration-500 group-hover:scale-105"
                />

                <span className="absolute left-3 top-3 rounded-lg bg-[#256B29] text-white px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide shadow-xs">
                  {institution.acronym || institution.shortTitle}
                </span>
              </a>

              {/* Content Body */}
              <div className="mt-4 flex flex-1 flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-extrabold leading-snug text-slate-900 group-hover:text-[#256B29] transition-colors line-clamp-2">
                    <a
                      href={institution.website || "https://www.fisheries.gov.lk"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {institution.title}
                    </a>
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 leading-relaxed text-justify line-clamp-3 font-normal">
                    {institution.description}
                  </p>
                </div>

                {/* Direct Official Website Link */}
                <div className="border-t border-slate-100 pt-3">
                  <a
                    href={institution.website || "https://www.fisheries.gov.lk"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[38px] w-full items-center justify-center gap-2 rounded-xl bg-[#256B29] px-4 text-xs font-extrabold !text-white transition hover:bg-[#1b4d1d] shadow-2xs group/btn"
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