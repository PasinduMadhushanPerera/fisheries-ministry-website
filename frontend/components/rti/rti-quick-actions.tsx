"use client"

import { Scale, FileText, UserCheck, FolderOpen, ArrowRight } from "lucide-react"

import { Container } from "@/components/ui/container"
import { useLanguage } from "@/src/contexts/LanguageContext"

export function RtiQuickActions() {
  const { language } = useLanguage()

  const actions = [
    {
      title: language === "si" ? "තොරතුරු පනත" : language === "ta" ? "தகவல் அறியும் சட்டம்" : "View RTI Act",
      description: language === "si" ? "ප්‍රධාන පනත සහ ක්‍රියාපටිපාටිය" : language === "ta" ? "முதன்மைச் சட்டம் & நடைமுறைகள்" : "Principal legislation & procedures",
      href: "#rti-legal",
      icon: Scale,
      iconBg: "bg-emerald-50 text-[#256B29]",
    },
    {
      title: language === "si" ? "තොරතුරු ඉල්ලුම් පත්‍ර" : language === "ta" ? "විண்ணப்பப் படிவங்கள்" : "Download RTI Forms",
      description: language === "si" ? "ඉල්ලීම් (RTI 01) සහ අභියාචනා" : language === "ta" ? "கோரிக்கை (RTI 01) & மேல்முறையீடு" : "Request (RTI 01) & appeal forms",
      href: "#rti-library",
      icon: FileText,
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      title: language === "si" ? "තොරතුරු නිලධාරීන්" : language === "ta" ? "தகவல் அதிகாரிகள்" : "Contact Information Officer",
      description: language === "si" ? "නම්කළ සහ තොරතුරු නිලධාරීන්" : language === "ta" ? "நியமிக்கப்பட்ட & தகவல் அதிகாரிகள்" : "Designated & Information officers",
      href: "#rti-officers",
      icon: UserCheck,
      iconBg: "bg-amber-50 text-amber-600",
    },
    {
      title: language === "si" ? "වාර්තා සහ ප්‍රකාශන" : language === "ta" ? "அறிக்கைகள்" : "Browse Reports",
      description: language === "si" ? "අර්ධ වාර්ෂික වාර්තා" : language === "ta" ? "அரை ஆண்டு அறிக்கைகள்" : "Biannual reports & disclosures",
      href: "#rti-library",
      icon: FolderOpen,
      iconBg: "bg-teal-50 text-[#0B3D3A]",
    },
  ]

  return (
    <section className="py-6 bg-slate-100/70 border-b border-slate-200/80" aria-label="RTI Quick Actions">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {actions.map((action) => {
            const Icon = action.icon

            return (
              <a
                key={action.title}
                href={action.href}
                className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-2xs transition-all duration-200 hover:border-slate-300 hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#388E3C]"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-105 ${action.iconBg}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#388E3C] transition-colors leading-tight">
                      {action.title}
                    </h2>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {action.description}
                    </p>
                  </div>
                </div>

                <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-[#388E3C] group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
              </a>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
