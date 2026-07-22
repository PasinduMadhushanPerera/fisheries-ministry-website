import Link from "next/link"
import {
  AlertTriangle,
  ArrowRight,
  LifeBuoy,
  PhoneCall,
  ShieldAlert,
  Waves,
} from "lucide-react"

import { Container } from "@/components/ui/container"

const emergencyContacts = [
  {
    title: "Emergency Hotline",
    description:
      "For urgent matters requiring immediate assistance from the Ministry.",
    phone: "+94 XX XXX XXXX",
    icon: PhoneCall,
  },
  {
    title: "Illegal Fishing Reports",
    description:
      "Report suspected illegal, unreported or unregulated fishing activities.",
    phone: "+94 XX XXX XXXX",
    icon: ShieldAlert,
  },
  {
    title: "Marine Incident Reporting",
    description:
      "Report accidents, environmental incidents or emergencies related to fisheries.",
    phone: "+94 XX XXX XXXX",
    icon: Waves,
  },
]

export function EmergencySection() {
  return (
    <section className="bg-[#061d24] py-16 text-white sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200">
            <AlertTriangle className="h-4 w-4" />
            Emergency Assistance
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight">
            Need Immediate Assistance?
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            If your inquiry relates to an urgent fisheries issue, marine
            emergency or illegal fishing activity, please use the appropriate
            emergency contact below. Replace these placeholder numbers with
            verified contacts before publication.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {emergencyContacts.map((item) => {
            const Icon = item.icon

            return (
              <article
                key={item.title}
                className="rounded-[2rem] border border-white/10 bg-white/10 p-8 backdrop-blur-md transition hover:border-emerald-300/30 hover:bg-white/15"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/15 text-red-300">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-300">
                  {item.description}
                </p>

                <div className="mt-8 rounded-xl border border-white/10 bg-black/10 p-4">
                  <p className="text-sm uppercase tracking-wide text-slate-400">
                    Emergency Contact
                  </p>

                  <p className="mt-2 text-xl font-bold text-green-300">
                    {item.phone}
                  </p>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-16 rounded-[2rem] border border-emerald-400/20 bg-white/10 p-8 backdrop-blur-md lg:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15">
                <LifeBuoy className="h-8 w-8 text-emerald-300" />
              </div>

              <div>
                <h3 className="text-2xl font-bold">
                  Non-Emergency Inquiries
                </h3>

                <p className="mt-3 max-w-2xl leading-8 text-slate-300">
                  For general questions, licensing requests, public services,
                  or administrative matters, please use our online contact
                  form so your inquiry can be directed to the appropriate
                  division.
                </p>
              </div>
            </div>

            <Link
              href="#contact-form"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
            >
              Contact the Ministry
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}