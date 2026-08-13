import {
  Download,
  ExternalLink,
  GitBranch,
  ZoomIn,
} from "lucide-react"
import Image from "next/image"

import { Section } from "@/components/ui/section"
import { SectionTitle } from "@/components/ui/section-title"
import { ApiStructure } from "@/lib/api/about"

const fallbackImage = "/images/about/organizational-structure.jpg"

export function OrganizationalStructure({ initialStructure }: { initialStructure?: ApiStructure }) {
  const eyebrow = initialStructure?.eyebrow || "Administration"
  const title = initialStructure?.title || "Organizational structure"
  const description =
    initialStructure?.description ||
    "View the official administrative and institutional structure of the Ministry."
  const boxTitle = initialStructure?.chart_box_title || "Ministry organizational chart"
  const boxSubtitle = initialStructure?.chart_box_subtitle || "Official administrative reporting structure"
  const chartImage = initialStructure?.chart_image_url || fallbackImage
  const chartPdf = initialStructure?.chart_pdf_url
  const notes =
    initialStructure?.executive_notes ||
    "On smaller screens, scroll horizontally to examine the complete organizational chart or select 'View full size'."

  return (
    <Section
      id="organizational-structure"
      background="soft"
      labelledBy="organizational-structure-heading"
      spacing="lg"
    >
      <SectionTitle
        id="organizational-structure-heading"
        eyebrow={eyebrow}
        title={title}
        description={description}
        align="center"
      />

      <div className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
        <div className="flex flex-col gap-4 border-b border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-[#256B29]">
              <GitBranch
                aria-hidden="true"
                className="h-5 w-5"
              />
            </div>

            <div>
              <h3 className="font-bold text-slate-950">
                {boxTitle}
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                {boxSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {chartPdf && (
              <a
                href={chartPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#256B29] px-4 text-sm font-bold text-white transition hover:bg-[#1b4d1d]"
              >
                <Download aria-hidden="true" className="h-4 w-4" />
                <span>Download PDF</span>
              </a>
            )}

            <a
              href={chartImage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-bold text-slate-800 transition hover:border-green-600 hover:text-[#256B29] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
            >
              <ZoomIn
                aria-hidden="true"
                className="h-4 w-4"
              />
              <span>View full size</span>
              <ExternalLink
                aria-hidden="true"
                className="h-4 w-4"
              />
            </a>
          </div>
        </div>

        <div className="overflow-x-auto p-4 sm:p-7">
          <div className="relative mx-auto min-w-[700px] overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <Image
              src={chartImage}
              alt="Official organizational structure chart of the Ministry of Fisheries, Aquatic and Ocean Resources"
              width={1600}
              height={1100}
              unoptimized
              priority
              className="h-auto w-full object-contain"
            />
          </div>
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-7">
          <p className="text-sm leading-6 text-slate-600">
            {notes}
          </p>
        </div>
      </div>
    </Section>
  )
}