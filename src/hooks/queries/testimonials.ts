import { useNotification } from "@/context/NotificationContext";
import { GetAllTestimonialsRequestParams } from "@/interfaces/dto";
import { ParseQueryParams } from "@/interfaces/general";
import { UseRemoveTestimonyProps } from "@/interfaces/queries.interface";
import { ApiDataResponse, GetAllTestimonialsResponse, ITestimonyResponse } from "@/interfaces/response.interface";
import { deleteRequest, getRequestParams } from "@/utils/apiCaller";
import { parseQueryParams } from "@/utils/parseQueryParam";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllTestimonials = ({ params }: { params: GetAllTestimonialsRequestParams }) => {
    const { notify } = useNotification();
    const { isLoading, data, refetch, ...rest } = useQuery(
        ["useGetAllTestimonials", { params }],
        () =>
        getRequestParams<GetAllTestimonialsRequestParams, GetAllTestimonialsResponse>({
            url: "/Testimony/viewtestimony",
            params: parseQueryParams(
                params as unknown as ParseQueryParams
            ) as unknown as GetAllTestimonialsRequestParams,
        }),
        {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError(error: any) {
                notify(error.message, { type: "error", theme:"colored"})
            },
        }
    );
  
    return {
        isLoading,
        refetch,
        testimonials: data,
        rest
    };
};

export const useRemoveTestimony = (props: UseRemoveTestimonyProps) => {
    const queryClient = useQueryClient();
    const { onReset, onSuccess, onError } = props;
    const { data, reset, mutate, isLoading } = useMutation(
        ({ testimonyid }: { testimonyid: string }) =>
        deleteRequest<ApiDataResponse<ITestimonyResponse>>({
            url: `/Testimony/delete-testimony?testimonyid=${testimonyid}`,
        }),
        {
            onSuccess(data) {
                if(data.error === false)
                {
                    if (onReset) {
                        onReset();
                    }
    
                    if (onSuccess) {
                        onSuccess(data);
                    }
                }

                if(data.error === true)
                {
                    if(onError)
                    {
                        onError(data.message)
                    }
                }
                
                queryClient.invalidateQueries(["useGetAllTestimonials"]);
            },
            onError(error:unknown) {
                reset();
                
                if (onError) {
                    onError((error as Error).message);
                }
            },
        }
    );
  
    return {
        removeTestimony: mutate,
        removingTestimony: isLoading,
        data
    };
};