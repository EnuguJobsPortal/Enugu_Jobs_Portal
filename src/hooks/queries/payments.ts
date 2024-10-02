import { IVerifyJobPostPaymentDTO, IVerifyJobPostPaymentRequest } from "@/interfaces/dto";
import { UseVerifyJobPostPaymentProps } from "@/interfaces/queries.interface";
import { IMessageResponse } from "@/interfaces/response.interface";
import { putRequest } from "@/utils/apiCaller";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useVerifyJobPostPayment = (props: UseVerifyJobPostPaymentProps) => {
    const queryClient = useQueryClient();
    const { onReset, onSuccess, onError } = props;
    const { mutate, isError, isLoading, isSuccess, reset } = useMutation(
        ({ payload }: IVerifyJobPostPaymentRequest) =>
        putRequest<IVerifyJobPostPaymentDTO, IMessageResponse>({
            url: `/Payment/verifypaystackpayment?postId=${payload.postId}&reference=${payload.reference}&email=${payload.email}&amountpaid=${payload.amountpaid}&paymentdate=${payload.paymentdate}&paymentstatus=${payload.paymentstatus}&paymenttype=${payload.paymenttype}`,
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

                    //revalidate user queries
                    queryClient.invalidateQueries([`useGetAllJobPosts`]);
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
        verifyPayment: mutate,
        verifyingPayment: isLoading,
        isError,
        isSuccess,
    };
};