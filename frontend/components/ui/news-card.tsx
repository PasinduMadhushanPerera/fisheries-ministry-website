import { ArrowRight, CalendarDays } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

type NewsCardProps = {
  title: string
  excerpt: string
  href: string
  date: string
  category: string
  image?: string
  imageAlt?: string
}

export function NewsCard({
  title,
  excerpt,
  href,
  date,
  category,
  image,
  imageAlt = "",
}: NewsCardProps) {
  return (
    <Card
      interactive
      className="group h-full overflow-hidden"
    >
      <Link
        href={href}
        className="flex h-full flex-col outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
      >
        {image && (
          <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="info">{category}</Badge>

            <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
              <CalendarDays
                aria-hidden="true"
                className="h-4 w-4"
              />
              {date}
            </span>
          </div>

          <h3 className="mt-4 text-xl font-bold leading-snug text-slate-950 transition-colors group-hover:text-[#256B29]">
            {title}
          </h3>

          <p className="mt-3 flex-1 leading-7 text-slate-600">
            {excerpt}
          </p>

          <span className="mt-6 inline-flex items-center gap-2 font-bold text-[#256B29]">
            Read full article
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </Card>
  )
}