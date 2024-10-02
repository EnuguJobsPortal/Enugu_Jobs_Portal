import HiddenObserver from "@/components/HiddenObserver";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ControlledComboBoxProps } from '@/interfaces/controlnput.interface';
import { cn } from "@/lib/utils";
import { CheckIcon, SortAsc } from "lucide-react";
import { Controller, FieldValues } from 'react-hook-form';

const ControlledComboBox = <TFieldValues extends FieldValues>({
    name,
    label,
    placeholder,
    control,
    options,
    rules,
    error,
    isRequired,
    isLoading,
    onEndOfRow
}: ControlledComboBoxProps<TFieldValues>) => {
    return (
        <div>
            {label && (
                <label 
                    className='text-[10px] font-bold tracking-wider flex gap-1'
                >  
                    {label}
                    { isRequired && <span className='text-red-700 text-[10px]'>*</span> }
                </label>
            )}
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field }) => (
                    <div className='w-full'>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                    "w-full justify-between",
                                    !field.value && "text-muted-foreground"
                                )}
                            >
                                {field.value ? options.find((option) => option.value === field.value)?.label : placeholder}
                                <SortAsc className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command {...field} /* value={field.value as string} onValueChange={field.onChange} defaultValue={field.value} */>
                                <CommandInput
                                    placeholder="Search record..."
                                    className="h-9"
                                />
                                <CommandEmpty>No records found.</CommandEmpty>
                                <CommandGroup>
                                    { isLoading ? (
                                        <div className="flex justify-center items-center w-full">
                                            <span className="text-xs text-gray-400">Please Wait...</span>
                                        </div>
                                    ) : options.map((option) => (
                                        <CommandItem
                                            value={option.value}
                                            key={option.label}
                                            onSelect={(value) =>{
                                                field.onChange(value); 
                                                console.log(field.value)}

                                            } 
                                        >
                                            {option.label}
                                            <CheckIcon
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    option.value === field.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                    {onEndOfRow && <HiddenObserver onEndOfRow={onEndOfRow} />}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    </div>
                )}
            />
            {error && <p className='text-[8px] text-red-600 tracking-widest font-semibold font-sans'>{error.message}</p>}
        </div>
    );
  };
  
  export default ControlledComboBox;