"use client"

// import { Header } from "@/components/header"
// import { Footer } from "@/components/footer"
// import { usePathname } from "next/navigation"
import { SearchProvider } from "@/contexts/SearchContext"
// import { useMemo } from "react"

export function LayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  // const pathname = usePathname()
  // const isLoginPage = useMemo(() => pathname === "/login", [pathname])

  return (
    <SearchProvider>
      <div className="flex min-h-screen flex-col">
        {/* {!isLoginPage && <Header />} */}
        <main className="flex-1">{children}</main>
        {/* {!isLoginPage && <Footer />} */}
      </div>
    </SearchProvider>
  )
}
