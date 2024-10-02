import { useNotification } from "@/context/NotificationContext";
import { GetAllMailingListRequestParams, GetAllMessagesRequestParams, IReplyMessageDTO, IUpdateMessageStatusRequest } from "@/interfaces/dto";
import { ParseQueryParams } from "@/interfaces/general";
import { UseRemoveMessageProps, UseRemoveSubscriberProps, UseReplyMessageProps, UseUpdateMessageProps } from "@/interfaces/queries.interface";
import { ApiDataResponse, GetAllContactMessageResponse, GetAllMailingListResponse, IContactMessageResponse, IMailingListResponse, IMessageResponse } from "@/interfaces/response.interface";
import { deleteRequest, getRequestParams, postRequest, putRequest } from "@/utils/apiCaller";
import { parseQueryParams } from "@/utils/parseQueryParam";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllMessages = ({ params }: { params: GetAllMessagesRequestParams }) => {
    const { notify } = useNotification();
    const { isLoading, data, refetch, ...rest } = useQuery(
        ["useGetAllMessages", { params }],
        () =>
        getRequestParams<GetAllMessagesRequestParams, GetAllContactMessageResponse>({
            url: "/Messages/get-messages",
            params: parseQueryParams(
                params as unknown as ParseQueryParams
            ) as unknown as GetAllMessagesRequestParams,
        }),
        {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError(error: any) {
                notify(error.message, { type: "error", theme:"colored"})
            },
        }
    );
  
    return {
        loadingMessages: isLoading,
        refetchMessages: refetch,
        messages: data,
        rest
    };
};

export const useRemoveMessage = (props: UseRemoveMessageProps) => {
    const queryClient = useQueryClient();
    const { onReset, onSuccess, onError } = props;
    const { data, reset, mutate, isLoading } = useMutation(
        ({ message_id }: { message_id: string }) =>
        deleteRequest<ApiDataResponse<IContactMessageResponse>>({
            url: `/Messages/delete-message?message_id=${message_id}`,
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
                
                queryClient.invalidateQueries(["useGetAllMessages"]);
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
        removeMessage: mutate,
        removingMessage: isLoading,
        data
    };
};

export const useUpdateMessageStatus = (props: UseUpdateMessageProps) => {
    const queryClient = useQueryClient();
    const { onReset, onSuccess, onError } = props;
    const { mutate, isError, isLoading, isSuccess, reset } = useMutation(
        ({ payload, MessageId, Status }: IUpdateMessageStatusRequest) =>
        putRequest<null, IMessageResponse>({
            url: `/Messages/update-message-status?MessageId=${MessageId}&Status=${Status}`,
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
                    queryClient.invalidateQueries([`useGetAllMessages`]);
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
        updateMessage: mutate,
        updatingMessage: isLoading,
        isError,
        isSuccess,
    };
};

export const useReplyMessage = (props: UseReplyMessageProps) => {
    const queryClient = useQueryClient();
    const { onSuccess, onError, onReset} = props;
  
    const { mutate, isLoading, ...rest } = useMutation(
        ({ payload }: { payload: IReplyMessageDTO }) => 
        postRequest<IReplyMessageDTO, IMessageResponse>({ url: "/Messages/reply-message", payload }),
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
                    queryClient.invalidateQueries([`useGetAllMessages`]);
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
        replyMessage: mutate,
        replyingMessage: isLoading,
        ...rest,
    };
};

export const useGetMailingList = ({ params }: { params: GetAllMailingListRequestParams }) => {
    const { notify } = useNotification();
    const { isLoading, data, refetch, ...rest } = useQuery(
        ["useGetMailingList", { params }],
        () =>
        getRequestParams<GetAllMailingListRequestParams, GetAllMailingListResponse>({
            url: "/Subscription/get-subscriptions",
            params: parseQueryParams(
                params as unknown as ParseQueryParams
            ) as unknown as GetAllMailingListRequestParams,
        }),
        {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError(error: any) {
                notify(error.message, { type: "error", theme:"colored"})
            },
        }
    );
  
    return {
        loadingMailingList: isLoading,
        refetchMailingList: refetch,
        mailingList: data,
        rest
    };
};

export const useRemoveSubscriber = (props: UseRemoveSubscriberProps) => {
    const queryClient = useQueryClient();
    const { onReset, onSuccess, onError } = props;
    const { data, reset, mutate, isLoading } = useMutation(
        ({ email }: { email: string }) =>
        deleteRequest<ApiDataResponse<IMailingListResponse>>({
            url: `/Subscription/delete-subscription?email=${email}`,
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
                
                queryClient.invalidateQueries(["useGetMailingList"]);
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
        removeSubscriber: mutate,
        removingSubscriber: isLoading,
        data
    };
};