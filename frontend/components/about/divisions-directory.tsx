"use client"

import { useState } from "react"
import {
  UsersRound,
  Landmark,
  ClipboardCheck,
  Wrench,
  TrendingUp,
  ShieldCheck,
  HardHat,
  ChartNoAxesCombined,
  ChevronDown,
  Building2,
  LucideIcon,
  Phone,
  Mail,
  CheckCircle2,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { divisions as defaultDivisions } from "@/data/divisions"
import type { ApiDivisionsPageIntro, ApiMinistryDivision } from "@/lib/api/divisions"

const iconMap: Record<string, LucideIcon> = {
  UsersRound,
  Landmark,
  ClipboardCheck,
  Wrench,
  TrendingUp,
  ShieldCheck,
  HardHat,
  ChartNoAxesCombined,
  Building2,
}

interface DivisionsDirectoryProps {
  initialIntro?: ApiDivisionsPageIntro | null
  initialDivisions?: ApiMinistryDivision[] | null
}

export function DivisionsDirectory({ initialIntro, initialDivisions }: DivisionsDirectoryProps) {
  const hasApiDivisions = Boolean(initialDivisions && initialDivisions.length > 0)

  // Use API divisions if present, otherwise fallback to static data
  const divisionList = hasApiDivisions
    ? (initialDivisions as ApiMinistryDivision[]).map((d) => ({
        id: d.slug || String(d.id),
        title: d.title,
        iconName: d.icon_name || "Building2",
        shortDescription: d.short_description,
        fullDescription: d.full_description_paragraphs && d.full_description_paragraphs.length > 0
          ? d.full_description_paragraphs
          : d.full_description ? [d.full_description] : [],
        bulletPoints: d.bullet_points_list && d.bullet_points_list.length > 0
          ? d.bullet_points_list
          : d.bullet_points ? d.bullet_points.split("\n").filter(Boolean) : [],
        headOfDivision: d.head_of_division,
        contactEmail: d.contact_email,
        contactPhone: d.contact_phone,
      }))
    : defaultDivisions.map((d) => ({
        id: d.id,
        title: d.title,
        iconName: d.iconName || "Building2",
        shortDescription: d.shortDescription,
        fullDescription: d.fullDescription || [],
        bulletPoints: d.bulletPoints || [],
        headOfDivision: undefined,
        contactEmail: undefined,
        contactPhone: undefined,
      }))

  const [openId, setOpenId] = useState<string | number | null>(
    divisionList.length > 0 ? divisionList[0].id : "administration"
  )

  const toggleDivision = (id: string | number) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  const badgeText = initialIntro?.badge_text || `${divisionList.length} Divisions`
  const headerTitle = initialIntro?.title || "Divisions supporting Ministry operations"
  const headerDescription =
    initialIntro?.description ||
    "Select a division to learn more about its responsibilities and contribution to the work of the Ministry."

  return (
    <section className="py-14 sm:py-16 bg-slate-50 border-b border-slate-200" aria-label="Ministry Divisions Directory">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-8 border-b border-slate-200/80">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-3.5 py-1 text-xs font-extrabold text-[#256B29] shadow-2xs">
              <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{badgeText}</span>
            </div>
            <h2 className="mt-2.5 text-2xl font-extrabold text-slate-900 tracking-tight sm:text-3xl">
              {headerTitle}
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
              {headerDescription}
            </p>
          </div>
        </div>

        {/* Divisions Cards Grid (Balanced Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-start">
          {divisionList.map((division) => {
            const Icon = iconMap[division.iconName] || Building2
            const isOpen = openId === division.id

            return (
              <div
                key={division.id}
                className={`group rounded-2xl border transition-all duration-200 bg-white overflow-hidden flex flex-col justify-between ${
                  isOpen
                    ? "border-[#388E3C] ring-1 ring-[#388E3C]/30 shadow-md bg-gradient-to-br from-emerald-50/40 via-white to-slate-50/50"
                    : "border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-xs"
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  onClick={() => toggleDivision(division.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-start gap-4 cursor-pointer min-h-[52px] select-none"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ${
                      isOpen
                        ? "bg-[#388E3C] text-white shadow-xs"
                        : "bg-emerald-50 text-[#388E3C] group-hover:bg-emerald-100/80"
                    }`}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>

                  <div className="flex-1 min-w-0 pr-2">
                    <h3
                      className={`text-base sm:text-lg font-bold transition-colors duration-200 leading-snug ${
                        isOpen ? "text-[#256B29]" : "text-slate-900 group-hover:text-[#388E3C]"
                      }`}
                    >
                      {division.title}
                    </h3>
                    {division.headOfDivision && (
                      <p className="mt-1 text-xs font-semibold text-[#256B29] truncate">
                        {division.headOfDivision}
                      </p>
                    )}
                    <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {division.shortDescription}
                    </p>
                  </div>

                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-200 mt-0.5 ${
                      isOpen ? "rotate-180 bg-emerald-100 text-[#256B29]" : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" aria-hidden="true" />
                  </div>
                </button>

                {/* Expanded Details Section */}
                {isOpen && (
                  <div className="px-5 pb-6 pt-2 sm:px-6 border-t border-slate-100 space-y-4 animate-in fade-in-50 duration-200">
                    {/* Paragraph descriptions */}
                    {division.fullDescription && division.fullDescription.length > 0 ? (
                      <div className="space-y-3">
                        {division.fullDescription.map((desc, i) => (
                          <p key={i} className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                            {desc}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {division.shortDescription}
                      </p>
                    )}

                    {/* Bullet Points / Key Functions */}
                    {division.bulletPoints && division.bulletPoints.length > 0 && (
                      <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80 space-y-2.5">
                        <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">
                          Key Functions & Responsibilities
                        </p>
                        <ul className="space-y-2">
                          {division.bulletPoints.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                              <CheckCircle2 className="h-3.5 w-3.5 text-[#256B29] shrink-0 mt-0.5" aria-hidden="true" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Contact Details */}
                    {(division.contactEmail || division.contactPhone) && (
                      <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-600 pt-3 border-t border-slate-100">
                        {division.contactEmail && (
                          <a
                            href={`mailto:${division.contactEmail}`}
                            className="inline-flex items-center gap-1.5 text-[#256B29] hover:underline transition-colors"
                          >
                            <Mail className="h-3.5 w-3.5 shrink-0" />
                            <span>{division.contactEmail}</span>
                          </a>
                        )}
                        {division.contactPhone && (
                          <a
                            href={`tel:${division.contactPhone.replace(/\s+/g, "")}`}
                            className="inline-flex items-center gap-1.5 text-[#256B29] hover:underline transition-colors"
                          >
                            <Phone className="h-3.5 w-3.5 shrink-0" />
                            <span>{division.contactPhone}</span>
                          </a>
                        )}
                      </div>
                    )}
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
