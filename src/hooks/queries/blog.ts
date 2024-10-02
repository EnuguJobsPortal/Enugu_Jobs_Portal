import { useNotification } from "@/context/NotificationContext";
import { GetAllBlogCommentsRequestParams, GetAllBlogPostRequestParams, IBlogCommentUpdateDTO, IBlogPostCategoryDTO, IBlogPostCategoryUpdateDTO, IUpdateBlogCommentRequest, IUpdateBlogPostCategoryRequest } from "@/interfaces/dto";
import { IBaseQueryParams, ParseQueryParams } from "@/interfaces/general";
import { UseGetAllBlogCommentsProps, UseRemoveBlogPostCategoryProps, UseRemoveBlogPostProps, UseUpdateBlogCommentProps, UseUpdateBlogPostCategoryProps } from "@/interfaces/queries.interface";
import { ApiDataResponse, GetAllBlogCategoryResponse, GetAllBlogCommentResponse, GetAllBlogPostResponse, IBlogCategoryResponse, IBlogCommentResponse, IBlogPostResponse, IMessageResponse } from "@/interfaces/response.interface";
import { deleteRequest, getRequestParams, postRequest, putRequest } from "@/utils/apiCaller";
import { parseQueryParams } from "@/utils/parseQueryParam";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateNewBlogPostCategory = (props: {
    onSuccess?: (value: IMessageResponse) => void;
    onReset?: () => void;
    onError?: (message:string) => void;
}) => {
    const queryClient = useQueryClient();
    const { onReset, onSuccess, onError } = props;
    const { data, mutate, isLoading, isError, isSuccess, reset } = useMutation(
        ({ payload }: { payload: IBlogPostCategoryDTO}) =>
            postRequest<IBlogPostCategoryDTO, IMessageResponse>({
                url: '/News/newscategory',
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
                
                queryClient.invalidateQueries([`useGetAllBlogPostCategories`]);
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
        createNewBlogPostCategory: mutate,
        creatingNewBlogPostCategory: isLoading,
        data,
        isError: isError,
        isSuccess,
    };
};

export const useUpdateBlogPostCategory = (props: UseUpdateBlogPostCategoryProps) => {
    const queryClient = useQueryClient();
    const { onReset, onSuccess, onError } = props;
    const { mutate, isError, isLoading, isSuccess, reset } = useMutation(
        ({ payload }: IUpdateBlogPostCategoryRequest) =>
        putRequest<IBlogPostCategoryUpdateDTO, IMessageResponse>({
            url: `/News/category`,
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
                    queryClient.invalidateQueries([`useGetAllBlogPostCategories`]);
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
        updateBlogPostCategory: mutate,
        updatingBlogPostCategory: isLoading,
        isError,
        isSuccess,
    };
};

export const useRemoveBlogPostCategory = (props: UseRemoveBlogPostCategoryProps) => {
    const queryClient = useQueryClient();
    const { onReset, onSuccess, onError } = props;
    const { data, reset, mutate, isLoading } = useMutation(
        ({ categoryid }: { categoryid: string }) =>
        deleteRequest<ApiDataResponse<IBlogCategoryResponse>>({
            url: `/News/category?categoryid=${categoryid}`,
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
                
                queryClient.invalidateQueries(["useGetAllBlogPostCategories"]);
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
        removeBlogPostCategory: mutate,
        removingBlogPostCategory: isLoading,
        data
    };
};

export const useCreateNewBlogPost = (props: {
    onSuccess?: (value: IMessageResponse) => void;
    onReset?: () => void;
    onError?: (message:string) => void;
}) => {
    const queryClient = useQueryClient();
    const { onReset, onSuccess, onError } = props;
    const { data, mutate, isLoading, isError, isSuccess, reset } = useMutation(
        ({ payload }: { payload: FormData}) =>
            postRequest<FormData, IMessageResponse>({
                url: '/News/postnews',
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
                
                queryClient.invalidateQueries([`useGetAllBlogPosts`]);
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
        createNewBlogPost: mutate,
        creatingNewBlogPost: isLoading,
        data,
        isError: isError,
        isSuccess,
    };
};

export const useGetAllBlogPostCategories = ({ params }: { params: IBaseQueryParams }) => {
    const { notify } = useNotification();
    const { isLoading, data, refetch, ...rest } = useQuery(
        ["useGetAllBlogPostCategories", { params }],
        () =>
        getRequestParams<IBaseQueryParams, GetAllBlogCategoryResponse>({
            url: "/News/newscategory",
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
        loadingBlogPostCategories: isLoading,
        refetchBlogPostCategories: refetch,
        blogPostCategories: data,
        rest
    };
};

export const useGetAllBlogPosts = ({ params }: { params: GetAllBlogPostRequestParams }) => {
    const { notify } = useNotification();
    const { isLoading, data, refetch, ...rest } = useQuery(
        ["useGetAllBlogPosts", { params }],
        () =>
        getRequestParams<GetAllBlogPostRequestParams, GetAllBlogPostResponse>({
            url: "/News/news",
            params: parseQueryParams(
                params as unknown as ParseQueryParams
            ) as unknown as GetAllBlogPostRequestParams,
        }),
        {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError(error: any) {
                notify(error.message, { type: "error", theme:"colored"})
            },
        }
    );
  
    return {
        loadingBlogPosts: isLoading,
        refetchBlogPosts: refetch,
        blogPosts: data,
        rest
    };
};

export const useRemoveBlogPost = (props: UseRemoveBlogPostProps) => {
    const queryClient = useQueryClient();
    const { onReset, onSuccess, onError } = props;
    const { data, reset, mutate, isLoading } = useMutation(
        ({ id }: { id: string }) =>
        deleteRequest<ApiDataResponse<IBlogPostResponse>>({
            url: `/News/deletenews?id=${id}`,
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
                
                queryClient.invalidateQueries(["useGetAllBlogPosts"]);
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
        removeBlogPost: mutate,
        removingBlogPost: isLoading,
        data
    };
};

export const useUpdateBlogPosts = (props: {
    onSuccess?: (value: IMessageResponse) => void;
    onReset?: () => void;
    onError?: (message:string) => void;
}) => {
    const queryClient = useQueryClient();
    const { onReset, onSuccess, onError } = props;
    const { mutate, isLoading, data, reset } = useMutation(
        ({ payload, id }: { payload: FormData; id: string }) =>
        putRequest<FormData, IMessageResponse>({
            url: `/News/updatenews?id=${id}`,
            payload,
        }),
        {
            onSuccess: (values) => {
                if(values.error === false)
                {
                    if (onReset) {
                        onReset();
                    }

                    if(onSuccess)
                    {
                        onSuccess(values);
                    }

                    //revalidate user queries
                    queryClient.invalidateQueries([`useGetAllJobPosts`]);
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
        updateBlogPost: mutate,
        updatingBlogPost: isLoading,
        data,
    };
};

export const useGetAllBlogComments = ({ params }: UseGetAllBlogCommentsProps) => {
    const { notify } = useNotification();
    const { isLoading, data, refetch, ...rest } = useQuery(
        ["useGetAllBlogComments", { params }],
        () =>
        getRequestParams<GetAllBlogCommentsRequestParams, GetAllBlogCommentResponse>({
            url: "/News/viewnewscomments",
            params: parseQueryParams(
                params as unknown as ParseQueryParams
            ) as unknown as GetAllBlogCommentsRequestParams,
        }),
        {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError(error: any) {
                notify(error.message, { type: "error", theme:"colored"})
            },
        }
    );
  
    return {
        loadingBlogComments: isLoading,
        refetchBlogComments: refetch,
        blogComments: data,
        rest
    };
};

export const useRemoveBlogComment = (props: {
    onSuccess?: (value: IMessageResponse) => void;
    onReset?: () => void;
    onError?: (message:string) => void;
}) => {
    const queryClient = useQueryClient();
    const { onReset, onSuccess, onError } = props;
    const { data, reset, mutate, isLoading } = useMutation(
        ({ commentid }: { commentid: string }) =>
        deleteRequest<ApiDataResponse<IBlogCommentResponse>>({
            url: `/News/delete?commentid=${commentid}`,
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
                
                queryClient.invalidateQueries(["useGetAllBlogComments"]);
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
        removeBlogPostComment: mutate,
        removingBlogPostComment: isLoading,
        data
    };
};

export const useUpdateBlogComment = (props: UseUpdateBlogCommentProps) => {
    const queryClient = useQueryClient();
    const { onReset, onSuccess, onError } = props;
    const { mutate, isError, isLoading, isSuccess, reset } = useMutation(
        ({ payload }: IUpdateBlogCommentRequest) =>
        putRequest<IBlogCommentUpdateDTO, IMessageResponse>({
            url: `/News/update`,
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
                    queryClient.invalidateQueries([`useGetAllBlogComments`]);
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
        updateBlogComment: mutate,
        updatingBlogComment: isLoading,
        isError,
        isSuccess,
    };
};

