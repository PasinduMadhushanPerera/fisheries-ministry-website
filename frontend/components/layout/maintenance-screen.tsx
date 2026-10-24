"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ShieldAlert, Clock, Phone, Mail, RefreshCw, Wrench, CheckCircle2 } from "lucide-react"
import type { ApiSiteMaintenanceSetting } from "@/lib/api/header-footer"
import { getApiBaseUrl } from "@/lib/utils"

interface MaintenanceScreenProps {
  maintenanceData?: ApiSiteMaintenanceSetting | null
}

export function MaintenanceScreen({ maintenanceData }: MaintenanceScreenProps) {
  const [isChecking, setIsChecking] = useState(false)

  // Auto-check every 15 seconds if maintenance mode has been turned off by admin
  useEffect(() => {
    const checkInterval = setInterval(async () => {
      try {
        const baseUrl = getApiBaseUrl()
        const res = await fetch(`${baseUrl}/api/v1/header-footer/maintenance/`, { cache: "no-store" })
        if (res.ok) {
          const data = await res.json()
          if (data && data.is_maintenance_mode === false) {
            window.location.reload()
          }
        }
      } catch (err) {
        // Silent error ignore during poll
      }
    }, 15000)

    return () => clearInterval(checkInterval)
  }, [])

  const handleManualRefresh = async () => {
    setIsChecking(true)
    try {
      const baseUrl = getApiBaseUrl()
      const res = await fetch(`${baseUrl}/api/v1/header-footer/maintenance/`, { cache: "no-store" })
      if (res.ok) {
        const data = await res.json()
        if (!data.is_maintenance_mode) {
          window.location.reload()
          return
        }
      }
    } catch (err) {
      // Silent catch
    } finally {
      setTimeout(() => setIsChecking(false), 800)
    }
  }

  const title = maintenanceData?.title || "Website Under Scheduled Maintenance"
  const message =
    maintenanceData?.message ||
    "The official website of the Ministry of Fisheries, Aquatic and Ocean Resources is currently undergoing system updates to serve you better. We apologize for any inconvenience caused."
  const estimatedTime = maintenanceData?.estimated_restoration || "Expected Restoration: Today at 6:00 PM"
  const phone = maintenanceData?.contact_phone || "+94 11 244 6183 / +94 11 244 6184"
  const email = maintenanceData?.contact_email || "info@fisheries.gov.lk"

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-between selection:bg-emerald-500 selection:text-white relative overflow-hidden font-sans">
      {/* Top Ministry Header Bar */}
      <header className="w-full border-b border-white/10 bg-slate-950 py-4 px-4 sm:px-8 relative z-10 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="relative flex shrink-0 items-center justify-center h-12 w-10 sm:h-14 sm:w-12">
              <Image
                src="/images/government/logo.jpg"
                alt="Emblem of Sri Lanka"
                width={48}
                height={60}
                className="h-full w-auto object-contain"
                priority
              />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-wider text-emerald-400">
                Government of Sri Lanka
              </p>
              <h1 className="text-sm sm:text-base font-extrabold text-white leading-tight">
                Ministry of Fisheries, Aquatic &amp; Ocean Resources
              </h1>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 text-xs font-bold text-amber-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span>Maintenance Mode Active</span>
          </div>
        </div>
      </header>

      {/* Main Hero Maintenance Box (Pure White Middle Body Background) */}
      <main className="w-full flex-1 flex items-center justify-center p-4 sm:p-8 my-auto relative z-10 bg-white">
        <div className="w-full max-w-2xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xl relative text-center flex flex-col items-center justify-center">
          {/* Animated Wrench & Pulse Badge */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-50 border border-amber-200/80 shadow-inner">
            <div className="relative">
              <Wrench className="h-10 w-10 text-amber-600 animate-bounce" />
            </div>
          </div>

          {/* Status Pill */}
          <div className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-xs font-bold text-emerald-800 mb-4 mx-auto">
            <ShieldAlert className="h-3.5 w-3.5 text-emerald-600" />
            <span>Scheduled System Maintenance &amp; Upgrade</span>
          </div>

          {/* Main Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-snug text-center mx-auto">
            {title}
          </h2>

          {/* Detailed Message */}
          <p className="mt-4 text-sm sm:text-base text-slate-700 leading-relaxed font-normal max-w-xl mx-auto text-center">
            {message}
          </p>

          {/* Estimated Completion Card */}
          <div className="mt-6 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-center gap-3 text-emerald-950 text-center mx-auto max-w-xl w-full">
            <div className="flex items-center justify-center gap-2 font-extrabold text-xs sm:text-sm text-center mx-auto text-emerald-900">
              <Clock className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
              <span>{estimatedTime}</span>
            </div>
          </div>

          {/* Emergency Contact & Inquiries */}
          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-center w-full">
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80 flex flex-col items-center justify-center gap-2 text-center">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 border border-emerald-200">
                <Phone className="h-4 w-4 text-emerald-700" />
              </div>
              <div className="min-w-0 text-center">
                <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  Emergency Phone
                </p>
                <p className="text-xs font-bold text-slate-900 truncate">{phone}</p>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80 flex flex-col items-center justify-center gap-2 text-center">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 border border-sky-200">
                <Mail className="h-4 w-4 text-sky-700" />
              </div>
              <div className="min-w-0 text-center">
                <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  Official Email
                </p>
                <p className="text-xs font-bold text-slate-900 truncate">{email}</p>
              </div>
            </div>
          </div>

          {/* Check Status Button */}
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={handleManualRefresh}
              disabled={isChecking}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#256B29] to-emerald-600 px-6 py-3 text-xs font-extrabold text-white shadow-md transition hover:from-[#1b4d1d] hover:to-emerald-700 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`h-4 w-4 ${isChecking ? "animate-spin" : ""}`} />
              <span>{isChecking ? "Checking Status..." : "Check if Website is Back Online"}</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer Bar */}
      <footer className="w-full border-t border-white/10 bg-slate-950 py-4 px-4 text-center text-xs text-slate-400 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Ministry of Fisheries, Aquatic &amp; Ocean Resources, Sri Lanka.</p>
          <p className="text-[11px] text-slate-400">Official Public Service Portal</p>
        </div>
      </footer>
    </div>
  )
}
