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
    <div className="border-b border-slate-200 bg-slate-50">
      <Container className="flex min-h-12 items-center justify-between gap-3">
        <div className="hidden items-center gap-5 text-sm text-slate-700 lg:flex">
          <a
            href="tel:+94000000000"
            className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 font-medium hover:text-[#256B29]"
          >
            <Phone
              aria-hidden="true"
              className="h-4 w-4"
            />
            Ministry telephone
          </a>

          <a
            href="mailto:info@example.gov.lk"
            className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 font-medium hover:text-[#256B29]"
          >
            <Mail
              aria-hidden="true"
              className="h-4 w-4"
            />
            Email the Ministry
          </a>

          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 font-medium hover:text-[#256B29]"
          >
            <CircleHelp
              aria-hidden="true"
              className="h-4 w-4"
            />
            Get help
          </Link>
        </div>

        <p className="hidden text-sm font-medium text-slate-600 md:block lg:hidden">
          Government of Sri Lanka
        </p>

        <div className="ml-auto flex items-center">
          <a
            href="https://www.gov.lk/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center gap-1.5 rounded-md px-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-950 sm:inline-flex"
          >
            Gov.lk

            <ExternalLink
              aria-hidden="true"
              className="h-3.5 w-3.5"
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