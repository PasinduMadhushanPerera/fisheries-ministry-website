import { Search } from "lucide-react"

export function NewsHero() {
  return (
    <section className="bg-gradient-to-br from-[#073f2a] via-[#256B29] to-[#075985] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-100">
          Ministry updates
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          News and updates
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-100">
          Read the latest Ministry news, announcements, events and public
          updates.
        </p>

        <form
          action="/news"
          method="get"
          role="search"
          className="mt-8 max-w-2xl"
        >
          <label htmlFor="news-search" className="sr-only">
            Search news
          </label>

          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
            />

            <input
              id="news-search"
              name="query"
              type="search"
              maxLength={100}
              placeholder="Search news and announcements"
              className="min-h-14 w-full rounded-xl bg-white py-3 pl-12 pr-4 text-slate-950 outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
            />
          </div>
        </form>
      </div>
    </section>
  )
}