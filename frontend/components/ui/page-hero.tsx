import { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight, Building2, Waves, type LucideIcon } from "lucide-react"

import { Container } from "@/components/ui/container"

export type PageHeroProps = {
  badgeIcon?: LucideIcon
  badgeText: string
  title: string
  highlightTitle?: string
  description: string
  highlights?: { label: string; icon: LucideIcon }[]
  primaryAction?: { label: string; href: string; icon?: LucideIcon }
  secondaryAction?: { label: string; href: string; icon?: LucideIcon }
  cardIcon?: LucideIcon
  cardEyebrow?: string
  cardTitle?: string
  cardDescription?: string
  cardFooter?: string
  children?: ReactNode
}

export function PageHero({
  badgeIcon: BadgeIcon = Building2,
  badgeText,
  title,
  highlightTitle,
  description,
  highlights,
  primaryAction,
  secondaryAction,
  cardIcon: CardIcon = Waves,
  cardEyebrow = "Ministry Information",
  cardTitle = "Serving the nation through sustainable aquatic development",
  cardDescription = "Providing transparent public services, technical resources, regulations and official guidance.",
  cardFooter,
  children,
}: PageHeroProps) {
  return (
    <section
      aria-labelledby="page-hero-heading"
      className="relative isolate overflow-hidden bg-[#061d24] text-white"
    >
      {/* Background gradients */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,197,94,0.18),transparent_34%),radial-gradient(circle_at_88%_12%,rgba(14,165,233,0.22),transparent_36%),linear-gradient(135deg,#061d24_0%,#0a322f_50%,#0a4350_100%)]"
      />

      {/* Decorative blurred circles */}
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full border border-white/10 bg-white/[0.025]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-56 -left-32 h-[36rem] w-[36rem] rounded-full border border-green-100/10 bg-green-300/[0.025]"
      />

      {/* Bottom wave decoration */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-40 w-full text-white/[0.04]"
      >
        <path
          fill="currentColor"
          d="M0,192L60,181.3C120,171,240,149,360,154.7C480,160,600,192,720,192C840,192,960,160,1080,154.7C1200,149,1320,171,1380,181.3L1440,192L1440,320L0,320Z"
        />
      </svg>

      <Container className="relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          {/* Left Column Content */}
          <div>
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur-md">
              <BadgeIcon aria-hidden="true" className="h-4 w-4 text-green-200" />
              <span>{badgeText}</span>
            </div>

            {/* Page Heading with Gradient text */}
            <h1
              id="page-hero-heading"
              className="mt-6 max-w-4xl text-4xl font-bold tracking-[-0.035em] sm:text-5xl lg:text-6xl"
            >
              <span className="block text-white">{title}</span>
              {highlightTitle && (
                <span className="block bg-gradient-to-r from-green-200 via-cyan-200 to-sky-200 bg-clip-text text-transparent">
                  {highlightTitle}
                </span>
              )}
            </h1>

            {/* Subtitle / Description */}
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
              {description}
            </p>

            {/* Highlights pills */}
            {highlights && highlights.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {highlights.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.label}
                      className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm font-semibold text-slate-200"
                    >
                      <Icon aria-hidden="true" className="h-4 w-4 text-green-200" />
                      <span>{item.label}</span>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Actions */}
            {(primaryAction || secondaryAction) && (
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {primaryAction && (
                  <Link
                    href={primaryAction.href}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 shadow-md transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                  >
                    <span>{primaryAction.label}</span>
                    {primaryAction.icon ? (
                      <primaryAction.icon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    )}
                  </Link>
                )}

                {secondaryAction && (
                  <Link
                    href={secondaryAction.href}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                  >
                    {secondaryAction.icon && (
                      <secondaryAction.icon className="h-5 w-5" aria-hidden="true" />
                    )}
                    <span>{secondaryAction.label}</span>
                  </Link>
                )}
              </div>
            )}

            {children}
          </div>

          {/* Right Column Glassmorphism Card */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-8 rounded-full bg-cyan-400/10 blur-3xl"
            />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-7 shadow-2xl backdrop-blur-xl sm:p-9">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-300 text-slate-950 shadow-lg">
                <CardIcon aria-hidden="true" className="h-8 w-8" />
              </div>

              <p className="mt-8 text-sm font-bold uppercase tracking-[0.16em] text-green-200">
                {cardEyebrow}
              </p>

              <h2 className="mt-3 text-2xl font-bold leading-snug sm:text-3xl text-white">
                {cardTitle}
              </h2>

              <p className="mt-5 leading-8 text-slate-300">
                {cardDescription}
              </p>

              {cardFooter && (
                <div className="mt-7 border-t border-white/10 pt-6">
                  <p className="text-sm leading-6 text-slate-300">
                    {cardFooter}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
