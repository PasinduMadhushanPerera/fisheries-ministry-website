import Link from "next/link"
import {
  ArrowRight,
  Building2,
  Mail,
  Phone,
} from "lucide-react"

import { Container } from "@/components/ui/container"

const departments = [
  {
    name: "Administration Division",
    description:
      "Handles general administration, public inquiries and organizational support services.",
    phone: "+94 XX XXX XXXX",
    email: "admin@fisheries.gov.lk",
  },
  {
    name: "Fisheries Development Division",
    description:
      "Supports fisheries development programmes, projects and stakeholder coordination.",
    phone: "+94 XX XXX XXXX",
    email: "development@fisheries.gov.lk",
  },
  {
    name: "Aquatic Resources Division",
    description:
      "Responsible for aquatic resource management and sustainable utilization initiatives.",
    phone: "+94 XX XXX XXXX",
    email: "aquatic@fisheries.gov.lk",
  },
  {
    name: "Information & Communication Division",
    description:
      "Provides public information, communication support and digital services.",
    phone: "+94 XX XXX XXXX",
    email: "info@fisheries.gov.lk",
  },
  {
    name: "Finance Division",
    description:
      "Manages financial administration, budgeting and procurement-related activities.",
    phone: "+94 XX XXX XXXX",
    email: "finance@fisheries.gov.lk",
  },
  {
    name: "Human Resources Division",
    description:
      "Handles recruitment, staff administration and human resource management.",
    phone: "+94 XX XXX XXXX",
    email: "hr@fisheries.gov.lk",
  },
]

export function DepartmentContacts() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-[#256B29]">
            Department Directory
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-950">
            Contact the Appropriate Department
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Choose the department most relevant to your inquiry. Replace the
            placeholder contact information below with verified ministry details
            before publishing.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {departments.map((department) => (
            <article
              key={department.name}
              className="group flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-cyan-100 text-[#256B29]">
                <Building2 className="h-8 w-8" />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                {department.name}
              </h3>

              <p className="mt-4 flex-1 leading-7 text-slate-600">
                {department.description}
              </p>

              <div className="mt-8 space-y-4 border-t border-slate-200 pt-6">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#256B29]" />

                  <span className="text-slate-700">
                    {department.phone}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#256B29]" />

                  <span className="break-all text-slate-700">
                    {department.email}
                  </span>
                </div>
              </div>

              <Link
                href="#contact-form"
                className="mt-8 inline-flex items-center gap-2 font-semibold text-[#256B29] transition group-hover:gap-3"
              >
                Contact this Department
                <ArrowRight className="h-5 w-5" />
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}