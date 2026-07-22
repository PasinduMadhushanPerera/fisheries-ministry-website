import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  MapPin,
  Tag,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { projects } from "@/data/projects"

export function ProjectList() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#2f7d32]">
            All Projects
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Ongoing & Completed Projects
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Browse ministry development projects supporting fisheries,
            aquaculture, infrastructure, marine conservation and digital
            transformation.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-green-300 hover:shadow-xl"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <span
                  className={`absolute left-5 top-5 rounded-full px-3 py-1 text-xs font-semibold ${
                    project.status === "Ongoing"
                      ? "bg-green-600 text-white"
                      : "bg-slate-900 text-white"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-sm font-medium text-green-700">
                  <Tag className="h-4 w-4" />
                  {project.category}
                </div>

                <h3 className="mt-4 text-xl font-bold text-slate-900">
                  {project.title}
                </h3>

                <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                  <MapPin className="h-4 w-4" />
                  {project.location}
                </div>

                <p className="mt-5 line-clamp-3 leading-7 text-slate-600">
                  {project.description}
                </p>

                <Link
                  href={project.href}
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-[#0a322f] transition hover:gap-3"
                >
                  View Project
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}