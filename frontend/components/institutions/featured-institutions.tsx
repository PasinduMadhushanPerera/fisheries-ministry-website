import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Building2,
  ExternalLink,
} from "lucide-react"

import { featuredInstitutions } from "@/data/institutions"
import { Container } from "@/components/ui/container"

export function FeaturedInstitutions() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-[#256B29]">
            Featured Institutions
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900">
            Key Organizations Supporting the Fisheries Sector
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            These organizations play a significant role in research,
            infrastructure development, education, aquaculture and the
            sustainable management of Sri Lanka's fisheries and aquatic
            resources.
          </p>
        </div>

        <div className="mt-14 space-y-8">
          {featuredInstitutions.map((institution, index) => (
            <article
              key={institution.id}
              className={`grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:grid-cols-2 ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Image */}
              <div className="relative min-h-[320px]">
                <Image
                  src={institution.image}
                  alt={institution.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-[#256B29]">
                    {institution.type}
                  </span>

                  {institution.shortTitle && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                      {institution.shortTitle}
                    </span>
                  )}
                </div>

                <h3 className="mt-6 text-3xl font-bold text-slate-900">
                  {institution.title}
                </h3>

                <p className="mt-5 leading-8 text-slate-600">
                  {institution.description}
                </p>

                <div className="mt-8 space-y-3">
                  {institution.responsibilities.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-[#256B29]">
                        <Building2 className="h-5 w-5" />
                      </div>

                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href={institution.href}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#256B29] px-6 py-3 font-semibold text-white transition hover:bg-[#1d5320]"
                  >
                    Learn More
                    <ArrowRight className="h-5 w-5" />
                  </Link>

                  {institution.website && (
                    <Link
                      href={institution.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Official Website
                      <ExternalLink className="h-4 w-4" />
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