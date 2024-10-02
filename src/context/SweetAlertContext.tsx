import { SweetAlertContextProps, SweetAlertProviderProps } from '@/interfaces/context.interface';
import React, { createContext, useContext } from 'react';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

export const SweetAlertContext = createContext<SweetAlertContextProps | undefined>(undefined);

export const SweetAlertProvider: React.FC<SweetAlertProviderProps> = ({ children }) => {
    const showError = (title: string, text?: string) => {
        Swal.fire({
            icon: 'error',
            title,
            text,
        });
    };
  
    const showSuccess = (title: string, text?: string) => {
        Swal.fire({
            icon: 'success',
            title,
            text,
        });
    };
    
    const showInfo = (title: string, text?: string) => {
        Swal.fire({
            icon: 'info',
            title,
            text,
        });
    };
  
    const showConfirm = (
        title: string,
        text?: string,
        confirmButtonText: string = 'Confirm',
        showCancelButton: boolean = true
    ): Promise<SweetAlertResult<SweetAlertOptions>> => {
        return Swal.fire({
            icon: 'question',
            title,
            text,
            showCancelButton,
            confirmButtonText,
        });
    };
  
    return (
        <SweetAlertContext.Provider value={{ showError, showSuccess, showInfo, showConfirm }}>
            {children}
        </SweetAlertContext.Provider>
    );
};

export const useSweetAlert = () => {
    const context = useContext(SweetAlertContext);
    if (!context) {
        throw new Error('useSweetAlert must be used within a SweetAlertProvider');
    }

    return context;
};