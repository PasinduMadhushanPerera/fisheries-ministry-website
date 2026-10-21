"use client"

import { useState, useEffect } from "react"
import { Scale, FileText, ExternalLink, Download, Eye, X } from "lucide-react"

import { Container } from "@/components/ui/container"
import { useLanguage } from "@/src/contexts/LanguageContext"
import type { ApiRtiLegalDocument, ApiRtiPageSettings } from "@/lib/api/rti"

interface RtiLegalDocumentsProps {
  legalDocuments?: ApiRtiLegalDocument[]
  header?: ApiRtiPageSettings
  lang?: string
}

export function RtiLegalDocuments({ legalDocuments = [], header, lang }: RtiLegalDocumentsProps) {
  const { language } = useLanguage()
  const activeLang = (lang as "en" | "si" | "ta") || (language as "en" | "si" | "ta") || "en"
  const [selectedDoc, setSelectedDoc] = useState<ApiRtiLegalDocument | null>(null)

  const defaultTitle =
    activeLang === "si"
      ? "තොරතුරු දැනගැනීමේ පනත හා රෙගුලාසි"
      : activeLang === "ta"
      ? "தகவல் அறியும் உரிமைச் சட்டம் மற்றும் ஒழுங்குவிதிகள்"
      : "RTI Legislation & Regulations"

  const defaultDesc =
    activeLang === "si"
      ? "පුරවැසි තොරතුරු අයිතිවාසිකම් සහ අමාත්‍යාංශ තොරතුරු හෙළිදරව් කිරීමේ ක්‍රියාපටිපාටිය පාලනය කරන නිල නීතිමය රාමුව."
      : activeLang === "ta"
      ? "பிரஜைகளின் தகவல் உரிமைகள் மற்றும் அமைச்சு வெளிப்படுத்தல் நடைமுறைகளை நிர்வகிக்கும் உத்தியோகபூர்வ சட்டக் கட்டமைப்பு."
      : "Official legal framework governing citizen information rights and Ministry disclosure procedures."

  const sectionTitle = header?.legislation_title || defaultTitle
  const sectionDesc = header?.legislation_description || defaultDesc

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

  if (!legalDocuments || legalDocuments.length === 0) {
    return null
  }

  return (
    <section id="rti-legal" className="py-12 bg-white border-b border-slate-200" aria-label="RTI Legal Documents">
      <Container>
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#256B29]">
            <Scale className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {sectionTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {sectionDesc}
            </p>
          </div>
        </div>

        {/* Legal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {legalDocuments.map((doc) => (
            <div
              key={doc.id}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-6 shadow-2xs transition-all duration-200 hover:border-slate-300 hover:bg-white hover:shadow-md"
            >
              <div>
                {/* Top Row: Icon & File Badge */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <FileText className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700 border border-slate-200/80">
                      <span>{doc.fileType}</span>
                      <span className="text-slate-400">•</span>
                      <span>{doc.fileSize}</span>
                    </span>
                    {doc.availableLanguages && doc.availableLanguages.length > 0 && (
                      <div className="flex items-center gap-1">
                        {doc.availableLanguages.includes("en") && (
                          <span className="rounded bg-sky-50 px-1 py-0.5 text-[9px] font-extrabold text-sky-700 border border-sky-200/80">
                            EN
                          </span>
                        )}
                        {doc.availableLanguages.includes("si") && (
                          <span className="rounded bg-amber-50 px-1 py-0.5 text-[9px] font-extrabold text-amber-700 border border-amber-200/80">
                            SI
                          </span>
                        )}
                        {doc.availableLanguages.includes("ta") && (
                          <span className="rounded bg-rose-50 px-1 py-0.5 text-[9px] font-extrabold text-rose-700 border border-rose-200/80">
                            TA
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="mt-4 text-base font-bold text-slate-900 group-hover:text-[#388E3C] transition-colors leading-snug">
                  {doc.title}
                </h3>

                {/* Short Description */}
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {doc.description}
                </p>

                {doc.publishedDate && (
                  <p className="mt-3 text-xs text-slate-500 font-medium">
                    Published: {doc.publishedDate}
                  </p>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-4 border-t border-slate-200/70">
                <button
                  type="button"
                  onClick={() => setSelectedDoc(doc)}
                  className="flex-1 inline-flex min-h-[38px] items-center justify-center gap-1 rounded-xl border border-slate-300 bg-white px-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 cursor-pointer"
                >
                  <Eye className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                  <span>{activeLang === "si" ? "විස්තර" : activeLang === "ta" ? "விவரங்கள்" : "View details"}</span>
                </button>

                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex min-h-[38px] items-center justify-center gap-1 rounded-xl border border-slate-300 bg-white px-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                  <span>{activeLang === "si" ? "ගොනුව බලන්න" : activeLang === "ta" ? "கோப்பைத் திறக்க" : "Open file"}</span>
                </a>

                <a
                  href={doc.downloadUrl || doc.fileUrl}
                  download
                  className="flex-1 inline-flex min-h-[38px] items-center justify-center gap-1 rounded-xl bg-[#388E3C] px-2 text-xs font-bold text-white transition hover:bg-[#256B29]"
                >
                  <Download className="h-3.5 w-3.5 !text-white" aria-hidden="true" />
                  <span className="text-white">{activeLang === "si" ? "බාගන්න" : activeLang === "ta" ? "பதிவிறக்க" : "Download"}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View Details Modal */}
        {selectedDoc && (
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedDoc(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-legal-title"
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 text-left my-auto"
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
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <FileText className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-[#256B29]">
                    {activeLang === "si" ? "RTI නීතිමය ලේඛනය" : activeLang === "ta" ? "RTI சட்ட ஆவணம்" : "RTI Legal Document"}
                  </span>
                  {selectedDoc.publishedDate && (
                    <p className="text-xs text-slate-500 mt-0.5">
                      {activeLang === "si" ? "බලාත්මක දිනය:" : activeLang === "ta" ? "நடைமுறைக்கு வந்த திகதி:" : "Enacted:"} {selectedDoc.publishedDate}
                    </p>
                  )}
                </div>
              </div>

              <h3 id="modal-legal-title" className="mt-4 text-xl font-bold text-slate-900">
                {selectedDoc.title}
              </h3>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {selectedDoc.description}
              </p>

              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-200/70">
                  <span className="font-semibold text-slate-500">{activeLang === "si" ? "ගොනු ආකෘතිය:" : activeLang === "ta" ? "கோப்பு வகை:" : "File Type:"}</span>
                  <span className="font-bold text-slate-900">{selectedDoc.fileType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/70">
                  <span className="font-semibold text-slate-500">{activeLang === "si" ? "ගොනු ප්‍රමාණය:" : activeLang === "ta" ? "கோப்பின் அளவு:" : "File Size:"}</span>
                  <span className="font-bold text-slate-900">{selectedDoc.fileSize}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-semibold text-slate-500">{activeLang === "si" ? "බලාත්මක ආයතනය:" : activeLang === "ta" ? "அதிகாரசபை:" : "Authority:"}</span>
                  <span className="font-bold text-[#256B29]">{activeLang === "si" ? "ශ්‍රී ලංකා පාර්ලිමේන්තුව / ධීවර අමාත්‍යාංශය" : activeLang === "ta" ? "இலங்கை நாடாளுமன்றம் / கடற்றொழில் அமைச்சு" : "Parliament of Sri Lanka / Ministry of Fisheries"}</span>
                </div>
              </div>

              {/* Language Specific File Versions */}
              {(selectedDoc.fileUrlEn || selectedDoc.fileUrlSi || selectedDoc.fileUrlTa) && (
                <div className="mt-4 rounded-xl border border-emerald-200/80 bg-emerald-50/40 p-3.5">
                  <span className="block text-xs font-extrabold text-emerald-950 mb-2">
                    {activeLang === "si" ? "📄 පවතින භාෂා ගොනු අනුවාද:" : activeLang === "ta" ? "📄 கிடைக்கக்கூடிய மொழி கோப்பு பதிப்புகள்:" : "📄 Available Language File Versions:"}
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
                  {activeLang === "si" ? "වසන්න" : activeLang === "ta" ? "மூடுக" : "Close"}
                </button>
                <a
                  href={selectedDoc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                  <span>{activeLang === "si" ? "ගොනුව බලන්න" : activeLang === "ta" ? "கோப்பைத் திறக்க" : "Open file"}</span>
                </a>
                <a
                  href={selectedDoc.downloadUrl || selectedDoc.fileUrl}
                  download
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#388E3C] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#256B29]"
                >
                  <Download className="h-3.5 w-3.5 !text-white" aria-hidden="true" />
                  <span className="text-white">{activeLang === "si" ? "බාගන්න" : activeLang === "ta" ? "பதிவிறக்க" : "Download"}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
