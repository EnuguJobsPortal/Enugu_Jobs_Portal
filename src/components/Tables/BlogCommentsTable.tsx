import UpdateBlogComment from "@/components/Forms/UpdateBlogComment";
import { DataTable } from "@/components/Tables/DataTable";
import SelectDropDown from "@/components/shared/SelectDropdown";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NEWS_STATUS } from "@/const/options";
import { useLoading } from "@/context/LoadingContext";
import { useSweetAlert } from "@/context/SweetAlertContext";
import useBlogPostCommentColumns from "@/hooks/columns/useBlogPostCommentColumns";
import { useGetAllBlogComments, useRemoveBlogComment } from "@/hooks/queries/blog";
import { useGetInfiniteBlogList, useGetInfiniteUserList } from "@/hooks/queries/infiniteQueries";
import { SelectOption } from "@/interfaces/controlnput.interface";
import { useCallback, useEffect, useState } from "react";

const BlogCommentsTable = () => {

	const [ selectedCommentStatus, setSelectedCommentStatus ] = useState<string>("");
	const [ selectedCommenterID, setSelectedCommenterID ] = useState<string>("");
	const [ selectedNewsID, setSelectedNewsID ] = useState<string>("");
    const { showConfirm, showError, showSuccess } = useSweetAlert();
    const { showLoading, hideLoading } = useLoading();
	const { userList, fetchNextUserList, isFetchingNextUserList, isLoadingUserList } = useGetInfiniteUserList({ enabled: true });
	const { blogList, fetchNextBlogList, isFetchingNextBlogList, isLoadingBlogList } = useGetInfiniteBlogList({ enabled: true });
    const { removeBlogPostComment, removingBlogPostComment } = useRemoveBlogComment({ 
        onSuccess: (data) => {
            hideLoading();
            showSuccess("Success!!!", data.message);
        }, 
        onError: (message) => {
            hideLoading();
            showError("Attention!!!", message);
        }
    })
	const handleDeleteBlogPostComment = useCallback(async (commentID:number) => {
		const result = await showConfirm("Confirm!!!", "Are you sure you want to delete this blog post comment?: Note this action is irreversible?");

        if(result.isConfirmed)
        {
            removeBlogPostComment({ commentid: String(commentID) });
        }
	}, [ removeBlogPostComment, showConfirm ]);

	const { 
        blogPostCommentColumns, 
        comment, 
        onPageChange, 
        pagination, 
        showUpdateModal, 
        setShowUpdateModal
    } = useBlogPostCommentColumns({ handleDeleteBlogPostComment });
	
	const { loadingBlogComments, blogComments } = useGetAllBlogComments({ 
		params: {
			commentstatus: selectedCommentStatus,
			commenterid: selectedCommenterID,
			newsid: selectedNewsID,
			PageSize: pagination.pageSize,
			PageNumber: pagination.pageIndex + 1
		}
	});

	const userOptionsEnum: SelectOption[] = userList ? userList?.map((user) => (
        { label: `${user.Firstname} ${user.Lastname}`, value: `${user.UserAccountId}`}
    )) : [];
	const blogOptionsEnum: SelectOption[] = blogList ? blogList?.map((blog) => (
        { label: `${blog.NewsTitle}`, value: `${blog.NewsId}`}
    )) : [];

	useEffect(() => {
		if(removingBlogPostComment)
		{
			showLoading();
		}
	}, [ removingBlogPostComment, showLoading ])

	return (
		<>
			<Card className="rounded-xl font-poppins bg-neutral-white w-full px-4 py-4 shadow-[0px_1px_5px_-2px_rgba(0,_0,_0,_0.6)] mb-10">
                <CardHeader className="flex flex-col lg:flex-row flex-wrap items-center justify-between gap-8 pt-0 pb-2 w-full mb-4">
                    <span className="uppercase text-xs font-bold tracking-widest">Blog Comments</span>
                    <div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-2">
						<div className="w-full flex-1">
                            <SelectDropDown
                                selected={selectedCommentStatus}
                                onChange={setSelectedCommentStatus}
                                placeholder="COMMENT STATUS"
                                options={NEWS_STATUS}
                                className="p-4 rounded-2xl uppercase text-[9px] justify-center text-center w-36"
                                allowEmpty
                            />
                        </div>
                        <div className="w-full flex-1">
                            <SelectDropDown
                                selected={selectedCommenterID}
                                onChange={setSelectedCommenterID}
                                placeholder="COMMENTER"
                                options={userOptionsEnum}
                                isLoading={isFetchingNextUserList || isLoadingUserList}
                                className="p-4 rounded-2xl uppercase text-[9px] justify-center text-center w-36"
                                allowEmpty
                                onEndOfRow={(e) => {
                                    if (e) {
                                        fetchNextUserList();
                                    }
                                }}
                            />
                        </div>
                        <div className="w-full flex-1">
                            <SelectDropDown
                                selected={selectedNewsID}
                                onChange={setSelectedNewsID}
                                placeholder="BLOG POST"
                                options={blogOptionsEnum}
                                isLoading={isFetchingNextBlogList || isLoadingBlogList}
                                className="p-4 rounded-2xl uppercase text-[9px] justify-center text-center w-36"
                                allowEmpty
                                onEndOfRow={(e) => {
                                    if (e) {
                                        fetchNextBlogList();
                                    }
                                }}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
					<DataTable
						columns={blogPostCommentColumns} 
						data={blogComments?.data || []}
						loading={loadingBlogComments}
						tClassName='border-none border-collapse'
						tHeaderTRowClassName="bg-[#1E83F0] bg-opacity-20"
						tHeaderTHeadClassName="text-[#3980ce] text-[11px] tracking-wide font-[400]"
						tCellClassName="text-xs font-sans"
						totalRecords={blogComments?.totalrecords}
						onPageChange={onPageChange}
					/>
                </CardContent>
            </Card>
        
            <UpdateBlogComment
                open={showUpdateModal}
                setOpen={setShowUpdateModal}
                comment={comment}
            />
        </>
	)
}

export default BlogCommentsTable;