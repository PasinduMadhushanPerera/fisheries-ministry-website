"use client"

import { Search, X } from "lucide-react"

import { Container } from "@/components/ui/container"
import {
  videoCategories,
  type VideoCategory,
} from "@/data/videos"

type VideoFilterProps = {
  activeCategory: VideoCategory
  searchQuery: string
  onCategoryChange: (category: VideoCategory) => void
  onSearchChange: (query: string) => void
}

export function VideoFilter({
  activeCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange,
}: VideoFilterProps) {
  return (
    <section
      aria-label="Filter videos"
      className="border-y border-slate-200 bg-white py-8"
    >
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <label
              htmlFor="video-search"
              className="text-sm font-bold text-slate-900"
            >
              Search videos
            </label>

            <div className="relative mt-3 max-w-2xl">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              />

              <input
                id="video-search"
                type="search"
                value={searchQuery}
                onChange={(event) =>
                  onSearchChange(event.target.value)
                }
                placeholder="Search by title, category or location"
                autoComplete="off"
                className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-12 text-slate-950 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-green-700 focus:ring-4 focus:ring-green-100"
              />

              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  aria-label="Clear video search"
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                >
                  <X
                    aria-hidden="true"
                    className="h-4 w-4"
                  />
                </button>
              ) : null}
            </div>
          </div>

          <div>
            <p
              id="video-category-label"
              className="text-sm font-bold text-slate-900"
            >
              Filter by category
            </p>

            <div
              role="group"
              aria-labelledby="video-category-label"
              className="mt-3 flex flex-wrap gap-2"
            >
              {videoCategories.map((category) => {
                const isActive = activeCategory === category

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => onCategoryChange(category)}
                    aria-pressed={isActive}
                    className={[
                      "rounded-full border px-4 py-2 text-sm font-semibold transition",
                      "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200",
                      isActive
                        ? "border-green-700 bg-green-700 text-white shadow-sm"
                        : "border-slate-300 bg-white text-slate-700 hover:border-green-300 hover:bg-green-50 hover:text-green-800",
                    ].join(" ")}
                  >
                    {category}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}