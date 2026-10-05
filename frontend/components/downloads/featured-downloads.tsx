"use client"

import { useState, useEffect } from "react"
import { Sparkles, ExternalLink, Download, Eye, X } from "lucide-react"

import { Container } from "@/components/ui/container"
import { downloadDocuments, type DownloadDocument } from "@/data/download-documents"
import type { ApiDownloadDocumentItem } from "@/lib/api/downloads"

interface FeaturedDownloadsProps {
  featuredDocuments?: ApiDownloadDocumentItem[]
}

export function FeaturedDownloads({ featuredDocuments }: FeaturedDownloadsProps) {
  const [selectedDoc, setSelectedDoc] = useState<ApiDownloadDocumentItem | DownloadDocument | null>(null)

  const items = featuredDocuments !== undefined && featuredDocuments !== null
    ? featuredDocuments
    : downloadDocuments.filter((doc) => doc.featured)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedDoc(null)
    }
    if (selectedDoc) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [selectedDoc])

  if (items.length === 0) return null

  return (
    <section className="py-10 bg-white border-b border-slate-200" aria-label="Featured Downloads">
      <Container>
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Featured Publications & Disclosures
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Key project disclosures, strategic policies, and public charters highlighted for easy access.
            </p>
          </div>
        </div>

        {/* Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((doc) => (
            <div
              key={doc.id}
              className="group flex flex-col justify-between rounded-2xl border border-amber-200/80 bg-amber-50/20 p-5 shadow-2xs transition-all duration-200 hover:border-amber-300 hover:bg-white hover:shadow-md"
            >
              <div>
                {/* Top Badge & Format */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100/80 px-2.5 py-0.5 text-xs font-bold text-amber-800 border border-amber-200">
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    <span>Featured</span>
                  </span>

                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700">
                    <span>{doc.fileType}</span>
                    <span className="text-slate-400">•</span>
                    <span>{doc.fileSize}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-3 text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#256B29] transition-colors leading-snug">
                  {doc.title}
                </h3>

                {doc.publishedDate && (
                  <p className="mt-3 text-[11px] text-slate-500 font-medium">
                    Published: {doc.publishedDate}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 pt-3 border-t border-slate-100">
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex min-h-[36px] items-center justify-center gap-1 rounded-xl border border-slate-300 bg-white px-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                  <span>Open</span>
                </a>

                <a
                  href={doc.downloadUrl || doc.fileUrl}
                  download
                  className="flex-1 inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-xl bg-[#256B29] px-2 text-xs font-extrabold text-white !text-white transition hover:bg-[#1b4d1d] hover:text-white hover:!text-white shadow-2xs"
                >
                  <Download className="h-3.5 w-3.5 text-white !text-white" aria-hidden="true" />
                  <span className="text-white !text-white">Download</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View Details Modal */}
        {selectedDoc && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedDoc(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-featured-title"
              className="relative my-auto w-full max-w-lg rounded-2xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-200 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                    Featured Download
                  </span>
                  {selectedDoc.publishedDate && (
                    <p className="text-xs text-slate-500 mt-0.5">
                      Published: {selectedDoc.publishedDate}
                    </p>
                  )}
                </div>
              </div>

              <h3 id="modal-featured-title" className="mt-4 text-xl font-bold text-slate-900">
                {selectedDoc.title}
              </h3>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {selectedDoc.description}
              </p>

              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2 text-xs text-slate-700">
                {selectedDoc.year && (
                  <div className="flex justify-between py-1 border-b border-slate-200/70">
                    <span className="font-semibold text-slate-500">Publication Year:</span>
                    <span className="font-bold text-slate-900">{selectedDoc.year}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 border-b border-slate-200/70">
                  <span className="font-semibold text-slate-500">File Type:</span>
                  <span className="font-bold text-slate-900">{selectedDoc.fileType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/70">
                  <span className="font-semibold text-slate-500">File Size:</span>
                  <span className="font-bold text-slate-900">{selectedDoc.fileSize}</span>
                </div>
                {selectedDoc.language && (
                  <div className="flex justify-between py-1 border-b border-slate-200/70">
                    <span className="font-semibold text-slate-500">Language:</span>
                    <span className="font-bold text-slate-900">{selectedDoc.language}</span>
                  </div>
                )}
                <div className="flex justify-between py-1">
                  <span className="font-semibold text-slate-500">Official Source:</span>
                  <span className="font-bold text-[#256B29]">Ministry of Fisheries</span>
                </div>
              </div>

              {/* Language Specific File Versions */}
              {(selectedDoc.fileUrlEn || selectedDoc.fileUrlSi || selectedDoc.fileUrlTa) && (
                <div className="mt-4 rounded-xl border border-emerald-200/80 bg-emerald-50/40 p-3.5">
                  <span className="block text-xs font-extrabold text-emerald-950 mb-2">
                    📄 Available Language File Versions:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedDoc.fileUrlEn && (
                      <a
                        href={selectedDoc.fileUrlEn}
                        download
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-emerald-300 px-3 py-1.5 text-xs font-bold text-emerald-800 shadow-2xs hover:bg-emerald-100 transition"
                      >
                        <Download className="h-3.5 w-3.5 text-emerald-600" />
                        <span>English (EN)</span>
                      </a>
                    )}
                    {selectedDoc.fileUrlSi && (
                      <a
                        href={selectedDoc.fileUrlSi}
                        download
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-emerald-300 px-3 py-1.5 text-xs font-bold text-emerald-800 shadow-2xs hover:bg-emerald-100 transition"
                      >
                        <Download className="h-3.5 w-3.5 text-emerald-600" />
                        <span>සිංහල (SI)</span>
                      </a>
                    )}
                    {selectedDoc.fileUrlTa && (
                      <a
                        href={selectedDoc.fileUrlTa}
                        download
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-emerald-300 px-3 py-1.5 text-xs font-bold text-emerald-800 shadow-2xs hover:bg-emerald-100 transition"
                      >
                        <Download className="h-3.5 w-3.5 text-emerald-600" />
                        <span>தமிழ் (TA)</span>
                      </a>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedDoc(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Close
                </button>
                <a
                  href={selectedDoc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                  <span>Open file</span>
                </a>
                <a
                  href={selectedDoc.downloadUrl || selectedDoc.fileUrl}
                  download
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#388E3C] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#256B29]"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
