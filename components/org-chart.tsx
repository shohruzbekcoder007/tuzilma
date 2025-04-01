"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Icons } from "./icons"
import { useEffect, useState, useCallback, useMemo } from "react"
import { useSearch } from "@/contexts/SearchContext"

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
}

interface EmployeeCardProps {
  employee: Employee
  highlight?: boolean
}

function EmployeeCard({ employee, highlight }: EmployeeCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [staff, setStaff] = useState<Employee>(employee)

  useEffect(() => {
    if(isOpen) {
      setStaff(employee)
      fetch(`http://172.16.8.37:8001/api/employees/${employee.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => response.json()).then(data => {
        console.log(data)
        setStaff(data)
      }).catch(error => {
        console.error('Error fetching employee details:', error)
      })
    }
  }, [isOpen])

  return (
    <Card id={"employee"+employee.id} className={`p-4 w-[300px] example cursor-pointer relative z-1 ${highlight ? 'ring-2 ring-primary' : ''}`}>
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 cursor-pointer">
          <AvatarImage
            src={employee.imageUrl}
          />
          <AvatarFallback>{employee.name?.[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-medium leading-none pb-1">{employee.name}</h3>
          <p className="text-sm text-muted-foreground leading-none pb-3">{employee.position}</p>
          <p className="text-xs text-muted-foreground">{employee.department}</p>
        </div>
      </div>
      
      {employee?.subordinates?.length > 0 && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {employee.subordinates.slice(0, 4).map((subordinate) => (
              <Avatar key={subordinate.id} className="h-4 w-4">
                <AvatarImage src={subordinate.imageUrl}/>
                <AvatarFallback>{subordinate.name[0]}</AvatarFallback>
              </Avatar>
            ))}
          <span>{employee?.subordinates?.length > 4 ? '...' : ''}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {employee.employees}та бўйсунувчилар
          </p>
        </div>
      )}
      <div className="absolute bottom-0 right-0">
        <Dialog 
          open={isOpen} 
          onOpenChange={(open) => {
            setIsOpen(open)
            // Stop propagation when dialog is closing
            if (!open) {
              setTimeout(() => {
                const event = window.event as MouseEvent
                if (event) {
                  event.stopPropagation()
                }
              }, 0)
            }
          }}
        >
          <DialogTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(true)
              }}
            >
              <Icons.more className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md" onClick={(e) => e.stopPropagation()}>
            <DialogHeader>
              <DialogTitle className="sr-only">
                {staff.name} - {staff.position}
              </DialogTitle>
            </DialogHeader>
            <div className="p-0">

              <div className="flex flex-col items-center mb-6">
                <Avatar className="w-40 h-55 mb-4 rounded-none" style={{ height: '180px', width: '160px' }}>
                  <AvatarImage src={staff.imageUrl} />
                  <AvatarFallback>{staff.name?.[0]}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold mb-1 text-center">{staff.name}</h2>
                <p className="text-gray-600 mb-2">{staff.position}</p>
                <div className="inline-block bg-primary text-white text-sm px-3 py-1 rounded-full">
                  <p className="text-center">{staff.department}</p>
                </div>
              </div>

              <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Icons.circleUser className="h-5 w-5 text-gray-400" />
                    Ёши: <span>{staff?.age || 'Мавжуд эмас'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icons.education className="h-5 w-5 text-gray-400" />
                    Маълумоти: <span>{staff?.education || 'Мавжуд эмас'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icons.business className="h-5 w-5 text-gray-400" />
                    Тизимдаги иш стажи: <span>{staff?.time_in_system || 'Мавжуд эмас'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icons.calendar className="h-5 w-5 text-gray-400" />
                    Лавозимга тайинланган санаси: <span>{staff?.appointment_date || 'Мавжуд эмас'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                  <Icons.phone className="h-5 w-5 text-gray-400" />
                    IP телефон: <span>{staff?.ip_phone || 'Мавжуд эмас'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icons.phone className="h-5 w-5 text-gray-400" />
                    Мобил телефон: <span>{staff?.mobile_phone || 'Мавжуд эмас'}</span>
                  </div>
                </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  )
}

export default function OrgChart() {
  const [originalData1, setOriginalData1] = useState<Employee>({} as Employee)
  const [originalData2, setOriginalData2] = useState<Employee[]>([])
  const { searchQuery } = useSearch()

  const processEmployee = useCallback((employee: Employee, query: string): Employee => {
    if (!employee) return employee

    const matchesSearch = 
      (employee.name?.toLowerCase() || '').includes(query) ||
      (employee.position?.toLowerCase() || '').includes(query) ||
      (employee.department?.toLowerCase() || '').includes(query)

    const newEmployee = { ...employee }
    
    if (matchesSearch) {
      newEmployee.open = true
    }

    if (newEmployee.subordinates?.length > 0) {
      newEmployee.subordinates = newEmployee.subordinates.map(sub => processEmployee(sub, query))
      if (newEmployee.subordinates.some(sub => sub.open)) {
        newEmployee.open = true
      }
    }

    return newEmployee
  }, [])

  const sampleData1 = useMemo(() => {
    if (!searchQuery || !originalData1?.id) return originalData1
    const query = searchQuery.toLowerCase()
    return processEmployee({ ...originalData1 }, query)
  }, [searchQuery, originalData1, processEmployee])

  const sampleData2 = useMemo(() => {
    if (!searchQuery || !originalData2?.length) return originalData2
    const query = searchQuery.toLowerCase()
    return originalData2.map(employee => processEmployee({ ...employee }, query))
  }, [searchQuery, originalData2, processEmployee])

  const handleOpen = (event: React.MouseEvent, employee: Employee) => {
    event.stopPropagation()
    const findAndUpdateEmployee = (employees: Employee[], targetId: string): boolean => {
      for (const emp of employees) {
        if (emp.id === targetId) {
          emp.open = !emp.open
          return true
        }
        if (emp.subordinates?.length > 0 && findAndUpdateEmployee(emp.subordinates, targetId)) {
          return true
        }
      }
      return false
    }

    const updatedData = { ...originalData1 }
    findAndUpdateEmployee([updatedData], employee.id)
    setOriginalData1(updatedData)

    // Cache the updated data
    fetch('/api/cache', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data1: updatedData, data2: originalData2 })
    }).catch(error => console.error('Error caching data:', error))
  }

  const handleOpen2 = (event: React.MouseEvent, employee: Employee) => {
    event.stopPropagation()
    const findAndUpdateEmployee = (employees: Employee[], targetId: string): boolean => {
      for (const emp of employees) {
        if (emp.id === targetId) {
          emp.open = !emp.open
          return true
        }
        if (emp.subordinates?.length > 0 && findAndUpdateEmployee(emp.subordinates, targetId)) {
          return true
        }
      }
      return false
    }
    const updatedData = [...originalData2]
    findAndUpdateEmployee(updatedData, employee.id)
    setOriginalData2(updatedData)

    // Cache the updated data
    fetch('/api/cache', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data1: originalData1, data2: updatedData })
    }).catch(error => console.error('Error caching data:', error))
  }

  const fetchAndSetData = async () => {
    try {
      // Try to get data from cache first
      // const cacheResponse = await fetch('/api/cache')
      // const cacheData = await cacheResponse.json()

      // if (cacheData.data1 && cacheData.data2) {
      //   setOriginalData1(cacheData.data1)
      //   setOriginalData2(cacheData.data2)
      //   return
      // }

      // If cache miss, fetch from API and cache the results
      const [data1Response, data2Response] = await Promise.all([
        fetch('http://172.16.8.37:8001/api/employees'),
        fetch('http://172.16.8.37:8001/api/employees-ceo')
      ])

      const [data1, data2] = await Promise.all([
        data1Response.json(),
        data2Response.json()
      ])

      setOriginalData1(data1)
      setOriginalData2(data2)

      // Cache the fresh data
      // fetch('/api/cache', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ data1, data2 })
      // }).catch(error => console.error('Error caching data:', error))
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchAndSetData()
  }, [])

  const isEmployeeHighlighted = useCallback((employee: Employee): boolean => {
    if (!employee || !searchQuery) return false
    
    const query = searchQuery.toLowerCase()

    // birinchi eng oxirgi yechim
    // if((
    //   (employee.name?.toLowerCase() || '').includes(query) ||
    //   (employee.position?.toLowerCase() || '').includes(query) ||
    //   (employee.department?.toLowerCase() || '').includes(query)
    // )) {
    //   document.getElementById(`employee${employee.id}`)?.scrollIntoView({behavior: 'smooth'});
    // }

    return (
      (employee.name?.toLowerCase() || '').includes(query) ||
      (employee.position?.toLowerCase() || '').includes(query) ||
      (employee.department?.toLowerCase() || '').includes(query)
    )
  }, [searchQuery])

  return (
    <>{
      sampleData1 && (
        <div className="flex flex-col items-center gap-8 w-[max-content] mx-auto">
          <div className="rais relative z-10">
            <EmployeeCard employee={sampleData1} highlight={isEmployeeHighlighted(sampleData1)} />
          </div>
          <div className="flex items-center gap-8 border-t-2 pt-4 tartib" style={{ alignItems: 'start' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sampleData1?.subordinates?.length > 0 && sampleData1?.subordinates?.map((employee) => (
                <div key={employee.id} className="flex flex-col gap-8 zamlar">
                  <div className="org-chart-item org-chart-item1" onClick={(event) => handleOpen(event, employee)}>
                    <EmployeeCard employee={employee} highlight={isEmployeeHighlighted(employee)} />
                  </div>
                  {employee.open && employee.subordinates?.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 pl-8 border-l-2">
                      {employee.subordinates.map((subordinate) => (
                        <div key={subordinate.id} className="flex flex-col gap-4">
                          <div className="org-chart-item" onClick={(event) => handleOpen(event, subordinate)}>
                            <EmployeeCard employee={subordinate} highlight={isEmployeeHighlighted(subordinate)} />
                          </div>
                          {subordinate.open && subordinate.subordinates?.length > 0 && (
                            <div key={subordinate.id} className="flex flex-col gap-4">
                              <div className="grid grid-cols-1 gap-4 border-l-2">
                                {subordinate.subordinates.map((subSubordinate) => (
                                  <div key={subSubordinate.id} className="grid grid-cols-1 gap-4 pl-8 ">
                                    <div className="org-chart-item" onClick={(event) => handleOpen(event, subSubordinate)}>
                                      <EmployeeCard employee={subSubordinate} highlight={isEmployeeHighlighted(subSubordinate)} />
                                    </div>
                                    {subSubordinate.open && subSubordinate.subordinates?.length > 0 && (
                                      <div className="grid grid-cols-1 gap-4 pl-8 border-l-2">
                                        {subSubordinate.subordinates.map((subSubSubordinate) => (
                                          <div key={subSubSubordinate.id} className="org-chart-item" onClick={(event) => handleOpen(event, subSubSubordinate)}>
                                            <EmployeeCard employee={subSubSubordinate} highlight={isEmployeeHighlighted(subSubSubordinate)} />
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4 border-r-2 pr-8 adetinal">
              {
                sampleData2.map((e_sampleData2) => (
                  <div key={e_sampleData2.id} className="grid grid-cols-1 gap-4 goriz">
                    <div onClick={(event) => handleOpen2(event, e_sampleData2)} className="direct">
                      <div className="relative z-10">
                        <EmployeeCard employee={e_sampleData2} highlight={isEmployeeHighlighted(e_sampleData2)} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 border-l-2">
                      {e_sampleData2.open && e_sampleData2.subordinates?.length > 0 && e_sampleData2.subordinates.map((subordinate) => (
                        <div key={subordinate.id} className="grid grid-cols-1 gap-4 pl-8">
                          <div className="org-chart-item" onClick={(event) => handleOpen2(event, subordinate)}>
                            <EmployeeCard employee={subordinate} highlight={isEmployeeHighlighted(subordinate)} />
                          </div>
                          {subordinate.open && subordinate.subordinates?.length > 0 && (
                            <div className="grid grid-cols-1 gap-4 pl-8 border-l-2">
                              {subordinate.subordinates.map((subSubordinate) => (
                                <div key={subSubordinate.id} className="org-chart-item" onClick={(event) => handleOpen2(event, subSubordinate)}>
                                  <EmployeeCard employee={subSubordinate} highlight={isEmployeeHighlighted(subSubordinate)} />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )
    }
    </>
  )
}
