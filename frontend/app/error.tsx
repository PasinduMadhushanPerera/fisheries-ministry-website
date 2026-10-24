"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, Home, RefreshCw, PhoneCall, Mail } from "lucide-react"
import { Container } from "@/components/ui/container"
import { useLanguage } from "@/src/contexts/LanguageContext"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalErrorPage({ error, reset }: ErrorProps) {
  const { language } = useLanguage()

  useEffect(() => {
    // Log error securely to console without exposing sensitive data
    console.error("[Ministry Web Portal] Caught runtime exception:", error.message)
  }, [error])

  const title =
    language === "si"
      ? "යම් දෝෂයක් සිදු විය"
      : language === "ta"
      ? "ஏதோ தவறு நடந்துவிட்டது"
      : "Something went wrong"

  const description =
    language === "si"
      ? "මෙම පිටුව පූරණය කිරීමේදී බලාපොරොත්තු නොවූ තාක්ෂණික ගැටලුවක් ඇති විය. කරුණාකර පිටුව නැවත පූරණය කර උත්සාහ කරන්න හෝ මුල් පිටුව වෙත පිවිසෙන්න."
      : language === "ta"
      ? "இந்தப் பக்கத்தை ஏற்றுவதில் எதிர்பாராத பிழை ஏற்பட்டது. தயவுசெய்து மீண்டும் முயற்சிக்கவும் அல்லது முகப்புப் பக்கத்திற்குச் செல்லவும்."
      : "An unexpected issue occurred while processing your request. Please try reloading the page, or return to the Ministry's official homepage."

  const retryLabel =
    language === "si"
      ? "නැවත උත්සාහ කරන්න"
      : language === "ta"
      ? "மீண்டும் முயற்சிக்கவும்"
      : "Try Again"

  const homeLabel =
    language === "si"
      ? "මුල් පිටුවට යන්න"
      : language === "ta"
      ? "முகப்புப் பக்கம்"
      : "Return to Homepage"

  const contactLabel =
    language === "si"
      ? "සහාය සඳහා අමතන්න"
      : language === "ta"
      ? "தொடர்பு கொள்ள"
      : "Contact Support"

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-slate-50">
      <Container className="max-w-2xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-100 text-amber-700 shadow-sm border border-amber-200 mb-6">
          <AlertTriangle className="h-10 w-10" aria-hidden="true" />
        </div>

        <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider uppercase text-emerald-800 bg-emerald-100 rounded-full">
          Ministry of Fisheries, Sri Lanka
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h1>

        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg mx-auto">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-xl bg-[#256B29] hover:bg-[#1b521f] px-5 py-3 text-sm font-bold text-white shadow-sm transition cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            <span>{retryLabel}</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 px-5 py-3 text-sm font-bold text-slate-700 shadow-2xs transition"
          >
            <Home className="h-4 w-4 text-slate-500" aria-hidden="true" />
            <span>{homeLabel}</span>
          </Link>
        </div>

        {/* Help Info Box */}
        <div className="mt-10 pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600">
          <a
            href="tel:+94112446183"
            className="inline-flex items-center gap-1.5 font-semibold hover:text-[#256B29] transition-colors"
          >
            <PhoneCall className="h-3.5 w-3.5 text-slate-400" />
            <span>Hotline: +94 112 446 183</span>
          </a>

          <a
            href="mailto:info@fisheries.gov.lk"
            className="inline-flex items-center gap-1.5 font-semibold hover:text-[#256B29] transition-colors"
          >
            <Mail className="h-3.5 w-3.5 text-slate-400" />
            <span>info@fisheries.gov.lk</span>
          </a>

          <Link
            href="/contact"
            className="inline-flex items-center font-bold text-[#256B29] hover:underline"
          >
            <span>{contactLabel} &rarr;</span>
          </Link>
        </div>
      </Container>
    </div>
  )
}
