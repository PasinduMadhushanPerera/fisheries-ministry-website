import type { LucideIcon } from "lucide-react"
import { ArrowRight } from "lucide-react"

import { LinkButton } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CtaCardProps = {
  title: string
  description: string
  href: string
  actionLabel: string
  icon: LucideIcon
  variant?: "green" | "blue" | "dark"
}

const variants = {
  green:
    "bg-gradient-to-br from-[#256B29] to-[#388E3C]",
  blue:
    "bg-gradient-to-br from-sky-800 to-blue-700",
  dark:
    "bg-gradient-to-br from-slate-950 to-slate-800",
}

export function CtaCard({
  title,
  description,
  href,
  actionLabel,
  icon: Icon,
  variant = "green",
}: CtaCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl p-7 text-white shadow-xl sm:p-8",
        variants[variant],
      )}
    >
      <div
        aria-hidden="true"
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-white/5"
      />

      <div className="relative">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
          <Icon
            aria-hidden="true"
            className="h-7 w-7"
          />
        </div>

        <h3 className="mt-6 text-2xl font-bold">
          {title}
        </h3>

        <p className="mt-3 max-w-xl leading-7 text-white/85">
          {description}
        </p>

        <LinkButton
          href={href}
          variant="secondary"
          className="mt-7 bg-white text-slate-950 hover:bg-slate-100"
        >
          {actionLabel}
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4"
          />
        </LinkButton>
      </div>
    </div>
  )
}