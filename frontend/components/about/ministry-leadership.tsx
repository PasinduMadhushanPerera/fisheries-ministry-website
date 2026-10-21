"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, UserRound } from "lucide-react"

import { useLanguage } from "@/src/contexts/LanguageContext"
import { Card } from "@/components/ui/card"
import { Section } from "@/components/ui/section"
import { SectionTitle } from "@/components/ui/section-title"
import { ApiLeader, ApiSectionHeader, fetchAboutPageData } from "@/lib/api/about"

const localizedDefaults = {
  en: {
    eyebrow: "Leadership",
    title: "Ministry leadership",
    description: "Executive leadership of the Ministry of Fisheries, Aquatic and Ocean Resources.",
    buttonText: "View leadership profile",
  },
  si: {
    eyebrow: "නායකත්වය",
    title: "අමාත්‍යාංශ නායකත්වය",
    description: "ධීවර, ජලජ සහ සාගර සම්පත් අමාත්‍යාංශයේ විධායක නායකත්වය.",
    buttonText: "නායකත්ව පැතිකඩ බලන්න",
  },
  ta: {
    eyebrow: "தலைமைத்துவம்",
    title: "அமைச்சின் தலைமைத்துவம்",
    description: "கடற்றொழில், நீரியல் மற்றும் கடல்சார் வளங்கள் அமைச்சின் நிறைவேற்று தலைமைத்துவம்.",
    buttonText: "தலைமைத்துவ சுயவிவரத்தைப் பார்க்கவும்",
  },
}

export function MinistryLeadership({
  initialHeader,
  initialLeaders,
  lang,
}: {
  initialHeader?: ApiSectionHeader
  initialLeaders?: ApiLeader[]
  lang?: string
}) {
  const { language } = useLanguage()
  const [activeLang, setActiveLang] = useState<"en" | "si" | "ta">(
    (lang as "en" | "si" | "ta") || (language as "en" | "si" | "ta") || "en"
  )

  useEffect(() => {
    if (language) {
      setActiveLang(language as "en" | "si" | "ta")
    }
  }, [language])

  useEffect(() => {
    if (lang) {
      setActiveLang(lang as "en" | "si" | "ta")
    }
  }, [lang])

  const defaults = localizedDefaults[activeLang] || localizedDefaults.en

  const [header, setHeader] = useState<ApiSectionHeader | undefined>(initialHeader)
  const [leadersData, setLeadersData] = useState<ApiLeader[]>(initialLeaders || [])

  useEffect(() => {
    if (initialHeader) setHeader(initialHeader)
  }, [initialHeader])

  useEffect(() => {
    if (initialLeaders && initialLeaders.length > 0) setLeadersData(initialLeaders)
  }, [initialLeaders])

  // Sync client-side when language changes
  useEffect(() => {
    let isCancelled = false
    fetchAboutPageData(language).then((data) => {
      if (isCancelled || !data) return
      if (data.leadership_header) {
        setHeader(data.leadership_header)
      }
      const newLeaders = data.leaders || (data as any).leadership
      if (newLeaders && newLeaders.length > 0) {
        setLeadersData(newLeaders)
      }
    }).catch(() => {})

    return () => {
      isCancelled = true
    }
  }, [language])

  const eyebrow = header?.eyebrow || defaults.eyebrow
  const title = header?.title || defaults.title
  const description = header?.description || defaults.description
  const buttonText = defaults.buttonText

  const leaders =
    leadersData && leadersData.length > 0
      ? leadersData.map((l) => ({
          role: l.role_title,
          title: l.name,
          ministry: l.ministry_badge,
          description: l.short_description,
          image: l.photo_url || "/images/leadership/minister.jpg",
          href: l.page_url || "#",
        }))
      : []

  return (
    <Section
      id="ministry-leadership"
      background="white"
      labelledBy="leadership-heading"
      spacing="lg"
    >
      <SectionTitle
        id="leadership-heading"
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-3 items-stretch">
        {leaders.map((leader, idx) => (
          <LeadershipCardComponent
            key={leader.href || idx}
            leader={leader}
            buttonText={buttonText}
          />
        ))}
      </div>
    </Section>
  )
}

function LeadershipCardComponent({
  leader,
  buttonText,
}: {
  leader: {
    role: string
    title: string
    ministry: string
    description: string
    image: string
    href: string
  }
  buttonText: string
}) {
  const [imageError, setImageError] = useState(false)

  return (
    <Card
      interactive
      className="group flex flex-col h-full overflow-hidden border border-slate-200 bg-white rounded-2xl shadow-2xs hover:shadow-md transition-all duration-200"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-900 shrink-0">
        {!imageError ? (
          <Image
            src={leader.image}
            alt={`Portrait of ${leader.title}`}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 via-green-50 to-sky-100 text-slate-400">
            <UserRound className="h-16 w-16" aria-hidden="true" />
          </div>
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90"
        />

        <span className="absolute bottom-3 left-3 rounded-full bg-[#256B29] text-white px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] shadow-sm backdrop-blur-xs">
          {leader.role}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-6 justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#256B29]">
            {leader.ministry}
          </p>

          <h3 className="mt-2 text-xl font-bold text-slate-950 group-hover:text-[#256B29] transition-colors">
            {leader.title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-slate-600 text-justify">
            {leader.description}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100">
          <Link
            href={leader.href}
            className="inline-flex w-full items-center justify-between rounded-xl border border-[#256B29]/25 bg-emerald-50/60 px-4 py-2.5 text-sm font-bold text-[#256B29] transition-all duration-200 hover:bg-[#256B29] hover:text-white group-hover:bg-[#256B29] group-hover:text-white hover:border-[#256B29] group-hover:border-[#256B29] hover:shadow-sm group/btn"
          >
            <span className="transition-colors group-hover:text-white group-hover/btn:text-white">
              {buttonText}
            </span>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#256B29]/15 text-[#256B29] group-hover:bg-white/20 group-hover:text-white group-hover/btn:bg-white/20 group-hover/btn:text-white transition-colors">
              <ArrowRight
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5"
              />
            </div>
          </Link>
        </div>
      </div>
    </Card>
  )
}