import {
  ArrowRight,
  FileText,
  Search,
} from "lucide-react"

import { CitizenHelp } from "@/components/home/citizen-help"
import { DocumentsSection } from "@/components/home/documents-section"
import { FeaturedProgrammes } from "@/components/home/featured-programmes"
import { InstitutionsSection } from "@/components/home/institutions-section"
import { LatestNews } from "@/components/home/latest-news"
import { LatestNotices } from "@/components/home/latest-notices"
import { PopularServices } from "@/components/home/popular-services"
import { SectorOverview } from "@/components/home/sector-overview"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { LinkButton } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main
        id="main-content"
        tabIndex={-1}
        className="outline-none"
      >
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-[#123b34] to-[#256B29] py-16 text-white sm:py-20 lg:py-24">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/5"
          />

          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-48 w-full bg-gradient-to-t from-black/10 to-transparent"
          />

          <Container className="relative">
            <div className="max-w-4xl">
              <p className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur-sm">
                Official website of the Ministry of Fisheries
              </p>

              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Fisheries services and information for every
                community
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/85 sm:text-xl">
                Access public services, official notices,
                application guidance, fisheries programmes and
                resources from the Ministry of Fisheries,
                Aquatic and Ocean Resources.
              </p>

              <form
                role="search"
                action="/search"
                className="mt-9 flex max-w-3xl flex-col gap-3 rounded-2xl bg-white p-3 shadow-2xl sm:flex-row"
              >
                <label
                  htmlFor="homepage-search"
                  className="visually-hidden"
                >
                  Search Ministry services and information
                </label>

                <div className="relative min-w-0 flex-1">
                  <Search
                    aria-hidden="true"
                    className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="homepage-search"
                    type="search"
                    name="q"
                    placeholder="Search licences, forms, programmes or notices"
                    className="min-h-14 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-base text-slate-950 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#388E3C] px-6 font-bold text-white transition-colors hover:bg-[#256B29] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
                >
                  Search website
                  <ArrowRight
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                </button>
              </form>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <LinkButton
                  href="/services"
                  className="bg-white text-slate-950 hover:bg-slate-100"
                >
                  Browse all services
                  <ArrowRight
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                </LinkButton>

                <LinkButton
                  href="/documents"
                  variant="outline"
                  className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <FileText
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                  Forms and documents
                </LinkButton>
              </div>
            </div>
          </Container>
        </section>

        <PopularServices />
        <LatestNotices />
        <LatestNews />
        <FeaturedProgrammes />
        <SectorOverview />
        <InstitutionsSection />
        <DocumentsSection />
        <CitizenHelp />
      </main>

      <SiteFooter />
    </>
  )
}