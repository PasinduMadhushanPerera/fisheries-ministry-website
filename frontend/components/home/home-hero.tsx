"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Waves } from "lucide-react"

import { Container } from "@/components/ui/container"
import { ApiHeroSlide } from "@/lib/api/home"

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
}

const defaultHeroSlides: HeroSlide[] = [
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
  },
]

export function HomeHero({ initialSlides }: { initialSlides?: ApiHeroSlide[] }) {
  const heroSlides: HeroSlide[] =
    initialSlides && initialSlides.length > 0
      ? initialSlides.map((s) => ({
          id: s.id,
          eyebrow: s.eyebrow,
          title: s.title,
          highlightedTitle: s.highlighted_title,
          description: s.description,
          image: s.image_url || "/images/home/hero-fishing-harbour.jpg",
          imageAlt: s.image_alt || "Ministry of Fisheries Hero Banner",
          imagePosition: "center",
        }))
      : defaultHeroSlides

  const [activeSlide, setActiveSlide] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    )

    function updateMotionPreference() {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    updateMotionPreference()

    mediaQuery.addEventListener("change", updateMotionPreference)

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference)
    }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    const intervalId = window.setInterval(() => {
      setActiveSlide((currentSlide) =>
        currentSlide >= heroSlides.length - 1 ? 0 : currentSlide + 1,
      )
    }, AUTO_PLAY_INTERVAL)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [prefersReducedMotion, heroSlides.length])

  const currentSlide = heroSlides[activeSlide] || heroSlides[0]

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
                className={`absolute inset-0 transition-opacity duration-[1600ms] ease-in-out ${
                  isActive ? "z-10 opacity-100" : "z-0 opacity-0"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={isActive ? slide.imageAlt : ""}
                  fill
                  unoptimized={slide.image.startsWith("http")}
                  priority={index === 0}
                  sizes="100vw"
                  style={{
                    objectPosition: slide.imagePosition ?? "center",
                  }}
                  className={`object-cover ${
                    prefersReducedMotion
                      ? ""
                      : "transition-transform duration-[12000ms] ease-out"
                  } ${
                    isActive && !prefersReducedMotion
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
            className={`absolute -right-40 top-[8%] z-20 h-[34rem] w-[34rem] rounded-full bg-cyan-300/10 blur-[120px] ${
              prefersReducedMotion
                ? ""
                : "animate-[heroGlow_8s_ease-in-out_infinite]"
            }`}
          />

          <div
            aria-hidden="true"
            className={`absolute -bottom-48 left-[5%] z-20 h-[30rem] w-[30rem] rounded-full bg-green-300/10 blur-[110px] ${
              prefersReducedMotion
                ? ""
                : "animate-[heroGlow_10s_ease-in-out_infinite_reverse]"
            }`}
          />
        </div>

        <Container className="relative z-30 flex min-h-[480px] items-center py-16 pb-20 sm:min-h-[520px] sm:py-20 sm:pb-24 lg:min-h-[560px] lg:py-24 lg:pb-24">
          <div
            key={currentSlide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${activeSlide + 1} of ${heroSlides.length}`}
            className={`max-w-4xl ${
              prefersReducedMotion
                ? ""
                : "animate-[heroContentEnter_900ms_ease-out]"
            }`}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white shadow-lg backdrop-blur-md">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-400/20">
                <Waves aria-hidden="true" className="h-4 w-4 text-green-200" />
              </span>
              {currentSlide.eyebrow}
            </div>

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
          </div>
        </Container>

        <div className="absolute inset-x-0 bottom-0 z-40">
          <Container className="pb-6">
            <div className="border-t border-white/20 pt-4">
              <div
                aria-label={`Slide ${activeSlide + 1} of ${heroSlides.length}`}
                className="flex items-center gap-5"
              >
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Go to slide ${index + 1}: ${slide.eyebrow}`}
                    className={`block h-1.5 rounded-full transition-all duration-700 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300 ${
                      index === activeSlide
                        ? "w-12 bg-green-300 shadow-[0_0_12px_rgba(134,239,172,0.65)]"
                        : "w-6 bg-white/45 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </Container>
        </div>
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