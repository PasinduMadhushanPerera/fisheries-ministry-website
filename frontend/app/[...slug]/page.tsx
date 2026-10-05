import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Building2, ArrowRight, ShieldCheck } from "lucide-react"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Container } from "@/components/ui/container"
import { fetchDynamicPageBySlug } from "@/lib/api/pages"

type Props = {
  params: Promise<{ slug?: string | string[] }>
}

async function resolveSlug(paramsPromise: Props["params"]): Promise<string> {
  const resolved = await Promise.resolve(paramsPromise)
  if (!resolved || !resolved.slug) return ""
  if (Array.isArray(resolved.slug)) {
    return resolved.slug.join("/")
  }
  return String(resolved.slug)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = await resolveSlug(params)
  if (!slug) return { title: "Page Not Found - Ministry of Fisheries" }

  const page = await fetchDynamicPageBySlug(slug)

  if (!page) {
    return {
      title: "Page Not Found - Ministry of Fisheries",
    }
  }

  return {
    title: page.meta_title || `${page.title} - Ministry of Fisheries`,
    description:
      page.meta_description ||
      page.hero_subtitle ||
      `Official information and guidelines regarding ${page.title}.`,
  }
}

export default async function DynamicPageRoute({ params }: Props) {
  const slug = await resolveSlug(params)
  if (!slug) {
    notFound()
  }

  const page = await fetchDynamicPageBySlug(slug)

  if (!page) {
    notFound()
  }

  return (
    <>
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="outline-none min-h-screen bg-white">
        {/* 1. Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: page.title },
          ]}
        />

        {/* 2. Hero Header Banner */}
        <section className="relative bg-gradient-to-br from-[#0B3D3A] via-[#123F36] to-[#0A2E28] py-14 sm:py-18 text-white overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl"
          />
          <Container>
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-300 backdrop-blur-xs">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>{page.badge_text || "Ministry Portal"}</span>
              </span>

              {page.hero_title || page.title ? (
                <h1
                  className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight"
                  dangerouslySetInnerHTML={{ __html: page.hero_title || page.title }}
                />
              ) : null}

              {page.hero_subtitle && (
                <div
                  className="text-sm sm:text-base leading-relaxed text-slate-200/90 text-justify prose prose-invert max-w-none [&_p]:m-0 [&_p]:p-0"
                  dangerouslySetInnerHTML={{ __html: page.hero_subtitle }}
                />
              )}
            </div>
          </Container>
        </section>

        {/* 3. Main Content & Optional Sidebar */}
        <section className="py-14 sm:py-20 bg-slate-50/50">
          <Container>
            <div className="grid gap-10 lg:grid-cols-12 items-start">
              {/* Main Rich Content Area */}
              <div
                className={`${
                  page.show_sidebar ? "lg:col-span-8" : "lg:col-span-12"
                } bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-10 shadow-xs`}
              >
                {page.banner_image && (
                  <div className="relative mb-8 h-64 sm:h-80 w-full overflow-hidden rounded-2xl bg-slate-100">
                    <Image
                      src={page.banner_image}
                      alt={page.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Render Rich HTML Content */}
                <div
                  className="prose prose-slate max-w-none prose-headings:font-extrabold prose-headings:text-slate-900 prose-h2:text-2xl prose-h3:text-xl prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700 prose-a:text-[#256B29] prose-a:font-bold prose-img:rounded-2xl"
                  dangerouslySetInnerHTML={{ __html: page.content }}
                />

                <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
                  <span>Last updated: {page.updated_at ? new Date(page.updated_at).toLocaleDateString("en-GB") : "Recently"}</span>
                  <span className="font-semibold text-slate-700">Official Ministry of Fisheries Publication</span>
                </div>
              </div>

              {/* Optional Right Sidebar / Contact Desk */}
              {page.show_sidebar && (
                <aside className="lg:col-span-4 space-y-6">
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs">
                    <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3 mb-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-[#256B29]">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <h3 className="text-base font-extrabold text-slate-950">
                        {page.sidebar_title || "Official Inquiries"}
                      </h3>
                    </div>

                    {page.sidebar_content ? (
                      <div
                        className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2"
                        dangerouslySetInnerHTML={{ __html: page.sidebar_content }}
                      />
                    ) : (
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        For questions or assistance regarding this publication, please contact the Ministry Secretariat.
                      </p>
                    )}

                    <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                      <Link
                        href="/contact"
                        className="inline-flex w-full min-h-10 items-center justify-center gap-2 rounded-xl bg-[#256B29] px-4 text-xs font-extrabold !text-white shadow-xs transition hover:bg-[#1b4d1d]"
                      >
                        <span>Contact Ministry</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-emerald-200/80 bg-emerald-50/70 p-5">
                    <p className="text-xs font-extrabold text-[#256B29] uppercase tracking-wider mb-1">
                      Quick Portal Access
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      Explore official departments, statutory boards, and public e-services.
                    </p>
                    <Link
                      href="/institutions"
                      className="text-xs font-extrabold text-[#256B29] hover:underline inline-flex items-center gap-1"
                    >
                      View All Institutions &rarr;
                    </Link>
                  </div>
                </aside>
              )}
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
