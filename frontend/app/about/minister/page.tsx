import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  Building2,
  Clock,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Container } from "@/components/ui/container"
import { fetchMinisterPageData } from "@/lib/api/minister"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"

import { getServerLanguage } from "@/lib/get-server-language"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata: Metadata = {
  title: "Hon. Ramalingam Chandrasekara - Minister of Fisheries",
  description:
    "Official profile, message and secretariat details of Hon. Ramalingam Chandrasekara, Cabinet Minister of Fisheries, Aquatic and Ocean Resources.",
}

interface HonMinisterPageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function HonMinisterPage({ searchParams }: HonMinisterPageProps) {
  const lang = await getServerLanguage(searchParams)

  const [ministerData, headerFooterData] = await Promise.all([
    fetchMinisterPageData(lang),
    fetchHeaderFooterData(),
  ])

  const profile = ministerData?.profile
  const message = ministerData?.message
  const secretariat = ministerData?.secretariat

  const name = profile?.name || "Hon. Ramalingam Chandrasekara"
  const roleTitle =
    profile?.role_title || "Cabinet Minister of Fisheries, Aquatic and Ocean Resources"
  const badge = profile?.badge || "Cabinet Minister"
  const photo = profile?.photo_url || "/images/leadership/minister.jpg"
  const photoAlt = profile?.photo_alt || `Official portrait of ${name}`

  const msgEyebrow = message?.eyebrow || "Minister's Official Message"
  const msgTitle =
    message?.message_title || "Transforming Sri Lanka's Fisheries & Blue Economy"
  const msgContent =
    message?.message_content ||
    "Our commitment is to drive science-based marine conservation, empower coastal fishing communities, maximize inland aquaculture production, and expand seafood export earnings while safeguarding ocean ecosystems for future generations."
  const quoteAuthor = message?.quote_author || name
  const quoteRole = message?.quote_designation || badge

  const boxTitle = secretariat?.box_title || "Minister's Secretariat Office"
  const boxSubtitle =
    secretariat?.box_subtitle || "Official Contact & Administration Desk"
  const officeHours = secretariat?.office_hours || "8:30 AM – 4:15 PM"
  const officeAddress =
    secretariat?.office_address ||
    "New Secretariat, Maligawatta, Colombo 10, Sri Lanka"
  const officePhone = secretariat?.office_phone || "+94 11 244 6183"
  const officeEmail = secretariat?.office_email || "minister@fisheries.gov.lk"
  const ctaBtnText = secretariat?.cta_contact_button_text || "Contact Secretariat"
  const ctaBtnUrl = secretariat?.cta_contact_button_url || "/contact"
  const secLinkText =
    secretariat?.secondary_link_text || "View Ministry Divisions"
  const secLinkUrl = secretariat?.secondary_link_url || "/about/divisions"

  return (
    <>
      <SiteHeader initialHeader={headerFooterData?.header} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb
          items={[
            { label: "About Us", href: "/about" },
            { label: "Hon. Minister" },
          ]}
        />

        {/* Profile, Official Message & Secretariat Section */}
        <section className="py-12 sm:py-16 bg-white">
          <Container>
            <div className="grid gap-8 lg:grid-cols-12 items-stretch">
              {/* Left Column: Minister Portrait Card (5 cols) */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="group relative h-full min-h-[460px] sm:min-h-[520px] w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 shadow-md">
                  <Image
                    src={photo}
                    alt={photoAlt}
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 text-white">
                    <span className="inline-flex rounded-full bg-[#256B29] px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-white shadow-xs">
                      {badge}
                    </span>
                    <h2 className="mt-2.5 text-2xl sm:text-3xl font-extrabold !text-white tracking-tight">
                      {name}
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-slate-200 leading-snug">
                      {roleTitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Message Section + Office Details Section (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between gap-6">
                {/* 1. Official Message Block */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-[#256B29] to-emerald-800 p-7 sm:p-8 text-white shadow-md">
                  <div
                    aria-hidden="true"
                    className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/10 blur-2xl"
                  />
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-emerald-200">
                    {msgEyebrow}
                  </span>
                  <h3 className="mt-2 text-xl sm:text-2xl font-extrabold !text-white tracking-tight leading-snug">
                    &ldquo;{msgTitle}&rdquo;
                  </h3>
                  <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-emerald-50/95 italic text-justify">
                    &ldquo;{msgContent}&rdquo;
                  </p>
                  <div className="mt-5 pt-3.5 border-t border-white/20 flex items-center justify-between text-xs font-bold text-emerald-100">
                    <span>{quoteAuthor}</span>
                    <span>{quoteRole}</span>
                  </div>
                </div>

                {/* 2. Office Contact & Secretariat Details Card */}
                <div className="rounded-3xl border border-slate-200/90 bg-slate-50/70 p-6 sm:p-7 shadow-xs flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-[#256B29]">
                          <Building2 className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                            {boxTitle}
                          </h3>
                          <p className="text-[11px] text-slate-500 font-medium">
                            {boxSubtitle}
                          </p>
                        </div>
                      </div>
                      <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-[#256B29] bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-lg">
                        <Clock className="h-3 w-3" />
                        {officeHours}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {/* Address */}
                      <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-2xs sm:col-span-3 lg:col-span-1 flex flex-col justify-between">
                        <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800">
                          <MapPin className="h-4 w-4 text-[#256B29] shrink-0" />
                          <span>Office Location</span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-slate-600">
                          {officeAddress}
                        </p>
                      </div>

                      {/* Telephone */}
                      <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-2xs flex flex-col justify-between">
                        <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800">
                          <Phone className="h-4 w-4 text-[#256B29] shrink-0" />
                          <span>Direct Telephone</span>
                        </div>
                        <a
                          href={`tel:${officePhone.replace(/\s+/g, "")}`}
                          className="mt-2 inline-block text-xs font-bold text-[#256B29] hover:underline"
                        >
                          {officePhone}
                        </a>
                      </div>

                      {/* Email */}
                      <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-2xs flex flex-col justify-between">
                        <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800">
                          <Mail className="h-4 w-4 text-[#256B29] shrink-0" />
                          <span>Official Email</span>
                        </div>
                        <a
                          href={`mailto:${officeEmail}`}
                          className="mt-2 inline-block text-xs font-bold text-[#256B29] hover:underline truncate"
                        >
                          {officeEmail}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* CTA actions */}
                  <div className="mt-5 pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
                    <Link
                      href={ctaBtnUrl}
                      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#256B29] px-5 text-xs font-extrabold !text-white shadow-xs transition-all hover:bg-[#1b4d1d] hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                    >
                      <span>{ctaBtnText}</span>
                      <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href={secLinkUrl}
                      className="inline-flex min-h-9 items-center justify-center text-xs font-bold text-[#256B29] transition-colors hover:text-[#1b4d1d] hover:underline"
                    >
                      {secLinkText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}
