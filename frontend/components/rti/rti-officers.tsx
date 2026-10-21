"use client"

import { useState } from "react"
import Image from "next/image"
import {
  UserCheck,
  ShieldCheck,
  Phone,
  Printer,
  Mail,
  Copy,
  Check,
  Building,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { useLanguage } from "@/src/contexts/LanguageContext"
import type { ApiRtiOfficer, ApiRtiPageSettings } from "@/lib/api/rti"

interface RtiOfficersProps {
  officers?: ApiRtiOfficer[]
  header?: ApiRtiPageSettings
  lang?: string
}

export function RtiOfficers({ officers = [], header, lang }: RtiOfficersProps) {
  const { language } = useLanguage()
  const activeLang = (lang as "en" | "si" | "ta") || (language as "en" | "si" | "ta") || "en"
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    const cleanText = text.replace(/\[at\]/g, "@")
    navigator.clipboard.writeText(cleanText)
    setCopiedItem(id)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  if (!officers || officers.length === 0) {
    return null
  }

  const sectionTitle =
    header?.officers_title ||
    (activeLang === "si"
      ? "නම්කළ නිලධාරීන් සහ තොරතුරු නිලධාරීන්"
      : activeLang === "ta"
      ? "நியமிக்கப்பட்ட & தகவல் அதிகாரிகள்"
      : "Designated & Information Officers")

  const sectionDesc =
    header?.officers_description ||
    (activeLang === "si"
      ? "තොරතුරු ලබාගැනීමේ පනත යටතේ ඉල්ලීම් සහ අභියාචනා ඉදිරිපත් කිරීම සඳහා නිල සම්බන්ධතා විස්තර."
      : activeLang === "ta"
      ? "தகவல் அறியும் உரிமைச் சட்டத்தின் கீழ் கோரிக்கைகள் அல்லது மேல்முறையீடுகளைச் சமர்ப்பிப்பதற்கான தொடர்பு விவரங்கள்."
      : "Official contact details for submitting RTI requests or lodging appeals under the RTI Act.")

  return (
    <section id="rti-officers" className="py-12 bg-slate-50 border-b border-slate-200" aria-label="RTI Officers">
      <Container>
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#256B29]">
            <UserCheck className="h-5 w-5" aria-hidden="true" />
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

        {/* Officers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {officers.map((officer) => (
            <div
              key={officer.id}
              className="flex flex-col sm:flex-row items-start rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs transition-all duration-200 hover:border-slate-300 hover:shadow-md"
            >
              {/* Officer Portrait */}
              <div className="relative h-28 w-28 sm:h-36 sm:w-36 shrink-0 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 mb-4 sm:mb-0 sm:mr-6">
                <Image
                  src={officer.image || "/images/leadership/secretary.jpg"}
                  alt={officer.imageAlt || officer.name}
                  fill
                  className="object-cover"
                  unoptimized
                  sizes="(max-width: 640px) 112px, 144px"
                  onError={(e) => {
                    e.currentTarget.style.display = "none"
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-400 -z-10">
                  <UserCheck className="h-12 w-12" aria-hidden="true" />
                </div>
              </div>

              {/* Officer Info & Contact details */}
              <div className="flex-1 space-y-3">
                {/* Officer Type Badge */}
                <div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      officer.officerType === "Designated Officer"
                        ? "bg-emerald-100 text-[#256B29] border border-emerald-200"
                        : "bg-blue-100 text-blue-800 border border-blue-200"
                    }`}
                  >
                    <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>
                      {officer.officerType === "Designated Officer"
                        ? activeLang === "si"
                          ? "නම්කළ නිලධාරී"
                          : activeLang === "ta"
                          ? "நியமிக்கப்பட்ட அதிகாரி"
                          : "Designated Officer"
                        : activeLang === "si"
                        ? "තොරතුරු නිලධාරී"
                        : activeLang === "ta"
                        ? "தகவல் அதிகாரி"
                        : "Information Officer"}
                    </span>
                  </span>
                </div>

                {/* Name & Designation */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">
                    {officer.name}
                  </h3>
                  <p className="text-xs text-[#256B29] font-bold mt-1">
                    {officer.designation}
                  </p>
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-1">
                    <Building className="h-3.5 w-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                    <span>{officer.organization}</span>
                  </p>
                </div>

                {/* Contact Links */}
                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                  {/* Telephone */}
                  {officer.telephone && (
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                        <span className="font-semibold text-slate-500">
                          {activeLang === "si" ? "දුරකථන:" : activeLang === "ta" ? "தொலைபேசி:" : "Tel:"}
                        </span>
                        <a
                          href={`tel:${officer.telephone.replace(/\s+/g, "")}`}
                          className="font-bold text-slate-900 hover:text-[#388E3C] transition-colors"
                        >
                          {officer.telephone}
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(officer.telephone, `${officer.id}-phone`)}
                        className="p-1 text-slate-400 hover:text-slate-600 rounded cursor-pointer"
                        title={activeLang === "si" ? "දුරකථන අංකය පිටපත් කරන්න" : activeLang === "ta" ? "தொலைபேசி எண்ணை நகலெடுக்கவும்" : "Copy telephone"}
                        aria-label="Copy telephone"
                      >
                        {copiedItem === `${officer.id}-phone` ? (
                          <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  )}

                  {/* Fax */}
                  {officer.fax && (
                    <div className="flex items-center gap-2">
                      <Printer className="h-3.5 w-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                      <span className="font-semibold text-slate-500">
                        {activeLang === "si" ? "ෆැක්ස්:" : activeLang === "ta" ? "தொலைநகல்:" : "Fax:"}
                      </span>
                      <span className="font-medium text-slate-800">{officer.fax}</span>
                    </div>
                  )}

                  {/* Emails */}
                  {officer.emails && officer.emails.length > 0 && (
                    <div className="space-y-1 pt-1">
                      {officer.emails.map((email, idx) => {
                        const cleanEmail = email.replace(/\[at\]/g, "@")
                        const copyId = `${officer.id}-email-${idx}`

                        return (
                          <div key={email} className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 truncate">
                              <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                              <span className="font-semibold text-slate-500 shrink-0">
                                {idx === 0
                                  ? activeLang === "si"
                                    ? "විද්‍යුත් තැපෑල:"
                                    : activeLang === "ta"
                                    ? "மின்னஞ்சல்:"
                                    : "Email:"
                                  : activeLang === "si"
                                  ? "විකල්ප විද්‍යුත් තැපෑල:"
                                  : activeLang === "ta"
                                  ? "மாற்று மின்னஞ்சல்:"
                                  : "Email (Alt):"}
                              </span>
                              <a
                                href={`mailto:${cleanEmail}`}
                                className="font-bold text-[#256B29] hover:underline truncate"
                              >
                                {email}
                              </a>
                            </div>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(email, copyId)}
                              className="p-1 text-slate-400 hover:text-slate-600 rounded cursor-pointer shrink-0"
                              title="Copy email"
                              aria-label="Copy email"
                            >
                              {copiedItem === copyId ? (
                                <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                              ) : (
                                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                              )}
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
