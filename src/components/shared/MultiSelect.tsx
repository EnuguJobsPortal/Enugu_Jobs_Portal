import * as React from 'react'
import { useState } from 'react'

import HiddenObserver from '@/components/HiddenObserver'
import Icon from '@/components/shared/Icon'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from '@/lib/utils'
import { ChevronsUpDown, X, icons } from "lucide-react"


export type OptionType = {
    label: string;
    value: string;
}

interface MultiSelectProps {
    options: OptionType[];
    selected: string[];
    onChange: React.Dispatch<React.SetStateAction<string[]>>;
    displaySelected: boolean;
    prefixIcon?: keyof typeof icons;
    buttonClassName?: string;
    placeholder?: string;
    className?: string;
    isLoading?: boolean;
    onEndOfRow?: (_x: boolean) => void;
    onValueChange?: () => void;
}

function MultiSelect({ 
    options, 
    selected, 
    onChange, 
    className, 
    displaySelected, 
    placeholder, 
    isLoading,
    onEndOfRow,
    prefixIcon,
    buttonClassName,
    onValueChange,
    ...props 
}: MultiSelectProps) {

    const [open, setOpen] = React.useState(false)
    const [selectAll, setSelectAll] = useState(false);

    const handleUnselect = (item: string) => {
        onChange(selected.filter((i) => i !== item))
        setSelectAll(false);
    }

    const handleCheckboxChange = () => {
        setSelectAll((prevSelectAll) => !prevSelectAll);
        onChange(selectAll ? [] : options.map((option) => option.value));
    };

    const handleOptionChange = (value: string) => {
        onChange((prevSelected) =>
          prevSelected.includes(value)
            ? prevSelected.filter((selectedValue) => selectedValue !== value)
            : [...prevSelected, value]
        );
        setSelectAll(false); // Uncheck "Select All" if an individual checkbox is clicked
    };

    return (
        <Popover open={open} onOpenChange={setOpen} {...props}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn('w-full justify-between gap-2', selected.length > 1 ? "h-full" : "h-10", buttonClassName)}
                    onClick={() => setOpen(!open)}
                >
                    { prefixIcon && (
                        <Icon name={prefixIcon} size={24} color='#cccdd2' />
                    )}
                    <div className="flex gap-1 flex-wrap">
                        { selected.length === 0 && placeholder ? (
                            <span className="text-xs">{placeholder}</span>
                        ) : selected.length === 0 && !placeholder ? (
                            <span className="text-xs">Please Select</span>
                        ) : selected.length > 0 && !displaySelected ? (
                            <span className="text-xs font-semibole">Selected: &nbsp;{ selected.length }</span>
                        ) : selected.map((item) => (
                            <Badge
                                variant="secondary"
                                key={item}
                                className="mr-1 mb-1"
                                onClick={() => handleUnselect(item)}
                            >
                                {item}
                                <button
                                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleUnselect(item);
                                        }
                                    }}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onClick={() => handleUnselect(item)}
                                >
                                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                </button>
                            </Badge>
                        ))}
                    </div>
                    <ChevronsUpDown className="h-4 w-4 ml-2 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command 
                    className={className}
                >
                    <CommandInput placeholder="Search ..." />
                    <CommandEmpty>No item found.</CommandEmpty>
                    <CommandGroup className='max-h-64 overflow-auto'>
                        { isLoading ? (
                            <div className="flex justify-center items-center w-full">
                                <span className="text-xs text-gray-400">Please Wait...</span>
                            </div>
                        ) : (
                            <>
                                <CommandItem>
                                    <Checkbox
                                        className="mr-2 h-4 w-4 opacity-100"
                                        checked={selectAll}
                                        onCheckedChange={handleCheckboxChange}
                                    />
                                    <span className="text-red-600">Uncheck/Check All</span>
                                </CommandItem>
                                {options.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        onSelect={() => {
                                            handleOptionChange(option.value);
                                            onChange(
                                                selected.includes(option.value)
                                                    ? selected.filter((item) => item !== option.value)
                                                    : [...selected, option.value]
                                            )
                                            setOpen(true)

                                            if(onValueChange)
                                            {
                                                onValueChange();
                                            }
                                        }}
                                    >
                                        <Checkbox
                                            className="mr-2 h-4 w-4 opacity-100"
                                            checked={selectAll || selected.includes(option.value)}
                                            onCheckedChange={(value) => handleOptionChange(value as string)}
                                        />
                                        {option.label}
                                    </CommandItem>
                                    
                                ))}
                            </>
                        )}
                        {onEndOfRow && <HiddenObserver onEndOfRow={onEndOfRow} />}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export { MultiSelect }

