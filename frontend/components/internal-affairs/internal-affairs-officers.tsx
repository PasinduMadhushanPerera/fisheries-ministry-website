"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Check, Copy, Mail, MapPin, Phone, MessageSquare, Printer, Info, Clock } from "lucide-react"

import { Container } from "@/components/ui/container"
import { internalAffairsOfficers, type InternalAffairsOfficer } from "@/data/internal-affairs"
import { useLanguage } from "@/src/contexts/LanguageContext"
import { fetchInternalAffairsOfficers, type ApiSectionHeader } from "@/lib/api/internal-affairs"

interface InternalAffairsOfficersProps {
  initialOfficers?: InternalAffairsOfficer[]
  header?: ApiSectionHeader
}

function renderContactIcon(iconType?: string) {
  switch (iconType) {
    case "whatsapp":
      return <MessageSquare className="h-4 w-4 text-[#256B29] shrink-0" aria-hidden="true" />
    case "email":
      return <Mail className="h-4 w-4 text-[#256B29] shrink-0" aria-hidden="true" />
    case "map":
      return <MapPin className="h-4 w-4 text-[#256B29] shrink-0" aria-hidden="true" />
    case "fax":
      return <Printer className="h-4 w-4 text-[#256B29] shrink-0" aria-hidden="true" />
    case "info":
      return <Info className="h-4 w-4 text-[#256B29] shrink-0" aria-hidden="true" />
    case "clock":
      return <Clock className="h-4 w-4 text-[#256B29] shrink-0" aria-hidden="true" />
    default:
      return <Phone className="h-4 w-4 text-[#256B29] shrink-0" aria-hidden="true" />
  }
}

