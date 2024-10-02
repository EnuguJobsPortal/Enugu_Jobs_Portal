import { useNotification } from "@/context/NotificationContext";
import { IPasswordUpdateRequest, ISignInDTO, IUpdatePasswordDTO } from "@/interfaces/dto";
import { UsePasswordUpdateProps, UseSignInProps } from "@/interfaces/queries.interface";
import { ILoginResponse, IMessageResponse } from "@/interfaces/response.interface";
import { postRequest, putRequest } from "@/utils/apiCaller";
import { useMutation } from "@tanstack/react-query";

export const useSignIn = (props: UseSignInProps) => {
    const { notify } = useNotification();
    const { onSuccess, onError } = props;
  
    const { mutate, isLoading, ...rest } = useMutation(
        ({ payload }: { payload: ISignInDTO }) => postRequest<ISignInDTO, ILoginResponse>({ url: "/Login", payload }),
        {
            onSuccess: (values) => {

                if(values.error === false)
                {
                    if(onSuccess)
                    {
                        onSuccess(values);
                        notify(values.message, { type: "success", theme: "colored"});
                    }
                }
                else
                {
                    if(onError)
                    {
                        rest.reset();
                        onError(values.message);
                    }
                }
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                
                if (onError) {
                    rest.reset();
                    onError(error.message);
                }
            },
        }
    );
  
    return {
        loginMutation: mutate,
        loggingIn: isLoading,
        ...rest,
    };
};

export const useUpdatePassword = (props: UsePasswordUpdateProps) => {
    const { onReset, onSuccess, onError } = props;
    const { mutate, isError, isLoading, isSuccess, reset } = useMutation(
        ({ payload, useraccount_id }: IPasswordUpdateRequest) =>
        putRequest<IUpdatePasswordDTO, IMessageResponse>({
            url: `/Login/passwordchange?oldpassword=${payload.oldpassword}&newpassword=${payload.newpassword}&confirmpassword=${payload.confirmpassword}&useraccount_id=${useraccount_id}`,
            payload,
        }),
        {
            onSuccess(values) {
                if(values.error === false)
                {
                    if (onReset) {
                        onReset();
                    }
    
                    if (onSuccess) {
                        onSuccess(values);
                    }
                }

                if(values.error === true)
                {
                    if(onError)
                    {
                        onError(values.message);
                    }
                }
            },

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError(error:any) {
                reset();
                if (onError) {
                    onError(error.message);
                }
            },
        }
    );
  
    return {
        updatePassword: mutate,
        updatingPassword: isLoading,
        isError,
        isSuccess,
    };
};