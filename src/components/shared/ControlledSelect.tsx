import HiddenObserver from "@/components/HiddenObserver";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ControlledSelectProps } from '@/interfaces/controlnput.interface';
import { Controller, FieldValues } from 'react-hook-form';

const ControlledSelect = <TFieldValues extends FieldValues>({
    name,
    label,
    placeholder,
    control,
    options,
    rules,
    error,
    isRequired,
    allowEmpty,
    isLoading,
    onEndOfRow
}: ControlledSelectProps<TFieldValues>) => {
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
                    <Select {...field} value={field.value as string} onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full ">
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                { allowEmpty && <SelectItem value="">{placeholder}</SelectItem> }
                                { isLoading ? (
                                    <div className="flex justify-center items-center w-full">
                                        <span className="text-xs text-gray-400">Please Wait...</span>
                                    </div>
                                ) : options.map(option => (
                                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                ))}
                                {onEndOfRow && <HiddenObserver onEndOfRow={onEndOfRow} />}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )}
            />
            {error && <p className='text-[8px] text-red-600 tracking-widest font-semibold font-sans'>{error.message}</p>}
        </div>
    );
  };
  
  export default ControlledSelect;