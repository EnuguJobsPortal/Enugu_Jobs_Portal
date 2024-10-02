import { useCallback } from 'react';
import { usePaystackPayment } from 'react-paystack';

type PaystackHook = {
    initializePayment: () => void;
    reference: string;
};

interface IPaystackProps {
    email: string;
    amount: number;
    onSuccess: () => void;
    onClose: () => void;
}

const usePaystack = ({
    email,
    amount,
    onSuccess,
    onClose
}: IPaystackProps): PaystackHook => {

    const config = {
        reference: (new Date()).getTime().toString(),
        email,
        amount: amount * 100,
        publicKey: import.meta.env.VITE_ENUGU_JOBS_PAYSTACK_PUBLIC_KEY,
    }
    const initializePayment = usePaystackPayment(config);
    
    const startPayment = useCallback(() => {
        initializePayment(onSuccess, onClose);
    }, [initializePayment, onSuccess, onClose]);
    
    return { initializePayment: startPayment, reference: config.reference };
}

export default usePaystack;