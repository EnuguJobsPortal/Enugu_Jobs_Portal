import ControlledModifiedInput from '@/components/shared/ControlledModifiedInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { useLoading } from '@/context/LoadingContext';
import { useSweetAlert } from '@/context/SweetAlertContext';
import { useUpdatePassword } from '@/hooks/queries/auth';
import useAuth from '@/hooks/useAuth';
import { IUpdatePasswordDTO } from '@/interfaces/dto';
import { updatePasswordDefaultValues } from '@/validations/defaults';
import { updatePasswordResolver } from '@/validations/resolvers';
import { Lock, PenLine, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

const PasswordUpdateBox = () => {

    const { user } = useAuth();
    const [showEditButton, setShowEditButton ] = useState<boolean>(true);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const { hideLoading, showLoading } = useLoading();
    const { showError, showSuccess, showConfirm } = useSweetAlert();
    const { control, handleSubmit, reset, clearErrors, formState: { errors }} = useForm<IUpdatePasswordDTO>({
        defaultValues: updatePasswordDefaultValues, 
        resolver: updatePasswordResolver
    });
    const { updatePassword, updatingPassword } = useUpdatePassword({
        onSuccess: (values) => {
            hideLoading();
            showSuccess("Success", values.message);
            setShowEditButton(!showEditButton);
        },
        onError: (message) => {
            hideLoading();
            showError("Attention", message);
        },
        onReset: () => {
            reset();
        }
    })

    const handlePasswordUpdate = async (values:IUpdatePasswordDTO) => {
        const result = await showConfirm("Confirm", "Are you sure you want to update your password?");

        if(result.isConfirmed)
        {
            displayError();
            updatePassword({ payload: values, useraccount_id: String(user.UserAccountID) });
        }
    }

    const displayError = useCallback(() => {
        const fields = Object.keys(updatePasswordDefaultValues) as (keyof typeof updatePasswordDefaultValues)[];

        fields.forEach((field) => {
            if(errors[field])
            {
                showError("Attention", errors[field]?.message);
                clearErrors();
                return;
            }
        })
    }, [errors, showError, clearErrors])

    useEffect(() => {
        if(!showEditButton && inputRef.current)
        {
            inputRef.current.focus();
        }

        if(errors)
        {
            displayError();
        }
    }, [ showEditButton, errors, displayError]);

    useEffect(() => {
        if(updatingPassword)
        {
            showLoading();
        }
    }, [ updatingPassword, showLoading ])

    return (
        <Card className="shadow-[0px_1px_3px_-2px_rgba(0,_0,_0,_0.6)] h-auto mb-5 rounded-2xl">
            <CardContent className="flex flex-col gap-8 mt-5 mb-5 pl-0 pr-0  sm:pl-24 sm:pr-24">
                <div className="flex flex-row gap-3 items-center justify-center sm:justify-start">
                    <Lock className="text-blue-500 w-12 h-12 bg-sky-100 p-1 rounded-full"/>
                    <span className='uppercase text-xl font-semibold tracking-wider'>Change Password</span>
                </div>
                { showEditButton ? (
                    <div className='flex flex-col gap-4 justify-center sm:gap-0 sm:flex-row sm:justify-between items-center ml-0 sm:ml-16'>
                        <span className='font-sans text-base tracking-wide font-medium flex-1'>Password</span>
                        <span className='flex justify-center text-gray-500 font-normal font-sans text-base tracking-wide flex-1'>
                            ********************
                        </span>
                        <div className='flex gap-2 items-center text-gray-600 cursor-pointer text-base flex-1 justify-end'>
                            <PenLine className='w-4 h-4'/>
                            <span onClick={() => setShowEditButton(!showEditButton)}>Edit</span>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(handlePasswordUpdate)}>
                        <div className='flex flex-col gap-4 justify-center sm:justify-between items-center ml-0 sm:ml-16'>
                            <div className='flex flex-col gap-4 justify-center sm:gap-0 sm:flex-row sm:justify-between items-center w-full'>
                                <span className='font-sans text-base tracking-wide font-medium flex-1'>Current Password</span>
                                <div className='flex justify-center items-center w-80 flex-1'>
                                    <ControlledModifiedInput
                                        control={control}
                                        name='oldpassword'
                                        placeholder='********************'
                                        type='password'
                                        inputRef={inputRef}
                                        className='w-full outline-none border-none text-center focus:outline-none p-2 text-bold'
                                    />
                                </div>
                                <div className='flex-1'></div>
                            </div>
                            <div className='flex flex-col gap-4 justify-center sm:gap-0 sm:flex-row sm:justify-between items-center w-full'>
                                <span className='font-sans text-base tracking-wide font-medium flex-1'>New Password</span>
                                <div className='flex justify-center items-center w-80 flex-1'>
                                    <ControlledModifiedInput
                                        control={control}
                                        name='newpassword'
                                        placeholder='********************'
                                        type='password'
                                        className='w-full outline-none border-none text-center focus:outline-none p-2 text-bold'
                                    />
                                </div>
                                <div className='flex-1'></div>
                            </div>
                            <div className='flex flex-col gap-4 justify-center sm:gap-0 sm:flex-row sm:justify-between items-center w-full'>
                                <span className='font-sans text-base tracking-wide font-medium flex-1'>Confirm Password</span>
                                <div className='flex justify-center items-center w-80 flex-1'>
                                    <ControlledModifiedInput
                                        control={control}
                                        name='confirmpassword'
                                        placeholder='********************'
                                        type='password'
                                        className='w-full outline-none border-none text-center focus:outline-none p-2 text-bold'
                                    />
                                </div>
                                <div className='flex gap-4 items-center text-base flex-1 justify-end'>
                                    <Button variant="ghost" className='flex gap-2 items-center cursor-pointer'>
                                        <PenLine className='w-4 h-4 text-green-700'/>
                                        <span className='text-green-400 font-semibold'>Done</span>
                                    </Button>
                                    <div className='flex gap-2 items-center cursor-pointer' onClick={() => setShowEditButton(!showEditButton)}>
                                        <X className='w-4 h-4 text-red-700'/>
                                        <span className='text-red-400 font-semibold'>Cancel</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </CardContent>
        </Card>
    )
}

export default PasswordUpdateBox;