import type { ComponentPropsWithoutRef, ElementType } from "react"

import { cn } from "@/lib/utils"

type ContainerOwnProps<T extends ElementType> = {
  as?: T
  className?: string
  children: React.ReactNode
}

type ContainerProps<T extends ElementType> =
  ContainerOwnProps<T> &
    Omit<
      ComponentPropsWithoutRef<T>,
      keyof ContainerOwnProps<T>
    >

export function Container<T extends ElementType = "div">({
  as,
  className,
  children,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div"

  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}