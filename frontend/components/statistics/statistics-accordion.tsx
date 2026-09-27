"use client"

import { useState } from "react"
import {
  TrendingUp,
  Anchor,
  Building2,
  Users,
  ArrowLeftRight,
  PackageCheck,
  Activity,
  ChevronDown,
  LucideIcon,
  BarChart3,
  Ship,
  DollarSign,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { statisticsSections as fallbackSections } from "@/data/fisheries-statistics"
import type { ApiStatisticsHeader, ApiStatisticsSection } from "@/lib/api/fisheries-statistics"

const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  Anchor,
  Building2,
  Users,
  ArrowLeftRight,
  PackageCheck,
  Activity,
  BarChart3,
  Ship,
  DollarSign,
}

interface StatisticsAccordionProps {
  header?: ApiStatisticsHeader
  sections?: ApiStatisticsSection[]
}

export function StatisticsAccordion({ header, sections }: StatisticsAccordionProps) {
  const displaySections = sections !== undefined && sections !== null ? sections : (fallbackSections as unknown as ApiStatisticsSection[])

  // Fishing Fleet section open by default, or section configured with is_default_open
  const defaultOpenSlug = displaySections.find((s) => s.is_default_open)?.slug || "fishing-fleet"
  const [openId, setOpenId] = useState<string | null>(defaultOpenSlug)

  const toggleSection = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  const badgeText = header?.badge_text || `${displaySections.length} Statistical Categories`
  const sectionTitle = header?.title || "Sectoral Performance & Operating Figures"
  const sectionDesc = header?.description || "Select any statistical category below to view detailed breakdown tables, vessel counts, and official sector indicators."

  return (
    <section className="py-14 sm:py-16 bg-white" aria-label="Fisheries Statistics Directory">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-8 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-[#256B29] border border-emerald-300">
              <BarChart3 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{badgeText}</span>
            </div>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-950 tracking-tight sm:text-3xl">
              {sectionTitle}
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-slate-700 max-w-3xl leading-relaxed font-normal">
              {sectionDesc}
            </p>
          </div>
        </div>

        {/* Accordion Stack */}
        <div className="space-y-4">
          {displaySections.map((section) => {
            const Icon = iconMap[section.icon_name] || TrendingUp
            const isOpen = openId === section.slug
            const headerId = `statistics-header-${section.slug}`
            const contentId = `statistics-content-${section.slug}`
            const rows = section.rows || []

            return (
              <div
                key={section.id || section.slug}
                className={`rounded-2xl border transition-all duration-200 bg-white overflow-hidden ${
                  isOpen
                    ? "border-[#256B29] ring-2 ring-emerald-600/20 shadow-md bg-gradient-to-br from-emerald-50/40 via-white to-slate-50/60"
                    : "border-slate-300 hover:border-slate-400 shadow-2xs hover:shadow-xs"
                }`}
              >
                {/* Accordion Header Button */}
                <button
                  type="button"
                  id={headerId}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleSection(section.slug)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#256B29] focus-visible:ring-2 focus-visible:ring-emerald-500/20 min-h-[44px] select-none"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ${
                        isOpen
                          ? "bg-[#256B29] text-white shadow-xs"
                          : "bg-emerald-100 text-[#256B29] group-hover:bg-emerald-200"
                      }`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>

                    <div className="min-w-0">
                      <h3
                        className={`text-base sm:text-lg font-extrabold transition-colors duration-200 ${
                          isOpen ? "text-[#256B29]" : "text-slate-950"
                        }`}
                      >
                        {section.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-slate-600 font-semibold truncate hidden sm:block">
                        {rows.length} statistical records • Official Data
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 ${
                      isOpen
                        ? "border-emerald-300 bg-emerald-100 text-[#256B29] rotate-180"
                        : "border-slate-300 bg-slate-100 text-slate-700"
                    }`}
                  >
                    <ChevronDown className="h-5 w-5" aria-hidden="true" />
                  </div>
                </button>

                {/* Expanded Panel */}
                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    className="px-5 pb-6 pt-2 sm:px-6 sm:pb-7 border-t border-slate-300"
                  >
                    {section.description && (
                      <p className="text-xs sm:text-sm text-slate-700 mb-4 leading-relaxed font-medium">
                        {section.description}
                      </p>
                    )}

                    {/* Responsive High-Visibility Data Table */}
                    <div className="overflow-x-auto rounded-xl border border-slate-300 bg-white shadow-sm">
                      <table className="w-full text-left text-xs sm:text-sm text-slate-900 border-collapse">
                        <caption className="sr-only">{section.caption || section.title}</caption>
                        <thead className="bg-slate-900 border-b-2 border-slate-950 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white">
                          <tr>
                            <th scope="col" className="py-3.5 px-4 sm:px-6">
                              Category / Description
                            </th>
                            <th scope="col" className="py-3.5 px-4 sm:px-6 text-right">
                              Value / Quantity
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 font-medium">
                          {rows.map((row, idx) => {
                            const isEmphasized = Boolean(row.emphasized)

                            return (
                              <tr
                                key={row.id || idx}
                                className={`transition-colors ${
                                  isEmphasized
                                    ? "bg-emerald-100/90 border-t-2 border-b-2 border-emerald-400 font-extrabold text-slate-950 hover:bg-emerald-100"
                                    : idx % 2 === 0
                                    ? "bg-white hover:bg-emerald-50/60"
                                    : "bg-slate-100/75 hover:bg-emerald-50/60"
                                }`}
                              >
                                <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-900">
                                  <span>{row.label}</span>
                                </td>
                                <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap font-mono text-sm sm:text-base font-bold">
                                  <span
                                    className={
                                      isEmphasized
                                        ? "text-[#1b4d1d] font-black text-base sm:text-lg"
                                        : "text-slate-950"
                                    }
                                  >
                                    {row.value}
                                  </span>
                                  {row.unit && (
                                    <span
                                      className={`ml-2 text-xs px-2 py-0.5 rounded-md font-sans font-semibold inline-block ${
                                        isEmphasized
                                          ? "bg-emerald-200/90 text-emerald-950 border border-emerald-300"
                                          : "bg-slate-200/80 text-slate-800 border border-slate-300"
                                      }`}
                                    >
                                      {row.unit}
                                    </span>
                                  )}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-xs text-slate-600 font-semibold">
                      <span>{section.caption}</span>
                      <span className="text-slate-500">Source: Ministry Fisheries Statistics</span>
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
