import type { LucideIcon } from "lucide-react"

import { LinkButton } from "@/components/ui/button"

type EmptyStateProps = {
  title: string
  description: string
  icon: LucideIcon
  actionLabel?: string
  actionHref?: string
}

export function EmptyState({
  title,
  description,
  icon: Icon,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#256B29] shadow-sm">
        <Icon
          aria-hidden="true"
          className="h-7 w-7"
        />
      </div>

      <h2 className="mt-5 text-xl font-bold text-slate-950">
        {title}
      </h2>

      <p className="mx-auto mt-3 max-w-lg leading-7 text-slate-600">
        {description}
      </p>

      {actionLabel && actionHref && (
        <LinkButton
          href={actionHref}
          className="mt-6"
        >
          {actionLabel}
        </LinkButton>
      )}
    </div>
  )
}