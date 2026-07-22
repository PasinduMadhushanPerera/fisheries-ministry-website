import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Container } from "@/components/ui/container"
import { citizenQuickTasks } from "@/data/citizen-services"

export function CitizenQuickTasks() {
  return (
    <section
      aria-labelledby="citizen-quick-tasks-heading"
      className="border-b border-slate-200 bg-slate-50 py-14 sm:py-16"
    >
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
            Quick access
          </p>

          <h2
            id="citizen-quick-tasks-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
          >
            Popular citizen tasks
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Start with one of the most frequently requested fisheries services
            and public information resources.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {citizenQuickTasks.map((task) => {
            const Icon = task.icon

            return (
              <Link
                key={task.title}
                href={task.href}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700 transition group-hover:bg-green-100">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-lg font-bold leading-7 text-slate-950 transition group-hover:text-green-800">
                  {task.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                  {task.description}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-green-700">
                  Start task
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            )
          })}
        </div>
      </Container>
    </section>
  )
}