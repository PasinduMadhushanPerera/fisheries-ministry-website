import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  Contrast,
  Eye,
  Headphones,
  Info,
  Keyboard,
  Landmark,
  Languages,
  Mail,
  MonitorSmartphone,
  MousePointerClick,
  ScanText,
  ShieldCheck,
  Smartphone,
  Volume2,
} from "lucide-react"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Container } from "@/components/ui/container"

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Read the accessibility commitment of the Ministry of Fisheries, Aquatic and Ocean Resources and learn how to report accessibility issues.",
}

const breadcrumbItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Accessibility Statement",
  },
]

const sections = [
  {
    id: "commitment",
    label: "Our Commitment",
  },
  {
    id: "standards",
    label: "Accessibility Standards",
  },
  {
    id: "features",
    label: "Accessibility Features",
  },
  {
    id: "keyboard",
    label: "Keyboard Navigation",
  },
  {
    id: "screen-readers",
    label: "Screen Readers",
  },
  {
    id: "visual",
    label: "Visual Accessibility",
  },
  {
    id: "language",
    label: "Language and Content",
  },
  {
    id: "compatibility",
    label: "Browser Compatibility",
  },
  {
    id: "limitations",
    label: "Known Limitations",
  },
  {
    id: "feedback",
    label: "Report an Issue",
  },
  {
    id: "review",
    label: "Review and Updates",
  },
]

const accessibilityFeatures = [
  {
    title: "Keyboard access",
    description:
      "Navigation, forms, links and interactive controls are designed to be usable without a mouse.",
    icon: Keyboard,
  },
  {
    title: "Screen reader support",
    description:
      "Semantic HTML, headings, labels and accessible names are used to support assistive technologies.",
    icon: Volume2,
  },
  {
    title: "Readable contrast",
    description:
      "Text, controls and important interface elements use clear colour contrast wherever possible.",
    icon: Contrast,
  },
  {
    title: "Responsive layouts",
    description:
      "Pages adapt to desktop, tablet and mobile screens without requiring horizontal scrolling.",
    icon: MonitorSmartphone,
  },
  {
    title: "Text resizing",
    description:
      "Website content is designed to remain readable when browser zoom or text size is increased.",
    icon: ScanText,
  },
  {
    title: "Visible focus",
    description:
      "Keyboard users can identify the currently focused link, button, form field or control.",
    icon: MousePointerClick,
  },
]

