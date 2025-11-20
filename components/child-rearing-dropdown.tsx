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
import { Baby } from "lucide-react"
import { BASE_URL, CHILD_REARING_API } from '@/app/utils/API_URLS'
import { useSearch } from '@/contexts/SearchContext'
import { getAuthToken } from '@/lib/utils'

interface ChildRearingStats {
  child_rearing_counts: number
}

interface ChildRearingDetail {
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

export function ChildRearingDropdown() {
  const [stats, setStats] = useState<ChildRearingStats | null>(null)
  const [childRearingList, setChildRearingList] = useState<ChildRearingDetail[]>([])
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
      setStats({ child_rearing_counts: data.child_rearing_counts || 0 })
    } catch (error) {
      console.error('Error fetching child rearing stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchChildRearingList = async () => {
    setLoading(true)
    try {
      const url = regions.length > 0
        ? `${CHILD_REARING_API}?soato=${optionQuery}`
        : CHILD_REARING_API
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      setChildRearingList(data.data || [])
    } catch (error) {
      console.error('Error fetching child rearing list:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (open) {
      fetchChildRearingList()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-2 text-pink-600 hover:text-pink-700"
        >
          <Baby className="h-4 w-4" />
          <span>Болани парвариш қилиш - <span className="font-bold">{stats?.child_rearing_counts || 0}</span></span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[900px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Болани парвариш қилиш таътилидаги ходимлар ({stats?.child_rearing_counts || 0})</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[calc(80vh-100px)]">
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Юкланмоқда...
            </div>
          ) : childRearingList.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Болани парвариш қилиш таътилида ходимлар йўқ
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
                    <th className="py-3 px-4 text-left text-sm font-medium">Ёши</th>
                  </tr>
                </thead>
                <tbody>
                  {childRearingList.map((person, index) => (
                    <tr key={person.id} className="border-b last:border-b-0 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm">{index + 1}</td>
                      <td className="py-3 px-4 text-sm">{person.full_name}</td>
                      <td className="py-3 px-4 text-sm">{person.section}</td>
                      <td className="py-3 px-4 text-sm">{person.position}</td>
                      <td className="py-3 px-4 text-sm">
                        {person.employement_form === 1 ? '0.5' : '1.0'}
                      </td>
                      <td className="py-3 px-4 text-sm">{person.age}</td>
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
