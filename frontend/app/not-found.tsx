import Link from "next/link"
import { Home, Search, Compass, PhoneCall, FileText } from "lucide-react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Container } from "@/components/ui/container"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"

export const dynamic = "force-dynamic"

export default async function NotFoundPage() {
  const headerFooterData = await fetchHeaderFooterData("en")

  return (
    <>
      <SiteHeader initialHeader={headerFooterData?.header} />

      <main id="main-content" tabIndex={-1} className="outline-none min-h-[65vh] flex items-center py-16 bg-slate-50">
        <Container className="max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-[#1b5e20] border border-emerald-200 mb-6">
            <span>404 Error</span>
            <span>•</span>
            <span>Ministry of Fisheries, Sri Lanka</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Page Not Found
          </h1>

          <p className="mt-2 text-base font-semibold text-[#256B29]">
            ඔබ සොයන පිටුව හමු නොවීය • பக்கம் கிடைக்கவில்லை
          </p>

          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
            The page you are looking for may have been moved, renamed, or is temporarily unavailable. Please check the URL, search our portal, or navigate back to the home page.
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-[#256B29] hover:bg-[#1b521f] px-5 py-3 text-sm font-bold text-white shadow-sm transition"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              <span>Return to Homepage</span>
            </Link>

            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 px-5 py-3 text-sm font-bold text-slate-700 shadow-2xs transition"
            >
              <Search className="h-4 w-4 text-slate-500" aria-hidden="true" />
              <span>Search Website</span>
            </Link>
          </div>

          {/* Popular Destinations */}
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs text-left max-w-xl mx-auto">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Compass className="h-3.5 w-3.5 text-[#256B29]" />
              <span>Popular Portals & Services</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <Link
                href="/about/overview"
                className="p-2.5 rounded-lg border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition font-medium text-slate-800 flex items-center justify-between"
              >
                <span>About the Ministry</span>
                <span className="text-slate-400">&rarr;</span>
              </Link>
              <Link
                href="/downloads"
                className="p-2.5 rounded-lg border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition font-medium text-slate-800 flex items-center justify-between"
              >
                <span>Downloadable Forms</span>
                <span className="text-slate-400">&rarr;</span>
              </Link>
              <Link
                href="/rti"
                className="p-2.5 rounded-lg border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition font-medium text-slate-800 flex items-center justify-between"
              >
                <span>Right to Information (RTI)</span>
                <span className="text-slate-400">&rarr;</span>
              </Link>
              <Link
                href="/statistics"
                className="p-2.5 rounded-lg border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition font-medium text-slate-800 flex items-center justify-between"
              >
                <span>Fisheries Statistics</span>
                <span className="text-slate-400">&rarr;</span>
              </Link>
              <Link
                href="/procurement"
                className="p-2.5 rounded-lg border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition font-medium text-slate-800 flex items-center justify-between"
              >
                <span>Tenders & Procurement</span>
                <span className="text-slate-400">&rarr;</span>
              </Link>
              <Link
                href="/contact"
                className="p-2.5 rounded-lg border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition font-medium text-slate-800 flex items-center justify-between"
              >
                <span>Contact Directory</span>
                <span className="text-slate-400">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Emergency Hotline Contact */}
          <div className="mt-8 text-xs text-slate-500 flex items-center justify-center gap-2">
            <PhoneCall className="h-3.5 w-3.5 text-slate-400" />
            <span>Need assistance? Call Ministry Hotline: </span>
            <a href="tel:+94112446183" className="font-bold text-[#256B29] hover:underline">
              +94 112 446 183
            </a>
          </div>
        </Container>
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}
