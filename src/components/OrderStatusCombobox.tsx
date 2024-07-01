import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { OrderStatus } from "@/lib/enums"

const statuses = [
  {
    value: OrderStatus.PENDING,
    label: "Pendente",
  }, {
    value: OrderStatus.PROCESSING,
    label: "Processando",
  }, {
    value: OrderStatus.SHIPPED,
    label: "Enviado",
  }, {
    value: OrderStatus.COMPLETED,
    label: "Concluído",
  }, {
    value: OrderStatus.CANCELED,
    label: "Cancelado",
  }, {
    value: OrderStatus.REFUNDED,
    label: "Reembolsado",
  },
]

export function OrderStatusCombo({ initialValue, onChange }: { initialValue: string, onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    onChange(value)
  }, [value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? statuses.find((status) => status.value.toString() === value)?.label
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {statuses.map((status) => (
                <CommandItem
                  key={status.value}
                  value={status.value.toString()}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value.toString() ? "0" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === status.value.toString() ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {status.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
