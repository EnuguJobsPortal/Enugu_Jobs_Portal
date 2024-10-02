import UpdateBlogPost from "@/components/Forms/UpdateBlogPost";
import { DataTable } from "@/components/Tables/DataTable";
import DateRangePicker from "@/components/shared/DateRangePicker";
import SelectDropDown from "@/components/shared/SelectDropdown";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NEWS_STATUS } from "@/const/options";
import { useLoading } from "@/context/LoadingContext";
import { useSweetAlert } from "@/context/SweetAlertContext";
import { useGetAllBlogPosts, useRemoveBlogPost } from "@/hooks/queries/blog";
import { useGetInfiniteBlogCategoryList } from "@/hooks/queries/infiniteQueries";
import { SelectOption } from "@/interfaces/controlnput.interface";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import useBlogPostColumns from "../../hooks/columns/useBlogPostColumns";

const BlogPostTable = () => {
    const [ selectedDates, setSelectedDates ] = useState<DateRange | undefined>();
    const [ selectedNewsCategoryID, setSelectedNewsCategoryID ] = useState<string>("");
    const [ selectedNewsStatus, setSelectedNewsStatus ] = useState<string>("");
    const { showConfirm, showError, showSuccess } = useSweetAlert();
    const { showLoading, hideLoading } = useLoading();
    const { 
        blogCategoryList, 
        isFetchingNextBlogCategoryList, 
        isLoadingBlogCategoryList, 
        fetchNextBlogCategoryList 
    } = useGetInfiniteBlogCategoryList({ enabled: true });
    const { removeBlogPost, removingBlogPost } = useRemoveBlogPost({ 
        onSuccess: (data) => {
            hideLoading();
            showSuccess("Success!!!", data.message);
        }, 
        onError: (message) => {
            hideLoading();
            showError("Attention!!!", message);
        }
    })

	const handleDeleteBlogPost = useCallback(async (postID:number) => {
		const result = await showConfirm("Confirm!!!", "Are you sure you want to delete this blog post: Note this action is irreversible?");

        if(result.isConfirmed)
        {
            removeBlogPost({ id: String(postID) });
        }
	}, [ removeBlogPost, showConfirm ])

    const { 
        blogPostColumns, 
        blog, 
        onPageChange, 
        pagination, 
        showUpdateModal, 
        setShowUpdateModal
    } = useBlogPostColumns({ handleDeleteBlogPost })

    const { loadingBlogPosts, blogPosts } = useGetAllBlogPosts({ 
        params: {
            NewsStatus: selectedNewsStatus,
            NewsCategoryId: selectedNewsCategoryID,
            Start: selectedDates && selectedDates?.from ? moment(selectedDates?.from).format('YYYY-MM-DD') : '',
			End: selectedDates && selectedDates?.to ? moment(selectedDates?.to).format('YYYY-MM-DD') : '',
            PageSize: pagination.pageSize,
            PageNumber: pagination.pageIndex + 1
        }
    });

    const blogCategoryOptionsEnum: SelectOption[] = blogCategoryList ? blogCategoryList?.map((blogCategory) => (
        { label: `${blogCategory.CategoryName}`, value: `${blogCategory.NewsCategoryId}`}
    )) : [];

    useEffect(() => {
        if(removingBlogPost)
        {
            showLoading();
        }
    }, [ removingBlogPost, showLoading ])

	return (
		<>
            <Card className="rounded-xl font-poppins bg-neutral-white w-full px-4 py-4 shadow-[0px_1px_5px_-2px_rgba(0,_0,_0,_0.6)] mb-10">
                <CardHeader className="flex flex-col lg:flex-row flex-wrap items-center justify-between gap-8 pt-0 pb-2 w-full mb-4">
                    <span className="uppercase text-xs font-bold tracking-widest">Blog Posts</span>
                    <div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-2">
                        <div className="w-full flex-1">
                            <DateRangePicker
                                selected={selectedDates}
                                onChange={setSelectedDates}
                                iconClassName="w-6 h-6"
                                buttonClassName="p-6 rounded-2xl bg-blue-800 text-white uppercase text-[9px] justify-center text-center"
                                placeHolder="Filter Creation Date"
                                calendarClassName="bg-blue-800 text-white"
                            />
                        </div>
                        <div className="w-full flex-1">
                            <SelectDropDown
                                selected={selectedNewsCategoryID}
                                onChange={setSelectedNewsCategoryID}
                                placeholder="BLOG CATEGORY"
                                options={blogCategoryOptionsEnum}
                                isLoading={isFetchingNextBlogCategoryList || isLoadingBlogCategoryList}
                                className="p-4 rounded-2xl uppercase text-[9px] justify-center text-center w-36"
                                allowEmpty
                                onEndOfRow={(e) => {
                                    if (e) {
                                        fetchNextBlogCategoryList();
                                    }
                                }}
                            />
                        </div>
                        <div className="w-full flex-1">
                            <SelectDropDown
                                selected={selectedNewsStatus}
                                onChange={setSelectedNewsStatus}
                                placeholder="BLOG STATUS"
                                options={NEWS_STATUS}
                                className="p-4 rounded-2xl uppercase text-[9px] justify-center text-center w-36"
                                allowEmpty
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={blogPostColumns} 
                        data={blogPosts?.data || []}
                        loading={loadingBlogPosts}
                        tClassName='border-none border-collapse'
                        tHeaderTRowClassName="bg-[#1E83F0] bg-opacity-20"
                        tHeaderTHeadClassName="text-[#3980ce] text-[11px] tracking-wide font-[400]"
                        tCellClassName="text-xs font-sans"
                        totalRecords={blogPosts?.totalrecords}
                        onPageChange={onPageChange}
                    />
                </CardContent>
            </Card>
            
            <UpdateBlogPost
                open={showUpdateModal}
                setOpen={setShowUpdateModal}
                blogData={blog}
            />
        </>
	)
}

export default BlogPostTable;