import Link from "next/link"
import {
  ArrowRight,
  Download,
  FileText,
  FolderOpen,
} from "lucide-react"

import { Container } from "@/components/ui/container"

export function ResourcesHero() {
  return (
    <section
      aria-labelledby="resources-page-heading"
      className="relative isolate overflow-hidden bg-[#061d24] text-white"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,197,94,0.18),transparent_34%),radial-gradient(circle_at_88%_12%,rgba(14,165,233,0.22),transparent_36%),linear-gradient(135deg,#061d24_0%,#0a322f_50%,#0a4350_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full border border-white/10 bg-white/[0.025]"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-56 -left-32 h-[36rem] w-[36rem] rounded-full border border-green-100/10 bg-green-300/[0.025]"
      />

      <svg
        aria-hidden="true"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-40 w-full text-white/[0.04]"
      >
        <path
          fill="currentColor"
          d="M0,192L60,181.3C120,171,240,149,360,154.7C480,160,600,192,720,192C840,192,960,160,1080,154.7C1200,149,1320,171,1380,181.3L1440,192L1440,320L0,320Z"
        />
      </svg>

      <Container className="relative z-10 py-16 sm:py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur-md">
              <FolderOpen
                aria-hidden="true"
                className="h-4 w-4 text-green-200"
              />
              Official resources
            </div>

            <h1
              id="resources-page-heading"
              className="mt-7 max-w-4xl text-4xl font-bold tracking-[-0.035em] sm:text-5xl lg:text-6xl"
            >
              Access official documents,
              <span className="block bg-gradient-to-r from-green-200 via-cyan-200 to-sky-200 bg-clip-text text-transparent">
                publications and downloads
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
              Find Ministry publications, annual reports, circulars,
              application forms, tender notices and other approved
              public resources in one central location.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm font-semibold text-slate-200">
                <FileText
                  aria-hidden="true"
                  className="h-4 w-4 text-green-200"
                />
                Official documents
              </div>

              <div className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm font-semibold text-slate-200">
                <Download
                  aria-hidden="true"
                  className="h-4 w-4 text-green-200"
                />
                Public downloads
              </div>

              <div className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm font-semibold text-slate-200">
                <FolderOpen
                  aria-hidden="true"
                  className="h-4 w-4 text-green-200"
                />
                Six resource categories
              </div>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="#resource-categories"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
              >
                Browse resources

                <ArrowRight
                  aria-hidden="true"
                  className="h-5 w-5"
                />
              </Link>

              <Link
                href="/resources/documents"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
              >
                <FileText
                  aria-hidden="true"
                  className="h-5 w-5"
                />
                Documents & Downloads
              </Link>
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-8 rounded-full bg-cyan-400/10 blur-3xl"
            />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-7 shadow-2xl backdrop-blur-xl sm:p-9">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-300 text-slate-950 shadow-lg">
                <FileText
                  aria-hidden="true"
                  className="h-8 w-8"
                />
              </div>

              <p className="mt-8 text-sm font-bold uppercase tracking-[0.16em] text-green-200">
                Resource centre
              </p>

              <h2 className="mt-3 text-2xl font-bold leading-snug sm:text-3xl">
                Reliable public information from the Ministry
              </h2>

              <p className="mt-5 leading-8 text-slate-300">
                Browse verified documents and downloadable resources
                prepared for citizens, businesses, researchers,
                institutions and fisheries-sector stakeholders.
              </p>

              <dl className="mt-7 grid grid-cols-2 gap-5 border-t border-white/10 pt-6">
                <div>
                  <dt className="text-sm text-slate-300">
                    Categories
                  </dt>
                  <dd className="mt-1 text-2xl font-bold text-white">
                    6
                  </dd>
                </div>

                <div>
                  <dt className="text-sm text-slate-300">
                    Access
                  </dt>
                  <dd className="mt-1 text-xl font-bold text-green-200">
                    Public
                  </dd>
                </div>

                <div>
                  <dt className="text-sm text-slate-300">
                    Content
                  </dt>
                  <dd className="mt-1 font-semibold text-white">
                    Official
                  </dd>
                </div>

                <div>
                  <dt className="text-sm text-slate-300">
                    Availability
                  </dt>
                  <dd className="mt-1 font-semibold text-white">
                    Online
                  </dd>
                </div>
              </dl>

              <div className="mt-7 border-t border-white/10 pt-6">
                <p className="text-sm leading-6 text-slate-300">
                  Final documents and publication details should be
                  added only after confirmation and approval by the
                  Ministry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}