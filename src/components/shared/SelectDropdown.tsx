import HiddenObserver from "@/components/HiddenObserver";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ISelectDropDownProps } from '@/interfaces/general';
import { cn } from "@/lib/utils";

const SelectDropDown = ({
    selected,
    onChange,
    className,
    placeholder,
    options,
    allowEmpty,
    isLoading,
    onEndOfRow,
    onValueChange
}: ISelectDropDownProps) => {
    return (
        <Select 
            value={selected} 
            defaultValue={selected}
            onValueChange={(value) => {
                onChange(value);

                if(onValueChange)
                {
                    onValueChange(value);
                }
            }}
        >
            <SelectTrigger className={cn('w-full', className)}>
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
    );
};
  
export default SelectDropDown;