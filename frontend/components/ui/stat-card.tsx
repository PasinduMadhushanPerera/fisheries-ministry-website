import type { LucideIcon } from "lucide-react"

import { Card } from "@/components/ui/card"

type StatCardProps = {
  value: string
  label: string
  description?: string
  icon: LucideIcon
}

export function StatCard({
  value,
  label,
  description,
  icon: Icon,
}: StatCardProps) {
  return (
    <Card className="relative overflow-hidden p-6">
      <div
        aria-hidden="true"
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-green-50"
      />

      <div className="relative">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#388E3C] text-white">
          <Icon
            aria-hidden="true"
            className="h-6 w-6"
          />
        </div>

        <p className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          {value}
        </p>

        <h3 className="mt-2 font-bold text-slate-900">
          {label}
        </h3>

        {description && (
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {description}
          </p>
        )}
      </div>
    </Card>
  )
}