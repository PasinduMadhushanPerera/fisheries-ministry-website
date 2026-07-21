import type { Metadata } from "next"

import { FeaturedNews } from "@/components/news/featured-news"
import { LatestNews } from "@/components/news/latest-news"
import { NewsHero } from "@/components/news/news-hero"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "News and Updates",
  description:
    "Read Ministry news, announcements, events and public updates.",
}

export default function NewsPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb
          items={[
            {
              label: "News",
            },
          ]}
        />

        <NewsHero />
        <FeaturedNews />
        <LatestNews />
      </main>

      <SiteFooter />
    </>
  )
}