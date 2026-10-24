"use client"

import { useEffect, useState, useTransition } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  Cookie,
  Database,
  Eye,
  FileLock2,
  Globe,
  Info,
  Landmark,
  Lock,
  Mail,
  ShieldCheck,
  UserCheck,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { PageHero } from "@/components/ui/page-hero"
import { useLanguage } from "@/src/contexts/LanguageContext"
import { fetchPrivacyPageData, type ApiPrivacyData } from "@/lib/api/privacy"

interface PrivacyContentProps {
  initialData: ApiPrivacyData | null
}

const UI_TEXT = {
  en: {
    onThisPage: "On This Page",
    relatedPoliciesBadge: "Related Policies",
    relatedPoliciesTitle: "Website Policies and Standards",
    termsTitle: "Terms of Use",
    termsDesc: "Read the conditions governing access to and use of this website.",
    termsLink: "Read Terms of Use",
    accessTitle: "Accessibility Statement",
    accessDesc: "Learn about the Ministry's commitment to accessible and inclusive digital services.",
    accessLink: "Read Accessibility Statement",
  },
  si: {
    onThisPage: "මෙම පිටුවේ අන්තර්ගතය",
    relatedPoliciesBadge: "අදාළ ප්‍රතිපත්ති",
    relatedPoliciesTitle: "වෙබ් අඩවි ප්‍රතිපත්ති සහ ප්‍රමිතීන්",
    termsTitle: "භාවිත කොන්දේසි (Terms of Use)",
    termsDesc: "මෙම වෙබ් අඩවියට පිවිසීම සහ භාවිතය පාලනය කරන කොන්දේසි කියවන්න.",
    termsLink: "භාවිත කොන්දේසි කියවන්න",
    accessTitle: "ප්‍රවේශ්‍යතා ප්‍රකාශය (Accessibility)",
    accessDesc: "සියලු දෙනාට ප්‍රවේශ විය හැකි සහ ඇතුළත් ඩිජිටල් සේවාවන් සඳහා අමාත්‍යාංශයේ කැපවීම පිළිබඳව දැනගන්න.",
    accessLink: "ප්‍රවේශ්‍යතා ප්‍රකාශය කියවන්න",
  },
  ta: {
    onThisPage: "இந்தப் பக்கத்தில்",
    relatedPoliciesBadge: "தொடர்புடைய கொள்கைகள்",
    relatedPoliciesTitle: "இணையதளக் கொள்கைகள் மற்றும் தரநிலைகள்",
    termsTitle: "பயன்பாட்டு விதிமுறைகள் (Terms of Use)",
    termsDesc: "இந்த இணையதளத்தை அணுகுவதற்கும் பயன்படுத்துவதற்கும் பொருந்தும் நிபந்தனைகளைப் படிக்கவும்.",
    termsLink: "பயன்பாட்டு விதிமுறைகளைப் படிக்கவும்",
    accessTitle: "அணுகல்தன்மை அறிக்கை (Accessibility)",
    accessDesc: "அனைவரையும் உள்ளடக்கிய டிஜிட்டல் சேவைகளுக்கான அமைச்சின் அர்ப்பணிப்பு பற்றி அறியவும்.",
    accessLink: "அணுகல்தன்மை அறிக்கையைப் படிக்கவும்",
  },
}

