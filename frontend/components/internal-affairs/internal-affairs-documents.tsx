"use client"

import { useState, useEffect, useCallback } from "react"
import { Download, Eye, FileText, Calendar, HardDrive } from "lucide-react"

import { Container } from "@/components/ui/container"
import { useLanguage } from "@/src/contexts/LanguageContext"
import {
  fetchInternalAffairsDocuments,
  type ApiInternalAffairsDocument,
  type ApiSectionHeader,
} from "@/lib/api/internal-affairs"

interface InternalAffairsDocumentsProps {
  initialDocuments?: ApiInternalAffairsDocument[]
  header?: ApiSectionHeader
}

export function InternalAffairsDocuments({ initialDocuments, header }: InternalAffairsDocumentsProps) {
  const { language } = useLanguage()
  const [documents, setDocuments] = useState<ApiInternalAffairsDocument[]>(initialDocuments || [])

  const loadDocuments = useCallback(async () => {
    try {
      const freshDocs = await fetchInternalAffairsDocuments(language)
      setDocuments(freshDocs)
    } catch (err) {
      console.error("Failed to load internal affairs documents:", err)
    }
  }, [language])

  useEffect(() => {
    void loadDocuments()

    const handleFocus = () => {
      void loadDocuments()
    }
    window.addEventListener("focus", handleFocus)
    return () => {
      window.removeEventListener("focus", handleFocus)
    }
  }, [loadDocuments])

  if (!documents || documents.length === 0) {
    return null
  }

  return (
    <section aria-labelledby="documents-heading" className="bg-white py-14 sm:py-16 border-t border-slate-200/80">
      <Container>
        <div className="flex flex-col gap-2 border-b border-slate-200 pb-6 mb-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#256B29]">
            {header?.badge || "Downloads & Regulations"}
          </p>

          <h2 id="documents-heading" className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
            {header?.title || "Internal Affairs Documents & Guidance"}
          </h2>

          <p className="text-xs sm:text-sm leading-relaxed text-slate-600 max-w-2xl">
            {header?.description || "Official guidelines, complaint submission procedures, and whistleblower protection frameworks."}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {documents.map((doc) => {
            const hasFile = doc.fileUrl && doc.fileUrl !== "#"

            return (
              <article
                key={doc.id}
                className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/40 p-6 shadow-xs transition hover:border-[#256B29] hover:bg-emerald-50/10 hover:shadow-md"
              >
                <div>
                  {/* Badge & Date Header */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-[#256B29]">
                        <FileText className="h-4 w-4" />
                      </div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-extrabold border bg-emerald-50 text-[#256B29] border-emerald-200">
                        {doc.fileType || "PDF"}
                      </span>
                    </div>

                    {doc.fileSize && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                        <HardDrive className="h-3 w-3 text-slate-400" />
                        <span>{doc.fileSize}</span>
                      </span>
                    )}
                  </div>

                  {/* Document Title */}
                  <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                    {doc.title}
                  </h3>

                  {/* Description */}
                  {doc.description && (
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-3">
                      {doc.description}
                    </p>
                  )}

                  {/* Published Date */}
                  {doc.publishedDate && (
                    <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                      <Calendar className="h-3.5 w-3.5 text-[#256B29]" />
                      <span>Published: {doc.publishedDate}</span>
                    </div>
                  )}
                </div>

                {/* Actions Footer */}
                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-2">
                  {hasFile ? (
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition shadow-2xs"
                    >
                      <Eye className="h-3.5 w-3.5 text-[#256B29]" />
                      <span>Preview</span>
                    </a>
                  ) : (
                    <span className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-400 cursor-not-allowed">
                      <Eye className="h-3.5 w-3.5" />
                      <span>Preview</span>
                    </span>
                  )}

                  {hasFile ? (
                    <a
                      href={doc.downloadUrl || doc.fileUrl}
                      download
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-[#256B29] text-xs font-extrabold text-white !text-white hover:bg-[#1b4d1d] hover:text-white hover:!text-white transition shadow-2xs"
                    >
                      <Download className="h-3.5 w-3.5 text-white !text-white" />
                      <span className="text-white !text-white">Download</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-slate-100 text-xs font-bold text-slate-400 cursor-not-allowed"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download</span>
                    </button>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
