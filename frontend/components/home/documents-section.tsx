import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Briefcase,
  FileSpreadsheet,
  Scale,
  ScrollText,
} from "lucide-react"
import Link from "next/link"

import { LinkButton } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Section } from "@/components/ui/section"
import { SectionTitle } from "@/components/ui/section-title"

type ResourceCardItem = {
  title: string
  description: string
  href: string
  icon: React.ElementType
}

const resourceCards: ResourceCardItem[] = [
  {
    title: "Forms",
    description: "Download official application forms and service documents.",
    href: "/resources/forms",
    icon: FileSpreadsheet,
  },
  {
    title: "Publications",
    description: "Browse research reports, sector publications and information materials.",
    href: "/resources/publications",
    icon: BookOpen,
  },
  {
    title: "Annual Reports",
    description: "Access annual performance reports and Ministry achievements.",
    href: "/resources/annual-reports",
    icon: BarChart3,
  },
  {
    title: "Circulars",
    description: "View official administrative circulars and public instructions.",
    href: "/resources/circulars",
    icon: ScrollText,
  },
  {
    title: "Policies and Regulations",
    description: "Read policies, laws, regulations and sector guidelines.",
    href: "/laws-and-policies",
    icon: Scale,
  },
  {
    title: "Tenders",
    description: "Explore current procurement notices and tender documents.",
    href: "/resources/tenders",
    icon: Briefcase,
  },
]

export function DocumentsSection() {
  return (
    <Section
      id="resources"
      background="soft"
      labelledBy="resources-heading"
      className="py-16 bg-[#f8faf9] border-b border-slate-200/80"
    >
      <SectionTitle
        id="resources-heading"
        eyebrow="Resources"
        title="Documents and downloads"
        description="Find official forms, publications, annual reports, circulars, policies and other Ministry documents."
        actions={
          <LinkButton
            href="/resources/documents"
            variant="outline"
            className="border-slate-300 bg-white hover:border-[#388E3C] hover:bg-emerald-50"
          >
            View all resources
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4"
            />
          </LinkButton>
        }
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
        {resourceCards.map((card) => {
          const Icon = card.icon

          return (
            <Card
              key={card.title}
              interactive
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs transition-all duration-200 hover:-translate-y-1 hover:border-[#388E3C] hover:shadow-md"
            >
              <Link
                href={card.href}
                className="flex flex-1 flex-col justify-between outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 rounded-xl"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-[#388E3C] transition-all duration-300 group-hover:bg-[#388E3C] group-hover:text-white">
                    <Icon
                      aria-hidden="true"
                      className="h-6 w-6 stroke-[1.75]"
                    />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900 group-hover:text-[#256B29] transition-colors">
                    {card.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-[#256B29]">
                  <span>Browse</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  />
                </div>
              </Link>
            </Card>
          )
        })}
      </div>
    </Section>
  )
}