import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"

type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbProps = {
  items: BreadcrumbItem[]
}

export function Breadcrumb({
  items,
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="border-b border-slate-200 bg-slate-50"
    >
      <div className="mx-auto flex min-h-12 max-w-[1200px] items-center px-4 sm:px-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm">
          <li>
            <Link
              href="/"
              aria-label="Home"
              className="inline-flex min-h-10 items-center gap-2 rounded-md px-2 font-medium text-slate-600 hover:bg-white hover:text-[#256B29]"
            >
              <Home
                aria-hidden="true"
                className="h-4 w-4"
              />
              Home
            </Link>
          </li>

          {items.map((item, index) => {
            const isLast =
              index === items.length - 1

            return (
              <li
                key={`${item.label}-${index}`}
                className="flex items-center gap-2"
              >
                <ChevronRight
                  aria-hidden="true"
                  className="h-4 w-4 text-slate-400"
                />

                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="rounded-md px-2 py-2 font-medium text-slate-600 hover:bg-white hover:text-[#256B29]"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className="px-2 py-2 font-semibold text-slate-900"
                  >
                    {item.label}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}