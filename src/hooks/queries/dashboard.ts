import { useNotification } from "@/context/NotificationContext";
import {
    GetJobApplicationsChartRequestParams,
    GetJobPostChartRequestParams,
    GetMonthlySalesStatisticsRequestParams
} from "@/interfaces/dto";
import { ParseQueryParams } from "@/interfaces/general";
import {
    UseGetJobApplicationsChartProps,
    UseGetJobPostChartProps,
    UseGetMonthlySalesStatisticsChartProps
} from "@/interfaces/queries.interface";
import {
    GetAllDashboardStatResponse,
    GetAllJobPostChartResponse,
    GetAllMonthlySalesStatisticsResponse,
    GetAllSalesStatisticsResponse
} from "@/interfaces/response.interface";
import { getRequest, getRequestParams } from "@/utils/apiCaller";
import { parseQueryParams } from "@/utils/parseQueryParam";
import { useQuery } from "@tanstack/react-query";

export const useGetAllDashboardCounts = () => {
    const { notify } = useNotification();
    const { isLoading, data, refetch, ...rest } = useQuery(
        ["useGetAllDashboardCounts"],
        () =>
        getRequest<GetAllDashboardStatResponse>({
            url: "/Activity/statistics"
        }),
        {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError(error: any) {
                notify(error.message, { type: "error", theme:"colored"})
            },
        }
    );
  
    return {
        loadingDashboardCounts: isLoading,
        refetchDashboardCounts: refetch,
        dashboardCounts: data,
        rest
    };
};

export const useGetJobPostChart = ({ params }: UseGetJobPostChartProps) => {
    const { notify } = useNotification();
    const { isLoading, data, refetch, ...rest } = useQuery(
        ["useGetJobPostChart", { params }],
        () =>
        getRequestParams<GetJobPostChartRequestParams, GetAllJobPostChartResponse>({
            url: "/Activity/yearly_job_post",
            params: parseQueryParams(
                params as unknown as ParseQueryParams
            ) as unknown as GetJobPostChartRequestParams,
        }),
        {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError(error: any) {
                notify(error.message, { type: "error", theme:"colored"})
            },
        }
    );
  
    return {
        loadingJobPostChartData: isLoading,
        refetchJobPostChartData: refetch,
        jobPostChartData: data,
        rest
    };
};

export const useGetJobApplicationsChart = ({ params }: UseGetJobApplicationsChartProps) => {
    const { notify } = useNotification();
    const { isLoading, data, refetch, ...rest } = useQuery(
        ["useGetJobApplicationsChart", { params }],
        () =>
        getRequestParams<GetJobApplicationsChartRequestParams, GetAllJobPostChartResponse>({
            url: "/Activity/yearly_job_application",
            params: parseQueryParams(
                params as unknown as ParseQueryParams
            ) as unknown as GetJobApplicationsChartRequestParams,
        }),
        {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError(error: any) {
                notify(error.message, { type: "error", theme:"colored"})
            },
        }
    );
  
    return {
        loadingJobApplicationsChartData: isLoading,
        refetchJobApplicationsChartData: refetch,
        jobApplicationsChartData: data,
        rest
    };
};

export const useSalesStatistics = () => {
    const { notify } = useNotification();
    const { isLoading, data, refetch, ...rest } = useQuery(
        ["useSalesStatistics"],
        () =>
        getRequest<GetAllSalesStatisticsResponse>({
            url: "/Sales/sales-statistics"
        }),
        {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError(error: any) {
                notify(error.message, { type: "error", theme:"colored"})
            },
        }
    );
  
    return {
        loadingSalesStatistics: isLoading,
        refetchSalesStatistics: refetch,
        salesStatistics: data,
        rest
    };
};

export const useGetMonthlySalesStatisticsChart = ({ params }: UseGetMonthlySalesStatisticsChartProps) => {
    const { notify } = useNotification();
    const { isLoading, data, refetch, ...rest } = useQuery(
        ["useGetMonthlySalesStatisticsChart", { params }],
        () =>
        getRequestParams<GetMonthlySalesStatisticsRequestParams, GetAllMonthlySalesStatisticsResponse>({
            url: "/Sales/monthly-sales",
            params: parseQueryParams(
                params as unknown as ParseQueryParams
            ) as unknown as GetMonthlySalesStatisticsRequestParams,
        }),
        {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError(error: any) {
                notify(error.message, { type: "error", theme:"colored"})
            },
        }
    );
  
    return {
        loadingMonthlySalesChartData: isLoading,
        refetchMonthlySalesChartData: refetch,
        monthlySalesChartData: data,
        rest
    };
};