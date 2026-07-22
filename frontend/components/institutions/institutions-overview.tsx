import {
  Building2,
  Globe,
  Landmark,
  Users,
} from "lucide-react"

import { Container } from "@/components/ui/container"

export function InstitutionsOverview() {
  const highlights = [
    {
      icon: Landmark,
      title: "Government Departments",
      description:
        "Responsible for implementing national policies, regulations and public services related to fisheries and aquatic resources.",
    },
    {
      icon: Building2,
      title: "Affiliated Institutions",
      description:
        "Specialized organizations supporting research, infrastructure, education and sustainable fisheries development.",
    },
    {
      icon: Users,
      title: "Public Services",
      description:
        "Delivering essential services, technical assistance and community support for citizens and stakeholders.",
    },
    {
      icon: Globe,
      title: "National Development",
      description:
        "Working together to strengthen fisheries, aquaculture and ocean-resource management throughout Sri Lanka.",
    },
  ]

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* Left */}
          <div>
            <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-[#256B29]">
              Overview
            </span>

            <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900">
              A Connected Network of
              <span className="block text-[#256B29]">
                Public Institutions
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              The Ministry collaborates with a wide range of departments,
              statutory bodies, research organizations and training institutions
              to deliver efficient public services while supporting sustainable
              fisheries and aquatic resource development.
            </p>
          </div>

          {/* Right */}
          <div className="grid gap-6 sm:grid-cols-2">
            {highlights.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.title}
                  className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-cyan-100 text-[#256B29]">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}