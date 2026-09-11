"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Building2,
  Calendar,
  ExternalLink,
  FileCheck2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react"

import type { Institution } from "@/data/institutions"

interface InstitutionDetailModalProps {
  institution: Institution | null
  onClose: () => void
}

export function InstitutionDetailModal({
  institution,
  onClose,
}: InstitutionDetailModalProps) {
  if (!institution) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="institution-detail-modal-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 p-4 sm:p-6 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Premium Dark Header Bar with Pure White Title */}
        <div className="flex shrink-0 flex-col gap-3 border-b border-slate-200 px-6 sm:px-8 py-6 bg-[linear-gradient(135deg,#041c22_0%,#093835_55%,#0c4e48_100%)] text-white relative overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-400/10 blur-2xl"
          />

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="rounded-lg bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-xs font-extrabold text-emerald-300 shadow-xs">
                {institution.type}
              </span>
              {institution.shortTitle && (
                <span className="text-xs font-mono font-bold text-slate-300 bg-black/30 px-2.5 py-1 rounded-md border border-white/10">
                  {institution.shortTitle}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:bg-white hover:text-slate-900 transition-colors cursor-pointer"
              aria-label="Close institution preview"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Pure White Institution Title */}
          <div className="relative z-10 mt-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-300 flex items-center gap-1.5 mb-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Statutory Institution Profile
            </span>
            <h3
              id="institution-detail-modal-title"
              className="text-2xl sm:text-3xl font-extrabold !text-white leading-snug tracking-tight"
            >
              {institution.title}
            </h3>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Banner Image Preview */}
          <div className="relative h-56 sm:h-64 w-full overflow-hidden rounded-2xl border border-slate-200 shadow-xs">
            <Image
              src={institution.image}
              alt={institution.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between text-white text-xs font-semibold">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-emerald-400" />
                <span>{institution.title}</span>
              </div>
              {institution.established && (
                <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-md">
                  <Calendar className="h-3.5 w-3.5 text-emerald-300" />
                  <span>Est. {institution.established}</span>
                </div>
              )}
            </div>
          </div>

          {/* Statutory Mandate Card */}
          {institution.actOrMandate && (
            <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/70 p-4 sm:p-5 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#256B29] text-white shadow-2xs">
                <FileCheck2 className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#256B29]">
                  Statutory Legislation & Mandate
                </span>
                <p className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">
                  {institution.actOrMandate}
                </p>
              </div>
            </div>
          )}

          {/* Overview Text Paragraphs - Justified Text */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-[#256B29]" />
              <span>Institutional Overview</span>
            </h4>

            {institution.detailedOverview && institution.detailedOverview.length > 0 ? (
              institution.detailedOverview.map((paragraph, i) => (
                <p key={i} className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify font-normal">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify font-normal">
                {institution.description}
              </p>
            )}
          </div>

          {/* Key Responsibilities */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Building2 className="h-4 w-4 text-[#256B29]" />
              <span>Key Statutory Responsibilities</span>
            </h4>

            <div className="grid gap-2 sm:grid-cols-2">
              {institution.responsibilities.map((resp, idx) => (
                <div key={idx} className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50/60 p-3 text-xs text-slate-700">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#256B29] shrink-0" />
                  <span className="font-semibold text-slate-800">{resp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Divisions & Directorates (if available) */}
          {institution.coreDivisions && institution.coreDivisions.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                Core Directorates & Operational Units
              </h4>
              <ul className="grid gap-2 sm:grid-cols-2">
                {institution.coreDivisions.map((div, idx) => (
                  <li key={idx} className="flex items-center gap-2 rounded-lg bg-slate-100/80 px-3 py-2 text-xs font-medium text-slate-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>{div}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* HQ Location & Contact Info Box */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#256B29]" />
              <span>Headquarters & Contact Details</span>
            </h4>

            <div className="grid gap-3 text-xs text-slate-600 sm:grid-cols-3">
              {institution.location && (
                <div className="space-y-1">
                  <span className="font-bold text-slate-800 block">Address:</span>
                  <span>{institution.location}</span>
                </div>
              )}
              {institution.contactPhone && (
                <div className="space-y-1">
                  <span className="font-bold text-slate-800 block">Telephone:</span>
                  <a href={`tel:${institution.contactPhone}`} className="text-[#256B29] font-bold hover:underline">
                    {institution.contactPhone}
                  </a>
                </div>
              )}
              {institution.contactEmail && (
                <div className="space-y-1">
                  <span className="font-bold text-slate-800 block">Email:</span>
                  <a href={`mailto:${institution.contactEmail}`} className="text-[#256B29] font-bold hover:underline">
                    {institution.contactEmail}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-200 px-6 py-4 bg-slate-50">
          <div className="flex items-center gap-2">
            {institution.website ? (
              <a
                href={institution.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center gap-2 rounded-xl bg-[#256B29] px-5 text-xs font-extrabold text-white hover:bg-[#1b4d1d] transition shadow-2xs"
              >
                <span>Visit Official Website</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : (
              <Link
                href="/contact"
                className="inline-flex min-h-[40px] items-center gap-2 rounded-xl bg-[#256B29] px-5 text-xs font-extrabold text-white hover:bg-[#1b4d1d] transition shadow-2xs"
              >
                <span>Contact Ministry Desk</span>
              </Link>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <span>Close Preview Window</span>
          </button>
        </div>
      </div>
    </div>
  )
}
