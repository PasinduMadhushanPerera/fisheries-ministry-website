import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Download,
  ExternalLink,
  FileText,
  Mail,
  MapPin,
  Phone,
  Tag,
  UserRound,
} from "lucide-react"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Container } from "@/components/ui/container"
import {
  getPressReleaseBySlug,
  getRelatedPressReleases,
  pressReleases,
  type PressRelease,
} from "@/data/press-releases"

type PressReleaseDetailPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return pressReleases.map((pressRelease) => ({
    slug: pressRelease.slug,
  }))
}

export async function generateMetadata({
  params,
}: PressReleaseDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const pressRelease = getPressReleaseBySlug(slug)

  if (!pressRelease) {
    return {
      title: "Press Release Not Found",
      description:
        "The requested Ministry press release could not be found.",
    }
  }

  return {
    title: `${pressRelease.title} | Press Releases`,
    description: pressRelease.summary,
    alternates: {
      canonical: `/media-centre/press-releases/${pressRelease.slug}`,
    },
    openGraph: {
      title: pressRelease.title,
      description: pressRelease.summary,
      type: "article",
      publishedTime: pressRelease.publishedDate,
      images: pressRelease.image
        ? [
            {
              url:
                typeof pressRelease.image === "string"
                  ? pressRelease.image
                  : pressRelease.image.src,
              alt:
                pressRelease.imageAlt ??
                pressRelease.title,
            },
          ]
        : undefined,
    },
  }
}