export default function AccessibilityPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content">
        <Breadcrumb items={breadcrumbItems} />

        <section
          aria-labelledby="accessibility-heading"
          className="relative isolate overflow-hidden bg-[#061d24] text-white"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,197,94,0.2),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,0.2),transparent_40%),linear-gradient(135deg,#061d24_0%,#0a322f_50%,#0a4350_100%)]"
          />

          <div
            aria-hidden="true"
            className="absolute -right-44 -top-44 h-[36rem] w-[36rem] rounded-full border border-white/10 bg-white/[0.03]"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-52 -left-20 h-[32rem] w-[32rem] rounded-full border border-green-200/10 bg-green-300/[0.03]"
          />

          <svg
            aria-hidden="true"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-0 h-40 w-full text-white/[0.05]"
          >
            <path
              fill="currentColor"
              d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,202.7C840,203,960,181,1080,165.3C1200,149,1320,139,1380,133.3L1440,128L1440,320L0,320Z"
            />
          </svg>

          <Container className="relative z-10 py-16 sm:py-20 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md">
                  <Eye
                    aria-hidden="true"
                    className="h-4 w-4 text-green-200"
                  />
                  Inclusive Digital Government
                </div>

                <h1
                  id="accessibility-heading"
                  className="mt-7 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
                >
                  Accessibility
                  <span className="block bg-gradient-to-r from-green-200 via-cyan-200 to-sky-200 bg-clip-text text-transparent">
                    Statement
                  </span>
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
                  We are committed to making this website accessible, usable
                  and inclusive for all people, including persons with
                  disabilities.
                </p>

                <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck
                      aria-hidden="true"
                      className="h-5 w-5 text-green-200"
                    />
                    Accessibility by design
                  </div>

                  <div className="flex items-center gap-2">
                    <Landmark
                      aria-hidden="true"
                      className="h-5 w-5 text-green-200"
                    />
                    Government of Sri Lanka
                  </div>
                </div>
              </div>

              <aside className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
                <Headphones
                  aria-hidden="true"
                  className="h-10 w-10 text-green-200"
                />

                <p className="mt-5 text-sm font-bold uppercase tracking-[0.15em] text-green-200">
                  Accessibility target
                </p>

                <p className="mt-3 text-2xl font-bold text-white">
                  WCAG 2.2 Level AA
                </p>

                <p className="mt-4 leading-7 text-slate-200">
                  The website is being designed and improved with recognised
                  accessibility principles and inclusive public-service
                  practices.
                </p>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-sm text-slate-300">Last updated</p>

                  <p className="mt-1 font-semibold text-white">
                    24 July 2026
                  </p>
                </div>
              </aside>
            </div>
          </Container>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[18rem_minmax(0,1fr)]">
              <aside>
                <nav
                  aria-label="Accessibility statement sections"
                  className="sticky top-28 rounded-3xl border border-slate-200 bg-slate-50 p-6"
                >
                  <p className="text-sm font-bold uppercase tracking-[0.15em] text-green-700">
                    On this page
                  </p>

                  <ol className="mt-5 space-y-1">
                    {sections.map((section, index) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="group flex items-start gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                        >
                          <span className="mt-0.5 text-xs font-bold text-slate-400 group-hover:text-green-700">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span>{section.label}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>

              <div className="min-w-0">
                <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
                  <div className="flex items-start gap-4">
                    <Info
                      aria-hidden="true"
                      className="mt-0.5 h-6 w-6 shrink-0 text-blue-700"
                    />

                    <div>
                      <h2 className="text-lg font-bold text-slate-950">
                        About this statement
                      </h2>

                      <p className="mt-2 leading-7 text-slate-700">
                        This statement explains the Ministry&apos;s
                        accessibility goals, the features provided by this
                        website and how users can report barriers or request
                        information in an alternative format.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 space-y-14">
                  <section
                    id="commitment"
                    aria-labelledby="commitment-heading"
                    className="scroll-mt-32"
                  >
                    <h2
                      id="commitment-heading"
                      className="text-3xl font-bold tracking-tight text-slate-950"
                    >
                      1. Our Commitment
                    </h2>

                    <div className="mt-5 space-y-4 leading-8 text-slate-700">
                      <p>
                        The Ministry of Fisheries, Aquatic and Ocean Resources
                        is committed to ensuring that its digital information
                        and public services can be used by the widest possible
                        audience.
                      </p>

                      <p>
                        We aim to remove barriers that may prevent people with
                        visual, hearing, physical, cognitive, speech or other
                        disabilities from accessing government information and
                        services.
                      </p>

                      <p>
                        Accessibility is considered during the design,
                        development, content creation, testing and maintenance
                        of this website.
                      </p>
                    </div>
                  </section>

                  <section
                    id="standards"
                    aria-labelledby="standards-heading"
                    className="scroll-mt-32 border-t border-slate-200 pt-12"
                  >
                    <h2
                      id="standards-heading"
                      className="text-3xl font-bold tracking-tight text-slate-950"
                    >
                      2. Accessibility Standards
                    </h2>

                    <p className="mt-5 leading-8 text-slate-700">
                      The website is intended to conform, as far as reasonably
                      possible, with the Web Content Accessibility Guidelines
                      WCAG 2.2 at Level AA.
                    </p>

                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                      {[
                        {
                          title: "Perceivable",
                          description:
                            "Information should be presented in ways users can perceive.",
                        },
                        {
                          title: "Operable",
                          description:
                            "Website controls and navigation should be usable by different input methods.",
                        },
                        {
                          title: "Understandable",
                          description:
                            "Content and interactions should be clear, predictable and readable.",
                        },
                        {
                          title: "Robust",
                          description:
                            "Pages should work with current browsers and assistive technologies.",
                        },
                      ].map((principle) => (
                        <div
                          key={principle.title}
                          className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                        >
                          <CheckCircle2
                            aria-hidden="true"
                            className="h-7 w-7 text-green-700"
                          />

                          <h3 className="mt-4 text-xl font-bold text-slate-950">
                            {principle.title}
                          </h3>

                          <p className="mt-3 leading-7 text-slate-600">
                            {principle.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section
                    id="features"
                    aria-labelledby="features-heading"
                    className="scroll-mt-32 border-t border-slate-200 pt-12"
                  >
                    <p className="text-sm font-bold uppercase tracking-[0.15em] text-green-700">
                      Inclusive design
                    </p>

                    <h2
                      id="features-heading"
                      className="mt-3 text-3xl font-bold tracking-tight text-slate-950"
                    >
                      3. Accessibility Features
                    </h2>

                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                      {accessibilityFeatures.map((feature) => {
                        const Icon = feature.icon

                        return (
                          <article
                            key={feature.title}
                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                          >
                            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700">
                              <Icon
                                aria-hidden="true"
                                className="h-6 w-6"
                              />
                            </div>

                            <h3 className="mt-5 text-xl font-bold text-slate-950">
                              {feature.title}
                            </h3>

                            <p className="mt-3 leading-7 text-slate-600">
                              {feature.description}
                            </p>
                          </article>
                        )
                      })}
                    </div>
                  </section>

                  <section
                    id="keyboard"
                    aria-labelledby="keyboard-heading"
                    className="scroll-mt-32 border-t border-slate-200 pt-12"
                  >
                    <h2
                      id="keyboard-heading"
                      className="text-3xl font-bold tracking-tight text-slate-950"
                    >
                      4. Keyboard Navigation
                    </h2>

                    <p className="mt-5 leading-8 text-slate-700">
                      Users should be able to access the main navigation,
                      links, buttons, form fields and other interactive
                      elements using a keyboard.
                    </p>

                    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                      <div className="grid grid-cols-[8rem_1fr] border-b border-slate-200 bg-slate-50 px-5 py-4 font-bold text-slate-950">
                        <span>Key</span>
                        <span>Purpose</span>
                      </div>

                      {[
                        ["Tab", "Move to the next interactive element"],
                        [
                          "Shift + Tab",
                          "Move to the previous interactive element",
                        ],
                        ["Enter", "Activate a selected link or control"],
                        ["Space", "Activate buttons and supported controls"],
                        ["Escape", "Close supported menus and dialogs"],
                        ["Arrow keys", "Navigate supported menus and options"],
                      ].map(([key, purpose]) => (
                        <div
                          key={key}
                          className="grid grid-cols-[8rem_1fr] border-b border-slate-200 px-5 py-4 last:border-b-0"
                        >
                          <kbd className="w-fit rounded-md border border-slate-300 bg-slate-100 px-2 py-1 text-sm font-semibold text-slate-900 shadow-sm">
                            {key}
                          </kbd>

                          <span className="leading-7 text-slate-700">
                            {purpose}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p className="mt-5 leading-8 text-slate-700">
                      A skip link is provided near the beginning of each page
                      so keyboard users can move directly to the main content.
                    </p>
                  </section>

                  <section
                    id="screen-readers"
                    aria-labelledby="screen-readers-heading"
                    className="scroll-mt-32 border-t border-slate-200 pt-12"
                  >
                    <h2
                      id="screen-readers-heading"
                      className="text-3xl font-bold tracking-tight text-slate-950"
                    >
                      5. Screen Reader Compatibility
                    </h2>

                    <div className="mt-6 rounded-3xl bg-[linear-gradient(145deg,#071d24_0%,#0a322f_55%,#0a4350_100%)] p-7 text-white shadow-xl sm:p-8">
                      <Volume2
                        aria-hidden="true"
                        className="h-10 w-10 text-green-200"
                      />

                      <p className="mt-5 leading-8 text-slate-200">
                        The website uses semantic page structure, descriptive
                        headings, accessible form labels, alternative text for
                        meaningful images and accessible names for interactive
                        controls.
                      </p>
                    </div>

                    <p className="mt-6 leading-8 text-slate-700">
                      Compatibility may vary depending on the browser,
                      operating system, assistive technology and version being
                      used.
                    </p>
                  </section>

                  <section
                    id="visual"
                    aria-labelledby="visual-heading"
                    className="scroll-mt-32 border-t border-slate-200 pt-12"
                  >
                    <h2
                      id="visual-heading"
                      className="text-3xl font-bold tracking-tight text-slate-950"
                    >
                      6. Visual Accessibility
                    </h2>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                      {[
                        {
                          icon: Contrast,
                          title: "Colour contrast",
                          text: "Text and controls are designed with clear contrast against their backgrounds.",
                        },
                        {
                          icon: Eye,
                          title: "Visible focus",
                          text: "Focused elements are visually identified for keyboard users.",
                        },
                        {
                          icon: ScanText,
                          title: "Readable text",
                          text: "Content uses clear spacing, headings and readable typography.",
                        },
                        {
                          icon: Smartphone,
                          title: "Responsive content",
                          text: "Layouts adapt to different screen sizes and orientations.",
                        },
                      ].map((item) => {
                        const Icon = item.icon

                        return (
                          <div
                            key={item.title}
                            className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                          >
                            <Icon
                              aria-hidden="true"
                              className="h-7 w-7 text-green-700"
                            />

                            <h3 className="mt-4 text-lg font-bold text-slate-950">
                              {item.title}
                            </h3>

                            <p className="mt-2 leading-7 text-slate-600">
                              {item.text}
                            </p>
                          </div>
                        )
                      })}
                    </div>

                    <p className="mt-6 leading-8 text-slate-700">
                      Users can use their browser&apos;s zoom controls to
                      increase or decrease the size of website content.
                    </p>
                  </section>

                  <section
                    id="language"
                    aria-labelledby="language-heading"
                    className="scroll-mt-32 border-t border-slate-200 pt-12"
                  >
                    <h2
                      id="language-heading"
                      className="text-3xl font-bold tracking-tight text-slate-950"
                    >
                      7. Language and Content
                    </h2>

                    <div className="mt-6 flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                      <Languages
                        aria-hidden="true"
                        className="mt-0.5 h-8 w-8 shrink-0 text-green-700"
                      />

                      <div>
                        <h3 className="text-xl font-bold text-slate-950">
                          Multilingual access
                        </h3>

                        <p className="mt-3 leading-8 text-slate-700">
                          The Ministry aims to provide important public
                          information in Sinhala, Tamil and English where
                          translations are available.
                        </p>
                      </div>
                    </div>

                    <p className="mt-5 leading-8 text-slate-700">
                      Content authors are encouraged to use clear headings,
                      descriptive link text, short paragraphs and plain
                      language wherever possible.
                    </p>
                  </section>

                  <section
                    id="compatibility"
                    aria-labelledby="compatibility-heading"
                    className="scroll-mt-32 border-t border-slate-200 pt-12"
                  >
                    <h2
                      id="compatibility-heading"
                      className="text-3xl font-bold tracking-tight text-slate-950"
                    >
                      8. Browser and Device Compatibility
                    </h2>

                    <p className="mt-5 leading-8 text-slate-700">
                      This website is designed for current versions of commonly
                      used web browsers and for desktop, tablet and mobile
                      devices.
                    </p>

                    <p className="mt-4 leading-8 text-slate-700">
                      For improved security, performance and accessibility,
                      users should keep their browser, operating system and
                      assistive technology updated.
                    </p>

                    <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
                      <div className="flex items-start gap-4">
                        <MonitorSmartphone
                          aria-hidden="true"
                          className="mt-0.5 h-6 w-6 shrink-0 text-blue-700"
                        />

                        <p className="leading-7 text-slate-700">
                          Some older browsers may not support all visual,
                          interactive or accessibility features correctly.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section
                    id="limitations"
                    aria-labelledby="limitations-heading"
                    className="scroll-mt-32 border-t border-slate-200 pt-12"
                  >
                    <h2
                      id="limitations-heading"
                      className="text-3xl font-bold tracking-tight text-slate-950"
                    >
                      9. Known Limitations
                    </h2>

                    <p className="mt-5 leading-8 text-slate-700">
                      Although we aim to make the website fully accessible,
                      some content may not yet meet every accessibility
                      requirement.
                    </p>

                    <ul className="mt-6 space-y-3">
                      {[
                        "Older PDF documents may not contain complete headings, tags or reading order.",
                        "Some scanned documents may require improved text recognition or alternative formats.",
                        "Third-party systems and external websites may follow different accessibility standards.",
                        "Older videos may not include captions, transcripts or audio descriptions.",
                        "Complex maps, charts or data tables may require additional accessible explanations.",
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 leading-7 text-slate-700"
                        >
                          <CheckCircle2
                            aria-hidden="true"
                            className="mt-1 h-5 w-5 shrink-0 text-green-700"
                          />

                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="mt-5 leading-8 text-slate-700">
                      We are working to identify and improve these areas as
                      content and services are reviewed.
                    </p>
                  </section>

                  <section
                    id="feedback"
                    aria-labelledby="feedback-heading"
                    className="scroll-mt-32 border-t border-slate-200 pt-12"
                  >
                    <p className="text-sm font-bold uppercase tracking-[0.15em] text-green-700">
                      Accessibility support
                    </p>

                    <h2
                      id="feedback-heading"
                      className="mt-3 text-3xl font-bold tracking-tight text-slate-950"
                    >
                      10. Report an Accessibility Issue
                    </h2>

                    <p className="mt-5 leading-8 text-slate-700">
                      Contact the Ministry when you experience difficulty using
                      this website, cannot access a document or require
                      information in another format.
                    </p>

                    <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
                      <div className="grid md:grid-cols-[0.8fr_1.2fr]">
                        <div className="bg-[linear-gradient(145deg,#071d24_0%,#0a322f_55%,#0a4350_100%)] p-7 text-white sm:p-8">
                          <Mail
                            aria-hidden="true"
                            className="h-10 w-10 text-green-200"
                          />

                          <h3 className="mt-5 text-2xl font-bold">
                            Help us remove barriers
                          </h3>

                          <p className="mt-4 leading-7 text-slate-300">
                            Your feedback helps us improve access to public
                            information and digital government services.
                          </p>
                        </div>

                        <div className="p-7 sm:p-8">
                          <p className="font-bold text-slate-950">
                            Include the following information:
                          </p>

                          <ul className="mt-4 space-y-3 text-slate-700">
                            {[
                              "The page or document you were trying to access",
                              "A description of the accessibility problem",
                              "The device, browser or assistive technology used",
                              "Your preferred contact method, where a response is required",
                            ].map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-3 leading-7"
                              >
                                <CheckCircle2
                                  aria-hidden="true"
                                  className="mt-1 h-5 w-5 shrink-0 text-green-700"
                                />

                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>

                          <Link
                            href="/contact"
                            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                          >
                            Contact the Ministry

                            <ArrowRight
                              aria-hidden="true"
                              className="h-5 w-5"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section
                    id="review"
                    aria-labelledby="review-heading"
                    className="scroll-mt-32 border-t border-slate-200 pt-12"
                  >
                    <h2
                      id="review-heading"
                      className="text-3xl font-bold tracking-tight text-slate-950"
                    >
                      11. Review and Updates
                    </h2>

                    <p className="mt-5 leading-8 text-slate-700">
                      This statement will be reviewed as the website, digital
                      services, accessibility standards and user requirements
                      change.
                    </p>

                    <p className="mt-4 leading-8 text-slate-700">
                      Updates will be published on this page together with a
                      revised last-updated date.
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section
          aria-labelledby="related-pages-heading"
          className="border-t border-slate-200 bg-slate-50 py-16"
        >
          <Container>
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                Related information
              </p>

              <h2
                id="related-pages-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-slate-950"
              >
                Website Policies
              </h2>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <Link
                href="/terms-of-use"
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
              >
                <Landmark
                  aria-hidden="true"
                  className="h-8 w-8 text-green-700"
                />

                <h3 className="mt-5 text-2xl font-bold text-slate-950 group-hover:text-green-800">
                  Terms of Use
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Read the conditions governing access to and use of this
                  website.
                </p>

                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-green-700">
                  Read terms of use

                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>

              <Link
                href="/privacy"
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
              >
                <ShieldCheck
                  aria-hidden="true"
                  className="h-8 w-8 text-green-700"
                />

                <h3 className="mt-5 text-2xl font-bold text-slate-950 group-hover:text-green-800">
                  Privacy Policy
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Learn how personal information is collected, used and
                  protected.
                </p>

                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-green-700">
                  Read privacy policy

                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}