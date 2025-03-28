"use client"

import Link from "next/link"
import { Building2, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function Header() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">Миллий статистика қўмитаси тузилмаси</span>
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Бош саҳифа
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Раҳбарият
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Тузилма
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Ҳужжатлар
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Алоқа
          </Link>
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
    </header>
  )
}
