import {
  ArrowRight,
  BookOpen,
  Download,
  FileText,
  Scale,
} from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { LinkButton } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Section } from "@/components/ui/section"
import { SectionTitle } from "@/components/ui/section-title"

const documentGroups = [
  {
    title: "Application forms",
    description:
      "Access forms used for fisheries services, registrations, approvals and official requests.",
    href: "/documents/forms",
    icon: FileText,
    badge: "Public forms",
  },
  {
    title: "Acts, regulations and policies",
    description:
      "Review legislation, policies, regulations and other legal resources relevant to the fisheries sector.",
    href: "/laws-and-policies",
    icon: Scale,
    badge: "Legal resources",
  },
  {
    title: "Reports and publications",
    description:
      "Browse official reports, plans, research material and Ministry publications.",
    href: "/documents/publications",
    icon: BookOpen,
    badge: "Publications",
  },
]

export function DocumentsSection() {
  return (
    <Section
      id="documents"
      background="white"
      labelledBy="documents-heading"
    >
      <SectionTitle
        id="documents-heading"
        eyebrow="Resources"
        title="Documents and downloads"
        description="Find official forms, policies, legislation, reports, publications and guidance documents."
        actions={
          <LinkButton
            href="/documents"
            variant="outline"
          >
            Browse all documents
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4"
            />
          </LinkButton>
        }
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {documentGroups.map((group) => {
          const Icon = group.icon

          return (
            <Card
              key={group.title}
              interactive
              className="group"
            >
              <Link
                href={group.href}
                className="block p-7 outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-800">
                    <Icon
                      aria-hidden="true"
                      className="h-7 w-7"
                    />
                  </div>

                  <Badge variant="info">
                    {group.badge}
                  </Badge>
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-950 group-hover:text-[#256B29]">
                  {group.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {group.description}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 font-bold text-[#256B29]">
                  <Download
                    aria-hidden="true"
                    className="h-4 w-4"
                  />
                  View resources
                </span>
              </Link>
            </Card>
          )
        })}
      </div>
    </Section>
  )
}