import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger"

type ButtonSize =
  | "small"
  | "medium"
  | "large"

const baseStyles =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-4 font-semibold leading-6 no-underline transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-[#388E3C] bg-[#388E3C] text-white hover:border-[#256B29] hover:bg-[#256B29]",

  secondary:
    "border-slate-900 bg-slate-900 text-white hover:border-slate-700 hover:bg-slate-700",

  outline:
    "border-[#388E3C] bg-white text-[#256B29] hover:bg-green-50",

  danger:
    "border-red-700 bg-red-700 text-white hover:border-red-800 hover:bg-red-800",
}

const sizeStyles: Record<ButtonSize, string> = {
  small: "min-h-11 px-3 py-2 text-sm",
  medium: "min-h-11 px-4 py-2.5 text-base",
  large: "min-h-12 px-5 py-3 text-base",
}

type ButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant
    size?: ButtonSize
    children: ReactNode
  }

export function Button({
  type = "button",
  variant = "primary",
  size = "medium",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

type LinkButtonProps = {
  href: string
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: ReactNode
  external?: boolean
}

export function LinkButton({
  href,
  variant = "primary",
  size = "medium",
  className,
  children,
  external = false,
}: LinkButtonProps) {
  const combinedClassName = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className,
  )

  if (external) {
    return (
      <a
        href={href}
        className={combinedClassName}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}

        <span className="visually-hidden">
          {" "}
          (opens in a new tab)
        </span>
      </a>
    )
  }

  return (
    <Link href={href} className={combinedClassName}>
      {children}
    </Link>
  )
}   