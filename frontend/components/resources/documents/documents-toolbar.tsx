"use client"

import { Search, SlidersHorizontal } from "lucide-react"

import { documentCategories } from "@/data/documents"

type DocumentsToolbarProps = {
  searchQuery: string
  selectedCategory: string
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
}

export function DocumentsToolbar({
  searchQuery,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
}: DocumentsToolbarProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-4 lg:grid-cols-[1fr_18rem]">
        <div>
          <label
            htmlFor="document-search"
            className="mb-2 block text-sm font-bold text-slate-800"
          >
            Search documents
          </label>

          <div className="relative">
            <Search
              aria-hidden="true"
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            />

            <input
              id="document-search"
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search by title, category or department"
              className="min-h-12 w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="document-category"
            className="mb-2 block text-sm font-bold text-slate-800"
          >
            Filter by category
          </label>

          <div className="relative">
            <SlidersHorizontal
              aria-hidden="true"
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            />

            <select
              id="document-category"
              value={selectedCategory}
              onChange={(event) =>
                onCategoryChange(event.target.value)
              }
              className="min-h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-10 text-slate-950 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
            >
              {documentCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}