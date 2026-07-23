import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
    ArrowLeft,
    ArrowRight,
    Building2,
    CalendarDays,
    Clock3,
    Download,
    ExternalLink,
    FileText,
    Landmark,
    MapPin,
    Tag,
} from "lucide-react"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Container } from "@/components/ui/container"
import {
    getNoticeBySlug,
    getRelatedNotices,
    notices,
    type NoticeStatus,
} from "@/data/notices"

type NoticeDetailPageProps = {
    params: Promise<{
        slug: string
    }>
}

const statusStyles: Record<NoticeStatus, string> = {
    Open: "border-green-200 bg-green-100 text-green-800",
    "Closing Soon": "border-amber-200 bg-amber-100 text-amber-800",
    Closed: "border-slate-200 bg-slate-100 text-slate-700",
}

export function generateStaticParams() {
    return notices.map((notice) => ({
        slug: notice.slug,
    }))
}

export async function generateMetadata({
    params,
}: NoticeDetailPageProps): Promise<Metadata> {
    const { slug } = await params
    const notice = getNoticeBySlug(slug)

    if (!notice) {
        return {
            title: "Notice Not Found",
        }
    }

    return {
        title: `${notice.title} | Notices`,
        description: notice.summary,
        openGraph: {
            title: notice.title,
            description: notice.summary,
            type: "article",
        },
    }
}

