import {
  ArrowRight,
  Building2,
  ExternalLink,
  Landmark,
  Network,
} from "lucide-react"
import Link from "next/link"

import { LinkButton } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Section } from "@/components/ui/section"
import { SectionTitle } from "@/components/ui/section-title"

const institutions = [
  {
    title: "Departments and authorities",
    description:
      "Find agencies responsible for fisheries administration, regulation, research and public services.",
    href: "/institutions/departments-and-authorities",
    icon: Landmark,
  },
  {
    title: "Research and development institutions",
    description:
      "Access organisations supporting aquatic research, innovation, training and sector development.",
    href: "/institutions/research-and-development",
    icon: Building2,
  },
  {
    title: "Regional and community services",
    description:
      "Locate regional offices and public service channels supporting fishing communities.",
    href: "/institutions/regional-services",
    icon: Network,
  },
]

export function InstitutionsSection() {
  return (
    <Section
      id="institutions"
      background="soft"
      labelledBy="institutions-heading"
    >
      <SectionTitle
        id="institutions-heading"
        eyebrow="Government network"
        title="Ministry institutions and service organisations"
        description="Connect with departments, authorities, research organisations and regional services operating within the fisheries sector."
        actions={
          <LinkButton
            href="/institutions"
            variant="outline"
          >
            View institution directory
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4"
            />
          </LinkButton>
        }
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {institutions.map((institution) => {
          const Icon = institution.icon

          return (
            <Card
              key={institution.title}
              interactive
              className="group h-full"
            >
              <Link
                href={institution.href}
                className="flex h-full flex-col p-7 outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-[#256B29]">
                    <Icon
                      aria-hidden="true"
                      className="h-7 w-7"
                    />
                  </div>

                  <ExternalLink
                    aria-hidden="true"
                    className="h-5 w-5 text-slate-400"
                  />
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-950 group-hover:text-[#256B29]">
                  {institution.title}
                </h3>

                <p className="mt-3 flex-1 leading-7 text-slate-600">
                  {institution.description}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 font-bold text-[#256B29]">
                  Open directory
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Card>
          )
        })}
      </div>
    </Section>
  )
}