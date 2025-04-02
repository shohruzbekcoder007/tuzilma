'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Notebook } from "lucide-react"

export function NotesDropdown() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   fetchNotes()
  // }, [])

  // const fetchNotes = async () => {
  //   try {
  //     const response = await fetch('http://172.16.8.37:8001/api/notes')
  //     const data = await response.json()
  //     setNotes(data)
  //   } catch (error) {
  //     console.error('Error fetching notes:', error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Notebook className="h-4 w-4" />
          {/* <span>Эслатмалар</span> */}
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
            ) : notes.length === 0 ? (
              <div className="text-center py-2 text-sm text-muted-foreground">
                Эслатмалар мавжуд эмас
              </div>
            ) : (
              <div className="space-y-2">
                {notes.map((note: any) => (
                  <div
                    key={note.id}
                    className="p-3 rounded-md border bg-card text-card-foreground"
                  >
                    <h3 className="font-semibold text-sm mb-1">{note.title}</h3>
                    <p className="text-xs text-gray-600 line-clamp-2">{note.content}</p>
                    <div className="mt-2 text-xs text-gray-400">
                      {new Date(note.created_at).toLocaleDateString('uz-UZ')}
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
