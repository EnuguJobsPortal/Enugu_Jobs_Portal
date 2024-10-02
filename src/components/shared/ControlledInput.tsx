import { Input } from '@/components/ui/input';
import { ControlledInputProps } from '@/interfaces/controlnput.interface';
import { Controller, FieldValues } from 'react-hook-form';

const ControlledInput = <TFormValue extends FieldValues>({
    name,
    label,
    placeholder,
    type,
    control,
    rules,
    error,
    isRequired,
    accept
}: ControlledInputProps<TFormValue>) => {
    return (
        <div>
            {label && (
                <label 
                    className='text-[10px] font-bold tracking-wider flex gap-1 mb-1'
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
                        { type === "file" ? (
                            <Input 
                                {...field} 
                                value={field.value?.fileName}
                                type={type} 
                                onChange={(e) => field.onChange(e.target.files![0])} 
                                className='w-full text-xs focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0'
                                accept={accept}
                            />
                        ) : (
                            <Input 
                                {...field} 
                                type={type} 
                                placeholder={placeholder} 
                                value={field.value as string} 
                                className='w-full text-xs focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0'
                            />
                        )}
                    </div>
                )}
                rules={rules}
            />
            {error && <p className='text-[8px] text-red-600 tracking-widest font-semibold font-sans'>{error.message}</p>}
        </div>
    );
  };
  
  export default ControlledInput;