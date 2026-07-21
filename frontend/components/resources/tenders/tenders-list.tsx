"use client"

import { useMemo, useState } from "react"
import {
  BriefcaseBusiness,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import {
  ministryTenders,
  tenderCategories,
  tenderStatuses,
} from "@/data/tenders"
import { TenderCard } from "./tender-card"

export function TendersList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] =
    useState("All Tenders")
  const [selectedStatus, setSelectedStatus] =
    useState("All Statuses")

  const filteredTenders = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase()

    return ministryTenders.filter((tender) => {
      const matchesCategory =
        selectedCategory === "All Tenders" ||
        tender.category === selectedCategory

      const matchesStatus =
        selectedStatus === "All Statuses" ||
        tender.status === selectedStatus

      const searchableContent = [
        tender.referenceNumber,
        tender.title,
        tender.description,
        tender.category,
        tender.department,
        tender.status,
        tender.year.toString(),
      ]
        .join(" ")
        .toLowerCase()

      const matchesSearch =
        normalizedSearch.length === 0 ||
        searchableContent.includes(normalizedSearch)

      return matchesCategory && matchesStatus && matchesSearch
    })
  }, [searchQuery, selectedCategory, selectedStatus])

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All Tenders")
    setSelectedStatus("All Statuses")
  }

  return (
    <section
      id="tenders-list"
      aria-labelledby="tenders-list-heading"
      className="bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#2f7d32]">
            Procurement notices
          </p>

          <h2
            id="tenders-list-heading"
            className="mt-3 text-3xl font-bold tracking-[-0.025em] text-slate-950 sm:text-4xl"
          >
            Browse Ministry tenders
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Search by tender title, reference number, department, category
            or status.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="grid gap-4 xl:grid-cols-[1fr_17rem_15rem_auto] xl:items-end">
            <div>
              <label
                htmlFor="tender-search"
                className="mb-2 block text-sm font-bold text-slate-800"
              >
                Search tenders
              </label>

              <div className="relative">
                <Search
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="tender-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder="Title, reference or department"
                  className="min-h-12 w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="tender-category"
                className="mb-2 block text-sm font-bold text-slate-800"
              >
                Category
              </label>

              <div className="relative">
                <SlidersHorizontal
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                />

                <select
                  id="tender-category"
                  value={selectedCategory}
                  onChange={(event) =>
                    setSelectedCategory(event.target.value)
                  }
                  className="min-h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-10 text-slate-950 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
                >
                  {tenderCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="tender-status"
                className="mb-2 block text-sm font-bold text-slate-800"
              >
                Status
              </label>

              <select
                id="tender-status"
                value={selectedStatus}
                onChange={(event) =>
                  setSelectedStatus(event.target.value)
                }
                className="min-h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
              >
                {tenderStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
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
          {filteredTenders.length}{" "}
          {filteredTenders.length === 1 ? "tender" : "tenders"} found
        </p>

        {filteredTenders.length > 0 ? (
          <div className="mt-6 space-y-5">
            {filteredTenders.map((tender) => (
              <TenderCard key={tender.id} tender={tender} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <BriefcaseBusiness
              aria-hidden="true"
              className="mx-auto h-10 w-10 text-slate-400"
            />

            <h3 className="mt-4 text-xl font-bold text-slate-950">
              No tenders found
            </h3>

            <p className="mt-2 text-slate-600">
              Try changing the search term, category or status.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#0a322f] px-5 py-2.5 font-semibold text-white transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
            >
              Reset filters
            </button>
          </div>
        )}

        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
          <p className="text-sm leading-6 text-amber-900">
            Replace all sample tender notices with officially verified
            references, publication dates, closing dates, statuses and
            downloadable documents.
          </p>
        </div>
      </Container>
    </section>
  )
}