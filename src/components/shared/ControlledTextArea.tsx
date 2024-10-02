import { Textarea } from '@/components/ui/textarea';
import { ControlledTextAreaProps } from '@/interfaces/controlnput.interface';
import { Controller, FieldValues } from 'react-hook-form';

const ControlledTextArea = <TFormValue extends FieldValues>({
    name,
    label,
    placeholder,
    control,
    rules,
    error,
    isRequired,
    cols,
    rows,
}: ControlledTextAreaProps<TFormValue>) => {
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
                        <Textarea
                            {...field}
                            value={field.value as string}
                            placeholder={placeholder}
                            className="resize-none w-full text-xs focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                            cols={cols}
                            rows={rows}
                        />
                    </div>
                )}
                rules={rules}
            />
            {error && <p className='text-[8px] text-red-600 tracking-widest font-semibold font-sans'>{error.message}</p>}
        </div>
    );
  };
  
  export default ControlledTextArea;