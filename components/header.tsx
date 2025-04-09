"use client"

import Link from "next/link"
import { Building2, LogOut, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSearch } from "@/contexts/SearchContext"
import { NotesDropdown } from "./notes-dropdown"
import { useState, useEffect } from "react"
import { CustomSelect, OptionType } from "./ui/custom-select"
import { BASE_URL } from "@/app/utils/API_URLS"

interface Employee {
  id: string
  name: string
  position: string
  department: string
}


export function Header() {
  const router = useRouter()
  const { setSearchQuery, searchQuery, searchEmployees, optionQuery, setOptionQuery, regions, setRegions } = useSearch()
  const [searchResults, setSearchResults] = useState<Employee[]>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  function getAuthToken() {
    const match = document.cookie.match(new RegExp('(^| )auth_token=([^;]+)'));
    return match ? match[2] : null;
  }

  useEffect(() => {
    fetch(`${BASE_URL}/api/regions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      }
    }).then(response => response.json()).then(data => {
      setRegions(data?.data)
    }).catch(error => {
      console.error('Error fetching employee details:', error)
    })
  }, [])


  useEffect(() => {
    setSearchResults(searchEmployees)
    if (searchEmployees.length > 0) {
      setIsDropdownOpen(true)
    } else {
      setIsDropdownOpen(false)
    }
  }, [searchEmployees])

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
          {
            regions.length > 0 ? (
              <div className="w-[300px]">
                <CustomSelect options={regions} value={optionQuery} onValueChange={setOptionQuery} searchable={false} />
              </div>
            ) : (<></>)
          }

          <div className="relative hidden md:block">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <div className="relative">
              <Input
                type="search"
                placeholder="Қидириш..."
                className="w-[300px] pl-8"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setIsDropdownOpen(true)
                }}
                onFocus={() => setIsDropdownOpen(true)}
                onBlur={() => {
                  // Delay hiding dropdown to allow clicking on results
                  setTimeout(() => setIsDropdownOpen(false), 200)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                  }
                }}
              />
              {isDropdownOpen && (
                <div className="absolute top-full left-0 w-[300px] mt-1 bg-popover text-popover-foreground shadow-md rounded-md border border-border z-50 py-2">
                  <div className="max-h-[300px] overflow-auto">
                    {searchResults.length > 0 ? (
                      searchResults.map((employee) => (
                        <button
                          key={employee.id}
                          className="w-full px-4 py-2 text-left hover:bg-accent hover:text-accent-foreground flex flex-col gap-0.5"
                          onClick={() => {
                            setIsDropdownOpen(false)
                            const element = document.getElementById(`employee${employee.id}`);
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                            }

                          }}
                        >
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">{employee.position}</div>
                          <div className="text-xs text-muted-foreground">{employee.department}</div>
                        </button>
                      ))
                    ) : (
                      searchQuery.trim() && (
                        <div className="px-4 py-2 text-sm text-muted-foreground">
                          Натижа топилмади
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <a href={`${BASE_URL}/api/employees-export`} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="hidden md:block">
              XLSX
            </Button>
          </a>
          <nav className="hidden md:flex gap-6 items-center">
            <NotesDropdown />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Чиқиш</span>
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
