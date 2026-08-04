import {
  Building2,
  CalendarDays,
  Clock3,
  Download,
  FileText,
} from "lucide-react"

import type {
  MinistryTender,
  TenderStatus,
} from "@/data/tenders"

type TenderCardProps = {
  tender: MinistryTender
}

const statusStyles: Record<TenderStatus, string> = {
  Open: "border-green-200 bg-green-50 text-green-800",
  "Closing Soon": "border-amber-200 bg-amber-50 text-amber-800",
  Closed: "border-slate-200 bg-slate-100 text-slate-700",
}

export function TenderCard({ tender }: TenderCardProps) {
  const isClosed = tender.status === "Closed"

  return (
    <article className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:border-green-300 hover:shadow-xl">
      <div className="grid lg:grid-cols-[13rem_1fr_auto] lg:items-stretch">
        <div className="relative flex min-h-52 items-center justify-center overflow-hidden bg-[#071f26] p-7 text-white lg:min-h-full">
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
              <FileText aria-hidden="true" className="h-8 w-8" />
            </div>

            <p className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-green-200">
              Tender
            </p>

            <p className="mt-2 text-xl font-bold">{tender.year}</p>
          </div>
        </div>

        <div className="p-7 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[tender.status]}`}
            >
              {tender.status}
            </span>

            <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-800">
              {tender.category}
            </span>

            {tender.featured ? (
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">
                Featured tender
              </span>
            ) : null}
          </div>

          <p className="mt-5 text-sm font-bold uppercase tracking-[0.12em] text-green-800">
            {tender.referenceNumber}
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            {tender.title}
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            {tender.description}  
          </p>

          <div className="mt-6 grid gap-3 border-t border-slate-100 pt-5 text-sm text-slate-500 sm:grid-cols-2">
            <span className="inline-flex items-center gap-2">
              <Building2 aria-hidden="true" className="h-4 w-4" />
              {tender.department}
            </span>

            <span className="inline-flex items-center gap-2">
              <CalendarDays aria-hidden="true" className="h-4 w-4" />
              Published: {tender.publishedDate}
            </span>

            <span className="inline-flex items-center gap-2">
              <Clock3 aria-hidden="true" className="h-4 w-4" />
              Closing: {tender.closingDate}
            </span>

            <span>
              {tender.fileType} · {tender.fileSize}
            </span>
          </div>
        </div>

        <div className="flex items-center border-t border-slate-200 p-7 lg:border-l lg:border-t-0">
          <a
            href={tender.href}
            aria-label={`Download ${tender.title}`}
            aria-disabled={isClosed}
            className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg px-5 py-3 font-semibold transition focus-visible:outline-none focus-visible:ring-4 lg:w-auto ${
              isClosed
                ? "cursor-not-allowed bg-slate-200 text-slate-500"
                : "bg-[#0a322f] text-white hover:bg-green-800 focus-visible:ring-green-200"
            }`}
            onClick={(event) => {
              if (isClosed) {
                event.preventDefault()
              }
            }}
          >
            <Download aria-hidden="true" className="h-5 w-5" />
            {isClosed ? "Closed" : "Download"}
          </a>
        </div>
      </div>
    </article>
  )
}