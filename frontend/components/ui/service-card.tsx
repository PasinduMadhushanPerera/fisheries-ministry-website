import type { LucideIcon } from "lucide-react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

type ServiceCardProps = {
  title: string
  description: string
  href: string
  icon: LucideIcon
  category?: string
  status?: string
}

export function ServiceCard({
  title,
  description,
  href,
  icon: Icon,
  category,
  status,
}: ServiceCardProps) {
  return (
    <Card
      interactive
      className="group relative h-full overflow-hidden"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1 origin-bottom scale-y-0 bg-[#388E3C] transition-transform duration-300 group-hover:scale-y-100"
      />

      <Link
        href={href}
        className="flex h-full flex-col p-6 outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-green-50 text-[#256B29] transition duration-300 group-hover:scale-105 group-hover:bg-[#388E3C] group-hover:text-white">
            <Icon
              aria-hidden="true"
              className="h-6 w-6"
            />
          </div>

          <ArrowRight
            aria-hidden="true"
            className="h-5 w-5 text-slate-400 transition duration-300 group-hover:translate-x-1 group-hover:text-[#256B29]"
          />
        </div>

        {(category || status) && (
          <div className="mt-5 flex flex-wrap gap-2">
            {category && (
              <Badge variant="outline">
                {category}
              </Badge>
            )}

            {status && (
              <Badge variant="success">
                {status}
              </Badge>
            )}
          </div>
        )}

        <h3 className="mt-5 text-xl font-bold leading-snug text-slate-950 group-hover:text-[#256B29]">
          {title}
        </h3>

        <p className="mt-3 flex-1 leading-7 text-slate-600">
          {description}
        </p>

        <span className="mt-6 inline-flex items-center gap-2 font-bold text-[#256B29]">
          Access service
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
          />
        </span>
      </Link>
    </Card>
  )
}