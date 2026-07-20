import {
  ArrowRight,
  ExternalLink,
} from "lucide-react"

import { SiteHeader } from "@/components/layout/site-header"
import {
  Button,
  LinkButton,
} from "@/components/ui/button"
import { Container } from "@/components/ui/container"

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main
        id="main-content"
        tabIndex={-1}
        className="outline-none"
      >
        <section className="border-b border-slate-200 bg-slate-50 py-12 sm:py-16 lg:py-20">
          <Container>
            <div className="max-w-3xl">
              <p className="font-semibold text-[#256B29]">
                Government of Sri Lanka
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                Fisheries services and information for
                Sri Lanka
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
                Access fisheries services, application
                information, public notices, programmes and
                official Ministry resources.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <LinkButton href="/services">
                  Explore services
                  <ArrowRight
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                </LinkButton>

                <LinkButton
                  href="/about"
                  variant="outline"
                >
                  About the Ministry
                </LinkButton>

                <LinkButton
                  href="https://www.gov.lk/"
                  variant="secondary"
                  external
                >
                  Visit Gov.lk
                  <ExternalLink
                    aria-hidden="true"
                    className="h-4 w-4"
                  />
                </LinkButton>
              </div>
            </div>
          </Container>
        </section>

        <section
          className="py-12 sm:py-16"
          aria-labelledby="header-complete-heading"
        >
          <Container>
            <div className="max-w-3xl">
              <h2
                id="header-complete-heading"
                className="text-2xl font-bold text-slate-950 sm:text-3xl"
              >
                Government header completed
              </h2>

              <p className="mt-4 leading-7 text-slate-700">
                The website now includes responsive navigation,
                website search, language controls, accessibility
                preferences and mobile assistance links.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button>Primary action</Button>

                <Button variant="outline">
                  Secondary action
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  )
}