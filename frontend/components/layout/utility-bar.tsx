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

export function UtilityBar() {
  return (
    <div className="border-b border-slate-200 bg-slate-50/90 text-slate-700">
      <Container className="flex h-10 items-center justify-between transition-all duration-300">
        <div className="hidden items-center gap-5 text-xs text-slate-700 lg:flex">
          <a
            href="tel:+94112327060"
            className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 font-semibold hover:text-[#256B29] transition-colors"
          >
            <Phone
              aria-hidden="true"
              className="h-3.5 w-3.5 text-slate-500"
            />
            <span>+94 112 327 060</span>
          </a>

          <a
            href="mailto:info@fisheries.gov.lk"
            className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 font-semibold hover:text-[#256B29] transition-colors"
          >
            <Mail
              aria-hidden="true"
              className="h-3.5 w-3.5 text-slate-500"
            />
            <span>info@fisheries.gov.lk</span>
          </a>

          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 font-semibold hover:text-[#256B29] transition-colors"
          >
            <CircleHelp
              aria-hidden="true"
              className="h-3.5 w-3.5 text-slate-500"
            />
            <span>Get help & contact</span>
          </Link>
        </div>

        <p className="hidden text-xs font-semibold text-slate-600 md:block lg:hidden">
          Government of Sri Lanka
        </p>

        <div className="ml-auto flex items-center gap-1">
          <a
            href="https://www.gov.lk/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center gap-1.5 rounded-md px-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-950 sm:inline-flex transition-colors"
          >
            <span>Gov.lk</span>
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