"use client"

import { OptionType } from '@/components/ui/custom-select'
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
  optionQuery: number
  setSearchQuery: (query: string) => void
  setOptionQuery: (query: number) => void
  focusedEmployeeId: string | null
  setFocusedEmployeeId: (id: string | null) => void
  searchEmployees: Employee[]
  setSearchEmployees: React.Dispatch<React.SetStateAction<Employee[]>>
  regions: OptionType[]
  setRegions: React.Dispatch<React.SetStateAction<OptionType[]>>
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [optionQuery, setOptionQuery] = useState(1700)
  const [focusedEmployeeId, setFocusedEmployeeId] = useState<string | null>(null)
  const [searchEmployees, setSearchEmployees] = useState<Employee[]>([])
  const [regions, setRegions] = useState<OptionType[]>([])
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
      setSearchEmployees,
      optionQuery,
      setOptionQuery,
      regions,
      setRegions,
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
