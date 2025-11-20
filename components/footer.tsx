"use client"

import { Baby, Briefcase, Building, CircleUserRound, Search, Settings, Shield, User, UserMinus, UserRound, UserRoundCog, Users, UserSearch } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { useEffect, useMemo, useState } from "react"
import { BASE_URL } from "@/app/utils/API_URLS"
import { useSearch } from "@/contexts/SearchContext"
import { getAuthToken } from "@/lib/utils"

interface Statistic {
  "employees_count": number,
  "work_place_count": number,
  "work_place_management_count": number,
  "work_place_service_count": number,
  "work_place_technical_count": number,
  "employees_management_count": number,
  "employees_service_count": number,
  "employees_technical_count": number,
  "open_work_count": number,
  "half_workers_count": number,
  "male_employees": number,
  "female_employees": number,
  "child_rearing_counts": number
}

interface Department {
  id: number
  name: string
}

interface Section {
  id: number
  name: string
}

interface Position {
  id: number
  name: string
}

interface Work {
  id: number
  position: Position | null
  department: Department | null
  section: Section | null
  employement_form: string
}

interface ChildRearingEmployee {
  id: number
  full_name: string
  department: string
  section: string
  position: string
  employement_form: number
  age: number
}

export function Footer() {
  const [isOpen, setIsOpen] = useState(false)
  const [isChildRearingOpen, setIsChildRearingOpen] = useState(false)

  const [statistic, setStatistic] = useState<Statistic>({} as Statistic)
  const [workList, setWorkList] = useState<Work[]>([] as Work[])
  const [childRearingList, setChildRearingList] = useState<ChildRearingEmployee[]>([] as ChildRearingEmployee[])
  const { optionQuery, regions } = useSearch()



  useMemo(() => {
    if (regions.length > 0) {
      fetch(`${BASE_URL}/api/statistic?soato=${optionQuery}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`,
        }
      }).then(response => response.json()).then(data => {
        setStatistic(data)
      }).catch(error => {
        console.error('Error fetching employee details:', error)
      })
    } else {
      fetch(`${BASE_URL}/api/statistic`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`,
        }
      }).then(response => response.json()).then(data => {
        setStatistic(data)
      }).catch(error => {
        console.error('Error fetching employee details:', error)
      })
    }

  }, [optionQuery])

  useEffect(() => {
    if (isOpen) {
      if (regions.length > 0) {
        fetch(`${BASE_URL}/api/open-work?soato=${optionQuery}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`,
          }
        }).then(response => response.json()).then(data => {
          setWorkList(data.data.sort((a: Work, b: Work) => a.id - b.id))
        }).catch(error => {
          console.error('Error fetching employee details:', error)
        })
      } else {
        fetch(`${BASE_URL}/api/open-work`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`,
          }
        }).then(response => response.json()).then(data => {
          setWorkList(data.data.sort((a: Work, b: Work) => a.id - b.id))
        }).catch(error => {
          console.error('Error fetching employee details:', error)
        })
      }
    }
  }, [isOpen, optionQuery])

  useEffect(() => {
    if (isChildRearingOpen) {
      if (regions.length > 0) {
        fetch(`${BASE_URL}/api/in-child-rearing?soato=${optionQuery}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`,
          }
        }).then(response => response.json()).then(data => {
          setChildRearingList(data.data || [])
        }).catch(error => {
          console.error('Error fetching child rearing list:', error)
        })
      } else {
        fetch(`${BASE_URL}/api/in-child-rearing`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`,
          }
        }).then(response => response.json()).then(data => {
          setChildRearingList(data.data || [])
        }).catch(error => {
          console.error('Error fetching child rearing list:', error)
        })
      }
    }
  }, [isChildRearingOpen, optionQuery])


  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <footer className="w-full border-t bg-background py-2 sticky bottom-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-2 px-4 md:px-6">

        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left w-[30%]">
          <p className="text-muted-foreground text-[12px]">
            {year ? `${year} Миллий статистика қўмитаси.` : "Миллий статистика қўмитаси."} <br />
            Барча ҳуқуқлар ҳимояланган.
          </p>
          <span className="text-xs text-muted-foreground">Манзил: Тошкент шаҳри, Мустақиллик кўчаси, 63-уй</span>
        </div>

        <div className="hidden md:block border-l h-[60px] border-[rgb(209 212 218)]"></div>

        <div className="flex gap-2 w-[70%]">

          <div className="w-full flex flex-col md:flex-row justify-between gap-2 px-0 md:px-0 pt-2">

            <div className="flex flex-col items-center md:items-start gap-0 text-center md:text-left justify-start gap-[5px]">
              <p className="text-[12px] text-muted-foreground flex items-center gap-1">
                <Users className="h-4 w-4" /> Ходимлар - <span className="font-bold text-blue-500">{statistic?.employees_count}</span> / <span className="font-bold text-green-500">{statistic?.work_place_count}</span>
              </p>
              <p className="text-[12px] text-muted-foreground flex items-center gap-1">
                <Briefcase className="h-4 w-4" /> Бошқарув ходимлар - <span className="font-bold text-blue-500">{statistic?.employees_management_count}</span> / <span className="font-bold text-green-500">{statistic?.work_place_management_count}</span>
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start gap-0 text-center md:text-left justify-start gap-[5px]">
              <p className="text-[12px] text-muted-foreground flex items-center gap-1">
                <UserRoundCog className="h-4 w-4" /> Техник ходимлар - <span className="font-bold text-blue-500">{statistic?.employees_technical_count}</span> / <span className="font-bold text-green-500">{statistic?.work_place_technical_count}</span>
              </p>
              <p className="text-[12px] text-muted-foreground flex items-center gap-1">
                <Users className="h-4 w-4" /> Хизмат кўрсатувчилар - <span className="font-bold text-blue-500">{statistic?.employees_service_count}</span> / <span className="font-bold text-green-500">{statistic?.work_place_service_count}</span>
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start gap-0 text-center md:text-left justify-start gap-[5px]">
              <p className="text-[12px] text-muted-foreground flex items-center gap-1 pl-3">
                <UserMinus className="h-4 w-4" />  0,5 ставкалар - <span className="font-bold text-blue-500">{statistic?.half_workers_count}</span>
              </p>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <Button
                  variant="outline"
                  size="sm"
                  style={{ fontSize: '12px' }}
                  className="text-sm text-muted-foreground flex items-center gap-1"
                  onClick={() => setIsOpen(true)}
                >
                  <UserSearch className="h-4 w-4" /> Вакантлар - <span className="font-bold text-blue-500">{statistic?.open_work_count}</span>
                </Button>
                <DialogContent className="max-w-[850px] w-[90vw]">
                  <DialogHeader>
                    <DialogTitle>Вакант лавозимлар рўйхати</DialogTitle>
                  </DialogHeader>
                  <div className="overflow-auto max-h-[60vh]">
                    <div className="overflow-auto max-h-[calc(60vh-4.5rem)]">
                      <table className="w-full">
                        <thead className="bg-gray-500/90 sticky top-0">
                          <tr>
                            <th className="py-2 px-4 text-sm text-left text-white">Лавозим</th>
                            <th className="py-2 px-4 text-sm text-left text-white">Бошқарма номи</th>
                            <th className="py-2 px-4 text-sm text-left text-white">Бўлим номи</th>
                            <th className="py-2 px-4 text-sm text-left text-white">Штат</th>
                          </tr>
                        </thead>
                        <tbody>
                          {workList.map(work => (
                            <tr key={work.id} className="border-b">
                              <td className="py-2 px-4 text-sm">{work.position?.name}</td>
                              <td className="py-2 px-4 text-sm">{work.department?.name}</td>
                              <td className="py-2 px-4 text-sm">{work.section?.name}</td>
                              <td className="py-2 px-4 text-sm">{work.employement_form}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Dialog open={isChildRearingOpen} onOpenChange={setIsChildRearingOpen}>
                <Button
                  variant="outline"
                  size="sm"
                  style={{ fontSize: '12px' }}
                  className="text-sm text-muted-foreground flex items-center gap-1"
                  onClick={() => setIsChildRearingOpen(true)}
                >
                  <Baby className="h-4 w-4" /> Бола парваришида - <span className="font-bold text-pink-500">{statistic?.child_rearing_counts || 0}</span>
                </Button>
                <DialogContent className="max-w-[850px] w-[90vw]">
                  <DialogHeader>
                    <DialogTitle>Болани парвариш қилиш таътилидаги ходимлар рўйхати</DialogTitle>
                  </DialogHeader>
                  <div className="overflow-auto max-h-[60vh]">
                    <div className="overflow-auto max-h-[calc(60vh-4.5rem)]">
                      <table className="w-full">
                        <thead className="bg-gray-500/90 sticky top-0">
                          <tr>
                            <th className="py-2 px-4 text-sm text-left text-white">Ф.И.О</th>
                            <th className="py-2 px-4 text-sm text-left text-white">Лавозим</th>
                            <th className="py-2 px-4 text-sm text-left text-white">Бўлим номи</th>
                            <th className="py-2 px-4 text-sm text-left text-white">Ёши</th>
                            <th className="py-2 px-4 text-sm text-left text-white">Штат</th>
                          </tr>
                        </thead>
                        <tbody>
                          {childRearingList.map(employee => (
                            <tr key={employee.id} className="border-b">
                              <td className="py-2 px-4 text-sm">{employee.full_name}</td>
                              <td className="py-2 px-4 text-sm">{employee.position}</td>
                              <td className="py-2 px-4 text-sm">{employee.section}</td>
                              <td className="py-2 px-4 text-sm">{employee.age}</td>
                              <td className="py-2 px-4 text-sm">{employee.employement_form === 1 ? '0.5' : '1.0'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

            </div>

            <div className="flex flex-col items-center md:items-start gap-0 text-center md:text-left justify-start gap-[5px]">
              <p className="text-[12px] text-muted-foreground flex items-center gap-1">
                <User className="h-4 w-4" />  Эркаклар сони - <span className="font-bold text-blue-500">{statistic?.male_employees}</span>
              </p>
              <p className="text-[12px] text-muted-foreground flex items-center gap-1">
                <UserRound className="h-4 w-4" />  Aёллар сони - <span className="font-bold text-blue-500">{statistic?.female_employees}</span>
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start gap-0 text-center md:text-left justify-start gap-[5px]" >
              <p className="text-[12px] text-muted-foreground flex items-center gap-1 ms-2"> <span className="w-[10px] h-[10px] rounded-full bg-blue-500"></span> Ходимлар сони</p>
              <p className="text-[12px] text-muted-foreground flex items-center gap-1 ms-2"> <span className="w-[10px] h-[10px] rounded-full bg-green-500"></span> Штатлар сони</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
