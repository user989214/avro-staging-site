import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/lib/cart-context"
import { CartDrawer } from "@/components/cart-drawer"
import { ThemeProvider } from "@/lib/theme-context"

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "AVRO | Calm First Performance",
  description:
    "AVRO is a calm-first daily drink mix made with naturally fermented PharmaGABA to support calm, clarity, focus, and steady energy before pressure-sensitive moments.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/favicon.jpg",
        type: "image/jpeg",
      },
    ],
    apple: "/favicon.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} bg-base`} data-scroll-behavior="smooth">
      <body className="font-sans antialiased bg-base text-ink">
        <ThemeProvider>
          <CartProvider>
            <Header />
            <main className="min-h-[60vh]">{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
