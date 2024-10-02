import {
	GetAllActivitiesRequestParams,
	GetAllBlogCommentsRequestParams,
	GetAllEmployerPackageRequestParams,
	GetAllEmployerProfileRequestParams,
	GetAllSeekerProfileRequestParams,
	GetAllUserTypesRequestParams,
	GetAllUsersRequestParams,
	GetJobApplicationsChartRequestParams,
	GetJobPostChartRequestParams,
	GetMonthlySalesStatisticsRequestParams,
} from "@/interfaces/dto";
import { ITablePaginationFunction } from "@/interfaces/general";
import {
	ApiDataResponse,
	IBlogCategoryResponse,
	IBlogPostResponse,
	IEmployerResponse,
	IJobPackageResponse,
	IJobPostApprovalResponse,
	IJobPostResponse,
	ILoginResponse,
	IMessageResponse,
	INewJobPostResponse,
	ISeekerPackageDescriptionResponse,
	ISeekerPackageResponse,
	ISeekerPackageResponse2,
	ISeekerResponse,
} from "@/interfaces/response.interface";

/*************************** AUTH QUERIES *******************************/
export interface UseSignInProps {
	onSuccess?: (_val: ILoginResponse) => void;
	onError?: (_val: string) => void;
	onReset?: () => void;
}

export interface UsePasswordUpdateProps {
	onSuccess?: (_val: IMessageResponse) => void;
	onReset?: () => void;
	onError?: (_val: string) => void;
}

/*************************** USER QUERIES *********************************/

//Create New User Props
export interface UseCreateNewUserProps {
	onSuccess?: (_val: IMessageResponse) => void;
	onError?: (_val: string) => void;
	onReset?: () => void;
}

export interface UseUpdateUserProps {
	onSuccess?: (_val: IMessageResponse) => void;
	onError?: (_val: string) => void;
	onReset?: () => void;
}

export type UseGetAllUserTypesProps = {
	params?: GetAllUserTypesRequestParams;
	setTableParams?: ITablePaginationFunction;
};

export type UseGetAllUsersProps = {
	params?: GetAllUsersRequestParams;
	setTableParams?: ITablePaginationFunction;
};

export type UseGetAllSeekerProfileProps = {
	params?: GetAllSeekerProfileRequestParams;
	enabler?: boolean;
};

export type UseGetAllEmployerProfileProps = {
	params?: GetAllEmployerProfileRequestParams;
	enabler?: boolean;
};

export interface UseRemoveSeekerProfileProps {
	onSuccess?: (data: ApiDataResponse<ISeekerResponse>) => void;
	onReset?: () => void;
	onError?: (_val: string) => void;
}

export interface UseRemoveEmployerProfileProps {
	onSuccess?: (data: ApiDataResponse<IEmployerResponse>) => void;
	onReset?: () => void;
	onError?: (_val: string) => void;
}

/***************************** ACTIVITY LOG QUERIES *************************/
export type UseGetAllActivitiesProps = {
	params?: GetAllActivitiesRequestParams;
};

/***************************** JOB POST QUERIES ******************************/
export interface UseCreateNewJobPostProps {
	onSuccess?: (_val: INewJobPostResponse) => void;
	onError?: (_val: string) => void;
	onReset?: () => void;
}

export interface UseRemoveJobPostProps {
	onSuccess?: (data: ApiDataResponse<IJobPostResponse>) => void;
	onReset?: () => void;
	onError?: (_val: string) => void;
}

export interface UseRemoveJobPostApprovalProps {
	onSuccess?: (data: ApiDataResponse<IJobPostApprovalResponse>) => void;
	onReset?: () => void;
	onError?: (_val: string) => void;
}

export interface UseVerifyJobPostPaymentProps {
	onSuccess?: (_val: IMessageResponse) => void;
	onReset?: () => void;
	onError?: (_val: string) => void;
}

export interface UseUpdateJobPostProps {
	onSuccess?: (_val: IMessageResponse) => void;
	onReset?: () => void;
	onError?: (_val: string) => void;
}

export interface UseUpdateJobPostApprovalProps {
	onSuccess?: (_val: IMessageResponse) => void;
	onReset?: () => void;
	onError?: (_val: string) => void;
}

export interface UseApproveJobPostProps {
	onSuccess?: (_val: IMessageResponse) => void;
	onReset?: () => void;
	onError?: (_val: string) => void;
}

export interface UseRemoveJobApplicationProps {
	onSuccess?: (_val: IMessageResponse) => void;
	onReset?: () => void;
	onError?: (_val: string) => void;
}

