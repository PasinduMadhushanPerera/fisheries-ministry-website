"use client"

import { useEffect, useState, useTransition } from "react"
import { useLanguage } from "@/src/contexts/LanguageContext"
import { fetchContactPageData, type ApiContactPageData } from "@/lib/api/contact"
import { DepartmentDirectory } from "@/components/contact/department-directory"
import { OfficeLocation } from "@/components/contact/office-location"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactFaq } from "@/components/contact/contact-faq"

interface ContactPageContentProps {
  initialData: ApiContactPageData | null
}

export function ContactPageContent({ initialData }: ContactPageContentProps) {
  const { language } = useLanguage()

  const [data, setData] = useState<ApiContactPageData | null>(initialData)
  const [, startTransition] = useTransition()

  // Fetch backend contact page data whenever active language changes
  useEffect(() => {
    let isMounted = true

    async function loadData() {
      const freshData = await fetchContactPageData(language)
      if (isMounted && freshData) {
        startTransition(() => {
          setData(freshData)
        })
      }
    }

    loadData()

    const handleFocus = () => {
      loadData()
    }
    window.addEventListener("focus", handleFocus)

    return () => {
      isMounted = false
      window.removeEventListener("focus", handleFocus)
    }
  }, [language])

  // Handle hash anchor scrolling (e.g. #contact-faq or #contact-form)
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleHashScroll = () => {
      const hash = window.location.hash
      if (!hash) return

      const targetId = hash.replace("#", "")
      const element = document.getElementById(targetId)

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }

    // Scroll after initial mount and layout render
    const timer = setTimeout(handleHashScroll, 250)

    window.addEventListener("hashchange", handleHashScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("hashchange", handleHashScroll)
    }
  }, [data])

  return (
    <>
      <DepartmentDirectory
        departments={data?.departments}
        badge={data?.settings?.directory_badge}
        title={data?.settings?.directory_title}
        subtitle={data?.settings?.directory_subtitle}
      />

      <OfficeLocation
        settings={data?.settings}
      />

      <ContactForm
        departments={data?.departments}
        settings={data?.settings}
      />

      <ContactFaq
        faqs={data?.faqs}
        badge={data?.settings?.faq_badge}
        title={data?.settings?.faq_title}
        subtitle={data?.settings?.faq_subtitle}
      />
    </>
  )
}
