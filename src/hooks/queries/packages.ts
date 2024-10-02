import { useNotification } from "@/context/NotificationContext";
import {
	GetAllSeekerPackageRequestParams,
	GetAllSeekerPackageRequestParams2,
	GetAllSeekerPackageSubscriptionRequestParams,
	IEmployerPackageDTO,
	IEmployerPackageUpdateDTO,
	INewSeekerPackageDescriptionDTO,
	ISeekerPackage2DTO,
	ISeekerPackageDTO,
	ISeekerPackageUpdate2DTO,
	ISeekerPackageUpdateDTO,
	IUpdateEmployerPackageRequest,
	IUpdateSeekerPackageDescriptionDTO,
	IUpdateSeekerPackageDescriptionRequest,
	IUpdateSeekerPackageRequest,
	IUpdateSeekerPackageRequest2,
} from "@/interfaces/dto";
import { ParseQueryParams } from "@/interfaces/general";
import {
	UseCreateNewEmployerPackageProps,
	UseCreateNewSeekerPackageProps,
	UseCreateSeekerPackageDescriptionProps,
	UseRemoveEmployerPackageProps,
	UseRemoveSeekerPackageDescriptionProps,
	UseRemoveSeekerPackageProps,
	UseRemoveSeekerPackageProps2,
	UseUpdateEmployerPackageProps,
	UseUpdateSeekerPackageDescriptionProps,
	UseUpdateSeekerPackageProps,
} from "@/interfaces/queries.interface";
import {
	ApiDataResponse,
	GetAllJobSeekerPackageSubscriptionResponse,
	GetAllSeekerPackageResponse,
	GetAllSeekerPackageResponse2,
	IJobPackageResponse,
	IMessageResponse,
	ISeekerPackageDescriptionResponse,
	ISeekerPackageResponse,
	ISeekerPackageResponse2,
} from "@/interfaces/response.interface";
import {
	deleteRequest,
	getRequestParams,
	postRequest,
	putRequest,
} from "@/utils/apiCaller";
import { parseQueryParams } from "@/utils/parseQueryParam";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateNewEmployerPackage = (
	props: UseCreateNewEmployerPackageProps
) => {
	const queryClient = useQueryClient();
	const { onSuccess, onError, onReset } = props;

	const { mutate, isLoading, ...rest } = useMutation(
		({ payload }: { payload: IEmployerPackageDTO }) =>
			postRequest<IEmployerPackageDTO, IMessageResponse>({
				url: "/Jobs/createjobpackage",
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
					queryClient.invalidateQueries([`useGetAllJobPackages`]);
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
		createEmployerPackage: mutate,
		creatingEmployerPackage: isLoading,
		...rest,
	};
};

export const useUpdateEmployerPackage = (
	props: UseUpdateEmployerPackageProps
) => {
	const queryClient = useQueryClient();
	const { onReset, onSuccess, onError } = props;
	const { mutate, isError, isLoading, isSuccess, reset } = useMutation(
		({ payload, packageid }: IUpdateEmployerPackageRequest) =>
			putRequest<IEmployerPackageUpdateDTO, IMessageResponse>({
				url: `/Jobs/updatejobpackage?packageid=${packageid}`,
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
					queryClient.invalidateQueries([`useGetAllJobPackages`]);
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
		updateEmployerPackage: mutate,
		updatingEmployerPackage: isLoading,
		isError,
		isSuccess,
	};
};

export const useRemoveEmployerPackage = (
	props: UseRemoveEmployerPackageProps
) => {
	const queryClient = useQueryClient();
	const { onReset, onSuccess, onError } = props;
	const { data, reset, mutate, isLoading } = useMutation(
		({ packageid }: { packageid: string }) =>
			deleteRequest<ApiDataResponse<IJobPackageResponse>>({
				url: `/Jobs/deletejobpackage?packageid=${packageid}`,
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

				queryClient.invalidateQueries(["useGetAllJobPackages"]);
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
		removeEmployerPackage: mutate,
		removingEmployerPackage: isLoading,
		data,
	};
};

export const useCreateSeekerPackage = (
	props: UseCreateNewSeekerPackageProps
) => {
	const queryClient = useQueryClient();
	const { onSuccess, onError, onReset } = props;

	const { mutate, isLoading, ...rest } = useMutation(
		({ payload }: { payload: ISeekerPackageDTO }) =>
			postRequest<ISeekerPackageDTO, IMessageResponse>({
				url: "/Training/createtrainingpackage",
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
					queryClient.invalidateQueries([`useGetAllSeekerPackages`]);
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
		createSeekerPackage: mutate,
		creatingSeekerPackage: isLoading,
		...rest,
	};
};

export const useCreateSeekerPackage2 = (
	props: UseCreateNewSeekerPackageProps
) => {
	const queryClient = useQueryClient();
	const { onSuccess, onError, onReset } = props;

	const { mutate, isLoading, ...rest } = useMutation(
		({ payload }: { payload: ISeekerPackage2DTO }) =>
			postRequest<ISeekerPackage2DTO, IMessageResponse>({
				url: "/JobSeeker/seeker-package",
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
					queryClient.invalidateQueries([`useGetAllSeekerPackages2`]);
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
		createSeekerPackage: mutate,
		creatingSeekerPackage: isLoading,
		...rest,
	};
};

export const useGetAllSeekerPackages = ({
	params,
}: {
	params: GetAllSeekerPackageRequestParams;
}) => {
	const { notify } = useNotification();
	const { isLoading, data, refetch, ...rest } = useQuery(
		["useGetAllSeekerPackages", { params }],
		() =>
			getRequestParams<
				GetAllSeekerPackageRequestParams,
				GetAllSeekerPackageResponse
			>({
				url: "/Training/trainingpackage",
				params: parseQueryParams(
					params as unknown as ParseQueryParams
				) as unknown as GetAllSeekerPackageRequestParams,
			}),
		{
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			onError(error: any) {
				notify(error.message, { type: "error", theme: "colored" });
			},
		}
	);

	return {
		loadingSeekerPackages: isLoading,
		refetchSeekerPackages: refetch,
		seekerPackages: data,
		rest,
	};
};

export const useGetAllSeekerPackages2 = ({
	params,
}: {
	params: GetAllSeekerPackageRequestParams2;
}) => {
	const { notify } = useNotification();
	const { isLoading, data, refetch, ...rest } = useQuery(
		["useGetAllSeekerPackages2", { params }],
		() =>
			getRequestParams<
				GetAllSeekerPackageRequestParams2,
				GetAllSeekerPackageResponse2
			>({
				url: "/JobSeeker/seeker-packages",
				params: parseQueryParams(
					params as unknown as ParseQueryParams
				) as unknown as GetAllSeekerPackageRequestParams2,
			}),
		{
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			onError(error: any) {
				notify(error.message, { type: "error", theme: "colored" });
			},
		}
	);

	return {
		loadingSeekerPackages: isLoading,
		refetchSeekerPackages: refetch,
		seekerPackages: data,
		rest,
	};
};

export const useUpdateSeekerPackage = (props: UseUpdateSeekerPackageProps) => {
	const queryClient = useQueryClient();
	const { onReset, onSuccess, onError } = props;
	const { mutate, isError, isLoading, isSuccess, reset } = useMutation(
		({ payload, packageid }: IUpdateSeekerPackageRequest) =>
			putRequest<ISeekerPackageUpdateDTO, IMessageResponse>({
				url: `/Training/updatetrainingpackage?packageid=${packageid}`,
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
					queryClient.invalidateQueries([`useGetAllSeekerPackages`]);
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
		updateSeekerPackage: mutate,
		updatingSeekerPackage: isLoading,
		isError,
		isSuccess,
	};
};

export const useUpdateSeekerPackage2 = (props: UseUpdateSeekerPackageProps) => {
	const queryClient = useQueryClient();
	const { onReset, onSuccess, onError } = props;
	const { mutate, isError, isLoading, isSuccess, reset } = useMutation(
		({ payload, packageId }: IUpdateSeekerPackageRequest2) =>
			putRequest<ISeekerPackageUpdate2DTO, IMessageResponse>({
				url: `/JobSeeker/update-seeker-package?packageid=${packageId}`,
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
					queryClient.invalidateQueries([`useGetAllSeekerPackages2`]);
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
		updateSeekerPackage: mutate,
		updatingSeekerPackage: isLoading,
		isError,
		isSuccess,
	};
};

export const useCreateSeekerPackageDescription = (
	props: UseCreateSeekerPackageDescriptionProps
) => {
	const queryClient = useQueryClient();
	const { onSuccess, onError, onReset } = props;

	const { mutate, isLoading, ...rest } = useMutation(
		({ payload }: { payload: INewSeekerPackageDescriptionDTO }) =>
			postRequest<INewSeekerPackageDescriptionDTO, IMessageResponse>({
				url: "/JobSeeker/seeker-package-description",
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
					queryClient.invalidateQueries([`useGetAllSeekerPackages2`]);
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
		createSeekerPackageDescription: mutate,
		creatingSeekerPackageDescription: isLoading,
		...rest,
	};
};

export const useUpdateSeekerPackageDescription = (
	props: UseUpdateSeekerPackageDescriptionProps
) => {
	const queryClient = useQueryClient();
	const { onReset, onSuccess, onError } = props;
	const { mutate, isError, isLoading, isSuccess, reset } = useMutation(
		({ payload, descriptionId }: IUpdateSeekerPackageDescriptionRequest) =>
			putRequest<IUpdateSeekerPackageDescriptionDTO, IMessageResponse>({
				url: `/JobSeeker/update-package-description?descriptionId=${descriptionId}`,
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
					queryClient.invalidateQueries([`useGetAllSeekerPackages2`]);
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
		updateSeekerPackageDescription: mutate,
		updatingSeekerPackageDescription: isLoading,
		isError,
		isSuccess,
	};
};

export const useRemoveSeekerPackage = (props: UseRemoveSeekerPackageProps) => {
	const queryClient = useQueryClient();
	const { onReset, onSuccess, onError } = props;
	const { data, reset, mutate, isLoading } = useMutation(
		({ packageid }: { packageid: string }) =>
			deleteRequest<ApiDataResponse<ISeekerPackageResponse>>({
				url: `/Training/deletetrainingPackage?packageid=${packageid}`,
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

				queryClient.invalidateQueries(["useGetAllSeekerPackages"]);
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
		removeSeekerPackage: mutate,
		removingSeekerPackage: isLoading,
		data,
	};
};

export const useRemoveSeekerPackage2 = (
	props: UseRemoveSeekerPackageProps2
) => {
	const queryClient = useQueryClient();
	const { onReset, onSuccess, onError } = props;
	const { data, reset, mutate, isLoading } = useMutation(
		({ packageId }: { packageId: string }) =>
			deleteRequest<ApiDataResponse<ISeekerPackageResponse2>>({
				url: `/JobSeeker/delete-seeker-package/${packageId}`,
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

				queryClient.invalidateQueries(["useGetAllSeekerPackages2"]);
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
		removeSeekerPackage: mutate,
		removingSeekerPackage: isLoading,
		data,
	};
};

export const useRemoveSeekerPackageDescription = (
	props: UseRemoveSeekerPackageDescriptionProps
) => {
	const queryClient = useQueryClient();
	const { onReset, onSuccess, onError } = props;
	const { data, reset, mutate, isLoading } = useMutation(
		({ packageDescriptionId }: { packageDescriptionId: string }) =>
			deleteRequest<ApiDataResponse<ISeekerPackageDescriptionResponse>>({
				url: `/JobSeeker/delete-package-description/${packageDescriptionId}`,
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

				queryClient.invalidateQueries(["useGetAllSeekerPackages2"]);
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
		removeSeekerPackageDescription: mutate,
		removingSeekerPackageDescription: isLoading,
		data,
	};
};

export const useGetAllSeekerPackageSubscriptions = ({
	params,
}: {
	params: GetAllSeekerPackageSubscriptionRequestParams;
}) => {
	const { notify } = useNotification();
	const { isLoading, data, refetch, ...rest } = useQuery(
		["useGetAllSeekerPackageSubscriptions", { params }],
		() =>
			getRequestParams<
				GetAllSeekerPackageSubscriptionRequestParams,
				GetAllJobSeekerPackageSubscriptionResponse
			>({
				url: "/JobSeeker/package-subscriptions",
				params: parseQueryParams(
					params as unknown as ParseQueryParams
				) as unknown as GetAllSeekerPackageSubscriptionRequestParams,
			}),
		{
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			onError(error: any) {
				notify(error.message, { type: "error", theme: "colored" });
			},
		}
	);

	return {
		loadingSeekerPackageSubscriptions: isLoading,
		refetchSeekerPackageSubscriptions: refetch,
		seekerPackageSubscriptions: data,
		rest,
	};
};