export function PrivacyContent({ initialData }: PrivacyContentProps) {
  const { language } = useLanguage()
  const ui = UI_TEXT[language] || UI_TEXT.en

  const [data, setData] = useState<ApiPrivacyData | null>(initialData)
  const [, startTransition] = useTransition()

  // Fetch updated privacy data from backend API whenever language switches
  useEffect(() => {
    let isMounted = true

    async function loadData() {
      const freshData = await fetchPrivacyPageData(language)
      if (isMounted && freshData) {
        startTransition(() => {
          setData(freshData)
        })
      }
    }

    loadData()

    const handleFocus = () => {
      loadData()
    }
    window.addEventListener("focus", handleFocus)

    return () => {
      isMounted = false
      window.removeEventListener("focus", handleFocus)
    }
  }, [language])

  const settings = data?.settings
  const sections = data?.sections || []

  const badgeText = settings?.badge_text || "Data Protection"
  const heroTitle = settings?.hero_title || "Privacy & Data"
  const heroHighlight = settings?.hero_highlight || "Protection Policy"
  const heroDesc = settings?.hero_description || "The Ministry is committed to protecting personal information, maintaining public trust, and safeguarding privacy when delivering digital information and government services."
  const pill1 = settings?.pill_text1 || "Secure Government Data"
  const pill2 = settings?.pill_text2 || "Government of Sri Lanka"

  const cardEyebrow = settings?.card_eyebrow || "Privacy Guarantee"
  const cardTitle = settings?.card_title || "Responsible Data Handling"
  const cardDesc = settings?.card_description || "This policy explains how personal information is collected, used, shared, retained and protected across all official Ministry web services."

  const calloutTitle = settings?.callout_title || "About this Privacy Policy"
  const calloutText = settings?.callout_text || "This policy applies to all personal information collected through this website and Ministry-operated digital portals. Specific additional privacy notices may apply to specialized portal systems."

  const infoIcons = [UserCheck, Mail, Globe, Database]

  return (
    <>
      {/* Standardized Hero Section */}
      <PageHero
        badgeIcon={ShieldCheck}
        badgeText={badgeText}
        title={heroTitle}
        highlightTitle={heroHighlight}
        description={heroDesc}
        cardIcon={FileLock2}
        cardEyebrow={cardEyebrow}
        cardTitle={cardTitle}
        cardDescription={cardDesc}
      >
        <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-slate-300 border-t border-white/10 pt-4">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-emerald-300" aria-hidden="true" />
            <span>{pill1}</span>
          </div>
          <div className="flex items-center gap-2">
            <Landmark className="h-4 w-4 text-[#388E3C]" aria-hidden="true" />
            <span>{pill2}</span>
          </div>
        </div>
      </PageHero>

      {/* Main Content Section */}
      <section className="bg-white py-12 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)]">
            {/* Left Sticky Navigation */}
            <aside className="hidden lg:block">
              <nav
                aria-label="Privacy Policy sections"
                className="sticky top-24 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 shadow-2xs"
              >
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#256B29]">
                  {ui.onThisPage}
                </p>

                <ol className="mt-4 space-y-1">
                  {sections.map((section) => (
                    <li key={section.section_key}>
                      <a
                        href={`#${section.section_key}`}
                        className="flex items-center rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-white hover:text-[#256B29]"
                      >
                        <span>{section.nav_label || section.title}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            {/* Right Content Stream */}
            <div className="min-w-0">
              {/* Callout Banner */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6">
                <div className="flex items-start gap-4">
                  <Info aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-[#256B29]" />
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900">
                      {calloutTitle}
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-slate-700">
                      {calloutText}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dynamic Content Sections */}
              <div className="mt-10 space-y-12">
                {sections.map((section, idx) => {
                  const isFirst = idx === 0
                  const borderClass = isFirst ? "" : "border-t border-slate-200 pt-10"

                  // Render Section 2: Information We Collect with Cards Grid
                  if (section.section_key === "information") {
                    return (
                      <section
                        key={section.section_key}
                        id={section.section_key}
                        aria-labelledby={`${section.section_key}-heading`}
                        className={`scroll-mt-28 ${borderClass}`}
                      >
                        <h2
                          id={`${section.section_key}-heading`}
                          className="text-2xl font-extrabold tracking-tight text-slate-900"
                        >
                          {section.title}
                        </h2>
                        {section.content && (
                          <p className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                            {section.content}
                          </p>
                        )}

                        {section.items && section.items.length > 0 && (
                          <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            {section.items.map((item, itemIdx) => {
                              const title = typeof item === "string" ? item : item.title
                              const description = typeof item === "string" ? "" : item.description
                              const Icon = infoIcons[itemIdx % infoIcons.length]

                              return (
                                <div
                                  key={itemIdx}
                                  className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition hover:bg-white hover:shadow-xs"
                                >
                                  <Icon aria-hidden="true" className="h-6 w-6 text-[#256B29]" />
                                  <h3 className="mt-2 text-sm font-extrabold text-slate-900">{title}</h3>
                                  {description && (
                                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                                      {description}
                                    </p>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </section>
                    )
                  }

                  // Render Section 3: How Information is Used with Checkmark List
                  if (section.section_key === "usage") {
                    return (
                      <section
                        key={section.section_key}
                        id={section.section_key}
                        aria-labelledby={`${section.section_key}-heading`}
                        className={`scroll-mt-28 ${borderClass}`}
                      >
                        <h2
                          id={`${section.section_key}-heading`}
                          className="text-2xl font-extrabold tracking-tight text-slate-900"
                        >
                          {section.title}
                        </h2>
                        {section.content && (
                          <p className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                            {section.content}
                          </p>
                        )}

                        {section.items && section.items.length > 0 && (
                          <ul className="mt-4 space-y-2.5">
                            {section.items.map((item, itemIdx) => {
                              const text = typeof item === "string" ? item : `${item.title}: ${item.description}`
                              return (
                                <li key={itemIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                                  <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#256B29]" />
                                  <span>{text}</span>
                                </li>
                              )
                            })}
                          </ul>
                        )}
                      </section>
                    )
                  }

                  // Render Section 5: Information Security with Gradient Box
                  if (section.section_key === "security") {
                    return (
                      <section
                        key={section.section_key}
                        id={section.section_key}
                        aria-labelledby={`${section.section_key}-heading`}
                        className={`scroll-mt-28 ${borderClass}`}
                      >
                        <h2
                          id={`${section.section_key}-heading`}
                          className="text-2xl font-extrabold tracking-tight text-slate-900"
                        >
                          {section.title}
                        </h2>
                        <div className="mt-4 rounded-2xl bg-gradient-to-br from-[#061d24] via-[#0a322f] to-[#0a4350] p-6 text-white shadow-lg">
                          <FileLock2 aria-hidden="true" className="h-8 w-8 text-emerald-300" />
                          <div className="mt-3 space-y-2 text-xs sm:text-sm leading-relaxed text-slate-200">
                            {section.content.split("\n\n").map((para, pIdx) => (
                              <p key={pIdx}>{para}</p>
                            ))}
                          </div>
                        </div>
                      </section>
                    )
                  }

                  // Render Section 6: Cookies Policy with Cookie Box
                  if (section.section_key === "cookies") {
                    return (
                      <section
                        key={section.section_key}
                        id={section.section_key}
                        aria-labelledby={`${section.section_key}-heading`}
                        className={`scroll-mt-28 ${borderClass}`}
                      >
                        <h2
                          id={`${section.section_key}-heading`}
                          className="text-2xl font-extrabold tracking-tight text-slate-900"
                        >
                          {section.title}
                        </h2>
                        <div className="mt-4 flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50/70 p-5">
                          <Cookie className="h-6 w-6 text-[#256B29] shrink-0 mt-0.5" aria-hidden="true" />
                          <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
                            {section.content.split("\n\n").map((para, pIdx) => (
                              <p key={pIdx}>{para}</p>
                            ))}
                          </div>
                        </div>
                      </section>
                    )
                  }

                  // Render Section 8: Your Privacy Rights with Eye Cards Grid
                  if (section.section_key === "rights") {
                    return (
                      <section
                        key={section.section_key}
                        id={section.section_key}
                        aria-labelledby={`${section.section_key}-heading`}
                        className={`scroll-mt-28 ${borderClass}`}
                      >
                        <h2
                          id={`${section.section_key}-heading`}
                          className="text-2xl font-extrabold tracking-tight text-slate-900"
                        >
                          {section.title}
                        </h2>
                        {section.content && (
                          <p className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                            {section.content}
                          </p>
                        )}

                        {section.items && section.items.length > 0 && (
                          <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            {section.items.map((item, itemIdx) => {
                              const title = typeof item === "string" ? item : item.title
                              const description = typeof item === "string" ? "" : item.description

                              return (
                                <div
                                  key={itemIdx}
                                  className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition hover:bg-white hover:shadow-xs"
                                >
                                  <Eye aria-hidden="true" className="h-5 w-5 text-[#256B29]" />
                                  <h3 className="mt-2 text-sm font-extrabold text-slate-900">{title}</h3>
                                  {description && (
                                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                                      {description}
                                    </p>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </section>
                    )
                  }

                  // Render Section 10: Contact Us with Action Callout
                  if (section.section_key === "contact") {
                    const deskBadge = settings?.desk_badge || "Privacy Assistance"
                    const deskDesc = settings?.desk_description || section.content || "For privacy inquiries, data access requests, or to report a data protection concern, please contact our team:"
                    const deskOffice = settings?.desk_office_name || "Ministry Privacy Desk"
                    const deskEmail = settings?.desk_email || "info@fisheries.gov.lk"
                    const deskPhone = settings?.desk_phone || "+94 112 327 060"
                    const contactBtnText = settings?.contact_btn_text || "Go to Contact Page"

                    return (
                      <section
                        key={section.section_key}
                        id={section.section_key}
                        aria-labelledby={`${section.section_key}-heading`}
                        className={`scroll-mt-28 ${borderClass}`}
                      >
                        <span className="text-xs font-extrabold uppercase tracking-wider text-[#256B29]">
                          {deskBadge}
                        </span>
                        <h2
                          id={`${section.section_key}-heading`}
                          className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900"
                        >
                          {section.title}
                        </h2>
                        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {deskDesc}
                        </p>

                        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <h3 className="text-base font-extrabold text-[#0B3D3A]">{deskOffice}</h3>
                            <p className="text-xs text-slate-600 mt-1">
                              Email: <a href={`mailto:${deskEmail}`} className="text-[#256B29] font-semibold underline">{deskEmail}</a> • Tel: <span className="font-semibold text-slate-800">{deskPhone}</span>
                            </p>
                          </div>
                          <Link
                            href="/contact"
                            className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-xl bg-[#388E3C] px-5 text-xs font-extrabold text-white transition hover:bg-[#256B29] cursor-pointer"
                          >
                            <Mail className="h-4 w-4" aria-hidden="true" />
                            <span>{contactBtnText}</span>
                          </Link>
                        </div>
                      </section>
                    )
                  }

                  // Default Section Render (Overview, Sharing, Retention, Changes, etc.)
                  return (
                    <section
                      key={section.section_key}
                      id={section.section_key}
                      aria-labelledby={`${section.section_key}-heading`}
                      className={`scroll-mt-28 ${borderClass}`}
                    >
                      <h2
                        id={`${section.section_key}-heading`}
                        className="text-2xl font-extrabold tracking-tight text-slate-900"
                      >
                        {section.title}
                      </h2>
                      <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-slate-700">
                        {section.content.split("\n\n").map((para, pIdx) => (
                          <p key={pIdx}>{para}</p>
                        ))}
                      </div>
                    </section>
                  )
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Policies Section */}
      <section aria-labelledby="related-policy-pages-heading" className="border-t border-slate-200 bg-slate-50 py-12">
        <Container>
          <div className="max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#256B29]">
              {ui.relatedPoliciesBadge}
            </span>
            <h2 id="related-policy-pages-heading" className="mt-1 text-2xl font-extrabold text-slate-900">
              {ui.relatedPoliciesTitle}
            </h2>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Link
              href="/terms-of-use"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs transition hover:border-slate-300 hover:shadow-md cursor-pointer"
            >
              <Landmark className="h-7 w-7 text-[#256B29]" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-extrabold text-slate-900 group-hover:text-[#388E3C]">
                {ui.termsTitle}
              </h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                {ui.termsDesc}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-extrabold text-[#256B29]">
                <span>{ui.termsLink}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>

            <Link
              href="/accessibility"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs transition hover:border-slate-300 hover:shadow-md cursor-pointer"
            >
              <ShieldCheck className="h-7 w-7 text-[#256B29]" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-extrabold text-slate-900 group-hover:text-[#388E3C]">
                {ui.accessTitle}
              </h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                {ui.accessDesc}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-extrabold text-[#256B29]">
                <span>{ui.accessLink}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
