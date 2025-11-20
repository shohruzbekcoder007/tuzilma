'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Briefcase } from "lucide-react"
import { BASE_URL } from '@/app/utils/API_URLS'
import { useSearch } from '@/contexts/SearchContext'
import { getAuthToken } from '@/lib/utils'

interface VacancyStats {
  total_employees: number
  male_count: number
  female_count: number
  half_rate_count: number
  vacant_positions: number
}

interface VacancyDetail {
  id: number
  full_name: string
  department: string
  section: string
  position: string
  employement_form: number
  imageUrl: string | null
  age: number
  education: string
  birth_date: string
  ip_phone: string
  mobile_phone: string
  appointment_date: string
  system_join_date: string
  time_in_system: string
  document: string | null
}

export function VacanciesDropdown() {
  const [stats, setStats] = useState<VacancyStats | null>(null)
  const [vacancies, setVacancies] = useState<VacancyDetail[]>([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { optionQuery, regions } = useSearch()

  useEffect(() => {
    fetchStats()
  }, [optionQuery])

  const fetchStats = async () => {
    setLoading(true)
    try {
      const url = regions.length > 0 
        ? `${BASE_URL}/api/statistic?soato=${optionQuery}`
        : `${BASE_URL}/api/statistic`
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching vacancy stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchVacancies = async () => {
    setLoading(true)
    try {
      const url = regions.length > 0
        ? `${BASE_URL}/api/vacant?soato=${optionQuery}`
        : `${BASE_URL}/api/vacant`
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      setVacancies(data.data || [])
    } catch (error) {
      console.error('Error fetching vacancies:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (open) {
      fetchVacancies()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <Briefcase className="h-4 w-4" />
          <span>Вакантлар - <span className="font-bold">{stats?.vacant_positions || 0}</span></span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[900px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Вакант штат бирликлари ({stats?.vacant_positions || 0})</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[calc(80vh-100px)]">
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Юкланмоқда...
            </div>
          ) : vacancies.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Вакант штат бирликлари йўқ
            </div>
          ) : (
            <div className="border rounded-lg">
              <table className="w-full">
                <thead className="bg-gray-100 sticky top-0">
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left text-sm font-medium">№</th>
                    <th className="py-3 px-4 text-left text-sm font-medium">Ф.И.О</th>
                    <th className="py-3 px-4 text-left text-sm font-medium">Бўлим</th>
                    <th className="py-3 px-4 text-left text-sm font-medium">Лавозим</th>
                    <th className="py-3 px-4 text-left text-sm font-medium">Ставка</th>
                  </tr>
                </thead>
                <tbody>
                  {vacancies.map((vacancy, index) => (
                    <tr key={vacancy.id} className="border-b last:border-b-0 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm">{index + 1}</td>
                      <td className="py-3 px-4 text-sm">{vacancy.full_name}</td>
                      <td className="py-3 px-4 text-sm">{vacancy.section}</td>
                      <td className="py-3 px-4 text-sm">{vacancy.position}</td>
                      <td className="py-3 px-4 text-sm">
                        {vacancy.employement_form === 1 ? '0.5' : '1.0'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
