"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export type OptionType = {
  value: number
  label: string
}

interface CustomSelectProps {
  options: OptionType[]
  placeholder?: string
  value?: number
  onValueChange?: (value: number) => void
  disabled?: boolean
  searchable?: boolean
  className?: string
  emptyMessage?: string
}

export function CustomSelect({
  options,
  placeholder = "Select an option",
  value,
  onValueChange,
  disabled = false,
  searchable = true,
  className,
  emptyMessage = "No results found.",
}: CustomSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState<number | undefined>(value)

  React.useEffect(() => {
    setSelectedValue(value)
  }, [value])

  const handleSelect = React.useCallback(
    (currentValue: number) => {
      setSelectedValue(currentValue)
      onValueChange?.(currentValue)
      setOpen(false)
    },
    [onValueChange],
  )

  const selectedOption = React.useMemo(
    () => options.find((option) => option.value === selectedValue),
    [options, selectedValue],
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", !selectedValue && "text-muted-foreground", className)}
          disabled={disabled}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          {searchable && <CommandInput placeholder="Search..." />}
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options.map((option) => (
                <CommandItem key={option.value} value={String(option.value)} onSelect={(val) => handleSelect(Number(val))} className="cursor-pointer">
                  <Check className={cn("mr-2 h-4 w-4", selectedValue === option.value ? "opacity-100" : "opacity-0")} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
