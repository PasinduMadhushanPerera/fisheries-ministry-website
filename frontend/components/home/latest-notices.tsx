import {
  ArrowRight,
  Bell,
  CalendarDays,
  Download,
} from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { LinkButton } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Section } from "@/components/ui/section"
import { SectionTitle } from "@/components/ui/section-title"

const notices = [
  {
    title:
      "Public notices, circulars and service announcements",
    description:
      "Read official Ministry announcements relating to fisheries services, applications, public consultations and sector activities.",
    category: "Public notice",
    date: "Latest updates",
    href: "/media-centre/notices",
    downloadable: false,
  },
  {
    title:
      "Application guidance and submission requirements",
    description:
      "Review current instructions, required supporting documents and submission guidance before applying for Ministry services.",
    category: "Service guidance",
    date: "Updated regularly",
    href: "/services",
    downloadable: false,
  },
  {
    title:
      "Official circulars and downloadable documents",
    description:
      "Access circulars, notices, forms, guidelines and other documents published for public and institutional use.",
    category: "Documents",
    date: "Official resources",
    href: "/documents",
    downloadable: true,
  },
]

export function LatestNotices() {
  return (
    <Section
      id="latest-notices"
      background="white"
      labelledBy="latest-notices-heading"
    >
      <SectionTitle
        id="latest-notices-heading"
        eyebrow="Official updates"
        title="Latest notices and announcements"
        description="Stay informed about Ministry services, public announcements, application requirements and official documents."
        actions={
          <LinkButton
            href="/media-centre/notices"
            variant="outline"
          >
            View all notices
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4"
            />
          </LinkButton>
        }
      />

      <div className="mt-10 grid gap-5">
        {notices.map((notice) => (
          <Card
            key={notice.title}
            interactive
            className="group overflow-hidden"
          >
            <Link
              href={notice.href}
              className="grid gap-5 p-6 outline-none focus-visible:ring-4 focus-visible:ring-blue-200 md:grid-cols-[auto_1fr_auto] md:items-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                <Bell
                  aria-hidden="true"
                  className="h-6 w-6"
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="warning">
                    {notice.category}
                  </Badge>

                  <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                    <CalendarDays
                      aria-hidden="true"
                      className="h-4 w-4"
                    />
                    {notice.date}
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-bold text-slate-950 transition-colors group-hover:text-[#256B29]">
                  {notice.title}
                </h3>

                <p className="mt-2 max-w-4xl leading-7 text-slate-600">
                  {notice.description}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 font-bold text-[#256B29]">
                {notice.downloadable ? (
                  <>
                    <Download
                      aria-hidden="true"
                      className="h-4 w-4"
                    />
                    Open documents
                  </>
                ) : (
                  <>
                    Read notice
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </Section>
  )
}