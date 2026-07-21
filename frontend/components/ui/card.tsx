import type {
  HTMLAttributes,
  ReactNode,
} from "react"

import { cn } from "@/lib/utils"

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  interactive?: boolean
}

export function Card({
  children,
  className,
  interactive = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white shadow-sm",
        interactive &&
          "transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("p-6 pb-0", className)}
      {...props}
    />
  )
}

export function CardContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("p-6", className)}
      {...props}
    />
  )
}

export function CardFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "border-t border-slate-100 p-6",
        className,
      )}
      {...props}
    />
  )
}