function PressReleaseHero({
  pressRelease,
}: {
  pressRelease: PressRelease
}) {
  return (
    <section
      aria-labelledby="press-release-heading"
      className="relative isolate overflow-hidden bg-[#061d24] text-white"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,197,94,0.18),transparent_34%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,0.22),transparent_38%),linear-gradient(135deg,#061d24_0%,#0a322f_50%,#0a4350_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full border border-white/10 bg-white/[0.03]"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-48 -left-32 h-[30rem] w-[30rem] rounded-full border border-green-200/10 bg-green-300/[0.03]"
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
        <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <Link
              href="/media-centre/press-releases"
              className="inline-flex items-center gap-2 text-sm font-semibold text-green-200 transition hover:text-white focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
            >
              <ArrowLeft
                aria-hidden="true"
                className="h-4 w-4"
              />

              Back to press releases
            </Link>

            {/* <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md">
              <FileText
                aria-hidden="true"
                className="h-4 w-4 text-green-200"
              />

              Official Press Release
            </div> */}

            <h1
              id="press-release-heading"
              className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
            >
              {pressRelease.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              {pressRelease.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CalendarDays
                  aria-hidden="true"
                  className="h-5 w-5 text-green-200"
                />

                <time dateTime={pressRelease.publishedDate}>
                  {pressRelease.displayDate}
                </time>
              </div>

              {pressRelease.location ? (
                <div className="flex items-center gap-2">
                  <MapPin
                    aria-hidden="true"
                    className="h-5 w-5 text-green-200"
                  />

                  <span>{pressRelease.location}</span>
                </div>
              ) : null}

              <div className="flex items-center gap-2">
                <Tag
                  aria-hidden="true"
                  className="h-5 w-5 text-green-200"
                />

                <span>{pressRelease.category}</span>
              </div>
            </div>

            {pressRelease.documentUrl ? (
              <Link
                href={pressRelease.documentUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-9 inline-flex items-center gap-3 rounded-lg bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-green-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
              >
                <Download
                  aria-hidden="true"
                  className="h-5 w-5"
                />

                Download Official PDF

                <ExternalLink
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </Link>
            ) : null}
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-8 rounded-full bg-cyan-400/10 blur-3xl"
            />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-7 shadow-2xl backdrop-blur-xl sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-200">
                Release information
              </p>

              <div className="mt-6 space-y-5">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                  <p className="text-sm text-slate-300">
                    Reference number
                  </p>

                  <p className="mt-2 break-words text-xl font-bold text-white">
                    {pressRelease.referenceNumber}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                    <CalendarDays
                      aria-hidden="true"
                      className="h-6 w-6 text-green-200"
                    />

                    <p className="mt-4 text-sm text-slate-300">
                      Published
                    </p>

                    <p className="mt-1 font-semibold text-white">
                      {pressRelease.displayDate}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                    <Tag
                      aria-hidden="true"
                      className="h-6 w-6 text-green-200"
                    />

                    <p className="mt-4 text-sm text-slate-300">
                      Category
                    </p>

                    <p className="mt-1 font-semibold text-white">
                      {pressRelease.category}
                    </p>
                  </div>
                </div>

                {pressRelease.location ? (
                  <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/10 p-5">
                    <MapPin
                      aria-hidden="true"
                      className="mt-0.5 h-6 w-6 shrink-0 text-green-200"
                    />

                    <div>
                      <p className="text-sm text-slate-300">
                        Issued from
                      </p>

                      <p className="mt-1 font-semibold text-white">
                        {pressRelease.location}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function PressReleaseContent({
  pressRelease,
}: {
  pressRelease: PressRelease
}) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <article>
            {pressRelease.image ? (
              <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-lg">
                <Image
                  src={pressRelease.image}
                  alt={
                    pressRelease.imageAlt ??
                    pressRelease.title
                  }
                  fill
                  priority
                  sizes="(min-width: 1024px) 70vw, 100vw"
                  className="object-cover"
                />
              </div>
            ) : null}

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
              <div className="border-b border-slate-200 pb-6">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                  Official statement
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                  Press Release
                </h2>
              </div>

              <div className="mt-8 space-y-6 text-lg leading-9 text-slate-700">
                {pressRelease.content.map((paragraph, index) => (
                  <p key={`${pressRelease.slug}-${index}`}>
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-10 rounded-2xl border border-green-200 bg-green-50 p-6">
                <div className="flex items-start gap-4">
                  <FileText
                    aria-hidden="true"
                    className="mt-1 h-6 w-6 shrink-0 text-green-700"
                  />

                  <div>
                    <h3 className="font-bold text-slate-950">
                      Official Ministry Communication
                    </h3>

                    <p className="mt-2 leading-7 text-slate-600">
                      This press release is an official public
                      communication issued by the Ministry of
                      Fisheries, Aquatic and Ocean Resources.
                    </p>
                  </div>
                </div>
              </div>

              {pressRelease.documentUrl ? (
                <div className="mt-8 flex flex-wrap gap-4 border-t border-slate-200 pt-8">
                  <Link
                    href={pressRelease.documentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                  >
                    <Download
                      aria-hidden="true"
                      className="h-5 w-5"
                    />

                    Download Official PDF
                  </Link>

                  <Link
                    href="/media-centre/press-releases"
                    className="inline-flex items-center gap-3 rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:border-green-300 hover:bg-green-50 hover:text-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                  >
                    <ArrowLeft
                      aria-hidden="true"
                      className="h-5 w-5"
                    />

                    All Press Releases
                  </Link>
                </div>
              ) : null}
            </div>
          </article>

          <aside
            aria-label="Press release information"
            className="space-y-6 lg:sticky lg:top-28 lg:self-start"
          >
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                Release details
              </p>

              <dl className="mt-6 space-y-5">
                <div className="border-b border-slate-200 pb-5">
                  <dt className="text-sm text-slate-500">
                    Reference number
                  </dt>

                  <dd className="mt-1 break-words font-bold text-slate-950">
                    {pressRelease.referenceNumber}
                  </dd>
                </div>

                <div className="border-b border-slate-200 pb-5">
                  <dt className="text-sm text-slate-500">
                    Publication date
                  </dt>

                  <dd className="mt-1 font-semibold text-slate-950">
                    {pressRelease.displayDate}
                  </dd>
                </div>

                <div className="border-b border-slate-200 pb-5">
                  <dt className="text-sm text-slate-500">
                    Category
                  </dt>

                  <dd className="mt-1 font-semibold text-slate-950">
                    {pressRelease.category}
                  </dd>
                </div>

                {pressRelease.location ? (
                  <div>
                    <dt className="text-sm text-slate-500">
                      Location
                    </dt>

                    <dd className="mt-1 font-semibold text-slate-950">
                      {pressRelease.location}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </div>

            <div className="rounded-3xl bg-[linear-gradient(145deg,#071d24_0%,#0a322f_55%,#0a4350_100%)] p-6 text-white shadow-xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-200">
                Media contact
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Contact Information
              </h2>

              <div className="mt-6 space-y-5">
                {pressRelease.contactName ? (
                  <div className="flex items-start gap-3">
                    <UserRound
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0 text-green-200"
                    />

                    <div>
                      <p className="font-semibold">
                        {pressRelease.contactName}
                      </p>

                      {pressRelease.contactTitle ? (
                        <p className="mt-1 text-sm leading-6 text-slate-300">
                          {pressRelease.contactTitle}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ) : null}

                {pressRelease.contactEmail ? (
                  <div className="flex items-start gap-3">
                    <Mail
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0 text-green-200"
                    />

                    <a
                      href={`mailto:${pressRelease.contactEmail}`}
                      className="break-all text-slate-200 transition hover:text-white focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
                    >
                      {pressRelease.contactEmail}
                    </a>
                  </div>
                ) : null}

                {pressRelease.contactPhone ? (
                  <div className="flex items-start gap-3">
                    <Phone
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0 text-green-200"
                    />

                    <a
                      href={`tel:${pressRelease.contactPhone.replace(
                        /\s/g,
                        "",
                      )}`}
                      className="text-slate-200 transition hover:text-white focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
                    >
                      {pressRelease.contactPhone}
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  )
}

function RelatedPressReleases({
  pressRelease,
}: {
  pressRelease: PressRelease
}) {
  const relatedPressReleases =
    getRelatedPressReleases(pressRelease)

  if (relatedPressReleases.length === 0) {
    return null
  }

  return (
    <section
      aria-labelledby="related-press-releases-heading"
      className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20"
    >
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
              More official updates
            </p>

            <h2
              id="related-press-releases-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
            >
              Related Press Releases
            </h2>
          </div>

          <Link
            href="/media-centre/press-releases"
            className="inline-flex items-center gap-2 font-semibold text-green-700 transition hover:text-green-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
          >
            View all press releases

            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4"
            />
          </Link>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {relatedPressReleases.map((relatedPressRelease) => (
            <article
              key={relatedPressRelease.slug}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl"
            >
              <Link
                href={`/media-centre/press-releases/${relatedPressRelease.slug}`}
                className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
              >
                <Image
                  src={
                    relatedPressRelease.image ??
                    "/images/placeholder.jpg"
                  }
                  alt={
                    relatedPressRelease.imageAlt ??
                    relatedPressRelease.title
                  }
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"
                />

                <span className="absolute left-4 top-4 rounded-full bg-green-700 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
                  {relatedPressRelease.category}
                </span>
              </Link>

              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <CalendarDays
                    aria-hidden="true"
                    className="h-4 w-4 text-green-700"
                  />

                  <time dateTime={relatedPressRelease.publishedDate}>
                    {relatedPressRelease.displayDate}
                  </time>
                </div>

                <h3 className="mt-4 text-xl font-bold leading-8 text-slate-950">
                  <Link
                    href={`/media-centre/press-releases/${relatedPressRelease.slug}`}
                    className="transition hover:text-green-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                  >
                    {relatedPressRelease.title}
                  </Link>
                </h3>

                <p className="mt-3 line-clamp-3 leading-7 text-slate-600">
                  {relatedPressRelease.summary}
                </p>

                <Link
                  href={`/media-centre/press-releases/${relatedPressRelease.slug}`}
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-green-700 transition hover:text-green-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                >
                  Read press release

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
  )
}

export default async function PressReleaseDetailPage({
  params,
}: PressReleaseDetailPageProps) {
  const { slug } = await params
  const pressRelease = getPressReleaseBySlug(slug)

  if (!pressRelease) {
    notFound()
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
      label: "Press Releases",
      href: "/media-centre/press-releases",
    },
    {
      label: pressRelease.title,
    },
  ]

  return (
    <>
      <SiteHeader />

      <main>
        <Breadcrumb items={breadcrumbItems} />

        <PressReleaseHero pressRelease={pressRelease} />

        <PressReleaseContent pressRelease={pressRelease} />

        <RelatedPressReleases pressRelease={pressRelease} />
      </main>

      <SiteFooter />
    </>
  )
}