export default async function NoticeDetailPage({
    params,
}: NoticeDetailPageProps) {
    const { slug } = await params
    const notice = getNoticeBySlug(slug)

    if (!notice) {
        notFound()
    }

    const relatedNotices = getRelatedNotices(notice)

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
            href: "/media-centre/notices",
        },
        {
            label: notice.title,
        },
    ]

    return (
        <>
            <SiteHeader />

            <main>
                <Breadcrumb items={breadcrumbItems} />

                <section className="relative isolate overflow-hidden bg-[#061d24] text-white">
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,197,94,0.18),transparent_34%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,0.22),transparent_38%),linear-gradient(135deg,#061d24_0%,#0a322f_50%,#0a4350_100%)]"
                    />

                    <div
                        aria-hidden="true"
                        className="absolute -right-36 -top-36 h-[30rem] w-[30rem] rounded-full border border-white/10 bg-white/[0.03]"
                    />

                    <svg
                        aria-hidden="true"
                        viewBox="0 0 1440 320"
                        preserveAspectRatio="none"
                        className="absolute inset-x-0 bottom-0 h-36 w-full text-white/[0.05]"
                    >
                        <path
                            fill="currentColor"
                            d="M0,192L60,186.7C120,181,240,171,360,170.7C480,171,600,181,720,186.7C840,192,960,192,1080,176C1200,160,1320,128,1380,112L1440,96L1440,320L0,320Z"
                        />
                    </svg>

                    <Container className="relative z-10 py-16 sm:py-20 lg:py-24">
                        <Link
                            href="/media-centre/notices"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-green-200 transition hover:text-white focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
                        >
                            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                            Back to all notices
                        </Link>

                        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-start">
                            <div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-green-100 backdrop-blur">
                                        {notice.category}
                                    </span>

                                    <span
                                        className={[
                                            "rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wide",
                                            statusStyles[notice.status],
                                        ].join(" ")}
                                    >
                                        {notice.status}
                                    </span>
                                </div>

                                <h1 className="mt-7 max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                                    {notice.title}
                                </h1>

                                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
                                    {notice.summary}
                                </p>

                                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 text-sm text-slate-300">
                                    <div className="flex items-center gap-2">
                                        <CalendarDays
                                            aria-hidden="true"
                                            className="h-5 w-5 text-green-200"
                                        />

                                        <span>
                                            Published {notice.displayPublishedDate}
                                        </span>
                                    </div>

                                    {notice.displayClosingDate ? (
                                        <div className="flex items-center gap-2">
                                            <Clock3
                                                aria-hidden="true"
                                                className="h-5 w-5 text-green-200"
                                            />

                                            <span>
                                                Closing {notice.displayClosingDate}
                                            </span>
                                        </div>
                                    ) : null}

                                    {notice.location ? (
                                        <div className="flex items-center gap-2">
                                            <MapPin
                                                aria-hidden="true"
                                                className="h-5 w-5 text-green-200"
                                            />

                                            <span>{notice.location}</span>
                                        </div>
                                    ) : null}
                                </div>
                            </div>

                            <aside className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
                                <p className="text-sm font-bold uppercase tracking-[0.15em] text-green-200">
                                    Notice reference
                                </p>

                                <p className="mt-3 break-words text-xl font-bold">
                                    {notice.referenceNumber}
                                </p>

                                <div className="mt-6 space-y-5 border-t border-white/10 pt-6">
                                    <div className="flex items-start gap-3">
                                        <Tag
                                            aria-hidden="true"
                                            className="mt-0.5 h-5 w-5 shrink-0 text-green-200"
                                        />

                                        <div>
                                            <p className="text-sm text-slate-300">
                                                Category
                                            </p>

                                            <p className="mt-1 font-semibold">
                                                {notice.category}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Building2
                                            aria-hidden="true"
                                            className="mt-0.5 h-5 w-5 shrink-0 text-green-200"
                                        />

                                        <div>
                                            <p className="text-sm text-slate-300">
                                                Issuing department
                                            </p>

                                            <p className="mt-1 font-semibold">
                                                {notice.department ?? "Ministry"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Landmark
                                            aria-hidden="true"
                                            className="mt-0.5 h-5 w-5 shrink-0 text-green-200"
                                        />

                                        <div>
                                            <p className="text-sm text-slate-300">
                                                Notice status
                                            </p>

                                            <p className="mt-1 font-semibold">
                                                {notice.status}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </Container>
                </section>

                <section className="bg-white py-16 sm:py-20">
                    <Container>
                        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
                            <article>
                                <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-950 prose-p:leading-8 prose-a:text-green-700 prose-a:no-underline hover:prose-a:text-green-900">
                                    {notice.content.map((paragraph, index) => (
                                        <p key={`${notice.slug}-paragraph-${index}`}>
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>

                                {notice.attachments && notice.attachments.length > 0 ? (
                                    <section
                                        aria-labelledby="notice-documents-heading"
                                        className="mt-12 border-t border-slate-200 pt-10"
                                    >
                                        <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                                            Official documents
                                        </p>

                                        <h2
                                            id="notice-documents-heading"
                                            className="mt-3 text-3xl font-bold text-slate-950"
                                        >
                                            Downloads and Attachments
                                        </h2>

                                        <div className="mt-7 space-y-4">
                                            {notice.attachments.map((attachment) => (
                                                <a
                                                    key={attachment.url}
                                                    href={attachment.url}
                                                    download
                                                    className="group flex flex-col gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-green-300 hover:bg-green-50 sm:flex-row sm:items-center sm:justify-between"
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                                                            <FileText
                                                                aria-hidden="true"
                                                                className="h-6 w-6"
                                                            />
                                                        </div>

                                                        <div>
                                                            <h3 className="font-bold text-slate-950 transition group-hover:text-green-800">
                                                                {attachment.title}
                                                            </h3>

                                                            <p className="mt-1 text-sm text-slate-500">
                                                                {attachment.type}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <span className="inline-flex items-center gap-2 font-semibold text-green-700">
                                                        Download

                                                        <Download
                                                            aria-hidden="true"
                                                            className="h-5 w-5"
                                                        />
                                                    </span>
                                                </a>
                                            ))}
                                        </div>
                                    </section>
                                ) : null}
                            </article>

                            <aside>
                                <div className="sticky top-28 space-y-6">
                                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                                        <h2 className="text-xl font-bold text-slate-950">
                                            Notice details
                                        </h2>

                                        <dl className="mt-6 space-y-5">
                                            <div>
                                                <dt className="text-sm text-slate-500">
                                                    Reference number
                                                </dt>

                                                <dd className="mt-1 break-words font-semibold text-slate-950">
                                                    {notice.referenceNumber}
                                                </dd>
                                            </div>

                                            <div>
                                                <dt className="text-sm text-slate-500">
                                                    Published date
                                                </dt>

                                                <dd className="mt-1 font-semibold text-slate-950">
                                                    {notice.displayPublishedDate}
                                                </dd>
                                            </div>

                                            {notice.displayClosingDate ? (
                                                <div>
                                                    <dt className="text-sm text-slate-500">
                                                        Closing date
                                                    </dt>

                                                    <dd className="mt-1 font-semibold text-slate-950">
                                                        {notice.displayClosingDate}
                                                    </dd>
                                                </div>
                                            ) : null}

                                            {notice.location ? (
                                                <div>
                                                    <dt className="text-sm text-slate-500">
                                                        Location
                                                    </dt>

                                                    <dd className="mt-1 font-semibold text-slate-950">
                                                        {notice.location}
                                                    </dd>
                                                </div>
                                            ) : null}

                                            <div>
                                                <dt className="text-sm text-slate-500">
                                                    Department
                                                </dt>

                                                <dd className="mt-1 font-semibold text-slate-950">
                                                    {notice.department ?? "Ministry"}
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>

                                    {notice.applicationUrl &&
                                        notice.status !== "Closed" ? (
                                        <div className="rounded-3xl bg-[linear-gradient(145deg,#071d24_0%,#0a322f_55%,#0a4350_100%)] p-6 text-white shadow-xl">
                                            <h2 className="text-xl font-bold">
                                                Application or response
                                            </h2>

                                            <p className="mt-3 leading-7 text-slate-300">
                                                Follow the official link to continue with the
                                                application or submission process.
                                            </p>

                                            <Link
                                                href={notice.applicationUrl}
                                                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-300 px-5 py-3 font-bold text-slate-950 transition hover:bg-green-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
                                            >
                                                Continue online

                                                <ExternalLink
                                                    aria-hidden="true"
                                                    className="h-5 w-5"
                                                />
                                            </Link>
                                        </div>
                                    ) : null}
                                </div>
                            </aside>
                        </div>
                    </Container>
                </section>

                {relatedNotices.length > 0 ? (
                    <section
                        aria-labelledby="related-notices-heading"
                        className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20"
                    >
                        <Container>
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                                        More public information
                                    </p>

                                    <h2
                                        id="related-notices-heading"
                                        className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                                    >
                                        Related Notices
                                    </h2>
                                </div>

                                <Link
                                    href="/media-centre/notices"
                                    className="inline-flex items-center gap-2 font-semibold text-green-700 transition hover:text-green-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                                >
                                    View all notices

                                    <ArrowRight
                                        aria-hidden="true"
                                        className="h-4 w-4"
                                    />
                                </Link>
                            </div>

                            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {relatedNotices.map((relatedNotice) => (
                                    <article
                                        key={relatedNotice.slug}
                                        className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-xl"
                                    >
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-green-800">
                                                {relatedNotice.category}
                                            </span>

                                            <span
                                                className={[
                                                    "rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wide",
                                                    statusStyles[relatedNotice.status],
                                                ].join(" ")}
                                            >
                                                {relatedNotice.status}
                                            </span>
                                        </div>

                                        <h3 className="mt-5 text-xl font-bold leading-8 text-slate-950">
                                            <Link
                                                href={`/media-centre/notices/${relatedNotice.slug}`}
                                                className="transition hover:text-green-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                                            >
                                                {relatedNotice.title}
                                            </Link>
                                        </h3>

                                        <p className="mt-4 line-clamp-3 leading-7 text-slate-600">
                                            {relatedNotice.summary}
                                        </p>

                                        <div className="mt-auto flex items-center justify-between gap-4 border-t border-slate-200 pt-5">
                                            <span className="text-sm text-slate-500">
                                                {relatedNotice.displayPublishedDate}
                                            </span>

                                            <Link
                                                href={`/media-centre/notices/${relatedNotice.slug}`}
                                                aria-label={`Read ${relatedNotice.title}`}
                                                className="inline-flex items-center gap-2 font-semibold text-green-700 transition hover:text-green-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                                            >
                                                Read notice

                                                <ArrowRight
                                                    aria-hidden="true"
                                                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                                                />
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </Container>
                    </section>
                ) : null}
            </main>

            <SiteFooter />
        </>
    )
}