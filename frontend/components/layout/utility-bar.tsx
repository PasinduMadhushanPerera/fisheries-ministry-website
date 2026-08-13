import Link from "next/link"
import {
  CircleHelp,
  ExternalLink,
  Mail,
  Phone,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { AccessibilityMenu } from "./accessibility-menu"
import { LanguageSwitcher } from "./language-switcher"
import { ApiHeaderSetting } from "@/lib/api/header-footer"

export function UtilityBar({ initialHeader }: { initialHeader?: ApiHeaderSetting }) {
  const hotlinePhone = initialHeader?.hotline_phone || "+94 112 327 060"
  const email = initialHeader?.email || "info@fisheries.gov.lk"
  const helpLinkText = initialHeader?.help_link_text || "Get help & contact"
  const helpLinkUrl = initialHeader?.help_link_url || "/contact"
  const govLinkText = initialHeader?.gov_link_text || "Gov.lk"
  const govLinkUrl = initialHeader?.gov_link_url || "https://www.gov.lk/"

  const phoneTel = `tel:${hotlinePhone.replace(/[^0-9+]/g, "")}`

  return (
    <div className="border-b border-slate-200 bg-slate-50/90 text-slate-700">
      <Container className="flex h-10 items-center justify-between transition-all duration-300">
        <div className="hidden items-center gap-5 text-xs text-slate-700 lg:flex">
          <a
            href={phoneTel}
            className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 font-semibold hover:text-[#256B29] transition-colors"
          >
            <Phone
              aria-hidden="true"
              className="h-3.5 w-3.5 text-slate-500"
            />
            <span>{hotlinePhone}</span>
          </a>

          <a
            href={`mailto:${email}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 font-semibold hover:text-[#256B29] transition-colors"
          >
            <Mail
              aria-hidden="true"
              className="h-3.5 w-3.5 text-slate-500"
            />
            <span>{email}</span>
          </a>

          <Link
            href={helpLinkUrl}
            className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 font-semibold hover:text-[#256B29] transition-colors"
          >
            <CircleHelp
              aria-hidden="true"
              className="h-3.5 w-3.5 text-slate-500"
            />
            <span>{helpLinkText}</span>
          </Link>
        </div>

        <p className="hidden text-xs font-semibold text-slate-600 md:block lg:hidden">
          Government of Sri Lanka
        </p>

        <div className="ml-auto flex items-center gap-1">
          <a
            href={govLinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center gap-1.5 rounded-md px-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-950 sm:inline-flex transition-colors"
          >
            <span>{govLinkText}</span>
            <ExternalLink
              aria-hidden="true"
              className="h-3 w-3 text-slate-400"
            />
            <span className="visually-hidden">
              opens in a new tab
            </span>
          </a>

          <LanguageSwitcher />
          <AccessibilityMenu />
        </div>
      </Container>
    </div>
  )
}