import {
  ArrowRight,
  ExternalLink,
} from "lucide-react"

import {
  Button,
  LinkButton,
} from "@/components/ui/button"
import { Container } from "@/components/ui/container"

export default function HomePage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="border-b border-slate-200 bg-white">
        <Container className="flex min-h-20 items-center">
          <div>
            <p className="text-sm font-semibold text-[#256B29]">
              Government of Sri Lanka
            </p>

            <p className="font-bold text-slate-950">
              Ministry of Fisheries, Aquatic and Ocean
              Resources
            </p>
          </div>
        </Container>
      </header>

      <main
        id="main-content"
        tabIndex={-1}
        className="outline-none"
      >
        <section className="border-b border-slate-200 bg-slate-50 py-12 sm:py-16 lg:py-20">
          <Container>
            <div className="max-w-3xl">
              <p className="font-semibold text-[#256B29]">
                Frontend foundation
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                Fisheries services and information for
                Sri Lanka
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
                This temporary page confirms that the
                government design system, responsive container,
                typography and reusable buttons are working.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <LinkButton href="/services">
                  View services
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
          aria-labelledby="foundation-heading"
        >
          <Container>
            <div className="max-w-3xl">
              <h2
                id="foundation-heading"
                className="text-2xl font-bold text-slate-950 sm:text-3xl"
              >
                Foundation test
              </h2>

              <p className="mt-4 leading-7 text-slate-700">
                Check this page on desktop and mobile. The
                content should remain readable without horizontal
                scrolling, and each control should have a visible
                keyboard focus indicator.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button>Primary button</Button>

                <Button variant="outline">
                  Outline button
                </Button>

                <Button variant="secondary">
                  Secondary button
                </Button>

                <Button disabled>
                  Disabled button
                </Button>
              </div>

              <div className="mt-8 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-amber-950">
                <h3 className="font-bold">
                  Development notice
                </h3>

                <p className="mt-1 leading-7">
                  Placeholder content must be verified and
                  approved by the Ministry before publication.
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <footer className="border-t border-slate-300 bg-slate-950 py-8 text-white">
        <Container>
          <p className="text-sm">
            Temporary footer — the complete government footer
            will be created in the next stage.
          </p>
        </Container>
      </footer>
    </>
  )
}