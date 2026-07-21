"use client"

import { useEffect, useRef, useState } from "react"

import { Section } from "@/components/ui/section"
import { SectionTitle } from "@/components/ui/section-title"
import { capabilityStats } from "@/data/home"
import { cn } from "@/lib/utils"

export function CapabilityStats() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = sectionRef.current

    if (!element) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.2,
      },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <Section
      id="digital-capabilities"
      background="dark"
      labelledBy="digital-capabilities-heading"
      className="bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.14),transparent_35%),linear-gradient(135deg,#061d24,#0d2d32)]"
    >
      <div ref={sectionRef}>
        <SectionTitle
          id="digital-capabilities-heading"
          eyebrow="Citizen-focused platform"
          title={
            <span className="text-white">
              Government information that is easier to access
            </span>
          }
          description={
            <p className="text-slate-300">
              The website is designed to bring public services,
              official information and Ministry resources into
              one clear and inclusive digital experience.
            </p>
          }
          align="center"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {capabilityStats.map((item, index) => {
            const Icon = item.icon

            return (
              <article
                key={item.label}
                className={cn(
                  "relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-6 opacity-0 shadow-xl backdrop-blur-sm transition duration-700",
                  isVisible &&
                    "translate-y-0 opacity-100",
                  !isVisible && "translate-y-8",
                )}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-green-300/5"
                />

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-300/10 text-green-200 ring-1 ring-green-200/15">
                    <Icon
                      aria-hidden="true"
                      className="h-6 w-6"
                    />
                  </div>

                  <p className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {item.value}
                  </p>

                  <h3 className="mt-2 font-bold text-white">
                    {item.label}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {item.description}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </Section>
  )
}