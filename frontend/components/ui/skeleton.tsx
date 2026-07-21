import type { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

export function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded-lg bg-slate-200",
        className,
      )}
      {...props}
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <Skeleton className="h-12 w-12 rounded-xl" />
      <Skeleton className="mt-6 h-5 w-3/4" />
      <Skeleton className="mt-3 h-4 w-full" />
      <Skeleton className="mt-2 h-4 w-5/6" />
      <Skeleton className="mt-6 h-5 w-28" />
    </div>
  )
}