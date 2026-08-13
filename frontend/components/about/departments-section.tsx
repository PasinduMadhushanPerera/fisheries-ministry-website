import Link from "next/link"
import {
  ArrowRight,
  Building2,
  Anchor,
  Fish,
  ShipWheel,
  Landmark,
} from "lucide-react"

import { departments as defaultDepartments } from "@/data/about"
import { Card } from "@/components/ui/card"
import { Section } from "@/components/ui/section"
import { SectionTitle } from "@/components/ui/section-title"
import { ApiDepartmentCard, ApiSectionHeader } from "@/lib/api/about"

const iconMap: Record<string, React.ElementType> = {
  Building2,
  Anchor,
  Fish,
  ShipWheel,
  Landmark,
}

export function DepartmentsSection({
  initialHeader,
  initialDepartments,
}: {
  initialHeader?: ApiSectionHeader
  initialDepartments?: ApiDepartmentCard[]
}) {
  const eyebrow = initialHeader?.eyebrow || "Institutions"
  const title = initialHeader?.title || "Departments & institutions"
  const description =
    initialHeader?.description ||
    "The Ministry works together with specialized departments, authorities and research institutions to deliver public services, scientific expertise and sector development."

  const items =
    initialDepartments && initialDepartments.length > 0
      ? initialDepartments.map((d) => {
          const iconKey = d.icon_name || "Building2"
          const Icon = iconMap[iconKey] || Building2
          return {
            title: d.title,
            description: d.description,
            href: d.href,
            icon: Icon,
          }
        })
      : defaultDepartments.map((d) => ({
          title: d.title,
          description: d.description,
          href: d.href,
          icon: Building2,
        }))

  return (
    <Section
      id="departments"
      background="white"
      labelledBy="departments-heading"
      spacing="lg"
    >
      <SectionTitle
        id="departments-heading"
        eyebrow={eyebrow}
        title={title}
        description={description}
        align="center"
      />

      <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {items.map((department) => {
          const Icon = department.icon

          return (
            <Card
              key={department.title}
              interactive
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Decorative top bar */}
              <div className="h-2 w-full bg-gradient-to-r from-[#256B29] via-[#388E3C] to-sky-500" />

              <div className="flex flex-1 flex-col p-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-[#256B29] transition duration-300 group-hover:scale-105 group-hover:bg-[#388E3C] group-hover:text-white">
                  <Icon
                    aria-hidden="true"
                    className="h-8 w-8"
                  />
                </div>

                <h3 className="mt-6 text-xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-[#256B29]">
                  {department.title}
                </h3>

                <p className="mt-4 flex-1 leading-7 text-slate-600">
                  {department.description}
                </p>

                <Link
                  href={department.href}
                  target={department.href.startsWith("http") ? "_blank" : undefined}
                  rel={department.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="mt-8 inline-flex items-center gap-2 font-semibold text-[#256B29] transition hover:gap-3 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200 rounded-lg"
                >
                  <span>Learn more</span>

                  <ArrowRight
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                </Link>
              </div>
            </Card>
          )
        })}
      </div>
    </Section>
  )
}