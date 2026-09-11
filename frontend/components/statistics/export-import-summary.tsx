import {
  TrendingUp,
  TrendingDown,
  Scale,
  Ship,
  Container as ContainerIcon,
  Calendar,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { tradeMetrics as fallbackMetrics } from "@/data/export-import-reports"
import type { ApiTradeMetric } from "@/lib/api/export-import-statistics"

interface ExportImportSummaryProps {
  metrics?: ApiTradeMetric[]
  heading?: string
}

export function ExportImportSummary({ metrics, heading }: ExportImportSummaryProps) {
  const displayMetrics: ApiTradeMetric[] =
    metrics && metrics.length > 0
      ? metrics
      : (fallbackMetrics as unknown as ApiTradeMetric[])

  const getMetricIcon = (iconType: string) => {
    switch (iconType) {
      case "export-val":
        return <TrendingUp className="h-5 w-5 text-white" aria-hidden="true" />
      case "import-val":
        return <TrendingDown className="h-5 w-5 text-white" aria-hidden="true" />
      case "balance":
        return <Scale className="h-5 w-5 text-white" aria-hidden="true" />
      case "export-qty":
        return <Ship className="h-5 w-5 text-white" aria-hidden="true" />
      case "import-qty":
        return <ContainerIcon className="h-5 w-5 text-white" aria-hidden="true" />
      case "latest-month":
        return <Calendar className="h-5 w-5 text-white" aria-hidden="true" />
      default:
        return <TrendingUp className="h-5 w-5 text-white" aria-hidden="true" />
    }
  }

  const getCardTheme = (iconType: string) => {
    switch (iconType) {
      case "export-val":
        return {
          cardBg: "bg-linear-to-br from-emerald-50/90 via-emerald-50/40 to-white border-emerald-200/90 hover:border-emerald-400 hover:shadow-md",
          iconBox: "bg-linear-to-br from-[#256B29] to-[#1b501f] shadow-emerald-700/20 shadow-xs",
          titleColor: "text-emerald-900/80 font-bold",
          valueColor: "text-[#0B3D3A]",
          unitColor: "text-emerald-800 font-bold",
          footerBorder: "border-emerald-100/90",
          periodColor: "text-emerald-700 font-semibold",
          badgeStyle: "bg-emerald-100 text-[#256B29] border-emerald-200/90",
        }
      case "import-val":
        return {
          cardBg: "bg-linear-to-br from-amber-50/90 via-amber-50/40 to-white border-amber-200/90 hover:border-amber-400 hover:shadow-md",
          iconBox: "bg-linear-to-br from-amber-500 to-amber-600 shadow-amber-600/20 shadow-xs",
          titleColor: "text-amber-900/80 font-bold",
          valueColor: "text-amber-950",
          unitColor: "text-amber-800 font-bold",
          footerBorder: "border-amber-100/90",
          periodColor: "text-amber-700 font-semibold",
          badgeStyle: "bg-amber-100 text-amber-900 border-amber-200/90",
        }
      case "balance":
        return {
          cardBg: "bg-linear-to-br from-teal-50/90 via-teal-50/40 to-white border-teal-200/90 hover:border-teal-400 hover:shadow-md",
          iconBox: "bg-linear-to-br from-[#0B3D3A] to-[#082e2c] shadow-teal-900/20 shadow-xs",
          titleColor: "text-teal-900/80 font-bold",
          valueColor: "text-[#0B3D3A]",
          unitColor: "text-teal-800 font-bold",
          footerBorder: "border-teal-100/90",
          periodColor: "text-teal-700 font-semibold",
          badgeStyle: "bg-teal-100 text-[#0B3D3A] border-teal-200/90",
        }
      case "export-qty":
        return {
          cardBg: "bg-linear-to-br from-sky-50/90 via-blue-50/40 to-white border-blue-200/90 hover:border-blue-400 hover:shadow-md",
          iconBox: "bg-linear-to-br from-blue-600 to-blue-700 shadow-blue-600/20 shadow-xs",
          titleColor: "text-blue-900/80 font-bold",
          valueColor: "text-blue-950",
          unitColor: "text-blue-800 font-bold",
          footerBorder: "border-blue-100/90",
          periodColor: "text-blue-700 font-semibold",
          badgeStyle: "bg-blue-100 text-blue-900 border-blue-200/90",
        }
      case "import-qty":
        return {
          cardBg: "bg-linear-to-br from-indigo-50/90 via-indigo-50/40 to-white border-indigo-200/90 hover:border-indigo-400 hover:shadow-md",
          iconBox: "bg-linear-to-br from-indigo-600 to-indigo-700 shadow-indigo-600/20 shadow-xs",
          titleColor: "text-indigo-900/80 font-bold",
          valueColor: "text-indigo-950",
          unitColor: "text-indigo-800 font-bold",
          footerBorder: "border-indigo-100/90",
          periodColor: "text-indigo-700 font-semibold",
          badgeStyle: "bg-indigo-100 text-indigo-900 border-indigo-200/90",
        }
      case "latest-month":
        return {
          cardBg: "bg-linear-to-br from-slate-100/90 via-slate-50 to-white border-slate-300/80 hover:border-slate-400 hover:shadow-md",
          iconBox: "bg-linear-to-br from-slate-800 to-slate-900 shadow-slate-800/20 shadow-xs",
          titleColor: "text-slate-700 font-bold",
          valueColor: "text-slate-900",
          unitColor: "text-slate-600 font-bold",
          footerBorder: "border-slate-200",
          periodColor: "text-slate-600 font-semibold",
          badgeStyle: "bg-slate-200/80 text-slate-800 border-slate-300",
        }
      default:
        return {
          cardBg: "bg-linear-to-br from-emerald-50/90 via-emerald-50/40 to-white border-emerald-200/90 hover:border-emerald-400 hover:shadow-md",
          iconBox: "bg-linear-to-br from-[#256B29] to-[#1b501f] shadow-emerald-700/20 shadow-xs",
          titleColor: "text-emerald-900/80 font-bold",
          valueColor: "text-[#0B3D3A]",
          unitColor: "text-emerald-800 font-bold",
          footerBorder: "border-emerald-100/90",
          periodColor: "text-emerald-700 font-semibold",
          badgeStyle: "bg-emerald-100 text-[#256B29] border-emerald-200/90",
        }
    }
  }

  return (
    <section
      className="py-10 bg-white border-b border-slate-200"
      aria-label="Trade and Commerce Summary"
    >
      <Container>
        {heading && (
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-950 tracking-tight">
              {heading}
            </h2>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {displayMetrics.map((metric) => {
            const theme = getCardTheme(metric.iconType)

            return (
              <div
                key={metric.id}
                className={`relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-200 shadow-2xs ${theme.cardBg}`}
              >
                <div>
                  {/* Top Bar: Icon and Trend Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${theme.iconBox}`}
                    >
                      {getMetricIcon(metric.iconType)}
                    </div>
                    {metric.trend && (
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${theme.badgeStyle}`}
                      >
                        {metric.trend}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className={`text-xs font-bold uppercase tracking-wider ${theme.titleColor}`}>
                    {metric.title}
                  </h3>

                  {/* Numeric Value & Unit */}
                  <div className="mt-2 flex items-baseline gap-2 flex-wrap">
                    <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${theme.valueColor}`}>
                      {metric.value}
                    </span>
                    <span className={`text-sm ${theme.unitColor}`}>
                      {metric.unit}
                    </span>
                  </div>
                </div>

                {/* Footer: Reporting Period */}
                <div
                  className={`mt-5 pt-3 border-t flex items-center justify-between text-xs ${theme.footerBorder}`}
                >
                  <span className={theme.periodColor}>{metric.period}</span>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
