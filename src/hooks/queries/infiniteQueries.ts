import { IBaseQueryParams, ParseQueryParams } from "@/interfaces/general";
import { GetAllBlogCategoryResponse, GetAllBlogPostResponse, GetAllEmployerResponse, GetAllJobPostsResponse, GetAllSeekerResponse, GetAllUsersResponse } from "@/interfaces/response.interface";
import { getRequestParams } from "@/utils/apiCaller";
import { parseQueryParams } from "@/utils/parseQueryParam";
import { useInfiniteQuery } from "@tanstack/react-query";
import useErrorQueryHandler from "../useErrorQueryHandler";

export const useGetInfiniteEmployerList = ({
	enabled,
	params,
}: {
	enabled?: boolean;
	params?: IBaseQueryParams;
}) => {
	const {
		fetchNextPage,
		isFetchingNextPage,
		data,
		error,
		isError,
		isSuccess,
		hasNextPage,
		refetch,
		isLoading,
	} = useInfiniteQuery(
		["useGetInfiniteEmployerList"],
		({ pageParam = 1 }) =>
		getRequestParams<IBaseQueryParams, GetAllEmployerResponse>({
			url: '/EmployerProfile/employers',
			params: parseQueryParams({
				...params,
				PageNumber: pageParam,
				PageSize: 30,
			} as unknown as ParseQueryParams) as unknown as IBaseQueryParams,
		}),
		{
			enabled: enabled,
			getNextPageParam: (lastPage, pages) => {
				const totalPages = lastPage?.totalpages || 1;

				if (pages?.length < totalPages) {
					const newPage = pages?.length + 1;
					return newPage;
				}

				return undefined;
			},
		}
	);
  
	const employerList = data?.pages.flatMap((values) => values.data) || [];
  
	const message = employerList.length === 0 ? "No Employer Available" : "";
  
	useErrorQueryHandler({ error, message, isSuccess, isError });
  
	return {
		isFetchingNextEmployerList: isFetchingNextPage,
		fetchNextEmployerList: fetchNextPage,
		employerList,
		hasEmployerListNextPage: hasNextPage,
		refetchEmployerList: refetch,
		isLoading,
	};
};

export const useGetInfiniteSeekerList = ({
	enabled,
	params,
}: {
	enabled?: boolean;
	params?: IBaseQueryParams;
}) => {
	const {
		fetchNextPage,
		isFetchingNextPage,
		data,
		error,
		isError,
		isSuccess,
		hasNextPage,
		refetch,
		isLoading,
	} = useInfiniteQuery(
		["useGetInfiniteSeekerList"],
		({ pageParam = 1 }) =>
		getRequestParams<IBaseQueryParams, GetAllSeekerResponse>({
			url: '/JobSeeker/alljobseeker',
			params: parseQueryParams({
				...params,
				PageNumber: pageParam,
				PageSize: 30,
			} as unknown as ParseQueryParams) as unknown as IBaseQueryParams,
		}),
		{
			enabled: enabled,
			getNextPageParam: (lastPage, pages) => {
				const totalPages = lastPage?.totalpages || 1;

				if (pages?.length < totalPages) {
					const newPage = pages?.length + 1;
					return newPage;
				}

				return undefined;
			},
		}
	);
  
	const seekerList = data?.pages.flatMap((values) => values.data) || [];
  
	const message = seekerList.length === 0 ? "No Seeker Available" : "";
  
	useErrorQueryHandler({ error, message, isSuccess, isError });
  
	return {
		isFetchingNextSeekerList: isFetchingNextPage,
		fetchNextSeekerList: fetchNextPage,
		seekerList,
		hasSeekerListNextPage: hasNextPage,
		refetchSeekerList: refetch,
		isLoadingSeekerList: isLoading,
	};
};

export const useGetInfiniteJobPostList = ({
	enabled,
	params,
}: {
	enabled?: boolean;
	params?: IBaseQueryParams;
}) => {
	const {
		fetchNextPage,
		isFetchingNextPage,
		data,
		error,
		isError,
		isSuccess,
		hasNextPage,
		refetch,
		isLoading,
	} = useInfiniteQuery(
		["useGetInfiniteJobPostList"],
		({ pageParam = 1 }) =>
		getRequestParams<IBaseQueryParams, GetAllJobPostsResponse>({
			url: '/Jobs/alljobpost',
			params: parseQueryParams({
				...params,
				PageNumber: pageParam,
				PageSize: 30,
			} as unknown as ParseQueryParams) as unknown as IBaseQueryParams,
		}),
		{
			enabled: enabled,
			getNextPageParam: (lastPage, pages) => {
				const totalPages = lastPage?.totalpages || 1;

				if (pages?.length < totalPages) {
					const newPage = pages?.length + 1;
					return newPage;
				}

				return undefined;
			},
		}
	);
  
	const jobPostList = data?.pages.flatMap((values) => values.data) || [];
  
	const message = jobPostList.length === 0 ? "No Job Post Available" : "";
  
	useErrorQueryHandler({ error, message, isSuccess, isError });
  
	return {
		isFetchingNextJobPostList: isFetchingNextPage,
		fetchNextJobPostList: fetchNextPage,
		jobPostList,
		hasJobPostListNextPage: hasNextPage,
		refetchJobPostList: refetch,
		isLoadingJobPostList: isLoading,
	};
};

