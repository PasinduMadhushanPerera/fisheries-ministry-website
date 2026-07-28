import type { Metadata, Viewport } from "next"
import { Noto_Sans } from "next/font/google"

import { siteConfig } from "@/config/site"
import { LanguageProvider } from "@/src/contexts/LanguageContext"

import "./globals.css"

const notoSans = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans",
  fallback: [
    "Arial",
    "Helvetica",
    "system-ui",
    "sans-serif",
  ],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: `${siteConfig.name} | Sri Lanka`,
    template: `%s | ${siteConfig.shortName}`,
  },

  description: siteConfig.description,

  applicationName: siteConfig.shortName,

  authors: [
    {
      name: siteConfig.name,
    },
  ],

  creator: siteConfig.name,
  publisher: siteConfig.governmentName,

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  robots: {
    index: false,
    follow: false,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#388E3C",
}

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en" className={notoSans.variable}>
      <body className="font-[var(--font-noto-sans)] antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}