import Link from "next/link"
import {
  ArrowRight,
  Bell,
  Calendar,
  ImageIcon,
  Megaphone,
  Newspaper,
  PlayCircle,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { mediaCategories } from "@/data/media"

const icons = {
  newspaper: Newspaper,
  megaphone: Megaphone,
  calendar: Calendar,
  image: ImageIcon,
  video: PlayCircle,
  bell: Bell,
}

export function MediaCategories() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#2f7d32]">
            Explore Media
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Browse the Media Centre
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Explore the Ministry's latest news, announcements, official
            publications, photo galleries and videos from one place.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {mediaCategories.map((item) => {
            const Icon = icons[item.icon]

            return (
              <Link
                key={item.id}
                href={item.href}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-green-300 hover:shadow-xl"
              >
                {/* Background Decoration */}
                <div
                  aria-hidden="true"
                  className="absolute right-0 top-0 h-40 w-40 rounded-full bg-green-100/40 blur-3xl transition duration-500 group-hover:bg-green-200/60"
                />

                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0a322f] text-white shadow-lg transition group-hover:scale-110">
                    <Icon className="h-8 w-8" />
                  </div>

                  <h3 className="mt-8 text-2xl font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-600">
                    {item.description}
                  </p>

                  <div className="mt-8 inline-flex items-center gap-2 font-semibold text-[#0a322f] transition group-hover:gap-3">
                    Explore
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </Container>
    </section>
  )
}