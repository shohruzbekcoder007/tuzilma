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

export function NotesDropdown() {
  const [birthdays, setBirthdays] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://172.16.8.37:8001/api/today-birth')
      const data = await response.json()
      setBirthdays(data)
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
      <DropdownMenuContent align="end" className="w-[300px]">
        <div className="p-2">
          {/* <Button size="sm" className="w-full flex items-center gap-2 mb-2">
            <Plus className="h-4 w-4" />
            <span>Янги эслатма</span>
          </Button> */}
          
          <div className="max-h-[400px] overflow-y-auto">
            {loading ? (
              <div className="text-center py-2 text-sm text-muted-foreground">
                Юкланмоқда...
              </div>
            ) : birthdays.length === 0 ? (
              <div className="text-center py-2 text-sm text-muted-foreground">
                Бугун туғилган кун йўқ
              </div>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {birthdays.map((person: any) => (
                  <div
                    key={person.id}
                    className="p-3 rounded-md border bg-card text-card-foreground"
                  >
                    <div className="flex items-start gap-3">
                      <img 
                        src={person.imageUrl} 
                        alt={person.full_name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-sm mb-1">{person.full_name}</h3>
                        <p className="text-xs text-gray-600">{person.position?.name}</p>
                        <p className="text-xs text-gray-600">{person.section?.name}</p>
                        <div className="mt-1 text-xs text-gray-400">
                          Туғилган куни: {new Date(person.birth_date).toLocaleDateString('uz-UZ')}
                        </div>
                        <div className="mt-1 text-xs text-gray-400">
                          Ёши: {person.age}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
