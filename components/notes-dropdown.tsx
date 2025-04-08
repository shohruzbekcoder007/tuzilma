'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Notebook } from "lucide-react"
import { EmployeeCard } from "./org-chart"
import { BASE_URL } from '@/app/utils/API_URLS'
import { useSearch } from '@/contexts/SearchContext'

export function NotesDropdown() {
  const [birthdays, setBirthdays] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const { optionQuery } = useSearch()

  useEffect(() => {
    fetchNotes()
  }, [optionQuery])

  function getAuthToken() {
    const match = document.cookie.match(new RegExp('(^| )auth_token=([^;]+)'));
    return match ? match[2] : null;
  }

  const fetchNotes = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/api/today-birth?soato=${optionQuery}`, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json',
        },
      }
      )
      const data = await response.json()
      // Format data to match Employee interface
      const formattedData = data.map((person: any) => ({
        id: person.id.toString(),
        name: person.full_name,
        position: person.position?.name || '',
        department: person.section?.name || '',
        imageUrl: person.imageUrl,
        birth_date: person.birth_date,
        age: person.age,
        user_id: person.id,
        open: false,
        subordinates: []
      }))
      setBirthdays(formattedData)
    } catch (error) {
      console.error('Error fetching birthdays:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2 relative">
          <Notebook className="h-4 w-4" />
          {birthdays.length > 0 && (
            <Badge
              variant="secondary"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {birthdays.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="p-2">
          {/* <Button size="sm" className="w-full flex items-center gap-2 mb-2">
            <Plus className="h-4 w-4" />
            <span>Янги эслатма</span>
          </Button> */}

          <div className="max-h-[300px] overflow-y-auto">
            {loading ? (
              <div className="text-center py-2 text-sm text-muted-foreground">
                Юкланмоқда...
              </div>
            ) : birthdays.length === 0 ? (
              <div className="text-center py-2 text-sm text-muted-foreground">
                Бугун туғилган кун йўқ
              </div>
            ) : (
              <div className="space-y-2">
                {birthdays.map((person: any) => (
                  <EmployeeCard key={person.id} employee={person} />
                ))}
              </div>
            )}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
