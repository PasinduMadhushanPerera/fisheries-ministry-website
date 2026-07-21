import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type SectionTitleProps = {
  id?: string
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: "left" | "center"
  className?: string
  actions?: ReactNode
}

export function SectionTitle({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  className,
  actions,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
        align === "center" &&
          "mx-auto max-w-3xl items-center text-center lg:flex-col lg:items-center",
        className,
      )}
    >
      <div
        className={cn(
          "max-w-3xl",
          align === "center" && "mx-auto",
        )}
      >
        {eyebrow && (
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-[#256B29]">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-[#388E3C]"
            />
            {eyebrow}
          </p>
        )}

        <h2
          id={id}
          className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
        >
          {title}
        </h2>

        {description && (
          <div className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            {description}
          </div>
        )}
      </div>

      {actions && (
        <div className="shrink-0">{actions}</div>
      )}
    </div>
  )
}