import type { Metadata } from "next"

import { NoticeList } from "@/components/media/notices-list"
import { NoticesHero } from "@/components/media/notices-hero"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "Notices | Media Centre",
  description:
    "Browse official Ministry notices, procurement opportunities, recruitment announcements, licensing updates and public consultation information.",
}

const breadcrumbItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Media Centre",
    href: "/media-centre",
  },
  {
    label: "Notices",
  },
]

export default function NoticesPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <Breadcrumb items={breadcrumbItems} />

        <NoticesHero />

        <NoticeList />
      </main>

      <SiteFooter />
    </>
  )
}