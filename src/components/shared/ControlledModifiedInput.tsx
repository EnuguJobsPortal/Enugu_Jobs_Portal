import { Input } from '@/components/ui/input';
import { ControlledModifiedInputProps } from '@/interfaces/controlnput.interface';
import classNames from 'classnames';
import { Controller, FieldValues } from 'react-hook-form';

const ControlledModifiedInput = <TFormValue extends FieldValues>({
    name,
    label,
    placeholder,
    type,
    control,
    rules,
    error,
    isRequired,
    inputRef,
    className,
}: ControlledModifiedInputProps<TFormValue>) => {
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
                        <Input 
                            {...field} 
                            ref={inputRef}
                            type={type} 
                            placeholder={placeholder} 
                            value={field.value as string} 
                            className={classNames('w-full text-xs focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0', className)}
                        />
                    </div>
                )}
                rules={rules}
            />
            {error && <p className='text-[8px] text-red-600 tracking-widest font-semibold font-sans'>{error.message}</p>}
        </div>
    );
  };
  
  export default ControlledModifiedInput;