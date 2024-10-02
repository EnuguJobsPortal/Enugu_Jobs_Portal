import { Control, FieldError, FieldValues, Path } from "react-hook-form";

export interface FormInputs {
    [key: string]: string | number | boolean;
}

export interface Rule {
    required?: string | boolean;
    min?: string | number;
    max?: string | number;
    // Add other validation rules as needed
}

export interface ControlledInputProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    placeholder: string;
    label?: string;
    type?: string;
    error?: FieldError;
    rules?: Rule;
    isRequired?: boolean;
    accept?: string;
}

export interface ControlledTextAreaProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    placeholder: string;
    label?: string;
    error?: FieldError;
    rules?: Rule;
    isRequired?: boolean;
    cols?: number;
    rows?: number;
}

export interface ControlledModifiedInputProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    placeholder: string;
    label?: string;
    type?: string;
    error?: FieldError;
    rules?: Rule;
    isRequired?: boolean;
    inputRef?: React.Ref<HTMLInputElement>;
    className?: string;
}

export interface SelectOption {
    value: string;
    label: string;
}

export interface ControlledSelectProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    label?: string;
    placeholder?: string;
    error?: FieldError;
    rules?: Rule;
    options: SelectOption[];
    isRequired?: boolean;
    allowEmpty?: boolean;
    isLoading?: boolean;
    onEndOfRow?: (_x: boolean) => void;
}

export interface ControlledComboBoxProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    label?: string;
    placeholder?: string;
    error?: FieldError;
    rules?: Rule;
    options: SelectOption[];
    isRequired?: boolean;
    isLoading?: boolean;
    onEndOfRow?: (_x: boolean) => void;
}

export interface ControlledDatePickerProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    label?: string;
    error?: FieldError;
    rules?: Rule;
    isRequired?: boolean;
    disableFuture?: boolean;
    dateFormat?: string;
}

export interface ControlledEditorProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    label?: string;
    error?: FieldError;
    rules?: Rule;
    isRequired?: boolean;
}