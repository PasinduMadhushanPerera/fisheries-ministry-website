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
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 shrink-0">
        {!imageError ? (
          <Image
            src={leader.image}
            alt={`Portrait of ${leader.title}`}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 via-green-50 to-sky-100 text-slate-400">
            <UserRound className="h-16 w-16" aria-hidden="true" />
          </div>
        )}

        <span className="absolute bottom-3 left-3 rounded-full bg-slate-900/90 text-white px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] backdrop-blur-xs">
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

          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {leader.description}
          </p>
        </div>

        <div className="mt-6 pt-3 border-t border-slate-100">
          <Link
            href={leader.href}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#256B29] hover:underline"
          >
            <span>View leadership profile</span>
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </Card>
  )
}