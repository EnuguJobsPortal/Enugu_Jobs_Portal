import { ControlledEditorProps } from '@/interfaces/controlnput.interface';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useState } from 'react';
import { Controller, FieldValues } from 'react-hook-form';

const ControlledEditor = <TFormValue extends FieldValues>({
	name,
	label,
	control,
	error,
	rules,
	isRequired
}: ControlledEditorProps<TFormValue>) => {

	const [err, setError] = useState<string | null>(null);
	
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
				render={({ field: { onChange, value } }) => (
					<div>
						<CKEditor
							editor={ClassicEditor}
							data={value}
							onChange={(_event, editor) => {
								
								const data = editor.getData();
								
								if (data === '') 
								{
									setError('Content cannot be empty');
								} 
								else 
								{
									setError(null);
								}
								onChange(data);
							}}
						/>
						
						{isRequired && err && <p className='text-[8px] text-red-600 tracking-widest font-semibold font-sans'>{err}</p>}
					</div>
				)}
				rules={rules}
			/>
			{error && <p className='text-[8px] text-red-600 tracking-widest font-semibold font-sans'>{error.message}</p>}
		</div>
	);
};
  
export default ControlledEditor;