export const useGetInfiniteUserList = ({
	enabled,
	params,
}: {
	enabled?: boolean;
	params?: IBaseQueryParams;
}) => {
	const {
		fetchNextPage,
		isFetchingNextPage,
		data,
		error,
		isError,
		isSuccess,
		hasNextPage,
		refetch,
		isLoading,
	} = useInfiniteQuery(
		["useGetInfiniteUserList"],
		({ pageParam = 1 }) =>
		getRequestParams<IBaseQueryParams, GetAllUsersResponse>({
			url: '/User/allusers',
			params: parseQueryParams({
				...params,
				PageNumber: pageParam,
				PageSize: 30,
			} as unknown as ParseQueryParams) as unknown as IBaseQueryParams,
		}),
		{
			enabled: enabled,
			getNextPageParam: (lastPage, pages) => {
				const totalPages = lastPage?.totalpages || 1;

				if (pages?.length < totalPages) {
					const newPage = pages?.length + 1;
					return newPage;
				}

				return undefined;
			},
		}
	);
  
	const userList = data?.pages.flatMap((values) => values.data) || [];
  
	const message = userList.length === 0 ? "No User Available" : "";
  
	useErrorQueryHandler({ error, message, isSuccess, isError });
  
	return {
		isFetchingNextUserList: isFetchingNextPage,
		fetchNextUserList: fetchNextPage,
		userList,
		hasUserListNextPage: hasNextPage,
		refetchUserList: refetch,
		isLoadingUserList: isLoading,
	};
};

export const useGetInfiniteBlogCategoryList = ({
	enabled,
	params,
}: {
	enabled?: boolean;
	params?: IBaseQueryParams;
}) => {
	const {
		fetchNextPage,
		isFetchingNextPage,
		data,
		error,
		isError,
		isSuccess,
		hasNextPage,
		refetch,
		isLoading,
	} = useInfiniteQuery(
		["useGetInfiniteBlogCategoryList"],
		({ pageParam = 1 }) =>
		getRequestParams<IBaseQueryParams, GetAllBlogCategoryResponse>({
			url: '/News/newscategory',
			params: parseQueryParams({
				...params,
				PageNumber: pageParam,
				PageSize: 30,
			} as unknown as ParseQueryParams) as unknown as IBaseQueryParams,
		}),
		{
			enabled: enabled,
			getNextPageParam: (lastPage, pages) => {
				const totalPages = lastPage?.totalpages || 1;

				if (pages?.length < totalPages) {
					const newPage = pages?.length + 1;
					return newPage;
				}

				return undefined;
			},
		}
	);
  
	const blogCategoryList = data?.pages.flatMap((values) => values.data) || [];
  
	const message = blogCategoryList.length === 0 ? "No Blog Category Available" : "";
  
	useErrorQueryHandler({ error, message, isSuccess, isError });
  
	return {
		isFetchingNextBlogCategoryList: isFetchingNextPage,
		fetchNextBlogCategoryList: fetchNextPage,
		blogCategoryList,
		hasBlogCategoryListNextPage: hasNextPage,
		refetchBlogCategoryList: refetch,
		isLoadingBlogCategoryList: isLoading,
	};
};

export const useGetInfiniteBlogList = ({
	enabled,
	params,
}: {
	enabled?: boolean;
	params?: IBaseQueryParams;
}) => {
	const {
		fetchNextPage,
		isFetchingNextPage,
		data,
		error,
		isError,
		isSuccess,
		hasNextPage,
		refetch,
		isLoading,
	} = useInfiniteQuery(
		["useGetInfiniteBlogList"],
		({ pageParam = 1 }) =>
		getRequestParams<IBaseQueryParams, GetAllBlogPostResponse>({
			url: '/News/news',
			params: parseQueryParams({
				...params,
				PageNumber: pageParam,
				PageSize: 30,
			} as unknown as ParseQueryParams) as unknown as IBaseQueryParams,
		}),
		{
			enabled: enabled,
			getNextPageParam: (lastPage, pages) => {
				const totalPages = lastPage?.totalpages || 1;

				if (pages?.length < totalPages) {
					const newPage = pages?.length + 1;
					return newPage;
				}

				return undefined;
			},
		}
	);
  
	const blogList = data?.pages.flatMap((values) => values.data) || [];
  
	const message = blogList.length === 0 ? "No Blog Available" : "";
  
	useErrorQueryHandler({ error, message, isSuccess, isError });
  
	return {
		isFetchingNextBlogList: isFetchingNextPage,
		fetchNextBlogList: fetchNextPage,
		blogList,
		hasBlogListNextPage: hasNextPage,
		refetchBlogList: refetch,
		isLoadingBlogList: isLoading,
	};
};