import Link from "next/link"
import {
  ArrowUpRight,
  Briefcase,
  Mail,
  MessageCircleMore,
  Play,
  Share2,
} from "lucide-react"

import { Container } from "@/components/ui/container"

const socialLinks = [
  {
    name: "YouTube",
    description:
      "Watch official videos, public awareness content and Ministry updates.",
    href: "#",
    icon: Play,
  },
  {
    name: "LinkedIn",
    description:
      "Follow professional announcements, institutional updates and opportunities.",
    href: "#",
    icon: Briefcase,
  },
  {
    name: "Public Information",
    description:
      "Access verified news, notices and public communication through official channels.",
    href: "/media",
    icon: Share2,
  },
]

export function SocialSection() {
  return (
    <section
      aria-labelledby="social-section-heading"
      className="bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-[#061d24] px-8 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(34,197,94,0.17),transparent_34%),radial-gradient(circle_at_90%_15%,rgba(14,165,233,0.18),transparent_36%)]"
          />

          <div
            aria-hidden="true"
            className="absolute -right-24 -top-28 h-72 w-72 rounded-full border border-white/10 bg-white/[0.03]"
          />

          <div className="relative z-10">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-300 text-slate-950">
                  <MessageCircleMore className="h-8 w-8" />
                </div>

                <span className="mt-8 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-green-200 backdrop-blur">
                  Official Communication Channels
                </span>

                <h2
                  id="social-section-heading"
                  className="mt-6 text-4xl font-bold tracking-tight"
                >
                  Stay Connected With the Ministry
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                  Follow verified Ministry channels for announcements, public
                  notices, media releases and important updates. Add only
                  confirmed official profile links before publication.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  const isExternal = social.href.startsWith("http")

                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      aria-label={
                        isExternal
                          ? `Visit the Ministry ${social.name} page`
                          : social.name
                      }
                      className="group rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md transition hover:-translate-y-1 hover:border-green-200/30 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061d24]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-green-200">
                          <Icon
                            aria-hidden="true"
                            className="h-6 w-6"
                          />
                        </div>

                        <ArrowUpRight
                          aria-hidden="true"
                          className="h-5 w-5 text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-green-200"
                        />
                      </div>

                      <h3 className="mt-6 text-xl font-bold">
                        {social.name}
                      </h3>

                      <p className="mt-3 leading-7 text-slate-300">
                        {social.description}
                      </p>
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-green-200">
                  <Mail
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                </div>

                <div>
                  <p className="font-bold">
                    General Email Updates
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    Use only the Ministry&apos;s verified official email
                    address.
                  </p>
                </div>
              </div>

              <Link
                href="#contact-form"
                className="inline-flex w-fit items-center gap-2 rounded-xl bg-green-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-green-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-100 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061d24]"
              >
                Send an Inquiry

                <ArrowUpRight
                  aria-hidden="true"
                  className="h-5 w-5"
                />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}