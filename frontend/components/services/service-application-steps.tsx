import { ArrowDown, CheckCircle2, ClipboardList } from "lucide-react"

import { Container } from "@/components/ui/container"
import type { ServiceDetail } from "@/data/service-details"

type ServiceApplicationStepsProps = {
  service: ServiceDetail
}

export function ServiceApplicationSteps({
  service,
}: ServiceApplicationStepsProps) {
  return (
    <section
      id="how-to-apply"
      aria-labelledby="service-application-steps-heading"
      className="scroll-mt-24 bg-white py-16 sm:py-20"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
              Application process
            </p>

            <h2
              id="service-application-steps-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
            >
              How to apply
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Follow these steps to prepare and submit your application. The
              responsible authority may request additional information during
              the assessment.
            </p>

            <div className="mt-8 rounded-3xl border border-green-200 bg-green-50 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-700 text-white">
                <ClipboardList
                  aria-hidden="true"
                  className="h-6 w-6"
                />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-950">
                Before submission
              </h3>

              <p className="mt-3 leading-7 text-slate-700">
                Check that the application form is complete and all required
                documents are clear, current and correctly attached.
              </p>
            </div>
          </div>

          <ol className="relative space-y-6">
            {service.steps.map((item, index) => {
              const isLastStep = index === service.steps.length - 1

              return (
                <li
                  key={item.step}
                  className="relative"
                >
                  {!isLastStep ? (
                    <div
                      aria-hidden="true"
                      className="absolute left-7 top-16 h-[calc(100%+1.5rem)] w-px bg-slate-200"
                    />
                  ) : null}

                  <article className="relative rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:border-green-200 hover:bg-white hover:shadow-md sm:p-7">
                    <div className="flex gap-5">
                      <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-700 text-lg font-bold text-white shadow-sm">
                        {item.step}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <p className="text-sm font-bold uppercase tracking-[0.14em] text-green-700">
                            Step {item.step}
                          </p>

                          {isLastStep ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-green-800">
                              <CheckCircle2
                                aria-hidden="true"
                                className="h-3.5 w-3.5"
                              />
                              Final step
                            </span>
                          ) : null}
                        </div>

                        <h3 className="mt-2 text-xl font-bold text-slate-950 sm:text-2xl">
                          {item.title}
                        </h3>

                        <p className="mt-3 leading-7 text-slate-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </article>

                  {!isLastStep ? (
                    <div
                      aria-hidden="true"
                      className="relative z-10 ml-5 mt-3 flex h-5 w-5 items-center justify-center rounded-full bg-white text-green-700"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </div>
                  ) : null}
                </li>
              )
            })}
          </ol>
        </div>
      </Container>
    </section>
  )
}