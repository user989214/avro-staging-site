import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/lib/cart-context"
import { CartDrawer } from "@/components/cart-drawer"

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
    <html lang="en" className="bg-paper" data-scroll-behavior="smooth">
      <head>
        <link rel="preload" href="/fonts/GothamCond-Bold.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/GothamCond-Book.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/GothamCond-Medium.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/GothamCond-Ultra.woff" as="font" type="font/woff" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
        <CartProvider>
          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
