import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Building2,
  ExternalLink,
} from "lucide-react"

import { institutions } from "@/data/institutions"
import { Container } from "@/components/ui/container"

export function InstitutionsGrid() {
  return (
    <section
      id="institutions"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-[#256B29]">
            Institution Directory
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900">
            Departments & Affiliated Institutions
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Browse the organizations that contribute to fisheries
            administration, scientific research, education, infrastructure,
            public services and sustainable aquatic-resource development.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {institutions.map((institution) => (
            <article
              key={institution.id}
              className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={institution.image}
                  alt={institution.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />

                <div className="absolute left-5 top-5">
                  <span className="rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-slate-900 backdrop-blur">
                    {institution.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-cyan-100 text-[#256B29]">
                  <Building2 className="h-7 w-7" />
                </div>

                <h3 className="mt-6 line-clamp-2 text-2xl font-bold leading-tight text-slate-900">
                  {institution.title}
                </h3>

                {institution.shortTitle && (
                  <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-[#256B29]">
                    {institution.shortTitle}
                  </p>
                )}

                <p className="mt-5 line-clamp-4 leading-7 text-slate-600">
                  {institution.description}
                </p>

                <div className="mt-7">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
                    Key Responsibilities
                  </h4>

                  <ul className="mt-3 space-y-2">
                    {institution.responsibilities
                      .slice(0, 3)
                      .map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-slate-600"
                        >
                          <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
                  <Link
                    href={institution.href}
                    className="inline-flex items-center gap-2 font-semibold text-[#256B29] transition hover:gap-3"
                  >
                    Learn More
                    <ArrowRight className="h-5 w-5" />
                  </Link>

                  {institution.website && (
                    <Link
                      href={institution.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:border-[#256B29] hover:text-[#256B29]"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}