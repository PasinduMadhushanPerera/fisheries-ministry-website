"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  FileText,
  Search,
  Waves,
  Bell,
  Handshake,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { popularSearches } from "@/data/home"

const AUTO_PLAY_INTERVAL = 8000

type HeroSlide = {
  id: number
  eyebrow: string
  title: string
  highlightedTitle: string
  description: string
  image: string
  imageAlt: string
  imagePosition?: string
  primaryAction: {
    label: string
    href: string
  }
  secondaryAction: {
    label: string
    href: string
  }
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    eyebrow: "Official Government Website",
    title: "Welcome to the Ministry of",
    highlightedTitle: "Fisheries, Aquatic and Ocean Resources",
    description:
      "Access trusted information, public services and development programmes supporting Sri Lanka’s fisheries sector and coastal communities.",
    image: "/images/home/hero-fishing-harbour.jpg",
    imageAlt:
      "Fishing boats at a Sri Lankan harbour representing the national fisheries sector",
    imagePosition: "center",
    primaryAction: {
      label: "Explore our services",
      href: "/services",
    },
    secondaryAction: {
      label: "About the Ministry",
      href: "/about",
    },
  },
  {
    id: 2,
    eyebrow: "Empowering Coastal Communities",
    title: "Supporting the people who sustain",
    highlightedTitle: "Sri Lanka’s fisheries sector",
    description:
      "Discover programmes, services and resources created to strengthen livelihoods, improve safety and support fishing communities.",
    image: "/images/home/hero-fishing-community.jpg",
    imageAlt:
      "Members of a Sri Lankan fishing community working near the coast",
    imagePosition: "center",
    primaryAction: {
      label: "View community services",
      href: "/services",
    },
    secondaryAction: {
      label: "Latest programmes",
      href: "/programmes",
    },
  },
  {
    id: 3,
    eyebrow: "Sustainable Development",
    title: "Advancing responsible and productive",
    highlightedTitle: "aquaculture development",
    description:
      "Learn about sustainable aquaculture, technical support, investment opportunities and initiatives that strengthen national food security.",
    image: "/images/home/hero-aquaculture.jpg",
    imageAlt:
      "Aquaculture farming facility supporting sustainable fish production",
    imagePosition: "center",
    primaryAction: {
      label: "Explore aquaculture",
      href: "/services",
    },
    secondaryAction: {
      label: "View projects",
      href: "/projects",
    },
  },
  {
    id: 4,
    eyebrow: "Protecting Our Ocean",
    title: "Managing aquatic resources for",
    highlightedTitle: "future generations",
    description:
      "Explore policies and national initiatives focused on marine conservation, responsible resource management and healthy ocean ecosystems.",
    image: "/images/home/hero-ocean-resources.jpg",
    imageAlt:
      "Ocean and coastal environment representing marine resource protection",
    imagePosition: "center",
    primaryAction: {
      label: "Learn about our work",
      href: "/about",
    },
    secondaryAction: {
      label: "Read publications",
      href: "/documents",
    },
  },
]

