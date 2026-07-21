"use client"

import { useMemo, useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"

import { Container } from "@/components/ui/container"
import {
  annualReports,
  annualReportYears,
} from "@/data/annual-reports"
import { AnnualReportCard } from "./annual-report-card"

export function AnnualReportsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedYear, setSelectedYear] = useState("All Years")

  const filteredReports = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase()

    return annualReports.filter((report) => {
      const matchesYear =
        selectedYear === "All Years" ||
        report.year.toString() === selectedYear

      const matchesSearch =
        normalizedSearch.length === 0 ||
        report.title.toLowerCase().includes(normalizedSearch) ||
        report.description.toLowerCase().includes(normalizedSearch) ||
        report.language.toLowerCase().includes(normalizedSearch) ||
        report.year.toString().includes(normalizedSearch)

      return matchesYear && matchesSearch
    })
  }, [searchQuery, selectedYear])

  return (
    <section
      id="annual-reports-list"
      aria-labelledby="annual-reports-list-heading"
      className="bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#2f7d32]">
            Report archive
          </p>

          <h2
            id="annual-reports-list-heading"
            className="mt-3 text-3xl font-bold tracking-[-0.025em] text-slate-950 sm:text-4xl"
          >
            Browse annual reports by year
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Search the annual report archive or filter reports by reporting
            year.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_18rem]">
            <div>
              <label
                htmlFor="annual-report-search"
                className="mb-2 block text-sm font-bold text-slate-800"
              >
                Search annual reports
              </label>

              <div className="relative">
                <Search
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="annual-report-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder="Search by title, year or language"
                  className="min-h-12 w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="annual-report-year"
                className="mb-2 block text-sm font-bold text-slate-800"
              >
                Filter by year
              </label>

              <div className="relative">
                <SlidersHorizontal
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                />

                <select
                  id="annual-report-year"
                  value={selectedYear}
                  onChange={(event) =>
                    setSelectedYear(event.target.value)
                  }
                  className="min-h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-10 text-slate-950 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
                >
                  {annualReportYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <p
          aria-live="polite"
          className="mt-6 text-sm font-semibold text-slate-600"
        >
          {filteredReports.length}{" "}
          {filteredReports.length === 1 ? "report" : "reports"} found
        </p>

        {filteredReports.length > 0 ? (
          <div className="mt-6 space-y-5">
            {filteredReports.map((report) => (
              <AnnualReportCard
                key={report.id}
                report={report}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <h3 className="text-xl font-bold text-slate-950">
              No annual reports found
            </h3>

            <p className="mt-2 text-slate-600">
              Try another search term or choose a different year.
            </p>
          </div>
        )}

        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
          <p className="text-sm leading-6 text-amber-900">
            Replace all sample annual report records with officially approved
            titles, years, languages, file sizes and download links.
          </p>
        </div>
      </Container>
    </section>
  )
}