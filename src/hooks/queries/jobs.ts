import { useNotification } from "@/context/NotificationContext";
import {
	GetAllJobPackageRequestParams,
	GetAllJobPostApprovalRequestParams,
	GetAllJobPostsRequestParams,
	IJobPostApprovalDTO,
	IJobPostApprovalRequest,
	IJobPostApprovalUpdateDTO,
	IJobPostApprovalUpdateRequest,
	IJobPostUpdateDTO,
	INewJobPost2DTO,
	INewJobPostDTO,
	IUpdateJobPostRequest,
} from "@/interfaces/dto";
import { ParseQueryParams } from "@/interfaces/general";
import {
	UseApproveJobPostProps,
	UseCreateNewJobPostProps,
	UseRemoveJobPostApprovalProps,
	UseRemoveJobPostProps,
	UseUpdateJobPostApprovalProps,
	UseUpdateJobPostProps,
} from "@/interfaces/queries.interface";
import {
	ApiDataResponse,
	GetAllJobPackagesResponse,
	GetAllJobPostApprovalResponse,
	GetAllJobPostsResponse,
	IJobPostApprovalResponse,
	IJobPostResponse,
	IMessageResponse,
	INewJobPostResponse,
} from "@/interfaces/response.interface";
import {
	deleteRequest,
	getRequestParams,
	postRequest,
	putRequest,
} from "@/utils/apiCaller";
import { parseQueryParams } from "@/utils/parseQueryParam";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllJobPosts = ({
	params,
}: {
	params: GetAllJobPostsRequestParams;
}) => {
	const { notify } = useNotification();
	const { isLoading, data, refetch, ...rest } = useQuery(
		["useGetAllJobPosts", { params }],
		() =>
			getRequestParams<
				GetAllJobPostsRequestParams,
				GetAllJobPostsResponse
			>({
				url: "/Jobs/alljobpost",
				params: parseQueryParams(
					params as unknown as ParseQueryParams
				) as unknown as GetAllJobPostsRequestParams,
			}),
		{
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			onError(error: any) {
				notify(error.message, { type: "error", theme: "colored" });
			},
		}
	);

	return {
		loadingJobPosts: isLoading,
		refetchJobPosts: refetch,
		jobs: data,
		rest,
	};
};

export const useGetAllJobPostApprovals = ({
	params,
}: {
	params: GetAllJobPostApprovalRequestParams;
}) => {
	const { notify } = useNotification();
	const { isLoading, data, refetch, ...rest } = useQuery(
		["useGetAllJobPostApprovals", { params }],
		() =>
			getRequestParams<
				GetAllJobPostApprovalRequestParams,
				GetAllJobPostApprovalResponse
			>({
				url: "/Jobs/job-approvals",
				params: parseQueryParams(
					params as unknown as ParseQueryParams
				) as unknown as GetAllJobPostApprovalRequestParams,
			}),
		{
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			onError(error: any) {
				notify(error.message, { type: "error", theme: "colored" });
			},
		}
	);

	return {
		loadingJobPostApprovals: isLoading,
		refetchJobPostApprovals: refetch,
		jobApprovals: data,
		rest,
	};
};

export const useGetAllJobPackages = ({
	params,
}: {
	params: GetAllJobPackageRequestParams;
}) => {
	const { notify } = useNotification();
	const { isLoading, data, refetch, ...rest } = useQuery(
		["useGetAllJobPackages", { params }],
		() =>
			getRequestParams<
				GetAllJobPackageRequestParams,
				GetAllJobPackagesResponse
			>({
				url: "/Jobs/jobpackages",
				params: parseQueryParams(
					params as unknown as ParseQueryParams
				) as unknown as GetAllJobPackageRequestParams,
			}),
		{
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			onError(error: any) {
				notify(error.message, { type: "error", theme: "colored" });
			},
		}
	);

	return {
		loadingJobPackages: isLoading,
		refetchJobPackages: refetch,
		jobPackages: data,
		rest,
	};
};

