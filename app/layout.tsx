import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Fraunces, Newsreader } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  weight: ["800", "900"],
})

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
})

export const metadata: Metadata = {
  title: "getstuff.city - The marketplace built for New York",
  description: "Join the waitlist for getstuff.city - Connecting buyers and sellers to get sh*t sold.",
  keywords: [
    "marketplace",
    "New York",
    "NYC",
    "buying",
    "selling",
    "local commerce",
    "community marketplace",
    "waitlist",
    "getstuff",
    "getstuff.city"
  ],
  authors: [{ name: "getstuff.city" }],
  creator: "getstuff.city",
  publisher: "getstuff.city",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://getstuff.city"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://getstuff.city",
    title: "getstuff.city - The marketplace built for New York",
    description: "Join the waitlist for getstuff.city - Connecting buyers and sellers to get sh*t sold.",
    siteName: "getstuff.city",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "getstuff.city - The marketplace built for New York",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "getstuff.city - The marketplace built for New York",
    description: "Join the waitlist for getstuff.city - Connecting buyers and sellers to get sh*t sold.",
    images: ["/og-image.jpg"],
    creator: "@getstuffcity",
    site: "@getstuffcity",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // Replace with actual verification code
  },
  category: "marketplace",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${fraunces.variable} ${newsreader.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
