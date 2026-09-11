import { ShieldCheck } from "lucide-react"

import { Container } from "@/components/ui/container"

export function InternalAffairsHero() {
  return (
    <section className="relative overflow-hidden bg-[#061d24] text-white py-14 sm:py-18">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,197,94,0.16),transparent_32%),radial-gradient(circle_at_85%_25%,rgba(14,165,233,0.15),transparent_30%)]"
      />

      <Container className="relative z-10">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-500/10 px-3.5 py-1 text-xs font-bold text-green-300">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            <span>Ministry Governance & Oversight</span>
          </span>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Internal Affairs Unit
          </h1>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-200">
            Submit complaints, report misconduct, or contact the Internal Affairs Unit regarding Ministry services, officer integrity, and public service standards.
          </p>
        </div>
      </Container>
    </section>
  )
}
