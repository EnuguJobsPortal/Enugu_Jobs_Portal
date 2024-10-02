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
import { DateRangePickerProps } from "@/interfaces/general"
import { cn } from "@/lib/utils"

export default function DateRangePicker({
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
}: DateRangePickerProps) {
    //const [date, setDate] = React.useState<DateRange | undefined>()

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
                        {selected?.from ? (
                            selected.to ? (
                                <>
                                    {format(selected.from, dateFormat || "LLL dd, y")} -{" "}
                                    {format(selected.to, dateFormat || "LLL dd, y")}
                                </>
                            ) : (
                                format(selected.from, dateFormat || "LLL dd, y")
                            )   
                        ) : (
                            <span>{ placeHolder || "Pick a date"}</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                        className={cn(calendarClassName)}
                        initialFocus
                        mode="range"
                        defaultMonth={selected?.from}
                        selected={selected}
                        onSelect={onChange}
                        numberOfMonths={2}
                        disabled={(date) => disableFuture && date > new Date() || date < new Date("1900-01-01")}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}