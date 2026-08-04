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
  PauseCircle,
  Palette,
  FileText,
  Accessibility as AccessibilityIcon,
} from "lucide-react"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Container } from "@/components/ui/container"
import { PageHero } from "@/components/ui/page-hero"

export const metadata: Metadata = {
  title: "Accessibility Statement - Ministry of Fisheries",
  description:
    "Read the accessibility commitment of the Ministry of Fisheries, Aquatic and Ocean Resources and learn about WCAG 2.2 AA standards and built-in accessibility controls.",
}

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Accessibility Statement" },
]

const sections = [
  { id: "commitment", label: "1. Our Commitment" },
  { id: "standards", label: "2. Accessibility Standards" },
  { id: "features", label: "3. Built-in Accessibility Features" },
  { id: "keyboard", label: "4. Keyboard Navigation" },
  { id: "screen-readers", label: "5. Screen Reader Compatibility" },
  { id: "visual", label: "6. Visual Accessibility" },
  { id: "language", label: "7. Multilingual Access" },
  { id: "compatibility", label: "8. Browser Compatibility" },
  { id: "limitations", label: "9. Known Limitations" },
  { id: "feedback", label: "10. Report an Issue" },
]

const accessibilityFeatures = [
  {
    title: "Dynamic Text Resizing",
    description: "Easily scale font sizes up to +25% using the Accessibility menu without distorting page layout.",
    icon: ScanText,
  },
  {
    title: "High Contrast Mode",
    description: "Enhances color contrast and element borders for users with low vision or visual impairments.",
    icon: Contrast,
  },
  {
    title: "Dyslexia-Friendly Font",
    description: "Switches to high-legibility typography with increased letter and word spacing.",
    icon: Eye,
  },
  {
    title: "Stop Animations (Reduced Motion)",
    description: "Silences smooth transitions, keyframe animations, and hover effects for motion sensitivity.",
    icon: PauseCircle,
  },
  {
    title: "Grayscale Display Mode",
    description: "Converts website colors into a clean 100% grayscale filter for color vision deficiency.",
    icon: Palette,
  },
  {
    title: "Keyboard & Screen Reader Access",
    description: "Full keyboard navigation, semantic HTML5 structure, ARIA landmarks, and visible focus indicators.",
    icon: Keyboard,
  },
]

