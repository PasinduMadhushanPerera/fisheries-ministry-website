"use client"

import { useMemo, useState } from "react"
import {
  CalendarDays,
  Download,
  FileText,
  FolderOpen,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { ministryDocuments } from "@/data/documents"
import { DocumentsToolbar } from "./documents-toolbar"

export function DocumentsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] =
    useState("All Documents")

  const filteredDocuments = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase()

    return ministryDocuments.filter((document) => {
      const matchesCategory =
        selectedCategory === "All Documents" ||
        document.category === selectedCategory

      const matchesSearch =
        normalizedSearch.length === 0 ||
        document.title.toLowerCase().includes(normalizedSearch) ||
        document.description.toLowerCase().includes(normalizedSearch) ||
        document.category.toLowerCase().includes(normalizedSearch) ||
        document.department.toLowerCase().includes(normalizedSearch)

      return matchesCategory && matchesSearch
    })
  }, [searchQuery, selectedCategory])

  return (
    <section
      id="documents-list"
      aria-labelledby="documents-list-heading"
      className="bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#2f7d32]">
            Document library
          </p>

          <h2
            id="documents-list-heading"
            className="mt-3 text-3xl font-bold tracking-[-0.025em] text-slate-950 sm:text-4xl"
          >
            Browse available documents
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Use the search and category filters to find relevant
            Ministry documents and downloadable files.
          </p>
        </div>

        <div className="mt-10">
          <DocumentsToolbar
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            onSearchChange={setSearchQuery}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        <div
          aria-live="polite"
          className="mt-6 flex items-center justify-between gap-4"
        >
          <p className="text-sm font-semibold text-slate-600">
            {filteredDocuments.length}{" "}
            {filteredDocuments.length === 1
              ? "document"
              : "documents"}{" "}
            found
          </p>
        </div>

        {filteredDocuments.length > 0 ? (
          <div className="mt-6 space-y-4">
            {filteredDocuments.map((document) => (
              <article
                key={document.id}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:border-green-300 hover:shadow-lg"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#0a322f] text-white">
                    <FileText
                      aria-hidden="true"
                      className="h-8 w-8"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-green-800">
                        {document.category}
                      </span>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                        {document.fileType}
                      </span>

                      {document.featured ? (
                        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">
                          Featured
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-4 text-xl font-bold text-slate-950 sm:text-2xl">
                      {document.title}
                    </h3>

                    <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                      {document.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-2">
                        <FolderOpen
                          aria-hidden="true"
                          className="h-4 w-4"
                        />
                        {document.department}
                      </span>

                      <span className="inline-flex items-center gap-2">
                        <CalendarDays
                          aria-hidden="true"
                          className="h-4 w-4"
                        />
                        {document.publishedDate}
                      </span>

                      <span>{document.fileSize}</span>
                    </div>
                  </div>

                  <a
                    href={document.href}
                    aria-label={`Download ${document.title}`}
                    className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#0a322f] px-5 py-3 font-semibold text-white transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                  >
                    <Download
                      aria-hidden="true"
                      className="h-5 w-5"
                    />
                    Download
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <FileText
              aria-hidden="true"
              className="mx-auto h-10 w-10 text-slate-400"
            />

            <h3 className="mt-4 text-xl font-bold text-slate-950">
              No documents found
            </h3>

            <p className="mt-2 text-slate-600">
              Try another search term or select a different category.
            </p>
          </div>
        )}
      </Container>
    </section>
  )
}