import {
  CalendarDays,
  Download,
  FileText,
  Languages,
} from "lucide-react"

import type { MinistryPublication } from "@/data/publications"

type PublicationCardProps = {
  publication: MinistryPublication
}

export function PublicationCard({
  publication,
}: PublicationCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-xl">
      <div className="relative min-h-56 overflow-hidden bg-[#071f26] p-7 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.22),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.2),transparent_42%)]"
        />

        <div
          aria-hidden="true"
          className="absolute -right-12 -top-12 h-36 w-36 rounded-full border border-white/10 bg-white/[0.025]"
        />

        <div className="relative flex h-full flex-col">
          <div className="flex items-start justify-between gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-300 text-slate-950 shadow-lg">
              <FileText
                aria-hidden="true"
                className="h-8 w-8"
              />
            </div>

            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.1em]">
              {publication.fileType}
            </span>
          </div>

          <div className="mt-auto pt-8">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-green-200">
              {publication.category}
            </p>

            <h2 className="mt-3 text-2xl font-bold leading-snug">
              {publication.title}
            </h2>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <p className="leading-7 text-slate-600">
          {publication.description}
        </p>

        <div className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <CalendarDays
              aria-hidden="true"
              className="h-4 w-4"
            />
            Published year: {publication.year}
          </div>

          <div className="flex items-center gap-2">
            <Languages
              aria-hidden="true"
              className="h-4 w-4"
            />
            {publication.language}
          </div>

          <div>
            {publication.fileType} · {publication.fileSize}
          </div>
        </div>

        <a
          href={publication.href}
          aria-label={`Download ${publication.title}`}
          className="mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#0a322f] px-5 py-3 font-semibold text-white transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
        >
          <Download
            aria-hidden="true"
            className="h-5 w-5"
          />
          Download publication
        </a>
      </div>
    </article>
  )
}