/*****************************************PACKAGES QUERIES ****************************/
export interface UseCreateNewEmployerPackageProps {
	onSuccess?: (_val: IMessageResponse) => void;
	onReset?: () => void;
	onError?: (_val: string) => void;
}

export interface UseUpdateEmployerPackageProps {
	onSuccess?: (_val: IMessageResponse) => void;
	onReset?: () => void;
	onError?: (_val: string) => void;
}

export type UseGetAllEmployerPackageProps = {
	params?: GetAllEmployerPackageRequestParams;
};

export interface UseRemoveEmployerPackageProps {
	onSuccess?: (data: ApiDataResponse<IJobPackageResponse>) => void;
	onReset?: () => void;
	onError?: (_val: string) => void;
}

export interface UseCreateNewSeekerPackageProps {
	onSuccess?: (_val: IMessageResponse) => void;
	onReset?: () => void;
	onError?: (_val: string) => void;
}

export interface UseUpdateSeekerPackageProps {
	onSuccess?: (_val: IMessageResponse) => void;
	onReset?: () => void;
	onError?: (_val: string) => void;
}

export interface UseUpdateSeekerPackageDescriptionProps {
	onSuccess?: (_val: IMessageResponse) => void;
	onReset?: () => void;
	onError?: (_val: string) => void;
}

export interface UseCreateSeekerPackageDescriptionProps {
	onSuccess?: (_val: IMessageResponse) => void;
	onReset?: () => void;
	onError?: (_val: string) => void;
}

export interface UseRemoveSeekerPackageProps {
	onSuccess?: (data: ApiDataResponse<ISeekerPackageResponse>) => void;
	onReset?: () => void;
	onError?: (_val: string) => void;
}

export interface UseRemoveSeekerPackageProps2 {
	onSuccess?: (data: ApiDataResponse<ISeekerPackageResponse2>) => void;
	onReset?: () => void;
	onError?: (_val: string) => void;
}

export interface UseRemoveSeekerPackageDescriptionProps {
	onSuccess?: (
		data: ApiDataResponse<ISeekerPackageDescriptionResponse>
	) => void;
	onReset?: () => void;
	onError?: (_val: string) => void;
}

export interface UseRemoveBlogPostProps {
	onSuccess?: (data: ApiDataResponse<IBlogPostResponse>) => void;
	onReset?: () => void;
	onError?: (_val: string) => void;
}

export interface UseRemoveBlogPostCategoryProps {
	onSuccess?: (data: ApiDataResponse<IBlogCategoryResponse>) => void;
	onReset?: () => void;
	onError?: (_val: string) => void;
}

export interface UseUpdateBlogPostCategoryProps {
	onSuccess?: (_val: IMessageResponse) => void;
	onReset?: () => void;
	onError?: (_val: string) => void;
}

export interface UseUpdateBlogCommentProps {
	onSuccess?: (_val: IMessageResponse) => void;
	onReset?: () => void;
	onError?: (_val: string) => void;
}

export type UseGetAllBlogCommentsProps = {
	params?: GetAllBlogCommentsRequestParams;
};

/************************************************DASHBOARD QUERIES *************************************/
export type UseGetJobPostChartProps = {
	params?: GetJobPostChartRequestParams;
};

export type UseGetJobApplicationsChartProps = {
	params?: GetJobApplicationsChartRequestParams;
};

export type UseGetMonthlySalesStatisticsChartProps = {
	params?: GetMonthlySalesStatisticsRequestParams;
};

/*********************************************** MESSAGE QUERIES **************************************/
export interface UseRemoveMessageProps {
	onSuccess?: (_val: IMessageResponse) => void;
	onReset?: () => void;
	onError?: (_val: string) => void;
}

export interface UseUpdateMessageProps {
	onSuccess?: (_val: IMessageResponse) => void;
	onReset?: () => void;
	onError?: (_val: string) => void;
}

export interface UseReplyMessageProps {
	onSuccess?: (_val: IMessageResponse) => void;
	onReset?: () => void;
	onError?: (_val: string) => void;
}

export interface UseRemoveSubscriberProps {
	onSuccess?: (_val: IMessageResponse) => void;
	onReset?: () => void;
	onError?: (_val: string) => void;
}

/********************************************** TESTIMONY QUERIES *************************************/
export interface UseRemoveTestimonyProps {
	onSuccess?: (_val: IMessageResponse) => void;
	onReset?: () => void;
	onError?: (_val: string) => void;
}
