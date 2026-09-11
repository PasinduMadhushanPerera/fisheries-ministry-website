"use client"

import Image from "next/image"
import {
  FileText,
  ImageIcon,
  FileType2,
  FileSpreadsheet,
  FileArchive,
  Files,
  Download,
  Eye,
  Sparkles,
  Building2,
  Globe,
} from "lucide-react"

import type { ForeignTrainingProgramme } from "@/data/foreign-training-programmes"
import { Container } from "@/components/ui/container"

interface ForeignTrainingFeaturedProps {
  programmes: ForeignTrainingProgramme[]
  featuredBadge?: string
  onSelectProgramme: (programme: ForeignTrainingProgramme) => void
}

function getFileIcon(fileType: string) {
  switch (fileType) {
    case "PDF":
      return FileText
    case "JPG":
    case "PNG":
      return ImageIcon
    case "DOCX":
      return FileType2
    case "XLSX":
      return FileSpreadsheet
    case "ZIP":
      return FileArchive
    default:
      return Files
  }
}

export function ForeignTrainingFeatured({
  programmes,
  featuredBadge,
  onSelectProgramme,
}: ForeignTrainingFeaturedProps) {
  const featuredList = programmes.filter((p) => p.featured)

  if (featuredList.length === 0) return null

  return (
    <section aria-label="Featured foreign scholarships" className="bg-slate-50/80 py-10 sm:py-12 border-b border-slate-200/80">
      <Container>
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#256B29] flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-[#256B29]" />
            <span>{featuredBadge || "Featured Overseas Scholarships & Fellowships"}</span>
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredList.map((programme) => {
            const FileIcon = getFileIcon(programme.fileType)

            return (
              <article
                key={programme.id}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-emerald-200/80 bg-white shadow-xs transition-all duration-300 hover:border-emerald-400 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Header Image Banner */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-[#041c22] to-[#0c4e48] text-white">
                  {programme.image ? (
                    <Image
                      src={programme.image}
                      alt={programme.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
                    />
                  ) : null}

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/90 px-2.5 py-1 text-[11px] font-extrabold text-white backdrop-blur-xs shadow-2xs">
                      <Sparkles className="h-3 w-3" />
                      Featured Opportunity
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-xl bg-blue-700 border border-blue-500 px-3 py-1 text-xs font-black uppercase tracking-wider text-white backdrop-blur-md shadow-sm">
                      <Globe className="h-3.5 w-3.5 text-blue-200 shrink-0" />
                      <span>{programme.country}</span>
                      <span className="text-blue-200 font-bold">• {programme.year}</span>
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex flex-1 flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="rounded-md bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 text-[11px] font-extrabold text-[#256B29]">
                        {programme.categoryLabel}
                      </span>

                      <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        <FileIcon className="h-3 w-3 text-[#256B29]" />
                        <span>{programme.fileType} • {programme.fileSize}</span>
                      </div>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 leading-snug group-hover:text-[#256B29] transition-colors line-clamp-2">
                      {programme.title}
                    </h3>

                    <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-slate-700">
                      <Globe className="h-3.5 w-3.5 text-[#256B29] shrink-0" />
                      <span className="line-clamp-1">{programme.institution}</span>
                    </div>

                    <p className="mt-2 text-xs text-slate-600 leading-relaxed text-justify line-clamp-3 font-normal">
                      {programme.description}
                    </p>
                  </div>

                  {/* View Details & Download Buttons */}
                  <div className="border-t border-slate-100 pt-4 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectProgramme(programme)}
                      className="inline-flex min-h-[38px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#256B29] px-4 text-xs font-extrabold text-white hover:bg-[#1b4d1d] transition shadow-2xs cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>View details</span>
                    </button>

                    <a
                      href={programme.downloadUrl}
                      download
                      className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                      title="Download file"
                    >
                      <Download className="h-3.5 w-3.5 text-[#256B29]" />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
