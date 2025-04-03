"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface Institution {
  institution_type: string
  institution_name: string
  degree: string
  speciality: string
  diploma_serial: string
  diploma_number: string
  diploma_type: string
  edu_starting_date: string
  edu_finishing_date: string
}

interface Employee {
  id: string
  name: string
  position: string
  department: string
  imageUrl?: string
  open: boolean
  subordinates: Employee[]
  ip_phone?: string
  email?: string
  birth_date?: string
  education?: string
  mobile_phone?: string
  appointment_date?: string
  system_join_date?: string
  age?: number
  employees?: number
  time_in_system?: string
  document?: string,
  user_id?: number
  institutions?: Institution[]
}

interface SearchContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  focusedEmployeeId: string | null
  setFocusedEmployeeId: (id: string | null) => void
  searchEmployees: Employee[]
  setSearchEmployees: React.Dispatch<React.SetStateAction<Employee[]>>
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [focusedEmployeeId, setFocusedEmployeeId] = useState<string | null>(null)
  const [searchEmployees, setSearchEmployees] = useState<Employee[]>([])

  useEffect(() => {
    if (searchQuery == '') {
      setSearchEmployees([])
    }
  }, [searchQuery])

  return (
    <SearchContext.Provider value={{
      searchQuery,
      setSearchQuery,
      focusedEmployeeId,
      setFocusedEmployeeId,
      searchEmployees,
      setSearchEmployees
    }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}
