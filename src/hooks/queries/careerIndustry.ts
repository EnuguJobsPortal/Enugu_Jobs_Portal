import { useNotification } from "@/context/NotificationContext";
import { IBaseQueryParams, ParseQueryParams } from "@/interfaces/general";
import { GetAllCareerIndustryResponse } from "@/interfaces/response.interface";
import { getRequestParams } from "@/utils/apiCaller";
import { parseQueryParams } from "@/utils/parseQueryParam";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCareerIndustries = ({ params }: { params: IBaseQueryParams}) => {
    const { notify } = useNotification();
    const { isLoading, data, refetch, ...rest } = useQuery(
        ["useGetAllCareerIndustries", { params }],
        () =>
        getRequestParams<IBaseQueryParams, GetAllCareerIndustryResponse>({
            url: "/User/allcareerindustry",
            params: parseQueryParams(
                params as unknown as ParseQueryParams
            ) as unknown as IBaseQueryParams,
        }),
        {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError(error: any) {
                notify(error.message, { type: "error", theme:"colored"})
            },
        }
    );
  
    return {
        loadingCareerIndustries: isLoading,
        refetchCareerIndustries: refetch,
        careerIndustries: data?.data || [],
        rest
    };
};