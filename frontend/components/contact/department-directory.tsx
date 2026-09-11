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
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { departmentDirectory, type DepartmentContact } from "@/data/contact-data"
import type { ApiContactDepartment, ApiContactOfficer } from "@/lib/api/contact"

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

  const defaultColumns = ["Designation", "Officer Name", "Telephone / Mobile", "Fax", "Email Address", "Room / Location"]

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
                    className="p-5 sm:p-6 border-t border-slate-200/80 bg-slate-50/50"
                  >
                    {dept.location && (
                      <div className="mb-4 flex items-center gap-2 text-xs font-bold text-[#256B29] bg-emerald-50/80 px-3 py-1.5 rounded-lg border border-emerald-100 w-fit">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Office Location: {dept.location}</span>
                      </div>
                    )}

                    {/* Responsive HTML Table */}
                    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
                      <table className="w-full text-left text-xs text-slate-700 border-collapse">
                        <thead>
                          <tr className="bg-slate-100/90 text-slate-600 font-semibold uppercase tracking-wider border-b border-slate-200">
                            {tableColumns.map((colName, cIdx) => (
                              <th key={cIdx} scope="col" className="py-3 px-4 min-w-[140px]">
                                {colName}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-normal">
                          {officers.map((officer) => (
                            <tr
                              key={officer.id}
                              className="hover:bg-emerald-50/40 transition-colors"
                            >
                              {tableColumns.map((colName, cIdx) => {
                                const normCol = colName.trim().toLowerCase()

                                if (normCol.includes("designation")) {
                                  return (
                                    <td key={cIdx} className="py-3.5 px-4 text-slate-800 align-top">
                                      <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-800 border border-slate-200/60">
                                        {officer.designation || "—"}
                                      </span>
                                    </td>
                                  )
                                }

                                if (normCol.includes("name") || normCol.includes("officer")) {
                                  return (
                                    <td key={cIdx} className="py-3.5 px-4 text-slate-900 font-medium align-top">
                                      <div className="flex items-center gap-1.5">
                                        <UserCheck className="h-3.5 w-3.5 text-[#256B29] shrink-0" aria-hidden="true" />
                                        <span>{officer.name || "—"}</span>
                                      </div>
                                    </td>
                                  )
                                }

                                if (normCol.includes("telephone") || normCol.includes("mobile") || normCol.includes("phone")) {
                                  return (
                                    <td key={cIdx} className="py-3.5 px-4 align-top space-y-1">
                                      {officer.telephone ? (
                                        <div className="flex items-center gap-1.5">
                                          <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                                          <a
                                            href={`tel:${officer.telephone.replace(/\s+/g, "")}`}
                                            className="font-medium text-slate-800 hover:text-[#388E3C] transition-colors"
                                          >
                                            {officer.telephone}
                                          </a>
                                          <button
                                            type="button"
                                            onClick={() => copyToClipboard(officer.telephone, `${officer.id}-tel`)}
                                            className="p-1 text-slate-400 hover:text-slate-600 rounded cursor-pointer"
                                            title="Copy phone"
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
                                        <div className="flex items-center gap-1.5 text-slate-600">
                                          <Smartphone className="h-3.5 w-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                                          <a href={`tel:${officer.mobile.replace(/\s+/g, "")}`} className="hover:text-[#388E3C]">
                                            {officer.mobile}
                                          </a>
                                        </div>
                                      ) : null}
                                      {!officer.telephone && !officer.mobile ? (
                                        <span className="text-slate-400">—</span>
                                      ) : null}
                                    </td>
                                  )
                                }

                                if (normCol.includes("fax")) {
                                  return (
                                    <td key={cIdx} className="py-3.5 px-4 text-slate-600 align-top">
                                      {officer.fax ? (
                                        <div className="flex items-center gap-1.5">
                                          <Printer className="h-3.5 w-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                                          <span>{officer.fax}</span>
                                        </div>
                                      ) : (
                                        <span className="text-slate-400">—</span>
                                      )}
                                    </td>
                                  )
                                }

                                if (normCol.includes("email")) {
                                  return (
                                    <td key={cIdx} className="py-3.5 px-4 align-top">
                                      {officer.email ? (
                                        <div className="flex items-center gap-1.5">
                                          <Mail className="h-3.5 w-3.5 text-[#256B29] shrink-0" aria-hidden="true" />
                                          <a
                                            href={`mailto:${officer.email.replace(/\[at\]/g, "@")}`}
                                            className="font-medium text-[#256B29] hover:underline truncate max-w-[200px]"
                                          >
                                            {officer.email}
                                          </a>
                                          <button
                                            type="button"
                                            onClick={() => copyToClipboard(officer.email, `${officer.id}-email`)}
                                            className="p-1 text-slate-400 hover:text-slate-600 rounded cursor-pointer"
                                            title="Copy email"
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

                                if (normCol.includes("location") || normCol.includes("room")) {
                                  return (
                                    <td key={cIdx} className="py-3.5 px-4 text-slate-700 align-top">
                                      {officer.location ? (
                                        <div className="flex items-center gap-1.5">
                                          <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                                          <span>{officer.location}</span>
                                        </div>
                                      ) : (
                                        <span className="text-slate-400">—</span>
                                      )}
                                    </td>
                                  )
                                }

                                // Dynamic Lookup for Newly Added Custom Columns (Notes1, Notes2, Extension, Specialization, etc.)
                                const extraData = officer.extra_data || {}
                                const extraValue =
                                  extraData[colName] ||
                                  extraData[colName.trim()] ||
                                  extraData[normCol] ||
                                  ("notes" in officer && normCol.includes("note") ? (officer as any).notes : null)

                                return (
                                  <td key={cIdx} className="py-3.5 px-4 text-slate-700 align-top font-normal">
                                    {extraValue ? (
                                      <span>{extraValue}</span>
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
