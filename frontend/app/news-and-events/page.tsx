import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CalendarDays, Newspaper } from "lucide-react"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { FeaturedNews } from "@/components/media/featured-news"
import { UpcomingEvents } from "@/components/media/upcoming-events"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Container } from "@/components/ui/container"
import { PageHero } from "@/components/ui/page-hero"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

export const metadata: Metadata = {
  title: "News & Events | Ministry of Fisheries",
  description:
    "Official news releases, developments, upcoming events, workshops and conferences from the Ministry of Fisheries, Aquatic and Ocean Resources.",
}

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Media Centre", href: "/media-centre" },
  { label: "News & Events" },
]

export default function NewsAndEventsPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb items={breadcrumbItems} />

        <PageHero
          badgeIcon={Newspaper}
          badgeText="Media & Updates"
          title="Ministry News &"
          highlightTitle="Upcoming Events"
          description="Access official news announcements, coastal development stories, and upcoming events calendar from the Ministry of Fisheries."
          cardIcon={CalendarDays}
          cardEyebrow="Public Portal"
          cardTitle="News & Events Hub"
          cardDescription="Separate portals for verified news articles and public event schedules."
        >
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/media-centre/news"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-extrabold text-slate-950 transition hover:bg-emerald-100"
            >
              <Newspaper className="h-4 w-4 text-[#256B29]" />
              <span>Go to News Section</span>
            </Link>

            <Link
              href="/media-centre/events"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-xs font-extrabold text-white backdrop-blur-md transition hover:bg-white hover:text-slate-950"
            >
              <CalendarDays className="h-4 w-4 text-emerald-300" />
              <span>Go to Events Calendar</span>
            </Link>
          </div>
        </PageHero>

        <section className="py-12 bg-white">
          <Container>
            <div className="flex flex-col gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-[#256B29]">
                  <Newspaper className="h-3.5 w-3.5" />
                  <span>Latest News</span>
                </span>
                <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Featured News Stories
                </h2>
              </div>
              <Link
                href="/media-centre/news"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#256B29] hover:underline"
              >
                <span>View all news articles</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8">
              <FeaturedNews />
            </div>
          </Container>
        </section>

        <section className="py-12 bg-slate-50">
          <Container>
            <div className="flex flex-col gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-[#256B29]">
                  <CalendarDays className="h-3.5 w-3.5" />
                  <span>Calendar</span>
                </span>
                <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Upcoming Ministry Events
                </h2>
              </div>
              <Link
                href="/media-centre/events"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#256B29] hover:underline"
              >
                <span>View full event calendar</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8">
              <UpcomingEvents />
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
