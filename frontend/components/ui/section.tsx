import type { ReactNode } from "react"

import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

type SectionBackground =
  | "white"
  | "soft"
  | "green"
  | "dark"
  | "gradient"

type SectionSpacing = "sm" | "md" | "lg"

type SectionProps = {
  children: ReactNode
  id?: string
  className?: string
  containerClassName?: string
  background?: SectionBackground
  spacing?: SectionSpacing
  labelledBy?: string
  fullWidth?: boolean
}

const backgroundClasses: Record<
  SectionBackground,
  string
> = {
  white: "bg-white",
  soft: "bg-slate-50",
  green: "bg-green-50",
  dark: "bg-slate-950 text-white",
  gradient:
    "bg-gradient-to-br from-green-50 via-white to-sky-50",
}

const spacingClasses: Record<SectionSpacing, string> = {
  sm: "py-10 sm:py-12",
  md: "py-14 sm:py-16 lg:py-20",
  lg: "py-16 sm:py-20 lg:py-24",
}

export function Section({
  children,
  id,
  className,
  containerClassName,
  background = "white",
  spacing = "md",
  labelledBy,
  fullWidth = false,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative overflow-hidden",
        backgroundClasses[background],
        spacingClasses[spacing],
        className,
      )}
    >
      {fullWidth ? (
        children
      ) : (
        <Container className={containerClassName}>
          {children}
        </Container>
      )}
    </section>
  )
}