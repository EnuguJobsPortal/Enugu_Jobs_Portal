import { format } from "date-fns"
import { CalendarDays } from "lucide-react"
//import { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { DatePickerProps } from "@/interfaces/general"
import { cn } from "@/lib/utils"

export default function DatePicker({
    selected,
    onChange,
    placeHolder,
    disableFuture,
    dateFormat,
    className,
    buttonClassName,
    iconClassName,
    calendarClassName,
    ...props
}: DatePickerProps) {

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover {...props}>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal", buttonClassName,
                            !selected && "text-muted-foreground"
                        )}
                    >
                        <CalendarDays className={cn("mr-2", iconClassName)} />
                        {selected ? (
                            format(selected as number | Date, dateFormat || "LLL dd, y")  
                        ) : (
                            <span>{ placeHolder || "Pick a date"}</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                        className={cn(calendarClassName)}
                        mode="single"
                        selected={selected as unknown as Date}
                        onSelect={onChange}
                        captionLayout='dropdown-buttons'
                        fromYear={1900}
                        toYear={new Date().getFullYear() + 100}
                        disabled={(date) => disableFuture && date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}