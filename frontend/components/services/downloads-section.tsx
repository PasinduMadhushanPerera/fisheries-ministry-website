import Link from "next/link"
import { ArrowRight, Download, ShieldCheck } from "lucide-react"

import { serviceDownloads } from "@/data/services"
import { Section } from "@/components/ui/section"
import { SectionTitle } from "@/components/ui/section-title"

export function DownloadsSection() {
  return (
    <Section
      id="forms-downloads"
      background="soft"
      labelledBy="forms-downloads-heading"
      spacing="lg"
    >
      <SectionTitle
        id="forms-downloads-heading"
        eyebrow="Documents and resources"
        title="Forms and downloads"
        description="Quickly access application forms, official guidance and public documents."
        align="center"
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {serviceDownloads.map((document) => {
          const Icon = document.icon

          return (
            <Link
              key={document.title}
              href={document.href}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 sm:p-8"
            >
              <div
                aria-hidden="true"
                className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-emerald-50 transition duration-500 group-hover:scale-125"
              />

              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#256B29] text-white shadow-md">
                    <Icon
                      aria-hidden="true"
                      className="h-7 w-7"
                    />
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-slate-600">
                    {document.type}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-bold leading-snug text-slate-950 transition-colors group-hover:text-[#256B29]">
                  {document.title}
                </h3>

                <p className="mt-4 flex-1 leading-7 text-slate-600">
                  {document.description}
                </p>

                <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5">
                  <span className="inline-flex items-center gap-2 font-semibold text-[#256B29]">
                    Browse documents

                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    />
                  </span>

                  <Download
                    aria-hidden="true"
                    className="h-5 w-5 text-slate-400"
                  />
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mt-10 flex flex-col gap-5 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#256B29] shadow-sm">
            <ShieldCheck
              aria-hidden="true"
              className="h-6 w-6"
            />
          </div>

          <div>
            <h3 className="font-bold text-slate-950">
              Download documents safely
            </h3>

            {/* <p className="mt-2 max-w-3xl leading-7 text-slate-600">
              Only download files published through official Ministry pages.
              File type, size and publication date should be displayed before
              downloads are enabled.
            </p> */}
          </div>
        </div>

        <Link
          href="/documents"
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#256B29] px-6 py-3 font-semibold text-white transition hover:bg-[#1f5823] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
        >
          View all documents

          <ArrowRight
            aria-hidden="true"
            className="h-5 w-5"
          />
        </Link>
      </div>
    </Section>
  )
}