"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, UserRound } from "lucide-react"

import { leadershipRoles } from "@/data/about"
import { Card } from "@/components/ui/card"
import { Section } from "@/components/ui/section"
import { SectionTitle } from "@/components/ui/section-title"
import { ApiLeader, ApiSectionHeader } from "@/lib/api/about"

export function MinistryLeadership({
  initialHeader,
  initialLeaders,
}: {
  initialHeader?: ApiSectionHeader
  initialLeaders?: ApiLeader[]
}) {
  const eyebrow = initialHeader?.eyebrow || "Leadership"
  const title = initialHeader?.title || "Ministry leadership"
  const description =
    initialHeader?.description ||
    "Executive leadership of the Ministry of Fisheries, Aquatic and Ocean Resources."

  const leaders =
    initialLeaders && initialLeaders.length > 0
      ? initialLeaders.map((l) => ({
          role: l.role_title,
          title: l.name,
          ministry: l.ministry_badge,
          description: l.short_description,
          image: l.photo_url,
          href: l.page_url,
        }))
      : leadershipRoles

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
        {leaders.map((leader) => (
          <LeadershipCardComponent key={leader.role + leader.title} leader={leader} />
        ))}
      </div>
    </Section>
  )
}

function LeadershipCardComponent({
  leader,
}: {
  leader: {
    role: string
    title: string
    ministry: string
    description: string
    image: string
    href: string
  }
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
            <span className="transition-colors group-hover:text-white group-hover/btn:text-white">View leadership profile</span>
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