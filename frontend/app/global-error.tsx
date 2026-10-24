"use client"

import { useEffect } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[Ministry Web Portal] Global root error:", error.message)
  }, [error])

  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-800 font-sans">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 mb-5">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <h1 className="text-xl font-extrabold text-slate-900">
            System Error / යම් දෝෂයක් සිදු විය
          </h1>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            The Ministry of Fisheries portal encountered an unexpected issue while loading. Please refresh or try again shortly.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#256B29] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#1b521f] transition cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Try again / නැවත උත්සාහ කරන්න</span>
            </button>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              Go to Homepage / මුල් පිටුවට
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
