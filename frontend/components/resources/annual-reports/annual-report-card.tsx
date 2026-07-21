import {
  CalendarDays,
  Download,
  FileText,
  Languages,
} from "lucide-react"

import type { AnnualReport } from "@/data/annual-reports"

type AnnualReportCardProps = {
  report: AnnualReport
}

export function AnnualReportCard({
  report,
}: AnnualReportCardProps) {
  return (
    <article className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:border-green-300 hover:shadow-xl">
      <div className="grid lg:grid-cols-[15rem_1fr_auto] lg:items-stretch">
        <div className="relative flex min-h-56 items-center justify-center overflow-hidden bg-[#071f26] p-7 text-white lg:min-h-full">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.22),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.2),transparent_42%)]"
          />

          <div
            aria-hidden="true"
            className="absolute -right-12 -top-12 h-36 w-36 rounded-full border border-white/10"
          />

          <div className="relative text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-300 text-slate-950 shadow-lg">
              <FileText
                aria-hidden="true"
                className="h-8 w-8"
              />
            </div>

            <p className="mt-5 text-sm font-bold uppercase tracking-[0.16em] text-green-200">
              Annual Report
            </p>

            <p className="mt-2 text-5xl font-bold tracking-tight">
              {report.year}
            </p>
          </div>
        </div>

        <div className="p-7 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-green-800">
              {report.fileType}
            </span>

            {report.featured ? (
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">
                Latest report
              </span>
            ) : null}
          </div>

          <h2 className="mt-4 text-2xl font-bold text-slate-950">
            {report.title}
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            {report.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-slate-100 pt-5 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2">
              <CalendarDays
                aria-hidden="true"
                className="h-4 w-4"
              />
              Reporting year: {report.year}
            </span>

            <span className="inline-flex items-center gap-2">
              <Languages
                aria-hidden="true"
                className="h-4 w-4"
              />
              {report.language}
            </span>

            <span>
              {report.fileType} · {report.fileSize}
            </span>
          </div>
        </div>

        <div className="flex items-center border-t border-slate-200 p-7 lg:border-l lg:border-t-0">
          <a
            href={report.href}
            aria-label={`Download ${report.title}`}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#0a322f] px-5 py-3 font-semibold text-white transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200 lg:w-auto"
          >
            <Download
              aria-hidden="true"
              className="h-5 w-5"
            />
            Download
          </a>
        </div>
      </div>
    </article>
  )
}