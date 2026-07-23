import {
  CheckCircle2,
  CircleAlert,
  FileCheck2,
  ShieldCheck,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import type { ServiceDetail } from "@/data/service-details"

type ServiceRequirementsProps = {
  service: ServiceDetail
}

export function ServiceRequirements({
  service,
}: ServiceRequirementsProps) {
  return (
    <section
      aria-labelledby="service-requirements-heading"
      className="bg-slate-50 py-16 sm:py-20"
    >
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
            Eligibility and documents
          </p>

          <h2
            id="service-requirements-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
          >
            What you need before applying
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Review the eligibility conditions and prepare the required
            supporting documents before submitting your application.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                <ShieldCheck
                  aria-hidden="true"
                  className="h-7 w-7"
                />
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-green-700">
                  Eligibility
                </p>

                <h3 className="mt-1 text-2xl font-bold text-slate-950">
                  Application requirements
                </h3>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {service.requirements.map((requirement) => (
                <article
                  key={requirement.title}
                  className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 h-6 w-6 shrink-0 text-green-700"
                  />

                  <div>
                    <h4 className="font-semibold text-slate-950">
                      {requirement.title}
                    </h4>

                    <p className="mt-2 leading-7 text-slate-600">
                      {requirement.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800">
                <FileCheck2
                  aria-hidden="true"
                  className="h-7 w-7"
                />
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-cyan-800">
                  Documents
                </p>

                <h3 className="mt-1 text-2xl font-bold text-slate-950">
                  Supporting documents
                </h3>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {service.documents.map((document) => (
                <article
                  key={document.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-0.5 h-6 w-6 shrink-0 text-green-700"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h4 className="font-semibold text-slate-950">
                          {document.title}
                        </h4>

                        <span
                          className={[
                            "rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
                            document.required
                              ? "bg-red-50 text-red-700"
                              : "bg-slate-200 text-slate-700",
                          ].join(" ")}
                        >
                          {document.required ? "Required" : "If applicable"}
                        </span>
                      </div>

                      {document.description ? (
                        <p className="mt-2 leading-7 text-slate-600">
                          {document.description}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 flex gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <CircleAlert
                aria-hidden="true"
                className="mt-0.5 h-6 w-6 shrink-0 text-amber-700"
              />

              <p className="text-sm leading-6 text-amber-950">
                Additional documents may be requested depending on the
                application type, activity, location or findings during the
                assessment process.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}