export default function AccessibilityPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb items={breadcrumbItems} />

        {/* Standardized Hero Section */}
        <PageHero
          badgeIcon={AccessibilityIcon}
          badgeText="Accessibility Statement"
          title="Inclusive Digital"
          highlightTitle="Government"
          description="We are committed to making this website accessible, usable and inclusive for all citizens, commercial fishers, persons with disabilities, and aquatic stakeholders."
          cardIcon={ShieldCheck}
          cardEyebrow="Accessibility Target"
          cardTitle="WCAG 2.2 Level AA Compliance"
          cardDescription="Designed in accordance with global Web Content Accessibility Guidelines and inclusive digital public-service standards."
        >
          <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-slate-300 border-t border-white/10 pt-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-300" aria-hidden="true" />
              <span>Accessibility by Design</span>
            </div>
            <div className="flex items-center gap-2">
              <Landmark className="h-4 w-4 text-[#388E3C]" aria-hidden="true" />
              <span>Government of Sri Lanka</span>
            </div>
          </div>
        </PageHero>

        {/* Main Content Area */}
        <section className="bg-white py-12 sm:py-16">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)]">
              {/* Left Sticky Sidebar Navigation */}
              <aside className="hidden lg:block">
                <nav
                  aria-label="Accessibility statement sections"
                  className="sticky top-24 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 shadow-2xs"
                >
                  <p className="text-xs font-extrabold uppercase tracking-wider text-[#256B29]">
                    On This Page
                  </p>

                  <ol className="mt-4 space-y-1">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="flex items-center rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-white hover:text-[#256B29]"
                        >
                          <span>{section.label}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>

              {/* Right Content Stream */}
              <div className="min-w-0">
                {/* Intro Callout Box */}
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6">
                  <div className="flex items-start gap-4">
                    <Info aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-[#256B29]" />
                    <div>
                      <h2 className="text-base font-extrabold text-slate-900">
                        About this Accessibility Statement
                      </h2>
                      <p className="mt-1 text-xs sm:text-sm leading-relaxed text-slate-700">
                        This statement outlines the Ministry&apos;s digital accessibility standards, built-in reading tools, screen reader support, keyboard shortcuts, and instructions for reporting digital barriers or requesting content in alternative formats.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 space-y-12">
                  {/* Section 1: Our Commitment */}
                  <section id="commitment" aria-labelledby="commitment-heading" className="scroll-mt-28">
                    <h2 id="commitment-heading" className="text-2xl font-extrabold tracking-tight text-slate-900">
                      1. Our Commitment
                    </h2>
                    <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-slate-700">
                      <p>
                        The Ministry of Fisheries, Aquatic and Ocean Resources is committed to ensuring that its digital public services and information portals are accessible to all citizens, including persons with visual, hearing, motor, or cognitive disabilities.
                      </p>
                      <p>
                        Accessibility is integrated into every phase of website development, content creation, document publishing, and public service delivery.
                      </p>
                    </div>
                  </section>

                  {/* Section 2: Accessibility Standards */}
                  <section id="standards" aria-labelledby="standards-heading" className="scroll-mt-28 border-t border-slate-200 pt-10">
                    <h2 id="standards-heading" className="text-2xl font-extrabold tracking-tight text-slate-900">
                      2. Accessibility Standards
                    </h2>
                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-700">
                      This website strives to comply with the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA conformance based on four core principles:
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {[
                        {
                          title: "Perceivable",
                          description: "Content is presented in ways users can see and hear, including text alternatives and contrast adjustments.",
                        },
                        {
                          title: "Operable",
                          description: "Navigation controls, menus, and forms can be operated using keyboard inputs and touch gestures.",
                        },
                        {
                          title: "Understandable",
                          description: "Text is written in clear language with predictable navigation and helpful form validation guidance.",
                        },
                        {
                          title: "Robust",
                          description: "Code uses standard semantic HTML5 to support modern web browsers and assistive screen readers.",
                        },
                      ].map((principle) => (
                        <div key={principle.title} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                          <CheckCircle2 aria-hidden="true" className="h-5 w-5 text-[#256B29]" />
                          <h3 className="mt-2 text-sm font-extrabold text-slate-900">{principle.title}</h3>
                          <p className="mt-1 text-xs text-slate-600 leading-relaxed">{principle.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Section 3: Built-in Accessibility Features */}
                  <section id="features" aria-labelledby="features-heading" className="scroll-mt-28 border-t border-slate-200 pt-10">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#256B29]">
                      Interactive Tools
                    </span>
                    <h2 id="features-heading" className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
                      3. Built-in Accessibility Features
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600">
                      You can customize your viewing experience anytime using the <strong>Accessibility Menu</strong> located in the top utility bar of this website:
                    </p>

                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      {accessibilityFeatures.map((feature) => {
                        const Icon = feature.icon
                        return (
                          <article key={feature.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
                            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-[#256B29]">
                              <Icon aria-hidden="true" className="h-5 w-5" />
                            </div>
                            <h3 className="mt-3 text-sm font-extrabold text-slate-900">{feature.title}</h3>
                            <p className="mt-1 text-xs text-slate-600 leading-relaxed">{feature.description}</p>
                          </article>
                        )
                      })}
                    </div>
                  </section>

                  {/* Section 4: Keyboard Navigation */}
                  <section id="keyboard" aria-labelledby="keyboard-heading" className="scroll-mt-28 border-t border-slate-200 pt-10">
                    <h2 id="keyboard-heading" className="text-2xl font-extrabold tracking-tight text-slate-900">
                      4. Keyboard Navigation Shortcuts
                    </h2>
                    <p className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      All links, buttons, search filters, and form fields can be accessed without a mouse:
                    </p>

                    <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                      <table className="w-full text-left text-xs text-slate-700 border-collapse">
                        <thead>
                          <tr className="bg-slate-100/90 text-slate-700 font-extrabold uppercase tracking-wider border-b border-slate-200">
                            <th scope="col" className="py-3 px-4 w-40">Key Shortcut</th>
                            <th scope="col" className="py-3 px-4">Function</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          <tr className="hover:bg-slate-50">
                            <td className="py-3 px-4"><kbd className="rounded bg-slate-100 px-2 py-0.5 border border-slate-300 font-mono font-bold text-slate-900">Tab</kbd></td>
                            <td className="py-3 px-4">Move forward to the next focusable link or form control</td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                            <td className="py-3 px-4"><kbd className="rounded bg-slate-100 px-2 py-0.5 border border-slate-300 font-mono font-bold text-slate-900">Shift + Tab</kbd></td>
                            <td className="py-3 px-4">Move backward to the previous focusable link or form control</td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                            <td className="py-3 px-4"><kbd className="rounded bg-slate-100 px-2 py-0.5 border border-slate-300 font-mono font-bold text-slate-900">Enter</kbd></td>
                            <td className="py-3 px-4">Activate selected buttons, links, or submit forms</td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                            <td className="py-3 px-4"><kbd className="rounded bg-slate-100 px-2 py-0.5 border border-slate-300 font-mono font-bold text-slate-900">Space</kbd></td>
                            <td className="py-3 px-4">Toggle checkboxes, accordion items, and select dropdown options</td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                            <td className="py-3 px-4"><kbd className="rounded bg-slate-100 px-2 py-0.5 border border-slate-300 font-mono font-bold text-slate-900">Escape</kbd></td>
                            <td className="py-3 px-4">Close open accessibility menus, modals, and preview dialogs</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  {/* Section 5: Screen Reader Compatibility */}
                  <section id="screen-readers" aria-labelledby="screen-readers-heading" className="scroll-mt-28 border-t border-slate-200 pt-10">
                    <h2 id="screen-readers-heading" className="text-2xl font-extrabold tracking-tight text-slate-900">
                      5. Screen Reader Compatibility
                    </h2>
                    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/70 p-5 space-y-2">
                      <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                        <Volume2 className="h-5 w-5 text-[#256B29]" aria-hidden="true" />
                        <span>Assistive Technologies Tested</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        This website utilizes semantic HTML5 markup (`header`, `nav`, `main`, `footer`), explicit `aria-expanded` and `aria-controls` bindings, landmark roles, and non-empty `alt` attributes for screen readers like NVDA, JAWS, and VoiceOver.
                      </p>
                    </div>
                  </section>

                  {/* Section 6: Multilingual Access */}
                  <section id="language" aria-labelledby="language-heading" className="scroll-mt-28 border-t border-slate-200 pt-10">
                    <h2 id="language-heading" className="text-2xl font-extrabold tracking-tight text-slate-900">
                      7. Multilingual Access
                    </h2>
                    <div className="mt-4 flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50/70 p-5">
                      <Languages className="h-6 w-6 text-[#256B29] shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900">Sinhala, Tamil & English Support</h3>
                        <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                          Official notices, news releases, statistics, and public service forms are rendered with language selectors supporting English, Sinhala (සිංහල), and Tamil (தமிழ்).
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Section 10: Report an Issue */}
                  <section id="feedback" aria-labelledby="feedback-heading" className="scroll-mt-28 border-t border-slate-200 pt-10">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#256B29]">
                      Public Assistance
                    </span>
                    <h2 id="feedback-heading" className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
                      10. Report an Accessibility Barrier
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600">
                      If you experience any difficulty accessing information, navigating content, or downloading documents on this website, please contact our team:
                    </p>

                    <div className="mt-6 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-50 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-base font-extrabold text-[#0B3D3A]">Ministry Accessibility Officer</h3>
                        <p className="text-xs text-slate-600 mt-1">Email: info[at]fisheries.gov.lk • Tel: +94 112 327 060</p>
                      </div>
                      <Link
                        href="/contact"
                        className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-xl bg-[#388E3C] px-5 text-xs font-extrabold text-white transition hover:bg-[#256B29]"
                      >
                        <Mail className="h-4 w-4" aria-hidden="true" />
                        <span>Submit Barrier Report</span>
                      </Link>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}