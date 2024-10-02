import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ControlledDatePickerProps } from '@/interfaces/controlnput.interface';
import classNames from 'classnames';
import { format } from "date-fns";
import { CalendarIcon } from 'lucide-react';
import { Controller, FieldValues } from 'react-hook-form';

const ControlledDatePicker = <TFieldValues extends FieldValues>({
    name,
    label,
    control,
    rules,
    error,
    isRequired,
    disableFuture,
    dateFormat
}: ControlledDatePickerProps<TFieldValues>) => {
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
                name={name}
                control={control}
                render={({ field }) => (
                    <div>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={classNames(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? (
                                        format(field.value as number | Date, dateFormat || "yyyy-MM-dd")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value as unknown as Date}
                                    onSelect={field.onChange}
                                    captionLayout='dropdown-buttons'
                                    fromYear={1900}
                                    toYear={new Date().getFullYear() + 100}
                                    disabled={(date) => disableFuture && date > new Date() || date < new Date("1900-01-01")}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                )}
                rules={rules}
            />
            {error && <p className='text-[8px] text-red-600 tracking-widest font-semibold font-sans'>{error.message}</p>}
        </div>
    );
};
  
export default ControlledDatePicker;