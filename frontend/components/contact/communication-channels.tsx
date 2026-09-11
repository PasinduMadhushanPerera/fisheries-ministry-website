"use client"

import { Globe, Video, Share2, Bell, ArrowRight, ShieldCheck } from "lucide-react"

import { Container } from "@/components/ui/container"
import { socialChannels } from "@/data/contact-data"
import { useLanguage } from "@/src/contexts/LanguageContext"

export function CommunicationChannels() {
  const { language } = useLanguage()

  const isSi = language === "si"
  const isTa = language === "ta"

  const title = isSi
    ? "අප හා සම්බන්ධ වී සිටින්න"
    : isTa
    ? "தொடர்பில் இருங்கள்"
    : "Stay Connected"

  const subtitle = isSi
    ? "තහවුරු කරන ලද නිවේදන, වීඩියෝ සහ රැකියා යාවත්කාලීන සඳහා අමාත්‍යාංශයේ නිල නාලිකා අනුගමනය කරන්න."
    : isTa
    ? "அங்கீகரிக்கப்பட்ட அறிவிப்புகள், வீடியோக்கள் மற்றும் தொழில் புதுப்பிப்புகளுக்கு அதிகாரப்பூர்வ அமைச்சு சேனல்களைப் பின்தொடரவும்."
    : "Follow official Ministry channels for verified announcements, videos, and career updates."

  const bannerText = isSi
    ? "සත්‍ය පුවත්, ටෙන්ඩර් නිකුතු සහ ප්‍රතිපත්ති අනාවරණයන් සඳහා අමාත්‍යාංශයේ නිල සන්නිවේදන නාලිකා පමණක් භාවිතා කරන්න."
    : isTa
    ? "உண்மையான செய்திகள், டெண்டர் வெளியீடுகள் மற்றும் கொள்கை வெளிப்பாடுகளுக்கு அதிகாரப்பூர்வ அமைச்சு தகவல்தொடர்பு சேனல்களை மட்டுமே பயன்படுத்தவும்."
    : "Use only official Ministry communication channels for authentic news, tender releases, and policy disclosures."

  const buttonText = isSi ? "විමසීමක් යොමු කරන්න" : isTa ? "விசாரணையை அனுப்புங்கள்" : "Send Inquiry"

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Facebook":
        return <Globe className="h-5 w-5 text-blue-600" aria-hidden="true" />
      case "Youtube":
        return <Video className="h-5 w-5 text-red-600" aria-hidden="true" />
      case "Linkedin":
        return <Share2 className="h-5 w-5 text-sky-700" aria-hidden="true" />
      case "Bell":
        return <Bell className="h-5 w-5 text-emerald-600" aria-hidden="true" />
      default:
        return <Bell className="h-5 w-5 text-slate-600" aria-hidden="true" />
    }
  }

  return (
    <section className="py-10 bg-slate-50 border-b border-slate-200" aria-label="Official Communication Channels">
      <Container>
        {/* Section Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {subtitle}
            </p>
          </div>
        </div>

        {/* 4 Small Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {socialChannels.map((channel) => (
            <div
              key={channel.id}
              className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-2xs transition-all duration-200 hover:border-slate-300 hover:shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 group-hover:scale-105 transition-transform">
                  {getIcon(channel.iconName)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#388E3C] transition-colors leading-tight">
                    {channel.platform}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    {channel.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <a
                  href={channel.url}
                  target={channel.url.startsWith("http") ? "_blank" : undefined}
                  rel={channel.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex min-h-[36px] w-full items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  <span>{channel.buttonLabel}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Thin Notification Banner */}
        <div className="mt-6 rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2.5 text-xs font-semibold text-[#0B3D3A]">
            <ShieldCheck className="h-4 w-4 text-[#256B29] shrink-0" aria-hidden="true" />
            <span>{bannerText}</span>
          </div>

          <a
            href="#contact-form"
            className="inline-flex min-h-[36px] shrink-0 items-center justify-center gap-1 rounded-lg bg-[#388E3C] px-4 text-xs font-bold text-white transition hover:bg-[#256B29]"
          >
            <span>{buttonText}</span>
          </a>
        </div>
      </Container>
    </section>
  )
}
