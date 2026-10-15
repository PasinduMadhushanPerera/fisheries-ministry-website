"use client"

import { useEffect, useState } from "react"
import {
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  ChevronRight,
  Clock,
  Eye,
} from "lucide-react"
import Link from "next/link"

import { Container } from "@/components/ui/container"
import { BackToTop } from "./back-to-top"
import {
  ApiFooterSetting,
  incrementVisitorCount,
  fetchVisitorCount,
  fetchHeaderFooterData,
} from "@/lib/api/header-footer"
import { useLanguage } from "@/src/contexts/LanguageContext"

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
  )
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.418-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 12 5 12 5s6.256 0 7.812.418zM9.741 15.56l5.77-3.56-5.77-3.56v7.12z" clipRule="evenodd" />
    </svg>
  )
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fillRule="evenodd" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" clipRule="evenodd" />
    </svg>
  )
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" clipRule="evenodd" />
    </svg>
  )
}

const localizedDefaults = {
  en: {
    governmentBadge: "Government of Sri Lanka",
    ministryName: "Ministry of Fisheries, Aquatic and Ocean Resources",
    aboutText:
      "Providing public information, official announcements, downloadable forms, and institutional access for Sri Lanka's fisheries, aquaculture, and ocean resources sector.",
    govPortalLabel: "Visit Sri Lanka Gov.lk",
    quickLinksTitle: "Quick Links",
    infoLinksTitle: "Information & Portals",
    contactTitle: "Contact & Support",
    awardsTitle: "Recognitions & Awards",
    hqAddress: "New Secretariat, Maligawatta, Colombo 10, Sri Lanka",
    developedByText: "Design & Developed by IT UNIT",
    lastUpdatedPrefix: "Last updated:",
    websiteViewsPrefix: "Website Views:",
    quickLinks: [
      { label: "Downloads Centre", href: "/downloads" },
      { label: "About the Ministry", href: "/about/overview" },
      { label: "Fisheries Institutions", href: "/institutions" },
    ],
    mediaLinks: [
      { label: "News & Media Centre", href: "/media-centre" },
      { label: "Public Notices", href: "/media-centre/notices" },
      { label: "Events & Programmes", href: "/media-centre/events" },
      { label: "Fisheries Statistics", href: "/statistics" },
      { label: "Right to Information (RTI)", href: "/rti" },
    ],
    supportLinks: [
      { label: "Contact HQ & Directory", href: "/contact" },
      { label: "Frequently Asked Questions", href: "/contact#contact-faq" },
      { label: "Accessibility Statement", href: "/accessibility" },
    ],
    legalLinks: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms-of-use" },
      { label: "Accessibility Statement", href: "/accessibility" },
    ],
  },
  si: {
    governmentBadge: "ශ්‍රී ලංකා රජය",
    ministryName: "ධීවර, ජලජ සහ සාගර සම්පත් අමාත්‍යාංශය",
    aboutText:
      "ශ්‍රී ලංකාවේ ධීවර, ජලජීවී වගා සහ සාගර සම්පත් ක්ෂේත්‍රය සඳහා පොදු තොරතුරු, නිල නිවේදන, බාගත හැකි ආකෘති පත්‍ර සහ ආයතනික ප්‍රවේශය සැපයීම.",
    govPortalLabel: "ශ්‍රී ලංකා Gov.lk වෙත පිවිසෙන්න",
    quickLinksTitle: "ක්ෂණික සබැඳි",
    infoLinksTitle: "තොරතුරු සහ ද්වාර",
    contactTitle: "සම්බන්ධීකරණය සහ සහාය",
    awardsTitle: "ඇගයීම් සහ සම්මාන",
    hqAddress: "නව ලේකම් කාර්යාලය, මාළිගාවත්ත, කොළඹ 10, ශ්‍රී ලංකාව",
    developedByText: "තොරතුරු තාක්ෂණ ඒකකය (IT UNIT) මඟින් නිර්මාණය සහ සංවර්ධනය කරන ලදී",
    lastUpdatedPrefix: "අවසන් වරට යාවත්කාලීන කළේ:",
    websiteViewsPrefix: "වෙබ් අඩවි පිවිසුම්:",
    quickLinks: [
      { label: "බාගත කිරීම් මධ්‍යස්ථානය", href: "/downloads" },
      { label: "අමාත්‍යාංශය පිළිබඳව", href: "/about/overview" },
      { label: "ධීවර ආයතන", href: "/institutions" },
    ],
    mediaLinks: [
      { label: "පුවත් සහ මාධ්‍ය මධ්‍යස්ථානය", href: "/media-centre" },
      { label: "පොදු නිවේදන", href: "/media-centre/notices" },
      { label: "වැඩසටහන් සහ විශේෂ සිදුවීම්", href: "/media-centre/events" },
      { label: "ධීවර සංඛ්‍යාලේඛන", href: "/statistics" },
      { label: "තොරතුරු දැනගැනීමේ අයිතිය (RTI)", href: "/rti" },
    ],
    supportLinks: [
      { label: "ප්‍රධාන කාර්යාලය සහ නාමාවලිය", href: "/contact" },
      { label: "නිතර අසන ප්‍රශ්න (FAQ)", href: "/contact#contact-faq" },
      { label: "ප්‍රවේශ්‍යතා ප්‍රකාශය", href: "/accessibility" },
    ],
    legalLinks: [
      { label: "පෞද්ගලිකත්ව ප්‍රතිපත්තිය", href: "/privacy" },
      { label: "භාවිත නියමයන්", href: "/terms-of-use" },
      { label: "ප්‍රවේශ්‍යතා ප්‍රකාශය", href: "/accessibility" },
    ],
  },
  ta: {
    governmentBadge: "இலங்கை அரசாங்கம்",
    ministryName: "கடற்றொழில், நீரியல் மற்றும் பெருங்கடல் வளங்கள் அமைச்சு",
    aboutText:
      "இலங்கையின் கடற்றொழில், நீரியல் வளர்ப்பு மற்றும் பெருங்கடல் வளங்கள் துறைக்கான பொதுத் தகவல்கள், உத்தியோகபூர்வ அறிவிப்புகள், பதிவிறக்கம் செய்யக்கூடிய படிவங்கள் மற்றும் நிறுவன அணுகலை வழங்குதல்.",
    govPortalLabel: "இலங்கை Gov.lk போர்ட்டலுக்குச் செல்க",
    quickLinksTitle: "விரைவு இணைப்புகள்",
    infoLinksTitle: "தகவல்கள் & போர்ட்டல்கள்",
    contactTitle: "தொடர்பு & ஆதரவு",
    awardsTitle: "அங்கீகாரங்கள் & விருதுகள்",
    hqAddress: "புதிய செயலகம், மாளிகாவத்தை, கொழும்பு 10, இலங்கை",
    developedByText: "தகவல் தொழில்நுட்பப் பிரிவினால் (IT UNIT) வடிவமைக்கப்பட்டு உருவாக்கப்பட்டது",
    lastUpdatedPrefix: "கடைசியாக புதுப்பிக்கப்பட்டது:",
    websiteViewsPrefix: "தளப் பார்வைகள்:",
    quickLinks: [
      { label: "பதிவிறக்க மையம்", href: "/downloads" },
      { label: "அமைச்சு பற்றி", href: "/about/overview" },
      { label: "மீன்பிடி நிறுவனங்கள்", href: "/institutions" },
    ],
    mediaLinks: [
      { label: "செய்திகள் & ஊடக மையம்", href: "/media-centre" },
      { label: "பொது அறிவிப்புகள்", href: "/media-centre/notices" },
      { label: "நிகழ்வுகள் & திட்டங்கள்", href: "/media-centre/events" },
      { label: "மீன்பிடி புள்ளிவிவரங்கள்", href: "/statistics" },
      { label: "தகவல் அறியும் உரிமை (RTI)", href: "/rti" },
    ],
    supportLinks: [
      { label: "தலைமை அலுவலக தொடர்பு & அடைவு", href: "/contact" },
      { label: "அடிக்கடி கேட்கப்படும் கேள்விகள்", href: "/contact#contact-faq" },
      { label: "அணுகல்தன்மை அறிக்கை", href: "/accessibility" },
    ],
    legalLinks: [
      { label: "தனியுரிமைக் கொள்கை", href: "/privacy" },
      { label: "பயன்பாட்டு விதிமுறைகள்", href: "/terms-of-use" },
      { label: "அணுகல்தன்மை அறிக்கை", href: "/accessibility" },
    ],
  },
}

