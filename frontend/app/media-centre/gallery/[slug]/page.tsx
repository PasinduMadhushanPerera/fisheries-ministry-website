import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { GalleryDetailContent } from "@/components/media/gallery-detail"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"
import { fetchGalleryAlbumBySlug } from "@/lib/api/gallery"
import { getServerLanguage } from "@/lib/get-server-language"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

interface GalleryAlbumPageProps {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{ lang?: string }>
}

export async function generateMetadata({
  params,
  searchParams,
}: GalleryAlbumPageProps): Promise<Metadata> {
  const { slug } = await params
  const lang = await getServerLanguage(searchParams)
  const album = await fetchGalleryAlbumBySlug(slug, lang)

  if (!album) {
    return {
      title: "Gallery Album Not Found - Ministry of Fisheries",
    }
  }

  return {
    title: `${album.title} - Photo Gallery | Ministry of Fisheries`,
    description: album.description,
  }
}

export default async function GalleryAlbumPage({
  params,
  searchParams,
}: GalleryAlbumPageProps) {
  const { slug } = await params
  const lang = await getServerLanguage(searchParams)

  const [album, headerFooterData] = await Promise.all([
    fetchGalleryAlbumBySlug(slug, lang),
    fetchHeaderFooterData(),
  ])

  if (!album) {
    notFound()
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Media Centre", href: "/media-centre/gallery" },
    { label: "Gallery", href: "/media-centre/gallery" },
    { label: album.title },
  ]

  return (
    <>
      <SiteHeader initialHeader={headerFooterData?.header} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb items={breadcrumbItems} />
        <GalleryDetailContent album={album} />
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}