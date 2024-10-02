import { useNotification } from "@/context/NotificationContext";
import { GetAllJobApplicationsRequestParams } from "@/interfaces/dto";
import { ParseQueryParams } from "@/interfaces/general";
import { UseRemoveJobApplicationProps } from "@/interfaces/queries.interface";
import { ApiDataResponse, GetAllJobApplicationsResponse, IJobApplicationResponse } from "@/interfaces/response.interface";
import { deleteRequest, getRequestParams } from "@/utils/apiCaller";
import { parseQueryParams } from "@/utils/parseQueryParam";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllJobApplications = ({ params }: { params: GetAllJobApplicationsRequestParams }) => {
    const { notify } = useNotification();
    const { isLoading, data, refetch, ...rest } = useQuery(
        ["useGetAllJobApplications", { params }],
        () =>
        getRequestParams<GetAllJobApplicationsRequestParams, GetAllJobApplicationsResponse>({
            url: "/Jobs/jobapplications",
            params: parseQueryParams(
                params as unknown as ParseQueryParams
            ) as unknown as GetAllJobApplicationsRequestParams,
        }),
        {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError(error: any) {
                notify(error.message, { type: "error", theme:"colored"})
            },
        }
    );
  
    return {
        loadingJobApplications: isLoading,
        refetchJobApplications: refetch,
        jobApplications: data,
        rest
    };
};

export const useRemoveJobApplication = (props: UseRemoveJobApplicationProps) => {
    const queryClient = useQueryClient();
    const { onReset, onSuccess, onError } = props;
    const { data, reset, mutate, isLoading } = useMutation(
        ({ application }: { application: string }) =>
        deleteRequest<ApiDataResponse<IJobApplicationResponse>>({
            url: `/Jobs/application?application=${application}`,
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
                
                queryClient.invalidateQueries(["useGetAllJobApplications"]);
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
        removeJobApplication: mutate,
        removingJobApplication: isLoading,
        data
    };
};