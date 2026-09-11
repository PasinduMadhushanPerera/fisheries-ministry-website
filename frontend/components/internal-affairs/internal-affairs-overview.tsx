import Image from "next/image"
import { Building2, CheckCircle2, ShieldCheck } from "lucide-react"

import { Container } from "@/components/ui/container"

export function InternalAffairsOverview() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#256B29]">
              About the Unit
            </p>

            <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
              Ensuring Public Service Integrity & Transparency
            </h2>

            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 text-justify">
              The Internal Affairs Unit of the Ministry of Fisheries, Aquatic and Ocean Resources serves as an independent administrative oversight body dedicated to maintaining institutional integrity, public accountability, and fair service delivery across all departments, coastal offices, and harbour operations.
            </p>

            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 text-justify">
              Our primary mandate includes evaluating public complaints, investigating reports of officer misconduct or administrative irregularities, enforcing anti-corruption protocols, and ensuring that all citizen inquiries are resolved promptly with strict confidentiality.
            </p>

            <div className="pt-2 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-bold text-slate-800">
                <CheckCircle2 className="h-4 w-4 text-[#256B29] shrink-0" />
                <span>Whistleblower Identity Protection</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-bold text-slate-800">
                <CheckCircle2 className="h-4 w-4 text-[#256B29] shrink-0" />
                <span>Independent Administrative Reviews</span>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-[#071b18] to-slate-950 p-8 text-white shadow-xl flex flex-col justify-between min-h-[18rem]">
            <div aria-hidden="true" className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-2xl" />

            <div className="flex items-center justify-between z-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <ShieldCheck className="h-7 w-7 text-emerald-300" />
              </div>
              <span className="rounded-full bg-[#256B29] px-3.5 py-1 text-xs font-extrabold text-white">
                Official Oversight
              </span>
            </div>

            <div className="mt-8 z-10">
              <div className="flex items-center gap-3 mb-2">
                <Image
                  src="/images/government/logo.jpg"
                  alt="Emblem of Sri Lanka"
                  width={36}
                  height={36}
                  className="h-9 w-auto object-contain rounded-md bg-white p-1"
                />
                <div>
                  <p className="text-xs font-extrabold text-green-300 uppercase tracking-wider">Government of Sri Lanka</p>
                  <p className="text-sm font-bold text-white">Ministry of Fisheries</p>
                </div>
              </div>

              <blockquote className="mt-3 text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                “Dedicated to upholding ethical public service standards, protecting fisher rights, and maintaining transparency across all marine and aquatic institutions.”
              </blockquote>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
