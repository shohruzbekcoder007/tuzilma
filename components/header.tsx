"use client"

import Link from "next/link"
import { Building2, LogOut, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSearch } from "@/contexts/SearchContext"

export function Header() {
  const router = useRouter()
  const { setSearchQuery } = useSearch()

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">Миллий статистика қўмитаси тузилмаси</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Қидириш..."
              className="w-[300px] pl-8"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <nav className="hidden md:flex gap-6 items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleLogout}
              className="ml-4"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </nav>
          <button className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <span className="sr-only">Menyu</span>
          </button>
        </div>
      </div>
    </header>
  )
}
