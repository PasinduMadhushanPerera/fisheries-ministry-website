"use client"

import { useEffect, useState } from "react"
import {
  TrendingUp,
  Anchor,
  Ship,
  Building2,
  Users,
  DollarSign,
  LucideIcon,
  BarChart3,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { summaryCards as fallbackSummaryCards } from "@/data/fisheries-statistics"
import type { ApiSummaryCard } from "@/lib/api/fisheries-statistics"

const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  Anchor,
  Ship,
  Building2,
  Users,
  DollarSign,
  BarChart3,
}

interface StatisticsSummaryProps {
  cards?: ApiSummaryCard[]
}

function parseNumericString(val: string) {
  const match = val.match(/^([^\d.]*)([\d,]+(?:\.\d+)?)(.*)$/)
  if (!match) return null

  const prefix = match[1]
  const rawNumStr = match[2]
  const suffix = match[3]

  const hasCommas = rawNumStr.includes(",")
  const decimalMatch = rawNumStr.match(/\.(\d+)/)
  const decimalPlaces = decimalMatch ? decimalMatch[1].length : 0
  const targetNum = parseFloat(rawNumStr.replace(/,/g, ""))

  if (isNaN(targetNum)) return null

  return { prefix, targetNum, suffix, hasCommas, decimalPlaces }
}

function formatNumber(num: number, hasCommas: boolean, decimalPlaces: number): string {
  if (decimalPlaces > 0) {
    const fixed = num.toFixed(decimalPlaces)
    if (hasCommas) {
      const parts = fixed.split(".")
      parts[0] = parseInt(parts[0], 10).toLocaleString("en-US")
      return parts.join(".")
    }
    return fixed
  } else {
    const rounded = Math.round(num)
    if (hasCommas) {
      return rounded.toLocaleString("en-US")
    }
    return rounded.toString()
  }
}

function CountUpNumber({ value }: { value: string | number }) {
  const strVal = String(value)
  const parsed = parseNumericString(strVal)
  const [displayValue, setDisplayValue] = useState<string>(() => {
    if (!parsed) return strVal
    return `${parsed.prefix}${formatNumber(0, parsed.hasCommas, parsed.decimalPlaces)}${parsed.suffix}`
  })

  useEffect(() => {
    if (!parsed) {
      setDisplayValue(strVal)
      return
    }

    const { prefix, targetNum, suffix, hasCommas, decimalPlaces } = parsed
    let animationFrameId: number
    const startTime = performance.now()
    const duration = 1800 // 1.8s count up duration

    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
    }

    const updateFrame = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutExpo(progress)
      const currentNum = targetNum * easedProgress

      const formattedCurrent = formatNumber(currentNum, hasCommas, decimalPlaces)
      setDisplayValue(`${prefix}${formattedCurrent}${suffix}`)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateFrame)
      } else {
        setDisplayValue(`${prefix}${formatNumber(targetNum, hasCommas, decimalPlaces)}${suffix}`)
      }
    }

    animationFrameId = requestAnimationFrame(updateFrame)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [strVal])

  return <span>{displayValue}</span>
}

export function StatisticsSummary({ cards }: StatisticsSummaryProps) {
  const displayCards = cards && cards.length > 0 ? cards : (fallbackSummaryCards as unknown as ApiSummaryCard[])

  return (
    <section className="relative py-10 sm:py-12 bg-slate-50/80 border-b border-slate-200/80 overflow-hidden" aria-label="Summary Statistics">
      <Container>
        {/* Section Header Badge */}
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/90 border border-emerald-200/80 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#256B29] shadow-2xs">
              <BarChart3 className="h-3.5 w-3.5" />
              <span>Key Fisheries Indicators</span>
            </span>
          </div>
          <span className="hidden sm:inline-block text-xs font-bold text-slate-400 uppercase tracking-widest">
            Annual National Highlights
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5">
          {displayCards.map((card, index) => {
            const Icon = iconMap[card.icon_name] || TrendingUp
            return (
              <div
                key={card.id || index}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-gradient-to-br from-white via-emerald-50/20 to-teal-50/40 p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/10"
              >
                {/* 1. Visible Top Accent Bar (Always Visible) */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#256B29] via-emerald-500 to-teal-500 transition-all duration-300 group-hover:h-1.5" />

                {/* 2. Visible Corner Glow Highlight (Always Visible) */}
                <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-emerald-100/70 blur-xl transition-opacity duration-300 group-hover:bg-emerald-200/80" />

                {/* 3. Visible Watermark Graphic Icon (Always Visible) */}
                <Icon
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-3 -right-3 h-24 w-24 text-emerald-900/10 transition-all duration-500 group-hover:scale-110 group-hover:text-[#256B29]/15"
                />

                {/* 4. Visible Micro Grid Pattern (Always Visible) */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#256B29_1.2px,transparent_1.2px)] [background-size:14px_14px] opacity-[0.06]" />

                {/* Top Row: Icon Box + Year Badge */}
                <div className="relative z-10 flex items-center justify-between gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#256B29] ring-1 ring-emerald-500/20 transition-all duration-300 group-hover:bg-[#256B29] group-hover:text-white group-hover:scale-105 shadow-2xs">
                    <Icon className="h-5.5 w-5.5" aria-hidden="true" />
                  </div>
                  <span className="rounded-full bg-white/90 border border-emerald-200/80 px-2.5 py-0.5 text-[11px] font-extrabold text-[#256B29] shadow-2xs backdrop-blur-xs">
                    {card.year}
                  </span>
                </div>

                {/* Metric Details */}
                <div className="relative z-10 mt-5 flex flex-col">
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 line-clamp-1">
                    {card.title}
                  </p>
                  <p className="mt-1 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight group-hover:text-[#256B29] transition-colors">
                    <CountUpNumber value={card.value} />
                  </p>
                  <div className="mt-1.5 flex items-center">
                    <span className="inline-block rounded-md bg-white/90 border border-slate-200/80 px-2 py-0.5 text-[11px] font-semibold text-slate-600 truncate max-w-full shadow-2xs">
                      {card.unit}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
