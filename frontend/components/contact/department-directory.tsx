"use client"

import { useState } from "react"
import {
  Building2,
  ChevronDown,
  Phone,
  Printer,
  Mail,
  MapPin,
  Copy,
  Check,
  Smartphone,
  UserCheck,
  ArrowRightLeft,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { departmentDirectory, type DepartmentContact } from "@/data/contact-data"
import type { ApiContactDepartment, ApiContactOfficer } from "@/lib/api/contact"
import { useLanguage } from "@/src/contexts/LanguageContext"

interface DepartmentDirectoryProps {
  departments?: ApiContactDepartment[] | DepartmentContact[]
  badge?: string
  title?: string
  subtitle?: string
}

export function DepartmentDirectory({
  departments: propDepartments,
  badge,
  title = "Departmental & Division Contacts",
  subtitle = "Access direct telephone numbers, extensions, location details, and officer emails for each division and affiliated department.",
}: DepartmentDirectoryProps) {
  const { language } = useLanguage()

  const displayDepartments = (propDepartments && propDepartments.length > 0
    ? propDepartments
    : departmentDirectory) as Array<ApiContactDepartment | DepartmentContact>

  // Single expanded category state
  const [openDeptId, setOpenDeptId] = useState<string | number | null>(
    displayDepartments[0]?.id || "sec-exec"
  )
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const toggleDepartment = (id: string | number) => {
    setOpenDeptId((prev) => (prev === id ? null : id))
  }

  const copyToClipboard = (text: string, id: string) => {
    const cleanText = text.replace(/\[at\]/g, "@")
    navigator.clipboard.writeText(cleanText)
    setCopiedItem(id)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  const defaultColumns = [
    "Designation",
    "Officer Name",
    "Telephone",
    "Mobile",
    "Fax",
    "Email Address",
    "Room / Location",
  ]

  const COLUMN_TRANSLATIONS: Record<string, { en: string; si: string; ta: string }> = {
    "designation": { en: "Designation", si: "තනතුර", ta: "பதவி" },
    "officer name": { en: "Officer Name", si: "නිලධාරියාගේ නම", ta: "அதிகாரியின் பெயர்" },
    "name": { en: "Name", si: "නම", ta: "பெயர்" },
    "telephone": { en: "Telephone", si: "ස්ථාවර දුරකථන", ta: "தொலைபேசி" },
    "mobile": { en: "Mobile", si: "ජංගම දුරකථන", ta: "கைபேசி" },
    "telephone / mobile": { en: "Telephone / Mobile", si: "දුරකථන / ජංගම", ta: "தொலைபேசி / கைபேசி" },
    "telephone/mobile": { en: "Telephone / Mobile", si: "දුරකථන / ජංගම", ta: "தொலைபேசி / கைபேසි" },
    "phone": { en: "Telephone", si: "දුරකථන", ta: "தொலைபேසි" },
    "fax": { en: "Fax", si: "ෆැක්ස්", ta: "தொலைநகல்" },
    "email": { en: "Email", si: "විද්‍යුත් තැපෑල", ta: "மின்னஞ்சல்" },
    "email address": { en: "Email Address", si: "විද්‍යුත් තැපැල් ලිපිනය", ta: "மின்னஞ்சல் முகவரி" },
    "room / location": { en: "Room / Location", si: "කාමරය / ස්ථානය", ta: "அறை / இடம்" },
    "location": { en: "Location", si: "ස්ථානය", ta: "இடம்" },
    "room": { en: "Room", si: "කාමරය", ta: "அறை" },
    "notes": { en: "Notes", si: "සටහන්", ta: "குறிப்புகள்" },
  }

  type ColumnType =
    | "designation"
    | "officer_name"
    | "combined_phone"
    | "telephone"
    | "mobile"
    | "fax"
    | "email"
    | "location"
    | "notes"
    | "custom"

  const detectColumnType = (colName: string): ColumnType => {
    const norm = colName.trim().toLowerCase()

    // 1. Designation
    if (
      norm.includes("designation") ||
      norm.includes("තනතුර") ||
      norm.includes("පදවි") ||
      norm.includes("பதவி") ||
      norm === "post" ||
      norm === "title"
    ) {
      return "designation"
    }

    // 2. Officer Name
    if (
      norm.includes("officer") ||
      norm.includes("name") ||
      norm.includes("නම") ||
      norm.includes("නිලධාරී") ||
      norm.includes("பெயர்") ||
      norm.includes("அதிகாரி")
    ) {
      return "officer_name"
    }

    // 3. Combined Telephone & Mobile (ONLY if there is a separator like '/', '&', 'සහ', 'and' or an explicit dual title)
    const isDualWithSeparator =
      (norm.includes("/") ||
        norm.includes("&") ||
        norm.includes(" සහ ") ||
        norm.includes(" and ") ||
        norm.includes(" හෝ ")) &&
      (norm.includes("tel") ||
        norm.includes("phone") ||
        norm.includes("ස්ථාවර") ||
        norm.includes("දුරකථන") ||
        norm.includes("தொலைபேசி")) &&
      (norm.includes("mob") ||
        norm.includes("cell") ||
        norm.includes("ජංගම") ||
        norm.includes("கைபேசி"))

    const isExplicitCombined =
      norm === "telephone / mobile" ||
      norm === "telephone/mobile" ||
      norm === "phone / mobile" ||
      norm === "phone/mobile" ||
      norm === "tel / mob" ||
      norm === "tel/mob" ||
      norm === "දුරකථන / ජංගම" ||
      norm === "ස්ථාවර / ජංගම" ||
      norm === "ස්ථාවර / ජංගම දුරකථන" ||
      norm === "தொலைபேசி / கைபேசி"

    if (isDualWithSeparator || isExplicitCombined) {
      return "combined_phone"
    }

    // 4. Mobile ONLY
    if (
      norm.includes("mobile") ||
      norm.includes("cell") ||
      norm.includes("ජංගම") ||
      norm.includes("கைபேசி") ||
      norm === "mob"
    ) {
      return "mobile"
    }

    // 5. Telephone / Landline ONLY
    if (
      norm.includes("telephone") ||
      norm.includes("phone") ||
      norm.includes("tel") ||
      norm.includes("landline") ||
      norm.includes("දුරකථන") ||
      norm.includes("ස්ථාවර") ||
      norm.includes("தொலைபேசி")
    ) {
      return "telephone"
    }

    // 6. Fax
    if (
      norm.includes("fax") ||
      norm.includes("ෆැක්ස්") ||
      norm.includes("தொலைநகல்")
    ) {
      return "fax"
    }

    // 7. Email
    if (
      norm.includes("email") ||
      norm.includes("mail") ||
      norm.includes("විද්‍යුත්") ||
      norm.includes("ඊමේල්") ||
      norm.includes("மின்னஞ்சல்")
    ) {
      return "email"
    }

    // 8. Location / Room
    if (
      norm.includes("location") ||
      norm.includes("room") ||
      norm.includes("floor") ||
      norm.includes("ස්ථානය") ||
      norm.includes("කාමරය") ||
      norm.includes("මහල") ||
      norm.includes("இடம்") ||
      norm.includes("அறை")
    ) {
      return "location"
    }

    // 9. Notes / Remarks
    if (
      norm.includes("note") ||
      norm.includes("remark") ||
      norm.includes("සටහන්") ||
      norm.includes("විශේෂ") ||
      norm.includes("குறிப்பு")
    ) {
      return "notes"
    }

    return "custom"
  }

  const getColumnDisplayName = (colName: string, lang: string): string => {
    const norm = colName.trim().toLowerCase()
    const langKey = (lang === "si" || lang === "ta") ? lang : "en"
    if (COLUMN_TRANSLATIONS[norm] && COLUMN_TRANSLATIONS[norm][langKey]) {
      return COLUMN_TRANSLATIONS[norm][langKey]
    }
    return colName
  }

  const getColumnWidthClass = (colType: ColumnType) => {
    switch (colType) {
      case "designation":
        return "min-w-[220px] max-w-[320px]"
      case "officer_name":
        return "min-w-[200px] max-w-[280px]"
      case "combined_phone":
        return "min-w-[200px]"
      case "telephone":
        return "min-w-[170px]"
      case "mobile":
        return "min-w-[170px]"
      case "fax":
        return "min-w-[140px]"
      case "email":
        return "min-w-[240px]"
      case "location":
        return "min-w-[170px]"
      case "notes":
        return "min-w-[180px]"
      default:
        return "min-w-[160px]"
    }
  }

  const scrollHints = {
    en: "Scroll horizontally to view all columns →",
    si: "සම්පූර්ණ තොරතුරු බැලීමට තිරස් අතට අනුචලනය කරන්න →",
    ta: "முழு தகவலையும் காண கிடைமட்டமாக உருட்டவும் →",
  }

  return (
    <section id="department-directory" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200" aria-label="Department Contact Directory">
      <Container>
        {/* Section Header */}
        <div className="mb-8 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-[#256B29] border border-emerald-200">
            <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{badge || "Primary Contact Directory"}</span>
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Expandable Department Cards */}
        <div className="space-y-5">
          {displayDepartments.map((dept) => {
            const isOpen = openDeptId === dept.id
            const headerId = `dept-header-${dept.id}`
            const contentId = `dept-content-${dept.id}`
            const tableColumns = ("custom_columns" in dept && dept.custom_columns && dept.custom_columns.length > 0)
              ? dept.custom_columns
              : defaultColumns

            const officers = dept.officers || []

            return (
              <div
                key={dept.id}
                className={`rounded-2xl overflow-hidden transition-all duration-200 ${
                  isOpen
                    ? "border border-slate-300 bg-white shadow-md"
                    : "border border-slate-300/90 bg-white shadow-xs hover:shadow-md hover:border-emerald-500 border-l-4 border-l-[#256B29]"
                }`}
              >
                {/* Header Toggle */}
                <button
                  type="button"
                  id={headerId}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleDepartment(dept.id)}
                  className={`w-full text-left p-5 sm:p-6 transition-all flex items-center justify-between gap-4 cursor-pointer select-none ${
                    isOpen
                      ? "bg-gradient-to-r from-[#0B3D3A] via-[#123F36] to-[#0A2E2B] text-white"
                      : "bg-slate-50/80 hover:bg-emerald-50/50 text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-bold text-sm ${
                        isOpen
                          ? "bg-white/15 text-white border border-white/20"
                          : "bg-emerald-100 text-[#256B29] border border-emerald-200"
                      }`}
                    >
                      <Building2 className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3
                        className={`text-base sm:text-lg font-bold tracking-tight ${
                          isOpen ? "!text-white" : "text-slate-900"
                        }`}
                        style={isOpen ? { color: "#ffffff" } : undefined}
                      >
                        {dept.name}
                      </h3>
                      <p
                        className={`text-xs mt-0.5 line-clamp-1 ${
                          isOpen ? "text-emerald-100/80" : "text-slate-600 font-medium"
                        }`}
                      >
                        {dept.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`hidden sm:inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        isOpen
                          ? "bg-white/15 text-white border border-white/20"
                          : "bg-emerald-100/90 text-[#256B29] border border-emerald-200"
                      }`}
                      style={isOpen ? { color: "#ffffff" } : undefined}
                    >
                      {officers.length} {officers.length === 1 ? "Officer" : "Officers"}
                    </span>

                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 ${
                        isOpen
                          ? "rotate-180 bg-white/25 text-white"
                          : "bg-white text-[#256B29] border border-emerald-200 shadow-2xs hover:bg-emerald-100"
                      }`}
                    >
                      <ChevronDown
                        className="h-4 w-4"
                        aria-hidden="true"
                        style={isOpen ? { color: "#ffffff" } : undefined}
                      />
                    </div>
                  </div>
                </button>

                {/* Expanded Content: Official Contact Table */}
                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    className="p-4 sm:p-6 border-t border-slate-200/80 bg-slate-50/50"
                  >
                    {/* Header info bar above table */}
                    <div className="mb-3 flex items-center justify-between gap-2 px-1 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-2 font-bold text-slate-700">
                        <span className="h-2 w-2 rounded-full bg-emerald-600"></span>
                        <span>{officers.length} {officers.length === 1 ? "Official Contact" : "Official Contacts"}</span>
                      </span>
                      <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-md shadow-2xs font-semibold">
                        <ArrowRightLeft className="h-3 w-3 text-slate-400" />
                        <span>{scrollHints[language] || scrollHints.en}</span>
                      </span>
                    </div>

                    {/* Responsive HTML Table */}
                    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
                      <table className="min-w-full w-max text-left text-xs text-slate-700 border-collapse divide-y divide-slate-200">
                        <thead>
                          <tr className="bg-slate-100/95 text-slate-700 font-bold uppercase tracking-wider">
                            {tableColumns.map((colName, cIdx) => {
                              const colType = detectColumnType(colName)
                              const widthClass = getColumnWidthClass(colType)
                              const displayName = getColumnDisplayName(colName, language)
                              return (
                                <th
                                  key={cIdx}
                                  scope="col"
                                  className={`py-3.5 px-4 text-xs font-bold text-slate-800 ${widthClass}`}
                                >
                                  {displayName}
                                </th>
                              )
                            })}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-normal">
                          {officers.map((officer) => (
                            <tr
                              key={officer.id}
                              className="hover:bg-emerald-50/40 transition-colors"
                            >
                              {tableColumns.map((colName, cIdx) => {
                                const colType = detectColumnType(colName)
                                const widthClass = getColumnWidthClass(colType)

                                // 1. Designation
                                if (colType === "designation") {
                                  return (
                                    <td key={cIdx} className={`py-4 px-4 align-top text-slate-800 ${widthClass}`}>
                                      <span className="inline-block rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-800 border border-slate-200/80 leading-snug break-words">
                                        {officer.designation || "—"}
                                      </span>
                                    </td>
                                  )
                                }

                                // 2. Officer Name
                                if (colType === "officer_name") {
                                  return (
                                    <td key={cIdx} className={`py-4 px-4 align-top text-slate-900 ${widthClass}`}>
                                      <div className="flex items-start gap-2">
                                        <UserCheck className="h-4 w-4 text-[#256B29] shrink-0 mt-0.5" aria-hidden="true" />
                                        <span className="font-semibold text-slate-900 text-xs sm:text-[13px] leading-snug break-words">
                                          {officer.name || "—"}
                                        </span>
                                      </div>
                                    </td>
                                  )
                                }

                                // 3. Telephone ONLY
                                if (colType === "telephone") {
                                  return (
                                    <td key={cIdx} className={`py-4 px-4 align-top ${widthClass}`}>
                                      {officer.telephone ? (
                                        <div className="flex items-center gap-1.5 whitespace-nowrap">
                                          <Phone className="h-3.5 w-3.5 text-[#256B29] shrink-0" aria-hidden="true" />
                                          <a
                                            href={`tel:${officer.telephone.replace(/\s+/g, "")}`}
                                            className="font-semibold text-slate-800 hover:text-[#256B29] transition-colors"
                                          >
                                            {officer.telephone}
                                          </a>
                                          <button
                                            type="button"
                                            onClick={() => copyToClipboard(officer.telephone, `${officer.id}-tel`)}
                                            className="p-1 text-slate-400 hover:text-slate-600 rounded cursor-pointer transition-colors"
                                            title="Copy telephone"
                                            aria-label="Copy telephone"
                                          >
                                            {copiedItem === `${officer.id}-tel` ? (
                                              <Check className="h-3 w-3 text-emerald-600" aria-hidden="true" />
                                            ) : (
                                              <Copy className="h-3 w-3" aria-hidden="true" />
                                            )}
                                          </button>
                                        </div>
                                      ) : (
                                        <span className="text-slate-400">—</span>
                                      )}
                                    </td>
                                  )
                                }

                                // 4. Mobile ONLY
                                if (colType === "mobile") {
                                  return (
                                    <td key={cIdx} className={`py-4 px-4 align-top ${widthClass}`}>
                                      {officer.mobile ? (
                                        <div className="flex items-center gap-1.5 whitespace-nowrap">
                                          <Smartphone className="h-3.5 w-3.5 text-[#256B29] shrink-0" aria-hidden="true" />
                                          <a
                                            href={`tel:${officer.mobile.replace(/\s+/g, "")}`}
                                            className="font-semibold text-slate-800 hover:text-[#256B29] transition-colors"
                                          >
                                            {officer.mobile}
                                          </a>
                                          <button
                                            type="button"
                                            onClick={() => copyToClipboard(officer.mobile || "", `${officer.id}-mob`)}
                                            className="p-1 text-slate-400 hover:text-slate-600 rounded cursor-pointer transition-colors"
                                            title="Copy mobile"
                                            aria-label="Copy mobile"
                                          >
                                            {copiedItem === `${officer.id}-mob` ? (
                                              <Check className="h-3 w-3 text-emerald-600" aria-hidden="true" />
                                            ) : (
                                              <Copy className="h-3 w-3" aria-hidden="true" />
                                            )}
                                          </button>
                                        </div>
                                      ) : (
                                        <span className="text-slate-400">—</span>
                                      )}
                                    </td>
                                  )
                                }

                                // 5. Combined Telephone & Mobile
                                if (colType === "combined_phone") {
                                  return (
                                    <td key={cIdx} className={`py-4 px-4 align-top space-y-1.5 ${widthClass}`}>
                                      {officer.telephone ? (
                                        <div className="flex items-center gap-1.5 whitespace-nowrap">
                                          <Phone className="h-3.5 w-3.5 text-[#256B29] shrink-0" aria-hidden="true" />
                                          <a
                                            href={`tel:${officer.telephone.replace(/\s+/g, "")}`}
                                            className="font-semibold text-slate-800 hover:text-[#256B29] transition-colors"
                                          >
                                            {officer.telephone}
                                          </a>
                                          <button
                                            type="button"
                                            onClick={() => copyToClipboard(officer.telephone, `${officer.id}-tel`)}
                                            className="p-1 text-slate-400 hover:text-slate-600 rounded cursor-pointer transition-colors"
                                            title="Copy phone"
                                            aria-label="Copy phone"
                                          >
                                            {copiedItem === `${officer.id}-tel` ? (
                                              <Check className="h-3 w-3 text-emerald-600" aria-hidden="true" />
                                            ) : (
                                              <Copy className="h-3 w-3" aria-hidden="true" />
                                            )}
                                          </button>
                                        </div>
                                      ) : null}
                                      {officer.mobile ? (
                                        <div className="flex items-center gap-1.5 whitespace-nowrap text-slate-600">
                                          <Smartphone className="h-3.5 w-3.5 text-[#256B29] shrink-0" aria-hidden="true" />
                                          <a
                                            href={`tel:${officer.mobile.replace(/\s+/g, "")}`}
                                            className="font-medium text-slate-800 hover:text-[#256B29] transition-colors"
                                          >
                                            {officer.mobile}
                                          </a>
                                          <button
                                            type="button"
                                            onClick={() => copyToClipboard(officer.mobile || "", `${officer.id}-mob`)}
                                            className="p-1 text-slate-400 hover:text-slate-600 rounded cursor-pointer transition-colors"
                                            title="Copy mobile"
                                            aria-label="Copy mobile"
                                          >
                                            {copiedItem === `${officer.id}-mob` ? (
                                              <Check className="h-3 w-3 text-emerald-600" aria-hidden="true" />
                                            ) : (
                                              <Copy className="h-3 w-3" aria-hidden="true" />
                                            )}
                                          </button>
                                        </div>
                                      ) : null}
                                      {!officer.telephone && !officer.mobile ? (
                                        <span className="text-slate-400">—</span>
                                      ) : null}
                                    </td>
                                  )
                                }

                                // 6. Fax
                                if (colType === "fax") {
                                  return (
                                    <td key={cIdx} className={`py-4 px-4 text-slate-600 align-top ${widthClass}`}>
                                      {officer.fax ? (
                                        <div className="flex items-center gap-1.5 whitespace-nowrap">
                                          <Printer className="h-3.5 w-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                                          <span className="font-medium text-slate-700">{officer.fax}</span>
                                        </div>
                                      ) : (
                                        <span className="text-slate-400">—</span>
                                      )}
                                    </td>
                                  )
                                }

                                // 7. Email
                                if (colType === "email") {
                                  return (
                                    <td key={cIdx} className={`py-4 px-4 align-top ${widthClass}`}>
                                      {officer.email ? (
                                        <div className="flex items-center gap-1.5">
                                          <Mail className="h-3.5 w-3.5 text-[#256B29] shrink-0" aria-hidden="true" />
                                          <a
                                            href={`mailto:${officer.email.replace(/\[at\]/g, "@")}`}
                                            className="font-semibold text-[#256B29] hover:underline break-all"
                                          >
                                            {officer.email}
                                          </a>
                                          <button
                                            type="button"
                                            onClick={() => copyToClipboard(officer.email, `${officer.id}-email`)}
                                            className="p-1 text-slate-400 hover:text-slate-600 rounded cursor-pointer shrink-0"
                                            title="Copy email"
                                            aria-label="Copy email"
                                          >
                                            {copiedItem === `${officer.id}-email` ? (
                                              <Check className="h-3 w-3 text-emerald-600" aria-hidden="true" />
                                            ) : (
                                              <Copy className="h-3 w-3" aria-hidden="true" />
                                            )}
                                          </button>
                                        </div>
                                      ) : (
                                        <span className="text-slate-400">—</span>
                                      )}
                                    </td>
                                  )
                                }

                                // 8. Location / Room
                                if (colType === "location") {
                                  return (
                                    <td key={cIdx} className={`py-4 px-4 text-slate-700 align-top ${widthClass}`}>
                                      {officer.location ? (
                                        <div className="flex items-start gap-1.5">
                                          <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                                          <span className="font-medium leading-relaxed break-words">{officer.location}</span>
                                        </div>
                                      ) : (
                                        <span className="text-slate-400">—</span>
                                      )}
                                    </td>
                                  )
                                }

                                // 9. Notes / Remarks
                                if (colType === "notes") {
                                  const extraData = (officer as any).extra_data || {}
                                  const noteValue =
                                    (officer as any).notes ||
                                    extraData[colName] ||
                                    extraData[colName.trim()] ||
                                    extraData.notes ||
                                    extraData.remarks ||
                                    null

                                  return (
                                    <td key={cIdx} className={`py-4 px-4 text-slate-700 align-top ${widthClass}`}>
                                      {noteValue ? (
                                        <span className="font-medium leading-relaxed break-words">{noteValue}</span>
                                      ) : (
                                        <span className="text-slate-400">—</span>
                                      )}
                                    </td>
                                  )
                                }

                                // 10. Dynamic Lookup for Newly Added Custom Columns (Notes1, Notes2, Extension, Specialization, etc.)
                                const extraData = (officer as any).extra_data || {}
                                const normCol = colName.trim().toLowerCase()
                                const extraValue =
                                  extraData[colName] ||
                                  extraData[colName.trim()] ||
                                  extraData[normCol] ||
                                  (typeof extraData === "object"
                                    ? Object.entries(extraData).find(
                                        ([k]) => k.trim().toLowerCase() === normCol
                                      )?.[1]
                                    : null) ||
                                  null

                                return (
                                  <td key={cIdx} className={`py-4 px-4 text-slate-700 align-top ${widthClass}`}>
                                    {extraValue ? (
                                      <span className="font-medium leading-relaxed break-words">{extraValue}</span>
                                    ) : (
                                      <span className="text-slate-400">—</span>
                                    )}
                                  </td>
                                )
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
