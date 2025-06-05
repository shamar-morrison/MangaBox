import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import type { Metadata } from "next"
import { Montserrat, Poppins } from "next/font/google"
import type React from "react"
import "./globals.css"

// Load Poppins font - compatible with Next.js 14.2.26
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

// Load Montserrat font - compatible with Next.js 14.2.26
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
})

export const metadata: Metadata = {
  title: "MangaBox - Discover and Read Manga",
  description: "Discover and read your favorite manga across multiple categories. Powered by MangaDx API.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${montserrat.variable} font-sans min-h-screen bg-[#0a0a0a]`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
