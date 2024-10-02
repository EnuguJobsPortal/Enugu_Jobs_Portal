import { useNotification } from "@/context/NotificationContext";
import {
    GetAllEmployerProfileRequestParams,
    GetAllSeekerProfileRequestParams,
    GetAllUserTypesRequestParams,
    GetAllUsersRequestParams,
    INewUserDTO,
    IUserUpdateDTO,
    IUserUpdateRequest
} from "@/interfaces/dto";
import { ParseQueryParams } from "@/interfaces/general";
import {
    UseCreateNewUserProps,
    UseGetAllEmployerProfileProps,
    UseGetAllSeekerProfileProps,
    UseGetAllUserTypesProps,
    UseGetAllUsersProps,
    UseRemoveEmployerProfileProps,
    UseRemoveSeekerProfileProps,
    UseUpdateUserProps
} from "@/interfaces/queries.interface";
import {
    ApiDataResponse,
    GetAllEmployerResponse,
    GetAllSeekerResponse,
    GetAllUserTypeResponse,
    GetAllUsersResponse,
    IEmployerResponse,
    IMessageResponse,
    ISeekerResponse
} from "@/interfaces/response.interface";
import { deleteRequest, getRequestParams, postRequest, putRequest } from "@/utils/apiCaller";
import { parseQueryParams } from "@/utils/parseQueryParam";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateNewUser = (props: UseCreateNewUserProps) => {
    const queryClient = useQueryClient();
    const { onSuccess, onError, onReset} = props;
  
    const { mutate, isLoading, ...rest } = useMutation(
        ({ payload }: { payload: INewUserDTO }) => 
        postRequest<INewUserDTO, IMessageResponse>({ url: "/User/createuseraccount", payload }),
        {
            onSuccess: (values) => {

                if(values.error === false)
                {
                    if(onSuccess)
                    {
                        onSuccess(values);
                    }

                    if(onReset)
                    {
                        onReset();
                    }

                    //revalidate user queries
                    queryClient.invalidateQueries([`useGetAllUsers`]);
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
                rest.reset();
                
                if (onError) {
                    onError(error.message)
                }
            },
        }
    );
  
    return {
        createNewUser: mutate,
        creatingNewUser: isLoading,
        ...rest,
    };
};

export const useUpdateUser = (props: UseUpdateUserProps) => {
    const queryClient = useQueryClient();
    const { onReset, onSuccess, onError } = props;
    const { mutate, isError, isLoading, isSuccess, reset } = useMutation(
        ({ payload, useraccountid }: IUserUpdateRequest) =>
        putRequest<IUserUpdateDTO, IMessageResponse>({
            url: `/User/updateuseraccount?useraccountid=${useraccountid}`,
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
                    queryClient.invalidateQueries([`useGetAllUsers`]);
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
        updateUser: mutate,
        updatingUser: isLoading,
        isError,
        isSuccess,
    };
};

export const useGetAllUserTypes = ({ params }: UseGetAllUserTypesProps) => {
    const { notify } = useNotification();
    const { isLoading, data, refetch, ...rest } = useQuery(
        ["useGetAllUserTypes", { params }],
        () =>
        getRequestParams<GetAllUserTypesRequestParams, GetAllUserTypeResponse>({
            url: "/User/usertype",
            params: parseQueryParams(
                params as unknown as ParseQueryParams
            ) as unknown as GetAllUserTypesRequestParams,
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
        userTypes: data?.data || [],
        rest
    };
};

export const useGetAllUsers = ({ params }: UseGetAllUsersProps) => {
    const { notify } = useNotification();
    const { isLoading, data, refetch, ...rest } = useQuery(
        ["useGetAllUsers", { params }],
        () =>
        getRequestParams<GetAllUsersRequestParams, GetAllUsersResponse>({
            url: "/User/allusers",
            params: parseQueryParams(
                params as unknown as ParseQueryParams
            ) as unknown as GetAllUsersRequestParams,
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
        users: data,
        rest
    };
};

export const useGetAllSeekerProfiles = ({ params }: UseGetAllSeekerProfileProps) => {
    const { notify } = useNotification();
    const { isLoading, data, refetch, ...rest } = useQuery(
        ["useGetAllSeekerProfiles", { params }],
        () =>
        getRequestParams<GetAllSeekerProfileRequestParams, GetAllSeekerResponse>({
            url: "/JobSeeker/alljobseeker",
            params: parseQueryParams(
                params as unknown as ParseQueryParams
            ) as unknown as GetAllSeekerProfileRequestParams,
        }),
        {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError(error: any) {
                notify(error.message, { type: "error", theme:"colored"})
            },
        }
    );
  
    return {
        loadingSeekerProfile:isLoading,
        refetchingSeekerProfiles:refetch,
        seekerProfiles: data,
        rest
    };
};

export const useCreateUpdateSeekerProfile = (props: {
    onSuccess?: (value: IMessageResponse) => void;
    onReset?: () => void;
    onError?: (message:string) => void;
}) => {
    const queryClient = useQueryClient();
    const { onReset, onSuccess, onError } = props;
    const { data, mutate, isLoading, isError, isSuccess, reset } = useMutation(
        ({ payload, id }: { payload: FormData, id: string}) =>
            putRequest<FormData, IMessageResponse>({
                url: `/JobSeeker/addorupdateseekerprofile?id=${id}`,
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

                queryClient.invalidateQueries(["useGetAllSeekerProfiles"]).then(() => {
                    queryClient.invalidateQueries([`useGetAllUsers`]);
                });
            }

            if(values.error === true)
            {
                if (onError) {
                    onError(values.message);
                }
            }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            reset();
            
            if (onError) {
                onError(error.message)
            }
        },
      }
    );
  
    return {
        createUpdateSeekerProfile: mutate,
        creatingUpdatingSeekerProfile: isLoading,
        data,
        isError: isError,
        isSuccess,
    };
};

export const useGetAllEmployerProfiles = ({ params, enabler }: UseGetAllEmployerProfileProps) => {
    const { notify } = useNotification();
    const { isLoading, data, refetch, ...rest } = useQuery(
        ["useGetAllEmployerProfiles", { params }],
        () =>
        getRequestParams<GetAllEmployerProfileRequestParams, GetAllEmployerResponse>({
            url: "/EmployerProfile/employers",
            params: parseQueryParams(
                params as unknown as ParseQueryParams
            ) as unknown as GetAllEmployerProfileRequestParams,
        }),
        {
            enabled: enabler,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError(error: any) {
                notify(error.message, { type: "error", theme:"colored"})
            },
        }
    );
  
    return {
        loadingEmployerProfiles:isLoading,
        refetchingEmployerProfiles:refetch,
        employerProfiles: data,
        rest
    };
};

export const useCreateUpdateEmployerProfile = (props: {
    onSuccess?: (value: IMessageResponse) => void;
    onReset?: () => void;
    onError?: (message:string) => void;
}) => {
    const queryClient = useQueryClient();
    const { onReset, onSuccess, onError } = props;
    const { data, mutate, isLoading, isError, isSuccess, reset } = useMutation(
        ({ payload, id }: { payload: FormData, id: string}) =>
            putRequest<FormData, IMessageResponse>({
                url: `/EmployerProfile/addorupdateemployerprofile?id=${id}`,
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

                queryClient.invalidateQueries(["useGetAllEmployerProfiles"]).then(() => {
                    queryClient.invalidateQueries([`useGetAllUsers`]);
                });
            }

            if(values.error === true)
            {
                if (onError) {
                    onError(values.message);
                }
            }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            reset();
            
            if (onError) {
                onError(error.message)
            }
        },
      }
    );
  
    return {
        createUpdateEmployerProfile: mutate,
        creatingUpdatingEmployerProfile: isLoading,
        data,
        isError: isError,
        isSuccess,
    };
};

export const useRemoveSeekerProfile = (props: UseRemoveSeekerProfileProps) => {
    const queryClient = useQueryClient();
    const { onReset, onSuccess, onError } = props;
    const { data, reset, mutate, isLoading } = useMutation(
        ({ id }: { id: string }) =>
        deleteRequest<ApiDataResponse<ISeekerResponse>>({
            url: `/JobSeeker/deleteseekerprofile?id=${id}`,
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
                
                queryClient.invalidateQueries(["useGetAllUsers"]);
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
        removeSeekerProfile: mutate,
        removingSeekerProfile: isLoading,
        data
    };
};

export const useRemoveEmployerProfile = (props: UseRemoveEmployerProfileProps) => {
    const queryClient = useQueryClient();
    const { onReset, onSuccess, onError } = props;
    const { data, reset, mutate, isLoading } = useMutation(
        ({ id }: { id: string }) =>
        deleteRequest<ApiDataResponse<IEmployerResponse>>({
            url: `/EmployerProfile/deletemployerprofile?id=${id}`,
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
                
                queryClient.invalidateQueries(["useGetAllUsers"]);
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
        removeEmployerProfile: mutate,
        removingEmployerProfile: isLoading,
        data
    };
};