export function SiteFooter({
  initialFooter,
  initialViews,
}: {
  initialFooter?: ApiFooterSetting
  initialViews?: number
}) {
  const { language } = useLanguage()
  const [footerData, setFooterData] = useState<ApiFooterSetting | null>(initialFooter || null)
  const [viewsCount, setViewsCount] = useState<number | null>(initialViews ?? null)

  useEffect(() => {
    let isMounted = true

    async function loadFooter() {
      try {
        const data = await fetchHeaderFooterData(language)
        if (isMounted && data?.footer) {
          setFooterData(data.footer)
        }
      } catch (err) {
        console.error("Error loading localized footer data:", err)
      }
    }

    loadFooter()

    return () => {
      isMounted = false
    }
  }, [language])

  useEffect(() => {
    let isMounted = true

    async function handleVisit() {
      const hasTrackedSession = typeof window !== "undefined" && sessionStorage.getItem("view_tracked")
      if (!hasTrackedSession) {
        const newCount = await incrementVisitorCount()
        if (isMounted && newCount !== null) {
          setViewsCount(newCount)
          try {
            sessionStorage.setItem("view_tracked", "true")
          } catch {
            // Ignore storage errors
          }
          return
        }
      }

      // If already tracked in this session or initialViews wasn't passed, fetch the actual live count from backend API
      const currentCount = await fetchVisitorCount()
      if (isMounted && currentCount !== null) {
        setViewsCount(currentCount)
      }
    }

    handleVisit()

    return () => {
      isMounted = false
    }
  }, [initialViews])

  const currentLang = language === "si" || language === "ta" ? language : "en"
  const d = localizedDefaults[currentLang]

  const activeFooter = footerData || initialFooter

  const governmentBadge = activeFooter?.government_badge || d.governmentBadge
  const ministryName = activeFooter?.ministry_name || d.ministryName
  const aboutText = activeFooter?.about_text || d.aboutText
  const govPortalLabel = activeFooter?.gov_portal_label || d.govPortalLabel
  const govPortalUrl = activeFooter?.gov_portal_url || "https://www.gov.lk/"
  const quickLinksTitle = activeFooter?.quick_links_title || d.quickLinksTitle
  const infoLinksTitle = activeFooter?.info_links_title || d.infoLinksTitle
  const contactTitle = activeFooter?.contact_title || d.contactTitle
  const awardsTitle = activeFooter?.awards_title || d.awardsTitle
  const hqAddress = activeFooter?.hq_address || d.hqAddress
  const telephone = activeFooter?.telephone || "+94 112 327 060"
  const email = activeFooter?.email || "info@fisheries.gov.lk"
  const copyrightYear = activeFooter?.copyright_year || new Date().getFullYear().toString()
  const copyrightText =
    activeFooter?.copyright_text ||
    `${ministryName}. Official Government Website.`
  const developedByText =
    activeFooter?.developed_by_text !== undefined
      ? activeFooter.developed_by_text
      : d.developedByText
  const lastUpdatedText =
    activeFooter?.last_updated_text ||
    (currentLang === "si" ? "2026 අගෝස්තු 25" : currentLang === "ta" ? "25 ஆகஸ்ட் 2026" : "25 August 2026")
  const lastUpdatedPrefix = activeFooter?.last_updated_prefix || d.lastUpdatedPrefix
  const websiteViewsPrefix = activeFooter?.website_views_prefix || d.websiteViewsPrefix

  const enableSocialMedia = activeFooter?.enable_social_media ?? true

  const facebookUrl = activeFooter
    ? activeFooter.facebook_url?.trim() || ""
    : "https://web.facebook.com/fisheries.gov.lk/"
  const youtubeUrl = activeFooter
    ? activeFooter.youtube_url?.trim() || ""
    : "https://www.youtube.com/@Ministry_of_Fisheries_SL"
  const linkedinUrl = activeFooter
    ? activeFooter.linkedin_url?.trim() || ""
    : "https://www.linkedin.com/company/ministry-of-fisheries-and-ocean-resources/"
  const twitterUrl = activeFooter ? activeFooter.twitter_url?.trim() || "" : ""
  const instagramUrl = activeFooter ? activeFooter.instagram_url?.trim() || "" : ""

  const hasAnySocial =
    enableSocialMedia &&
    Boolean(facebookUrl || youtubeUrl || linkedinUrl || twitterUrl || instagramUrl)

  const phoneTel = `tel:${telephone.replace(/[^0-9+]/g, "")}`

  const quickLinks =
    activeFooter?.quick_links && activeFooter.quick_links.length > 0
      ? activeFooter.quick_links.map((l) => ({ label: l.label, href: l.url }))
      : d.quickLinks

  const infoLinks =
    activeFooter?.info_links && activeFooter.info_links.length > 0
      ? activeFooter.info_links.map((l) => ({ label: l.label, href: l.url }))
      : d.mediaLinks

  const supportLinks =
    activeFooter?.support_links && activeFooter.support_links.length > 0
      ? activeFooter.support_links.map((l) => ({ label: l.label, href: l.url }))
      : d.supportLinks

  const legalLinks =
    activeFooter?.legal_links && activeFooter.legal_links.length > 0
      ? activeFooter.legal_links.map((l) => ({ label: l.label, href: l.url }))
      : d.legalLinks

  return (
    <>
      <footer className="bg-[#0d332c] text-white">
        {/* Main Footer Body */}
        <div className="border-b border-white/10">
          <Container className="grid gap-8 py-8 sm:py-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Column 1: Ministry Branding */}
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/20 border border-emerald-400/30 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-300">
                {governmentBadge}
              </span>

              {/* Topic 1: Ministry Title */}
              <h2
                className="text-base font-extrabold leading-snug !text-yellow-300 border-b border-emerald-500/30 pb-1.5 flex items-center gap-2"
                style={{ color: "#fde047" }}
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
                <span>{ministryName}</span>
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed text-justify">
                {aboutText}
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-3">
                <a
                  href={govPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[34px] items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3.5 text-xs font-bold text-emerald-300 transition hover:bg-white hover:!text-black"
                >
                  <span>{govPortalLabel}</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>

              {/* Award Badges & Accolades */}
              {activeFooter?.awards && activeFooter.awards.length > 0 && (
                <div className="pt-3 border-t border-white/10 mt-3">
                  <span
                    className="text-[11px] font-extrabold uppercase tracking-wider block mb-2"
                    style={{ color: "#fde047" }}
                  >
                    {awardsTitle}
                  </span>
                  <div className="flex flex-wrap items-center gap-3">
                    {activeFooter.awards.map((award) => {
                      const imageElement = (
                        <img
                          src={award.image_url}
                          alt={award.title}
                          title={award.title}
                          className="h-16 sm:h-20 w-auto max-w-[180px] object-contain rounded-lg bg-white/10 p-1.5 border border-white/20 hover:border-emerald-400 hover:bg-white/20 transition-all shadow-md"
                        />
                      )
                      return award.url ? (
                        <a
                          key={award.id}
                          href={award.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={award.title}
                          className="inline-block transition-transform hover:scale-105"
                        >
                          {imageElement}
                        </a>
                      ) : (
                        <div key={award.id} title={award.title} className="inline-block">
                          {imageElement}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Column 2: Quick Links & Downloads */}
            <FooterColumn title={quickLinksTitle} links={quickLinks} />

            {/* Column 3: Media & Statistics */}
            <FooterColumn title={infoLinksTitle} links={infoLinks} />

            {/* Column 4: Contact & HQ Info */}
            <div className="space-y-3">
              {/* Topic 4: Contact & Support */}
              <h2
                className="text-xs font-extrabold uppercase tracking-wider !text-yellow-300 border-b border-emerald-500/30 pb-1.5 flex items-center gap-2"
                style={{ color: "#fde047" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>{contactTitle}</span>
              </h2>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <MapPin
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300"
                    aria-hidden="true"
                  />
                  <span className="leading-relaxed">{hqAddress}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone
                    className="h-3.5 w-3.5 shrink-0 text-emerald-300"
                    aria-hidden="true"
                  />
                  <a
                    href={phoneTel}
                    className="hover:text-emerald-300 transition-colors font-medium"
                  >
                    {telephone}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Mail
                    className="h-3.5 w-3.5 shrink-0 text-emerald-300"
                    aria-hidden="true"
                  />
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-emerald-300 transition-colors font-medium"
                  >
                    {email}
                  </a>
                </div>
              </div>

              <nav
                aria-label="Footer support links"
                className="border-t border-white/10 pt-2"
              >
                <ul className="space-y-1.5">
                  {supportLinks.map((link) => (
                    <li key={link.label + link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 transition hover:text-white"
                      >
                        <ChevronRight className="h-3 w-3 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </Container>
        </div>

        {/* Tier 1: Legal Policies, System Status & Social Channels */}
        <div className="border-t border-white/10 bg-black/15 py-3">
          <Container className="flex flex-col items-center justify-center gap-3 lg:flex-row lg:items-center lg:justify-between text-center lg:text-left">
            {/* Left: Policy & Governance Links */}
            <nav
              aria-label="Legal links"
              className="w-full lg:w-auto flex justify-center lg:justify-start"
            >
              <ul className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1.5 text-[11px] font-medium text-slate-300">
                {legalLinks.map((link, idx) => (
                  <li
                    key={link.label + link.href}
                    className="flex items-center gap-x-3"
                  >
                    {idx > 0 && (
                      <span className="text-white/20 select-none">•</span>
                    )}
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-emerald-300 hover:underline underline-offset-2"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right: Last Updated, Live Views Counter & Social Media */}
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 sm:gap-4 text-[11px] w-full lg:w-auto">
              {/* Last Updated */}
              <div className="inline-flex items-center gap-1.5 text-slate-300 font-medium">
                <Clock
                  className="h-3 w-3 text-emerald-400 shrink-0"
                  aria-hidden="true"
                />
                <span>
                  {lastUpdatedPrefix}{" "}
                  <span className="text-slate-100 font-semibold">
                    {lastUpdatedText}
                  </span>
                </span>
              </div>

              <span className="hidden sm:inline text-white/20 select-none">
                •
              </span>

              {/* Live Website Views Badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 px-3 py-1 text-[11px] font-semibold text-emerald-300 shadow-xs">
                <Eye
                  className="h-3.5 w-3.5 text-emerald-400 shrink-0"
                  aria-hidden="true"
                />
                <span>
                  {websiteViewsPrefix}{" "}
                  <strong className="text-white font-extrabold">
                    {viewsCount !== null ? viewsCount.toLocaleString() : "..."}
                  </strong>
                </span>
              </div>

              {/* Social Media Channels */}
              {hasAnySocial && (
                <>
                  <div className="hidden h-4 w-px bg-white/20 sm:block" />

                  <div className="flex items-center justify-center gap-1.5">
                    {facebookUrl && (
                      <a
                        href={facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Official Facebook Page"
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-blue-600 hover:text-white cursor-pointer"
                        title="Official Facebook Page"
                      >
                        <FacebookIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {youtubeUrl && (
                      <a
                        href={youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Official YouTube Channel"
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-red-600 hover:text-white cursor-pointer"
                        title="Official YouTube Channel"
                      >
                        <YoutubeIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {linkedinUrl && (
                      <a
                        href={linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Official LinkedIn Page"
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-sky-600 hover:text-white cursor-pointer"
                        title="Official LinkedIn Page"
                      >
                        <LinkedinIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {twitterUrl && (
                      <a
                        href={twitterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Official X (Twitter) Page"
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-black hover:text-white cursor-pointer"
                        title="Official X (Twitter) Page"
                      >
                        <TwitterIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {instagramUrl && (
                      <a
                        href={instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Official Instagram Page"
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-pink-600 hover:text-white cursor-pointer"
                        title="Official Instagram Page"
                      >
                        <InstagramIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>
          </Container>
        </div>

        {/* Tier 2: Official Copyright & Development Credits (Bottom-most bar) */}
        <div className="border-t border-white/10 bg-black/30 py-3 text-[11px]">
          <Container className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:items-center sm:justify-between text-slate-300 text-center sm:text-left">
            {/* Copyright Statement */}
            <div className="flex items-center justify-center sm:justify-start gap-2 text-center sm:text-left w-full sm:w-auto">
              <ShieldCheck
                className="h-4 w-4 text-emerald-400 shrink-0"
                aria-hidden="true"
              />
              <span className="font-normal text-slate-300">
                © {copyrightYear} {copyrightText}
              </span>
            </div>

            {/* Development Attribution */}
            {developedByText && (
              <div className="flex items-center justify-center sm:justify-end gap-1.5 text-slate-400 text-center sm:text-right font-medium w-full sm:w-auto">
                <span className="inline-block h-1 w-1 rounded-full bg-emerald-400 sm:hidden shrink-0" />
                <span>{developedByText}</span>
              </div>
            )}
          </Container>
        </div>
      </footer>

      <BackToTop />
    </>
  )
}

type FooterColumnProps = {
  title: string
  links: {
    label: string
    href: string
  }[]
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <nav aria-label={`${title} footer links`} className="space-y-3">
      {/* Topics 2 & 3: Quick Links & Information & Portals */}
      <h2
        className="text-xs font-extrabold uppercase tracking-wider !text-yellow-300 border-b border-emerald-500/30 pb-1.5 flex items-center gap-2"
        style={{ color: "#fde047" }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
        <span>{title}</span>
      </h2>
      <ul className="space-y-1.5">
        {links.map((link) => (
          <li key={link.label + link.href}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 transition hover:text-white"
            >
              <ChevronRight className="h-3 w-3 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}