export function HomeHero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    )

    function updateMotionPreference() {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    updateMotionPreference()

    mediaQuery.addEventListener(
      "change",
      updateMotionPreference,
    )

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateMotionPreference,
      )
    }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    const intervalId = window.setInterval(() => {
      setActiveSlide((currentSlide) =>
        currentSlide === heroSlides.length - 1
          ? 0
          : currentSlide + 1,
      )
    }, AUTO_PLAY_INTERVAL)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [prefersReducedMotion])

  const currentSlide = heroSlides[activeSlide]

  return (
    <>
      <section
        aria-labelledby="homepage-heading"
        aria-roledescription="carousel"
        aria-label="Ministry welcome highlights"
        className="relative isolate overflow-hidden bg-[#061d24] text-white"
      >
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => {
            const isActive = index === activeSlide

            return (
              <div
                key={slide.id}
                aria-hidden={!isActive}
                className={`absolute inset-0 transition-opacity duration-[1600ms] ease-in-out ${isActive
                  ? "z-10 opacity-100"
                  : "z-0 opacity-0"
                  }`}
              >
                <Image
                  src={slide.image}
                  alt={isActive ? slide.imageAlt : ""}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  style={{
                    objectPosition:
                      slide.imagePosition ?? "center",
                  }}
                  className={`object-cover ${prefersReducedMotion
                    ? ""
                    : "transition-transform duration-[12000ms] ease-out"
                    } ${isActive && !prefersReducedMotion
                      ? "scale-[1.09]"
                      : "scale-100"
                    }`}
                />
              </div>
            )
          })}

          <div className="absolute inset-0 z-20 bg-[linear-gradient(90deg,rgba(2,20,27,0.95)_0%,rgba(3,30,35,0.88)_38%,rgba(3,30,35,0.58)_67%,rgba(3,30,35,0.38)_100%)]" />

          <div className="absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(3,18,24,0.18)_0%,rgba(3,18,24,0.10)_45%,rgba(3,18,24,0.82)_100%)]" />

          <div
            aria-hidden="true"
            className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_75%_28%,rgba(14,165,233,0.18),transparent_35%),radial-gradient(circle_at_18%_76%,rgba(34,197,94,0.17),transparent_38%)]"
          />

          <div
            aria-hidden="true"
            className={`absolute -right-40 top-[8%] z-20 h-[34rem] w-[34rem] rounded-full bg-cyan-300/10 blur-[120px] ${prefersReducedMotion
              ? ""
              : "animate-[heroGlow_8s_ease-in-out_infinite]"
              }`}
          />

          <div
            aria-hidden="true"
            className={`absolute -bottom-48 left-[5%] z-20 h-[30rem] w-[30rem] rounded-full bg-green-300/10 blur-[110px] ${prefersReducedMotion
              ? ""
              : "animate-[heroGlow_10s_ease-in-out_infinite_reverse]"
              }`}
          />
        </div>

        <Container className="relative z-30 flex min-h-[560px] items-center py-16 pb-24 sm:min-h-[600px] sm:py-20 sm:pb-28 lg:min-h-[640px] lg:py-24 lg:pb-28">
          <div
            key={currentSlide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${activeSlide + 1} of ${heroSlides.length}`}
            className={`max-w-4xl ${prefersReducedMotion
              ? ""
              : "animate-[heroContentEnter_900ms_ease-out]"
              }`}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white shadow-lg backdrop-blur-md">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-400/20">
                <Waves
                  aria-hidden="true"
                  className="h-4 w-4 text-green-200"
                />
              </span>

              {currentSlide.eyebrow}
            </div>

            {/* <h1
              id="homepage-heading"
              className="mt-7 max-w-4xl text-4xl font-bold tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              {currentSlide.title}

              <span className="mt-1 block bg-gradient-to-r from-green-200 via-cyan-200 to-sky-200 bg-clip-text text-transparent">
                {currentSlide.highlightedTitle}
              </span>
            </h1> */}

            <h1
              id="homepage-heading"
              className="mt-7 max-w-4xl text-4xl font-bold tracking-[-0.035em] sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              <span className="block text-amber-300 drop-shadow-lg">
                {currentSlide.title}
              </span>

              <span className="mt-2 block text-white drop-shadow-lg">
                {currentSlide.highlightedTitle}
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
              {currentSlide.description}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={currentSlide.primaryAction.href}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-bold !text-black shadow-xl transition duration-300 hover:-translate-y-0.5 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
              >
                {currentSlide.primaryAction.label}

                <ArrowRight
                  aria-hidden="true"
                  className="h-5 w-5"
                />
              </Link>

              <Link
                href={currentSlide.secondaryAction.href}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
              >
                {currentSlide.secondaryAction.label}
              </Link>
            </div>
          </div>
        </Container>

        <div className="absolute inset-x-0 bottom-0 z-40">
          <Container className="pb-7">
            <div className="border-t border-white/20 pt-5">
              <div
                aria-label={`Slide ${activeSlide + 1} of ${heroSlides.length}`}
                className="flex items-center gap-5"
              >
                {heroSlides.map((slide, index) => (
                  <span
                    key={slide.id}
                    aria-hidden="true"
                    className={`block h-1.5 rounded-full transition-all duration-700 ease-in-out ${index === activeSlide
                      ? "w-12 bg-green-300 shadow-[0_0_12px_rgba(134,239,172,0.65)]"
                      : "w-6 bg-white/45"
                      }`}
                  />
                ))}
              </div>
            </div>
          </Container>
        </div>
      </section>

      <section
        aria-labelledby="homepage-search-heading"
        className="relative z-20 border-b border-slate-200 bg-slate-50 py-10 sm:py-12"
      >
        <Container>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-7 lg:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
              <div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-800">
                  <Search
                    aria-hidden="true"
                    className="h-6 w-6"
                  />
                </div>

                <p className="mt-5 text-sm font-bold uppercase tracking-[0.15em] text-green-700">
                  Public services and information
                </p>

                <h2
                  id="homepage-search-heading"
                  className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl"
                >
                  How can we help you today?
                </h2>

                <p className="mt-3 max-w-xl leading-7 text-slate-600">
                  Search licences, application forms, notices,
                  publications, institutions and Ministry services.
                </p>
              </div>

              <div>
                <form
                  role="search"
                  action="/search"
                  method="get"
                >
                  <label
                    htmlFor="homepage-search"
                    className="visually-hidden"
                  >
                    Search Ministry services and information
                  </label>

                  <div className="relative">
                    <Search
                      aria-hidden="true"
                      className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      id="homepage-search"
                      type="search"
                      name="q"
                      enterKeyHint="search"
                      maxLength={100}
                      autoComplete="off"
                      placeholder="Search licences, forms, notices or services"
                      className="min-h-16 w-full rounded-2xl border border-slate-300 bg-white pl-12 pr-32 text-base text-slate-950 shadow-sm outline-none transition placeholder:text-slate-500 focus:border-green-600 focus:ring-4 focus:ring-green-200"
                    />

                    <button
                      type="submit"
                      className="absolute bottom-2 right-2 top-2 inline-flex min-w-24 items-center justify-center rounded-xl bg-[#277a3b] px-5 font-bold text-white transition hover:bg-[#1d612e] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                    >
                      Search
                    </button>
                  </div>
                </form>

                <div className="mt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
                    Popular searches
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {popularSearches.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="inline-flex min-h-10 items-center rounded-full border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 transition hover:border-green-300 hover:bg-green-50 hover:text-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 border-t border-slate-200 pt-7 sm:grid-cols-3">
              <Link
                href="/services"
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-green-300 hover:bg-green-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
              >

                <Handshake
                  aria-hidden="true"
                  className="h-6 w-6 text-green-700"
                />

                <p className="font-bold text-slate-950">
                  Browse public services
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Access service information, guidance and
                  application requirements.
                </p>

                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-green-700">
                  View services

                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>

              <Link
                href="/resources"
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-green-300 hover:bg-green-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
              >
                <FileText
                  aria-hidden="true"
                  className="h-6 w-6 text-green-700"
                />

                <p className="mt-3 font-bold text-slate-950">
                  Forms and documents
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Find official forms, publications, reports and
                  downloadable documents.
                </p>

                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-green-700">
                  Browse documents

                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>

              <Link
                href="/media-centre/notices"
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-green-300 hover:bg-green-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
              >

                <Bell
                  aria-hidden="true"
                  className="h-6 w-6 text-green-700"
                />
                <p className="font-bold text-slate-950">
                  Latest public notices
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Read official announcements, updates and
                  important public information.
                </p>

                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-green-700">
                  View notices

                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <style jsx global>{`
        @keyframes heroContentEnter {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroGlow {
          0%,
          100% {
            opacity: 0.55;
            transform: scale(0.92);
          }

          50% {
            opacity: 1;
            transform: scale(1.12);
          }
        }
      `}</style>
    </>
  )
}