"use client"

import { useMemo, useState } from "react"
import {
  FileText,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import {
  formCategories,
  ministryForms,
} from "@/data/forms"
import { FormCard } from "./form-card"

export function FormsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] =
    useState("All Forms")

  const filteredForms = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase()

    return ministryForms.filter((form) => {
      const matchesCategory =
        selectedCategory === "All Forms" ||
        form.category === selectedCategory

      const searchableContent = [
        form.title,
        form.description,
        form.category,
        form.department,
        form.formNumber ?? "",
        form.language,
      ]
        .join(" ")
        .toLowerCase()

      const matchesSearch =
        normalizedSearch.length === 0 ||
        searchableContent.includes(normalizedSearch)

      return matchesCategory && matchesSearch
    })
  }, [searchQuery, selectedCategory])

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All Forms")
  }

  return (
    <section
      id="forms-list"
      aria-labelledby="forms-list-heading"
      className="bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#2f7d32]">
            Forms directory
          </p>

          <h2
            id="forms-list-heading"
            className="mt-3 text-3xl font-bold tracking-[-0.025em] text-slate-950 sm:text-4xl"
          >
            Browse available forms
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Search by form title, category, form number, department or
            language.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_18rem_auto] lg:items-end">
            <div>
              <label
                htmlFor="form-search"
                className="mb-2 block text-sm font-bold text-slate-800"
              >
                Search forms
              </label>

              <div className="relative">
                <Search
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="form-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder="Title, form number or department"
                  className="min-h-12 w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="form-category"
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
                  id="form-category"
                  value={selectedCategory}
                  onChange={(event) =>
                    setSelectedCategory(event.target.value)
                  }
                  className="min-h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-10 text-slate-950 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
                >
                  {formCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:border-green-600 hover:bg-green-50 hover:text-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
            >
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>

        <p
          aria-live="polite"
          className="mt-6 text-sm font-semibold text-slate-600"
        >
          {filteredForms.length}{" "}
          {filteredForms.length === 1 ? "form" : "forms"} found
        </p>

        {filteredForms.length > 0 ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredForms.map((form) => (
              <FormCard key={form.id} form={form} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <FileText
              aria-hidden="true"
              className="mx-auto h-10 w-10 text-slate-400"
            />

            <h3 className="mt-4 text-xl font-bold text-slate-950">
              No forms found
            </h3>

            <p className="mt-2 text-slate-600">
              Try another search term or choose a different category.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#0a322f] px-5 py-2.5 font-semibold text-white transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
            >
              Reset filters
            </button>
          </div>
        )}

        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
          <p className="text-sm leading-6 text-amber-900">
            Replace all sample forms with officially verified titles, form
            numbers, instructions, languages and download files.
          </p>
        </div>
      </Container>
    </section>
  )
}