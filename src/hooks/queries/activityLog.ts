import { useNotification } from "@/context/NotificationContext";
import { GetAllActivitiesRequestParams } from "@/interfaces/dto";
import { ParseQueryParams } from "@/interfaces/general";
import { UseGetAllActivitiesProps } from "@/interfaces/queries.interface";
import { GetAllActivityLogResponse } from "@/interfaces/response.interface";
import { getRequestParams } from "@/utils/apiCaller";
import { parseQueryParams } from "@/utils/parseQueryParam";
import { useQuery } from "@tanstack/react-query";

export const useGetAllActivities = ({ params }: UseGetAllActivitiesProps) => {
    const { notify } = useNotification();
    const { isLoading, data, refetch, ...rest } = useQuery(
        ["useGetAllActivities", { params }],
        () =>
        getRequestParams<GetAllActivitiesRequestParams, GetAllActivityLogResponse>({
            url: "/Activity/useractivity",
            params: parseQueryParams(
                params as unknown as ParseQueryParams
            ) as unknown as GetAllActivitiesRequestParams,
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
        activities: data,
        rest
    };
};