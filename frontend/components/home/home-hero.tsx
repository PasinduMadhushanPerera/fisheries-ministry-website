import {
  ArrowRight,
  FileText,
  Search,
  Waves,
} from "lucide-react"
import Link from "next/link"

import { LinkButton } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import {
  heroHighlights,
  popularSearches,
} from "@/data/home"

export function HomeHero() {
  return (
    <section
      aria-labelledby="homepage-heading"
      className="relative isolate overflow-hidden bg-[#061d24] text-white"
    >
      <HeroBackground />

      <Container className="relative z-10 py-16 sm:py-20 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white shadow-sm backdrop-blur-md">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-400/20">
                <Waves
                  aria-hidden="true"
                  className="h-4 w-4 text-green-200"
                />
              </span>

              Official website of the Ministry of Fisheries
            </div>

            <h1
              id="homepage-heading"
              className="mt-7 max-w-4xl text-4xl font-bold tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Fisheries services and information
              <span className="block bg-gradient-to-r from-green-200 via-cyan-200 to-sky-200 bg-clip-text text-transparent">
                for every community
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
              Access public services, official notices,
              application guidance, fisheries programmes and
              trusted government resources through one
              citizen-focused platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {heroHighlights.map((highlight) => {
                const Icon = highlight.icon

                return (
                  <div
                    key={highlight.label}
                    className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm font-semibold text-slate-200 backdrop-blur-sm"
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-4 w-4 text-green-200"
                    />

                    {highlight.label}
                  </div>
                )
              })}
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <LinkButton
                href="/services"
                className="bg-white text-slate-950 shadow-lg hover:bg-slate-100"
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
                className="border-white/30 bg-white/5 text-white backdrop-blur-sm hover:border-white/50 hover:bg-white/10 hover:text-white"
              >
                <FileText
                  aria-hidden="true"
                  className="h-5 w-5"
                />
                Forms and documents
              </LinkButton>
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-10 rounded-full bg-cyan-400/10 blur-3xl"
            />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-400 text-slate-950 shadow-lg">
                  <Search
                    aria-hidden="true"
                    className="h-6 w-6"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white">
                    What are you looking for?
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    Search services, documents, notices,
                    institutions and Ministry information.
                  </p>
                </div>
              </div>

              <form
                role="search"
                action="/search"
                className="mt-6"
              >
                <label
                  htmlFor="homepage-search"
                  className="visually-hidden"
                >
                  Search Ministry services and information
                </label>

                <div className="relative">
                  <Search
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="homepage-search"
                    type="search"
                    name="q"
                    enterKeyHint="search"
                    placeholder="Search licences, forms or notices"
                    className="min-h-16 w-full rounded-2xl border border-white/20 bg-white pl-12 pr-32 text-base text-slate-950 shadow-xl outline-none placeholder:text-slate-500 focus:border-green-500 focus:ring-4 focus:ring-green-300/30"
                  />

                  <button
                    type="submit"
                    className="absolute bottom-2 right-2 top-2 inline-flex min-w-24 items-center justify-center rounded-xl bg-[#277a3b] px-5 font-bold text-white transition hover:bg-[#1d612e] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-300"
                  >
                    Search
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-green-200">
                  Popular searches
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {popularSearches.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="inline-flex min-h-10 items-center rounded-full border border-white/15 bg-white/10 px-4 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-300/40"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-7 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2">
                <Link
                  href="/media-centre/notices"
                  className="group rounded-2xl border border-white/10 bg-slate-950/20 p-4 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-300/40"
                >
                  <p className="text-sm font-bold text-white">
                    Latest public notices
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    Read official announcements and updates.
                  </p>

                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-green-200">
                    View notices
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>

                <Link
                  href="/contact"
                  className="group rounded-2xl border border-white/10 bg-slate-950/20 p-4 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-300/40"
                >
                  <p className="text-sm font-bold text-white">
                    Need assistance?
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    Contact the appropriate Ministry service.
                  </p>

                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-green-200">
                    Contact us
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/5 to-transparent"
      />
    </section>
  )
}

function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(34,197,94,0.18),transparent_35%),radial-gradient(circle_at_85%_20%,rgba(14,165,233,0.22),transparent_38%),linear-gradient(135deg,#061d24_0%,#0b342f_48%,#0a3e4a_100%)]" />

      <div className="absolute left-[8%] top-[18%] h-2 w-2 animate-pulse rounded-full bg-cyan-200/70" />
      <div className="absolute left-[22%] top-[68%] h-1.5 w-1.5 animate-pulse rounded-full bg-green-200/70 [animation-delay:500ms]" />
      <div className="absolute right-[16%] top-[14%] h-2 w-2 animate-pulse rounded-full bg-white/60 [animation-delay:900ms]" />
      <div className="absolute right-[8%] top-[62%] h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-100/70 [animation-delay:1300ms]" />

      <div className="absolute -right-32 -top-36 h-[34rem] w-[34rem] rounded-full border border-white/5 bg-white/[0.025]" />

      <div className="absolute -bottom-64 -left-28 h-[38rem] w-[38rem] rounded-full border border-green-100/10 bg-green-300/[0.025]" />

      <svg
        className="absolute inset-x-0 bottom-0 h-48 w-full text-white/[0.035]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,192L60,181.3C120,171,240,149,360,154.7C480,160,600,192,720,192C840,192,960,160,1080,154.7C1200,149,1320,171,1380,181.3L1440,192L1440,320L0,320Z"
        />
      </svg>

      <svg
        className="absolute inset-x-0 bottom-0 h-32 w-full text-white/[0.05]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,224L80,213.3C160,203,320,181,480,176C640,171,800,181,960,192C1120,203,1280,213,1360,218.7L1440,224L1440,320L0,320Z"
        />
      </svg>
    </div>
  )
}