export function InternalAffairsOfficers({ initialOfficers, header }: InternalAffairsOfficersProps) {
  const { language } = useLanguage()
  const [officers, setOfficers] = useState<InternalAffairsOfficer[]>(
    initialOfficers && initialOfficers.length > 0 ? initialOfficers : internalAffairsOfficers
  )
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const loadOfficers = useCallback(async () => {
    try {
      const freshOfficers = await fetchInternalAffairsOfficers(language)
      if (freshOfficers && freshOfficers.length > 0) {
        setOfficers(freshOfficers)
      }
    } catch (err) {
      console.error("Failed to load internal affairs officers:", err)
    }
  }, [language])

  useEffect(() => {
    void loadOfficers()

    const handleFocus = () => {
      void loadOfficers()
    }
    window.addEventListener("focus", handleFocus)
    return () => {
      window.removeEventListener("focus", handleFocus)
    }
  }, [loadOfficers])

  function handleCopyContact(officer: InternalAffairsOfficer) {
    let contactInfo = `${officer.name}\n${officer.designation}`
    if (officer.phone) contactInfo += `\n${officer.phoneLabel || "Telephone"}: ${officer.phone}`
    if (officer.mobileWhatsapp) contactInfo += `\n${officer.mobileLabel || "Mobile/WhatsApp"}: ${officer.mobileWhatsapp}`
    if (officer.email) contactInfo += `\n${officer.emailLabel || "Email"}: ${officer.email}`

    if (officer.customContactLines && officer.customContactLines.length > 0) {
      officer.customContactLines.forEach((c) => {
        contactInfo += `\n${c.label}: ${c.value}`
      })
    }
    if (officer.officeAddress) contactInfo += `\nAddress: ${officer.officeAddress}`

    navigator.clipboard.writeText(contactInfo).then(() => {
      setCopiedId(officer.id)
      setTimeout(() => setCopiedId(null), 2500)
    })
  }

  return (
    <section aria-labelledby="officers-heading" className="bg-[#f8faf9] py-14 sm:py-18 border-t border-slate-200/80">
      <Container>
        <div className="flex flex-col gap-2 border-b border-slate-200 pb-6 mb-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#256B29]">
            {header?.badge || "Institutional Contacts"}
          </p>

          <h2 id="officers-heading" className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
            {header?.title || "Key Internal Affairs Officers"}
          </h2>

          <p className="text-xs sm:text-sm leading-relaxed text-slate-600 max-w-2xl">
            {header?.description || "Direct profile cards of designated officers in charge of public grievances, oversight inquiries, and ethical standards."}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-stretch">
          {officers.map((officer) => (
            <article
              key={officer.id}
              className="flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-md transition hover:border-[#256B29] hover:shadow-xl"
            >
              <div>
                {/* Header Profile Info */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-5 pb-5 border-b border-slate-100">
                  <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-2xl border-2 border-[#256B29]/30 bg-slate-100 shadow-md">
                    <Image
                      src={officer.photo || "/images/leadership/secretary.jpg"}
                      alt={officer.name}
                      fill
                      sizes="(min-width: 640px) 112px, 96px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="inline-block rounded-md bg-emerald-100 px-2.5 py-0.5 text-[11px] font-extrabold text-[#256B29] border border-emerald-200">
                      {officer.roleBadge}
                    </span>

                    <h3 className="mt-1.5 text-lg font-extrabold text-slate-950 truncate">
                      {officer.name}
                    </h3>

                    <p className="text-xs font-semibold text-slate-600 leading-snug">
                      {officer.designation}
                    </p>
                  </div>
                </div>

                {/* Contact List */}
                <div className="py-5 space-y-3 text-xs text-slate-700">
                  {officer.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-[#256B29] shrink-0" aria-hidden="true" />
                      <span className="font-semibold text-slate-900">{officer.phoneLabel || "Telephone"}:</span>
                      <a href={`tel:${officer.phone}`} className="hover:text-[#256B29] hover:underline">
                        {officer.phone}
                      </a>
                    </div>
                  )}

                  {officer.mobileWhatsapp && (
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-4 w-4 text-[#256B29] shrink-0" aria-hidden="true" />
                      <span className="font-semibold text-slate-900">{officer.mobileLabel || "Mobile / WhatsApp"}:</span>
                      <a
                        href={`https://wa.me/${officer.mobileWhatsapp.replace(/\+/g, "").replace(/\s/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#256B29] hover:underline"
                      >
                        {officer.mobileWhatsapp}
                      </a>
                    </div>
                  )}

                  {officer.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-[#256B29] shrink-0" aria-hidden="true" />
                      <span className="font-semibold text-slate-900">{officer.emailLabel || "Email"}:</span>
                      <a
                        href={`mailto:${officer.email.replace("[at]", "@")}`}
                        className="hover:text-[#256B29] hover:underline truncate"
                      >
                        {officer.email}
                      </a>
                    </div>
                  )}

                  {/* Dynamic Custom Contact Lines */}
                  {officer.customContactLines && officer.customContactLines.length > 0 && (
                    <div className="pt-2 mt-2 border-t border-slate-100 space-y-3">
                      {officer.customContactLines.map((line) => (
                        <div key={line.id} className="flex items-center gap-3">
                          {renderContactIcon(line.icon_type)}
                          <span className="font-semibold text-slate-900">{line.label}:</span>
                          {line.linkUrl && line.linkUrl !== "#" ? (
                            <a
                              href={line.linkUrl}
                              target={line.linkUrl.startsWith("http") ? "_blank" : undefined}
                              rel={line.linkUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                              className="hover:text-[#256B29] hover:underline truncate"
                            >
                              {line.value}
                            </a>
                          ) : (
                            <span className="truncate">{line.value}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {officer.officeAddress && (
                    <div className="flex items-start gap-3 pt-1">
                      <MapPin className="h-4 w-4 text-[#256B29] shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="leading-relaxed">{officer.officeAddress}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyContact(officer)}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 text-xs font-bold text-slate-800 transition hover:bg-slate-100 cursor-pointer ml-auto"
                >
                  {copiedId === officer.id ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-slate-500" />
                      <span>Copy Contact</span>
                    </>
                  )}
                </button>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