export const useCreateNewJobPost = (props: UseCreateNewJobPostProps) => {
	const queryClient = useQueryClient();
	const { onSuccess, onError, onReset } = props;

	const { mutate, isLoading, ...rest } = useMutation(
		({ payload }: { payload: INewJobPostDTO }) =>
			postRequest<INewJobPostDTO, INewJobPostResponse>({
				url: "/Jobs/postjob",
				payload,
			}),
		{
			onSuccess: (values) => {
				if (values.error === false) {
					if (onSuccess) {
						onSuccess(values);
					}

					if (onReset) {
						onReset();
					}

					//revalidate user queries
					queryClient.invalidateQueries(["useGetAllJobPosts"]);
					queryClient.invalidateQueries(["useGetJobPostChart"]);
					queryClient.invalidateQueries(["useGetAllDashboardCounts"]);
				} else {
					if (onError) {
						rest.reset();
						onError(values.message);
					}
				}
			},
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			onError: (error: any) => {
				rest.reset();

				if (onError) {
					onError(error.message);
				}
			},
		}
	);

	return {
		createNewJobPost: mutate,
		creatingNewJobPost: isLoading,
		...rest,
	};
};

export const useCreateNewJobPost2 = (props: UseCreateNewJobPostProps) => {
	const queryClient = useQueryClient();
	const { onSuccess, onError, onReset } = props;

	const { mutate, isLoading, ...rest } = useMutation(
		({ payload }: { payload: INewJobPost2DTO }) =>
			postRequest<INewJobPost2DTO, INewJobPostResponse>({
				url: "/Jobs/post-job-admin",
				payload,
			}),
		{
			onSuccess: (values) => {
				if (values.error === false) {
					if (onSuccess) {
						onSuccess(values);
					}

					if (onReset) {
						onReset();
					}

					//revalidate user queries
					queryClient.invalidateQueries(["useGetAllJobPosts"]);
					queryClient.invalidateQueries(["useGetJobPostChart"]);
					queryClient.invalidateQueries(["useGetAllDashboardCounts"]);
				} else {
					if (onError) {
						rest.reset();
						onError(values.message);
					}
				}
			},
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			onError: (error: any) => {
				rest.reset();

				if (onError) {
					onError(error.message);
				}
			},
		}
	);

	return {
		createNewJobPost: mutate,
		creatingNewJobPost: isLoading,
		...rest,
	};
};

export const useRemoveJobPost = (props: UseRemoveJobPostProps) => {
	const queryClient = useQueryClient();
	const { onReset, onSuccess, onError } = props;
	const { data, reset, mutate, isLoading } = useMutation(
		({ postid }: { postid: number }) =>
			deleteRequest<ApiDataResponse<IJobPostResponse>>({
				url: `/Jobs/deletejobpost?postid=${postid}`,
			}),
		{
			onSuccess(data) {
				if (data.error === false) {
					if (onReset) {
						onReset();
					}

					if (onSuccess) {
						onSuccess(data);
					}
				}

				if (data.error === true) {
					if (onError) {
						onError(data.message);
					}
				}

				queryClient.invalidateQueries(["useGetAllJobPosts"]);
				queryClient.invalidateQueries(["useGetJobPostChart"]);
				queryClient.invalidateQueries(["useGetAllDashboardCounts"]);
			},
			onError(error: unknown) {
				reset();

				if (onError) {
					onError((error as Error).message);
				}
			},
		}
	);

	return {
		removeJobPost: mutate,
		removingJobPost: isLoading,
		data,
	};
};

