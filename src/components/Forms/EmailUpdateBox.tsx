import { Card, CardContent } from "@/components/ui/card";
import useAuth from '@/hooks/useAuth';
import { PenLine, User2, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const EmailUpdateBox = () => {

    const { user } = useAuth();
    const [showEditButton, setShowEditButton ] = useState<boolean>(true);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if(!showEditButton && inputRef.current)
        {
            inputRef.current.focus();
        }
    }, [ showEditButton])

    return (
        <Card className="shadow-[0px_1px_3px_-2px_rgba(0,_0,_0,_0.6)] h-auto mb-5 rounded-2xl">
            <CardContent className="flex flex-col gap-8 mt-5 mb-5 pl-24 pr-24">
                <div className="flex flex-row gap-3 items-center justify-center sm:justify-start">
                    <User2 className="text-blue-500 w-12 h-12 bg-sky-100 p-1 rounded-full"/>
                    <span className='uppercase text-xl font-semibold tracking-wider'>Account Settings</span>
                </div>
                <div className='flex flex-col gap-4 justify-center sm:gap-0 sm:flex-row sm:justify-between items-center ml-0 sm:ml-16'>
                    <span className='font-sans text-base tracking-wide font-medium flex-1'>Email</span>
                    { showEditButton ? (
                        <span className='flex justify-center text-gray-500 font-normal font-sans text-base tracking-wide flex-1'>
                            { user.Email }
                        </span>
                    ) : (
                        <div className='flex justify-center items-center w-80 flex-1'>
                            <input 
                                type='email' 
                                ref={inputRef} 
                                className='w-full outline-none border-none text-center focus:outline-none p-2 text-bold' 
                                placeholder='@'
                            />
                        </div>
                    )}
                    { showEditButton ? (
                        <div className='flex justify-end gap-2 items-center text-gray-600 cursor-pointer text-base flex-1'>
                            <PenLine className='w-4 h-4'/>
                            <span onClick={() => setShowEditButton(!showEditButton)}>Edit</span>
                        </div>
                    ) : (
                        <div className='flex gap-4 items-center text-base justify-end flex-1'>
                            <div className='flex gap-2 items-center cursor-pointer'>
                                <PenLine className='w-4 h-4 text-green-700'/>
                                <span className='text-green-400 font-semibold'>Done</span>
                            </div>
                            <div className='flex gap-2 items-center cursor-pointer' onClick={() => setShowEditButton(!showEditButton)}>
                                <X className='w-4 h-4 text-red-700'/>
                                <span className='text-red-400 font-semibold'>Cancel</span>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default EmailUpdateBox;