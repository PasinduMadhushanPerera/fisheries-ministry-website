"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Phone,
  Printer,
  SearchX,
  ShieldCheck,
  Sparkles,
  Tag,
  UserCheck,
  X,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { EventsToolbar } from "@/components/media/events-toolbar"
import { useLanguage } from "@/src/contexts/LanguageContext"
import {
  fetchEventsPageData,
  type ApiEventItem,
  type ApiEventsPageData,
} from "@/lib/api/events"
import { stripHtml } from "@/lib/utils"

interface EventsListProps {
  initialData?: ApiEventsPageData | null
}

export function EventsList({ initialData }: EventsListProps) {
  const { language } = useLanguage()
  const [data, setData] = useState<ApiEventsPageData | null>(initialData || null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("newest")
  const [selectedEvent, setSelectedEvent] = useState<ApiEventItem | null>(null)

  // Function to load fresh localized events
  const loadFreshEvents = useCallback(async () => {
    try {
      const freshData = await fetchEventsPageData(language)
      if (freshData) {
        setData(freshData)
      }
    } catch (err) {
      console.error("Failed to load fresh events data:", err)
    }
  }, [language])

  // Refetch on mount, language switch, and window focus
  useEffect(() => {
    void loadFreshEvents()

    const handleWindowFocus = () => {
      void loadFreshEvents()
    }
    window.addEventListener("focus", handleWindowFocus)

    return () => {
      window.removeEventListener("focus", handleWindowFocus)
    }
  }, [loadFreshEvents])

  // Events from database
  const events = useMemo(() => {
    return data?.events || []
  }, [data])

  // Dynamic category options matching backend choices
  const categories = useMemo(() => {
    return [
      {
        key: "All",
        label: language === "si" ? "සියල්ල" : language === "ta" ? "அனைத்தும்" : "All Events",
      },
      {
        key: "symposiums_conferences",
        label: language === "si" ? "සම්මන්ත්‍රණ සහ සමුළු" : language === "ta" ? "கருத்தரங்குகள் & மாநாடுகள்" : "Symposiums & Conferences",
      },
      {
        key: "workshops_training",
        label: language === "si" ? "වැඩමුළු සහ පුහුණු" : language === "ta" ? "பட்டறைகள் & பயிற்சிகள்" : "Workshops & Training",
      },
      {
        key: "stakeholder_forums",
        label: language === "si" ? "පාර්ශ්වකරුවන්ගේ සංසද" : language === "ta" ? "பங்குதாரர் மன்றங்கள்" : "Stakeholder Forums",
      },
      {
        key: "community_outreach",
        label: language === "si" ? "ප්‍රජා සත්කාරක වැඩසටහන්" : language === "ta" ? "சமூக மேம்பாட்டு நிகழ்வுகள்" : "Community Outreach",
      },
    ]
  }, [language])

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setSortBy("newest")
  }

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase()

    let result = events.filter((event) => {
      // Search keyword filter
      if (keyword) {
        const matchesKeyword =
          event.title.toLowerCase().includes(keyword) ||
          event.summary.toLowerCase().includes(keyword) ||
          event.location.toLowerCase().includes(keyword) ||
          event.venue.toLowerCase().includes(keyword) ||
          event.organizer.toLowerCase().includes(keyword) ||
          event.reference_number.toLowerCase().includes(keyword) ||
          event.category_label.toLowerCase().includes(keyword)

        if (!matchesKeyword) return false
      }

      // Category filter
      if (selectedCategory !== "All") {
        const itemCategory = (event.category || "").toLowerCase().trim()
        const targetCategory = selectedCategory.toLowerCase().trim()
        if (itemCategory !== targetCategory) return false
      }

      return true
    })

    // Sort events
    result = [...result].sort((a, b) => {
      if (sortBy === "event-date") {
        return (a.date ?? "").localeCompare(b.date ?? "")
      }
      if (sortBy === "featured") {
        return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0)
      }
      if (sortBy === "title-az") {
        return a.title.localeCompare(b.title)
      }
      // default: newest
      return (
        (b.date ?? "").localeCompare(a.date ?? "") ||
        a.order - b.order
      )
    })

    return result
  }, [events, searchQuery, selectedCategory, sortBy])

  // Prevent background scroll when modal open
  useEffect(() => {
    if (selectedEvent) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [selectedEvent])

  return (
    <>
      {/* 1. STANDARDIZED SEARCH & FILTER TOOLBAR MATCHING NOTICES & PRESS RELEASES */}
      <EventsToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
        resultCount={filteredEvents.length}
        onClearFilters={handleClearFilters}
      />

      {/* 2. MAIN EVENTS GRID SECTION WITH EXACT CARD ITEM DESIGN */}
      <section className="bg-slate-50/80 py-12 sm:py-16">
        <Container>
          <div className="flex flex-col gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-3.5 py-1 text-xs font-extrabold text-[#256B29] border border-emerald-200/80 shadow-2xs">
                <Sparkles className="h-3.5 w-3.5 text-[#256B29]" aria-hidden="true" />
                <span>{data?.header?.catalogue_badge || "Events Library"}</span>
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                {data?.header?.library_title || (selectedCategory === "All" ? "All Ministry Events & Programmes" : selectedCategory)}
              </h2>
            </div>

            <p aria-live="polite" className="text-xs font-extrabold text-slate-500">
              Showing {filteredEvents.length}{" "}
              {filteredEvents.length === 1 ? "event" : "events"}
            </p>
          </div>

          {filteredEvents.length > 0 ? (
            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              {filteredEvents.map((event) => (
                <article
                  key={event.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex flex-col h-full justify-between">
                    {/* Header Banner - Premium Ocean Dark Gradient with White Text */}
                    <button
                      type="button"
                      onClick={() => setSelectedEvent(event)}
                      className="relative block w-full text-left bg-[linear-gradient(135deg,#041c22_0%,#093835_55%,#0c4e48_100%)] p-6 sm:p-7 text-white cursor-pointer overflow-hidden"
                    >
                      <div
                        aria-hidden="true"
                        className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-emerald-400/10 blur-2xl group-hover:bg-emerald-400/20 transition-all duration-500"
                      />

                      <div className="relative z-10">
                        <div className="flex items-center justify-between gap-3">
                          <span className="rounded-lg bg-white/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-emerald-300 backdrop-blur-md border border-white/10">
                            {event.category_label || event.category}
                          </span>

                          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-300 bg-black/20 px-2.5 py-1 rounded-md border border-white/10">
                            <Tag className="h-3 w-3 text-emerald-400" />
                            <span>{event.reference_number}</span>
                          </span>
                        </div>

                        <h3 className="mt-4 text-xl sm:text-2xl font-extrabold leading-snug !text-white group-hover:text-emerald-300 transition-colors">
                          {stripHtml(event.title)}
                        </h3>
                      </div>
                    </button>

                    {/* Content Details */}
                    <div className="p-6 sm:p-7 space-y-5 flex-1 flex flex-col justify-between">
                      {/* Justified Text Content */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify font-normal">
                        {stripHtml(event.summary)}
                      </p>

                      <div className="space-y-2.5 border-t border-slate-100 pt-5 text-xs font-semibold text-slate-700">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#256B29]">
                            <CalendarDays className="h-4 w-4" />
                          </div>
                          <span className="font-bold text-slate-900">{event.display_date || event.date}</span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-500">{event.time}</span>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#256B29]">
                            <MapPin className="h-4 w-4" />
                          </div>
                          <span className="text-slate-800">{event.venue}</span>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#256B29]">
                            <UserCheck className="h-4 w-4" />
                          </div>
                          <span className="text-slate-600">{event.organizer}</span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                        <span className="text-[11px] font-extrabold uppercase tracking-wide text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                          {event.status}
                        </span>

                        <button
                          type="button"
                          onClick={() => setSelectedEvent(event)}
                          className="inline-flex items-center gap-2 rounded-xl bg-[#256B29] px-4 py-2.5 text-xs font-extrabold text-white hover:bg-[#1b4d1d] shadow-2xs transition-all cursor-pointer group/btn"
                        >
                          <span>View Full Agenda</span>
                          <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <SearchX className="mx-auto h-12 w-12 text-slate-400" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-bold text-slate-900">No events match your criteria</h3>
              <p className="mt-1 text-xs text-slate-600">Try searching with a different keyword or category filter.</p>
              <button
                type="button"
                onClick={handleClearFilters}
                className="mt-5 rounded-xl bg-[#256B29] px-5 py-2.5 text-xs font-extrabold text-white transition hover:bg-[#1b4d1d] cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* 3. ULTRA-PREMIUM EVENT DETAILS MODAL / POPUP WITH WHITE TITLE (EXACT ORIGINAL DESIGN) */}
      {selectedEvent && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-detail-modal-title"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 p-4 sm:p-6 backdrop-blur-md overflow-y-auto"
        >
          <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Premium Dark Header Bar with White Title */}
            <div className="flex shrink-0 flex-col gap-3 border-b border-slate-200 px-6 sm:px-8 py-6 bg-[linear-gradient(135deg,#041c22_0%,#093835_55%,#0c4e48_100%)] text-white relative overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-400/10 blur-2xl"
              />

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="rounded-lg bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-300 shadow-xs">
                    {selectedEvent.category_label || selectedEvent.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-300 bg-black/20 px-2.5 py-1 rounded-md border border-white/10">
                    Ref: {selectedEvent.reference_number}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:bg-white hover:text-slate-900 transition-colors cursor-pointer"
                  aria-label="Close event modal"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {/* Event Title in Pure White Text */}
              <div className="relative z-10 mt-1">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-300 flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  Official Ministry Event
                </span>
                <h3 id="event-detail-modal-title" className="text-2xl sm:text-3xl font-extrabold !text-white leading-snug tracking-tight">
                  {stripHtml(selectedEvent.title)}
                </h3>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              {/* Event Metadata Grid Card */}
              <div className="grid sm:grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 text-xs text-slate-700 shadow-2xs">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 font-bold text-slate-900">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-[#256B29]">
                      <CalendarDays className="h-4 w-4" />
                    </div>
                    <span>Date: {selectedEvent.display_date || selectedEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-[#256B29]">
                      <Clock3 className="h-4 w-4" />
                    </div>
                    <span>Time: {selectedEvent.time}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-[#256B29] mt-0.5">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">Venue:</span>
                      <p className="text-slate-600">{selectedEvent.venue}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-[#256B29]">
                      <UserCheck className="h-4 w-4" />
                    </div>
                    <span>Organizer: {selectedEvent.organizer}</span>
                  </div>
                </div>
              </div>

              {/* Description Paragraphs with Text Justify */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal text-justify">
                {selectedEvent.description_paragraphs && selectedEvent.description_paragraphs.length > 0 ? (
                  selectedEvent.description_paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-justify">
                      {stripHtml(paragraph)}
                    </p>
                  ))
                ) : (
                  <p className="text-justify">{stripHtml(selectedEvent.description || selectedEvent.summary)}</p>
                )}
              </div>

              {/* Program Schedule & Agenda Timeline */}
              {selectedEvent.agenda && selectedEvent.agenda.length > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                      <Clock3 className="h-4 w-4 text-[#256B29]" />
                      <span>Program Schedule & Timings</span>
                    </h4>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                      Session Agenda
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {selectedEvent.agenda.map((item, index) => (
                      <li key={index} className="flex items-start gap-3.5 text-xs text-slate-700 border-b border-slate-50 last:border-0 pb-2.5 last:pb-0">
                        <span className="font-mono font-bold text-[#256B29] bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/80 shrink-0">
                          {item.time}
                        </span>
                        <span className="mt-1 font-semibold text-slate-800 text-justify">{item.topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Official Contact & Verification Banner */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-800">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-[#256B29] shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900">Authenticated Event</p>
                    <p className="text-slate-600 text-justify">Official event organized by Ministry of Fisheries. Contact: {selectedEvent.contact_email}</p>
                  </div>
                </div>
                {selectedEvent.contact_phone && (
                  <div className="flex items-center gap-2 font-bold text-[#256B29] bg-white px-3.5 py-2 rounded-xl border border-emerald-200 shrink-0">
                    <Phone className="h-4 w-4" />
                    <span>{selectedEvent.contact_phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Action Bar Footer */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-200 px-6 py-4 bg-slate-50">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <Printer className="h-4 w-4 text-slate-500" />
                <span>Print Agenda</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="inline-flex min-h-[40px] items-center gap-2 rounded-xl bg-[#256B29] px-6 text-xs font-extrabold text-white hover:bg-[#1b4d1d] transition cursor-pointer shadow-2xs"
              >
                <span>Close Event Window</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