export const useRemoveJobPostApproval = (
	props: UseRemoveJobPostApprovalProps
) => {
	const queryClient = useQueryClient();
	const { onReset, onSuccess, onError } = props;
	const { data, reset, mutate, isLoading } = useMutation(
		({ approval_id }: { approval_id: number }) =>
			deleteRequest<ApiDataResponse<IJobPostApprovalResponse>>({
				url: `/Jobs/job-post-approval/${approval_id}`,
			}),
		{
			onSuccess(data) {
				if (data.error === false) {
					if (onReset) {
						onReset();
					}

					if (onSuccess) {
						onSuccess(data);
					}
				}

				if (data.error === true) {
					if (onError) {
						onError(data.message);
					}
				}

				queryClient.invalidateQueries(["useGetAllJobPostApprovals"]);
			},
			onError(error: unknown) {
				reset();

				if (onError) {
					onError((error as Error).message);
				}
			},
		}
	);

	return {
		removeJobPostApproval: mutate,
		removingJobPostApproval: isLoading,
		data,
	};
};

export const useUpdateJobPost = (props: UseUpdateJobPostProps) => {
	const queryClient = useQueryClient();
	const { onReset, onSuccess, onError } = props;
	const { mutate, isError, isLoading, isSuccess, reset } = useMutation(
		({ payload, postid }: IUpdateJobPostRequest) =>
			putRequest<IJobPostUpdateDTO, IMessageResponse>({
				url: `/Jobs/updatejobpost?postid=${postid}`,
				payload,
			}),
		{
			onSuccess(values) {
				if (values.error === false) {
					if (onReset) {
						onReset();
					}

					if (onSuccess) {
						onSuccess(values);
					}

					//revalidate user queries
					queryClient.invalidateQueries([`useGetAllJobPosts`]);
				}

				if (values.error === true) {
					if (onError) {
						onError(values.message);
					}
				}
			},

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			onError(error: any) {
				reset();
				if (onError) {
					onError(error.message);
				}
			},
		}
	);

	return {
		updateJobPost: mutate,
		updatingJobPost: isLoading,
		isError,
		isSuccess,
	};
};

export const useUpdateJobPostApproval = (
	props: UseUpdateJobPostApprovalProps
) => {
	const queryClient = useQueryClient();
	const { onReset, onSuccess, onError } = props;
	const { mutate, isError, isLoading, isSuccess, reset } = useMutation(
		({ payload, approval_id }: IJobPostApprovalUpdateRequest) =>
			putRequest<IJobPostApprovalUpdateDTO, IMessageResponse>({
				url: `/Jobs/update-job-post-approval/${approval_id}`,
				payload,
			}),
		{
			onSuccess(values) {
				if (values.error === false) {
					if (onReset) {
						onReset();
					}

					if (onSuccess) {
						onSuccess(values);
					}

					//revalidate user queries
					queryClient.invalidateQueries([
						`useGetAllJobPostApprovals`,
					]);
				}

				if (values.error === true) {
					if (onError) {
						onError(values.message);
					}
				}
			},

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			onError(error: any) {
				reset();
				if (onError) {
					onError(error.message);
				}
			},
		}
	);

	return {
		updateJobPostApproval: mutate,
		updatingJobPostApproval: isLoading,
		isError,
		isSuccess,
	};
};

export const useApproveJobPost = (props: UseApproveJobPostProps) => {
	const queryClient = useQueryClient();
	const { onReset, onSuccess, onError } = props;
	const { mutate, isError, isLoading, isSuccess, reset } = useMutation(
		({ payload, approval_id }: IJobPostApprovalRequest) =>
			putRequest<IJobPostApprovalDTO, IMessageResponse>({
				url: `/Jobs/post-approval/${approval_id}`,
				payload,
			}),
		{
			onSuccess(values) {
				if (values.error === false) {
					if (onReset) {
						onReset();
					}

					if (onSuccess) {
						onSuccess(values);
					}

					//revalidate user queries
					queryClient.invalidateQueries([
						`useGetAllJobPostApprovals`,
					]);
				}

				if (values.error === true) {
					if (onError) {
						onError(values.message);
					}
				}
			},

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			onError(error: any) {
				reset();
				if (onError) {
					onError(error.message);
				}
			},
		}
	);

	return {
		approveJobPost: mutate,
		approvingJobPost: isLoading,
		isError,
		isSuccess,
	};
};
